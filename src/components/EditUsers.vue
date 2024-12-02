<template>
  <div class="text-center pt-4">
    <h1>Edit User Information</h1>
    <form
      class="col-lg-5 offset-lg-3 my-4"
      v-bind:class="wasValidated"
      novalidate
      autocomplete="off"
    >
      <div class="row mb-3">
        <label for="inputFullName" class="col-sm-4 col-form-label"
          >Full Name</label
        >
        <div class="col-sm-7 has-validation">
          <input
            type="text"
            class="form-control"
            id="inputFullName"
            v-model="user.fullName"
            required
          />
          <div class="invalid-feedback text-start">
            Please enter a full name.
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <label for="inputEmail" class="col-sm-4 col-form-label">Email</label>
        <div class="col-sm-7 has-validation">
          <input
            type="email"
            class="form-control"
            id="inputEmail"
            v-model="user.email"
            @focus="inputEmailFocus"
            required
          />
          <div class="invalid-feedback text-start">
            Please enter a valid email address.
          </div>
          <div
            class="text-danger text-start mt-1"
            role="alert"
            v-if="emailInvalid"
          >
            Please enter a valid email address.
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <label class="col-sm-4 col-form-label"></label>
        <div class="col-sm-7">
          <button
            type="button"
            class="btn btn-success btn-md mt-3 save-btn"
            @click="editUser"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { useRoute, useRouter } from "vue-router";
import useSearch from "@/utils/useSearch";

export default {
  name: "EditUsers",
  setup() {
    const route = useRoute();
    const router = useRouter();

    // Check if user is authenticated, redirect to WelcomeComponent if not
    !sessionStorage.getItem("isAuthenticated") &&
      router.push({ name: "WelcomeComponent" });

    // Get users list from localStorage and perform search
    const usersList = JSON.parse(localStorage.getItem("usersData")) || [];
    const { searchResults, searchById } = useSearch(
      "",
      route.params.id,
      "productId",
      usersList
    );

    return {
      searchResults,
      searchById,
    };
  },
  data() {
    return {
      wasValidated: "",
      emailInvalid: false,
      user: this.searchResults,
    };
  },
  methods: {
    editUser() {
      const { email, fullName } = this.user;
      if (email === "" || fullName === "") {
        this.wasValidated = "was-validated";
      } else if (this.invalidEmail) {
        this.emailInvalid = true;
      } else {
        const getUsers = JSON.parse(localStorage.getItem("usersData")) || [];


        const selectedIndex = getUsers?.findIndex(
          (doc) => doc.id == this.user.id
        );
        getUsers.splice(selectedIndex, 1, this.user);
        localStorage.setItem(
          "usersData",
          JSON.stringify(getUsers)
        );
        this.emailInvalid = false;
        this.$router.push("/public/users/usermgt");
        this.wasValidated = "";
      }
    },
    inputEmailFocus() {
      this.emailInvalid = false;
    },
  },
  computed: {
    invalidEmail() {
      // Regular expression for email validation
      const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return !emailRegex.test(this.searchResults.email);
    },
  },
};
</script>
<style scoped>
.save-btn {
  min-width: 200px;
}
</style>