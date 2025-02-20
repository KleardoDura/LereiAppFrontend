import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";
import { animateScroll as scroll } from "react-scroll";
import { useState, useEffect, useRef } from "react";
import Breadcrumb from "@components/ui/breadcrumb";
import { Col, Container, Row, Modal, Button } from "react-bootstrap";
import { HeaderOne as Header } from "@components/header";
import { FooterOne as Footer } from "@components/footer";
import { HomePagesNavData as navContent } from "@data/navbar";

import { HomePagesNavData as adminNavContent } from "@data/navbar/admin-navbar";
import { ContentWrapperOne as ContentWrapper } from "@components/wrapper";
import axios from "axios";
import { useRouter } from "next/router";

const AddProduct = () => {
  const router = useRouter();
  const logo = "/assets/images/no-placeholder/logo.png";
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
  useEffect(() => {
    if (isUserLoggedIn && user.email && user.phoneNo && user.userName) {
      setPost((prevPost) => ({
        ...prevPost,
        email: user.email,
        vendor: user.userName,
        phoneNo: user.phoneNo,
      }));
    }
  }, [user, isUserLoggedIn]);
  const [post, setPost] = useState({
    title: "",
    price: "",
    currency: "Lekë",
    email: user.email,
    vendor: user.userName,
    phoneNo: user.phoneNo,
    categoryId: 1,
    description: "",
    isPreOrder: false,
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
    console.log(post);
  };
  const [files, setFiles] = useState({
    mainFile: null,
    firstFile: null,
    secondFile: null,
    thirdFile: null,
    fourthFile: null,
  });
  const [filePreviews, setFilePreviews] = useState({
    mainFile: null,
    firstFile: null,
    secondFile: null,
    thirdFile: null,
    fourthFile: null,
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
  const handleDelete = (fieldName) => {
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
      scrollToFirstError();
      return;
    }
    post.price = parseInt(post.price);

    const formData = new FormData();
    Object.entries(files).forEach(([key, file]) => {
      if (file) {
        formData.append(key, file);
      }
    });

    formData.append(
      "post",
      new Blob([JSON.stringify(post)], { type: "application/json" })
    );
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/uploadPost`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Indicate form-data for file uploads
            "Accept-Language": "sq",
          },
          withCredentials: true,
        }
      );

      console.log(response);

      if (response?.data && typeof response.data === "string") {
        setSuccess(true);
        setModalMessage(response.data);
      } else
        setModalMessage(
          "System error! Please contact the system administrator."
        );
      setShowModal(true);
    } catch (err) {
      console.log(err);
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
    if (post.title.trim() && post.title.trim().length > 20) {
      newErrors.title =
        "Emri i produktit nuk mund të jetë i gjatë më shumë se 20 karaktere";
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
  /*
  const IMAGE_MIME_TYPES = new Set([
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/tiff",
    "image/webp",
    "image/heif",
    "image/heic",
  ]); 
  //Nuk e kam testuar... skip validimit te file ne frontend

  function isValidImage(file) {
    if (!file || !file.type) {
      //console.error("Skedari " + file.name + " nuk eshte imazh");
      //setModalMessage("Skedari " + file.name + " nuk eshte imazh");
      return false;
    }
    console.log(file.type);
    return IMAGE_MIME_TYPES.has(file.type);
  }
*/
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false); // Close modal after 3 seconds
        //if (gotoLogin) router.push("/account/login");
        if (success) router.push("/account/user-details");
        setModalMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    } else if (success) router.push("/account/user-details");
  }, [showModal]);
  return (
    <Fragment>
      <Head>
        <title>Add Product</title>
      </Head>

      <Header
        logo={logo}
        navbar={true}
        navData={isUserLoggedIn && user.id == 1 ? adminNavContent : navContent}
        navbarAlignment="left"
      />

      <ContentWrapper>
        <Breadcrumb />

        <div className="container-indent">
          {isUserLoggedIn ? (
            <Container>
              <h1 className="tt-title-subpages noborder">SHTONI PRODUKT</h1>
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
                              maxLength="20"
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
                            <label htmlFor="loginUserName">
                              EMRI I SHITËSIT *
                            </label>
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
                              <div style={{ color: "red" }}>
                                {errors.vendor}
                              </div>
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
                              <div style={{ color: "red" }}>
                                {errors.phoneNo}
                              </div>
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
                              <option value="8">Aksesore kitare</option>
                              <option value="9">Te tjera</option>
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
                              maxLength="700"
                              required
                              rows="4"
                              cols="20" // This ensures each line can only fit 25 characters
                              value={post.description}
                              onChange={handleChange}
                            ></textarea>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="tt-item">
                      <h2 className="tt-title">SHTONI FOTO</h2>
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
                              MUND TË SHTONI DHE KATËR FOTO TË TJERAA
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
                            </div>
                            <br />
                            <p
                              style={{
                                fontSize: "15px",
                                margin: "0",
                                fontWeight: "bold",
                              }}
                            >
                              *Për çdo produkt që ju publikoni dhe shitet nga
                              dyqani jonë, Lerei Music mban 30% të çmimit të
                              produktit në momentin kur kryhet shitja
                            </p>
                          </div>

                          <Row>
                            <Col xs="auto" className="mr-auto">
                              <div className="form-group">
                                <button
                                  className="btn btn-border"
                                  onClick={handleUpload}
                                >
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
                  <Button
                    variant="secondary"
                    onClick={() => setShowModal(false)}
                  >
                    OK
                  </Button>
                </Modal.Footer>
              </Modal>
            </Container>
          ) : (
            <Container>
              <h1 className="tt-title-subpages noborder">KRIJONI NJOFTIM</h1>
              <div className="tt-login-form">
                <Row>
                  <Col md={7}>
                    <div
                      className="tt-item"
                      style={{ padding: "0", margin: "0" }}
                    >
                      <h2
                        className="tt-title"
                        style={{
                          marginLeft: "20px",
                          marginTop: "30px",
                        }}
                      >
                        SI FUNKSIONON?
                      </h2>
                      <p
                        style={{
                          fontSize: "17px",
                          margin: "0",
                          marginLeft: "20px",
                          marginRight: "20px",
                        }}
                      >
                        Për çdo produkt që ju publikoni dhe shitet nga dyqanin
                        jonë, Lerei Music mban 30% të çmimit të produktit në
                        momentin kur kryhet shitja.
                        <br />
                        <br /> Si fillim hyni në llogarinë tuaj
                        <br />
                      </p>
                      <Row>
                        <Col xs="auto">
                          <div className="form-group">
                            <Link href="/account/login">
                              <button
                                className="btn btn-border"
                                style={{
                                  marginTop: "20px",
                                  marginLeft: "20px",
                                  marginBottom: "20px",
                                }}
                              >
                                IDENTIFIKOHUNI NË PORTAL
                              </button>
                            </Link>
                          </div>
                        </Col>
                      </Row>
                      <br />

                      <div
                        style={{
                          marginTop: "30px",
                          marginLeft: "0",
                          marginBottom: "20px",
                        }}
                      >
                        <img
                          src={logo}
                          alt="Logo"
                          style={{
                            width: "30%",
                            height: "auto",
                            display: "block",
                            margin: "0 auto",
                          }}
                        />
                      </div>
                    </div>
                  </Col>

                  <Col md={4}>
                    <div className="tt-item" style={styles.photo}>
                      <img
                        src="/assets/images/2_guitars.jpg"
                        alt="Guitar course"
                        style={styles.image}
                      />
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
                  <Button
                    variant="secondary"
                    onClick={() => setShowModal(false)}
                  >
                    OK
                  </Button>
                </Modal.Footer>
              </Modal>
            </Container>
          )}
        </div>
      </ContentWrapper>
      <Footer logo={logo} />
    </Fragment>
  );
};

export default AddProduct;

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
  },
  details: {
    flex: 1,
    marginRight: "20px",
  },
  photo: {
    width: "100%", // Ensures the div takes the full width of the Col
    height: "0", // Initial height
    paddingBottom: "100%",
    position: "relative",
    overflow: "hidden",
    border: "1px solid #ddd",
  },
  image: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    objectFit: "cover", // Ensures the image covers the div without stretching
  },
};
