import {defineStore} from "pinia";
import type {ProductFormInterface, ProductInterface} from "@/shared/interfaces";
import {addProduct, deleteProduct, editProduct, fetchProducts} from "@/shared/service/product.service";
import {useProducts} from "@/features/boutique/stores/productStore";


interface AdminProductState{
    products: ProductInterface[],
    isLoading: boolean,
    loaded: boolean
}

export const useAdminProducts = defineStore("AdminProducts", {
    state: (): AdminProductState => ({
        products: [],
        isLoading: false,
        loaded: false
    }),
    getters:{

    },
    actions:{
        async fetchProduct(){
            this.isLoading = true
            const productsAll = await fetchProducts()
            if(Array.isArray(productsAll)){
                this.products = productsAll
            }else{
                this.products = [productsAll]
            }
            this.isLoading = false
            return this.products
        },
        async deleteProduct(productId: string){
            const productIndex = this.products.findIndex(p => p._id === productId)
            await deleteProduct(productId);
            if(productIndex !== -1){
                this.products.splice(productIndex,1)
            }
        },
        async addProduct(ProductForm : ProductFormInterface){
            const productStore = useProducts()
            const newProduct = await addProduct(ProductForm)
            if(newProduct){
                productStore.needRefresh = true
                this.products.push(newProduct)
            }
        },
        async editProduct(productId : string, productForm : ProductFormInterface){
            const productStore = useProducts()
            const editProducts = await editProduct(productId, productForm)
            if(editProducts){
                productStore.needRefresh = true
                const stateProductIndex = this.products.findIndex(p => p._id === editProducts._id)
                this.products[stateProductIndex] = editProducts
            }
        }
    }
})

export function initialFectchAdminProduct(){
    const adminStore = useAdminProducts()
    if (!adminStore.loaded){
    adminStore.fetchProduct()
    adminStore.loaded = true
    }
}