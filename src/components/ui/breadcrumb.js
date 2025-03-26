import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toCapitalize } from "@utils/toCapitalize";
import { FaSearch } from "react-icons/fa"; // Importing Search Icon

const Breadcrumb = () => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split("/");
      linkPath.shift();

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
    // Handle the search logic here (if required)
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
      </div>
    </div>
  );
};

export default Breadcrumb;
