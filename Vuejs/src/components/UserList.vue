<template>
  <h1 class="py-4">Users</h1>
  <table class="table table-striped table-bordered">
    <thead class="table-dark">
      <tr>
        <th scope="col">Name</th>
        <th scope="col">User Email ID</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in usersList" :key="user.id">
        <td>{{ user.fullName }}</td>
        <td>{{ user.email }}</td>
        <td>
          <router-link
            class="btn btn-link text-danger-emphasis btn-md px-1 text-decoration-none"
            :to="'/public/users/edit/' + user.id"
          >
            Edit
          </router-link>
          |
          <button
            class="btn btn-link text-danger btn-md px-1 text-decoration-none"
            data-bs-toggle="modal"
            data-bs-target="#deleteModal"
            @click="deleteConfirmUser($event, user.id)"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <h2 v-if="usersList.length === 0" class="text-danger text-center mt-5">
    data is not available
  </h2>

  <!--Delete Modal Start -->
  <div
    class="modal fade"
    id="deleteModal"
    tabindex="-1"
    aria-labelledby="deleteModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fs-5" id="deleteModalLabel">
            Confirm User Deletion
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">Are you Sure?</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-danger"
            @click="deletedUser"
            data-bs-dismiss="modal"
          >
            Delete
          </button>
          <button type="button" class="btn btn-dark" data-bs-dismiss="modal">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
  <!--Delete Modal End -->
</template>
<script>
import useSearch from "@/utils/useSearch";
import { useRouter } from "vue-router";
export default {
  name: "UserList",
  setup(props) {
    const router = useRouter();

    // Check if user is authenticated, redirect to WelcomeComponent if not
    !sessionStorage.getItem("isAuthenticated") &&
      router.push({ name: "WelcomeComponent" });

    // Get the users list from localStorage
    const usersList = JSON.parse(localStorage.getItem("usersData")) || [];

    // Use the useSearch function to get search results and search by name
    const { searchResults, searchByName } = useSearch(
      props.searchTerm,
      "",
      "productName",
      usersList
    );

    return {
      searchResults,
      searchByName,
    };
  },
  data() {
    return {
      usersList: this.searchResults,
      selectUser: null,
    };
  },
  methods: {
    // Confirm the deletion of a user
    deleteConfirmUser(e, id) {
      this.selectUser = id;
    },
    // Delete a user from the users list
    deletedUser() {
      const getUsers = JSON.parse(localStorage.getItem("usersData")) || [];
      const allUser = getUsers?.filter((user) => user.id !== this.selectUser);
      localStorage.setItem("usersData", JSON.stringify([...allUser]));
      this.usersList = JSON.parse(localStorage.getItem("usersData"));
      this.selectUser = null;
      // If there are no users left, redirect to the login page and remove authentication data
      if (this.usersList.length === 0) {
        this.$router.push("/public/users/login");
        sessionStorage.removeItem("isAuthenticated");
        sessionStorage.removeItem("loginUser");
        this.isAuthenticated = false;
      }
    },
  },
};
</script>