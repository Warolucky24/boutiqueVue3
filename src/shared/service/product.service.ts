import type {
  FilterInterface,
  ProductFormInterface,
  ProductInterface,
} from "@/shared/interfaces";

const BASE_URL = "https://restapi.fr/api/projectTest2";

export async function fetchProductWithFilter(
  filter: FilterInterface,
  numberOfPage: number
): Promise<ProductInterface[] | ProductInterface> {
  const query = new URLSearchParams();

  if (filter.category !== "all") {
    query.append("category", filter.category);
  }
  query.append("limit", 20 + "");
  if (numberOfPage !== 1) {
    query.append("skip", (numberOfPage - 1) * 20 + "");
  }
  query.append("price", `$gte:${filter.priceRange[1]}`);
  query.append("price", `$gte:${filter.priceRange[0]}`);
  return await (await fetch(`${BASE_URL}?${query}`)).json();
}

export async function fetchProducts(): Promise<ProductInterface[]> {
  return await (await fetch(BASE_URL)).json();
}

export async function deleteProduct(productId: string): Promise<string> {
  await fetch(`${BASE_URL}/${productId}`, { method: "DELETE" });
  return productId;
}

export async function addProduct(
  Product: ProductFormInterface
): Promise<ProductFormInterface> {
  return await (
    await fetch(`${BASE_URL}`, {
      method: "POST",
      body: JSON.stringify(Product),
      headers: {
        "Content-type": "application/json",
      },
    })
  ).json();

}

export async function getProduct(productId: string): Promise<ProductInterface> {
  return await (await fetch(`${BASE_URL}/${productId}`)).json();

}

export async function editProduct(
  productId: string,
  product: ProductFormInterface
): Promise<ProductInterface> {
  return await (
    await fetch(`${BASE_URL}/${productId}`, {
      method: "PATCH",
      body: JSON.stringify(product),
      headers: {
        "Content-type": "application/json",
      },
    })
  ).json();

}
