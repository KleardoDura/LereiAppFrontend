import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import Breadcrumb from "@components/ui/breadcrumb";
import ShopGrid from "@components/shop-admin/ShopGrid";
import { toCapitalize } from "@utils/toCapitalize";
import { FooterOne as Footer } from "@components/footer";
import { HeaderOne as Header } from "@components/header";

import { HomePagesNavData as adminNavContent } from "@data/navbar/admin-navbar";
import { ContentWrapperOne as ContentWrapper } from "@components/wrapper";
import axios from "axios";
import { useRouter } from "next/router";

const PageProductCategory = ({ category }) => {
  const router = useRouter();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const logo = "/assets/images/no-placeholder/logo.png";

  useEffect(() => {
    if (category?.id) {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/get-lerei-post-by-category-id/${category.id}`,
            { withCredentials: true }
          );
          setCategoryProducts(response.data || []);
        } catch (error) {
          console.error("Error fetching category products:", error);
          router.replace("/404");
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    } else {
      router.replace("/404");
    }
  }, [category, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <Head>
        <title>{toCapitalize(category.name)}</title>
        <meta name="description" content={`Products under ${category.name}`} />
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
          sidebar={true}
          sidebarPosition="left"
          containerFluid={false}
          products={categoryProducts}
          pageTitle={toCapitalize(category.name)}
        />
      </ContentWrapper>

      <Footer logo={logo} newsletter={true} />
    </Fragment>
  );
};

export const getStaticProps = async ({ params }) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/get-categories`
    );
    const categories = response.data;
    console.log(categories);

    const category = categories.find((cat) => cat.link === params.slug);

    if (!category) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        category,
      },
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/get-categories`
    );
    const categories = response.data;
    console.log(categories);

    const paths = categories.map((category) => ({
      params: { slug: category.link },
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      paths: [],
      fallback: false,
    };
  }
};

export default PageProductCategory;
