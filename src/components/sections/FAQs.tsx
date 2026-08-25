import React from "react";
import { motion } from "framer-motion";
const FAQs = () => {
  const questions = [
    {
      title: `Does Orbital replace our existing core banking system?`,
      note: `No. Orbital is designed to work with your existing infrastructure. 
      Connect your core banking system, payment rails, identity providers and other services, 
      while using Orbital to design and launch the digital experiences your customers interact with.`,
    },
    {
      title: `Is Orbital only for building mobile apps?`,
      note: `At this time, Yes. Orbital is currently designed to help financial institutions 
      build complete mobile digital banking journeys — from onboarding and KYC to accounts, 
      lending, payments and servicing. Experiences can be branded and deployed for your institution 
      across iOS and Android.`,
    },
    {
      title: `How does Orbital handle compliance and security?`,
      note: `Compliance is built into the way experiences are configured. Orbital supports controls such as regulatory 
        controls as issued by the CBN, NDIC and data-residency options, so teams can move quickly without treating 
        governance as an afterthought.`,
    },
    {
      title: `How quickly can we launch with Orbital?`,
      note: `Orbital is designed to move from idea to a working MVP in weeks, not months. 
        Teams can scope a product, configure journeys and integrations, pilot with real customers, 
        and then harden the experience for production. As Orbital is currently in pre-launch, specific timelines depend on the institution, scope and integrations required.`,
    },
  ];
  return (
    <div
      className="max-w-[1300px] w-full mx-auto px-3 sm:px-6 lg:px-10 2xl:px-0"
      id="FAQs"
      style={{ scrollMarginTop: "100px" }}
    >
      <div className="flex items-center gap-2">
        <div className="w-5 bg-blue h-0.5" />
        <p className="text-blue uppercase text-xs tracking-widest">FAQs</p>
      </div>
      <div>
        <p className="text-4xl font-semibold mt-6">
          Frequently asked by <br />
          institutions like yours.
        </p>
        <p className="text-[15px] text-[#A8A8A8] mt-4">
          Straight answers to the questions matter most before choosing a
          platform
        </p>
      </div>

      <div className="flex flex-col gap-6 mt-14">
        {questions.map((q, index: number) => (
          <motion.div
            key={index}
            className="p-5.5 bg-dark border-gray border"
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 18,
              mass: 0.8,
              delay: index * 0.1,
            }}
          >
            <p className="font-semibold text-base">{q.title}</p>
            <p className="font-normal text-sm text-[#A8A8A8] mt-2">{q.note}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
