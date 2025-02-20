import Head from "next/head";
import { Fragment } from "react";
import { Container } from "react-bootstrap";
import { GoogleMap } from "@components/map";
import Breadcrumb from "@components/ui/breadcrumb";
import { FooterOne as Footer } from "@components/footer";
import { HeaderOne as Header } from "@components/header";
import { HomePagesNavData as navContent } from "@data/navbar";
import { ContactMethod, ContactForm } from "@components/contact";
import { ContentWrapperOne as ContentWrapper } from "@components/wrapper";

const PageContact = () => {
  const logo = "/assets/images/no-placeholder/logo.png";

  return (
    <Fragment>
      <Head>
        <title>Kontaktet</title>
        <meta
          name="description"
          content="Lerei music eshte nje dyqan ku shiten instrumenta te
                ndryshem muzikore"
        />
        <meta name="title" content="Kontaktoni dyqanin Lerei music" />
      </Head>

      <Header
        logo={logo}
        navbar={true}
        navData={navContent}
        navbarAlignment="left"
      />
      <ContentWrapper>
        <Breadcrumb />

        <div className="content-indent">
          <Container>
            <div
              style={{
                width: "100%", // Full width by default
                maxWidth: "1000px", // Max width for desktop
                margin: "0 auto", // Center the map
                height: "600px", // Fixed height
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d482.53841130026!2d19.79133211014086!3d41.322025977947376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13503113b4af47c7%3A0x6a3fd70a043d30f6!2sLerei%20Music!5e0!3m2!1sen!2s!4v1729417700109!5m2!1sen!2s"
                width="800"
                height="600"
                style={{
                  border: 0,
                  width: "100%", // Make iframe responsive
                  height: "100%", // Full height of the container
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lerei Music Map"
              ></iframe>
            </div>
            {/*
            <GoogleMap
              latitude={19.79133211014086}
              longitude={41.322025977947376}
            />
*/}
            <ContactMethod className="mt-5" />

            {/*<ContactForm className="mt-5" />*/}
          </Container>
        </div>
      </ContentWrapper>
      <Footer logo={logo} newsletter={true} />
    </Fragment>
  );
};

export default PageContact;
