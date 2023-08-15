"use client";

import { LangContext } from "@/store/lang-store";
import { useContext } from "react";
import NavbarEN from "../Navbar/Navbar-en";
import NavbarAR from "../Navbar/Navbar-ar";

export default function Header() {
  const langContext = useContext(LangContext);
  return (
    <div dir={langContext.lang === "en" ? "ltr" : "rtl"}>
      {langContext.lang === "en" ? <NavbarEN /> : <NavbarAR />}
    </div>
  );
}
