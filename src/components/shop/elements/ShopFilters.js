import Link from "next/link";
import { useRouter } from "next/router";
import { useFilter, useWindowSize } from "@hooks";
import { toCapitalize } from "@utils/toCapitalize";
import { Fragment, useContext, useState, useEffect } from "react";
import SortBy from "@components/shop/elements/SortBy";
import ShopWidget from "@components/shop/elements/ShopWidget";
import ProductPerPage from "@components/shop/elements/ProductPerPage";
import axios from "axios";

const ShopFilters = (props) => {
  const {
    sidebar,
    productPerPage,
    filterPanelHandler,
    onProductPerPageHandler,
    handleSortByChange,
  } = props;

  const router = useRouter();
  const { pathname, query } = router;
  const { slug } = query;
  const [windowSize] = useWindowSize();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/get-categories`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <p>Loading categories...</p>;
  }

  return (
    <Fragment>
      {!sidebar && (
        <div className="tt-btn-col-close">
          <a
            href="/"
            onClick={(event) => {
              event.preventDefault();
              filterPanelHandler();
            }}
          >
            Close
          </a>
        </div>
      )}

      {windowSize < 1025 && sidebar && (
        <Fragment>
          <div className="tt-btn-col-close">
            <a
              href="/"
              onClick={(event) => {
                event.preventDefault();
                filterPanelHandler();
              }}
            >
              Close
            </a>
          </div>

          <ShopWidget>
            <div className="tt-filter-detach-option">
              <div className="filters-mobile">
                <div className="filters-row-select">
                  <SortBy handleSortByChange={handleSortByChange} />

                  <ProductPerPage
                    productPerPage={productPerPage}
                    onProductPerPageHandler={onProductPerPageHandler}
                  />
                </div>
              </div>
            </div>
          </ShopWidget>
        </Fragment>
      )}

      <ShopWidget title="KATEGORITË E PRODUKTEVE">
        <ul className="tt-list-row">
          <li>
            {" "}
            <Link href="/shop">Të gjithë</Link>
          </li>
          {categories.slice(0, 10).map((cat) => (
            <li key={cat.id} className={cat.link === slug ? "active" : ""}>
              <Link href={`/product/category/${cat.link}`}>{cat.name}</Link>
            </li>
          ))}
        </ul>
      </ShopWidget>
      {/*
      <FilterPrice products={products} getFilterParam={getFilterParam} />

      <ShopWidget title="VENDOR">
        <ul className="tt-list-row">
          {vendors.slice(0, vendorLimit).map((vendor) => (
            <li key={vendor.toLowerCase()}>
              <a
                href="/"
                data-filtertype="vendor"
                data-filtervalue={vendor}
                onClick={(event) => filterByHandler(event)}
              >
                {vendor}
              </a>
            </li>
          ))}
        </ul>
        {vendors.length > vendorLimit && (
          <button
            className="btn-link-02"
            onClick={() => setVendorLimit((prevState) => prevState + 5)}
          >
            + More
          </button>
        )}
      </ShopWidget>
      */}
    </Fragment>
  );
};

export default ShopFilters;
