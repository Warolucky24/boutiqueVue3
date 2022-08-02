<script setup lang="ts">
import AdminNav from '@/features/admin/components/AdminNav.vue'

</script>



<template>
  <div class="admin_container d_flex flex_row mt_20">
    <AdminNav class="admin_nav"/>
    <div class="admin_main flex_fill d_flex flex_row justify_content_center align_items_center">
      <router-view v-slot="{Component, route}">
        <Component :is="Component" :key="route.fullPath" />
      </router-view>
    </div>
  </div>

</template>

<style scoped lang="sass">
.admin_container
  width: 100%
.admin_nav
  margin: 0 20px
  flex: 0 0 200px
</style>
