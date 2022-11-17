import React from "react";
import type { Thunder, ThunderContext } from "~/@types/ClayfulThunder";
import ThunderComponentWrapper from "./ThunderComponentWrapper";

export type Props = {
  page: number;
  limit: number;
  sort: number;
  // https://dev.clayful.io/ko/http/apis/product/list#query-fields
  fields: number;
  columns: number;
  // https://dev.clayful.io/ko/http/apis/product/list#query
  filter: string;
  labels: ("unavailable" | "sold-out" | "discounted")[];
  imageWidth: number;
  imageHeight: number;
  showSummary: boolean;
  showRating: boolean;
  showComparePrice: boolean;
  usePagination: boolean;
  onViewProduct: (
    $container: HTMLElement,
    context: ThunderContext,
    productId: string
  ) => Thunder | void;
};
const ProductList = (props: Partial<Props>) => {
  return <ThunderComponentWrapper name={"product-list"} options={props} />;
};

export default ProductList;
