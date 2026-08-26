import Capabilities from "@/components/sections/Capabilities";
import EarlyAccess from "@/components/sections/EarlyAccess";
import FAQs from "@/components/sections/FAQs";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Security from "@/components/sections/Security";
import Solutions from "@/components/sections/Solutions";
import Who from "@/components/sections/Who";
import Works from "@/components/sections/Works";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Orbital — Ship compliant bank-grade apps</title>
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
      <div className="flex flex-col gap-30 overflow-x-hidden">
        <Hero />
        <Problem />
        <Solutions />
        <Capabilities />
        <Security />
        <Works />
        <Who />
        <EarlyAccess />
        <FAQs />
      </div>
    </>
  );
}
