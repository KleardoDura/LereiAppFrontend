import { useProduct } from "@hooks";
import cogoToast from "cogo-toast";
import PropTypes from "prop-types";
import { CURRENCY } from "@utils/constant";
import { Fragment, useContext } from "react";
import { CartContext } from "@global/CartContext";
//import { toCapitalize } from "@utils/toCapitalize";
import { CartNotification } from "@components/modal";
import { CompareContext } from "@global/CompareContext";
import { WishlistContext } from "@global/WishlistContext";

import { Col, Container, Row } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import ProductDetailsThumbnail from "@components/product-details/Thumbnail";
import WhatsappButton from "@components/whatsapp";
import { useState } from "react";
import { getWishCompareProduct } from "@utils/product";

const ProductDetails = ({ product }) => {
  const {
    id,
    title,
    mainPhotoPath,
    firstPhotoPath,
    secondPhotoPath,
    thirdPhotoPath,
    fourthPhotoPath,
    price,
    description,
    currency,
    email,
    phoneNo,
    isPreOrder,
    vendor,
  } = product;

  const { modalCartAdded, wishlistHandler, modalCartAddedHandler } =
    useProduct(product);
  const backendUrl = process.env.NEXT_PUBLIC_BASE_URL;
  let previewImages = [];
  if (mainPhotoPath != null) previewImages.push(backendUrl + mainPhotoPath);
  if (firstPhotoPath != null) previewImages.push(backendUrl + firstPhotoPath);
  if (secondPhotoPath != null) previewImages.push(backendUrl + secondPhotoPath);
  if (thirdPhotoPath != null) previewImages.push(backendUrl + thirdPhotoPath);
  if (fourthPhotoPath != null) previewImages.push(backendUrl + fourthPhotoPath);

  const { wishlist } = useContext(WishlistContext);

  const isInWishlist = getWishCompareProduct(wishlist, product);

  const [activeKey, setActiveKey] = useState("0"); // Set first item open by default

  const handleToggle = (key) => {
    setActiveKey(activeKey === key ? null : key); // Toggle open/close on click
  };
  const formattedDescription = description.split("\n").map((line, index) => (
    <span key={index}>
      {line}
      {index < description.split("\n").length - 1 && <br />}
    </span>
  ));

  return (
    <Fragment>
      <div className="container-indent">
        <Container className="container-fluid-mobile">
          <Row>
            <Col lg={6}>
              <ProductDetailsThumbnail
                productName={title}
                thumbImages={previewImages}
              />
            </Col>

            <Col lg={6}>
              <div className="tt-product-single-info">
                {isPreOrder && (
                  <div className="tt-wrapper">
                    <div className="tt-label">
                      <span className={`tt-label tt-label-out-stock`}>
                        PRE ORDER
                      </span>
                    </div>
                  </div>
                )}
                <h1 className="tt-title">{title}</h1>
                <div className="tt-price">{price + " " + currency}</div>
                <div
                  className="tt-details"
                  style={{ color: "#333", lineHeight: "2.2em" }}
                >
                  <p style={{ margin: 0, marginTop: "25px", fontSize: "18px" }}>
                    <i className="icon-g-91" /> {vendor} {/*icon-h-21 */}
                  </p>
                  <p style={{ margin: 0, fontSize: "18px" }}>
                    <i className="icon-g-88" /> {email}
                  </p>
                  <p style={{ margin: 0, fontSize: "18px" }}>
                    <i className="icon-h-35" /> {phoneNo}
                  </p>
                </div>

                <div className="tt-collapse-block mt-3">
                  <Accordion
                    activeKey={activeKey}
                    style={{ margin: 0, marginTop: "0px", fontSize: "18px" }}
                  >
                    <Accordion.Item eventKey="0">
                      <Accordion.Header onClick={() => handleToggle("0")}>
                        PERSHKRIMI
                      </Accordion.Header>
                      <Accordion.Body>{formattedDescription}</Accordion.Body>
                      {isPreOrder && (
                        <Accordion.Body>
                          * Per produktet PRE ORDER duhet te paguani 50% te
                          shumes perpara se te behet porosia.
                        </Accordion.Body>
                      )}
                    </Accordion.Item>
                    {/*
                    <Accordion.Item eventKey="1">
                      <Accordion.Header onClick={() => handleToggle("1")}>
                        ADDITIONAL INFORMATION
                      </Accordion.Header>
                      <Accordion.Body>
                      
                        <table className="tt-table-03">
                          <tbody>
                            <tr>
                              {variations && (
                                <>
                                  <td>Colors:</td>
                                  <td>
                                    {variations &&
                                      variations.map((variation, i) => (
                                        <span key={variation.title}>
                                          {toCapitalize(variation.color.name)}
                                          {variations.length !== i + 1 && ", "}
                                        </span>
                                      ))}
                                  </td>
                                </>
                              )}
                            </tr>
                            <tr>
                              {variations && (
                                <>
                                  <td>Sizes:</td>
                                  <td>
                                    {sizes.map((size, i) => (
                                      <span key={i}>
                                        {size.toUpperCase()}
                                        {sizes.length !== i + 1 && ", "}
                                      </span>
                                    ))}
                                  </td>
                                </>
                              )}
                            </tr>
                          </tbody>
                        </table>
                      
                      </Accordion.Body>
                    </Accordion.Item>  */}
                  </Accordion>
                </div>
                <div className="col-item">
                  <button className={`btn btn-lg`}>
                    <WhatsappButton product={product} />
                  </button>
                </div>

                <div className="tt-wrapper">
                  <ul className="tt-list-btn">
                    <li>
                      <a
                        className="btn-link"
                        href="/"
                        onClick={(event) => wishlistHandler(event)}
                      >
                        <i className="icon-n-072" />
                        {!isInWishlist
                          ? "RUAJ PRODUKTIN"
                          : "HIQ NGA PRODUKTET E RUAJTURA"}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {modalCartAdded && (
        <CartNotification
          product={isInCart}
          modalShow={modalCartAdded}
          modalOnHide={modalCartAddedHandler}
        />
      )}
    </Fragment>
  );
};

ProductDetails.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductDetails;
