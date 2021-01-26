<template>
  <v-row>
    <v-col cols="12">
      <v-alert v-if="showPaidMsg" dense text type="success">
        Order was sucessfully paid!
      </v-alert>
    </v-col>
    <v-col cols="6">
      <v-card>
        <v-card-title>
          Menu
        </v-card-title>
        <v-card-text>
          <Menu @addToCart="addToCart" :orderSent="orderSent" />
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
          <v-btn v-if="!orderSent" @click="sendOrderToStaff">Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col v-if="order" cols="6">
      <v-card>
        <v-card-title>Order status</v-card-title>
        <v-card-text>
          Order total: {{ order.total }}$ <br />
          Drink prepared: {{ order.drinkPrepared }} <br />
          Drink served: {{ order.drinkServed }} <br />
          Food served: {{ order.foodServed }} <br />
          Food prepared: {{ order.foodPrepared }} <br />
          Paid: {{ order.paid }} <br />
        </v-card-text>
        <v-card-actions>
          <v-btn v-if="order.foodServed && !order.paid" @click="pay">PAY</v-btn>
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
    order: null,
    orderSent: false,
    showPaidMsg: false,
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
  sockets: {
    connect() {
      console.log("socket connected");
    },
    orderStatus(order) {
      this.order = order;
    },
  },
  methods: {
    addToCart(item) {
      const index = this.orderItems.findIndex((i) => i.id === item.id);
      if (index > -1) {
        const i = this.orderItems[index];
        i.quantity += 1;
        this.orderItems.splice(index, 1, i);
      } else {
        this.orderItems.push(item);
      }
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
        total: this.total,
      };
      this.orderItems.forEach((element) => {
        if (element.type === types.FOOD) {
          order.food.push(element);
        } else {
          order.drink.push(element);
        }
      });
      this.$socket.emit("sendOrder", order);
      this.orderSent = true;
      this.order = order;
    },
    pay() {
      this.$socket.emit("payOrder", this.order.orderId, (data) => {
        console.log(data);
        if (data) {
          this.order.paid = true;
          this.showPaidMsg = true;
          setTimeout(() => (this.showPaidMsg = false), 4000);
        }
      });
    },
  },
};
</script>
