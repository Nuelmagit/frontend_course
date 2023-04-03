<template>
  <Navbar @signOut="signOut" />

  <div class="operation-layout">
    <div class="container operation-layout-container">
      <div class="row no-gutters">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/modules/shared/components/Navbar.vue";
export default {
  inject: ["userService"],
  components: {
    Navbar,
  },
  methods: {
    signOut() {
      return this.userService.signOut();
    },
  },
};
</script>

<style scoped>
.operation-layout {
  background-color: rgba(0, 0, 0, 0.05);
}

.operation-layout-container {
  background-color: #ffffff;
  min-height: calc(100vh - 55.94px);
}
</style>