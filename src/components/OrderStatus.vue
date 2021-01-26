<template>
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
      <v-btn v-if="order.foodServed && !order.paid" @click="$emit('pay')"
        >PAY</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    order: Object,
  },
};
</script>
