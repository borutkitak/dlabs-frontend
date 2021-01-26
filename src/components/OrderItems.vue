<template>
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
      <v-btn v-if="!orderSent" @click="$emit('sendOrderToStaff')">Send</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    orderItems: Array,
    orderSent: Boolean,
    total: Number,
  },
};
</script>
