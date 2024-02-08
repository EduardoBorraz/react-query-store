import { Product, productsActions } from "..";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useProductMutation() {
  const querClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: productsActions.createProduct,
    onMutate: (data) => {
      //Optimistic product
      const optimisticData = { id: Math.random(), ...data };

      //Almacenamos el producto en el cache del queryclient
      querClient.setQueryData<Product[]>(
        ["products", { filterKey: data.category }],
        (old) => {
          if (!old) return [optimisticData];
          return [...old, optimisticData];
        }
      );

      return { optimisticData };
    },

    //data es el resultado de la promesa, variables que tenemos al momento de hacer la petición, y context es la info que nos regresa el onMutate
    onSuccess: (data, variables, context) => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Product created successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      querClient.removeQueries({
        queryKey: ["product", context?.optimisticData.id],
      });

      querClient.setQueryData<Product[]>(
        ["products", { filterKey: data.category }],
        (old) => {
          if (!old) return [data];

          return old.map((cacheData) =>
            cacheData.id === context?.optimisticData.id ? data : cacheData
          );
        }
      );
    },

    onError: (error, variables, context) => {
      querClient.removeQueries({
        queryKey: ["product", context?.optimisticData.id],
      });

      querClient.setQueryData<Product[]>(
        ["products", { filterKey: variables.category }],
        (old) => {
          if (!old) return [];

          return old.filter(
            (cacheData) => cacheData.id !== context?.optimisticData.id
          );
        }
      );
    },
  });

  //=========================================================//
  ///Usando invalidateQuery
  /* const mutation = useMutation({
    mutationFn: productsActions.createProduct,
    onSuccess: (data) => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Product created successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      querClient.invalidateQueries({
        queryKey: ["products", { filterKey: data.category }],
      });
    },
  }); */

  //=========================================================//
  //Evitando invalidare query --- Usando setQueryData para actualizar el cache, es decir, actualizar el estado viejo con el nuevo y asi evitamos el invalidar query y hacer otra petición
  /* const mutation = useMutation({
    mutationFn: productsActions.createProduct,
    onSuccess: (data) => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Product created successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      querClient.setQueryData<Product[]>(
        ["products", { filterKey: data.category }],
        (old) => {
          if (!old) return [data];
          // querClient.invalidateQueries({
          //   queryKey: ["products", { filterKey: data.category }],
          // });
          return [...old, data];
        }
      );
    },
  }); */

  return mutation;
}
