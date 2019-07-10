import Vue from 'vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'

Vue.use(VueAxios, axios);

new Vue({
    render: h => h(App),
    el: '#app',
    router,
    store,
    components: {},
});
