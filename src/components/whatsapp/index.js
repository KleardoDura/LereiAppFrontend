import React from "react";

const WhatsappButton = ({ product }) => {
  const phoneNumber = "355685443400";
  const relativePath = product.id;
  const productUrl = "https://lereimusic.com/product/" + relativePath;
  const message = `Pershendetje, jam i interesuar per produktin: ${productUrl} `;
  const encodedMessage = encodeURIComponent(message);

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodedMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex",
        alignItems: "center",
        color: "inherit",
        textDecoration: "none",
      }}
    >
      <img
        src="/assets/images/svg/whatsapp2.svg"
        alt="WhatsApp"
        style={{
          width: "30px",
          height: "30px",
          marginRight: "10px",
        }}
      />
      <span>Chat On WhatsApp</span>
    </a>
  );
};

export default WhatsappButton;
