<script setup lang="ts">
import type { ProductInterface } from "@/shared/interfaces";
import { defineEmits } from "vue";

defineProps<{
  product: ProductInterface;
}>();

const emit = defineEmits<{
  (e: "addProductToCart", productId: string): void;
}>();
</script>

<template>
  <div class="product flex flex-col">
    <img :src="product.image" :alt="product.image" />
    <div class="p_10 d_flex flex_column">
      <h4 class="text-xl font-bold">{{ product.title }}</h4>
      <p class="italic mt-0.5 mb-2">{{ product.description }}</p>
      <div class="d_flex flex_row align_items_center">
        <span class="flex_fill font-bold">Prix : {{ product.price }} €</span>
        <div class="uppercase">{{ product.category }}</div>
        <button
          class="p-2 border-2 bg-cyan-700 text-white"
          @click="emit('addProductToCart', product._id)"
        >
          Ajoutez au panier
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.product
  background: #fff
  border: 1px solid black
  margin: 5px
  width: 350px
  position: relative
  overflow: hidden
  box-shadow: -4px 6px 0px 0px gray
  transition: all .4s
  &:hover
    box-shadow: -0px 2px 0px 0px gray
  img
    width: 100%
    max-height: 185px
  button
    position: absolute
    bottom: 10px
    right: 10px
</style>
