import Vue from "vue";
import Router from "vue-router";
import AddOrder from "@/views/AddOrder";
import Staff from "@/views/Staff";

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      name: "clients",
      component: AddOrder,
    },
    {
        path: "/staff",
        name: "staff",
        component: Staff,
      },
  ],
});
