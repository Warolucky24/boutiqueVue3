<script setup lang="ts">
import ShopProductList from "./ShopProductList.vue"
import type {FilterInterface, ProductInterface} from "@/shared/interfaces";
import {defineEmits, reactive, ref} from "vue";
import ShopFilters from "@/features/boutique/components/Shop/ShopFilters.vue";
import Calc from "@/components/Calc.vue";

const state = reactive<{
  open: boolean,
  isMobile:boolean
}>({
  open: !matchMedia('(max-width: 575px)').matches,
  isMobile: matchMedia('(max-width: 575px)').matches
})

const props = defineProps<{
  products: ProductInterface[],
  filters: FilterInterface,
  page: number,
  moreResult: boolean
}>()
const scrollablediv = ref<HTMLDivElement |null>(null)
const emit = defineEmits<{
  (e: "addProductToCart", productId: string):void
  (e: "updateFilter", updateFilter: FilterInterface):void
  (e: 'incPage'):void
}>()

</script>

<template>
  <div class="d_flex flex_row shop_container">
    <Calc :open="state.open && state.isMobile" @close="state.open = false" :transparent="true" />
    <Transition>
      <ShopFilters
          v-if="state.open"
          class="shop_filter"
          :filters = "filters"
          :nbrofProducts = "products.length"
          @update-filter="emit('updateFilter', $event)"
      />
    </Transition>
    <div class="d_flex flex_column">
      <div class="p_20">
        <button
            @click="state.open = !state.open"
            class="btn btn_primary d_flex flex_row justify_content_center align_items_center mt_20">
          <i class="fa-solid fa-magnifying-glass"></i>
          <span>rechercher</span>
        </button>
      </div>
      <ShopProductList
          class="flex_fill scrollable"
          :products="products"
          :more-result="moreResult"
          :page="props.page"
          @add-product-to-cart="emit('addProductToCart', $event)"
          @inc-page="emit('incPage')"
      />
    </div>
  </div>
</template>

<style scoped lang="sass">
@use '@/assets/mixin.sass'

button
  width: 95%
  margin: auto
  @include mixin.sm
    display: none
.shop_container
  position: relative

.shop_filter
  flex: 0 0 200px
  @include mixin.xs
    position: absolute
    top: 0px
    left: 0px
    background-color: white
    z-index: 10

button
  width: 100%

.v-leave-to,
.v-enter-from
  transform: translateX(-100%)
  opacity: 0
.v-leave-active,
.v-enter-active
  transition: all .2s

</style>
