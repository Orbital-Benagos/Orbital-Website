import Image from "next/image";
import CustomButton from "../custom-components/CustomButton";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { IoMdPlay } from "react-icons/io";
import { motion } from "framer-motion";
import { useState } from "react";
import RequestAccessForm from "../custom-components/RequestAccessForm";

interface StatsProps {
  name: string;
  info: string;
  color: string;
}

const Hero = () => {
  const stats: StatsProps[] = [
    { name: "Speed", info: "Target time to first MVP", color: "#1f72e6" },
    { name: "40+", info: "Pre-built financial modules", color: "#8b5cf6" },
    { name: "99.95%", info: "Platform uptime target", color: "#00ad77" },
  ];
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="mx-auto w-full flex flex-col" id="Platform">
      <RequestAccessForm showForm={showForm} setShowForm={setShowForm} />
      <div className="w-full h-180 relative opacity-50">
        <Image
          src="/assets/mesh.svg"
          alt="hero"
          fill
          className="object-cover object-top"
        />
      </div>
      <div className="max-w-[1300px] w-full mx-auto -mt-145 lg:-mt-130 z-10 px-3 sm:px-6 lg:px-10 2xl:px-0 overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between gap-7 lg:gap-14">
          <motion.div
            className="shrink-0"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.5 }}
          >
            <div className="bg-dark rounded-full py-2 px-4 border border-[#2A2C2F] flex items-center gap-2 w-fit">
              <div className="bg-blue rounded-full p-1 animate-pulse" />
              <p className="text-[13px] text-[#C8CEDE]">
                Early stage prototype POC — In Development
              </p>
            </div>

            <div className="text-4xl sm:text-5xl font-semibold mt-6 lg:mt-10">
              Ship compliant <br />
              bank-grade apps in
              <br /> weeks, not months.
            </div>
          </motion.div>

          <motion.div
            className="mt-auto h-full"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.5 }}
          >
            <p className="max-w-lg text-[#A8A8A8] text-[15px]">
              Design your app, connect your existing core banking system or
              custom APIs, configure your customer journeys, deploy to iOS and
              Android, and manage on the go.
            </p>
            <div className="w-full sm:w-fit flex flex-wrap sm:flex-nowrap items-center gap-4 mt-6">
              <CustomButton
                name="Request early access"
                className="w-full sm:w-fit"
                onClick={() => setShowForm(true)}
              />
              <CustomButton
                name="Explore the live demo"
                iconRight={ArrowUpRight01Icon}
                className="bg-dark border border-[#2A2C2F] hover:text-white/50 w-full sm:w-fit"
                iconClassName="group-hover:text-white/50"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="h-70 sm:h-100 lg:h-140 rounded-sm w-full relative overflow-hidden mt-15 sm:mt-20 lg:mt-40"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 1 }}
          id="Demo"
        >
          <Image
            src="/assets/video thumbnail.jpg"
            fill
            alt=""
            className="object-cover"
          />
          <div className="absolute h-full w-full flex flex-col justify-center items-center">
            <div className="bg-white/90 rounded-lg  px-4 py-4.5 sm:px-5.5 sm:py-6 flex flex-col justify-center items-center cursor-pointer">
              {" "}
              <IoMdPlay className="text-blue size-10 ml-1" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-dark border border-[#2A2C2F] rounded-md p-4 mt-6 flex justify-between"
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
        >
          {stats?.map((s: StatsProps, index: number, arr: StatsProps[]) => (
            <div
              key={index}
              className="flex items-center justify-between w-full"
            >
              <div className="flex flex-col gap-1 mx-auto text-center">
                <p
                  className={`text-xl sm:text-2xl font-semibold text-center`}
                  style={{ color: s?.color }}
                >
                  {s.name}
                </p>
                <p className="text-center text-xs sm:text-sm text-[#C8CEDE]">
                  {s.info}
                </p>
              </div>
              {arr.length - 1 !== index && (
                <div className="bg-[#6E6D7A] h-10 w-0.5 mx-4 md:mx-0" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
