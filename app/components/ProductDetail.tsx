import React from "react";
import type { Thunder, ThunderContext } from "~/@types/ClayfulThunder";
import ThunderComponentWrapper from "./ThunderComponentWrapper";

type Props = {
  product: string;
  productActions: ("add-to-cart" | "buy-now")[];
  optionSelector: "separated" | "combined";
  descriptionStyle: "simple" | "detailed";
  useFollowingNav: boolean;
  useReviews: boolean;
  useRating: boolean;
  onBuyNow: (
    $container: HTMLElement,
    context: ThunderContext,
    item: { _id: string }
  ) => Thunder | void;
  onItemAdd: (
    $container: HTMLElement,
    context: ThunderContext
  ) => Thunder | void;
  onGoToCart: (
    $container: HTMLElement,
    context: ThunderContext
  ) => Thunder | void;
};
const ProductDetail = (props: Partial<Props>) => {
  return <ThunderComponentWrapper name={"product-detail"} options={props} />;
};

export default ProductDetail;
