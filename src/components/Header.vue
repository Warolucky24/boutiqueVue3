<script setup lang="ts">
import type { Page } from "@/shared/interfaces";
import { reactive } from "vue";

const state = reactive<{
  open: boolean;
}>({
  open: false,
});
</script>

<template>
  <header class="flex flex_row align_items_center p-8">
    <div class="d_flex flex_row align_items_center flex_fill action_container">
      <ul class="flex_fill d_flex flex_row flex_fill hide_x font-bold">
        <li class="mr_10">
          <router-link to="/boutique">Boutique</router-link>
        </li>
        <li>
          <router-link to="/admin">Admin</router-link>
        </li>
      </ul>

      <div class="menu_xs_container">
        <i
          @click="state.open = !state.open"
          class="fa-solid fa-bars show_x"
        ></i>

        <Transition>
          <ul @click="state.open = false" v-if="state.open" class="menu">
            <li class="mr_10">
              <router-link to="/boutique">Boutique</router-link>
            </li>
            <li>
              <router-link to="/admin">Admin</router-link>
            </li>
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
          color: white

.v-leave-to,
.v-enter-from
  transform: translateY(-10px)
  opacity: 0

.v-leave-active,
.v-enter-active
  transition: all .3s
</style>
