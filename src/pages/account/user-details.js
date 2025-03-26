import Head from "next/head";
import Link from "next/link";
import { Fragment, useState, useEffect } from "react";
import Breadcrumb from "@components/ui/breadcrumb";
import { Col, Container, Row, Modal, Button } from "react-bootstrap";
import { HeaderOne as Header } from "@components/header";
import { FooterOne as Footer } from "@components/footer";
import { HomePagesNavData as navContent } from "@data/navbar";

import { HomePagesNavData as adminNavContent } from "@data/navbar/admin-navbar";
import { ContentWrapperOne as ContentWrapper } from "@components/wrapper";
import axios from "axios";
import { useRouter } from "next/router";
import { MyProduct as Product } from "@components/product";
import { EmptyProducts } from "@components/products";

const UserDetails = () => {
  const logo = "/assets/images/no-placeholder/logo.png";
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    id: 0,
    userName: "",
    email: "",
    phoneNo: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [gotoLogin, setGotoLogin] = useState(false);
  const [posts, setPosts] = useState([]);
  const validateForm = () => {
    const newErrors = {};

    // Check if name is provided
    if (!data.userName.trim()) {
      newErrors.userName = "Emri nuk mund të jetë bosh";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      newErrors.email = "Ju lutemi vendosni një e-mail të vlefshëm";
    }

    // Phone number validation
    const phoneRegex = /^\+?[0-9]+$/;
    if (!phoneRegex.test(data.phoneNo)) {
      newErrors.phoneNo = "Numri i telefonit duhet të përmbajë vetëm numra";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors = {};
    if (password.password.length < 8) {
      newErrors.password = "Fjalëkalimi duhet të ketë 8 ose më shumë karaktere";
    }
    if (password.newPassword.length < 8) {
      newErrors.newPassword =
        "Fjalëkalimi duhet të ketë 8 ose më shumë karaktere";
    }
    if (password.newPassword != password.confirmNewPassword) {
      newErrors.confirmNewPassword = "Fjalëkalimet nuk perputhen";
    }
    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const router = useRouter();
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
        if (gotoLogin) router.push("/account/login");
        setModalMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showModal]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/details`,
          { withCredentials: true }
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
        router.push("/account/login");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);
  //vazhdo punen me update-in
  const save = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/update`,
          data,
          {
            withCredentials: true,
            headers: {
              "Accept-Language": "sq",
            },
          }
        );
        if (res?.data && typeof res.data === "string")
          setModalMessage(
            "Te dhenat ndryshuan me sukses, ju lutem hyni dhe njehere ne sistem"
          );
        else
          setModalMessage(
            "System error! Please contact the system administrator."
          );
        setGotoLogin(true);
        setShowModal(true);
      } catch (error) {
        console.log(error);
        router.push("/account/login");
      }
    }
  };

  const logout = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`,
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
    router.push("/account/login");
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/get-all-my-posts`,
          { withCredentials: true }
        );
        setPosts(response.data);
      } catch (error) {
        console.log(error);
        router.push("/account/login");
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <Fragment>
      <Head>
        <title>User Details</title>
      </Head>

      <Header
        logo={logo}
        navbar={true}
        navData={data.id == 1 ? adminNavContent : navContent}
        navbarAlignment="left"
      />
      <ContentWrapper>
        <Breadcrumb />
        <div className="container-indent">
          <Container>
            <h1 className="tt-title-subpages noborder">LLOGARIA JUAJ</h1>

            <div className="tt-login-form">
              <Row className="justify-content-center">
                <Col md={3} lg={3} style={{ height: "600px" }}>
                  <div className="tt-item">
                    <h2 className="tt-title">PËRDITËSONI TË DHËNAT TUAJA</h2>
                    <div className="form-default">
                      <form noValidate>
                        <div className="form-group">
                          <label htmlFor="loginInputName">EMRI I PLOTË *</label>
                          <input
                            type="text"
                            name="userName"
                            id="userName"
                            className="form-control"
                            value={data.userName}
                            onChange={handleChange}
                            required
                            maxLength="70"
                          />
                          {errors.userName && (
                            <div style={{ color: "red" }}>
                              {errors.userName}
                            </div>
                          )}
                        </div>

                        <div className="form-group">
                          <label htmlFor="loginInputEmail">E-MAIL *</label>
                          <input
                            type="text"
                            name="email"
                            id="email"
                            className="form-control"
                            value={data.email}
                            onChange={handleChange}
                            required
                            maxLength="70"
                          />
                          {errors.email && (
                            <div style={{ color: "red" }}>{errors.email}</div>
                          )}
                        </div>

                        <div className="form-group">
                          <label htmlFor="loginPhoneNo">
                            NUMRI I TELEFONIT *
                          </label>
                          <input
                            type="text"
                            name="phoneNo"
                            id="phoneNo"
                            className="form-control"
                            value={data.phoneNo}
                            onChange={handleChange}
                            required
                            maxLength="25"
                          />
                          {errors.phoneNo && (
                            <div style={{ color: "red" }}>{errors.phoneNo}</div>
                          )}
                        </div>

                        <Row>
                          <Col xs="auto">
                            <div className="form-group">
                              <button
                                className="btn btn-border"
                                onClick={(event) => save(event)} // Pass event here
                              >
                                RUAJ
                              </button>
                            </div>
                          </Col>
                          <Col xs="auto" className="align-self-center">
                            <div className="form-group">
                              <ul className="additional-links">
                                <li>
                                  <Link href="/account/change-password">
                                    Ndryshoni fjalëkalimin
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </Col>
                        </Row>
                      </form>
                    </div>
                  </div>
                </Col>
                <Col md={9}>
                  <div className="tt-item">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <h2 className="tt-title">PRODUKTET TUAJA</h2>
                      <button
                        style={{
                          backgroundColor: "#c38e58", // Blue background
                          color: "#fff", // White text
                          border: "none", // No border
                          padding: "10px 20px", // Padding inside the button
                          fontSize: "16px", // Font size
                          fontWeight: "bold", // Bold text
                          borderRadius: "5px", // Rounded corners
                          cursor: "pointer", // Pointer cursor on hover
                          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
                          transition: "background-color 0.3s ease", // Smooth transition
                          marginBottom: "20px",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#c9a07e")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "#c38e58")
                        }
                        onClick={logout}
                      >
                        Dilni nga llogaria
                      </button>
                    </div>
                    <Row className={`tt-layout-product-item`}>
                      {posts.length === 0 ? (
                        // Render this if `posts.length` is 0
                        <EmptyProducts />
                      ) : (
                        // Render this if `posts.length` is not 0
                        posts.map((product) => (
                          <Col key={product.id} sm={6} md={4} lg={3}>
                            <Product
                              page="home"
                              product={product}
                              showVariant={true}
                            />
                          </Col>
                        ))
                      )}
                    </Row>
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
      </ContentWrapper>
      <Footer logo={logo} />
    </Fragment>
  );
};
export default UserDetails;
