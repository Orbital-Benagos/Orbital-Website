import { motion, AnimatePresence } from "framer-motion";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { useEffect } from "react";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";
import CustomTextArea from "./CustomTextArea";
import CustomButton from "./CustomButton";
import { useFormik } from "formik";
import * as yup from "yup";
import { showToast } from "../../../utils/showToast";

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

  const basicSchema = yup.object().shape({
    fullName: yup.string().required("Required"),
    workEmail: yup.string().email().required("Required"),
    institution: yup.string().required("Required"),
    institutionType: yup.string().required("Required"),
  });

  const onSubmit = () => {
    console.log(values);
    showToast.success("Request sent");
    resetForm();
    setShowForm(false);
  };

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      fullName: "",
      workEmail: "",
      institution: "",
      institutionType: "",
      role: "",
      teamSize: "",
      regionCovered: "",
      useCase: "",
      anythingElse: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });

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
          className="fixed top-0 inset-0 w-full min-h-screen flex flex-col justify-center items-center bg-[rgba(0,0,0,0.4)] backdrop-blur-xs z-40 px-3"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
        >
          <div className="rounded-t-lg rounded-b-lg overflow-hidden max-w-lg w-full">
            <div className="px-6 py-7 bg-[#0A162A] flex flex-col gap-1 sm:gap-3 relative">
              <div
                className="rounded-full bg-[#313B4C] w-fit p-1 absolute top-5 right-5 cursor-pointer"
                onClick={() => setShowForm(false)}
              >
                <HugeiconsIcon
                  icon={Cancel01Icon}
                  className="size-6 text-white"
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
            <form className="" onSubmit={handleSubmit}>
              <div className="bg-black px-6 py-8 w-full h-[300px] sm:h-[350px] overflow-y-scroll flex flex-col gap-3">
                <div className="flex gap-4">
                  <CustomInput
                    label="Full name"
                    required
                    placeholder="Ada Oladimeji"
                    name="fullName"
                    id="fullName"
                    value={values.fullName}
                    error={errors.fullName && touched.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <CustomInput
                    label="Work email"
                    required
                    placeholder="ada@yourworkemail.com"
                    name="workEmail"
                    id="workEmail"
                    value={values.workEmail}
                    error={errors.workEmail && touched.workEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                <div className="flex gap-4">
                  <CustomInput
                    label="Institution"
                    required
                    placeholder="Institution name"
                    name="institution"
                    id="institution"
                    value={values.institution}
                    error={errors.institution && touched.institution}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <CustomSelect
                    label="Institution type"
                    required
                    placeholder="Select type"
                    data={instituteType}
                    name="institutionType"
                    id="institutionType"
                    value={values.institutionType}
                    error={errors.institutionType && touched.institutionType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                <div className="flex gap-4">
                  <CustomInput
                    label="Role/Job title"
                    placeholder="Enter role"
                    name="role"
                    id="role"
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <CustomInput
                    label="Team size"
                    placeholder="Enter a number"
                    min={1}
                    type="number"
                    name="teamSize"
                    id="teamSize"
                    value={values.teamSize}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                <div className="flex gap-4">
                  <CustomSelect
                    label="Region covered"
                    placeholder="Select option"
                    data={regionType}
                    name="regionCovered"
                    id="regionCovered"
                    value={values.regionCovered}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <CustomSelect
                    label="Use case"
                    placeholder="Select a use case"
                    data={useCase}
                    name="useCase"
                    id="useCase"
                    value={values.useCase}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <CustomTextArea
                  label="Anything else?"
                  placeholder="Timelines, target, launch dates, compliance requirements."
                  name="anythingElse"
                  id="anythingElse"
                  value={values.anythingElse}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="h-[100px]"
                />
              </div>
              <div className="bg-dark px-4 py-5 flex flex-wrap sm:flex-nowrap justify-between gap-6 items-center">
                <p className="text-xs text-[#A8A8A8] shrink-0">
                  No account required. We only use these details to
                  <br /> contact you about Orbital.
                </p>

                <CustomButton
                  name="Request early access"
                  className="w-full sm:w-fit"
                  type="submit"
                />
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RequestAccessForm;
