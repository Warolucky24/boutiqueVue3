import type {Category} from "@/shared/interfaces/type";

export interface ProductInterface{
    _id: string,
    createdAt: string,
    title: string,
    image: string,
    price: number,
    description: string,
    category: Category
}

export interface ProductFormInterface{
    title: string,
    image: string,
    price: number,
    description: string,
    category: Category
}