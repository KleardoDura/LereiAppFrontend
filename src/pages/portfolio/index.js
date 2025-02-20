import Head from "next/head";
import {Fragment, useState} from "react";
import {Container} from "react-bootstrap";
import AnotherLightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import GalleryItem from "@components/gallery/GalleryItem";
import portfolioData from "@data/portfolio";
import Portfolio from "@components/portfolio";
import Masonry from "react-masonry-component";
import Breadcrumb from "@components/ui/breadcrumb";
import {HeaderOne as Header} from "@components/header";
import {FooterOne as Footer} from "@components/footer";
import {HomePagesNavData as navContent} from "@data/navbar";
import {ContentWrapperOne as ContentWrapper} from "@components/wrapper";

const PagePortfolio = ({fluid}) => {
    const logo = "/assets/images/no-placeholder/logo.png"
    const [index, setIndex] = useState(-1);
    const slides = portfolioData.map((img) => ({
        src: img.thumb,
        key: img.id,
    }));

    return (
        <Fragment>
            <Head>
                <title>Portfolios - Wokiee :: React Next JS Multipurpose eCommerce Template</title>
                <meta name="description" content="React Next JS Multipurpose eCommerce Template"/>
            </Head>

            <Header
                logo={logo}
                navbar={true}
                navData={navContent}
                navbarAlignment="left"
            />
            <ContentWrapper>
                <Breadcrumb/>

                <div className="content-indent">
                    <Container fluid={fluid}>
                        <h1 className="tt-title-subpages noborder">PORTFOLIOS</h1>

                        <div className="tt-portfolio-masonry">
                            <Masonry
                                className="tt-portfolio-content layout-default tt-grid-col-3 tt-add-item tt-show">
                                {portfolioData.map((portfolio, i) => (
                                    <Portfolio
                                        key={portfolio.id}
                                        thumb={portfolio.thumb}
                                        title={portfolio.title}
                                        excerpt={portfolio.excerpt}
                                        onClick={() => setIndex(i)}
                                    />
                                ))}
                            </Masonry>
                            <AnotherLightbox
                                open={index >= 0}
                                index={index}
                                close={() => setIndex(-1)}
                                slides={slides}
                                plugins={[Thumbnails, Zoom, Fullscreen]}
                            />
                        </div>
                    </Container>
                </div>
            </ContentWrapper>
            <Footer
                logo={logo}
                newsletter={true}
            />
        </Fragment>
    );
};

export default PagePortfolio;