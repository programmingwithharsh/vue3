<template>
  <nav class="nav-app" v-if="isAuthenticated">
    <ul class="nav nav-pills nav-fill">
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'GroupChat' }">
          <i class="fa fa-comments" aria-hidden="true"></i> Group Chat
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'UserList' }">
          <i class="fa fa-users" aria-hidden="true"></i> Manage Users
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'DocumentList' }">
          <i class="fa fa-file-text" aria-hidden="true"></i> Manage Documents
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" @click="logout" to="/p">
          <i class="fa fa-sign-out" aria-hidden="true"></i> Logout
        </router-link>
      </li>
    </ul>
  </nav>
</template>
<script>
import { RouterLink } from "vue-router";
export default {
  name: "NavigationComponent",
  props: {
    msg: String,
  },
  components: { RouterLink },
  data() {
    return {
      isAuthenticated: sessionStorage.getItem("isAuthenticated") ? true : false,
    };
  },
  methods: {
    logout() {
      // Remove authentication and login user data from sessionStorage
      sessionStorage.removeItem("isAuthenticated");
      sessionStorage.removeItem("loginUser");
      this.isAuthenticated = false;
    },
  },
  mounted() {
    // Watch for changes in the route path
    this.$watch(
      () => this.$route.path,
      () => {
        // Check if the user is authenticated based on sessionStorage data
        const auth = sessionStorage.getItem("isAuthenticated");
        this.isAuthenticated = auth ? true : false;
      }
    );
  },
};
</script>
<style scoped>
.nav-app .nav-item a {
  background-color: #0d6efd;
  color: #fff;
  border: 1px solid;
  border-top-color: #0d6efd;
  border-bottom-color: #0d6efd;
  border-left-color: #f8f9fa;
  border-right-color: #f8f9fa;
  border-radius: 0;
}
.nav-app .nav-item .router-link-active {
  background-color: #f8f9fa;
  color: #0d6efd;
  border-color: #0d6efd;
}
</style>