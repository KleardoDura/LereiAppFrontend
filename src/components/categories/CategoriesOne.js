import { Col, Container, Row } from "react-bootstrap";
import { CategoryOne as Category } from "@components/category";

const CategoriesOne = ({ className }) => {
  const categories =
    //getProductsUniqueCategories(products, 6);
    [
      { name: "Instrumente me tela", image: "instrumente_me_tela2.png" },
      {
        name: "Instrumente me tastiere",
        image: "instrumente_me_tastiere.png",
      },
      {
        name: "Instrumente membranofon",
        image: "instrumente_membranofon3.png",
      },
      {
        name: "Instrumente elektronike",
        image: "instrumente_elektronike2.png",
      },

      { name: "Instrumente frymore", image: "instrumente_frymore3.png" },
      { name: "Instrumente me hark", image: "instrumente_me_hark2.png" },

      { name: "Instrumente tradicional", image: "instrumente_tradicional.png" },
      { name: "Aksesore", image: "aksesor.png" },
      /*
      { name: "Aksesore ", image: "aksesor.png" },
      { name: "Kurse kitare", image: "kurse_kitare.png" },
  */
    ];

  const imagesLoadedOptions = { background: ".col-sm-6" };
  return (
    <div className={`container-indent0 ${className ? className : ""}`}>
      <Container fluid>
        <Row className="tt-layout-promo-box">
          {categories.map((category, index) => (
            <>
              <Col
                key={category.name}
                sm={12}
                md={3}
                lg={3}
                style={{
                  paddingLeft: "5px",
                  paddingRight: "5px",
                  boxSizing: "border-box",
                }}
              >
                <Category
                  category={category.name.toUpperCase()}
                  thumb={`/assets/images/categories/onecolor/${category.image}`}
                />
              </Col>
            </>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default CategoriesOne;
