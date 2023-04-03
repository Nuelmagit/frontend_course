<template>
  <div class="blocker">
    <Spinner />
  </div>
</template>

<script>
import Spinner from "@/modules/shared/components/Spinner.vue";
export default {
  components: { Spinner },
};
</script>

<style scoped>
.blocker {
z-index: 10;
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>