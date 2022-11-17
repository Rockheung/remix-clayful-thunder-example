import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import ProductDetail from "~/components/ProductDetail";

export const loader: LoaderFunction = async ({ params }) => {
  return {
    id: params.productId,
  };
};

export default function ProductDetailPage() {
  const { id: productId } = useLoaderData();
  return (
    <>
      <header>
        <nav>
          <Link to={"/"}>Home</Link>
        </nav>
      </header>
      <main>
        <ProductDetail
          product={productId}
          productActions={["add-to-cart", "buy-now"]}
          optionSelector={"separated"}
          useReviews={false}
          useRating={false}
        />
      </main>
    </>
  );
}
