<template>
  <v-app id="inspire">
    <v-app-bar app="" height="56" color="primary" clipped-left="" dense="" dark>
      <v-img
        v-show="!$vuetify.breakpoint.smAndDown"
        class="ma-1 ml-0"
        max-width="150px"
        src="@/assets/logo/vector/default-monochrome.svg"
      ></v-img>

      <v-spacer></v-spacer>
      <v-btn color="white" class="black--text mr-2" :to="{ name: 'login' }"
        ><v-icon left>mdi-account</v-icon> Login</v-btn
      >
      <about-popup />
    </v-app-bar>

    <v-main>
      <v-skeleton-loader
        v-if="isLoading()"
        style="margin-top:40px"
        class=" ml-4"
        transition="scale-transition"
        width="100%"
        type="heading"
      >
      </v-skeleton-loader>
      <v-skeleton-loader
        v-if="isLoading()"
        class="mt-6 ml-4"
        transition="scale-transition"
        width="90%"
        type="paragraph"
      >
      </v-skeleton-loader>
      <v-skeleton-loader
        :loading="isLoading()"
        transition="scale-transition"
        width="100%"
        type="table"
      >
        <router-view></router-view>
      </v-skeleton-loader>
    </v-main>
  </v-app>
</template>
<script>
import { mapActions } from "vuex";
import { AUTH_ABOUT_ME } from "../../store/const/auth";
import requestControl from "@/mixins/requestControl";
import aboutPopup from "../common/AboutPopup";

export default {
  components: { aboutPopup },
  mixins: [requestControl],
  data() {
    return {};
  },
  computed: {
    showLogo() {
      return !this.drawerMiniVariant || this.$refs?.drawer?.isMouseover;
    }
  },
  methods: {
    ...mapActions("Auth", {
      getMe: AUTH_ABOUT_ME
    }),
    isLoading() {
      return this.loading(AUTH_ABOUT_ME) === "loading";
    }
  }
};
</script>
