import Vue from "vue";
import Vuex from "vuex";
import * as actions from "./action";
import * as getters from "./getter";

const defaultState = {
    count: 0,
    topics: []
}

// 判断开发环境
const inBrowser = typeof window != "undefined";
// if (!inBrowser || process.env.NODE_ENV == "development") {
    // node/开发环境 use 
    Vue.use(Vuex);
// }
// ssr 知道哪些请求异步, 后端把异步请求执行完
const state = (inBrowser && window.__INITIAL_STATE__) || defaultState;

// 定义mutations
const mutations = {
    INCREMENT: (state) => ++state.count,
    DECREMENT: (state) => --state.count
}
export function createStore () {
    const store = new Vuex.Store({
        state,
        actions,
        getters,
        mutations
    });
    return store;
}