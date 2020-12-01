//someEntity store namespace
// import { HTTP_GET, HTTP_POST } from "../const/request";
// import { someModule } from "../const/module";

const someEntity = {
  state: () => ({
    // someModuleValue: ''
  }),
  actions: {
    // async [someModule]({ dispatch }) {
    //   return await dispatch(
    //     HTTP_GET,
    //     { method: someModule, namespace: "someNameSpace" },
    //     { root: true }
    //   );
    // },
    // async [somePostModule]({ dispatch }, { data }) {
    //   return await dispatch(
    //     HTTP_POST,
    //     {
    //       method: somePostModule,
    //       body: data,
    //      no_commit: true,
    //       namespace: "someNamespace"
    //     },
    //     { root: true }
    //   );
    // },
  },
  mutations: {
    // [someModule](state,{data}){
    //   state.someModuleValue = data
    // }
  },
  getters: {
    // getSomeModuleValue: state => state.someModuleValue
  },
  namespaced: true
};
export default someEntity;
