<template>
  <div class="text-center pt-4">
    <h1 class="text-primary">Login</h1>
    <form
      class="col-lg-5 offset-lg-3 my-4"
      v-bind:class="wasValidated"
      novalidate
      autocomplete="off"
    >
      <div class="row mb-3">
        <label for="loginEmail" class="col-sm-4 col-form-label">Email</label>
        <div class="col-sm-7 has-validation">
          <input
            type="email"
            class="form-control"
            id="loginEmail"
            v-model="user.email"
            required
          />
          <div class="invalid-feedback text-start">
            Please enter a valid email address.
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <label for="loginPassword" class="col-sm-4 col-form-label"
          >Password</label
        >
        <div class="col-sm-7 has-validation">
          <input
            type="password"
            class="form-control"
            id="loginPassword"
            v-model="user.password"
            required
          />
          <div class="invalid-feedback text-start">
            Please enter your password.
          </div>
          <div
            class="alert text-start mt-1"
            role="alert"
            v-bind:class="errorAlert.alertClass"
            v-if="errorAlert.isValid"
          >
            {{ errorAlert.message }}
          </div>
        </div>
      </div>
      <div class="row mb-2">
        <label class="col-sm-4 col-form-label"></label>
        <div class="col-sm-7">
          <button
            type="button"
            class="btn btn-success btn-md mt-3 login-btn"
            @click="userLogin"
          >
            <i class="fa fa-sign-in" aria-hidden="true"></i> Login
          </button>
        </div>
      </div>
    </form>
    <p>
      Don't have an account?
      <router-link to="/public/users/register">Sign up</router-link>
    </p>
  </div>
</template>
<script>
export default {
  name: "LoginComponent",
  data() {
    return {
      isAuthenticated: true,
      wasValidated: "",
      user: {
        email: "",
        password: "",
      },
      errorAlert: {
        isValid: false,
        message: "",
        alertClass: "",
      },
    };
  },
  methods: {
    userLogin() {
      const { email, password } = this.user;
      if (email === "" || password === "") {
        this.wasValidated = "was-validated";
      } else {
        const getUsers = JSON.parse(localStorage.getItem("usersData")) || [];
        const loginUser = getUsers?.find((user) => user.email === email);
        if (
          loginUser === undefined ||
          (loginUser && Object.keys(loginUser).length === 0)
        ) {
          // User not found, display error alert
          this.errorAlert = {
            isValid: true,
            message: "User Invalid",
            alertClass: "alert-danger",
          };
        } else if (loginUser?.password !== password) {
          // Incorrect password, display error alert
          this.errorAlert = {
            isValid: true,
            message: "Your password is wrong",
            alertClass: "alert-danger",
          };
        } else {
          // Successful login
          sessionStorage.setItem("isAuthenticated", true);
          sessionStorage.setItem("loginUser", this.user.email);
          this.$router.push("/public/users/login-success");
          this.errorAlert = {
            isValid: true,
            message: "Login Successfully",
            alertClass: "alert-success",
          };
          this.user = {
            email: "",
            password: "",
          };
          this.wasValidated = "";
        }
      }
    },
  },
  computed: {
    invalidEmail() {
      // Regular expression for email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !emailRegex.test(this.user.email);
    },
  },
};
</script>
<style scoped>
.login-btn {
  min-width: 200px;
}
</style>
