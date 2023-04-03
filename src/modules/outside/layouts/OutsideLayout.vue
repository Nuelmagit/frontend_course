<template>
  <div class="outside-layout-container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style>
.outside-layout-container {
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>