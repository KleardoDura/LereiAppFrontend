import Head from "next/head";
import { Fragment, useContext } from "react";
import Breadcrumb from "@components/ui/breadcrumb";
import { HeaderOne as Header } from "@components/header";
import { FooterOne as Footer } from "@components/footer";
import { WishlistContext } from "@global/WishlistContext";
import { HomePagesNavData as navContent } from "@data/navbar";
import { HomePagesNavData as adminNavContent } from "@data/navbar/admin-navbar";

import EmptyWishlist from "@components/wishlist/EmptyWishlist";
import WishlistProducts from "@components/wishlist/WishlistProducts";
import { ContentWrapperOne as ContentWrapper } from "@components/wrapper";
import { useMount } from "@hooks";
import axios from "axios";
import { useState, useEffect } from "react";
const WishlistPage = () => {
  const { wishlist } = useContext(WishlistContext);
  const logo = "/assets/images/no-placeholder/logo.png";
  const mounted = useMount();
  const [user, setUser] = useState({
    id: 0,
    userName: "",
  });
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/details`,
          { withCredentials: true }
        );
        if (response?.data) setUser(response.data);
      } catch (error) {}
    };

    checkAuthStatus();
  }, []);

  if (!mounted) return null;

  return (
    <Fragment>
      <Head>
        <title>Produktet e ruajtura</title>
        <meta
          name="description"
          content="Lerei music eshte nje dyqan ku shiten instrumenta te
                ndryshem muzikore"
        />
      </Head>

      <Header
        logo={logo}
        navbar={true}
        navData={user.id == 1 ? adminNavContent : navContent}
        navbarAlignment="left"
      />
      <ContentWrapper>
        <Breadcrumb />

        <div className="wishlist-page-content content-indent">
          {wishlist.length > 0 && <WishlistProducts />}
        </div>

        {wishlist.length === 0 && (
          <div className="empty-wishlist-wrapper">
            <EmptyWishlist />
          </div>
        )}
      </ContentWrapper>
      <Footer logo={logo} />
    </Fragment>
  );
};

export default WishlistPage;
