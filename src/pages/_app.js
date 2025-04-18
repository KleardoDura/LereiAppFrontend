import { memo } from "react";
import { Fragment } from "react";
import Head from "next/head";
import CartContextProvider from "@global/CartContext";
import CompareContextProvider from "@global/CompareContext";
import ProductsContextProvider from "@global/ProductsContext";
import WishlistContextProvider from "@global/WishlistContext";
import "react-tippy/dist/tippy.css";
import "@assets/scss/style.scss";

const Wokiee = memo(({ Component, pageProps }) => {
  return (
    <Fragment>
      <Head>
        <title>Lerei</title>
      </Head>

      <CartContextProvider>
        <CompareContextProvider>
          <WishlistContextProvider>
            <ProductsContextProvider>
              <Component {...pageProps} />
            </ProductsContextProvider>
          </WishlistContextProvider>
        </CompareContextProvider>
      </CartContextProvider>
    </Fragment>
  );
});

export default Wokiee;
