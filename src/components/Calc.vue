<script setup lang="ts">
defineProps<{
  open: boolean;
  transparent?: boolean;
}>();
const emit = defineEmits<{
  (e: "close"): void;
}>();
</script>

<template>
  <Teleport v-if="open" to="body">
    <div
      class="calc"
      :class="{
        transparent: transparent,
      }"
      @click="emit('close')"
    ></div>
  </Teleport>
</template>

<style scoped lang="sass">
.calc
  background-color: rgba(128, 128, 128, 0.56)
  position: fixed
  top: 0px
  left: 0px
  width: 100vw
  height: 100vh
  z-index: 1
.transparent
  background-color: transparent
</style>
