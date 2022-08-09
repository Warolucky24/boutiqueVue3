import type {FilterInterface} from "@/shared/interfaces";

export const DEFAULT_FILTERS: FilterInterface = {
    search: '',
    priceRange: [0,10000],
    category: 'all'
}