<template>
  <router-view></router-view>
</template>

<script>
import { userConfirmation, toast, userAlert } from "./providers/sweet-alert";
import { userService } from "./providers/user";
import {
  authenticate,
  fetchOperationRecords,
  deleteOperationRecord,
  runOperation,
} from "@/providers/fetch";

export default {
  name: "App",
  components: {},
  provide() {
    const userServiceInstance = userService(authenticate, (route) =>
      this.$router.push(route)
    );

    return {
      userConfirmation: userConfirmation.bind(this),
      userAlert: userAlert.bind(this),
      showNotification: toast.bind(this),
      userService: userServiceInstance,
      fetchOperationRecords: fetchOperationRecords(userServiceInstance),
      deleteOperationRecord: deleteOperationRecord(userServiceInstance),
      runOperation: runOperation(userServiceInstance),
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
