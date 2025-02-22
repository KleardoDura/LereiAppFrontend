//import { memo } from "react";
import Head from "next/head";
import { getBlogPosts } from "@utils/blog";
//import LatestBlog from "@components/blog";
import { Fragment, memo, useContext } from "react";
import sliderData from "@data/slider/home-one.json";
import { HeaderOne as Header } from "@components/header";
import { SliderFive as Slider } from "@components/slider";
import { FooterOne as Footer } from "@components/footer";
import { HomePagesNavData as navContent } from "@data/navbar";
import { HomePagesNavData as adminNavContent } from "@data/navbar/admin-navbar";

//import { ServicesOne as Services } from "@components/services";
import { CategoriesOne as Categories } from "@components/categories";
import { ContentWrapperOne as ContentWrapper } from "@components/wrapper";
//import { PromoBannerOne as PromoBanners } from "@components/promo-banners";
//import { BestSelling, TendingProducts as Tending } from "@components/products";
import GuitarCourse from "@components/guitar-course";
import { useState, useEffect } from "react";
import axios from "axios";
const Home = ({ blogs }) => {
  const logo = "/assets/images/no-placeholder/logo.png";
  {
    /*
  const phoneNumber = "355693449380";
  // product.name.toLowerCase().split(" ").join("-")
  const productUrl = "http://localhost:3000/product/";
  const productName = "Awesome Product";
  const message = `I'm interested in your ${productName}. Check it out here: ${productUrl}`;
  const encodedMessage = encodeURIComponent(message);

    <button>
        <a
          href={`https://wa.me/${phoneNumber}?text=${encodedMessage}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
      </button>
    */
  }

  const [user, setUser] = useState({
    id: 0,
    userName: "",
    email: "",
    phoneNo: "",
    password: "",
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
  return (
    <Fragment>
      <Head>
        <title>Lerei Music</title>
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
        <Slider
          dots={true}
          arrows={true}
          data={sliderData}
          className="nomargin"
        />
        <Categories />
        <GuitarCourse />

        {/*
        <BestSelling products={latesProducts} />
                <Tending products={productsFashion} />

        <PromoBanners />
        <BestSelling products={productsFashion} />
        <LatestBlog blogs={blogs} />
        <Services />
        */}
      </ContentWrapper>

      <Footer logo={logo} dark={false} newsletter={true} />
    </Fragment>
  );
};

export async function getStaticProps() {
  const blogs = getBlogPosts(
    ["title", "excerpt", "date", "author", "thumb", "slug", "categories"],
    3
  );

  return {
    props: {
      blogs: blogs,
    },
  };
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
  },
  details: {
    flex: 1,
    marginRight: "20px",
  },
  photo: {
    width: "100%", // Ensures the div takes the full width of the Col
    height: "0", // Initial height
    paddingBottom: "100%",
    position: "relative",
    overflow: "hidden",
    border: "1px solid #ddd",
  },
  image: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    objectFit: "cover", // Ensures the image covers the div without stretching
  },
};

export default Home;
