import PropTypes from "prop-types";

const ProductThumb = ({ thumbs, productName, className }) => {
  return thumbs.map((thumb, i) => (
    <div
      key={i}
      className={`tt-img${i === 1 ? "-roll-over" : " "} ${
        className ? className : ""
      }`}
    >
      {" "}
      <div>
        <div
          style={{
            width: "100%", // or another relative unit like "50%"
            aspectRatio: "1 / 1",
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <img
            src={thumb}
            alt={productName}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </div>
  ));
};

ProductThumb.propTypes = {
  thumbs: PropTypes.array.isRequired,
  productName: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ProductThumb;
