import socialMedia from "@data/social-media.json";
import SocialLink from "@components/social-link";
import TikTokIcon from "@assets/images/svg/tiktok.svg";
import { useWindowSize } from "@hooks";

const SocialIcons = () => {
  const [windowSize] = useWindowSize();

  return (
    <ul className="tt-social-icon">
      {socialMedia.map((social) => (
        <li key={social.id}>
          <SocialLink
            url={`https://www.${social.media}.com/${social.username}`}
            className={social.iconClass}
          />
        </li>
      ))}
      {windowSize > 800 && (
        <li key="tiktok">
          <a href={`https://www.tiktok.com/@lereimusic`}>
            <img
              src="/assets/images/svg/tiktok.svg"
              alt="tiktok"
              style={{
                height: "15px",
                filter: "invert(100%)",
                transition: "filter 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.filter = "invert(0%)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.filter = "invert(100%)")
              }
            />
          </a>
        </li>
      )}
    </ul>
  );
};

export default SocialIcons;

{
  /*
        <li key="tiktok">
        <a href={`https://www.tiktok.com/@lereimusic`}>
          <img
            src="/assets/images/svg/tiktok.svg"
            alt="tiktok"
            style={{
              height: "15px",
              filter: "invert(100%)",
              transition: "filter 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.filter = "invert(0%)")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.filter = "invert(100%)")
            }
          />
        </a>
      </li>
  
  */
}
{
  /*   RREGULLOJE LOGO E TIK TOK NUK DEL GRI NE MOBILE
    <img
          src="/assets/images/svg/tiktok.svg"
          alt="tiktok"
          style={{
            height: "15px",
            filter: window.innerWidth <= 768 ? "invert(45%)" : "invert(100%)", // Default color for mobile (#777777) and desktop (white)
            transition: "filter 0.3s ease",
          }}
          onMouseEnter={(e) => {
            if (window.innerWidth > 768) {
              e.currentTarget.style.filter = "invert(0%)"; // Black on hover for desktop
            }
          }}
          onMouseLeave={(e) => {
            if (window.innerWidth > 768) {
              e.currentTarget.style.filter = "invert(100%)"; // Revert to white on desktop
            }
          }}
          onTouchStart={(e) => {
            e.currentTarget.style.filter = "invert(0%)"; // Black on touch for mobile
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.filter = "invert(45%)"; // Revert to #777777 on mobile
          }}
        />
  
  
  */
}
