import React from "react";
import Image from "next/image";

const Security = () => {
  return (
    <div
      className="max-w-[1300px] w-full mx-auto px-3 sm:px-6 lg:px-10 2xl:px-0"
      id="Securities"
      style={{ scrollMarginTop: "100px" }}
    >
      <div className="flex items-center gap-2">
        <div className="w-5 bg-blue h-0.5" />
        <p className="text-blue uppercase text-xs tracking-widest">
          security & compliance
        </p>
      </div>
      <div>
        <p className="text-4xl font-semibold mt-6">
          Designed for regulated <br />
          environments.
        </p>
        <p className="text-[15px] text-[#A8A8A8] mt-4">
          Move fast without loosening a single control. Built with governance,
          privacy
          <br /> and security standards financial institution demands.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-10">
        <div
          className="bg-dark border-gray border w-full p-7 group hover:bg-transparent 
        transition-all ease-in-out duration-300 lg:max-w-[60%] xl:max-w-[70%]"
        >
          <div className="bg-gray border-gray border p-5 rounded-xs flex flex-col justify-center items-center w-fit group-hover:border transition-all ease-in-out duration-300">
            <Image src="/assets/rocket.svg" width={20} height={20} alt="" />
          </div>
          <p className="text-lg font-medium mt-4">Speed to Market</p>
          <p className="text-sm text-[#A8A8A8] font-normal my-2">
            Launch robust financial products in record time. Our modular
            <br className="hidden lg:flex" />
            architecture accelerates development cycles drastically.
          </p>
          <hr className="my-4 lg:my-8 opacity-10" />
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="bg-[#2A2C2F] font-alt2 py-1.5 px-4 w-fit text-sm">
              Launch in weeks not months
            </div>

            <p className="text-[#6E6D7A] line-through text-sm">
              2 years industry average
            </p>
          </div>
        </div>

        <div
          className="bg-dark border-gray border w-full p-7 group hover:bg-transparent 
        transition-all ease-in-out duration-300 lg:max-w-[40%] xl:max-w-[30%] flex flex-col"
        >
          <div className="bg-gray border-gray border p-5 rounded-xs flex flex-col justify-center items-center w-fit group-hover:border transition-all ease-in-out duration-300">
            <Image src="/assets/shield.svg" width={20} height={20} alt="" />
          </div>
          <p className="text-lg font-medium mt-4">Enterprise Security</p>
          <p className="text-sm text-[#A8A8A8] font-normal my-2">
            Bank-grade protection integrated at every
            <br className="hidden lg:flex" /> layer of the stack.
          </p>
          <div className="mt-8 lg:mt-auto">
            <div className="bg-[#2A2C2F] font-alt2 py-2 px-4 w-fit text-sm text-blue border border-[#6E6D7A]">
              Designed for enterprise security requirements
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse lg:flex-row-reverse gap-6 mt-6">
        <div
          className="bg-dark border-gray border w-full p-7 group hover:bg-transparent 
        transition-all ease-in-out duration-300 lg:max-w-[60%] xl:max-w-[70%] relative overflow-hidden"
        >
          <div className="bg-gray border-gray border p-5 rounded-xs flex flex-col justify-center items-center w-fit group-hover:border transition-all ease-in-out duration-300">
            <Image src="/assets/valid.svg" width={20} height={20} alt="" />
          </div>
          <p className="text-lg font-medium mt-4">Automated Compliance</p>
          <p className="text-sm text-[#A8A8A8] font-normal my-2">
            Navigate complex regulatory landscapes effortlessly with
            <br className="hidden lg:flex" /> built-in tools for identity
            verification and continuous
            <br className="hidden lg:flex" /> monitoring.
          </p>
          <div className="bg-[#2A2C2F] font-alt2 py-2 px-4 w-fit text-sm text-white border border-[#6E6D7A] mt-8">
            Automated KYC/AML and regulatory reporting
          </div>

          <div className="absolute -bottom-5 opacity-10 right-5">
            <div className="relative w-40 h-40">
              <Image
                src="/assets/shield search.svg"
                fill
                alt=""
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div
          className="bg-dark border-gray border w-full p-7 group hover:bg-transparent 
        transition-all ease-in-out duration-300 lg:max-w-[40%] xl:max-w-[30%] flex flex-col"
        >
          <div className="bg-gray border-gray border p-5 rounded-xs flex flex-col justify-center items-center w-fit group-hover:border transition-all ease-in-out duration-300">
            <Image src="/assets/molecule.svg" width={20} height={20} alt="" />
          </div>
          <p className="text-lg font-medium mt-4">Core Connectivity</p>
          <p className="text-sm text-[#A8A8A8] font-normal my-2">
            Instantly plugin your core banking or
            <br className="hidden lg:flex" /> custom APIs to each user flow.
          </p>
          <div className="mt-8 lg:mt-auto">
            <div className="bg-[#2A2C2F] font-alt2 py-2 px-4 w-fit text-sm text-white border border-[#6E6D7A]">
              Easy to setup
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
