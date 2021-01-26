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
                    Drink prepared
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in orders" :key="item.id">
                  <td>{{ item.orderId }}</td>
                  <td>{{ item.tableId }}</td>
                  <td>{{ item.drinkPrepared }}</td>
                  <td><v-btn @click="prepare(item.orderId)" v-if="!item.drinkPrepared">Prepare</v-btn></td>
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
  components: {
  },
  data: () => ({
    orders: [],
  }),
  sockets: {
    connect() {
      console.log("socket connected");
    },
    receiveOrder(order) {
      this.orders.push(order);
    },
  },
  methods: {
    prepare(orderId) {
        const order = this.orders.find(o => o.orderId === orderId);
        order.drinkPrepared = true;
        this.$socket.emit('prepareDrink', orderId);
    },
  },
};
</script>
