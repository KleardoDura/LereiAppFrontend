import Head from "next/head";
import { Fragment, useContext } from "react";
import Breadcrumb from "@components/ui/breadcrumb";
import ShopGrid from "@components/shop-admin/ShopGrid";
import { HeaderOne as Header } from "@components/header";
import { FooterOne as Footer } from "@components/footer";
import { HomePagesNavData as adminNavContent } from "@data/navbar/admin-navbar";

import { ContentWrapperOne as ContentWrapper } from "@components/wrapper";
import { react, useEffect, useState } from "react";
import axios from "axios";
const PageShop = () => {
  //const { products } = useContext(ProductsContext);
  const logo = "/assets/images/no-placeholder/logo.png";
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/get-all-my-posts`,
          { withCredentials: true }
        );
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, []);
  return (
    <Fragment>
      <Head>
        <title>Shop</title>
        <meta name="description" />
      </Head>

      <Header
        logo={logo}
        navbar={true}
        navData={adminNavContent}
        navbarAlignment="left"
      />

      <ContentWrapper>
        <Breadcrumb />

        <ShopGrid
          products={products}
          sidebar={true}
          sidebarPosition="left"
          containerFluid={false}
        />
      </ContentWrapper>

      <Footer logo={logo} />
    </Fragment>
  );
};

export default PageShop;
/*
  {
      id: 24,
      title: "Piano",
      categoryId: 1,
      description: "",
      phoneNo: "0685443400",
      email: "lereimusic@gmail.com",
      publishedDate: "2024-12-29T21:54:10.000+00:00",
      lastEditDate: null,
      price: 300,
      currency: "EUR",
      userId: 1,
      views: null,
      isPreOrder: true,
      status: null,
      mainPhotoPath: "/files/F4/24/24.jpg",
      firstPhotoPath: null,
      secondPhotoPath: "/files/F4/24/24.2.jpg",
      thirdPhotoPath: null,
      fourthPhotoPath: null,
      vendor: "Lerei",
      //
      name: "Bateri6",
      badge: null,
      categories: [3],
      thumbs: [
        "/assets/images/product/instrumente-membranofon/8/main2.jpg",
        "/assets/images/product/instrumente-membranofon/8/main1.jpg",
      ],
      previewImages: [
        "/assets/images/product/instrumente-membranofon/8/main1.jpg",
        "/assets/images/product/instrumente-membranofon/8/main2.jpg",
        "/assets/images/product/instrumente-membranofon/8/main3.jpg",
        "/assets/images/product/instrumente-membranofon/8/main4.jpg",
      ],
      excerpt:
        "Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      description:
        "Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
    }*/
