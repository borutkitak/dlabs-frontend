<template>
  <v-row>
    <v-col v-if="!user" cols="12">
      <login @login="login" />
    </v-col>
    <v-col v-else>
      <barman v-if="user.role === 'BARMAN'" />
      <waiter v-else-if="user.role === 'WAITER'" />
    </v-col>
  </v-row>
</template>
<script>
import Login from "../components/Login";
import Barman from "../components/Barman";
import Waiter from "../components/Waiter";

export default {
  components: {
    Login,
    Barman,
    Waiter
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
