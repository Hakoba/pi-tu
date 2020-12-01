import Vue from "vue";
import axios from "axios";
import {
  HTTP_GET,
  HTTP_POST,
  HTTP_PUT,
  HTTP_DELETE,
  HTTP_PATCH,
  LOADING,
  ERROR,
  REMOVE_ERROR,
  HEALTH_CHECK,
  PAGINATION
} from "../const/request";
import path from "../const/path";
import { AUTH_LOGIN, AUTH_LOGOUT } from "../const/auth";
import router from "vue-router";
import dbg from "@/plugins/dbg";

/**
 * Функция формирования url
 * Заменяет данные, например из /user_info/:id => /user_info/1
 * @param url
 * @param params
 * @param calcUrl
 * @returns string
 */
const getUrl = (url, params = {}, calcUrl = false) => {
  if (!url) {
    dbg("ERROR URL", url, params);
    return Vue.prototype.$baseURL;
  }
  let path = url;
  if (Object.keys(params).length > 0) {
    Object.keys(params).forEach(function(key) {
      path = path.replace(`:${key}:`, params[key]);
    });
  }
  return (calcUrl ? Vue.prototype.$calcURL : Vue.prototype.$baseURL) + path;
};

/**
 * Универсальный метод обработки ошибкок при запросах
 * @param e
 * @param commit
 * @param method
 * @param error
 * @returns {Promise<{response}|*>}
 */
const handleError = async (e, commit, method, error) => {
  commit(LOADING, {
    name: method,
    value: "error"
  });
  if (e.response) {
    if (e.response.status === 401 && method !== AUTH_LOGIN) {
      commit(`Auth/${AUTH_LOGOUT}`);
    }
  }
  let error_message = "Some error...";
  if (e?.response.status === 422) {
    const errors = e?.response?.data?.data;
    if (errors) {
      error_message = "";

      for (const prop in errors) {
        console.log(...errors[prop]);
        error_message = error_message.concat(...errors[prop], "\n");
      }
      console.log(error_message);
    }
  } else if (error) {
    error_message = error.data?.message ?? error.data;
  } else if (e.response && e.response.data) {
    error_message = e.response.data.message;
  }
  commit(ERROR, {
    name: method,
    value: error_message
  });
};

