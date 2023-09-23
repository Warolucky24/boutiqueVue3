<script setup lang="ts">
import Cart from "@/features/boutique/components/Cart/Cart.vue";
import Shop from "@/features/boutique/components/Shop/Shop.vue";
import { useProducts } from "@/features/boutique/stores/productStore";
import { useCart } from "@/features/boutique/stores/cartStore";
import type { FilterUpdate } from "@/shared/interfaces";
import { seed_50_articles } from "@/shared/data/seed";

const productStore = useProducts();
const cartStore = useCart();

function updateFilter(filterUpdate: FilterUpdate) {
  productStore.updateFilter(filterUpdate);
}
function addProductToCart(product_id: string) {
  cartStore.addProductToCart(product_id);
}
function incPage() {
  productStore.incPage();
}
function removeProductFromCart(productId: string) {
  cartStore.removeProductFromCart(productId);
}

productStore.$onAction(({ name, after, args }) => {
  if (name === "updateFilter" && args[0].search == undefined) {
    after(() => {
      productStore.page = 1;
      productStore.products = [];
      productStore.moreResult = true;
      productStore.fetchProduct();
    });
  } else if (name == "incPage") {
    after(() => {
      productStore.fetchProduct();
    });
  }
});

if (!productStore.products.length) {
  seed_50_articles("projectTest2");
}
</script>

<template>
  <div class="boutique_container">
    <Shop
      class="shop"
      :products="productStore.filteredProducts"
      :filters="productStore.filters"
      :more-result="productStore.moreResult"
      :page="productStore.page"
      @add-product-to-cart="addProductToCart"
      @update-filter="updateFilter"
      @inc-page="incPage"
    />
    <Cart
      class="cart"
      v-if="!cartStore.cartEmpty"
      :cart="cartStore.cart"
      @remove-product-to-cart="removeProductFromCart"
    />
  </div>
</template>
