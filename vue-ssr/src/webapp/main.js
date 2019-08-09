// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {createRouter} from './router'
import {createStore} from "./vuex/store"

export function createApp(){
    const router = createRouter();
    const store = createStore();
    const app = new Vue({
        router,
        render: h => h(App)
    })
    return {app, router,store};
}

