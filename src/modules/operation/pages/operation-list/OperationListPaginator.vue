<template>
  <ul class="pagination justify-content-center flex-wrap">
    <li
      :class="{
        'page-item': true,
        disabled: currentPage <= 1 || blockOperations,
      }"
      @click="previous(page)"
    >
      <a class="page-link">Previous</a>
    </li>

    <li
      v-for="page in totalPages"
      :key="page"
      @click="onPageClick(page)"
      :class="{
        'page-item': true,
        active: page === currentPage,
        disabled: blockOperations && page !== currentPage,
      }"
    >
      <a class="page-link">{{ page }}</a>
    </li>

    <li
      :class="{
        'page-item': true,
        disabled: currentPage >= totalPages || blockOperations,
      }"
      @click="next(page)"
    >
      <a class="page-link">Next</a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    totalPages: {
      type: Number,
      default: 20,
    },
    initialCurrentPage: {
      type: Number,
      default: 1,
    },
    blockOperations: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentPage: this.initialCurrentPage,
    };
  },
  methods: {
    onPageClick(page) {
      if (this.blockOperations) return;
      this.currentPage = page;
    },
    previous() {
      if (this.currentPage <= 1 || this.blockOperations) return;
      this.currentPage--;
    },
    next() {
      if (this.currentPage >= this.totalPages || this.blockOperations) return;
      this.currentPage++;
    },
  },
  watch: {
    currentPage() {
      this.$emit("pageChanged", this.currentPage);
    },
    initialCurrentPage() {
      this.currentPage = this.initialCurrentPage;
    },
  },
};
</script>

<style scoped>
.page-item {
  cursor: pointer;
}
.disabled {
  cursor: default;
}
</style>