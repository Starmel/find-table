import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./components/Home.vue")
    },
    {
      path: "/task",
      name: "task",
      component: () => import("./components/Task.vue")
    },

    {
      path: "*",
      redirect: "/"
    }
  ]
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
