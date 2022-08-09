<script setup lang="ts">
import CartProductList from "@/features/boutique/components/Cart/CartProductList.vue";
import type {ProductCartInterface} from "@/shared/interfaces";
import {computed, reactive} from "vue";
import Calc from "@/components/Calc.vue";

const state = reactive<{
  open: boolean
}>({
  open: false
})

const props = defineProps<{
  cart: ProductCartInterface[]
}>()

const emit = defineEmits<{
  (e: 'removeProductToCart', productId: string):void
}>()

const totalPrice = computed(()=> props.cart.reduce((acc, product) => {return acc + product.quantity * product.price},0) )
</script>

<template>
  <div class="cart_container">
    <Transition mode="out-in">
      <div
          v-if="!state.open"
          @click="state.open = !state.open"
          class="cart_holder d_flex justify_content_center align_items_center">
        <span class="tag">{{cart.length}}</span>
        <i class="fa-solid fa-cart-shopping"></i>
      </div>
      <div v-else>
        <Calc :open="true" @close="state.open = false" />
        <div class="p_10 d_flex flex_column panier">
          <h1 class="mb_10">Panier</h1>
          <CartProductList
              class="flex_fill"
              :cart="props.cart"
              @remove-product-to-cart="emit('removeProductToCart', $event)"
          />
          <button class="btn btn_success">Commander ({{totalPrice}}$)</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="sass">
button
  width: 100%

.cart_container
  position: fixed
  bottom: 20px
  right: 40px
  z-index: 3
  .cart_holder
    cursor: pointer
    width: 50px
    height: 50px
    transition: all .4s
    border-radius: 50%
    color: white
    background-color: #1a3160
    &:hover
      background-color: #06a5ba
  .panier
    display: block
    background-color: white
    padding: 20px
    border-radius: 10px 5px
    width: 65vw


  .tag
    width: 10px
    font-size: 10px
    line-height: 15px
    text-align: center
    vertical-align: middle
    border-radius: 50%
    background-color: red
    position: absolute
    top: 0px
    right: 0px


.v-leave-to,
.v-enter-from
  transform: translateY(10px)
  opacity: 0
.v-leave-active,
.v-enter-active
  transition: all .2s
</style>
