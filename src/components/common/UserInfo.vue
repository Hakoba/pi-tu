<template>
  <div class="white--text d-flex">
    <v-menu left bottom>
      <template #activator="{ on, attrs }">
        <div class="flex-column d-flex justify-center">
          <v-skeleton-loader
            :loading="isLoading"
            transition="scale-transition"
            type="text"
            width="90px"
          >
            <small
              @click="copy(user.name)"
              style="cursor:pointer; display: block; max-width: 140px"
              class="text-truncate  "
            >
              {{ user.name }}
            </small>
          </v-skeleton-loader>
          <v-skeleton-loader
            :loading="isLoading"
            transition="scale-transition"
            type="text"
            width="170px"
          >
            <b
              @click="copy(user.email)"
              style="cursor:pointer; display: block; max-width: 170px"
              class="text-truncate  "
            >
              {{ user.email }}
            </b>
          </v-skeleton-loader>
        </div>
        <v-skeleton-loader
          :loading="isLoading"
          transition="scale-transition"
          type="avatar"
          style="margin-left:10px"
          width="50px"
        >
          <v-btn dark icon v-bind="attrs" v-on="on">
            <v-icon x-large>mdi-account-box</v-icon>
          </v-btn>
        </v-skeleton-loader>
      </template>

      <v-list dense>
        <!-- <v-list-item @click="toLogin()">
          <v-list-item-title>Option sad asd</v-list-item-title>
        </v-list-item> -->
        <v-list-item @click="killSession()">
          <v-list-item-icon>
            <v-icon> mdi-exit-to-app </v-icon>
          </v-list-item-icon>
          <v-list-item-title>Exit</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { AUTH_ABOUT_ME, AUTH_LOGOUT } from "../../store/const/auth";
import requestControl from "@/mixins/requestControl";

export default {
  mixins: [requestControl],

  computed: {
    ...mapGetters("Auth", {
      user: "getUser"
    }),
    isLoading() {
      return this.loading(AUTH_ABOUT_ME) === "loading";
    }
  },
  methods: {
    ...mapActions("Auth", {
      logout: AUTH_LOGOUT
    }),
    ...mapMutations("Auth", {
      mLogout: AUTH_LOGOUT
    }),
    copy(value) {
      let res = this.$clipboard(value);
      if (res) {
        this.$notify({
          type: "succ",
          title: "Successfully copied",
          text: value
        });
      } else {
        this.$notify({
          type: "err",
          title: "Error :(",
          text: res
        });
      }
    },
    toLogin() {
      this.$router.push({ name: "login" });
    },
    async killSession() {
      try {
        await this.logout();
        if (this.checkRequestOnError(AUTH_LOGOUT)) {
          this.$notify({
            type: "succ",
            text: "Successed logout"
          });
          this.$router.push({ path: "/auth/login" });
        }
      } catch (error) {
        this.mLogout();
        this.$router.push({ path: "/auth/login" });
      }
    }
  }
};
</script>
