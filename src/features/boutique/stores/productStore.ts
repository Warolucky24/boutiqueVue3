import {defineStore} from "pinia";
import type {FilterInterface, ProductInterface} from "@/shared/interfaces";
import {DEFAULT_FILTERS} from "@/shared/data/filters";
import {fetchProductWithFilter} from "@/shared/service/product.service";
import type {FilterUpdate} from "@/shared/interfaces";
import {seed_50_articles} from "@/shared/data/seed";

interface ProductState{
    products: ProductInterface[],
    filters: FilterInterface,
    page: number,
    isLoading: boolean,
    moreResult: boolean,
    loaded: boolean,
    needRefresh : boolean
}

export const useProducts = defineStore('products',{
    state: (): ProductState => ({
        products: [],
        filters: { ...DEFAULT_FILTERS },
        page: 1,
        isLoading: true,
        moreResult: true,
        loaded: false,
        needRefresh: false
    }),
    getters:{
        filteredProducts(state) {
            return state.products.filter((product) => product.title.toLocaleLowerCase().startsWith(state.filters.search.toLocaleLowerCase()))
        }
    },
    actions: {
        async fetchProduct(){
            this.isLoading = true
            const products = await fetchProductWithFilter(this.filters, this.page)
            if(Array.isArray(products)){
                this.products = [... this.products, ...products]
                if(products.length < 20){
                    this.moreResult = false
                }
            }else{
                this.products = [...this.products, products]
            }
            this.isLoading = false
        },
        updateFilter(filterUpdate: FilterUpdate){
            if(filterUpdate.search !== undefined){
                this.filters.search = filterUpdate.search
            }else if(filterUpdate.priceRange){
                this.filters.priceRange = filterUpdate.priceRange
            }else if(filterUpdate.category){
                this.filters.category = filterUpdate.category
            }else{
                this.filters = { ...DEFAULT_FILTERS }
            }
        },
        incPage(){
            this.page++
        },
        seed(){
            seed_50_articles('projectTest2')
        }
    }
})


export  function initialFecthProduct() {
    const productStore = useProducts()
    if (!productStore.loaded || productStore.needRefresh) {
        if(productStore.needRefresh){
            productStore.products = []
            productStore.page = 1
            productStore.needRefresh = false
        }
        productStore.fetchProduct()
        productStore.loaded = true
    }
}



