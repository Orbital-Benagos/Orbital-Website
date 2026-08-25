import Image from "next/image";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";

interface WhoProps {
  icon: string;
  name: string;
  info: string;
}

const Who = () => {
  const probs: WhoProps[] = [
    {
      icon: "/assets/bank.svg",
      name: "Commercial banks",
      info: "Test a new digital lending or SME proposition without waiting on the core roadmap.",
    },
    {
      icon: "/assets/house.svg",
      name: "Mortgage banks",
      info: "Digitise application, valuation, offer and repayment tracking end to end.",
    },
    {
      icon: "/assets/wallet.svg",
      name: "Microfinance & lenders",
      info: "Launch a compliant credit product with scorecards and collections from day one.",
    },
    {
      icon: "/assets/company.svg",
      name: "Large finance groups",
      info: "Give innovation teams a governed sandbox that already meets group security standards.",
    },
  ];
  return (
    <div
      className="max-w-[1300px] w-full mx-auto px-3 sm:px-6 lg:px-10 2xl:px-0"
      style={{ scrollMarginTop: "100px" }}
    >
      <div className="flex items-center gap-2">
        <div className="w-5 bg-blue h-0.5" />
        <p className="text-blue uppercase text-xs tracking-widest">
          who it's for
        </p>
      </div>
      <div>
        <p className="text-4xl font-semibold mt-6">
          Built for institutions that answer
          <br />
          to a board and a regulator.
        </p>
        <p className="text-[15px] text-[#A8A8A8] mt-4">
          A recorded walkthrough from our demo session — the same flow we run
          live
          <br />
          with credit, risk and technology teams.
        </p>

        <div className="hidden lg:grid lg:grid-cols-2 gap-5 xl:gap-6 py-10">
          {probs.map((p: WhoProps, index: number) => (
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

              <p className="text-sm text-[#A8A8A8] font-normal max-w-[500px] my-2">
                {p.info}
              </p>
            </motion.div>
          ))}
        </div>

        {/* marquee */}
        <div className="flex lg:hidden w-full overflow-hidden mt-10">
          <Marquee gradient={false} speed={40} className="w-full">
            {probs.map((p: WhoProps) => (
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

export default Who;
