<script setup lang="ts">
import CartProductList from "@/features/boutique/components/Cart/CartProductList.vue";
import type {ProductCartInterface} from "@/interfaces";
import {computed} from "vue";

const props = defineProps<{
  cart: ProductCartInterface[]
}>()

const emit = defineEmits<{
  (e: 'removeProductToCart', productId: string):void
}>()

const totalPrice = computed(()=> props.cart.reduce((acc, product) => {return acc + product.quantity * product.price},0) )
</script>

<template>
  <div class="p_10 d_flex flex_column">
    <h1 class="mb_10">Panier</h1>
    <CartProductList
        class="flex_fill"
        :cart="props.cart"
        @remove-product-to-cart="emit('removeProductToCart', $event)"
    />
    <button class="btn btn_success">Commander ({{totalPrice}}$)</button>
  </div>
</template>

<style scoped lang="sass">
div
  background: white
</style>
