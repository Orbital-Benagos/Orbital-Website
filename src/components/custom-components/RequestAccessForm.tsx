import { motion, AnimatePresence } from "framer-motion";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { useEffect } from "react";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";
import CustomTextArea from "./CustomTextArea";
import CustomButton from "./CustomButton";

interface AccessProps {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const RequestAccessForm = ({ showForm, setShowForm }: AccessProps) => {
  const instituteType = [
    { name: "Commercial", value: "Commercial" },
    { name: "Mortgage", value: "Mortgage" },
    { name: "Microfinance Bank", value: "Microfinance Bank" },
    { name: "FinTech/Lender", value: "FinTech/Lender" },
    { name: "Insurance", value: "Insurance" },
    { name: "Other", value: "Other" },
  ];
  const regionType = [
    { name: "State", value: "State" },
    { name: "Regional", value: "Regional" },
    { name: "National", value: "National" },
  ];
  const useCase = [
    { name: "New Digital MVP Product", value: "New Digital MVP Product" },
    { name: "Payment Transfer/Airtime", value: "Payment Transfer/Airtime" },
    { name: "Lending", value: "Lending" },
    { name: "NeoBank", value: "NeoBank" },
    { name: "Other", value: "Other" },
  ];

  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showForm]);
  return (
    <AnimatePresence mode="wait">
      {showForm && (
        <motion.div
          className="fixed inset-0 w-full min-h-screen flex flex-col justify-center items-center bg-[rgba(0,0,0,0.4)] backdrop-blur-xs z-40 px-3"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
        >
          <div className="rounded-t-lg rounded-b-lg overflow-hidden max-w-lg w-full">
            <div className="px-6 py-7 bg-[#0A162A] flex flex-col gap-1 relative">
              <div
                className="rounded-full bg-[#313B4C] w-fit p-1 absolute top-5 right-5 cursor-pointer"
                onClick={() => setShowForm(false)}
              >
                <HugeiconsIcon
                  icon={Cancel01Icon}
                  className="size-5 text-white"
                />
              </div>
              <p className="uppercase text-xs text-blue tracking-wider">
                EARLY ACCESS
              </p>
              <p className="text-2xl text-white font-semibold">
                Join the Orbital waitlist
              </p>
              <p className="text-[13px] text-[#A8A8A8]">
                Tell us about your institution. We onboard a small number of
                partners per cohort.
              </p>
            </div>

            <div className="bg-black px-6 py-8 w-full h-[350px] overflow-y-scroll">
              <form className="flex flex-col gap-3">
                <div className="flex gap-4">
                  <CustomInput
                    label="Full name"
                    required
                    placeholder="Ada Oladimeji"
                  />
                  <CustomInput
                    label="Work email"
                    required
                    placeholder="ada@yourworkemail.com"
                  />
                </div>
                <div className="flex gap-4">
                  <CustomInput
                    label="Institution"
                    required
                    placeholder="Institution name"
                  />
                  <CustomSelect
                    label="Institution type"
                    required
                    placeholder="Select type"
                    data={instituteType}
                  />
                </div>

                <div className="flex gap-4">
                  <CustomInput
                    label="Role/Job title"
                    placeholder="Enter role"
                  />
                  <CustomInput
                    label="Team size"
                    placeholder="Enter a number"
                    type="number"
                  />
                </div>

                <div className="flex gap-4">
                  <CustomSelect
                    label="Region covered"
                    placeholder="Select option"
                    data={regionType}
                  />
                  <CustomSelect
                    label="Use case"
                    placeholder="Select a use case"
                    data={useCase}
                  />
                </div>
                <CustomTextArea
                  label="Anything else?"
                  placeholder="Timelines, target, launch dates, compliance requirements."
                  className="h-[100px]"
                />
              </form>
            </div>
            <div className="bg-dark px-4 py-5 flex flex-wrap sm:flex-nowrap justify-between gap-6 items-center">
              <p className="text-xs text-[#A8A8A8] shrink-0">
                No account required. We only use these details to
                <br /> contact you about Orbital.
              </p>

              <CustomButton
                name="Request early access"
                className="w-full sm:w-fit"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RequestAccessForm;
