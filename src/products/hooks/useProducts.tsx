import { useQuery } from "@tanstack/react-query";
import { productsActions } from "..";

interface Options {
  filterKey?: string;
}

export function useProducts({ filterKey }: Options) {
  const {
    isLoading,
    isError,
    data: products = [],
    error,
    isFetching,
  } = useQuery({
    queryKey: ["products", { filterKey }],
    queryFn: () => productsActions.getProducts({ filterKey }),
    staleTime: 1000 * 60 * 60,
  });

  return {
    error,
    isError,
    isFetching,
    isLoading,
    products,
  };
}
