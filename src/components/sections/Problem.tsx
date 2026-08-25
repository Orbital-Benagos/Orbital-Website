import Image from "next/image";
import { motion } from "framer-motion";

interface ProblemProps {
  icon: string;
  name: string;
  info: string;
}

const Problem = () => {
  const probs: ProblemProps[] = [
    {
      icon: "/assets/docs.svg",
      name: "Engineering bottlenecks",
      info: "Product teams wait weeks for development.",
    },
    {
      icon: "/assets/people.svg",
      name: "Long implementation cycles",
      info: "Months of work before a single customer sees value.",
    },
    {
      icon: "/assets/boxes.svg",
      name: "Compliance complexity",
      info: "Rules, approvals and audits add friction at every step.",
    },
  ];
  return (
    <div className="max-w-[1300px] w-full mx-auto px-3 sm:px-6 lg:px-10 2xl:px-0">
      <div className="flex items-center gap-2">
        <div className="w-5 bg-blue h-0.5" />
        <p className="text-blue uppercase text-xs tracking-widest">Problem</p>
      </div>
      <div>
        <p className="text-4xl font-semibold mt-6">
          Banking products shouldn't <br />
          take months to launch.
        </p>
        <p className="text-[15px] text-[#A8A8A8] mt-4">
          Engineering backlogs, complex integrations and compliance overhead
          slow every idea down.
          <br /> You loose time. Your competitions move faster.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-6 mt-10">
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
      </div>
    </div>
  );
};

export default Problem;
