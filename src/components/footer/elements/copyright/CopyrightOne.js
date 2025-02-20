import PropTypes from "prop-types";
import Logo from "@components/logo";
import { Container } from "react-bootstrap";

const CopyrightOne = ({ className, logo, dark }) => {
  return (
    <div
      className={`tt-footer-custom ${className ? className : ""} ${
        dark ? "tt-color-scheme-04" : ""
      }`}
    >
      <Container>
        <div className="tt-row">
          <div className="tt-col-center">
            <div className="tt-col-item">
              <div className="tt-box-copyright ht-copy">
                &copy; Lerei Music Store {new Date().getFullYear()}. Developed
                by{" "}
                {/*
                <i className="text-danger icon-h-37" /> by{" "}
                */}
                <a
                  href="https://localseo.al"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LocalSEO.al
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

CopyrightOne.propTypes = {
  className: PropTypes.string,
  logo: PropTypes.string.isRequired,
};

export default CopyrightOne;
