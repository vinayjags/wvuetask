import VueRouter from 'vue-router';

let routes = [
    {
        path:"/",
        component: require('./views/Home.vue')
    },
    {
        path:'/notes',
        component: require('./views/Note.vue')
    }
];

export default new VueRouter({
    routes
});