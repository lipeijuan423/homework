import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import test from '@/components/Test/test.vue'

Vue.use(Router)
export function createRouter() {
    const router = new Router ({
        routes: [
            {
                path: '/',
                name: 'HelloWorld',
                component: HelloWorld
            }, {
                path: '/test',
                name: 'test',
                component: test
            }
        ]
    })
    return router;
}
