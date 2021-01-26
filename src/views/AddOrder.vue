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
      <order-items :orderItems="orderItems" :orderSent="orderSent" :total="total" @sendOrderToStaff="sendOrderToStaff"/>
    </v-col>
    <v-col v-if="order" cols="6">
      <order-status @pay="pay" :order="order" />
    </v-col>
  </v-row>
</template>
<script>
import Menu from "../components/Menu";
import OrderItems from '../components/OrderItems.vue';
import OrderStatus from '../components/OrderStatus.vue';
import { types } from "../consts";

export default {
  components: {
    Menu,
    OrderStatus,
    OrderItems,
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
