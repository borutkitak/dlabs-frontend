<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Type
          </th>
          <th class="text-left">
            Price
          </th>
          <th class="text-left">
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in menus" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.price }}$</td>
          <td><v-btn v-if="!orderSent" @click="$emit('addToCart', item)">Add to cart</v-btn></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
import { types } from "../consts";

export default {
  props: {
    orderSent: Boolean,
  },
  data() {
    return {
      menus: [
        {
          id: 0,
          name: "Grilled space-whale steak with algae puree",
          type: types.FOOD,
          price: 66.5,
          quantity: 1,
        },
        {
          id: 1,
          name: "Tea substitute",
          type: types.DRINK,
          price: 1.5,
          quantity: 1,
        },
        {
          id: 2,
          name: "Hagro bicuit",
          type: types.FOOD,
          price: 32.0,
          quantity: 1,
        },
        {
          id: 3,
          name: "Amegelian Majon Cow casserole",
          type: types.FOOD,
          price: 55.75,
          quantity: 1,
        },
        {
          id: 4,
          name: "Pan Galactic Gargle Blaster",
          type: types.DRINK,
          price: 5.50,
          quantity: 1,
        },
        {
          id: 5,
          name: "Janx Spirit",
          type: types.DRINK,
          price: 7.00,
          quantity: 1,
        },
        {
          id: 6,
          name: "Tzjin-anthony-ks",
          type: types.DRINK,
          price: 11.50,
          quantity: 1,
        },
      ],
    };
  },
};
</script>
