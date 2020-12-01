//users store namespace
import {
  CREATE_USER,
  DELETE_USER,
  GET_USERS,
  GET_USER,
  UPDATE_USER
} from "../const/users";
import { HTTP_POST, HTTP_GET, HTTP_DELETE, HTTP_PATCH } from "../const/request";
const getIds = entities => {
  return entities.map(entity => entity.id);
};
const users = {
  state: () => ({
    users: [],
    currentTempUser: {},
    currentUser: {}
  }),
  actions: {
    async [GET_USERS]({ dispatch }) {
      return await dispatch(
        HTTP_GET,
        { method: GET_USERS, namespace: "Users" },
        { root: true }
      );
    },
    async [CREATE_USER]({ dispatch }, data) {
      return await dispatch(
        HTTP_POST,
        {
          method: CREATE_USER,
          body: data,
          no_commit: true,
          namespace: "Users"
        },
        { root: true }
      );
    },
    async [GET_USER]({ dispatch }, { id }) {
      return await dispatch(
        HTTP_GET,
        {
          method: GET_USER,
          replace: { id },
          namespace: "Users"
        },
        { root: true }
      );
    },
    async [DELETE_USER]({ dispatch }, { id }) {
      return await dispatch(
        HTTP_DELETE,
        {
          method: DELETE_USER,
          params: { id },
          no_commit: true,
          namespace: "Users"
        },
        { root: true }
      );
    },
    async [UPDATE_USER]({ dispatch }, { id, data }) {
      return await dispatch(
        HTTP_PATCH,
        {
          method: UPDATE_USER,
          params: { id },
          body: data,
          no_commit: true,
          namespace: "Users"
        },
        { root: true }
      );
    }
  },
  mutations: {
    [GET_USERS](state, { data }) {
      state.users = data;
    },
    [GET_USER](state, { data }) {
      state.currentUser = data;
    },

    ///
    setTempUser(state, { data }) {
      state.currentTempUser = data;
    }
  },
  getters: {
    getCurrentUser: state => {
      let {
        email,
        roles,
        agencies,
        clients,
        name,
        is_active
      } = state.currentUser;
      if (email && roles)
        return {
          email,
          roles: getIds(roles),
          agencies: getIds(agencies),
          clients: getIds(clients),
          name,
          is_active
        };
      else return {};
    },
    getAccountUsers: state =>
      state.users.filter(user =>
        user.roles.find(role => role.name === "account")
      ),
    getClientAdminUsers: state =>
      state.users.filter(user =>
        user.roles.find(role => role.name === "client-admin")
      ),
    getClientAccountUsers: state =>
      state.users.filter(user =>
        user.roles.find(role => role.name === "client-account")
      ),
    getAllClientUsers: state =>
      state.users.filter(user =>
        user.roles.find(role =>
          ["client-account", "client-admin"].includes(role.name)
        )
      ),
    getRootUsers: state =>
      state.users.filter(user =>
        user.roles.find(role => role.name === "account")
      ),
    getTraderUsers: state =>
      state.users.filter(user =>
        user.roles.find(role => role.name === "trader")
      )
  },
  namespaced: true
};
export default users;
