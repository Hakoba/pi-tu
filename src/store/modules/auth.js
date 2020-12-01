import Vue from "vue";
import router from "../../router/";
import {
  AUTH_ABOUT_ME,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_PASSWORD_CHANGE,
  AUTH_PASSWORD_RESET,
  AUTH_PASSWORD_SET
} from "../const/auth";
import { HTTP_POST } from "../const/request";

export default {
  namespaced: true,
  state: {
    userToken: localStorage.getItem("userToken") || "",
    user: {
      email: "Loading....",
      id: 10000000000000,
      name: "Loading...",
      roles: []
    }
  },
  getters: {
    getToken: state => state.token,
    getUser: state => {
      const { email, id, name } = state.user;
      return {
        email,
        id,
        name
      };
    },
    myRole: state => state.user?.roles[0]?.name
  },
  actions: {
    [AUTH_ABOUT_ME]: async ({ dispatch }) => {
      return await dispatch(
        HTTP_POST,
        {
          method: AUTH_ABOUT_ME,
          namespace: "Auth"
        },
        { root: true }
      );
    },
    [AUTH_PASSWORD_SET]: async ({ dispatch }, body) => {
      return await dispatch(
        HTTP_POST,
        {
          method: AUTH_PASSWORD_SET,
          body,
          namespace: "Auth"
        },
        { root: true }
      );
    },
    [AUTH_PASSWORD_CHANGE]: async ({ dispatch }, body) => {
      return await dispatch(
        HTTP_POST,
        {
          method: AUTH_PASSWORD_CHANGE,
          body,
          with_token: false,
          namespace: "Auth"
        },
        { root: true }
      );
    },
    [AUTH_PASSWORD_RESET]: async ({ dispatch }, body) => {
      return await dispatch(
        HTTP_POST,
        {
          method: AUTH_PASSWORD_RESET,
          body,
          with_token: false,
          namespace: "Auth"
        },
        { root: true }
      );
    },
    [AUTH_LOGIN]: async ({ dispatch }, { email, password }) => {
      return await dispatch(
        HTTP_POST,
        {
          method: AUTH_LOGIN,
          body: { email, password },
          with_token: false,
          namespace: "Auth"
        },
        { root: true }
      );
    },
    [AUTH_LOGOUT]: async ({ dispatch }) => {
      return await dispatch(
        HTTP_POST,
        {
          method: AUTH_LOGOUT,
          namespace: "Auth"
        },
        { root: true }
      );
    }
  },
  mutations: {
    [AUTH_LOGIN]: (state, { data }) => {
      Vue.set(state, "userToken", data.access_token);
      localStorage.setItem("userToken", data.access_token);
    },
    [AUTH_LOGOUT]: state => {
      localStorage.removeItem("userToken");
      Vue.set(state, "userToken", "");
      router.push({ name: "login", params: { sessionError: true } });
    },
    [AUTH_ABOUT_ME]: (state, { data }) => {
      state.user = data;
    }
  }
};
