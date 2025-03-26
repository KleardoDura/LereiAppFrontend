import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { Fragment } from "react";
import { useState, useEffect } from "react";
import Breadcrumb from "@components/ui/breadcrumb";
import { Col, Container, Row, Modal, Button } from "react-bootstrap";
import { HeaderOne as Header } from "@components/header";
import { FooterOne as Footer } from "@components/footer";
import { HomePagesNavData as navContent } from "@data/navbar";
import { ContentWrapperOne as ContentWrapper } from "@components/wrapper";
import axios from "axios";
const RegisterPage = () => {
  const logo = "/assets/images/no-placeholder/logo.png";
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/status`,
          { withCredentials: true } // Ensure cookies are sent
        );
        if (response.status === 200) {
          router.push("/account/user-details");
        }
      } catch (error) {}
    };

    checkAuthStatus();
  }, []);
  const [data, setData] = useState({
    userName: "",
    email: "",
    phoneNo: "",
    password: "",
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

    const phoneRegex = /^\+?[0-9]+$/;
    if (!phoneRegex.test(data.phoneNo)) {
      newErrors.phoneNo = "Numri i telefonit duhet të përmbajë vetëm numra";
    }

    // Password validation
    if (data.password.length < 8) {
      newErrors.password = "Fjalëkalimi duhet të ketë 8 ose më shumë karaktere";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const router = useRouter();
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false); // Close modal after 3 seconds
        if (gotoLogin) router.push("/account/login");
        setModalMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showModal]);

  const register = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register-without-verification-code`,
          data,
          {
            withCredentials: true,
            headers: {
              "Accept-Language": "sq",
            },
          }
        );
        if (res?.data && typeof res.data === "string")
          setModalMessage(res.data);
        else
          setModalMessage(
            "System error! Please contact the system administrator."
          );
        setGotoLogin(true);
        setShowModal(true);
      } catch (err) {
        if (err?.response?.data && typeof err.response.data === "string")
          setModalMessage(err.response.data);
        else
          setModalMessage(
            "System error! Please contact the system administrator."
          );
        setGotoLogin(false);
        setShowModal(true);
      }
    }
  };
  return (
    <Fragment>
      <Head>
        <title>Register </title>
      </Head>

      <Header
        logo={logo}
        navbar={true}
        navData={navContent}
        navbarAlignment="left"
      />
      <ContentWrapper>
        <Breadcrumb />

        <div className="container-indent">
          <Container>
            <h1 className="tt-title-subpages noborder">KRIJONI NJË LLOGARI</h1>
            <div className="tt-login-form">
              <Row className="justify-content-center">
                <Col md={8} lg={6}>
                  <div className="tt-item">
                    <h2 className="tt-title">
                      JU LUTEM PLOTËSONI FUSHAT E MËPOSHTME
                    </h2>
                    <div className="form-default">
                      <form onSubmit={register} noValidate>
                        <div className="form-group">
                          <label htmlFor="loginInputName">EMRI I PLOTË *</label>
                          <input
                            type="text"
                            name="userName"
                            id="loginInputName"
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
                            id="loginInputEmail"
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
                            id="loginPhoneNo"
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

                        <div className="form-group">
                          <label htmlFor="loginInputPassword">
                            FJALËKALIMI *
                          </label>
                          <input
                            type="password"
                            name="password"
                            id="loginInputPassword"
                            className="form-control"
                            value={data.password}
                            onChange={handleChange}
                            required
                          />
                          {errors.password && (
                            <div style={{ color: "red" }}>
                              {errors.password}
                            </div>
                          )}
                        </div>

                        <Row>
                          <Col xs="auto">
                            <div className="form-group">
                              <button className="btn btn-border" type="submit">
                                REGJISTROHU
                              </button>
                            </div>
                          </Col>
                          <Col xs="auto" className="align-self-center">
                            <div className="form-group">
                              <ul className="additional-links">
                                <li>
                                  <Link href="/account/login">
                                    Keni nje llogari? Kyçuni
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
                {gotoLogin ? (
                  <Link href="/account/login">
                    <Button
                      variant="secondary"
                      onClick={() => setShowModal(false)}
                    >
                      OK
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="secondary"
                    onClick={() => setShowModal(false)}
                  >
                    OK
                  </Button>
                )}
              </Modal.Footer>
            </Modal>
          </Container>
        </div>
      </ContentWrapper>
      <Footer logo={logo} />
    </Fragment>
  );
};

export default RegisterPage;
