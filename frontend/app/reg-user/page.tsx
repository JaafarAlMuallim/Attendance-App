"use client";
import { LangContext } from "@/store/lang-store";
import { useContext } from "react";
import RegFormAR from "./RegForm-ar";
import RegFormEN from "./RegForm-en";

export default function RegisterPage() {
  const langContext = useContext(LangContext);
  return (
    <div
      dir={langContext.lang === "en" ? "ltr" : "rtl"}
      className="flex justify-center my-20 bg-slate-500 bg-opacity-30 rounded-xl mx-5 md:rounded-2xl md:mx-96"
    >
      {langContext.lang === "en" ? <RegFormEN /> : <RegFormAR />}
    </div>
  );
}
