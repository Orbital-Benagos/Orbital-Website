import React from "react";
import Link from "next/link";
import Image from "next/image";
import CustomButton from "../custom-components/CustomButton";
import { ArrowUpRight01Icon, FavouriteIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import RequestAccessForm from "../custom-components/RequestAccessForm";
import DemoAccessForm from "../custom-components/DemoAccessForm";
import { useState } from "react";

const Footer = () => {
  const [showForm, setShowForm] = useState(false);
  const [showDemoForm, setShowDemoForm] = useState(false);
  const socials = [
    {
      icon: "/assets/linkedin.svg",
      link: "https://linkedin.com/company/benagos",
    },
    { icon: "/assets/instagram.svg", link: "https://instagram.com/benagoshq" },
    { icon: "/assets/twitter.svg", link: "https://x.com/benagoshq" },
    // { icon: "/assets/substack.svg", link: "/" },
  ];

  const platform = [
    { name: "Platform", link: "#Platform" },
    { name: "Solution", link: "#Solution" },
    { name: "Watch the demo", link: "#Demo" },
    { name: "Capabilities", link: "#Capabilities" },
    { name: "Security", link: "#Securities" },
    { name: "How you go live", link: "#Works" },
  ];

  const company = [
    { name: "Benagos", link: "https://benagos.com/" },
    { name: "Lilypad", link: "https://lilypad.benagos.com/" },
    {
      name: "Contact — orbital@benagos.com",
      link: "mailto:orbital@benagos.com",
    },
  ];

  const legal = [
    { name: "Privacy Policy", link: "/" },
    { name: "Terms of Use", link: "/" },
    { name: "Cookie Policy", link: "/" },
    { name: "Responsible Disclosure", link: "/" },
  ];

  const note = [
    `Orbital is a pre-launch product in early prototype stage. Features, modules, 
    timelines and interfaces shown on this page are illustrative, subject to change,
     and do not constitute a commitment to deliver any particular functionality.`,
    `Availability of specific capabilities may vary by market, institution type and applicable 
    regulatory approvals. Integration with core banking systems, payment rails, credit bureaus 
    and identity providers depends on third-party availability and your institution's existing 
    agreements`,
    `Figures such as implementation timelines, module counts and uptime targets are internal targets or 
    illustrative estimates based on comparable engagements. They are not guarantees, service-level commitments,
     or a forecast of results for any specific institution.`,
    `Screenshots, dashboards, customer names and transaction data shown on this page are simulated for 
    demonstration purposes and do not represent real customers, accounts or portfolios.`,
    `Nothing on this page constitutes financial, legal, regulatory, tax or investment advice, nor an offer 
    to provide regulated financial services. Institutions remain responsible for their own licensing, 
    regulatory obligations and customer outcomes.`,
    `Information submitted through the waitlist form is collected by Benagos to evaluate early-access 
    requests and to contact you about Orbital. It is not used to create an account and is not sold to third parties.`,
  ];

  const navs = [
    { name: "Privacy Policy", link: "/" },
    { name: "Terms", link: "/" },
    { name: "Responsible Disclosure", link: "/" },
    { name: "Benagos", link: "https://benagos.com/" },
  ];

  return (
    <div className="bg-black py-15 lg:py-20 mt-20">
      <RequestAccessForm showForm={showForm} setShowForm={setShowForm} />
      <DemoAccessForm
        setShowDemoForm={setShowDemoForm}
        showDemoForm={showDemoForm}
        setShowRequestForm={setShowForm}
      />
      <div className="max-w-[1300px] w-full mx-auto px-3 sm:px-6 lg:px-10 2xl:px-0">
        <div className="flex flex-col lg:flex-row justify-between gap-10 flex-wrap">
          <div>
            <Link href="/">
              <div className="w-30 h-10 relative">
                <Image
                  src="/assets/logo white.svg"
                  fill
                  alt=""
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-[#6E6D7A] text-sm mt-2">
              The MVP launchpad for financial institutions. A<br />
              Benagos product.
            </p>
            <CustomButton
              name="Request early access"
              className="mt-6 w-fit bg-transparent border-gray hover:text-white"
              onClick={() => setShowForm(true)}
            />
            <div className="flex gap-3 mt-6">
              {socials.map((s, index: number) => (
                <Link
                  href={s.link}
                  className="bg-dark border border-gray px-3 py-2.5 rounded-xs"
                  key={index}
                >
                  <Image src={s.icon} alt="" width={18} height={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* product */}
          <div>
            <p className="uppercase tracking-wider text-[#6E6D7A] text-xs font-medium">
              Product
            </p>
            <div className="flex flex-col gap-4 mt-6">
              {platform?.map((p: any, index: number) => (
                <Link key={index} href={p.link}>
                  <p className="text-[#6E6D7A] text-sm hover:text-white transition-all ease-in-out duration-300">
                    {p.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* company */}
          <div>
            <p className="uppercase tracking-wider text-[#6E6D7A] text-xs font-medium">
              Company
            </p>
            <div className="flex flex-col gap-4 mt-6">
              {company?.map((p: any, index: number, arr) => (
                <Link
                  key={index}
                  href={p.link}
                  className="flex gap-1 items-center group"
                >
                  <p className="text-[#6E6D7A] text-sm group-hover:text-white transition-all ease-in-out duration-300">
                    {p.name}
                  </p>
                  {arr.length - 1 !== index && (
                    <HugeiconsIcon
                      icon={ArrowUpRight01Icon}
                      className="text-[#878F98] size-4 cursor-pointer  group-hover:text-white transition-all ease-in-out duration-300"
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* legal */}
          <div>
            <p className="uppercase tracking-wider text-[#6E6D7A] text-xs font-medium">
              Legal
            </p>
            <div className="flex flex-col gap-4 mt-6">
              {legal?.map((p: any, index: number) => (
                <Link key={index} href={p.link}>
                  <p className="text-[#6E6D7A] text-sm hover:text-white transition-all ease-in-out duration-300">
                    {p.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20">
          <p className="uppercase tracking-widest text-xs text-blue">
            About orbital
          </p>
          <p className="text-[#6E6D7A] text-sm mt-4">
            Orbital is a Benagos product built for banks, mortgage banks,
            Microfinance institutions and large finance companies that need to
            get a credible digital product into market quickly. Instead of a
            large software & design engineering team replacement, Orbital gives
            institutions a composable set of production-ready modules — customer
            onboarding and KYC, account management, card management, loan
            disbursement, and transaction overview — that can be configured into
            a working minimum viable product and piloted with real customers in
            weeks. The impact is measured in three places: time, evidence and
            risk. Teams reach market faster and at a fraction of the cost of a
            bespoke build; product, credit and risk leaders make decisions from
            real customer behaviour instead of assumptions; and compliance teams
            retain the audit trails, segregation of duties and data residency
            controls their regulators expect. Orbital is currently in pre-launch
            and is being rolled out to a limited cohort of partner institutions.
          </p>

          <hr className="my-12 opacity-10" />

          <div className="flex flex-col gap-3">
            {note.map((n, index: number) => (
              <p className="text-sm text-[#6E6D7A]" key={index}>
                {index + 1}. {n}
              </p>
            ))}
          </div>
        </div>
      </div>

      <hr className="mt-12 mb-6 opacity-10" />

      <div className="max-w-[1300px] w-full mx-auto px-3 sm:px-6 lg:px-10 2xl:px-0">
        <div className="flex flex-col gap-y-4 lg:flex-row justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-[#6E6D7A] text-xs">
              Copyright © {new Date().getFullYear()} Orbital. All rights
              reserved
            </p>

            <HugeiconsIcon
              icon={FavouriteIcon}
              className="hidden lg:flex text-[#878F98] size-3 cursor-pointer  group-hover:text-white transition-all ease-in-out duration-300"
            />
            <p className="text-[#6E6D7A] text-xs">
              Created by Benagos Technologies in Lagos, Nigeria{" "}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            {navs?.map((p: any, index: number, arr) => (
              <Link
                key={index}
                href={p.link}
                className="flex gap-1 items-center group"
              >
                <p className="text-[#6E6D7A] text-xs group-hover:text-white transition-all ease-in-out duration-300">
                  {p.name}
                </p>
                {arr.length - 1 === index && (
                  <HugeiconsIcon
                    icon={ArrowUpRight01Icon}
                    className="text-[#878F98] size-4 cursor-pointer  group-hover:text-white transition-all ease-in-out duration-300"
                  />
                )}
              </Link>
            ))}
          </div>
        </div>

        <Image
          width={1500}
          height={500}
          alt=""
          src="/assets/logo blue.svg"
          className="mt-15 lg:mt-30"
        />
      </div>
    </div>
  );
};

export default Footer;
