"use client";
import FormAR from "@/app/auth/Form-ar";
import FormEN from "@/app/components/Form/Form-en";
import { LangContext } from "@/store/lang-store";
import { useContext } from "react";

export default function SignUpForm() {
  const langContext = useContext(LangContext);
  return (
    <div
      dir={langContext.lang === "en" ? "ltr" : "rtl"}
      className="flex justify-center my-20 bg-slate-500 bg-opacity-30 rounded-xl mx-5 md:rounded-2xl md:mx-96"
    >
      {langContext.lang === "en" ? (
        <FormEN mode={"signup"} />
      ) : (
        <FormAR mode={"signup"} />
      )}
    </div>
  );
}
