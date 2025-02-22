import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const Account = ({ className, isHidden, openHandler, closeHandler }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  /*
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/auth/details`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkAuthStatus();
  }, []);
*/
  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/details`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        router.push("/account/user-details");
      }
    } catch (error) {
      router.push("/account/login");
    }
  };
  return (
    <div className={`tt-parent-box ${className}`}>
      <div
        className={`tt-account tt-dropdown-obj ${!isHidden ? "active" : null}`}
      >
        <button
          className="tt-dropdown-toggle"
          data-id="account"
          onClick={checkAuthStatus}
        >
          <i className="icon-f-94" />
        </button>
      </div>
      {/*
        <div className="tt-dropdown-menu">
          <div className="tt-mobile-add">
            <button
              className="tt-close"
              data-id="account"
              onClick={closeHandler}
            >
              Close
            </button>
          </div>
          <div className="tt-dropdown-inner">
            <ul>
              {data.map((item) => (
                <li key={item.id}>
                  <Link href={item.link}>
                    <i className={item.iconClass} />
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>*/}
    </div>
  );
};

export default Account;
