import cogoToast from "cogo-toast";
import { useState, useEffect, useContext } from "react";
import { WishlistContext } from "@global/WishlistContext";
import { getDiscountPrice, getWishCompareProduct } from "@utils/product";

const useProduct = (product) => {
  const { id, discount, title } = product;

  const [productPrice, setProductPrice] = useState(0);
  const [productCurrency, setProductCurrency] = useState("Lekë");

  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);

  const isInWishlist = getWishCompareProduct(wishlist, product);

  const slug = `/product/${id}`;
  const discountedPrice = getDiscountPrice(productPrice, discount);

  const wishlistHandler = (event) => {
    event.preventDefault();
    !isInWishlist ? addToWishlist(product) : removeFromWishlist(product);
    !isInWishlist
      ? cogoToast.success(`"${title}" u shtua me sukses.`, {
          position: "bottom-right",
          heading: "U shtua ne listen e produkteve te ruajtura!",
          hideAfter: 2,
        })
      : cogoToast.warn(
          `"${title}" u hoq nga lista e produkteve te ruajtura!.`,
          {
            position: "bottom-right",
            heading: "Fshire nga lista e produkteve te ruajtura!",
            hideAfter: 2,
          }
        );
  };

  useEffect(() => {
    setProductPrice(product.price);
    setProductCurrency(product.currency);
  }, []);

  return {
    slug,
    productPrice,
    discountedPrice,
    productCurrency,
    wishlistHandler,
  };
};

export default useProduct;
