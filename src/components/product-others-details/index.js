import { useProductOthers } from "@hooks";
import cogoToast from "cogo-toast";
import PropTypes from "prop-types";
import { CURRENCY } from "@utils/constant";
import { Fragment, useContext } from "react";

import { ChangeProduct as ChangeProduct } from "@components/footer";
import { CartContext } from "@global/CartContext";
//import { toCapitalize } from "@utils/toCapitalize";
import { CartNotification } from "@components/modal";
import { CompareContext } from "@global/CompareContext";
import { WishlistContext } from "@global/WishlistContext";
//import ProductSize from "@components/product/elements/ProductSize";
import { Col, Container, Row } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
//import ProductColor from "@components/product/elements/ProductColor";
//import ProductRatings from "@components/product/elements/ProductRatings";
//import ProductMaterial from "@components/product/elements/ProductMaterial";
import ProductDetailsThumbnail from "@components/product-details/Thumbnail";
//import ProductSaleCountdown from "@components/product/elements/ProductSaleCountdown";
import { useState } from "react";
import {
  getCartProduct,
  getCartProductQuantity,
  getDiscountPrice,
  getProductUniqueSizes,
  getWishCompareProduct,
} from "@utils/product";

const ProductDetails = ({ product }) => {
  const logo = "/assets/images/no-placeholder/logo.png";
  const {
    id,
    name,
    badge,
    price,
    description,
    discount,
    excerpt,
    previewImages,
    currency,
    categories,
    vendor,
    email,
    phoneNo,
    isPreOrder,
  } = product;

  const {
    productSize,
    productColor,
    productPrice,
    modalCartAdded,
    productMaterial,
    productQuantity,
    productCurrency,
    setProductQuantity,
    wishlistHandler,
    modalCartAddedHandler,
  } = useProductOthers(product);

  const { wishlist } = useContext(WishlistContext);

  const isInWishlist = getWishCompareProduct(wishlist, product);
  const discountedPrice = getDiscountPrice(productPrice, discount);

  const [activeKey, setActiveKey] = useState("0"); // Set first item open by default

  const handleToggle = (key) => {
    setActiveKey(activeKey === key ? null : key); // Toggle open/close on click
  };

  return (
    <Fragment>
      <div className="container-indent">
        <Container className="container-fluid-mobile">
          <Row>
            <Col lg={6}>
              <ProductDetailsThumbnail
                productName={name}
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
                <h1 className="tt-title">{name}</h1>
                <div className="tt-price">
                  {!discount ? (
                    price + " " + currency
                  ) : (
                    <Fragment>
                      <span className="sale-price mr-3">
                        {CURRENCY + discountedPrice}
                      </span>
                      <span className="old-price">
                        {CURRENCY + productPrice}
                      </span>
                    </Fragment>
                  )}
                </div>
                <div
                  className="tt-details"
                  style={{ color: "#333", lineHeight: "2.2em" }}
                >
                  <p style={{ margin: 0, marginTop: "25px", fontSize: "18px" }}>
                    <i className=" icon-h-21" /> {vendor}
                  </p>
                  <p style={{ margin: 0, fontSize: "18px" }}>
                    <i className="icon-g-88" /> {email}
                  </p>
                  <p style={{ margin: 0, fontSize: "18px" }}>
                    <i className="icon-h-35" /> {phoneNo}
                  </p>
                </div>
                {/*
                icon-h-21 -> user icon
                <div className="tt-review">
                  <ProductRatings ratings={ratings} />
                </div>
                */}

                {/*
                <div className="tt-wrapper">
                  <div className="tt-countdown_box_02">
                    {discount && discountDuration && (
                      <ProductSaleCountdown date={discountDuration} />
                    )}
                  </div>
                </div>
*/}
                {/*
                <div className="tt-wrapper">
                  <div className="tt-row-custom-01">
               
                    <div className="col-item">
                      <div className="tt-input-counter style-01">
                        <span
                          className="minus-btn"
                          onClick={productQuantityDecrement}
                        />
                        <input
                          type="text"
                          value={productQuantity}
                          size={productStock}
                          readOnly
                        />
                        <span
                          className="plus-btn"
                          onClick={productQuantityIncrement}
                        />
                      </div>
                    </div>

                  </div>
                </div>
*/}

                {/*
                <div className="tt-wrapper">
                  <div className="tt-promo-brand">
                    <img
                      src="/assets/images/no-placeholder/tt-promo-brand-desktop.png"
                      className="visible-lg visible-md visible-sm visible-xl"
                      alt="Payment Method"
                    />
                    <img
                      src="/assets/images/no-placeholder/tt-promo-brand-mobile.png"
                      className="visible-xs"
                      alt="Payment Method"
                    />
                  </div>
                </div>
                */}

                <div className="tt-collapse-block mt-3">
                  <Accordion
                    activeKey={activeKey}
                    style={{ margin: 0, marginTop: "0px", fontSize: "18px" }}
                  >
                    <Accordion.Item eventKey="0">
                      <Accordion.Header onClick={() => handleToggle("0")}>
                        PERSHKRIMI
                      </Accordion.Header>
                      <Accordion.Body>{description}</Accordion.Body>
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
                    <i className="icon-h-03" />
                    <span style={{ fontSize: "15px" }}> Fshi</span>
                  </button>

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
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <p
          style={{
            backgroundColor: "#c38e58",
            color: "#fff",
            textAlign: "center",
            padding: "15px 0",
            width: "100%",
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          NDRYSHONI PRODUKTIN
        </p>
        <Container>
          <br />
          <div className="tt-login-form">
            <Row>
              <Col md={6}>
                <div className="tt-item">
                  <h2 className="tt-title">PLOTËSONI FUSHAT E MËPOSHTME</h2>
                  <div className="form-default form-top">
                    <form
                      id="customer_login"
                      method="post"
                      noValidate="novalidate"
                    >
                      <div className="form-group">
                        <label htmlFor="loginUserName">
                          EMRI I PRODUKTIT *
                        </label>
                        <div className="tt-required">
                          * Fusha të detyrueshme
                        </div>
                        <input
                          type="text"
                          name="productName"
                          id="productName"
                          className="form-control"
                          placeholder=""
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="loginPassword">ÇMIMI *</label>
                        <input
                          type="text"
                          name="price"
                          id="price"
                          className="form-control"
                          placeholder=""
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="currency">MONEDHA *</label>
                        <select
                          name="currency"
                          id="currency"
                          className="form-control"
                          required
                        >
                          <option value="Lekë" selected>
                            Lekë
                          </option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="loginPassword">EMAIL</label>
                        <input
                          type="text"
                          name="email"
                          id="email"
                          className="form-control"
                          placeholder=""
                          defaultValue="kleardodura13@gmail.com"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="loginPassword">
                          NUMRI I TELEFONIT NË WhatsApp*
                        </label>
                        <input
                          type="text"
                          name="phoneNo"
                          id="phoneNo"
                          className="form-control"
                          placeholder=""
                          required
                          defaultValue="0693449380"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="currency">
                          KATEGORIA E PRODUKTEVE *
                        </label>
                        <select
                          name="category"
                          id="category"
                          className="form-control"
                          required
                        >
                          <option value="Instrumente me tela" selected>
                            Instrumente me tela
                          </option>
                          <option value="Instrumente me tastiere">
                            Instrumente me tastiere
                          </option>
                          <option value="Instrumente membranofon">
                            Instrumente membranofon
                          </option>
                          <option value="Instrumente elektronike">
                            Instrumente elektronike
                          </option>
                          <option value="Instrumente frymore">
                            Instrumente frymore
                          </option>
                          <option value="Instrumente me hark">
                            Instrumente me hark
                          </option>
                          <option value="Instrumente tradicional">
                            Instrumente tradicional
                          </option>
                          <option value="Aksesore kitare">
                            Aksesore kitare
                          </option>
                          <option value="Te tjera">Te tjera</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="productDescription">
                          PËRSHKRIMI I PRODUKTIT *
                        </label>
                        <textarea
                          name="productDescription"
                          id="productDescription"
                          className="form-control"
                          placeholder="Shkruani përshkrimin e produktit këtu"
                          required
                          rows="4"
                        ></textarea>
                      </div>
                    </form>
                  </div>
                </div>
              </Col>

              <Col md={6}>
                <div className="tt-item">
                  <h2 className="tt-title">NDRYSHONI FOTOT</h2>
                  <div className="form-default form-top">
                    <form
                      id="customer_login"
                      method="post"
                      noValidate="novalidate"
                    >
                      <div className="form-group">
                        <label htmlFor="imageUpload">
                          NGARKO FOTON KRYESORE *
                        </label>
                        <input
                          type="file"
                          name="image"
                          id="imageUpload"
                          className="form-control"
                          accept="image/*"
                          required
                        />
                      </div>
                      <br />
                      <div className="form-group">
                        <label htmlFor="imageUpload">
                          MUND TË SHTONI DHE KATËR FOTO TË TJERA
                        </label>
                        <input
                          type="file"
                          name="image"
                          id="imageUpload"
                          className="form-control"
                          accept="image/*"
                          required
                        />
                        <br />
                        <input
                          type="file"
                          name="image"
                          id="imageUpload"
                          className="form-control"
                          accept="image/*"
                          required
                        />
                        <br />
                        <input
                          type="file"
                          name="image"
                          id="imageUpload"
                          className="form-control"
                          accept="image/*"
                          required
                        />
                        <br />
                        <input
                          type="file"
                          name="image"
                          id="imageUpload"
                          className="form-control"
                          accept="image/*"
                          required
                        />{" "}
                        <br />
                        <p
                          style={{
                            fontSize: "15px",
                            margin: "0",
                            fontWeight: "bold",
                          }}
                        >
                          *Për çdo produkt që ju publikoni dhe shitet nga
                          dyqanin jonë, Lerei Music mban 30% të çmimit të
                          produktit në momentin kur kryhet shitja
                        </p>
                      </div>

                      <Row>
                        <Col xs="auto" className="mr-auto">
                          <div className="form-group">
                            <button className="btn btn-border">
                              PUKLIKONI PRODUKTIN
                            </button>
                          </div>
                        </Col>
                      </Row>
                    </form>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </Fragment>
  );
};

ProductDetails.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductDetails;
