import Image from "next/image";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";

interface ProblemProps {
  icon: string;
  name: string;
  info: string;
}

const Capabilities = () => {
  const probs: ProblemProps[] = [
    {
      icon: "/assets/doc2.svg",
      name: "Onboarding & KYC",
      info: "Digital onboarding, ID verification, document capture.",
    },
    {
      icon: "/assets/people.svg",
      name: "Accounts",
      info: "Savings, current, accounts, wallets and more.",
    },
    {
      icon: "/assets/card.svg",
      name: "Payments",
      info: "Trabsfers, bills, disbursment, colections",
    },
    {
      icon: "/assets/chart.svg",
      name: "Lending",
      info: "Loan origination, underwriting, disbursement",
    },
    {
      icon: "/assets/verify.svg",
      name: "Collections",
      info: "Repayment tracking, reminders, fields collections.",
    },
    {
      icon: "/assets/boxes.svg",
      name: "Servicing",
      info: "Customer profile, tickets, preferences and more.",
    },
  ];
  return (
    <div
      className="max-w-[1300px] w-full mx-auto px-3 sm:px-6 lg:px-10 2xl:px-0"
      id="Capabilities"
      style={{ scrollMarginTop: "100px" }}
    >
      <div className="flex items-center gap-2">
        <div className="w-5 bg-blue h-0.5" />
        <p className="text-blue uppercase text-xs tracking-widest">
          Capabilities
        </p>
      </div>
      <div>
        <p className="text-4xl font-semibold mt-6">
          Modules that already
          <br />
          know how banking works.
        </p>
        <p className="text-[15px] text-[#A8A8A8] mt-4">
          Most institutions lose a year to vendor selection before a single
          customer sees anything.
          <br />
          Orbital compresses that into a working MVP your teams can test,
          measure and defend.
        </p>

        <div className="hidden lg:grid lg:grid-cols-3 gap-5 xl:gap-6 mt-10">
          {probs.map((p: ProblemProps, index: number) => (
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
              <div className="bg-gray border-gray border p-5 rounded-xs flex flex-col justify-center items-center w-fit group-hover:border transition-all ease-in-out duration-300">
                <Image src={p.icon} width={20} height={20} alt="" />
              </div>

              <p className="text-lg font-medium mt-4">{p.name}</p>

              <p className="text-sm text-[#A8A8A8] font-normal max-w-[300px] my-2">
                {p.info}
              </p>
            </motion.div>
          ))}
        </div>

        {/* marquee */}
        <div className="flex lg:hidden w-full overflow-hidden mt-10">
          <Marquee gradient={false} speed={40} className="w-full">
            {probs.map((p: ProblemProps) => (
              <motion.div
                key={p.name}
                className="bg-dark border-gray border w-[300px] h-[240px] p-7 mx-3 group hover:bg-transparent transition-all ease-in-out duration-300 flex flex-col justify-center"
              >
                <div className="bg-gray border-gray border p-5 rounded-xs flex flex-col justify-center items-center w-fit group-hover:border transition-all ease-in-out duration-300">
                  <Image src={p.icon} width={20} height={20} alt="" />
                </div>

                <p className="text-lg font-medium mt-4">{p.name}</p>

                <p className="text-sm text-[#A8A8A8] font-normal max-w-[300px] my-2">
                  {p.info}
                </p>
              </motion.div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default Capabilities;
