"use client";
import { LangContext } from "@/store/lang-store";
import { motion } from "framer-motion";
import { useContext } from "react";
import RegFormAR from "./RegForm-ar";
import RegFormEN from "./RegForm-en";

export default function RegisterPage() {
  const langContext = useContext(LangContext);
  return (
    <motion.div
      dir={langContext.lang === "en" ? "ltr" : "rtl"}
      className="flex items-center justify-center w-96 h-full my-20 bg-slate-500 bg-opacity-30 rounded-xl mx-5 md:rounded-2xl"
      initial={{ opacity: 0, y: 100, x: 100 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: 100, x: 100 }}
    >
      {langContext.lang === "en" ? <RegFormEN /> : <RegFormAR />}
    </motion.div>
  );
}
