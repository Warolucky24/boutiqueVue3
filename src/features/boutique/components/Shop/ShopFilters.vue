<script setup lang="ts">
import type {FilterInterface, Category} from "@/shared/interfaces";
import {DEFAULT_FILTERS} from "../../../../shared/data/filters";

defineProps<{
  filters: FilterInterface,
  nbrofProducts: number
}>()

const emit = defineEmits<{
  (e: "updateFilter", filterUpdate: FilterInterface): void
}>()

</script>

<template>
  <div class="p_20 d_flex flex_column">
    <section class="mb_20">
      <h3 class="mb_10">Rechercher</h3>
      <input type="text"
        @input="emit('updateFilter',{search: ($event.target as HTMLInputElement).value})"
        :value="filters.search"
        placeholder="rechercher"
      >
    </section>
    <section class="mb_20">
      <h3>Trier par prix</h3>
      <div class="mb_5" v-for="priceRange in ([[0,10000],[600,1000],[1000,1300],[1300,1500]] as [number, number][])">
        <input
            :checked="0 === priceRange[0]"
            type="radio"
            name="priceRange"
            :id="priceRange[0] + ''"
            @input="emit('updateFilter', {priceRange })"
        >
        <label :for="priceRange[0] + ''">
          {{ priceRange[0] === 0  ? 'Tous les prix' : priceRange[0] + " à " + priceRange[1]}}
        </label>
      </div>
    </section>
    <section class="mb_20">
      <h3 class="mb_10">Trier par catégories</h3>
      <p
          class="category"
          :class="{ selected: filters.category === category}"
          v-for="category in (['all','desktop','gamer','streaming'] as Category[])"
          @click="emit('updateFilter', {category})"
      >{{category}}</p>
    </section>
    <small>Nombre de résultats : {{ nbrofProducts }}</small>
    <section class="d_flex flex_column flex_fill">
      <button
      class="btn btn_danger"
      @click="emit('updateFilter', {} )"
      >
        Reset filtre
      </button>
    </section>

  </div>
</template>

<style scoped lang="sass">
.category
  cursor: pointer
  font-size: 1.1em
  line-height: 18px
  padding: 5px 10px
    border-radius: 2px
  &:hover
    background: gray
.selected
  font-weight: bold
  background: cornflowerblue
  color: white
.btn
  color: white
</style>
