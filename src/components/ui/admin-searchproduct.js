import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toCapitalize } from "@utils/toCapitalize";
import { FaSearch } from "react-icons/fa"; // Importing Search Icon

const SearchProduct = () => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
    if (router) {
      var linkPath = router.asPath.split("/");
      linkPath.shift();
      linkPath = ["search"];
      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: path.replace(/-/g, " "),
          href: "/" + linkPath.slice(0, i + 1).join("/"),
        };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push("/admin/search-all?title=" + searchTerm);
    }
  };

  return (
    <div className="tt-breadcrumb">
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ul
          style={{
            display: "flex",
            listStyleType: "none",
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <Link href="/">Home</Link>
          </li>
          {breadcrumbs?.map((breadcrumb, i) =>
            breadcrumbs.length !== i + 1 ? (
              <li key={breadcrumb.breadcrumb} style={{ marginLeft: "0px" }}>
                <Link href={breadcrumb.href}>
                  {toCapitalize(breadcrumb.breadcrumb)}
                </Link>
              </li>
            ) : (
              <li key={breadcrumb.breadcrumb} style={{ marginLeft: "0px" }}>
                {toCapitalize(breadcrumb.breadcrumb).replace(/\?(.*)/g, "")}
              </li>
            )
          )}
        </ul>

        {/* Search Box */}
        <div
          className="search-box"
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "auto",
            padding: "5px 10px",
          }}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Kërko produkt"
            maxLength={20}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{
              padding: "5px",
              border: isFocused ? "2px solid #ccc" : "2px solid #ccc", // Thinner when typing
              borderRadius: "4px",
              width: "170px",
              transition: "border 0.2s ease",
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              paddingLeft: "10px",
            }}
            onClick={handleSearch}
          >
            <FaSearch style={{ fontSize: "18px", color: "#333" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;
