<template>
  <div class="operation-form-container">
    <Blocker v-if="loading" />
    <form @submit.prevent="onFormSubmit">
      <div class="form-floating mb-3">
        <select
          class="form-select"
          id="floatingInput"
          aria-label="Default select example"
          v-model="operation"
          required
        >
          <option
            v-for="option in availableOperations"
            :key="option.id"
            :value="option.id"
          >
            {{ option.title }}
          </option>
        </select>
        <label for="floatingInput">Operation</label>
      </div>

      <div class="input-group mb-3">
        <div class="form-floating" v-if="addFirstValue">
          <input
            type="number"
            autocomplete="off"
            class="form-control"
            id="firstValue"
            v-model="firstValue"
            required
          />
          <label for="firstValue">Value</label>
        </div>

        <span v-if="addSecondValue" class="input-group-text">{{
          operationSymbol
        }}</span>

        <div class="form-floating" v-if="addSecondValue">
          <input
            type="number"
            autocomplete="off"
            class="form-control"
            id="secondValue"
            v-model="secondValue"
            required
          />
          <label for="secondValue">Value</label>
        </div>
      </div>

      <div class="button-container">
        <button class="w-100 btn btn-lg btn-primary" type="submit">
          Submit
        </button>
        <button
          @click="clear"
          class="w-100 btn btn-lg btn-secondary"
          type="button"
        >
          Clear
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Blocker from "@/modules/shared/components/Blocker.vue";
export default {
  components: { Blocker },
  emits: ["formSubmitted"],
  props: {
    loading: { type: Boolean, default: false },
  },
  data() {
    return {
      availableOperations: [
        { id: "addition", title: "Addition" },
        { id: "subtraction", title: "Subtraction" },
        { id: "multiplication", title: "Multiplication" },
        { id: "division", title: "Division" },
        { id: "squareRoot", title: "Square root" },
        { id: "randomString", title: "Random string" },
      ],
      symbols: {
        addition: "+",
        subtraction: "-",
        multiplication: "x",
        division: "/",
      },
      operation: "addition",
      firstValue: undefined,
      secondValue: undefined,
    };
  },
  methods: {
    clear() {
      this.firstValue = undefined;
      this.secondValue = undefined;
    },
    onFormSubmit() {
      if (this.disable) return;
      this.$emit("formSubmitted", {
        operationTypeId: this.operation,
        ...(this.addFirstValue && this.addSecondValue
          ? { values: [this.firstValue, this.secondValue] }
          : {}),
        ...(this.addFirstValue && !this.addSecondValue
          ? { value: this.firstValue }
          : {}),
      });
    },
  },
  computed: {
    operationSymbol() {
      return this.symbols[this.operation];
    },
    addFirstValue() {
      return this.operation !== "randomString";
    },
    addSecondValue() {
      return !["squareRoot", "randomString"].includes(this.operation);
    },
  },
};
</script>

<style scoped>
.operation-form-container {
  position: relative;
  margin-bottom: 1rem;
}

.button-container {
  display: flex;
  gap: 10px;
}
</style>