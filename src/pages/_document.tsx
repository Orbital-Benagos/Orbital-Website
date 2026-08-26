import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        {/* open graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Orbital" />
        <meta
          property="og:title"
          content="Orbital — Ship compliant bank-grade apps"
          key="title"
        />
        <meta
          property="og:description"
          content="Orbital is a Benagos product built for banks, mortgage banks, Microfinance institutions and large finance companies that need to get a credible digital product into market quickly."
        />
        <meta property="og:url" content="https://orbital.benagos.com" />
        <meta name="author" content="Afolabi Babatunde Joseph" />{" "}
        <meta property="author" name="Ehizojie Ihayere" />
        <meta
          property="og:image"
          content="https://orbital.benagos.com/assets/hero.jpg?v=3"
        />
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Orbital — Ship compliant bank-grade apps"
        />
        <meta
          name="twitter:description"
          content="Orbital is a Benagos product built for banks, mortgage banks, Microfinance institutions and large finance companies that need to get a credible digital product into market quickly."
        />
        <meta
          name="twitter:image"
          content="https://orbital.benagos.com/assets/hero.jpg?v=3"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
