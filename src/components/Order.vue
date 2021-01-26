<template>
  <v-row>
    <v-col cols="6" v-if="orderItems.length">
      <v-card>
        <v-card-title> Order {{ type }}s </v-card-title>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    Name
                  </th>
                  <th class="text-left">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in orderItems" :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>{{ item.quantity }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="prepared">{{ type }} prepared</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import Menu from "../components/Menu";
import { types } from "../consts";

export default {
  components: {
    Menu,
  },
  props: {
    type: String,
    items: [],
  },
  data: () => ({}),
  sockets: {
    connect() {
      console.log("socket connected");
    },
  },
  methods: {
    prepared() {
      if (type === "food") {
        this.$socket.emit("prepareFood", order);
      } else {
        this.$socket.emit("prepareDrink", order);
      }
    },
  },
};
</script>
