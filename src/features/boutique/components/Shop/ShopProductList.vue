<script setup lang="ts">
import ShopProduct from "@/features/boutique/components/Shop/ShopProduct.vue";
import type {ProductInterface} from "@/interfaces";
import {defineEmits} from "vue";

defineProps<{
  products: ProductInterface
}>()
const emit = defineEmits<{
  (e: "addProductToCart", productId: string):void
}>()
</script>

<template>
  <div class="grid">
    <ShopProduct
        v-for="product in products" :product="product" :key="product._id"
        @add-product-to-cart="emit('addProductToCart', $event)"
    />
  </div>
</template>

<style scoped lang="sass">
@use '@/assets/mixin.sass' as m

.grid
  display: grid
  grid-template-columns: 1fr
  @include m.lg
    grid-template-columns: 1fr 1fr
  @include m.xl
    grid-template-columns: 1fr 1fr 1fr
  grid-auto-rows: 400px
  gap: 20px


</style>
