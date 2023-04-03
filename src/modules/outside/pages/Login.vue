<template>
  <div class="card login-container">
    <div class="card-body">
      <h5 class="card-title">Sign in</h5>
      <LoginForm :loading="submitting" @formSubmitted="onFormSubmitted" />
    </div>
  </div>
</template>

<script>
import LoginForm from "./LoginForm.vue";
export default {
  inject: ["userService", "showNotification"],
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
        .then(() => {
          this.showNotification("success", "Signed in successfully");
        })
        .catch((error) => {
          this.showNotification("error", error);
        })
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