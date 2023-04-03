<template>
  <div class="operation-container">
    <OperationForm @formSubmitted="onFormSubmitted" :loading="submitting" />
  </div>
</template>

<script>
import OperationForm from "./OperationForm.vue";
export default {
  inject: ["runOperation", "userAlert"],
  components: {
    OperationForm,
  },
  data() {
    return {
      submitting: false,
    };
  },
  methods: {
    onFormSubmitted(data) {
      if (this.submitting) return;
      this.submitting = true;
      return this.runOperation(data).then(({ operationResult }) => {
        this.submitting = false;
        this.userAlert(
          `Operation executed successfully.`,
          `The result is: ${operationResult}. To see full logs pelase go to records.`,
          "success"
        );
      });
    },
  },
};
</script>

<style scoped>
.operation-container {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
</style>