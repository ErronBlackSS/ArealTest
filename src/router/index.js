import VueRouter from 'vue-router';
import Conversion from "@/pages/conversion";
import home from "@/pages/home";

export default new VueRouter({
    routes: [
        {
            path: '/conversion',
            component: Conversion,

        },
        {
            path: '/',
            component: home,
        }
    ],
    mode: 'history'
})