<script setup lang="ts">
import TheHeader from "@/components/Header.vue"
import TheFooter from "@/components/Footer.vue"

</script>

<template>
  <div class="app_container">
    <TheHeader class="header" />
    <div class="app_content">
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <Suspense>
            <Component :is="Component" />
          </Suspense>
        </template>
      </router-view>
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
  grid-template-columns: 100%
  grid-template-rows: 48px auto 48px
  grid-template-areas: "header" "boutique" "footer"

.header
  grid-area: header
.app_content
  grid-area: boutique
.footer
  grid-area: footer
</style>
