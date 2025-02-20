import Link from "next/link";

const Settings = ({ className, isHidden, openHandler, closeHandler }) => {
  return (
    <div className={`tt-parent-box ${className}`}>
      <div
        className={`tt-multi-obj tt-dropdown-obj ${
          !isHidden ? "active" : null
        }`}
      >
        <Link href="/add-product">
          <button
            style={{
              backgroundColor: "#c38e58", // Blue background
              color: "#fff", // White text
              border: "none", // No border
              padding: "10px 20px", // Padding inside the button
              fontSize: "16px", // Font size
              fontWeight: "bold", // Bold text
              borderRadius: "5px", // Rounded corners
              cursor: "pointer", // Pointer cursor on hover
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
              transition: "background-color 0.3s ease", // Smooth transition
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#c9a07e")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#c38e58")}
          >
            Krijoni njoftim
          </button>
        </Link>
        {/*
        <button
          className="tt-dropdown-toggle"
          data-id="settings"
          onClick={openHandler}
        >
          <i className="icon-f-79" />
        </button>
        <div className="tt-dropdown-menu">
          <div className="tt-mobile-add">
            <button
              className="tt-close"
              data-id="settings"
              onClick={closeHandler}
            >
              Close
            </button>
          </div>
          <div className="tt-dropdown-inner">
            <ul>
              {data.map((item) => (
                <li key={item.id}>
                  <button>
                    <i className={item.iconClass} />
                    {item.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        */}
      </div>
    </div>
  );
};
/*
const data = [
  { id: 1, iconClass: "icon-h-59", text: "USD - US Dollar" },
  { id: 2, iconClass: "icon-h-60", text: "EUR - Euro" },
  { id: 3, iconClass: "icon-h-61", text: "GBP - British Pound Sterling" },
];
*/
export default Settings;
