<template>
  <div class="text-center mt-5">
    <h1 class="mt-4 h2 text-success">Login Successfully</h1>
    <h5 class="my-5">Welcome ! {{ loginUser }}</h5>
  </div>
</template>
<script>
export default {
  name: "LoginSuccessful",
  props: {
    msg: String,
  },
  data() {
    return {
      loginUser: sessionStorage.getItem("loginUser"),
    };
  },
  created() {
    // Redirect to login page if not authenticated
    !sessionStorage.getItem("isAuthenticated") &&
      this.$router.push("/public/users/login");
  },
};
</script>
<style scoped></style>