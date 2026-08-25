import { motion, AnimatePresence } from "framer-motion";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { useEffect, useState } from "react";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import { useFormik } from "formik";
import * as yup from "yup";
import Image from "next/image";
import { showToast } from "../../../utils/showToast";
import axios from "axios";

interface AccessProps {
  showDemoForm: boolean;
  setShowDemoForm: React.Dispatch<React.SetStateAction<boolean>>;
  setShowRequestForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const DemoAccessForm = ({
  showDemoForm,
  setShowDemoForm,
  setShowRequestForm,
}: AccessProps) => {
  const basicSchema = yup.object().shape({
    workEmail: yup.string().email().required("Required"),
    access: yup.string().required("Required"),
  });
  const [restrictionModal, setRestrictionModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setRestrictionModal(true);
      return;
    }

    setLoading(true);

    const reqbody = {
      email: values.workEmail,
      code: values.access,
    };

    try {
      const { data } = await axios.post("/api/verify_access", reqbody);
      console.log(data);
      showToast.success("Access granted, redirecting please wait");
      resetForm();
      setShowDemoForm(false);
    } catch (err: any) {
      console.log(err.response);
      if (err?.response?.status === 401) {
        showToast.error("Incorrect email or access code");
      } else {
        showToast.error("An error occured");
      }
    } finally {
      setLoading(false);
    }
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
      workEmail: "",
      access: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });

  // Lock body scroll when either overlay is visible
  useEffect(() => {
    const active = showDemoForm || restrictionModal;
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showDemoForm, restrictionModal]);

  // If the form is opened on a small screen, redirect to the restriction modal
  useEffect(() => {
    if (
      showDemoForm &&
      typeof window !== "undefined" &&
      window.innerWidth < 1024
    ) {
      setShowDemoForm(false);
      setRestrictionModal(true);
    }
  }, [showDemoForm, setShowDemoForm]);

  return (
    <AnimatePresence mode="wait">
      {restrictionModal && (
        <motion.div
          className="fixed inset-0 w-full min-h-screen flex flex-col justify-center items-center bg-[rgba(0,0,0,0.4)] backdrop-blur-xs z-40 px-3"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          key="restrict"
        >
          <div className="rounded-t-lg rounded-b-lg overflow-hidden max-w-sm w-full ">
            <div className="px-6 py-7 bg-white flex flex-col gap-3 relative">
              <div
                className="rounded-full bg-[#E8E7E9] w-fit p-1 absolute top-5 right-5 cursor-pointer"
                onClick={() => setRestrictionModal(false)}
              >
                <HugeiconsIcon
                  icon={Cancel01Icon}
                  className="size-6 text-black"
                />
              </div>
              <p className="uppercase text-xs text-black tracking-wider">
                LIVE DEMO ACCESS
              </p>
              <p className="text-2xl text-[#2A2C2F] font-semibold">
                Restricted!
              </p>

              <Image
                src="/assets/laptop.svg"
                width={130}
                height={20}
                alt=""
                className="mx-auto my-4"
              />

              <p className="text-black text-center mx-auto w-fit">
                This demo is built for larger screens. Hop on a laptop or
                desktop.
              </p>
              <CustomButton
                name="Close"
                className="w-full py-7 !text-lg mt-3"
                onClick={() => setRestrictionModal(false)}
              />
            </div>
          </div>
        </motion.div>
      )}

      {showDemoForm && (
        <motion.div
          className="fixed inset-0 w-full min-h-screen flex flex-col justify-center items-center bg-[rgba(0,0,0,0.4)] backdrop-blur-xs z-40 px-3"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          key="demo"
        >
          <div className="rounded-t-lg rounded-b-lg overflow-hidden max-w-lg w-full">
            <div className="px-6 py-7 bg-[#0A162A] flex flex-col gap-3 relative">
              <div
                className="rounded-full bg-[#313B4C] w-fit p-1 absolute top-5 right-5 cursor-pointer"
                onClick={() => setShowDemoForm(false)}
              >
                <HugeiconsIcon
                  icon={Cancel01Icon}
                  className="size-6 text-white"
                />
              </div>
              <p className="uppercase text-xs text-blue tracking-wider">
                LIVE DEMO ACCESS
              </p>
              <p className="text-2xl text-white font-semibold">
                View the live demo
              </p>
              <p className="text-[13px] text-[#A8A8A8]">
                Tell us about your institution. We onboard a small number of
                partners per cohort.
              </p>
            </div>
            <form className="" onSubmit={handleSubmit}>
              <div className="bg-black px-6 py-8 w-full flex flex-col gap-3">
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
                  disabled={loading}
                />

                <CustomInput
                  label="Access code"
                  required
                  type="tel"
                  placeholder="ORB9-Y754"
                  name="access"
                  id="access"
                  value={values.access}
                  error={errors.access && touched.access}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={loading}
                />
              </div>
              <div className="bg-dark px-4 py-5 flex flex-wrap sm:flex-nowrap justify-between gap-6 items-center">
                <div className="w-full">
                  <p className="text-xs text-[#A8A8A8]">
                    You need your Orbital access code to access the live demo
                    environment.
                    <br />{" "}
                    <span
                      className="text-blue underline cursor-pointer"
                      onClick={() => {
                        setShowDemoForm(false);
                        setShowRequestForm(true);
                      }}
                    >
                      Request to get your access here.
                    </span>
                  </p>
                </div>

                <CustomButton
                  name="Access the live demo"
                  className="w-full sm:w-fit ml-auto"
                  type="submit"
                  disabled={loading}
                  loading={loading}
                />
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DemoAccessForm;
