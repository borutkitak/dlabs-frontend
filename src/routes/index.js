import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      name: "clients",
      component: AddProduct,
    },
    {
      path: "/staff",
      name: "staff",
      component: Products,
    },
  ],
});
