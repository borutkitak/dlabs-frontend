<template>
  <v-row>
    <v-col cols="6">
      <v-card>
        <v-card-title> Orders </v-card-title>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    OrderId
                  </th>
                  <th class="text-left">
                    TableId
                  </th>
                  <th class="text-left">
                    Drink served
                  </th>
                  <th class="text-left">
                    Food served
                  </th>
                  <th class="text-left">
                    Paid
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in orders" :key="item.id">
                  <td>{{ item.orderId }}</td>
                  <td>{{ item.tableId }}</td>
                  <td>{{ item.drinkServed }}</td>
                  <td>{{ item.foodServed }}</td>
                  <td>{{ item.paid }}</td>
                  <td>
                    <v-btn
                      @click="serve(item.orderId, 'drink')"
                      v-if="!item.drinkServed"
                      >Serve drink</v-btn
                    >
                    <v-btn
                      @click="serve(item.orderId, 'food')"
                      v-else-if="!item.foodServed && item.foodPrepared"
                      >Serve food</v-btn
                    >
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  components: {},
  data: () => ({
    orders: [],
  }),
  sockets: {
    connect() {
      console.log("socket connected");
    },
    serveDrinks(order) {
      this.orders.push(order);
    },
    serveFood(orderId) {
      const exists = this.orders.find((o) => o.orderId === orderId);
      if (exists) {
        exists.foodPrepared = true;
      }
    },
    paid(orderId) {
      const exists = this.orders.find((o) => o.orderId === orderId);
      if (exists) {
        exists.paid = true;
      }
    },
    orderStatus(order) {
      const index = this.orders.findIndex((o) => o.orderId === order.orderId);
      if (index > -1) {
        this.orders.splice(index, 1, order);
      }
    },
  },
  methods: {
    serve(orderId, type) {
      const order = this.orders.find((o) => o.orderId === orderId);
      if (type === "drink") {
        order.drinkServed = true;
        this.$socket.emit("drinkServed", orderId);
      } else {
        order.foodServed = true;
        this.$socket.emit("foodServed", orderId);
      }
    },
  },
};
</script>
