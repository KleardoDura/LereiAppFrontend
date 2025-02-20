import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const logo = "/assets/images/no-placeholder/logo.png";

const GuitarCourse = () => {
  return (
    <div className="container-indent">
      <Container>
        <div className="tt-login-form">
          <Row>
            <Col md={7}>
              <div className="tt-item" style={{ padding: "0", margin: "0" }}>
                <h2
                  className="tt-title"
                  style={{
                    fontSize: "28px",
                    marginLeft: "20px",
                    marginTop: "20px",
                  }}
                >
                  KURSE KITARE
                </h2>
                <p
                  style={{
                    fontSize: "17px",
                    margin: "0",
                    marginLeft: "20px",
                    marginRight: "20px",
                  }}
                >
                  Lerei Music ofron kurse kitare për të gjitha grupmoshat, si
                  për fillestarë ashtu edhe për të avancuar!
                  <br />
                  <br /> Për kurse kitare na kontaktoni në numrin:
                  <br />
                  <span style={{ fontWeight: "bold", margin: "0" }}>
                    +355 68 254 2945
                  </span>
                </p>
                <br />
                <div
                  style={{
                    marginTop: "20px",
                    marginLeft: "0",
                    marginBottom: "20px",
                  }}
                >
                  <img
                    src={logo}
                    alt="Logo"
                    style={{
                      width: "40%",
                      height: "auto",
                      display: "block",
                      margin: "0 auto",
                    }}
                  />
                </div>
              </div>
            </Col>

            <Col md={3}>
              <div className="tt-item" style={styles.photo}>
                <img
                  src="/assets/images/kurse.jpg"
                  alt="Guitar course"
                  style={styles.image}
                />
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

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
export default GuitarCourse;
