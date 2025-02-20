import Link from "next/link";
import PropTypes from "prop-types";
import { useProduct } from "@hooks";
import { Fragment, useContext } from "react";
import ProductThumb from "./elements/ProductThumb";
import { useRouter } from "next/router";

const MyProduct = ({ product, page, showVariant, className }) => {
  const {
    badge,
    discount,
    title,
    price,
    currency,
    vendor,
    username,
    email,
    isPreOrder,
    mainPhotoPath,
    firstPhotoPath,
  } = product;
  const router = useRouter();

  const backendUrl = process.env.NEXT_PUBLIC_BASE_URL;
  var thumbs;
  if (firstPhotoPath)
    thumbs = [backendUrl + mainPhotoPath, backendUrl + firstPhotoPath];
  else thumbs = [backendUrl + mainPhotoPath];

  var { slug } = useProduct(product);
  slug = "/my" + slug.slice(1);

  return (
    <Fragment>
      <div className={`tt-product thumbprod-center ${className}`}>
        <div className="tt-image-box">
          <Link href={slug}>
            <ProductThumb thumbs={thumbs} productName={title} />

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

        <div className="tt-description">
          <h2 className="tt-title">
            <Link href={slug}>{title}</Link>
          </h2>

          <div className="tt-price mt-1">{price + " " + currency}</div>

          <div className="tt-product-inside-hover">
            <div className="tt-row-btn">
              <button
                className="btn btn-sm flex items-center justify-center gap-0"
                onClick={() => router.push(slug)}
              >
                <i className="icon-g-25"></i>
                <span>Modifiko</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

MyProduct.propTypes = {
  product: PropTypes.object.isRequired,
  showVariant: PropTypes.bool.isRequired,
  page: PropTypes.string,
};

MyProduct.defaultProps = {
  showVariant: true,
};

export default MyProduct;
