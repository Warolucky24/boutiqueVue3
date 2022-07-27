<script setup lang="ts">
import TheHeader from "@/components/Header.vue"
import TheFooter from "@/components/Footer.vue"
import Boutique from "@/features/boutique/Boutique.vue"
import Admin from "@/features/admin/Admin.vue"
import type {Component as C} from "vue";
import {reactive} from "vue";
import type {Page} from "@/interfaces";
import seed from '@/data/seed';

const state = reactive<{
  page: Page
}>(
    {
      page: "Boutique"
    }
)

const pages : { [s: string]: C } = {
  Boutique, Admin
}

function navigate(page: Page):void{
  state.page = page
}

//seed('projectVue')

</script>


<template>
  <div class="app_container">
    <TheHeader
        @navigate="navigate"
        :page="state.page"
        class="header" />

    <div class="app_content">
      <Suspense>
        <Component :is="pages[state.page]" />
      </Suspense>

    </div>
    <TheFooter class="footer"/>
  </div>
</template>

<style lang="sass">
@import "assets/base.sass"
@import "assets/debug.sass"

.app_container
  height: 100vh
  display: grid
  grid-template-columns: 75% 25%
  grid-template-rows: 48px auto 48px
  grid-template-areas: "header header" "boutique boutique" "footer footer"

.header
  grid-area: header
.app_content
  grid-area: boutique
.footer
  grid-area: footer
</style>
