<template>
  <v-row>
    <v-col v-if="!user" cols="12">
      <login @login="login" />
    </v-col>
    <v-col v-else>
      <h2>{{ user.username }} - {{ user.role }}</h2>
      <barman v-if="user.role === 'BARMAN'" />
      <waiter v-else-if="user.role === 'WAITER'" />
      <chef v-else />
    </v-col>
  </v-row>
</template>
<script>
import Login from "../components/Login";
import Barman from "../components/Barman";
import Waiter from "../components/Waiter";
import Chef from "../components/Chef";

export default {
  components: {
    Login,
    Barman,
    Waiter,
    Chef,
  },
  data: () => ({
    user: null,
  }),
  sockets: {
    connect() {
      console.log("socket connected");
    },
  },
  methods: {
    login(user) {
      this.user = user;
      this.$socket.emit("staffLogin", user);
    },
  },
};
</script>
