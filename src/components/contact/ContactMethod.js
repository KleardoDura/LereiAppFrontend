import { Col, Row } from "react-bootstrap";

const ContactMethod = ({ className }) => {
  return (
    <div className={className ? className : ""}>
      <div className="tt-contact02-col-list">
        <Row>
          <Col md={4} className="ml-sm-auto mr-sm-auto mt-0">
            <div className="tt-contact-info mt-5">
              <i className="tt-icon icon-f-93" />
              <h6 className="tt-title">TELEFONI</h6>
              <address>
                068 544 3400
                <br />
                {/*+777 2345 7886*/}
              </address>
            </div>
          </Col>
          <Col md={4} className="mt-0">
            <div className="tt-contact-info mt-5">
              <i className="tt-icon icon-f-92" />
              <h6 className="tt-title">ORARI</h6>
              <address>
                E Hënë: 09:00 – 20:00 <br />
                E Martë: 09:00 – 20:00 <br />
                E Mërkurë: 09:30 – 20:00 <br />
                E Enjte: 09:00 – 20:00 <br />
                E Premte: 09:00 – 20:00 <br />
                E Shtunë: Mbyllur <br />E Diel: Mbyllur
              </address>
            </div>
          </Col>
          <Col md={4} className="mt-0">
            <div className="tt-contact-info mt-5">
              <i className="tt-icon icon-f-24" />
              <h6 className="tt-title">ADRESA</h6>
              <address>
                Pallati me shigjeta
                <br />
                Bulevardi Bajram Curri
                <br />
                Tiranë 1001
              </address>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ContactMethod;
