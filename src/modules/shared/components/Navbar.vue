<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" v-for="link in links" :key="link.to">
            <router-link :to="{ name: link.to }" v-slot="{ isActive }">
              <a :class="{ 'nav-link': true, active: isActive }">{{
                link.name
              }}</a>
            </router-link>
          </li>
        </ul>

        <button @click="onClick" class="btn btn-outline-danger" type="submit">
          Sign out
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { to: "operation-home", name: "Records" },
        { to: "operation-run", name: "Run operation" },
      ],
    };
  },
  methods: {
    onClick() {
      this.$emit("signOut");
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>