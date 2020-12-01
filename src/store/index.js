import Vue from "vue";
import Vuex from "vuex";

import request from "./modules/request";
import auth from "./modules/auth";
import users from "./modules/users";
import votings from "./modules/voting";

import constants from "./modules/constants";

// import someEntity from "./modules/someEntity";
Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  modules: {
    Auth: auth,
    Request: request,
    Users: users,
    Constants: constants,
    Votings: votings
    // SomeEntity: someEntity
  },
  state: {},
  mutations: {},
  getters: {},
  actions: {
    // universalPromiseAll(_, { promiseFunc, entities, params }) {
    //   const promiseArray = new Array();
    //   for (const id in entities) {
    //     promiseArray.push(promiseFunc(entities[id], params));
    //   }
    //   return Promise.allSettled(promiseArray);
    // },
  }
});
