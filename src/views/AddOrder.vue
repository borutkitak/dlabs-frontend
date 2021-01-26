<template>
  <v-row>
    <v-col cols="6">
      <v-card>
        <v-card-title>
          Menu
        </v-card-title>
        <v-card-text>
          <Menu @addToCart="addToCart" />
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="6" v-if="orderItems.length">
      <v-card>
        <v-card-title>
          Order items
        </v-card-title>
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
          Total cost: {{ total }}$
          <v-spacer></v-spacer>
          <v-btn @click="sendOrderToStaff">Send</v-btn>
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
  data: () => ({
    orderItems: [],
  }),
  computed: {
    total() {
      let total = 0;
      this.orderItems.forEach((element) => {
        total += element.price * element.quantity;
      });
      return total;
    },
  },
  methods: {
    addToCart(item) {
      const exists = this.orderItems.find((i) => i.id === item.id);
      if (exists) {
        exists.quantity += 1;
        this.orderItems.splice(item.id, 1, exists);
      } else {
        item.quantity = 1;
        this.orderItems.push(item);
      }
      console.log(this.orderItems);
    },
    sendOrderToStaff() {
      const order = {
        orderId: new Date().valueOf(),
        tableId: new Date().valueOf(),
        drinkPrepared: false,
        foodPrepared: false,
        drinkServed: false,
        foodServed: false,
        paid: false,
        food: [],
        drink: [],
      };
      this.orderItems.forEach((element) => {
        if (element.type === types.FOOD) {
          order.food.push(element);
        } else {
          order.drink.push(element);
        }
      });
      console.log(order);
    },
  },
};
</script>
