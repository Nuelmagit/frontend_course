<template>
  <div class="input-group mb-3">
    <input
      v-model="value"
      type="text"
      class="form-control"
      :placeholder="placeholder"
      :aria-label="placeholder"
      aria-describedby="button-addon2"
    />
    <button
      :class="{ 'btn btn-outline-secondary': true, disabled: blockOperations }"
      type="button"
      id="button-addon2"
      @click="onClick"
    >
      Search
    </button>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "Search in any column",
    },
    blockOperations: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value: "",
    };
  },
  methods: {
    onClick() {
      if (this.blockOperations) return;
      this.$emit("valueChanged", this.value);
    },
  },
};
</script>