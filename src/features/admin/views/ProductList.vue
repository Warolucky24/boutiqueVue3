<script setup lang="ts">
import {deleteProduct, useFetchProduct} from "@/shared/service/product.service";
const {products, loading, error } = useFetchProduct()


async function tryDeleteProduct(productId: string){
  await deleteProduct(productId);
  products.value = products.value!.filter(p => p._id !== productId)
}
</script>

<template>
  <div class="container card">
    <h2>Liste des composants :</h2>
    <h3 v-if="error">OOpp une erreur c'est produite</h3>
    <h3 v-else-if="loading">Chargement ...</h3>
    <ul v-else>
      <li v-for="product of products" :key="product._id" class="d_flex flex_row align_items_center">
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
