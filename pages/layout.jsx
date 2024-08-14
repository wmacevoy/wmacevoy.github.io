// pages/_app.jsx or components/Layout.jsx

import React from 'react';
import Head from 'next/head';
import Banner from './components/banner';
import Navigation from './components/navigation';
import Footer from './components/footer';

const Layout = ({ children, title, currentPage }) => {
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <link rel="icon" href="/assets/favicon_32.ico" type="image/gif" sizes="32x32" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div id="banner" className="jumbotron text-center" style={{ height: "200px" }}>
        <Banner />
      </div>
      <div id="navbar" style={{ marginTop: "-30px" }}>
        <Navigation currentPage={currentPage} />
      </div>
      <main>
        <div>
          {children}
        </div>
      </main>
      <div id="footer">
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Layout;
