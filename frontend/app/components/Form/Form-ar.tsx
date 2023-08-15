"use client";

import { ChangeEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function FormAR(props: { mode: "signup" | "signin" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  // get prev url
  return (
    <div className="w-full max-w-xs">
      <form
        className="rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={() =>
          signIn("credentials", { email, password, mode: props.mode })
        }
      >
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            البريد الالكتروني
          </label>
          <input
            className="shadow appearance-none border rounded-lg w-full py-3 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
            id="email"
            type="text"
            name="email"
            placeholder="example@example.com"
            onChange={handleEmail}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2" htmlFor="password">
            الرقم السري
          </label>
          <input
            className="shadow appearance-none border rounded-lg w-full py-3 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline text-black"
            id="password"
            type="password"
            name="password"
            placeholder="password"
            onChange={handlePassword}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hov text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            {props.mode === "signin" ? `تسجيل الدخول` : `تسجيل حساب جديد`}
          </button>
          {props.mode === "signin" ? (
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="/auth/forget-password"
            >
              نسيت كلمة السر؟
            </Link>
          ) : null}
        </div>
      </form>
      <div className="flex items-center justify-center">
        <Link
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mb-20"
          href={`/auth/${props.mode === "signin" ? "signup" : "signin"}`}
        >
          {props.mode === "signin" ? "تسجيل حساب جديد؟" : "تسجيل الدخول؟"}
        </Link>
      </div>
    </div>
  );
}
