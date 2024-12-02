<template>
  <div class="container">
    <Navigation />
    <router-view></router-view>
  </div>
</template>

<script>
import chatList from "@/data/chatList";
import docList from "@/data/docList";
import usersList from "@/data/usersList";
import Navigation from "./components/Navigation.vue";
export default {
  components: { Navigation },
  name: "App",
  setup() {
    const chatsData = JSON.parse(localStorage.getItem("chatsData")) || [];
    const documentsData =
      JSON.parse(localStorage.getItem("documentsData")) || [];
    const usersData = JSON.parse(localStorage.getItem("usersData")) || [];
    chatsData.length === 0 &&
      localStorage.setItem("chatsData", JSON.stringify(chatList));
    documentsData.length === 0 &&
      localStorage.setItem("documentsData", JSON.stringify(docList));
    usersData.length === 0 &&
      localStorage.setItem("usersData", JSON.stringify(usersList));
  },
};
</script>
<style>
.table-dark,
th {
  background-color: #737373 !important;
}
</style>
