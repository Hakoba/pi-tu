<template>
  <v-app id="inspire">
    <v-navigation-drawer
      ref="drawer"
      width="290"
      :expand-on-hover="drawerMiniVariant && !$vuetify.breakpoint.smAndDown"
      v-model="drawer"
      color="primary accent-2"
      app
      dark
      :clipped="isClipped"
    >
      <v-img
        v-show="$vuetify.breakpoint.smAndDown"
        class="ma-3 header-logo"
        src="@/assets/logo/vector/default-monochrome.svg"
      ></v-img>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item
          v-for="(route, i) in routes"
          :disabled="route.disabled"
          :key="i"
          :to="{ name: route.path }"
        >
          <v-list-item-icon>
            <v-icon color="primary lighten-5">{{ `mdi-${route.icon}` }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="route.text"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app="" height="56" color="primary" clipped-left="" dense="" dark>
      <v-app-bar-nav-icon
        v-show="$vuetify.breakpoint.mdAndDown"
        @click.stop="drawer = !drawer"
        color="white"
      ></v-app-bar-nav-icon>
      <v-img
        v-show="!$vuetify.breakpoint.smAndDown"
        class="ma-1 ml-0"
        max-width="150px"
        src="@/assets/logo/vector/default-monochrome.svg"
      ></v-img>
      <span
        class="ma-2; primary--text"
        style="font-size: 20px; "
        v-if="process === 'development'"
      >
        .DEV</span
      >
      <v-spacer></v-spacer>
      <user-info />
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

    <v-footer padless v-if="process === 'development'">
      <v-col class="d-flex align-center justify-end pa-2 " cols="12">
        <v-btn class="ml-2" small @click="clearLocalStorage" color="primary">
          Очистить сторадж
          <v-icon>mdi-close</v-icon></v-btn
        >
        <v-btn class="ml-2" small @click="toggleDrawerVariant" color="primary">
          Мини ==== {{ drawerMiniVariant }}
          <v-icon>mdi-window-minimize</v-icon></v-btn
        >
        <v-btn
          class="ml-2"
          small
          @click="isClipped = !isClipped"
          color="primary"
        >
          Clipped
          <v-icon>mdi-window-minimize</v-icon></v-btn
        >
        <small class="ml-2">
          Панель разработчика DEV: My day v0.0.1 ({{
            new Date().toLocaleDateString()
          }})</small
        >
      </v-col>
    </v-footer>
  </v-app>
</template>
<script>
import userInfo from "@/components/common/UserInfo";
import { mapActions } from "vuex";
import { AUTH_ABOUT_ME } from "../../store/const/auth";
import requestControl from "@/mixins/requestControl";
import dbg from "@/plugins/dbg";

export default {
  components: {
    userInfo
  },
  mixins: [requestControl],
  data() {
    return {
      isClipped: true,
      drawerMiniVariant: true,
      process: process.env.NODE_ENV,
      drawer: null,
      routes: [
        {
          text: "MAIN",
          path: "reservation",
          disabled: false,
          icon: "vote"
        }
        // {
        //   text: "Управление пользователями",
        //   path: "control",
        //   disabled: false,
        //   icon: "account-multiple"
        // }
      ]
    };
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
    },
    clearLocalStorage() {
      localStorage.clear();
    },
    toggleDrawerVariant() {
      if (this.drawerMiniVariant) {
        this.drawerMiniVariant = false;
        localStorage.setItem("drawerStyle", "full");
      } else {
        this.drawerMiniVariant = true;
        localStorage.setItem("drawerStyle", "mini");
      }
    }
  },
  async created() {
    dbg(this.$route);
    //me
    if (localStorage.getItem("drawerStyle") === "mini") {
      this.drawerMiniVariant = true;
    }
    try {
      await this.getMe();
      this.checkRequestOnError(AUTH_ABOUT_ME);
    } catch (error) {
      dbg("GET ME INFO err", error);
    }
  }
};
</script>
