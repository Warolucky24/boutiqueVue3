<template>
  <div class="flex content-center justify-center">
    <div class="flex-1 font-bold text-start m-2">{{ product.title }}</div>
    <div class="uppercase font-bold m-2">{{ product.category }}</div>
    <div class="italic m-2 mr-8">{{ product.price }}€</div>

    <router-link :to="{ name: 'edit', params: { productId: product._id } }">
      <button class="btn btn_primary mr_20 text-white">Modifier</button>
    </router-link>
    <button
      class="btn btn_danger text-white"
      @click="emit('tryDeleteProduct', product._id)"
    >
      Supprimer
    </button>
  </div>
</template>

<script setup lang="ts">
import type { ProductInterface } from "@/shared/interfaces";

const { product } = defineProps<{
  product: ProductInterface;
}>();

const emit = defineEmits<{
  (e: "tryDeleteProduct", productId: string): void;
}>();
</script>
