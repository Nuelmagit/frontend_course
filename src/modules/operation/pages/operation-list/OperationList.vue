<template>
  <div class="operation-list-container">
    <OperationListSearch @valueChanged="onSearch" :blockOperations="loading" />
    <OperationListTable
      :items="rows"
      @actionTriggered="confirmDelete"
      @sorted="onSorted"
      :loading="loading"
    />
    <OperationListPaginator
      :initialCurrentPage="currentPage"
      :totalPages="totalPages"
      :blockOperations="loading"
      @pageChanged="onPageChanged"
    />
  </div>
</template>

<script>
import OperationListTable from "./OperationListTable.vue";
import OperationListPaginator from "./OperationListPaginator.vue";
import OperationListSearch from "./OperationListSearch";
export default {
  inject: [
    "userConfirmation",
    "showNotification",
    "fetchOperationRecords",
    "deleteOperationRecord",
  ],
  components: {
    OperationListTable,
    OperationListPaginator,
    OperationListSearch,
  },
  data() {
    return {
      totalPages: 1,
      currentPage: 1,
      sortCriteria: "date",
      sortField: "desc",
      rows: [],
      loading: false,
      searchValue: "",
    };
  },
  created() {
    this.refreshTable();
  },
  methods: {
    refreshTable() {
      if (this.loading) return;
      this.loading = true;
      return this.fetchOperationRecords(
        this.currentPage,
        this.searchValue,
        this.sortField,
        this.sortCriteria
      )
        .then(({ totalPages, currentPage, rows }) => {
          this.currentPage = currentPage;
          this.totalPages = totalPages;
          this.rows = rows;
        })
        .finally(() => (this.loading = false));
    },
    deleteItem(id) {
      if (this.loading) return;
      this.loading = true;
      return this.deleteOperationRecord(id)
        .then(() => (this.loading = false))
        .then(() => {
          this.showNotification("success", "Record deleted successfully");
          this.refreshTable();
        });
    },
    confirmDelete({ action, id }) {
      if (this.loading) return;
      return this.userConfirmation({
        title: "Do you want to delete this record?",
        text: "This action won't trigger a refund.",
        icon: "warning",
      }).then((confirmed) => confirmed && this.deleteItem(id));
    },
    onSearch(value) {
      this.searchValue = value;
      this.currentPage = 1;
      this.refreshTable();
    },
    onPageChanged(page) {
      this.currentPage = page;
      this.refreshTable();
    },
    onSorted({ sortField, sortCriteria }) {
      this.sortField = sortField;
      this.sortCriteria = sortCriteria;
      this.refreshTable();
    },
  },
};
</script>


<style scoped>
.operation-list-container {
  width: 100%;
  padding: 15px;
  margin: auto;
}
</style>