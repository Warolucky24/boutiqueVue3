<script setup lang="ts">
import { useAdminProducts } from "@/features/admin/stores/adminProductStore";
import { ref } from "vue";
import ProductCard from "@/features/admin/views/ProductCard.vue";

const adminProductStore = useAdminProducts();
function tryDeleteProduct(productId: string) {
  adminProductStore.deleteProduct(productId);
}
const page = ref<number>(1);
const pageMax = ref<number>(0)


</script>

<template>
  <div class="container card">
    <h2 class="italic font-bold text-xl">
      Quantité : {{ adminProductStore.products.length }}
    </h2>
    <h3 v-if="adminProductStore.isLoading">Chargement ...</h3>
    <ul v-else>
      <li v-for="product in adminProductStore.products" :key="product._id">
        <ProductCard
          :product="product"
          @try-delete-product="tryDeleteProduct"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="sass">
.card
  width: 85%
li
  border: 1px solid gray
  margin: 2px
  border-radius: 4px
  padding: 3px
  text-align: center
  transition: all .4s
  cursor: pointer
  &:hover
    background: #dcdcdc
</style>
