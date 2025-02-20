import PropTypes from "prop-types";
import Account from "../elements/Account";
import Settings from "../elements/Settings";
import MiniCart from "../elements/MiniCart";
import { useState, Fragment, memo } from "react";
import SearchBox from "../elements/SearchBoxOne";

import Hamburger from "../elements/Hamburger";
const HeaderAction = ({
  hamburger,
  search,
  cart,
  account,
  settings,
  mobileNavbarHandler,
}) => {
  const [isHidden, setIsHidden] = useState({
    searchBox: true,
    miniCart: true,
    account: true,
    settings: true,
  });

  const [isSearchBoxHidden, setIsSearchBoxHidden] = useState(true);

  const onSearchBoxHandler = () => setIsSearchBoxHidden((prev) => !prev);

  const openHandler = (e) => {
    setIsHidden((prev) => {
      return {
        searchBox: true,
        account: true,
        settings: true,
        miniCart: true,
        [e.target.dataset.id]: !prev[e.target.dataset.id],
      };
    });
  };

  const closeHandler = (e) => {
    e.preventDefault();
    setIsHidden((prev) => {
      return {
        ...prev,
        [e.target.dataset.id]: !prev[e.target.dataset.id],
      };
    });
  };

  return (
    <Fragment>
      <div style={{ display: "flex", alignItems: "center" }}>
        {hamburger && (
          <Hamburger
            className="tt-mobile-parent-menu d-lg-none"
            mobileNavbarHandler={mobileNavbarHandler}
          />
        )}
        {/*search && (
          <SearchBox
            isHidden={isSearchBoxHidden}
            onHandler={onSearchBoxHandler}
            className="tt-desktop-parent-search"
          />
        )
        <img
          src="/assets/images/england-flag.png"
          className="tt-desktop-parent-cart"
          style={{
            width: "auto",
            height: "20px",
            borderRadius: "4px",
            border: "2px #c38e58 solid",
            marginLeft: "12px",
            marginRight: "12px",
          }}
        />*/}
        {cart && (
          <MiniCart
            isHidden={isHidden.miniCart}
            openHandler={openHandler}
            closeHandler={closeHandler}
            className="tt-desktop-parent-cart"
          />
        )}

        {account && (
          <Account
            isHidden={isHidden.account}
            openHandler={openHandler}
            closeHandler={closeHandler}
            className="tt-desktop-parent-account"
          />
        )}

        {settings && (
          <Settings
            isHidden={isHidden.settings}
            openHandler={openHandler}
            closeHandler={closeHandler}
            className="tt-desktop-parent-multi"
          />
        )}
      </div>
    </Fragment>
  );
};

HeaderAction.propTypes = {
  mobileNavbarHandler: PropTypes.func,
  hamburger: PropTypes.bool,
  hamburger: PropTypes.bool,
  search: PropTypes.bool,
  cart: PropTypes.bool,
  account: PropTypes.bool,
  settings: PropTypes.bool,
};

export default memo(HeaderAction);
