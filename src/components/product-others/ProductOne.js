import Link from "next/link";
import cogoToast from "cogo-toast";
import PropTypes from "prop-types";
import { useProductOthers } from "@hooks";
import { CURRENCY } from "@utils/constant";
import { Fragment, useContext } from "react";
import { CartContext } from "@global/CartContext";
//import { toCapitalize } from "@utils/toCapitalize";
//import ProductSize from "./elements/ProductSize";
//import ProductColor from "./elements/ProductColor";
import ProductThumb from "./elements/ProductThumb";
import ProductAction from "./elements/ProductAction";
//import ProductRatings from "./elements/ProductRatings";
//import ProductMaterial from "./elements/ProductMaterial";
import { CartNotification, QuickView } from "@components/modal";
//import ProductSaleCountdown from "./elements/ProductSaleCountdown";
import { getCartProductQuantity, getCartProduct } from "@utils/product";
import WishlistProductAction from "@components/product/elements/WishlistProductAction";

const ProductOne = ({ product, page, showVariant, className }) => {
  const { badge, discount, name, thumbs, vendor, username, email, isPreOrder } =
    product;

  const {
    slug,
    productSize,
    productColor,
    productPrice,
    discountedPrice,
    productStock,
    modalCartAdded,
    modalQuickView,
    productMaterial,
    productColorImage,
    modalQuickViewHandler,
    modalCartAddedHandler,
  } = useProductOthers(product);

  const { shoppingCart, addToCart } = useContext(CartContext);
  const isInCart = getCartProduct(
    shoppingCart,
    product,
    productColor,
    productSize,
    productMaterial
  );
  const cartProductQuantity = getCartProductQuantity(
    shoppingCart,
    product,
    productColor,
    productSize
  );

  return (
    <Fragment>
      <div className={`tt-product thumbprod-center ${className}`}>
        <div className="tt-image-box">
          {/*
          {page === "wishlist" ? (
            <WishlistProductAction product={product} />
          ) : (
            <ProductAction
              product={product}
              modalQuickViewHandler={modalQuickViewHandler}
            />
          )}
            */}

          <Link href={"/admin/" + slug}>
            <ProductThumb
              thumbs={
                productColorImage ? [productColorImage, thumbs[1]] : thumbs
              }
              productName={name}
            />

            <div className="tt-label-location">
              {" "}
              {/* 
                          {badge &&
                            <span className={`tt-label-${badge.toLowerCase()}`}>{toCapitalize(badge)}</span>}
                            {discount && <span className={`tt-label-sale`}>Sale {discount}%</span>}
                            {isOutOfStock && <span className={`tt-label-out-stock`}>Out Of Stock</span>}
                        */}
              {isPreOrder && (
                <span className={`tt-label-out-stock`}>PRE ORDER</span>
              )}
            </div>
          </Link>
        </div>

        <div className={`tt-description ${modalCartAdded ? "active" : ""}`}>
          {/*
          {discount && discountDuration && (
            <div className="tt-countdown_box">
             
              {<ProductSaleCountdown date={discountDuration} />}
              
            </div>
          )}*/}

          <div className="tt-row">
            <ul className="tt-add-info">
              <li>
                <Link href="/">{vendor}</Link>
              </li>
            </ul>

            {/*<ProductRatings ratings={ratings} />*/}
          </div>

          <h2 className="tt-title">
            <Link href={"/admin" + slug}>{name}</Link>
          </h2>

          <div className="tt-price mt-1">
            {!discount ? (
              CURRENCY + productPrice.toFixed(2)
            ) : (
              <Fragment>
                <span className="new-price">
                  {CURRENCY + discountedPrice.toFixed(2)}
                </span>
                <span className="old-price">
                  {CURRENCY + productPrice.toFixed(2)}
                </span>
              </Fragment>
            )}
          </div>
          {/*
          {showVariant && variations && (
            <div className="tt-option-block">
              <ProductColor
                product={product}
                productColor={productColor}
                productColorHandler={productColorHandler}
              />

              <ProductSize
                className="mt-3"
                product={product}
                productColor={productColor}
                productSize={productSize}
                productSizeHandler={productSizeHandler}
              />

              <ProductMaterial
                className="mt-3"
                product={product}
                productColor={productColor}
                productMaterial={productMaterial}
                productMaterialHandler={productMaterialHandler}
              />
            </div>
          )}
        */}
          <div className="tt-product-inside-hover">
            <div className="tt-row-btn">
              <Link href={"/admin" + slug}>
                <button className={`btn btn-sm `}>
                  {" "}
                  <i className="icon-g-25" />
                  <span style={{ fontSize: "15px" }}> Edit</span>
                  {/*
                  <a
                    aria-label="Chat on WhatsApp"
                    href="https://wa.me/1XXXXXXXXXX"
                  >
                    <img
                      alt="Chat on WhatsApp"
                      src="/assets/WhatsAppButtonGreenMedium.svg"
                    />
                  </a>
                  */}
                </button>
              </Link>
            </div>

            <div className="tt-row-btn d-md-none">
              {page === "wishlist" ? (
                <WishlistProductAction product={product} />
              ) : (
                <ProductAction
                  product={product}
                  modalQuickViewHandler={modalQuickViewHandler}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ProductOne.propTypes = {
  product: PropTypes.object.isRequired,
  showVariant: PropTypes.bool.isRequired,
  page: PropTypes.string,
};

ProductOne.defaultProps = {
  showVariant: true,
};

export default ProductOne;
