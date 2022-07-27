<script setup lang="ts">
import Cart from "@/features/boutique/components/Cart/Cart.vue"
import Shop from "@/features/boutique/components/Shop/Shop.vue"
import {computed, reactive} from "vue"
import type {ProductInterface, ProductCartInterface, FilterInterface, FilterUpdate} from "@/interfaces"
import {DEFAULT_FILTERS} from "@/data/filters";

const state = reactive<{
  products: ProductInterface[],
  cart: ProductCartInterface[],
  filters: FilterInterface
}>(
    {
      products: [],
      cart: [],
      filters: { ...DEFAULT_FILTERS }
    }
)
const products = await (await fetch('https://restapi.fr/api/projectVue')).json()
if(Array.isArray(products)){
  state.products = products
}else{
  state.products = [products]
}

function addProductToCart(productId: string): void {
  const product = state.products.find((product) => product._id === productId);
  if (product) {
    const productInCart = state.cart.find(
        (product) => product._id === productId
    );
    if (productInCart) {
      productInCart.quantity++;
    } else {
      state.cart.push({ ...product, quantity: 1 });
    }
  }
}
function removeProductFromCart(productId: string): void {
  const productFromCart = state.cart.find(
      (product) => product._id === productId
  );
  if(productFromCart){
    if (productFromCart?.quantity === 1) {
      state.cart = state.cart.filter((product) => product._id !== productId);
    } else {
      productFromCart.quantity--;
    }
  }
}

const cartEmpty = computed(()=> state.cart.length === 0)

// On trie nos produit directement ici
const filteredProducts = computed(() =>{
  return state.products.filter((product)=> {
    return product.title.toLowerCase().startsWith(state.filters.search.toLowerCase()) &&
        product.price >= state.filters.priceRange[0] &&
        product.price <= state.filters.priceRange[1] &&
        (product.category === state.filters.category || state.filters.category === 'all');
  })
})
function updateFilter(filterUpdate: FilterUpdate){
  if(filterUpdate.search !== undefined){
    state.filters.search = filterUpdate.search
  }else if(filterUpdate.priceRange){
    state.filters.priceRange = filterUpdate.priceRange
  }else if(filterUpdate.category){
    state.filters.category = filterUpdate.category
  }else{
    state.filters = { ...DEFAULT_FILTERS }
  }
}
</script>

<template>
  <div class="boutique_container"
       :class="{
          'grid-empty' : cartEmpty
          }">
    <Shop class="shop"
          :products="filteredProducts"
          :filters="state.filters"
          @add-product-to-cart="addProductToCart"
          @update-filter="updateFilter"
    />
    <Cart class="cart"
          v-if="!cartEmpty"
          :cart="state.cart"
          @remove-product-to-cart="removeProductFromCart"
    />
  </div>
</template>

<style lang="sass">
.boutique_container
  display: grid
  grid-template-columns: 75% 25%
.grid-empty
  grid-template-columns: 100%

</style>