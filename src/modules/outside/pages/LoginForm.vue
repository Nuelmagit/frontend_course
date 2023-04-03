<template>
  <div class="login-form-container">
    <Blocker v-if="loading" />
    <form @submit.prevent="formSubmit">
      <div class="form-floating">
        <input
          type="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          oninput="setCustomValidity('')"
          oninvalid="this.setCustomValidity('Enter a valid email.')"
          autocomplete="off"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          v-model="email"
          required
        />
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
          v-model="password"
          required
        />
        <label for="floatingPassword">Password</label>
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="submit">
        Sign in
      </button>
    </form>
  </div>
</template>

<script>
import Blocker from "@/modules/shared/components/Blocker.vue";
export default {
  components: { Blocker },
  props: {
    loading: { type: Boolean, default: false },
  },
  data() {
    return {
      email: undefined,
      password: undefined,
    };
  },
  methods: {
    formSubmit() {
      this.$emit("formSubmitted", { ...this.$data });
    },
  },
};
</script>

<style scoped>
.login-form-container {
  position: relative;
}

.form-floating:focus-within {
  z-index: 2;
}

input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>

