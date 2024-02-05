import { useQuery } from "@tanstack/react-query";
import { productsActions } from "..";

interface Options {
  id: number;
}

export function useProduct({ id }: Options) {
  const {
    isLoading,
    isError,
    data: product,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productsActions.getProductById(id),
    staleTime: 1000 * 60 * 60,
  });

  return {
    error,
    isError,
    isFetching,
    isLoading,
    product,
  };
}
