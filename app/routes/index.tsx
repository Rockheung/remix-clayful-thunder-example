import { Link, useNavigate } from "@remix-run/react";
import React, { useCallback } from "react";
import ProductList from "~/components/ProductList";
import type { Props as ProductListProps } from "~/components/ProductList";

export default function Home() {
  const navigate = useNavigate();

  const handleRouteProductDetail = useCallback<
    ProductListProps["onViewProduct"]
  >(
    (_, __, productId) => {
      navigate("/products/" + productId);
    },
    [navigate]
  );
  return (
    <>
      <header>
        <nav>
          <Link to={"/"}>Home</Link>
        </nav>
      </header>
      <main>
        <ProductList onViewProduct={handleRouteProductDetail} />
      </main>
    </>
  );
}
