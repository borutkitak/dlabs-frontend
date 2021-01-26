<template>
  <v-row>
    <v-col cols="12">
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
                    Food
                  </th>
                  <th class="text-left">
                    Food prepared
                  </th>
                  <th class="text-left">
                    Food served
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in orders" :key="item.id">
                  <td>{{ item.orderId }}</td>
                  <td>{{ item.tableId }}</td>
                  <td>{{ formatFood(item.food) }}</td>
                  <td>{{ item.foodPrepared }}</td>
                  <td>{{ item.foodServed }}</td>
                  <td>
                    <v-btn
                      @click="prepare(item.orderId)"
                      v-if="!item.foodPrepared"
                      >Prepare food</v-btn
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
    prepareFood(order) {
      this.orders.push(order);
    },
    orderStatus(order) {
      const index = this.orders.findIndex((o) => o.orderId === order.orderId);
      if (index > -1) {
        this.orders.splice(index, 1, order);
      }
    },
  },
  methods: {
    prepare(orderId) {
      const order = this.orders.find((o) => o.orderId === orderId);
      order.foodPrepared = true;
      this.$socket.emit("foodPrepared", orderId);
    },
    formatFood(food) {
      let str = "";
      food.forEach((d) => {
        str += d.name + " x " + d.quantity + ", ";
      });
      return str;
    },
  },
};
</script>
