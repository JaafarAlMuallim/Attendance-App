"use client";

import { useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

export default function FormEN(props: { mode: "signup" | "signin" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { toast } = useToast();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const signInHandler = async (e: FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      email: email,
      password: password,
      redirect: true,
      callbackUrl: "/",
    });
  };
  const signUpHandler = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/signup", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Something went wrong!");
    }
    const res2 = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
    });
    toast({
      title: "Account Created",
      description: "Orgnaization Account Created Successfully",
    });
  };

  return (
    <div className="w-full max-w-xs">
      <form className="rounded px-8 pt-6 pb-8 mb-4">
        {props.mode === "signup" && (
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-3 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
              id="name"
              type="text"
              name="name"
              placeholder="example@example.com"
              onChange={handleName}
            />
          </div>
        )}
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            Email
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
            Password
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
            type="submit"
            onClick={(e) => {
              props.mode === "signin" ? signInHandler(e) : signUpHandler(e);
            }}
          >
            {props.mode === "signin" ? `Sign In` : `Sign Up`}
          </button>
          {props.mode === "signin" ? (
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="/auth/forget-password"
            >
              Forgot Password?
            </Link>
          ) : null}
        </div>
      </form>
      <div className="flex items-center justify-center">
        <Link
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mb-20"
          href={`/auth/${props.mode === "signin" ? "signup" : "signin"}`}
        >
          Switch to {props.mode === "signin" ? "Sign Up" : "Sign In"}
        </Link>
      </div>
    </div>
  );
}
