<script setup lang="ts">
import type {Page} from "@/interfaces";

defineProps<{
  page : Page
}>()

const emit = defineEmits<{
  (e: "navigate", page:Page):void
}>()

</script>

<template>
  <header class="d_flex flex_row align_items_center justify_content_center px_20">
    <a @click="emit('navigate','Boutique')" class="mr_10 d_flex justify_content_center align_items_center">
      <img src="../assets/images/vue.png" alt="">
      <span class="logo">Dyma</span>
    </a>
    <ul class="flex_fill d_flex flex_row">
      <li class="mr_10">
        <a
            @click="emit('navigate','Boutique')"
            :class="{
              active: page === 'Boutique'
            }"
        >Boutique</a>
      </li>
      <li>
        <a
            @click="emit('navigate', 'Admin')"
            :class="{
              active: page === 'Admin'
            }"
        >Admin</a>
      </li>
    </ul>
    <ul class="d_flex flex_row">
      <li class="mr_10"><a href="#">Inscription</a></li>
      <li><a href="#">Connexion</a></li>
    </ul>
  </header>
</template>

<style scoped lang="sass">
header
  background-color: #3498db
  a
    color: #fff
    cursor: pointer


    img
      width: 20px
      margin-right: 5px
    .logo
      font-weight: 700
      font-size: 20px
  a.active
    text-decoration: underline
</style>
