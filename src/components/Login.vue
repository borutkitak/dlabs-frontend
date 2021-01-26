<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card>
            <v-toolbar>
              <v-toolbar-title>Staff login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="username"
                  name="username"
                  label="Username"
                  type="text"
                ></v-text-field>
                <v-select v-model="selectedRole" :items="items"> </v-select>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="login">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data: () => ({
    selectedRole: "",
    username: "",
    items: ["BARMAN", "CHEF", "WAITER"],
  }),
  methods: {
    login() {
      if (this.username.trim() === "" || this.selectedRole === "") {
        return;
      }
      this.$emit("login", { username: this.username, role: this.selectedRole });
    },
  },
};
</script>

<style></style>
