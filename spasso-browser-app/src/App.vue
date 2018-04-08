<template>
  <div id="app">
    <h1>Single Page Application with Single Sign On Example</h1>
    <p v-if="loginPending">Logging you in... please wait</p>
    <ExampleComponent></ExampleComponent>
    <button type="button" v-if="!authentication" @click="login">Login</button>
    <button type="button" v-if="authentication" @click="logout">Logout</button>
  </div>
</template>

<script>
import ExampleComponent from './example/ExampleComponent.vue';
import AuthenticationService from './authentication/authentication.service';

export default {
  name: 'app',
  components: {
    ExampleComponent
  },
  data() {
    return {
      loginPending: false,
      // Assign authentication which may be present in browser session.
      authentication: AuthenticationService.authentication
    };
  },
  mounted() {
    // Detect if login callback was called.
    if (AuthenticationService.isLoginCallback()) {
      this.loginPending = true;
      // Continue login procedure, i.e. load token from OIDC provider.
      AuthenticationService.continueLogin().then(authentication => {
        this.authentication = authentication;
        this.loginPending = false;
      });
    }
  },
  methods: {
    login() {
      // Initiate login procedure.
      AuthenticationService.startLogin();
    },
    logout() {
      // Remove the current authentication.
      AuthenticationService.logout().then(() => {
        this.authentication = AuthenticationService.authentication;
      });
    }
  }
};
</script>

<style>
</style>
