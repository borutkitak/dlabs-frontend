<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item v-for="[icon, text] in links" :key="icon" link>
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              <router-link v-if="text === 'Client'" to="/">{{ text }}</router-link>
              <router-link v-else to="/staff">{{ text }}</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>The Restaurant at the End of the Universe</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <!--  -->
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  components: {},
  data: () => ({
    drawer: false,
    links: [
      ["mdi-inbox-arrow-down", "Client"],
      ["mdi-send", "Staff"],
    ],
  }),
};
</script>
