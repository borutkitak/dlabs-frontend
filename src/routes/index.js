import Vue from "vue";
import Router from "vue-router";
import AddOrder from "@/views/AddOrder";

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      name: "clients",
      component: AddOrder,
    },
  ],
});