export default {
  state: {
    loading: {},
    error: {},
    pagination: {}
  },
  getters: {
    loading: state => name => (name ? state.loading[name] : state.loading),
    error: state => name => (name ? state.error[name] : state.error),
    pagination: state => name =>
      name ? state.pagination[name] : state.pagination
  },
  actions: {
    /**
     * Запрос GET
     * @param state
     * @param commit
     * @param dispatch
     * @param method - константа на который будет идти запрос
     * @param params - объект с параметрами, ключ -> значение, будет добавлен ?key=value
     * @param with_token - отправлять токен?
     * @param no_commit - не делать мутацию после запроса? По умолчанию мутация выполняется
     * @param args - дополнительные аргументы
     * @returns {Promise<AxiosResponse<T>>}
     */
    [HTTP_GET]: async (
      { commit, rootState },
      { method, params, with_token = true, no_commit = false, ...args }
    ) => {
      dbg({ log: "HTTP_GET" }, method, params, with_token, no_commit, args);
      const config = {};
      if (with_token) {
        config.headers = {
          Authorization: "Bearer " + rootState.Auth.userToken
        };
      }
      // if (params) {
      //   if (params.limitPerPage === -1) {
      //     // проверка на показ всех элеметов таблицы(пагинация)
      //     delete params.page;
      //     delete params.limitPerPage;
      //   }
      //   config.params = params;
      // }
      if (args.download) {
        config.responseType = "blob";
      }
      let replace = {};
      if (args.replace) {
        replace = args.replace;
      }
      commit(LOADING, {
        name: method,
        value: "loading"
      });
      commit(REMOVE_ERROR, method);
      try {
        let request = await axios.get(
          getUrl(path[method], replace, args.calcUrl),
          config
        );
        commit(LOADING, {
          name: method,
          value: "loaded"
        });
        if (no_commit === false) {
          if (args.namespace) {
            method = args.namespace + "/" + method;
          }
          commit(method, { data: request.data?.data ?? request.data, params });
        }
        if (request.data.currentPage) {
          commit(PAGINATION, {
            name: method,
            data: {
              currentPage: request.data.currentPage,
              limitPerPage: request.data.limitPerPage,
              resultsCount: request.data.resultsCount
            }
          });
        }
        return request;
      } catch (e) {
        dbg("ERROR_HTTP_GET", e);
        await handleError(e, commit, method, e.response);
      }
    },

    /**
     * Запрос POST
     * @param state
     * @param commit
     * @param dispatch
     * @param method - константа на который будет идти запрос
     * @param params - параметры для замены в url
     * @param body - тело/данные запроса
     * @param with_token - отправлять токен?
     * @param no_commit - не делать мутацию после запроса? По умолчанию мутация выполняется
     * @param args - дополнительные аргументы
     * @returns {Promise<AxiosResponse<T>|*>}
     */
    [HTTP_POST]: async (
      { rootState, commit },
      {
        method,
        params,
        body = {},
        with_token = true,
        no_commit = false,
        ...args
      }
    ) => {
      dbg(
        { log: "HTTP_POST" },
        method,
        params,
        body,
        with_token,
        no_commit,
        args
      );
      const config = {};
      if (with_token) {
        config.headers = {
          Authorization: "Bearer " + rootState.Auth.userToken
        };
      }
      // if (params) {
      //   config.params = params;
      // }
      // let replace = {};
      // if (args.replace) {
      //   replace = args.replace;
      // }
      commit(LOADING, {
        name: method,
        value: "loading"
      });
      commit(REMOVE_ERROR, method);

      try {
        let request = await axios.post(
          getUrl(path[method], params, args.calcUrl),
          body,
          config
        );
        commit(LOADING, {
          name: method,
          value: "loaded"
        });
        if (no_commit === false) {
          if (args.namespace) {
            method = args.namespace + "/" + method;
          }
          commit(method, { data: request.data?.data ?? request.data, params });
        }
        if (request.data.currentPage) {
          commit(PAGINATION, {
            name: method,
            data: {
              currentPage: request.data.currentPage,
              limitPerPage: request.data.limitPerPage,
              resultsCount: request.data.resultsCount
            }
          });
        }
        return request;
      } catch (e) {
        dbg("ERROR_HTTP_POST", e);
        await handleError(e, commit, method);
      }
    },

    /**
     * Запрос PUT
     * @param state
     * @param commit
     * @param dispatch
     * @param method - константа на который будет идти запрос
     * @param params - параметры для замены в url
     * @param body - тело/данные запроса
     * @param with_token - отправлять токен?
     * @param no_commit - не делать мутацию после запроса? По умолчанию мутация выполняется
     * @param args - дополнительные аргументы
     * @returns {Promise<AxiosResponse<T>|*>}
     */
    [HTTP_PUT]: async (
      { rootState, commit },
      {
        method,
        params,
        body = {},
        with_token = true,
        no_commit = false,
        ...args
      }
    ) => {
      dbg(
        { log: "HTTP_PUT" },
        method,
        params,
        body,
        with_token,
        no_commit,
        args
      );
      const config = {};
      if (with_token) {
        config.headers = {
          Authorization: "Bearer " + rootState.Auth.userToken
        };
      }
      commit(LOADING, {
        name: method,
        value: "loading"
      });
      commit(REMOVE_ERROR, method);
      try {
        let request = await axios.put(
          getUrl(path[method], params, args.calcUrl),
          body,
          config
        );
        commit(LOADING, {
          name: method,
          value: "loaded"
        });
        if (no_commit === false) {
          if (args.namespace) {
            method = args.namespace + "/" + method;
          }
          commit(method, { data: request.data, params });
        }
        if (request.data.currentPage) {
          commit(PAGINATION, {
            name: method,
            data: {
              currentPage: request.data.currentPage,
              limitPerPage: request.data.limitPerPage,
              resultsCount: request.data.resultsCount
            }
          });
        }
        return request;
      } catch (e) {
        dbg("ERROR_HTTP_PUT", e);
        await handleError(e, commit, method);
      }
    },

    /**
     * Запрос DELETE
     * @param state
     * @param commit
     * @param dispatch
     * @param method - константа на который будет идти запрос
     * @param params - параметры для замены в url
     * @param body - тело/данные запроса
     * @param with_token - отправлять токен?
     * @param no_commit - не делать мутацию после запроса? По умолчанию мутация выполняется
     * @param args - дополнительные аргументы
     * @returns {Promise<AxiosResponse<T>|*>}
     */
    [HTTP_DELETE]: async (
      { rootState, commit },
      {
        method,
        params,
        body = {},
        with_token = true,
        no_commit = false,
        ...args
      }
    ) => {
      dbg(
        { log: "HTTP_DELETE" },
        method,
        params,
        body,
        with_token,
        no_commit,
        args
      );
      const config = {};
      if (with_token) {
        config.headers = {
          Authorization: "Bearer " + rootState.Auth.userToken
        };
      }
      commit(LOADING, {
        name: method,
        value: "loading"
      });
      commit(REMOVE_ERROR, method);
      try {
        let request = await axios.delete(
          getUrl(path[method], params, args.calcUrl),
          config
        );
        commit(LOADING, {
          name: method,
          value: "loaded"
        });
        if (no_commit === false) {
          if (args.namespace) {
            method = args.namespace + "/" + method;
          }
          commit(method, { data: request.data, params });
        }
        if (request.data.pagination) {
          commit(PAGINATION, { name: method, data: request.data.pagination });
        }
        return request;
      } catch (e) {
        dbg("ERROR_HTTP_DELETE", e);
        await handleError(e, commit, method);
      }
    },
    /**
     * Запрос PATCH
     * @param state
     * @param commit
     * @param dispatch
     * @param method - константа на который будет идти запрос
     * @param params - параметры для замены в url
     * @param body - тело/данные запроса
     * @param with_token - отправлять токен?
     * @param no_commit - не делать мутацию после запроса? По умолчанию мутация выполняется
     * @param args - дополнительные аргументы
     * @returns {Promise<AxiosResponse<T>|*>}
     */
    [HTTP_PATCH]: async (
      { rootState, commit },
      {
        method,
        params,
        body = {},
        with_token = true,
        no_commit = false,
        ...args
      }
    ) => {
      dbg(
        { log: "HTTP_PATCH" },
        method,
        params,
        body,
        with_token,
        no_commit,
        args
      );
      const config = {};
      if (with_token) {
        config.headers = {
          Authorization: "Bearer " + rootState.Auth.userToken
        };
      }
      commit(LOADING, {
        name: method,
        value: "loading"
      });
      commit(REMOVE_ERROR, method);

      try {
        let request = await axios.patch(
          getUrl(path[method], params, args.calcUrl),
          body,
          config
        );
        commit(LOADING, {
          name: method,
          value: "loaded"
        });
        if (no_commit === false) {
          if (args.namespace) {
            method = args.namespace + "/" + method;
          }
          commit(method, { data: request.data?.data ?? request.data, params });
        }
        if (request.data.currentPage) {
          commit(PAGINATION, {
            name: method,
            data: {
              currentPage: request.data.currentPage,
              limitPerPage: request.data.limitPerPage,
              resultsCount: request.data.resultsCount
            }
          });
        }
        return request;
      } catch (e) {
        dbg("ERROR_HTTP_PATCH", e);
        await handleError(e, commit, method);
      }
    },
    /**
     * Запрос проверки работоспособности сервера
     * @param state
     * @param commit
     * @param dispatch
     * @returns {Promise<void>}
     */
    [HEALTH_CHECK]: async ({ dispatch }) => {
      let request = await dispatch(HTTP_GET, {
        method: HEALTH_CHECK,
        with_token: false,
        no_commit: true
      });
      if (!request) {
        await router.push({ name: "ServerError" });
      }
    }
  },
  mutations: {
    [LOADING]: (state, { name, value }) => {
      Vue.set(state.loading, name, value);
    },
    [ERROR]: (state, { name, value }) => {
      Vue.set(state.error, name, value);
    },
    [REMOVE_ERROR]: (state, name) => {
      Vue.set(state.error, name, null);
    },
    [PAGINATION]: (state, { name, data }) => {
      Vue.set(state.pagination, name, data);
    }
  }
};
