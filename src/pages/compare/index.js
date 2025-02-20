import Head from "next/head";
import Breadcrumb from "@components/ui/breadcrumb";
import React, {Fragment, useContext} from "react";
import {CompareContext} from "@global/CompareContext";
import {HeaderOne as Header} from "@components/header";
import {FooterOne as Footer} from "@components/footer";
import {HomePagesNavData as navContent} from "@data/navbar";
import EmptyCompare from "@components/compare/EmptyCompare";
import CompareWrapper from "@components/compare/CompareWrapper";
import {ContentWrapperOne as ContentWrapper} from "@components/wrapper";
import {useMount} from "@hooks"

const ComparePage = () => {
    const {compareList} = useContext(CompareContext);
    const logo = "/assets/images/no-placeholder/logo.png"
    const mounted = useMount();

    if(!mounted) return null;

    return (
        <Fragment>
            <Head>
                <title>Compare - Wokiee :: React Next JS Multipurpose eCommerce Template</title>
            </Head>

            <Header
                logo={logo}
                navbar={true}
                navData={navContent}
                navbarAlignment="left"
            />

            <ContentWrapper>
                <Breadcrumb/>

                <div className="page-compare-wrapper container-indent">
                    {compareList.length > 0 && <CompareWrapper/>}
                </div>

                {compareList.length <= 0 && (
                    <div className="empty-compare-wrapper content-indent">
                        <EmptyCompare/>
                    </div>
                )}
            </ContentWrapper>

            <Footer
                logo={logo}
            />
        </Fragment>
    );
};

export default ComparePage;