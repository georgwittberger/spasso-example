import Vue from 'vue';
import App from './App.vue';
import AuthenticationService from './authentication/authentication.service';

Vue.config.productionTip = false

const oauth2ProviderProperties = {
  clientId: 'spasso',
  // clientSecret: '12345',
  accessTokenUri: 'http://localhost:8080/auth/realms/spasso/protocol/openid-connect/token',
  authorizationUri: 'http://localhost:8080/auth/realms/spasso/protocol/openid-connect/auth',
  redirectUri: 'http://localhost:4200',
  scopes: ['openid', 'profile']
};

AuthenticationService.init(oauth2ProviderProperties);

new Vue({
  render: h => h(App)
}).$mount('#app')
