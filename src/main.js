import Vue from "vue";
import io from "socket.io-client";
import VueSocketIO from "vue-socket.io";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./routes";

const ws = "http://localhost:3000";
export const SocketInstance = io(ws, { transports: ["websocket"] });

Vue.use(new VueSocketIO({ connection: SocketInstance }), SocketInstance);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
