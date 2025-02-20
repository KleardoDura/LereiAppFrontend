import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import { useProduct } from "@hooks";
import { getWishCompareProduct } from "@utils/product";
import { CompareContext } from "@global/CompareContext";
import { WishlistContext } from "@global/WishlistContext";
import { Fragment, useContext, useEffect, useState } from "react";

const Tooltip = dynamic(() => import("@components/ui/tooltip"), {
  ssr: false,
});

const ProductAction = ({ product, modalQuickViewHandler }) => {
  const [windowSize, setWindowSize] = useState(0);

  const { wishlist } = useContext(WishlistContext);
  const { compareList } = useContext(CompareContext);

  useEffect(() => {
    setWindowSize(window.innerWidth);
  }, [windowSize]);

  return <Fragment></Fragment>;
};

ProductAction.propTypes = {
  product: PropTypes.object.isRequired,
  modalQuickViewHandler: PropTypes.func.isRequired,
};

export default ProductAction;
