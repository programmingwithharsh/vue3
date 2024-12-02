<template>
  <div class="my-uploads">
    <h1 class="py-4">My Uploads</h1>
    <table class="table table-striped table-bordered">
      <thead class="table-dark">
        <tr>
          <th scope="col">Label</th>
          <th scope="col">File Name</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="doc in allDocuments" :key="doc.id">
          <td>{{ doc.description }}</td>
          <td>{{ doc.fileName }}</td>
          <td>
            <button
              class="btn btn-link text-danger-emphasis btn-md px-1 text-decoration-none"
              data-bs-toggle="modal"
              data-bs-target="#editModal"
              @click="selectedDocument(doc)"
            >
              Edit
            </button>
            |
            <button
              class="btn btn-link text-danger btn-md px-1 text-decoration-none"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
              @click="selectedDocument(doc)"
            >
              Delete
            </button>
            |
            <router-link
              class="btn btn-link text-info btn-md px-1 text-decoration-none"
              :to="'/public/docmgt/share/' + doc.id"
            >
              Share
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <h3
      v-if="allDocuments.length === 0"
      class="text-danger text-center mt-2 mb-5 fw-normal"
    >
      No users available
    </h3>
  </div>
  <div class="shared-uploads mb-4">
    <h1 class="py-4">Shared Uploads</h1>
    <table class="table table-striped table-bordered">
      <thead class="table-dark">
        <tr>
          <th scope="col">Label</th>
          <th scope="col">File Name</th>
          <th scope="col">Shared by</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="doc in allDocuments" :key="doc.id">
          <td>{{ doc.description }}</td>
          <td>{{ doc.fileName }}</td>
          <td>
            <ul class="list-group list-group-flush" v-if="doc.sharedBy">
              <li
                class="list-group-item"
                v-for="share in doc.sharedBy"
                :key="share.id"
              >
                {{ share.email }}
              </li>
            </ul>
            <div v-if="doc?.sharedBy?.length === 0">-</div>
          </td>
        </tr>
      </tbody>
    </table>
    <button
      class="btn btn-primary btn-sm"
      data-bs-toggle="modal"
      data-bs-target="#uploadModal"
      @click="uploadModal"
    >
      + Add Upload
    </button>
  </div>

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
            Confirm File Deletion
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="closeModel"
          ></button>
        </div>
        <div class="modal-body">Are you Sure?</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-danger"
            @click="deletedDocument"
            data-bs-dismiss="modal"
          >
            Delete
          </button>
          <button
            type="button"
            class="btn btn-dark"
            data-bs-dismiss="modal"
            @click="closeModel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
  <!--Delete Modal End -->

  <!--Upload Modal Start -->
  <div
    id="uploadModal"
    tabindex="-1"
    aria-labelledby="uploadModalLabel"
    aria-hidden="true"
    class="modal fade"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fs-5" id="uploadModalLabel">Upload</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="closeModel"
          ></button>
        </div>
        <div class="modal-body">
          <form v-bind:class="uploadWasValidated" novalidate autocomplete="off">
            <div class="mb-3 row">
              <label for="staticDescription" class="col-sm-4 col-form-label"
                >File Description</label
              >
              <div class="col-sm-8 has-validation">
                <input
                  type="text"
                  class="form-control"
                  id="staticDescription"
                  v-model="uploadDoc.desc"
                  @change="onDescriptionChange"
                  required
                />
                <div class="invalid-feedback text-start">
                  This is required field.
                </div>
              </div>
            </div>
            <div class="mb-3 row">
              <label for="inputFile" class="col-sm-4 col-form-label"
                >File Upload</label
              >
              <div class="col-sm-8 has-validation">
                <input
                  type="file"
                  class="form-control"
                  id="inputFile"
                  @change="onFileChange"
                  required
                />
                <div class="invalid-feedback text-start">
                  This is required field.
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-success"
            @click="uploadDocument"
            :data-bs-dismiss="uploadCloseModal"
          >
            Upload Now
          </button>
          <button
            type="button"
            class="btn btn-dark"
            data-bs-dismiss="modal"
            @click="closeModel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
  <!--Upload Modal End -->

  <!--Edit Modal Start -->
  <div
    class="modal fade"
    id="editModal"
    tabindex="-1"
    aria-labelledby="editModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fs-5" id="editModalLabel">Edit</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="closeModel"
          ></button>
        </div>
        <div class="modal-body">
          <form v-bind:class="saveWasValidated" novalidate autocomplete="off">
            <div class="mb-3 row">
              <label for="description" class="col-sm-4 col-form-label"
                >File Description</label
              >
              <div class="col-sm-8 has-validation">
                <input
                  type="text"
                  class="form-control"
                  id="description"
                  v-model="this.editDoc.description"
                  @change="onEditChange"
                  required
                />
                <div class="invalid-feedback text-start">
                  This is required field.
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-success"
            @click="saveDocument"
            :data-bs-dismiss="saveCloseModal"
          >
            Save
          </button>
          <button
            type="button"
            class="btn btn-dark"
            data-bs-dismiss="modal"
            @click="closeModel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
  <!--Edit Modal End -->
