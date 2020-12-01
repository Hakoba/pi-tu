//votings store namespace

/**
 * replaceWords
 * @param VOTING
 * @param Voting
 * @param VOTINGS
 * @param votings
 * @param Votings

 */

import {
  CREATE_VOTING,
  DELETE_VOTING,
  GET_VOTINGS,
  GET_VOTING,
  UPDATE_VOTING
} from "../const/voting";
import { HTTP_POST, HTTP_GET, HTTP_DELETE, HTTP_PATCH } from "../const/request";

const votings = {
  state: () => ({
    votings: [],
    currentVoting: {}
  }),
  actions: {
    async [GET_VOTINGS]({ dispatch }) {
      return await dispatch(
        HTTP_GET,
        { method: GET_VOTINGS, namespace: "Votings" },
        { root: true }
      );
    },
    async [CREATE_VOTING]({ dispatch }, data) {
      return await dispatch(
        HTTP_POST,
        {
          method: CREATE_VOTING,
          body: data,
          no_commit: true,
          namespace: "Votings"
        },
        { root: true }
      );
    },
    async [GET_VOTING]({ dispatch }, { id }) {
      return await dispatch(
        HTTP_GET,
        {
          method: GET_VOTING,
          replace: { id },
          namespace: "Votings"
        },
        { root: true }
      );
    },
    async [DELETE_VOTING]({ dispatch }, { id }) {
      return await dispatch(
        HTTP_DELETE,
        {
          method: DELETE_VOTING,
          params: { id },
          no_commit: true,
          namespace: "Votings"
        },
        { root: true }
      );
    },
    async [UPDATE_VOTING]({ dispatch }, { id, data }) {
      return await dispatch(
        HTTP_PATCH,
        {
          method: UPDATE_VOTING,
          params: { id },
          body: data,
          no_commit: true,
          namespace: "Votings"
        },
        { root: true }
      );
    }
  },
  mutations: {
    [GET_VOTINGS](state, { data }) {
      state.votings = data;
    },
    [GET_VOTING](state, { data }) {
      state.currentVoting = data;
    }

    ///
  },
  getters: {
    getCurrentVoting: state => state.currentVoting,
    getVotings: state => state.votings
    // getSomeModuleValue: state => state.someModuleValue
  },
  namespaced: true
};
export default votings;
