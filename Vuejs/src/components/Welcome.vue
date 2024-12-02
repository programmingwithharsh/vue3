<template>
  <div class="text-center mt-5">
    <h1 class="mt-4">Welcome to Users Module</h1>
    <h4 class="my-5">Exiting Users</h4>
    <router-link
      class="btn btn-success btn-md"
      :to="{ name: 'LoginComponent' }"
    >
      <i class="fa fa-sign-in" aria-hidden="true"></i> Login
    </router-link>
    <h4 class="my-5">New Users</h4>
    <router-link
      class="btn btn-primary btn-md"
      :to="{ name: 'RegisterComponent' }"
    >
      <i class="fa fa-user-plus" aria-hidden="true"></i> Register
    </router-link>
  </div>
</template>
<script>
export default {
  name: "WelcomeComponent",
  props: {
    msg: String,
  },
};
</script>