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
import { HomePagesNavData as adminNavContent } from "@data/navbar/admin-navbar";
import { ContentWrapperOne as ContentWrapper } from "@components/wrapper";
import axios from "axios";
const ChangePassword = () => {
  const [password, setPassword] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [userId, setUserId] = useState(0);
  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPassword((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const logo = "/assets/images/no-placeholder/logo.png";
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/details`,
          { withCredentials: true } // Ensure cookies are sent
        );
        if (response.status === 200) {
          setUserId(response.data.id);
          router.push("/account/change-password");
        }
      } catch (error) {}
    };

    checkAuthStatus();
  }, []);

  const [passwordErrors, setPasswordErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [gotoLogin, setGotoLogin] = useState(false);

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
        setShowModal(false); // Close modal after 3 seconds
        if (gotoLogin) router.push("/account/user-details");
        setModalMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showModal]);

  const changePassword = async (event) => {
    event.preventDefault();
    if (validatePassword()) {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/update-password`,
          {
            password: password.password,
            newPassword: password.newPassword,
          },
          {
            withCredentials: true,
            headers: {
              "Accept-Language": "sq",
            },
          }
        );
        console.log(res);

        if (res?.data && typeof res.data === "string")
          setModalMessage(res.data);
        else
          setModalMessage(
            "System error! Please contact the system administrator."
          );
        setGotoLogin(true);
        setShowModal(true);
      } catch (err) {
        console.log(err);
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
        <title>Change Password</title>
      </Head>

      <Header
        logo={logo}
        navbar={true}
        navData={userId == 1 ? adminNavContent : navContent}
        navbarAlignment="left"
      />
      <ContentWrapper>
        <Breadcrumb />

        <div className="container-indent">
          <Container>
            <h1 className="tt-title-subpages noborder">
              NDRYSHONI FJALËKALIMIN
            </h1>
            <div className="tt-login-form">
              <Row className="justify-content-center">
                <Col md={8} lg={6}>
                  <div className="tt-item">
                    <h2 className="tt-title">
                      JU LUTEM PLOTËSONI FUSHAT E MËPOSHTME
                    </h2>
                    <div className="form-default">
                      <form onSubmit={changePassword} noValidate>
                        <div className="form-group">
                          <label htmlFor="loginPhoneNo">
                            FJALËKALIMI AKTUAL *
                          </label>
                          <input
                            type="password"
                            name="password"
                            id="loginInputPassword"
                            className="form-control"
                            value={password.password}
                            onChange={handlePasswordChange}
                            required
                          />
                          {passwordErrors.password && (
                            <div style={{ color: "red" }}>
                              {passwordErrors.password}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="loginPhoneNo">
                            FJALËKALIMI I RI *
                          </label>
                          <input
                            type="password"
                            name="newPassword"
                            id="newPassword"
                            className="form-control"
                            value={password.newPassword}
                            onChange={handlePasswordChange}
                            required
                          />
                          {passwordErrors.newPassword && (
                            <div style={{ color: "red" }}>
                              {passwordErrors.newPassword}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="loginPhoneNo">
                            KONFIRMONI FJALËKALIMIN E RI *
                          </label>
                          <input
                            type="password"
                            name="confirmNewPassword"
                            id="confirmNewPassword"
                            className="form-control"
                            value={password.confirmNewPassword}
                            onChange={handlePasswordChange}
                            required
                          />
                          {passwordErrors.confirmNewPassword && (
                            <div style={{ color: "red" }}>
                              {passwordErrors.confirmNewPassword}
                            </div>
                          )}
                        </div>

                        <Row>
                          <Col xs="auto">
                            <div className="form-group">
                              <button className="btn btn-border" type="submit">
                                NDRYSHONI FJALËKALIMIN
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

export default ChangePassword;
