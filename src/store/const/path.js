// import { someModule } from "module";

import {
  AUTH_ABOUT_ME,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_PASSWORD_RESET,
  AUTH_PASSWORD_CHANGE,
  AUTH_PASSWORD_SET
} from "./auth";

import {
  CREATE_USER,
  GET_USERS,
  GET_USER,
  UPDATE_USER,
  DELETE_USER
} from "./users";

import {
  GET_VOTINGS,
  CREATE_VOTING,
  GET_VOTING,
  DELETE_VOTING,
  BLOCK_VOTING,
  UNBLOCK_VOTING,
  UPDATE_VOTING
} from "./voting";

const auth = {
  [AUTH_LOGIN]: "login",
  [AUTH_LOGOUT]: "logout",
  [AUTH_ABOUT_ME]: "me",
  [AUTH_PASSWORD_RESET]: "password-reset",
  [AUTH_PASSWORD_CHANGE]: "password-change",
  [AUTH_PASSWORD_SET]: "password-set"
};
const users = {
  [GET_USERS]: "users",
  [CREATE_USER]: "users",
  [GET_USER]: "users/:id:",
  [UPDATE_USER]: "users/:id:",
  [DELETE_USER]: "users/:id:"
};

const votings = {
  [GET_VOTINGS]: "votings",
  [CREATE_VOTING]: "votings",
  [GET_VOTING]: "votings/:id:",
  [DELETE_VOTING]: "votings/:id:",
  [BLOCK_VOTING]: "votings/:id:",
  [UNBLOCK_VOTING]: "votings/:id:",
  [UPDATE_VOTING]: "votings/:id:"
};

// const orders = {
//   [GET_ORDERS]: "orders",
//   [CREATE_ORDER]: "orders",
//   [GET_ORDER]: "orders/:id:",
//   [UPDATE_ORDER]: "orders/:id:",
//   [UPDATE_ORDER_META]: "orders/:id:/meta",
//   [DELETE_ORDER]: "orders/:id:",
//   [CREATE_ORDER_DRAFT]: "orders/draft",
//   [UPDATE_ORDER_DRAFT]: "orders/:id:/draft",
//   [ASSIGN_ORDER_WITH_ME]: "orders/:id:/assign-me",
//   [APPROVE_ORDER]: "orders/:id:/approve",
//   [SEARCH_ORDERS]: "search?key=:key:"
// };

export default {
  ...auth,
  ...users,
  ...votings
};
