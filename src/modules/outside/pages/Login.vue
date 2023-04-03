<template>
  <div class="card login-container">
    <div class="card-body">
      <h5 class="card-title">Sign in</h5>
      <LoginForm @formSubmitted="onFormSubmitted" />
    </div>
  </div>
</template>

<script>
import LoginForm from "./LoginForm.vue";
export default {
  inject: ["userService"],
  components: {
    LoginForm,
  },
  data() {
    return {
      submitting: false,
      errorMessage: undefined,
    };
  },
  methods: {
    onFormSubmitted({ email, password }) {
      if (this.submitting) return;
      this.submitting = true;
      return this.userService
        .signIn(email, password)
        .finally(() => (this.submitting = false));
    },
  },
};
</script>

<style scoped>
.login-container {
  width: 100%;
  max-width: 360px;
}
</style>