import Head from "next/head";
import { Fragment, useContext } from "react";
import Breadcrumb from "@components/ui/breadcrumb";
import SearchProduct from "@components/ui/searchproduct";
import ShopGrid from "@components/shop-search/ShopGrid";
import { HeaderOne as Header } from "@components/header";
import { FooterOne as Footer } from "@components/footer";
import { HomePagesNavData as navContent } from "@data/navbar";
import { ContentWrapperOne as ContentWrapper } from "@components/wrapper";
import { react, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
const PageShop = () => {
  //const { products } = useContext(ProductsContext);
  const logo = "/assets/images/no-placeholder/logo.png";
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (router.query.title) {
      setTitle(router.query.title);
    }
  }, [router.query.title]);

  const [selectedSortValue, setSelectedSortValue] = useState("default");

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (title) {
        const getPosts = async () => {
          try {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_BASE_URL}/search`,
              { title: title },
              { withCredentials: true }
            );
            setProducts(response.data);
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          }
        };
        getPosts();
      }
    }, 300); // 300ms delay

    return () => clearTimeout(debounceTimer);
  }, [title, selectedSortValue]);

  if (loading) {
    return <p>Loading...</p>;
  }
  const handleSortByChange = (value) => {
    setSelectedSortValue(value);
  };
  return (
    <Fragment>
      <Head>
        <title>Shop</title>
        <meta
          name="description"
          content="Lereimusic eshte nje dyqan ku shiten instrumenta te ndryshem muzikore"
        />
      </Head>

      <Header
        logo={logo}
        navbar={true}
        navData={navContent}
        navbarAlignment="left"
      />

      <ContentWrapper>
        <SearchProduct />

        <ShopGrid
          pageTitle={"Rezultatet e kerkimit per '" + title + "'"}
          handleSortByChange={handleSortByChange}
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
