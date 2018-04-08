import ClientOAuth2 from 'client-oauth2';

export default {
  _authentication: null,
  _providerConfig: null,
  _authenticationListener: [],

  /**
   * Returns the current authentication including all access token, refresh token and ID token.
   */
  get authentication() {
    return this._authentication;
  },

  /**
   * Returns the current access token from the authentication.
   */
  get accessToken() {
    return this._authentication !== null ? this._authentication.access_token : null;
  },

  /**
   * Initializes the service with the given OIDC provider properties. Also loads a possibly existing authentication
   * from the browser session storage.
   * 
   * @param {Object} oauth2ProviderProperties Properties of the OIDC provider.
   */
  init(oauth2ProviderProperties) {
    this._authentication = JSON.parse(window.sessionStorage.getItem('authentication'));
    this._providerConfig = new ClientOAuth2(oauth2ProviderProperties);
  },

  /**
   * Adds a listener function to be called when authentication changes.
   * 
   * @param {Function} listener Listener function to be called when authentication changes.
   */
  addAuthenticationListener(listener) {
    this._authenticationListener.push(listener);
  },

  /**
   * Returns true if the current window URL is a callback from the OIDC provider.
   */
  isLoginCallback() {
    // Detect if there is the authorization code parameter in the query string.
    return window.location.search.match(/(\?|&)code=/) !== null;
  },

  /**
   * Initiate the login procedure by redirecting the browser to the OIDC provider's authorization URL.
   */
  startLogin() {
    window.location.href = this._providerConfig.code.getUri();
  },

  /**
   * Continue the login procedure by retrieving the token from the OIDC provider and storing the authentication in
   * the browser session storage. All registered authentication listeners are called afterwards.
   */
  continueLogin() {
    return this._providerConfig.code.getToken(window.location.href).then(authentication => {
      this._authentication = authentication.data;
      window.sessionStorage.setItem('authentication', JSON.stringify(this._authentication));
      // Replace the current history URL removing all query string parameters (to get rid of callback parameters).
      window.history.replaceState({}, '', window.location.href.replace(/\?.*/, ''));
      this._authenticationListener.forEach(listener => {
        listener(this._authentication);
      });
      return this._authentication;
    });
  },

  /**
   * Discard the current authentication and remove it from the browser session storage. All registered authentication
   * listeners are called afterwards with a null argument.
   */
  logout() {
    return new Promise((resolve) => {
      window.sessionStorage.removeItem('authentication');
      this._authentication = null;
      this._authenticationListener.forEach(listener => {
        listener(this._authentication);
      });
      resolve();
    });
  }
}
