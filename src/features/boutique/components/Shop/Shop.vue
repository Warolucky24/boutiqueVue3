<script setup lang="ts">
import ShopProductList from "./ShopProductList.vue"
import type {FilterInterface, ProductInterface} from "@/interfaces";
import {defineEmits} from "vue";
import ShopFilters from "@/features/boutique/components/Shop/ShopFilters.vue";

defineProps<{
  products: ProductInterface[],
  filters: FilterInterface
}>()

const emit = defineEmits<{
  (e: "addProductToCart", productId: string):void
  (e: "updateFilter", updateFilter: FilterInterface):void
}>()
</script>

<template>
  <div class="d_flex flex_row">
    <ShopFilters
        class="shop_filter"
        :filters = "filters"
        :nbrofProducts = "products.length"
        @update-filter="emit('updateFilter', $event)"
    />
    <ShopProductList
        class="flex_fill scrollable"
        :products="products"
        @add-product-to-cart="emit('addProductToCart', $event)"
    />
  </div>
</template>

<style scoped lang="sass">
.shop_filter
  flex: 0 0 200px
.scrollable
  overflow-y: auto
  height: calc(100vh - 96px)
</style>
