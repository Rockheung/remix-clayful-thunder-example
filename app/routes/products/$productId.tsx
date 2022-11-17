import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ProductDetail from "~/components/ProductDetail";

export const loader: LoaderFunction = async ({ params }) => {
  return {
    id: params.productId,
  };
};

export default function ProductDetailPage() {
  const { id: productId } = useLoaderData();
  return (
    <ProductDetail
      product={productId}
      productActions={["add-to-cart", "buy-now"]}
      optionSelector={"separated"}
      useReviews={false}
      useRating={false}
    />
  );
}
