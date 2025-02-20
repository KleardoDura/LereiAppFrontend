import Link from "next/link";
import cogoToast from "cogo-toast";
import PropTypes from "prop-types";
import { useProduct } from "@hooks";
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
import WhatsappButton from "@components/whatsapp";
const ProductOne = ({ product, page, className }) => {
  const {
    title,
    price,
    currency,
    vendor,
    username,
    email,
    isPreOrder,
    mainPhotoPath,
    firstPhotoPath,
    badge,
    discount,
    name,
  } = product;

  const backendUrl = process.env.NEXT_PUBLIC_BASE_URL;
  var thumbs;
  if (firstPhotoPath)
    thumbs = [backendUrl + mainPhotoPath, backendUrl + firstPhotoPath];
  else thumbs = [backendUrl + mainPhotoPath];

  const { slug, modalCartAdded } = useProduct(product);

  return (
    <Fragment>
      <div className={`tt-product thumbprod-center ${className}`}>
        <div className="tt-image-box">
          <Link href={slug}>
            <ProductThumb thumbs={thumbs} productName={title} />

            <div className="tt-label-location">
              {isPreOrder && (
                <span className={`tt-label-out-stock`}>PRE ORDER</span>
              )}
            </div>
          </Link>
        </div>

        <div className={`tt-description ${modalCartAdded ? "active" : ""}`}>
          <div className="tt-row">
            <ul className="tt-add-info">
              <li>
                {/*<Link href="/">{vendor}</Link>*/}
                Lerei Music Store
              </li>
            </ul>
          </div>

          <h2 className="tt-title">
            <Link href={slug}>{title}</Link>
          </h2>

          <div className="tt-price mt-1">{price + " " + currency}</div>

          <div className="tt-product-inside-hover">
            <div className="tt-row-btn">
              <button className={`btn btn-sm `}>
                {" "}
                <WhatsappButton product={product} />
              </button>
            </div>

            <div className="tt-row-btn d-md-none">
              {page === "wishlist" ? (
                <WishlistProductAction product={product} />
              ) : (
                <></>
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
