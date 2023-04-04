<template>
  <div class="operation-list-table-container">
    <Blocker v-if="loading" />
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th
              v-for="column in columns"
              :key="column.id"
              scope="col"
              @click="sort(column.id)"
            >
              <div class="clickable-column">
                <div>{{ column.title }}</div>
                <div class="arrow" v-if="sortField === column.id">
                  <span v-if="sortCriteria === 'asc'">&#x25B2;</span>
                  <span v-if="sortCriteria === 'desc'">&#x25BC;</span>
                </div>
                <div class="arrow" v-else></div>
              </div>
            </th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item._id">
            <td>{{ item.operationType }}</td>
            <td>{{ item.cost }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.operationResult }}</td>
            <td>{{ item.balanceAfterOperation }}</td>
            <td>
              <button
                @click="onClick(item._id)"
                type="button"
                class="btn btn-danger"
              >
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Blocker from "@/modules/shared/components/Blocker.vue";
export default {
  components: { Blocker },
  props: {
    loading: { type: Boolean, default: false },
    items: { type: Array, default: [] },
    initialSortField: { type: String, default: "date" },
    initialSortCriteria: { type: String, default: "desc" },
  },
  data() {
    return {
      sortField: this.initialSortField,
      sortCriteria: this.initialSortCriteria,
      columns: [
        { id: "operationType", title: "Operation " },
        { id: "cost", title: "Cost" },
        { id: "date", title: "Date" },
        { id: "operationResult", title: "Result" },
        { id: "balanceAfterOperation", title: "Balance" },
      ],
    };
  },
  methods: {
    onClick(id) {
      this.$emit("delete", id);
    },
    sort(id) {
      this.sortField = id;
      this.sortCriteria = this.sortCriteria === "asc" ? "desc" : "asc";
      this.$emit("sorted", {
        sortField: this.sortField,
        sortCriteria: this.sortCriteria,
      });
    },
  },
};
</script>

<style scoped>
.table {
  margin-bottom: 0px;
}

.operation-list-table-container {
  position: relative;
  margin-bottom: 1rem;
}

.clickable-column {
  cursor: pointer;
  display: flex;
  justify-content: center;
}
.arrow {
  min-width: 15.84px;
  margin: 0 5px;
}
</style>