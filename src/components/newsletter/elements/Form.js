import Link from "next/link";
const NewsletterForm = ({ className }) => {
  return (
    <form
      className={`form-inline form-default ${className ? className : ""}`}
      method="post"
      action="#"
    >
      <div className="input-group form-group">
        <input
          type="text"
          name="email"
          className="form-control"
          value="Postoni artikujt që dëshironi te shisni, shpejt dhe thjesht"
          readOnly
        />
        <Link href="/account/register">
          <button
            type="submit"
            className="btn"
            style={{ whiteSpace: "nowrap" }}
          >
            RREGJISTROHUNI
          </button>
        </Link>
      </div>
    </form>
  );
};

export default NewsletterForm;
