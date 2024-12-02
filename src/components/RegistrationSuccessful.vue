<template>
  <div class="text-center mt-5">
    <h1 class="mt-4 h2 text-success">Registration Successfully</h1>
    <p class="my-4">Thanks you for your registration</p>
    <router-link to="/public"> click to return to home page </router-link>
  </div>
</template>
<script>
export default {
  name: "RegistrationSuccessful",
  props: {
    msg: String,
  },
};
</script>
<style scoped></style>