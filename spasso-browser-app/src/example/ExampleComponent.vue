<template>
  <div class="example-component">
    <p>Personal message: {{ personalMessage }}</p>
  </div>
</template>

<script>
import AuthenticationService from '../authentication/authentication.service';
import ExampleService from './example.service';

export default {
  name: 'ExampleComponent',
  data() {
    return {
      personalMessage: null
    };
  },
  mounted() {
    // Try to load personal message immediately when component is displayed.
    this.updatePersonalMessage();
    // Register event handler to be notified when authentication changes (login/logout).
    AuthenticationService.addAuthenticationListener(authentication => {
      console.info('ExampleComponent got new authentication: ', authentication);
      // Load personal message again when authentication has changed.
      this.updatePersonalMessage();
    });
  },
  methods: {
    updatePersonalMessage() {
      // Attempt to load personal message via separate service.
      ExampleService.getPersonalMessage().then(message => {
        this.personalMessage = message.text;
      }).catch(error => {
        this.personalMessage = 'Cannot load message. ' + error;
      });
    }
  }
};
</script>

<style>
</style>
