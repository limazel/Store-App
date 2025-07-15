import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductItem from "../components/ProductItem";
import Loading from "../components/Loading";
import requests from "../api/apiClient";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  useEffect(
    () =>
      async function fetchProductDetails() {
        try {
          const data = await requests.products.details(id);
          setProduct(data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      },
    [id]
  );

  if (loading) return <Loading />;

  if (!product) return <h1>Ürün Bulunamadı</h1>;
  
  return (
    <div className="">
      <ProductItem product={product} />
    </div>
  );
}
