import React from "react";
import CustomButton from "../custom-components/CustomButton";
import { ArrowUpRight01Icon, PlayCircleIcon } from "@hugeicons/core-free-icons";
import Image from "next/image";
const EarlyAccess = () => {
  return (
    <div className="relative h-120">
      <div className="w-full opacity-50">
        <Image
          src="/assets/mesh.svg"
          alt="hero"
          fill
          className="object-cover object-top"
        />
      </div>
      <div className="max-w-[1300px] w-full mx-auto px-3 sm:px-6 lg:px-10 2xl:px-0 absolute top-0 inset-x-0 h-full flex flex-col justify-center items-center">
        <p className="text-blue uppercase text-xs tracking-widest text-center">
          Early access · limited cohort
        </p>
        <p className="text-4xl font-semibold mt-5 text-center mx-auto">
          Be one of the first
          <br />
          institutions in the Orbit.
        </p>
        <p className="text-center mx-auto text-[#A8A8A8] text-[15px] mt-3">
          Orbital hasn't launched yet. Join the waitlist and we'll bring you
          into the first
          <br />
          cohort with a private walkthrough shaped around your product roadmap.
        </p>

        <div className="w-full sm:w-fit flex flex-wrap md:flex-nowrap items-center gap-4 mt-12 md:mt-10 mx-auto">
          <CustomButton
            name="Request early access"
            className="w-full md:w-fit"
          />
          <CustomButton
            name="View the live demo"
            iconRight={ArrowUpRight01Icon}
            className="bg-dark border border-[#2A2C2F] hover:text-white/50 w-full md:w-fit"
            iconClassName="group-hover:text-white/50"
          />
          <CustomButton
            name="Watch the walkthrough"
            iconLeft={PlayCircleIcon}
            className="bg-transparent border border-[#2A2C2F] hover:text-white/50 w-full md:w-fit"
            iconClassName="group-hover:text-white/50"
          />
        </div>

        <div className="flex-wrap md:flex-nowrap flex items-center gap-3 md:gap-6 mx-auto w-fit mt-8">
          <div className="flex items-center gap-3 mx-auto">
            <Image
              src="/assets/shield green.svg"
              alt=""
              width={20}
              height={20}
            />
            <p className="text-[#6E6D7A] text-sm">Regulator-ready controls</p>
          </div>

          <div className="flex items-center gap-3 mx-auto">
            <Image src="/assets/flash.svg" alt="" width={20} height={20} />
            <p className="text-[#6E6D7A] text-sm">
              No account creation. No commitment. We'll only email you about
              Orbital.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarlyAccess;
