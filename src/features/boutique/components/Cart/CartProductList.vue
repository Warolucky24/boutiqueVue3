<script setup lang="ts">
import CartProduct from "@/features/boutique/components/Cart/CartProduct.vue"
import type {ProductCartInterface} from "@/shared/interfaces/productCart.interface"

defineProps<{
  cart: ProductCartInterface[]
}>()

const emit = defineEmits<{
  (e: 'removeProductToCart', productId: string):void
}>()
</script>

<template>
  <div class="d_flex flex_column align_items">
    <CartProduct v-for="product in cart" :key="product._id"
                 :product="product"
                 @remove-product-to-cart="emit('removeProductToCart', $event)"
    />
  </div>
</template>

<style scoped lang="sass">
</style>
