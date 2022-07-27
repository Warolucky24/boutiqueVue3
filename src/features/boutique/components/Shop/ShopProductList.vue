<script setup lang="ts">
import ShopProduct from "@/features/boutique/components/Shop/ShopProduct.vue";
import type {ProductInterface} from "@/interfaces";
import {defineEmits, inject, ref, watch} from "vue";
import {pageKey} from "@/shared/injectionKeys/pageKey";

defineProps<{
  products: ProductInterface,
  moreResult: boolean
}>()
const emit = defineEmits<{
  (e: "addProductToCart", productId: string):void
  (e: 'incPage'):void
}>()

const page = inject(pageKey)!;
const scrollableDiv = ref<HTMLDivElement | null>(null)

watch(page, () => {
  if(page.value === 1){
    scrollableDiv.value?.scrollTo(0, 0)
  }
})

</script>

<template>
  <div ref="scrollableDiv" class="d_flex flex_column p_20">
    <div class="grid">
      <ShopProduct
          v-for="product in products" :product="product" :key="product._id"
          @add-product-to-cart="emit('addProductToCart', $event)"
      />
    </div>
    <div class="d_flex flex_row align_items_center justify_content_center m_20">
      <button class="btn btn_primary" @click="emit('incPage')" v-if="moreResult">Charger plus de produits !</button>
    </div>
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
