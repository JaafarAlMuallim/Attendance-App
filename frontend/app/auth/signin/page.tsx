"use client";
import FormAR from "@/app/auth/Form-ar";
import FormEN from "@/app/auth/Form-en";
import { LangContext } from "@/store/lang-store";
import { motion } from "framer-motion";
import { useContext } from "react";

export default function SignInForm() {
  const langContext = useContext(LangContext);
  return (
    <motion.div
      dir={langContext.lang === "en" ? "ltr" : "rtl"}
      // className="flex justify-center my-20 bg-slate-500 bg-opacity-30 rounded-xl mx-5 md:rounded-2xl md:mx-96"
      className="flex items-center justify-center w-96 h-full my-20 bg-slate-500 bg-opacity-30 rounded-xl mx-5 md:rounded-2xl"
      initial={{ opacity: 0, y: 100, x: 100 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: 100, x: 100 }}
    >
      {langContext.lang === "en" ? (
        <FormEN mode={"signin"} />
      ) : (
        <FormAR mode={"signin"} />
      )}
    </motion.div>
  );
}
