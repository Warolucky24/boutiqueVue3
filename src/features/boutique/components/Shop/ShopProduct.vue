<script setup lang="ts">
import type {ProductInterface} from "@/shared/interfaces";
import {defineEmits} from "vue";

defineProps<{
  product: ProductInterface
}>()

const emit = defineEmits<{
  (e: 'addProductToCart', productId: string):void
}>()

</script>

<template>
  <div class="product d_flex flex_column">
    <img :src="product.image" :alt="product.image">
    <div class="p_10 d_flex flex_column">
      <h4>{{product.title}}</h4>
      <p>{{product.description}}</p>
      <div class="d_flex flex_row align_items_center">
        <span class="flex_fill">price : {{product.price}} $</span>
        <div>{{product.category}}</div>
        <button class="btn btn_primary"
                @click="emit('addProductToCart', product._id)"
        >Ajoutez au panier</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.product
  background: #fff
  border: 1px solid black
  border-radius: 5px
  margin: 5px
  width: 350px
  position: relative
  overflow: hidden
  box-shadow: -2px 4px 0px 0px gray
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
