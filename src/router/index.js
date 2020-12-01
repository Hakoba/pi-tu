import Vue from "vue";
import VueRouter from "vue-router";
import errorLayout from "@/components/layouts/ErrorLayout.vue";
import authLayout from "@/components/layouts/AuthLayout.vue";
import publicLayout from "@/components/layouts/PublicLayout.vue";
import loginPage from "@/components/views/Auth/Login.vue";
Vue.use(VueRouter);

const prefix = "Voter: ";

const routes = [
  {
    path: "/error",
    component: errorLayout,
    children: [
      {
        path: "404",
        name: "404",
        meta: {
          title: "404: Not Found"
        },
        component: () => import("@/components/views/Errors/404.vue")
      }
    ]
  },
  {
    path: "/",
    redirect: { name: "reservation" }
  },
  {
    path: "/auth/forgot-password",
    redirect: "/auth/password-set"
  },
  {
    path: "*",
    redirect: "/error/404"
  },

  {
    path: "/auth",
    component: authLayout,
    children: [
      {
        path: "login",
        name: "login",
        meta: { title: prefix + "Страница входа" },
        component: loginPage
      }
    ]
  },
  {
    path: "/public",
    component: publicLayout,
    children: [
      {
        path: ":id",
        name: "publicVoter",
        meta: { title: prefix + "Your choose" },
        component: () => import("@/components/views/Public/index.vue")
      }
    ]
  },
  ///////////////////////////////////////////////////////
  //////////////////////////////////////////////////////
  /////////////////////MAIN////////////////////////////
  ////////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  {
    path: "",
    meta: {
      loginGuard: true
    },
    redirect: "/main",
    component: () => import("@/components/layouts/MainLayout.vue"),
    children: [
      {
        path: "reservation",
        name: "reservation",
        meta: {
          title: prefix + "Главная"
        },
        component: () => import("@/components/views/Reservation/index.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes,
  mode: "hash" //history || hash
});
router.beforeEach(async (to, from, next) => {
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);

  const nearestWithMetaGuarded = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.loginGuard);
  // const nearestWithMetaAdmin = to.matched
  //   .slice()
  //   .reverse()
  //   .find(r => r.meta && r.meta.guardedAdmin);

  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  if (nearestWithMetaGuarded) {
    // router guard
    if (localStorage.getItem("userToken")) {
      // check loggined
      // if (nearestWithMetaAdmin) {
      //   // check admin
      //   if (!store.getters["User/access"]) {
      //     // if page was reloaded
      //     store.commit(`Auth/${AUTH_LOGIN}`, {
      //       data: { token: localStorage.getItem("userToken") }
      //     });
      //     await store.dispatch(`User/${GET_ACCOUNT_INFO}`);
      //   }

      //   let access = store.getters["User/access"];
      //   if (access === "administrator") {
      //     next();
      //   } else {
      //     Vue.prototype.$notify("У вас не достаточно прав");
      //     next("/");
      //   }
      // } else {
      //   next();
      // }
      next();
    } else {
      setTimeout(() => {
        Vue.prototype.$notify({
          type: "warn",
          title: "Ошибка",
          text: "Необходимо войти в систему"
        });
      }, 300);
      next("/auth/login?sessionError=true");
    }
  } else {
    next();
  }
});
router.onError(error => {
  if (/loading chunk \d* failed./i.test(error.message)) {
    window.location.reload();
  }
});
export default router;
