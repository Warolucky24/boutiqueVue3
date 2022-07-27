<script setup lang="ts">
import type {ProductCartInterface} from "@/interfaces";

defineProps<{
  product: ProductCartInterface
}>()

const emit = defineEmits<{
  (e: 'removeProductToCart', productId: string):void
}>()
</script>

<template>
  <div class="p_10 mb_10 d_flex flex_row align_items_center product">
    <h1>{{product.title}}</h1>
    <span class="flex_fill">x {{product.quantity}}</span>
    <span>Prix : {{product.price}}$</span>
    <button class="btn btn_danger" @click="emit('removeProductToCart', product._id)">Supprimer</button>
  </div>
</template>

<style scoped lang="sass">
.product
  border: 1px solid  black
  border-radius: 5px
  background: #ddd
</style>
