<template>
  <h4 class="mt-4 text-center">Group Chat</h4>
  <div class="mt-4 card group-chat-board">
    <div class="card-body">
      <p v-for="chat in chatList" :key="chat.user">
        [{{ chat.date }}] <span class="fw-bold">{{ chat.user }}</span> :{{
          chat.message
        }}.
      </p>
    </div>
  </div>
  <div class="card mt-1">
    <div class="card-body">
      <form
        class="row g-3"
        v-bind:class="wasValidated"
        novalidate
        autocomplete="off"
      >
        <div class="col-2">
          <div class="input-group has-validation">
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="chatData.user"
              required
            >
              <option class="non-user" value="" disabled>Choose a user</option>
              <option
                v-for="user in users"
                :key="user.id"
                :value="user.fullName"
                :selected="user.fullName === chatData.user"
              >
                {{ user.fullName }}
              </option>
            </select>
            <div class="invalid-feedback">Please choose a username.</div>
          </div>
        </div>
        <div class="col-6">
          <label for="inputChat" class="visually-hidden">Anne Hunter</label>
          <div class="input-group has-validation">
            <input
              type="text"
              class="form-control"
              id="inputChat"
              placeholder="Chat"
              v-model="chatData.message"
              required
            />
            <div class="invalid-feedback">Please write the message.</div>
          </div>
        </div>
        <div class="col-3">
          <button
            type="button"
            class="btn btn-primary mx-1"
            v-on:click="sendMsg"
          >
            Send
          </button>
          <button
            type="button"
            class="btn btn-info mx-1"
            v-on:click="refreshChat"
          >
            Refresh
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { useRouter } from "vue-router";

export default {
  name: "GroupChat",
  setup() {
    const router = useRouter();

    // Check if user is authenticated, redirect to WelcomeComponent if not
    !sessionStorage.getItem("isAuthenticated") &&
      router.push({ name: "WelcomeComponent" });

    return {
      getChatsData: JSON.parse(localStorage.getItem("chatsData")) || [],
    };
  },
  data() {
    return {
      wasValidated: "",
      chatData: {
        user: "",
        message: "",
      },
      chatList: this.getChatsData,
      users: JSON.parse(localStorage.getItem("usersData")) || [],
    };
  },
  methods: {
    refreshChat() {
      // Reset chat input fields and validation state
      this.chatData = {
        ...this.chatData,
        user: "",
        message: "",
      };
      this.wasValidated = "";
    },
    sendMsg() {
      const { user, message } = this.chatData;
      const getChatsData = JSON.parse(localStorage.getItem("chatsData")) || [];
      const getId = Math.random().toString(36).slice(2);
      const date = new Date();
      const getDate =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds();

      if (user == "" && message == "") {
        this.wasValidated = "was-validated";
      } else {
        const data = [
          ...getChatsData,
          { id: getId, date: getDate, ...this.chatData },
        ];
        localStorage.setItem("chatsData", JSON.stringify(data));
        this.chatData = {
          ...this.chatData,
          user: "",
          message: "",
        };
        this.wasValidated = "";
      }
    },
  },

  updated() {
    this.chatList = JSON.parse(localStorage.getItem("chatsData")) || [];
  },
};
</script>
<style scoped>
.group-chat-board {
  min-height: 300px;
}
</style>