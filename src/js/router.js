import VueRouter from 'vue-router';

let routes = [
    {
        path:"/",
        component: require('./views/Home.vue')
    },
    {
        path:'/task',
        component: require('./views/Task.vue')
    }
];

export default new VueRouter({
    routes
});