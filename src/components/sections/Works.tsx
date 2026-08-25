import React from "react";
import { motion } from "framer-motion";

interface WorkProps {
  index: string;
  name: string;
  info: string;
  color: string;
}

const Works = () => {
  const probs: WorkProps[] = [
    {
      index: "01",
      name: "Scope the MVP",
      color: "#FF8D28",
      info: "Define the smallets launchable slice with your product, credit and risk leads.",
    },
    {
      index: "02",
      name: "Configure, don’t build.",
      color: "#00C8B3",
      info: "Assemble journeys, rules and integration from Orbital modules in private envirment.",
    },
    {
      index: "03",
      name: "Pilot with customers",
      color: "#00C0E8",
      info: "Test with controlled customers, capture insights and refine pricing, policy and behaviour.",
    },
    {
      index: "04",
      name: "Ship to production ",
      color: "#0088FF",
      info: "SEPA, ACH, Faster Payments, and SWIFT access via a single RESTful endpoint.",
    },
  ];
  return (
    <div
      className="max-w-[1300px] w-full mx-auto px-3 sm:px-6 lg:px-10 2xl:px-0"
      id="How you go live"
    >
      <div className="flex items-center gap-2">
        <div className="w-5 bg-blue h-0.5" />
        <p className="text-blue uppercase text-xs tracking-widest">
          How it works
        </p>
      </div>
      <div>
        <p className="text-4xl font-semibold mt-6">
          From idea to live product <br />
          in four steps
        </p>
        <p className="text-[15px] text-[#A8A8A8] mt-4">
          Empower your teams with tools designed for the speed of modern finance
          <br />
          without compromising on institutional rigor.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 xl:gap-6 mt-10">
          {probs.map((p: WorkProps, index: number) => (
            <motion.div
              key={p.name}
              className="bg-dark border-gray border w-full p-7 group hover:bg-transparent transition-all ease-in-out duration-300"
              initial={{ x: index % 2 === 0 ? -30 : 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                ease: "easeInOut",
              }}
            >
              <div
                className="font-semibold bg-gray border-gray border px-4 py-3.5 rounded-xs flex flex-col justify-center items-center w-fit group-hover:border transition-all ease-in-out duration-300"
                style={{ color: p.color }}
              >
                {p.index}
              </div>

              <p className="text-lg font-medium mt-4">{p.name}</p>

              <p className="text-sm text-[#A8A8A8] font-normal max-w-[400px] my-2">
                {p.info}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Works;
