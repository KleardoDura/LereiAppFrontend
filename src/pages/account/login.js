import Head from "next/head";
import Link from "next/link";
import { Fragment, useState, useEffect } from "react";
import Breadcrumb from "@components/ui/breadcrumb";
import { Col, Container, Row, Modal, Button } from "react-bootstrap";
import { HeaderOne as Header } from "@components/header";
import { FooterOne as Footer } from "@components/footer";
import { HomePagesNavData as navContent } from "@data/navbar";
import { ContentWrapperOne as ContentWrapper } from "@components/wrapper";
import axios from "axios";
import { useRouter } from "next/router";

const LoginPage = () => {
  const logo = "/assets/images/no-placeholder/logo.png";
  const [loading, setLoading] = useState(true); //
  const router = useRouter();

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
      } catch (error) {
      } finally {
        setLoading(false); // Set loading to false once the check is complete
      }
    };

    checkAuthStatus();
  }, [router]);
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [userNameOrEmail, setUserNameOrEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false); // Close modal after 3 seconds
        setModalMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showModal]);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(userNameOrEmail)) {
      console.log("Email");
      setData((prevData) => ({
        ...prevData,
        email: userNameOrEmail,
        userName: null,
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        email: null,
        userName: userNameOrEmail,
      }));
    }
    console.log(userNameOrEmail);
  }, [userNameOrEmail]);

  const login = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
        data,
        {
          withCredentials: true,
          headers: {
            "Accept-Language": "sq",
          },
        }
      );
      router.push("/");
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
  if (loading) {
    return null; // Optionally return a loading spinner or nothing while checking
  }
  return (
    <Fragment>
      <Head>
        <title>Login</title>
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
            <h1 className="tt-title-subpages noborder">
              IDENTIFIKOHUNI NË PORTAL
            </h1>
            <div className="tt-login-form">
              <Row>
                <Col md={6}>
                  <div className="tt-item">
                    <h2 className="tt-title">PËRDORUES I RI</h2>
                    <p style={{ fontSize: "15px" }}>
                      Duke krijuar një llogari në dyqanin tonë, ju do të mund të
                      postoni artikujt që dëshironi te shisni, shpejt dhe
                      thjesht. Regjistrohuni në dyqanin tonë dhe me anë të kësaj
                      llogarie, do të keni mundësinë të postoni artikujt që
                      dëshironi të shisni, duke përfituar nga një sistem i
                      thjeshtë dhe efikas.
                    </p>
                    <div className="form-group">
                      <Link
                        href="/account/register"
                        className="btn btn-top btn-border"
                      >
                        KRIJONI NJË LLOGARI
                      </Link>
                    </div>
                  </div>
                </Col>

                <Col md={6}>
                  <div className="tt-item">
                    <h2 className="tt-title">KYÇUNI</h2>
                    <p style={{ fontSize: "15px" }}>
                      Nëse tashmë keni një llogari plotësoni fushat e mëposhtme
                    </p>
                    <div className="form-default form-top">
                      <form
                        id="customer_login"
                        method="post"
                        noValidate="novalidate"
                        onSubmit={login}
                      >
                        <div className="form-group">
                          <label htmlFor="loginUserName">
                            EMRI I PLOTË OSE E-MAIL *
                          </label>
                          <div className="tt-required">
                            * Fusha të detyrueshme
                          </div>
                          <input
                            type="text"
                            name="username"
                            id="loginUserName"
                            className="form-control"
                            value={userNameOrEmail}
                            onChange={(e) => setUserNameOrEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="loginPassword">FJALËKALIMI *</label>
                          <input
                            type="password"
                            name="password"
                            id="loginPassword"
                            className="form-control"
                            value={data.password}
                            onChange={(e) =>
                              setData({ ...data, password: e.target.value })
                            }
                            required
                          />
                        </div>
                        <Row>
                          <Col xs="auto" className="mr-auto">
                            <div className="form-group">
                              <button className="btn btn-border" type="submit">
                                KYÇUNI
                              </button>
                            </div>
                          </Col>
                          {/*
                          <Col xs="auto" className="align-self-center">
                            <div className="form-group">
                              <ul className="additional-links">
                                <li>
                                  <Link href="/account/register">
                                    Keni humbur fjalëkalimin?
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </Col>
                          */}
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
      </ContentWrapper>
      <Footer logo={logo} />
    </Fragment>
  );
};

export default LoginPage;
