import { useQueryClient } from "@tanstack/react-query";
import { productsActions } from "..";

export function usePrefetchProduct() {
  const queryClient = useQueryClient();

  const prefetchProduct = (id: number) => {
    queryClient.prefetchQuery({
      queryKey: ["product", id],
      queryFn: () => productsActions.getProductById(id),
    });
  };

  return prefetchProduct;
}
