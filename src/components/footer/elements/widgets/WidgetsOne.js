import Link from "next/link";
import Widget from "@components/widget";
import { toCapitalize } from "@utils/toCapitalize";
import accountData from "@data/account-menu.json";
import { Col, Container, Row } from "react-bootstrap";

const WidgetsOne = ({ className, dark }) => {
  //const cats = getProductsUniqueCategories(products, 6);
  const categories =
    //getProductsUniqueCategories(products, 6);
    [
      { name: "Instrumente me tela", image: "instrumente_me_tela2.png" }, //1
      {
        name: "Instrumente me tastiere",
        image: "instrumente_me_tastiere.png",
      }, //2
      {
        name: "Instrumente membranofon",
        image: "instrumente_membranofon3.png",
      }, //3
      {
        name: "Instrumente elektronike",
        image: "instrumente_elektronike2.png",
      }, //4

      { name: "Instrumente frymore", image: "instrumente_frymore3.png" }, //5
    ];
  //  arrSortByCharacter(cats);

  return (
    <div
      className={`tt-footer-col tt-color-scheme-0${dark ? 3 : 1} ${
        className ? className : ""
      }`}
    >
      <Container>
        <Row>
          <Col md={6} lg={2} xl={3}>
            <Widget title="KATEGORITË">
              <ul className="tt-list">
                {categories.map((category) => (
                  <li key={category.name}>
                    {/*<Link href={`/product/category/${category}`}>*/}
                    {toCapitalize(category.name.toLowerCase())}
                    {/* </Link>*/}
                  </li>
                ))}
              </ul>
            </Widget>
          </Col>

          <Col md={6} lg={2} xl={3}>
            <Widget title="LLOGARIA IME">
              <ul className="tt-list">
                {accountData.map((item) => (
                  <li key={item.id}>
                    <Link href={item.link}>{item.text}</Link>
                  </li>
                ))}
              </ul>
            </Widget>
          </Col>

          <Col md={6} lg={2} xl={3}>
            <Widget title="RRETH NESH">
              <p>
                Lerei music eshte nje dyqan ku shiten instrumenta te ndryshem
                muzikore, kryesisht kitare klasi{" "}
              </p>
            </Widget>
          </Col>

          <Col md={6} lg={2} xl={3}>
            <Widget title="KONTAKT">
              <address>
                <p>
                  <span>Adresa:</span> Pallati me shigjeta, Bulevardi Bajram
                  Curri, Tiranë 1001
                </p>
                <p>
                  <span>Telefoni:</span> 068 544 3400
                </p>
                <p>
                  <span>E-mail:</span>{" "}
                  <Link href="mailto:lereimusic@gmail.com ">
                    lereimusic@gmail.com{" "}
                  </Link>
                </p>
              </address>
            </Widget>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WidgetsOne;
