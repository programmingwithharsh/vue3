<template>
  <div class="text-center mt-5">
    <h1 class="mt-4 h3 text-success">Registration done</h1>
    <p class="my-4">Thanks youn</p>
    <router-link to="/public"> click to return </router-link>
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