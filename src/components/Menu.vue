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
            Price
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in menus"
          :key="item.id"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.price }}</td>
          <td><v-btn @click="$emit('addToCart', item)">Add to cart</v-btn></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
import { types } from '../consts';

  export default {
    data () {
      return {
        menus: [
          {
            id: 0,
            name: 'Grilled space-whale steak with algae puree',
            type: types.FOOD,
            price: 66.50
          },
          {
            id: 1,
            name: 'Tea substitute',
            type: types.DRINK,
            price: 1.50
          },
          {
            id: 2,
            name: 'Hagro bicuit',
            type: types.FOOD,
            price: 32.00
          },
        ],
      }
    },
  }
</script>