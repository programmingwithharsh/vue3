<template>
  <div class="text-center pt-4">
    <h1 class="text-primary">Register</h1>
    <form
      class="col-lg-5 offset-lg-3 my-4"
      v-bind:class="wasValidated"
      novalidate
      autocomplete="off"
    >
      <div class="row mb-3">
        <label for="regFullName" class="col-sm-4 col-form-label"
          >Full Name</label
        >
        <div class="col-sm-7 has-validation">
          <input
            type="text"
            class="form-control"
            id="regFullName"
            v-model="user.fullName"
            required
          />
          <div class="invalid-feedback text-start">
            Please enter your  name.
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <label for="regEmail" class="col-sm-4 col-form-label">Email</label>
        <div class="col-sm-7 has-validation">
          <input
            type="email"
            class="form-control"
            id="regEmail"
            v-model="user.email"
            required
          />
          <div class="invalid-feedback text-start">
            Please enter a valid email address.
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <label for="regPassword" class="col-sm-4 col-form-label"
          >Password</label
        >
        <div class="col-sm-7 has-validation">
          <input
            type="password"
            class="form-control"
            id="regPassword"
            v-model="user.password"
            required
          />
          <div class="invalid-feedback text-start">
            Please enter your Password.
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <label for="regConfirmPassword" class="col-sm-4 col-form-label"
          >Confirm Password</label
        >
        <div class="col-sm-7 has-validation">
          <input
            type="password"
            class="form-control"
            id="regConfirmPassword"
            v-model="user.confirmPassword"
            required
          />
          <div class="invalid-feedback text-start">
            Please confirm your Password.
          </div>
          <div
            v-if="errorAlert.isValid"
            class="mt-2 alert alert-danger text-start"
          >
            {{ errorAlert.message }}
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <label class="col-sm-4 col-form-label"></label>
        <div class="col-sm-7">
          <button
            type="button"
            class="btn btn-success btn-md mt-3 register-btn"
            @click="userRegister"
          >
            <i class="fa fa-user-plus" aria-hidden="true"></i> Register
          </button>
        </div>
      </div>
    </form>
    <p>
      if you have already registered?
      <router-link to="/public/users/login">Sign in</router-link>
    </p>
  </div>
</template>
<script>
export default {
  name: "RegisterComponent",
  data() {
    return {
      wasValidated: "",
      errorAlert: {
        isValid: false,
        message: "",
      },
      user: {
        id: this.getId(),
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    userRegister() {
      const { fullName, email, password, confirmPassword } = this.user;
      const getUsers = JSON.parse(localStorage.getItem("usersData")) || [];
      const loginUser = getUsers?.find((user) => user.email === email);
      if (
        fullName === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
      ) {
        // Check if any of the required fields are empty
        this.wasValidated = "was-validated";
      } else if (password.length < 8) {
        // Check if the password is less than 8 characters
        this.errorAlert = {
          isValid: true,
          message: "Password must be exactly 8 characters long.",
        };
      } else if (password !== confirmPassword) {
        // Check if the password and confirm password match
        this.errorAlert = {
          isValid: true,
          message: "The password and confirmation password do not match.",
        };
      } else if (
        loginUser !== undefined ||
        (loginUser && Object.keys(loginUser).length > 0)
      ) {
        // Check if the email already exists in the users data
        this.errorAlert = {
          isValid: true,
          message: "Email id already exists.",
        };
      } else {
        delete this.user.confirmPassword;
        const users = [...getUsers, this.user];
        localStorage.setItem("usersData", JSON.stringify(users));
        this.user = {
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        };
        this.wasValidated = "";
        this.errorAlert = {
          isValid: false,
          message: "",
        };
        this.$router.push("/public/users/registration-success");
      }
    },
    getId() {
      // Generate a random ID for the user
      return Math.random().toString(36).slice(2);
    },
  },
};
</script>
<style scoped>
.register-btn {
  min-width: 200px;
}
</style>