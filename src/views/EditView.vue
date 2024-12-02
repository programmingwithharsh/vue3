<template>
  <p>User: {{ $route.params.id }}</p>
  <router-view></router-view>
</template>
<script>
export default {
  name: "EditView",
};
</script>