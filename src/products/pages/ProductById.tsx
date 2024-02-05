import { useParams } from "react-router-dom";
import { ProductCard, useProduct } from "..";
import useScrollToTop from "../hooks/useScrollToTop";

export const ProductById = () => {
  useScrollToTop();
  const { id } = useParams();

  const { isLoading, product } = useProduct({ id: +id! });

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Producto: </h1>
      {isLoading && <p>Cargando...</p>}
      {product && <ProductCard product={product} fullDescription />}
    </div>
  );
};
