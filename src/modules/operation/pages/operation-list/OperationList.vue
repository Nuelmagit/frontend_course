<template>
  <div class="operation-list-container">
    <div class="row mb-3">
      <div class="col-10">
        <OperationListSearch
          @valueChanged="onSearch"
          :blockOperations="loading"
        />
      </div>
      <div class="col-2 per-page-container">
        <select
          @change="onPerPageChanged"
          class="form-select per-page-selector"
          v-model="perPage"
          :disabled="loading"
        >
          <option
            v-for="option in perPageOptions"
            :key="option"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
      </div>
    </div>
    <OperationListTable
      :items="rows"
      @delete="confirmDelete"
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
      perPageOptions: [5, 10, 50, 100],
      perPage: 5,
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
        this.sortCriteria,
        this.perPage
      )
        .then(({ totalPages, currentPage, rows }) => {
          this.currentPage = currentPage;
          this.totalPages = totalPages;
          this.rows = rows;
        })
        .catch((error) => {
          this.showNotification("error", error.detail);
        })
        .finally(() => (this.loading = false));
    },
    deleteItem(id) {
      if (this.loading) return;
      this.loading = true;
      return this.deleteOperationRecord(id)
        .then(() => {
          this.loading = false;
          this.showNotification("success", "Record deleted successfully");
          this.refreshTable();
        })
        .catch((error) => {
          this.loading = false;
          this.showNotification("error", error.detail);
        });
    },
    confirmDelete(id) {
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
    onPerPageChanged() {
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

.per-page-container {
  display: flex;
  justify-content: end;
}

.per-page-selector {
  max-width: 83px;
}
</style>