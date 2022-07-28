<script setup lang="ts">
import type {Page} from "@/interfaces";
import {reactive} from "vue";

const state = reactive<{
  open: boolean
}>({
  open: false
})
defineProps<{
  page : Page
}>()

const emit = defineEmits<{
  (e: "navigate", page:Page):void
}>()

</script>

<template>




  <header class="d_flex flex_row align_items_center px_20">
    <a @click="emit('navigate','Boutique')" class="mr_10 d_flex justify_content_center align_items_center">
      <img src="../assets/images/vue.png" alt="">
      <span class="logo">Dyma</span>
    </a>
    <div class="d_flex flex_row align_items_center flex_fill action_container">
      <ul class="flex_fill d_flex flex_row flex_fill hide_x">
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
      <ul class="d_flex flex_row hide_x">
        <li class="mr_10"><a href="#">Inscription</a></li>
        <li><a href="#">Connexion</a></li>
      </ul>

      <div class="menu_xs_container">
        <i @click="state.open = !state.open" class="fa-solid fa-bars show_x"></i>

        <Transition>
          <ul @click="state.open = false" v-if="state.open" class="menu">
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
            <li class="mr_10"><a href="#">Inscription</a></li>
            <li><a href="#">Connexion</a></li>
          </ul>
        </Transition>
      </div>
    </div>
  </header>
</template>

<style scoped lang="sass">
//@use './mixin.sass'
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
  .menu_xs_container
    position: relative
    .menu
      position: absolute
      top: 10px
      right: 1px
      background-color: deepskyblue
      padding: 10px
      z-index: 1111
      border-radius: 5px
      a
        color: black
        transition: all .3s
        padding: 5px
        margin: 5px
        &:hover
          color: orange

.v-leave-to,
.v-enter-from
  transform: translateY(-10px)
  opacity: 0

.v-leave-active,
.v-enter-active
  transition: all .3s

</style>
