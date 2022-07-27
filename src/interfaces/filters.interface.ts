import type {Category} from "@/interfaces/type";

export interface FilterInterface{
    search: string,
    priceRange: [number, number],
    category: Category
}

export interface FilterUpdate{
    search?: string,
    priceRange?: [number, number],
    category?: Category
}