</template>
<script>
import { useRouter } from "vue-router";
export default {
  name: "DocumentList",
  setup() {
    const router = useRouter();

    // Check if user is authenticated, redirect to WelcomeComponent if not
    !sessionStorage.getItem("isAuthenticated") &&
      router.push({ name: "WelcomeComponent" });
  },
  data() {
    return {
      saveCloseModal: "modal",
      uploadCloseModal: "modal",
      saveWasValidated: "",
      uploadWasValidated: "",
      allDocuments: JSON.parse(localStorage.getItem("documentsData")) || [],
      uploadDoc: {
        desc: "",
        name: "",
      },
      editDoc: {
        id: "",
        description: "",
        fileName: "",
      },
    };
  },
  methods: {
    // Show/hide upload modal based on input values
    uploadModal() {
      const { desc, name } = this.uploadDoc;
      this.uploadCloseModal = desc && name ? "modal" : "";
    },

    // Upload a new document
    uploadDocument() {
      const { desc, name } = this.uploadDoc;
      if (desc === "" || name === "") {
        this.uploadCloseModal = desc && name ? "modal" : "";
        this.uploadWasValidated = "was-validated";
      } else {
        this.allDocuments.push({
          id: Math.random().toString(36).slice(2),
          description: this.uploadDoc.desc,
          fileName: this.uploadDoc.name,
          sharedBy: []
        });
        localStorage.setItem(
          "documentsData",
          JSON.stringify(this.allDocuments)
        );
        this.allDocuments =
          JSON.parse(localStorage.getItem("documentsData")) || [];
        this.uploadWasValidated = "";
      }
    },

    // Handle file input change
    onFileChange(event) {
      let fileData = event.target.files[0];
      this.uploadDoc.name = fileData.name;
      const { desc, name } = this.uploadDoc;
      this.uploadCloseModal = desc && name ? "modal" : "";
    },

    // Handle edit description change
    onEditChange() {
      this.saveCloseModal = this.editDoc.description ? "modal" : "";
    },

    // Handle upload description change
    onDescriptionChange() {
      const { desc, name } = this.uploadDoc;
      this.uploadCloseModal = desc && name ? "modal" : "";
    },

    // Select a document for editing
    selectedDocument(data) {
      const { id, description, fileName } = data;
      this.editDoc = { id, description, fileName };
    },

    // Save edited document
    saveDocument() {
      if (this.editDoc.description == "") {
        this.saveCloseModal = this.editDoc.description ? "modal" : "";
        this.saveWasValidated = "was-validated";
      } else {
        const selectedIndex = this.allDocuments?.findIndex(
          (doc) => doc.id == this.editDoc.id
        );
        this.allDocuments.splice(selectedIndex, 1, this.editDoc);
        this.saveCloseModal = this.editDoc.description ? "modal" : "";
        localStorage.setItem(
          "documentsData",
          JSON.stringify(this.allDocuments)
        );
        this.allDocuments =
          JSON.parse(localStorage.getItem("documentsData")) || [];
        this.saveWasValidated = "";
      }
    },

    // Delete a document
    deletedDocument() {
      this.allDocuments = this.allDocuments?.filter(
        (doc) => doc.id !== this.editDoc.id
      );
      localStorage.setItem("documentsData", JSON.stringify(this.allDocuments));
    },

    // Clear validation states when modal is closed
    closeModel() {
      this.saveWasValidated = "";
      this.uploadWasValidated = "";
    },
  },
  updated() {
    // Update chat list from localStorage
    this.chatList = JSON.parse(localStorage.getItem("chatsData")) || [];
    this.allDocuments = JSON.parse(localStorage.getItem("documentsData")) || [];
  },
};
</script>
<style scoped>
.table-striped>tbody>tr:nth-of-type(odd)>* .list-group-item {
  background: #f2f2f2 !important;
}
</style>
