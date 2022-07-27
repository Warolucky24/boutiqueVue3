import type {FilterInterface, ProductInterface} from "@/interfaces";

export async function fetchProduct(filter: FilterInterface, numberOfPage: number): Promise<ProductInterface[] | ProductInterface> {
    const query = new URLSearchParams();

    if (filter.category !== 'all') {
        query.append('category', filter.category)
    }
    query.append('limit', 20 + '')
    if(numberOfPage !== 1){
        query.append('skip', ((numberOfPage - 1) * 20) + '' )
    }
    query.append('price', `$gte:${filter.priceRange[1]}`)
    query.append('price', `$gte:${filter.priceRange[0]}`)
    const products = await (await fetch('https://restapi.fr/api/projectTest2?' + query)).json()
    return products

}




