import AuthenticationService from '../authentication/authentication.service';

export default {
  /**
   * Returns a promise that resolves to the personal message object on success.
   */
  getPersonalMessage() {
    return new Promise((resolve, reject) => {
      if (AuthenticationService.accessToken) {
        // Load personal message from resource server using access token for authentication.
        resolve(fetch('/v1/example', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + AuthenticationService.accessToken
          }
        }).then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error loading message: ' + response.statusText);
          }
        }));
      } else {
        // User is not authenticated. Reject with appropriate error.
        reject(new Error('User is not authenticated'));
      }
    });
  }
}
