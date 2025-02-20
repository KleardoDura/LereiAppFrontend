import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@global/CartContext";
import { getCartTotalPrice, getCartTotalQuantity } from "@utils/product";
import { useMount } from "@hooks";

const MiniCart = ({ className, isHidden, openHandler, closeHandler }) => {
  const { shoppingCart, removeProduct } = useContext(CartContext);
  const totalCartItems = getCartTotalQuantity(shoppingCart);
  const mounted = useMount();
  if (!mounted) return null;
  /*
 {
    "id": 3,
    "iconClass": "icon-n-072",
    "text": "Wishlist",
    "link": "/wishlist"
  }
*/

  return (
    <div className={`tt-parent-box ${className}`}>
      <div className={`tt-cart tt-dropdown-obj ${!isHidden ? "active" : null}`}>
        <Link href="/wishlist">
          <button
            className="tt-dropdown-toggle"
            data-id="miniCart"
            onMouseEnter={openHandler}
            onMouseLeave={closeHandler}
          >
            <i className="icon-n-072" />
          </button>{" "}
        </Link>
        <div className="tt-dropdown-menu">
          <div className="tt-dropdown-inner">
            <div className="tt-cart-layout">
              <span className="tt-cart-empty">
                <p style={{ fontWeight: "bold", fontSize: "16px" }}>
                  Produktet e ruajtura
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniCart;
