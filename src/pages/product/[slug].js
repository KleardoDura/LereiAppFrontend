import Head from "next/head";
import { Fragment } from "react";
import Breadcrumb from "@components/ui/breadcrumb";
import { FooterOne as Footer } from "@components/footer";
import { HeaderOne as Header } from "@components/header";
import ProductDetails from "@components/product-details";
import { HomePagesNavData as navContent } from "@data/navbar";
import { ContentWrapperOne as ContentWrapper } from "@components/wrapper";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";

const PageProductDetails = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const logo = "/assets/images/no-placeholder/logo.png";

  useEffect(() => {
    if (slug) {
      const getPost = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/get-post-by-id/${slug}`,
            { withCredentials: true }
          );

          if (response?.data) {
            setProduct(response.data);
          } else {
            router.replace("/404"); // Use `replace` to avoid keeping `/404` in the history stack
          }
        } catch (error) {
          console.error("Error fetching product:", error);
          router.replace("/404");
        } finally {
          setLoading(false);
        }
      };
      getPost();
    }
  }, [slug]);

  // Show loading indicator during data fetching
  if (loading) {
    return <p>Loading...</p>;
  }

  // Avoid rendering if product is null to prevent accessing its properties
  if (!product) {
    return null;
  }

  return (
    <Fragment>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={product.description} />
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

        <ProductDetails product={product} />

        {/* Additional components */}
      </ContentWrapper>
      <Footer logo={logo} />
    </Fragment>
  );
};

export default PageProductDetails;
