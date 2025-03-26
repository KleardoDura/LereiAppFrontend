import { useProduct } from "@hooks";
import cogoToast from "cogo-toast";
import PropTypes, { instanceOf } from "prop-types";
import { CURRENCY } from "@utils/constant";
import { Fragment, useContext } from "react";
import { CartContext } from "@global/CartContext";
//import { toCapitalize } from "@utils/toCapitalize";
import { CartNotification } from "@components/modal";
import { CompareContext } from "@global/CompareContext";
import { WishlistContext } from "@global/WishlistContext";
import { Element, animateScroll as scroll } from "react-scroll";

import { Col, Container, Row, Modal, Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import ProductDetailsThumbnail from "@components/product-details/Thumbnail";
import WhatsappButton from "@components/whatsapp";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { getWishCompareProduct } from "@utils/product";
import { useRouter } from "next/router";

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
  const router = useRouter();

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

  //===============================================================
  //     NGA ADD-PRODUCT
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const [user, setUser] = useState({
    id: 0,
    userName: "",
    email: "",
    phoneNo: "",
    password: "",
  });
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/details`,
          { withCredentials: true }
        );
        if (response?.data) setUser(response.data);

        if (response.status === 200) {
          setIsUserLoggedIn(true);
        }
      } catch (error) {
        setIsUserLoggedIn(false);
      }
    };

    checkAuthStatus();
  }, []);
  const deleteProduct = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/delete-post/` + id,
        { withCredentials: true }
      );

      if (response.status === 200) {
        router.push("/account/user-details");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isUserLoggedIn && user.email && user.phoneNo && user.userName) {
      setPost((prevPost) => ({
        ...prevPost,
        email: email,
        vendor: vendor,
        phoneNo: phoneNo,
      }));
    }
  }, [user, isUserLoggedIn]);
  const [post, setPost] = useState({
    id: id,
    title: title,
    price: price,
    currency: currency,
    email: email,
    vendor: vendor,
    phoneNo: phoneNo,
    categoryId: product.categoryId,
    description: description,
    isPreOrder: product.isPreOrder,
  });
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (name === "price" && value.length > 9) {
      return; // Don't update state if the value exceeds 20 characters
    }
    setPost((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const [files, setFiles] = useState({
    mainFile: mainPhotoPath ? backendUrl + mainPhotoPath : null,
    firstFile: firstPhotoPath ? backendUrl + firstPhotoPath : null,
    secondFile: secondPhotoPath ? backendUrl + secondPhotoPath : null,
    thirdFile: thirdPhotoPath ? backendUrl + thirdPhotoPath : null,
    fourthFile: fourthPhotoPath ? backendUrl + fourthPhotoPath : null,
  });
  const [filePreviews, setFilePreviews] = useState({
    mainFile: mainPhotoPath ? backendUrl + mainPhotoPath : null,
    firstFile: firstPhotoPath ? backendUrl + firstPhotoPath : null,
    secondFile: secondPhotoPath ? backendUrl + secondPhotoPath : null,
    thirdFile: thirdPhotoPath ? backendUrl + thirdPhotoPath : null,
    fourthFile: fourthPhotoPath ? backendUrl + fourthPhotoPath : null,
  });

  // Handle file selection for all inputs
  const handleFileChange = (event) => {
    const { name, files: selectedFiles } = event.target;
    const file = selectedFiles[0]; //shtuar per image preview
    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: selectedFiles[0], // Update the specific file
    }));
    //shtuar per iamge preview:
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreviews((prevPreviews) => ({
          ...prevPreviews,
          [name]: reader.result, // Store the base64 image URL
        }));
      };
      reader.readAsDataURL(file); // Read the image as base64 URL
    }
  };
  const fileInputRefs = useRef({});
  const [filePreviewsAssocArray, setFilePreviewsAssocArray] = useState({
    mainFile: mainPhotoPath ? mainPhotoPath : null,
    firstFile: firstPhotoPath ? firstPhotoPath : null,
    secondFile: secondPhotoPath ? secondPhotoPath : null,
    thirdFile: thirdPhotoPath ? thirdPhotoPath : null,
    fourthFile: fourthPhotoPath ? fourthPhotoPath : null,
  });

  const handleDelete = async (fieldName) => {
    setFilePreviews((prevPreviews) => ({
      ...prevPreviews,
      [fieldName]: null,
    }));
    setFiles((prevFiles) => {
      const newFiles = { ...prevFiles };
      delete newFiles[fieldName];
      return newFiles;
    });
    if (fileInputRefs.current[fieldName]) {
      fileInputRefs.current[fieldName].value = ""; // Clear the input
    }

    if (filePreviewsAssocArray[fieldName] != null) {
      try {
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_BASE_URL}/delete-file`,
          {
            params: { filePath: filePreviewsAssocArray[fieldName] },
            headers: {
              "Accept-Language": "sq",
            },
            withCredentials: true,
          }
        );
        const updatedFilePreviews = {
          ...filePreviewsAssocArray,
          [fieldName]: null,
        };
        setFilePreviewsAssocArray(updatedFilePreviews);
      } catch (err) {
        if (err?.response?.data && typeof err.response.data === "string")
          setModalMessage(err.response.data);
        else
          setModalMessage(
            "System error! Please contact the system administrator."
          );
        setShowModal(true);
      }
    }
  };
  /*
  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm();
    post.price = parseInt(post.price);
    //console.log("Form Data Submitted:", post);
    console.log(errors);
    // Logic for API call can be added here
  };
*/
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Get the latest state
    const latestPost = { ...post, price: parseInt(post.price) };

    const formData = new FormData();

    Object.entries(files).forEach(([key, file]) => {
      if (file) {
        if (file instanceof Blob) {
          formData.append(key, file);
        } else {
          formData.append(key, null);
        }
      }
    });

    formData.append(
      "post",
      new Blob([JSON.stringify(latestPost)], { type: "application/json" })
    );

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/updatePost`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Accept-Language": "sq",
          },
          withCredentials: true,
        }
      );

      if (response?.data && typeof response.data === "string")
        window.location.reload();
      else {
        setModalMessage(
          "System error! Please contact the system administrator."
        );
        setShowModal(true);
      }
    } catch (err) {
      if (err?.response?.data && typeof err.response.data === "string")
        setModalMessage(err.response.data);
      else
        setModalMessage(
          "System error! Please contact the system administrator."
        );
      setShowModal(true);
    }
  };

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};

    // Check if name is provided
    if (!post.title.trim()) {
      newErrors.title = "Emri i produktit nuk mund të jetë bosh";
    }
    if (!post.vendor.trim()) {
      newErrors.vendor = "Emri i shitesit nuk mund të jetë bosh";
    }
    if (post.title.trim() && post.title.trim().length > 26) {
      newErrors.title =
        "Emri i produktit nuk mund të jetë i gjatë më shumë se 26 karaktere";
    }
    //if ((String(post.price).trim().length = 0))
    if (
      isNaN(post.price) ||
      post.price == null ||
      post.price == undefined ||
      post.price == ""
    ) {
      newErrors.price = "Cmimi nuk mund të jetë bosh";
    } else if (parseInt(post.price) < 0) {
      newErrors.price = "Cmimi nuk mund të jetë numer negativ";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (post.email.trim().length > 0 && !emailRegex.test(post.email)) {
      newErrors.email = "Ju lutemi vendosni një e-mail të vlefshëm";
    }

    const phoneRegex = /^\+?[0-9]+$/;
    if (!phoneRegex.test(post.phoneNo)) {
      newErrors.phoneNo = "Numri i telefonit duhet të përmbajë vetëm numra";
    }
    if (!files.mainFile) {
      newErrors.mainFile = "Fotoja kryesore nuk mund të jetë bosh";
    }
    /*
    if (!post.description.trim()) {
      newErrors.description = "Përshkrimi i produktit nuk mund të jetë bosh";
    }*/
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const scrollToFirstError = () => {
    const firstErrorElement = document.querySelector('input[type="email"]');
    if (firstErrorElement) {
      scroll.scrollTo(firstErrorElement, {
        smooth: true,
      });
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  //==============================================================================
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
                    <i className="icon-h-07" style={{ marginRight: "3px" }} />
                    Klikime: {product.views} {/*icon-h-21 */}
                  </p>
                  <p style={{ margin: 0, marginTop: "0px", fontSize: "18px" }}>
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
                        PERSHKRIMIM
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
                  <button
                    className="btn btn-lg flex items-center gap-2"
                    onClick={() => deleteProduct()}
                  >
                    <i className="icon-h-03"></i>
                    <p className="m-0" style={{ fontSize: "16px" }}>
                      Fshi produktin
                    </p>
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="container-indent">
        <Container>
          <h1 className="tt-title-subpages noborder">MODIFIKONI PRODUKTIN</h1>
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
                          name="title"
                          id="title"
                          className="form-control"
                          placeholder=""
                          required
                          value={post.title}
                          onChange={handleChange}
                          maxLength="26"
                        />
                        {errors.title && (
                          <div style={{ color: "red" }}>{errors.title}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="loginPassword">ÇMIMI *</label>
                        <input
                          type="number"
                          name="price"
                          id="price"
                          className="form-control"
                          placeholder=""
                          required
                          value={post.price}
                          onChange={handleChange}
                        />
                        {errors.price && (
                          <div style={{ color: "red" }}>{errors.price}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="currency">MONEDHA *</label>
                        <select
                          name="currency"
                          id="currency"
                          className="form-control"
                          required
                          value={post.currency}
                          onChange={handleChange}
                        >
                          <option value="Lekë" selected>
                            Lekë
                          </option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="loginUserName">EMRI I SHITËSIT *</label>
                        <input
                          type="text"
                          name="vendor"
                          id="vendor"
                          className="form-control"
                          placeholder=""
                          required
                          value={post.vendor}
                          onChange={handleChange}
                          maxLength="25"
                        />
                        {errors.vendor && (
                          <div style={{ color: "red" }}>{errors.vendor}</div>
                        )}
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
                          value={post.phoneNo}
                          onChange={handleChange}
                          maxLength="20"
                        />
                        {errors.phoneNo && (
                          <div style={{ color: "red" }}>{errors.phoneNo}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="loginPassword">EMAIL</label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="form-control"
                          placeholder=""
                          value={post.email}
                          onChange={handleChange}
                          maxLength="35"
                        />
                        {errors.email && (
                          <div style={{ color: "red" }}>{errors.email}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="categoryId">
                          KATEGORIA E PRODUKTEVE *
                        </label>
                        <select
                          name="categoryId"
                          id="categoryId"
                          className="form-control"
                          required
                          value={post.categoryId}
                          onChange={handleChange}
                        >
                          <option value="1" selected>
                            Instrumente me tela
                          </option>
                          <option value="2">Instrumente me tastiere</option>
                          <option value="3">Instrumente membranofon</option>
                          <option value="4">Instrumente elektronike</option>
                          <option value="5">Instrumente frymore</option>
                          <option value="6">Instrumente me hark</option>
                          <option value="7">Instrumente tradicional</option>
                          <option value="8">Aksesore</option>
                          <option value="9">Te tjera</option>
                          {user.id == 1 && <option value="10">Oferta</option>}
                        </select>
                      </div>
                      {user.id == 1 && (
                        <div className="form-group">
                          <label
                            htmlFor="isPrOrder"
                            style={{
                              display: "inline-block",
                              marginRight: "10px", // Space between label and checkbox
                              verticalAlign: "middle", // Aligns with the checkbox
                            }}
                          >
                            KLIKO NËSË PRODUKTI ËSHTË PREORDER
                          </label>
                          <input
                            type="checkbox"
                            name="isPreOrder"
                            id="isPreOrder"
                            checked={post.isPreOrder}
                            style={{
                              width: "20px",
                              height: "20px",
                              cursor: "pointer",
                              marginBottom: "5px",
                              accentColor: "#007bff", // Customize the checkbox color
                              verticalAlign: "middle", // Aligns with the label
                            }}
                            onChange={handleChange}
                          />
                        </div>
                      )}
                      <div className="form-group">
                        <label htmlFor="productDescription">
                          PËRSHKRIMI I PRODUKTIT
                        </label>
                        <textarea
                          name="description"
                          id="description"
                          className="form-control"
                          placeholder="Shkruani përshkrimin e produktit këtu"
                          required
                          rows="4"
                          cols="20" // This ensures each line can only fit 25 characters
                          value={post.description}
                          onChange={handleChange}
                          maxLength="1490"
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
                        <label htmlFor="mainFile">
                          NGARKO FOTON KRYESORE *
                        </label>

                        <div className="form-group">
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <input
                              type="file"
                              name="mainFile"
                              id="mainFile"
                              className="form-control"
                              accept="image/*"
                              required
                              onChange={handleFileChange}
                              ref={(el) =>
                                (fileInputRefs.current["mainFile"] = el)
                              }
                            />
                            {filePreviews.mainFile && (
                              <>
                                <img
                                  src={filePreviews.mainFile}
                                  alt="Main File Preview"
                                  style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover",
                                    marginLeft: "10px",
                                    border: "2px solid #ddd",
                                    borderRadius: "5px",
                                  }}
                                />

                                <button
                                  type="button"
                                  onClick={() => handleDelete("mainFile")}
                                  style={{
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                    border: "none",
                                    background: "transparent",
                                    padding: 0,
                                    margin: 0,
                                    outline: "none",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "auto",
                                    height: "auto",
                                    verticalAlign: "middle", // Align with other inline elements
                                  }}
                                >
                                  <i
                                    className="icon-g-85"
                                    style={{
                                      color: "red",
                                      fontSize: "20px",
                                    }}
                                  ></i>
                                </button>
                              </>
                            )}
                          </div>
                          {errors.mainFile && (
                            <div style={{ color: "red" }}>
                              {errors.mainFile}
                            </div>
                          )}
                        </div>
                      </div>
                      <br />
                      <div className="form-group">
                        <label htmlFor="firstFile">
                          MUND TË SHTONI DHE TRE FOTO TË TJERA
                        </label>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginTop: "5px",
                            }}
                          >
                            <input
                              type="file"
                              name="firstFile"
                              id="firstFile"
                              className="form-control"
                              accept="image/*"
                              onChange={handleFileChange}
                              ref={(el) =>
                                (fileInputRefs.current["firstFile"] = el)
                              }
                            />
                            {filePreviews.firstFile && (
                              <>
                                <img
                                  src={filePreviews.firstFile}
                                  alt="First File Preview"
                                  style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover",
                                    marginLeft: "10px",
                                    border: "2px solid #ddd",
                                    borderRadius: "5px",
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={() => handleDelete("firstFile")}
                                  style={{
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                    border: "none",
                                    background: "transparent",
                                    padding: 0,
                                    margin: 0,
                                    outline: "none",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "auto",
                                    height: "auto",
                                    verticalAlign: "middle", // Align with other inline elements
                                  }}
                                >
                                  <i
                                    className="icon-g-85"
                                    style={{
                                      color: "red",
                                      fontSize: "20px",
                                    }}
                                  ></i>
                                </button>
                              </>
                            )}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginTop: "5px",
                            }}
                          >
                            <input
                              type="file"
                              name="secondFile"
                              id="secondFile"
                              className="form-control"
                              accept="image/*"
                              onChange={handleFileChange}
                              ref={(el) =>
                                (fileInputRefs.current["secondFile"] = el)
                              }
                            />
                            {filePreviews.secondFile && (
                              <>
                                <img
                                  src={filePreviews.secondFile}
                                  alt="Second File Preview"
                                  style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover",
                                    marginLeft: "10px",
                                    border: "2px solid #ddd",
                                    borderRadius: "5px",
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={() => handleDelete("secondFile")}
                                  style={{
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                    border: "none",
                                    background: "transparent",
                                    padding: 0,
                                    margin: 0,
                                    outline: "none",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "auto",
                                    height: "auto",
                                    verticalAlign: "middle", // Align with other inline elements
                                  }}
                                >
                                  <i
                                    className="icon-g-85"
                                    style={{
                                      color: "red",
                                      fontSize: "20px",
                                    }}
                                  ></i>
                                </button>
                              </>
                            )}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginTop: "5px",
                            }}
                          >
                            <input
                              type="file"
                              name="thirdFile"
                              id="thirdFile"
                              className="form-control"
                              accept="image/*"
                              onChange={handleFileChange}
                              ref={(el) =>
                                (fileInputRefs.current["thirdFile"] = el)
                              }
                            />
                            {filePreviews.thirdFile && (
                              <>
                                <img
                                  src={filePreviews.thirdFile}
                                  alt="Third File Preview"
                                  style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover",
                                    marginLeft: "10px",
                                    border: "2px solid #ddd",
                                    borderRadius: "5px",
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={() => handleDelete("thirdFile")}
                                  style={{
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                    border: "none",
                                    background: "transparent",
                                    padding: 0,
                                    margin: 0,
                                    outline: "none",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "auto",
                                    height: "auto",
                                    verticalAlign: "middle", // Align with other inline elements
                                  }}
                                >
                                  <i
                                    className="icon-g-85"
                                    style={{
                                      color: "red",
                                      fontSize: "20px",
                                    }}
                                  ></i>
                                </button>
                              </>
                            )}
                          </div>
                          {/*
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginTop: "5px",
                            }}
                          >
                            <input
                              type="file"
                              name="fourthFile"
                              id="fourthFile"
                              className="form-control"
                              accept="image/*"
                              onChange={handleFileChange}
                              ref={(el) =>
                                (fileInputRefs.current["fourthFile"] = el)
                              }
                            />
                            {filePreviews.fourthFile && (
                              <>
                                <img
                                  src={filePreviews.fourthFile}
                                  alt="Fourth File Preview"
                                  style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover",
                                    marginLeft: "10px",
                                    border: "2px solid #ddd",
                                    borderRadius: "5px",
                                  }}
                                />

                                <button
                                  type="button"
                                  onClick={() => handleDelete("fourthFile")}
                                  style={{
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                    border: "none",
                                    background: "transparent",
                                    padding: 0,
                                    margin: 0,
                                    outline: "none",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "auto",
                                    height: "auto",
                                    verticalAlign: "middle", // Align with other inline elements
                                  }}
                                >
                                  <i
                                    className="icon-g-85"
                                    style={{
                                      color: "red",
                                      fontSize: "20px",
                                    }}
                                  ></i>
                                </button>
                              </>
                            )}
                          </div>
                          */}
                        </div>
                        <br />
                        <p
                          style={{
                            fontSize: "15px",
                            margin: "0",
                            fontWeight: "bold",
                          }}
                        >
                          *Për çdo produkt që ju publikoni dhe shitet nga dyqani
                          jonë, Lerei Music mban 30% të çmimit të produktit në
                          momentin kur kryhet shitja
                        </p>
                      </div>

                      <Row>
                        <Col xs="auto" className="mr-auto">
                          <div className="form-group">
                            <button
                              className="btn btn-border"
                              onClick={handleUpload}
                            >
                              RUANI PRODUKTIN
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
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Body style={{ fontWeight: "bold", fontSize: "1rem" }}>
              {modalMessage}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
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
