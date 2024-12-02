<template>
  <h3 class="py-4">
    Upload Sharing : <span class="fw-light">{{ sharedList.fileName }}</span>
  </h3>
  <table class="table table-striped table-bordered">
    <thead class="table-dark">
      <tr>
        <th scope="col" class="w-50">Shared User</th>
        <th scope="col" class="w-50 text-center">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in sharedList.sharedBy" :key="user.id">
        <td>{{ user.fullName }}</td>
        <td class="text-center">
          <button
            class="btn btn-link text-danger btn-md px-1 text-decoration-none"
            data-bs-toggle="modal"
            data-bs-target="#deleteModal"
            @click="deleteConfirmUser($event, user.id)"
          >
            Remove
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <h3
    v-if="sharedList?.sharedBy?.length === 0"
    class="text-danger text-center mt-4 mb-5 fw-normal"
  >
    This data is not shared with anyone
  </h3>
  <div class="card mt-1">
    <div class="card-body">
      <form
        class="row g-3"
        v-bind:class="wasValidated"
        novalidate
        autocomplete="off"
      >
        <div class="col-3">
          <div class="input-group has-validation">
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="shareDataEmail"
              required
              :disabled="isDisabled"
              id="chooseUser"
            >
              <option class="non-user" value="" disabled v-if="!isDisabled">
                Choose a user
              </option>
              <option class="non-user" value="" disabled v-if="isDisabled">
                No User Found
              </option>
              <option
                v-for="user in users"
                :key="user.id"
                :value="user.email"
                :selected="user.email === shareDataEmail"
              >
                {{ user.fullName }}
              </option>
            </select>
            <div class="invalid-feedback">Please choose a username.</div>
          </div>
        </div>
        <div class="col-3">
          <button
            type="button"
            class="btn btn-primary mx-1"
            v-on:click="shareToUser"
            :disabled="isDisabled"
          >
            Add Share
          </button>
        </div>
        <div class="text-danger" v-if="users.length === 0">
          <strong>{{ sharedList.fileName }}</strong> file is shared with all
          users.
        </div>
      </form>
    </div>
  </div>

  <!-- Delete Modal Start-->
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
  <!-- Delete Modal End-->
</template>
<script>
import { useRoute, useRouter } from "vue-router";
import useSearch from "@/utils/useSearch";
export default {
  name: "ShareComponent",
  setup() {
    const route = useRoute();
    const router = useRouter();
    // Redirect to WelcomeComponent if not authenticated
    !sessionStorage.getItem("isAuthenticated") &&
      router.push({ name: "WelcomeComponent" });

    // Retrieve documentsData from localStorage
    const docList = JSON.parse(localStorage.getItem("documentsData")) || [];

    // Perform search using searchById from useSearch
    const { searchResults, searchById } = useSearch(
      "",
      route.params.id,
      "productId",
      docList
    );

    return {
      searchResults,
      searchById,
    };
  },
  data() {
    const selectedSharedId = this.$route.params.id;

    // Retrieve usersData and documentsData from localStorage
    const usersData = JSON.parse(localStorage.getItem("usersData")) || [];
    const documentsData =
      JSON.parse(localStorage.getItem("documentsData")) || [];

    // Find the selectedShared document
    const selectedShared = documentsData?.find(
      (doc) => doc.id == selectedSharedId
    );

    // Filter users that are not already shared with
    const filteredUsersArray = usersData.filter((obj1) => {
      return !selectedShared?.sharedBy?.some(
        (obj2) => obj2.email === obj1.email
      );
    });

    return {
      shareDataEmail: "",
      wasValidated: "",
      isDisabled: false,
      users: filteredUsersArray,
      sharedList: this.searchResults,
      selectDeleteUser: null,
      allDocuments: JSON.parse(localStorage.getItem("documentsData")) || [],
    };
  },
  methods: {
    deleteConfirmUser(e, id) {
      this.selectDeleteUser = id;
    },
    deletedUser() {
      const selectedSharedId = this.$route.params.id;
      const selectedIndex = this.allDocuments?.findIndex(
        (doc) => doc.id == selectedSharedId
      );
      // Find the selectedShared document
      const selectedShared = this.allDocuments?.find(
        (user) => user.id == selectedSharedId
      );
      // Filter out the selected user from sharedBy array
      const sharedBy = selectedShared.sharedBy?.filter(
        (user) => user.id != this.selectDeleteUser
      );

      selectedShared.sharedBy = sharedBy;

      // Create a new document list with the updated sharedBy array
      this.allDocuments.splice(selectedIndex, 1, { ...selectedShared });

      // Update documentsData in localStorage
      localStorage.setItem("documentsData", JSON.stringify(this.allDocuments));

      // Update sharedList
      this.sharedList = this.allDocuments?.find(
        (user) => user.id == selectedSharedId
      );
    },
    shareToUser() {
      const selectedSharedId = this.$route.params.id;
      const selectedIndex = this.allDocuments?.findIndex(
        (doc) => doc.id == selectedSharedId
      );
      if (this.shareDataEmail === "") {
        this.wasValidated = "was-validated";
      } else {
        const selectedShareUser = this.users?.find(
          (user) => user.email == this.shareDataEmail
        );
        const selectedShared = this.allDocuments?.find(
          (user) => user.id == selectedSharedId
        );

        delete selectedShareUser.password;
        selectedShareUser.id = Math.random().toString(36).slice(2);
        selectedShared.sharedBy > 0 ? selectedShared.sharedBy : [];
        selectedShared.sharedBy?.push(selectedShareUser);

        this.allDocuments.splice(selectedIndex, 1, { ...selectedShared });

        // Update documentsData in localStorage
        localStorage.setItem(
          "documentsData",
          JSON.stringify(this.allDocuments)
        );

        // Update sharedList
        this.sharedList = this.allDocuments?.find(
          (user) => user.id == selectedSharedId
        );

        this.shareDataEmail = "";
        this.wasValidated = "";
      }
    },
  },
  updated() {
    const selectedSharedId = this.$route.params.id;

    // Retrieve usersData and documentsData from localStorage
    const usersData = JSON.parse(localStorage.getItem("usersData")) || [];
    const documentsData =
      JSON.parse(localStorage.getItem("documentsData")) || [];

    // Find the selectedShared document
    const selectedShared = documentsData?.find(
      (doc) => doc.id == selectedSharedId
    );

    // Filter users that are not already shared with
    const filteredUsersArray = usersData.filter((obj1) => {
      return !selectedShared?.sharedBy?.some(
        (obj2) => obj2.email === obj1.email
      );
    });

    this.users = filteredUsersArray;
    this.isDisabled = this.users.length === 0 ? true : false;
  },
};
</script>