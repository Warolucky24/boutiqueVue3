<script setup lang="ts">
import {useAdminProducts} from "@/features/admin/stores/adminProductStore";

const adminProductStore = useAdminProducts()
function tryDeleteProduct(productId: string){
  adminProductStore.deleteProduct(productId)
}

</script>

<template>
  <div class="container card">
    <h2>Liste des composants : {{adminProductStore.products.length}}</h2>
    <h3 v-if="adminProductStore.isLoading">Chargement ...</h3>
    <ul v-else>
      <li v-for="product of adminProductStore.products" :key="product._id" class="d_flex flex_row align_items_center">
        <span class="flex_fill">{{ product.title }}</span>
        <router-link :to="{name: 'edit', params: {productId: product._id}}">
          <button class="btn btn_primary mr_20">Modifier</button>
        </router-link>
        <button class="btn btn_danger" @click="tryDeleteProduct(product._id)">Supprimer</button>
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
