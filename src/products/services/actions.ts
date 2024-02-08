import { type Product, productsApi } from "..";

interface GetProductsOptions {
  filterKey?: string;
}

export const sleep = (seconds: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const getProducts = async ({
  filterKey,
}: GetProductsOptions): Promise<Product[]> => {
  const filterUrl = filterKey ? `category=${filterKey}` : "";
  const { data } = await productsApi.get<Product[]>(`/products?${filterUrl}`);
  return data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const { data } = await productsApi.get<Product>(`/products/${id}`);
  return data;
};

type ProductLike = Omit<Product, "id" | "rating">;

export const createProduct = async (product: ProductLike): Promise<Product> => {
  await sleep(5);

  throw new Error("Something went wrong");

  const { data } = await productsApi.post<Product>("/products", product);
  return data;
};
