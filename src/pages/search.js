import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Breadcrumb from "@components/ui/breadcrumb";
import ShopGrid from "@components/shop/ShopGrid";
import { HeaderOne as Header } from "@components/header";
import { FooterOne as Footer } from "@components/footer";
import { HomePagesNavData as navContent } from "@data/navbar";
import { ContentWrapperOne as ContentWrapper } from "@components/wrapper";

const PageSearch = () => {
  const logo = "/assets/images/no-placeholder/logo.png";
  const router = useRouter();
  const { q } = router.query;
  const products = [];

  return (
    <Fragment>
      <Head>
        <meta
          name="description"
          content="Lerei music eshte nje dyqan ku shiten instrumenta te
                ndryshem muzikore"
        />
      </Head>

      <Header
        logo={logo}
        navbar={true}
        navData={navContent}
        navbarAlignment="left"
      />
      <ContentWrapper>
        <Breadcrumb />

        {/*<ShopGrid sidebar={false} containerFluid={false} products={products} />*/}
      </ContentWrapper>
      <Footer logo={logo} newsletter={true} />
    </Fragment>
  );
};

export default PageSearch;
