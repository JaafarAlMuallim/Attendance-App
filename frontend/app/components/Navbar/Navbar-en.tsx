"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { LangContext } from "@/store/lang-store";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

export default function NavbarEN() {
  const { data: session } = useSession();
  const langContext = useContext(LangContext);
  return (
    <nav className="bg-sky-700">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <Link href={"/"} className="text-xl text-white">
            Attendence System
          </Link>
          <Image
            className="block mx-2 lg:hidden h-8 w-auto"
            height={40}
            width={40}
            src="/Memo.svg"
            alt="Workflow"
          />
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <Image
                className="hidden mx-5 lg:block h-8 w-auto"
                height={40}
                width={40}
                src="/Memo.svg"
                alt="Workflow"
              />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link
                  href="/classes"
                  className=" text-slate-300 hover:bg-slate-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Classes
                </Link>
                <Link
                  href="/all-students"
                  className="text-slate-300 hover:bg-slate-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  All Students
                </Link>
                <Link
                  href="/about"
                  className="text-slate-300 hover:bg-slate-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="ml-3 relative">
              <Popover>
                <PopoverTrigger
                  aria-controls="user-menu"
                  className="max-w-xs bg-sky-400 bg-opacity-90 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-700 focus:ring-white"
                >
                  <span className="sr-only">Open user menu</span>

                  <span className="text-black underline p-3">
                    {session && session.user !== null
                      ? session.user?.name
                      : "Settings"}
                  </span>
                </PopoverTrigger>
                <PopoverContent
                  className={`origin-top-right absolute 
                  right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-slate-800 ring-1 ring-black ring-opacity-5`}
                >
                  <Link
                    href="/classes"
                    className="block px-4 py-2 text-sm md:hidden text-slate-300 hover:bg-slate-700"
                  >
                    Classes
                  </Link>
                  <Link
                    href="/all-students"
                    className="block px-4 py-2 text-sm md:hidden text-slate-300 hover:bg-slate-700"
                  >
                    All Students
                  </Link>
                  {session === null ? (
                    <Link
                      className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700"
                      href={"/auth/signin"}
                    >
                      Sign In
                    </Link>
                  ) : (
                    <button
                      className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700"
                      onClick={() =>
                        signOut({ redirect: true, callbackUrl: "/" })
                      }
                    >
                      Sign Out
                    </button>
                  )}
                  <div className="px-4 py-2 flex items-center">
                    <label
                      htmlFor="airplane-mode"
                      className="text-slate-300 text-sm hover:bg-slate-700 whitespace-nowrap"
                    >
                      Theme
                    </label>
                    <Switch
                      id="airplane-mode"
                      className="mx-10"
                      onClick={() => {
                        console.log("CHANGE THEME");
                      }}
                    />
                  </div>
                  <div className="px-4 py-2 flex items-center">
                    <label
                      htmlFor="language"
                      className="text-slate-300 text-sm hover:bg-slate-700 whitespace-nowrap"
                    >
                      Arabic
                    </label>
                    <Switch
                      id="language"
                      checked={langContext.lang === "ar"}
                      className="mx-11"
                      onClick={() => {
                        langContext.toggleLang();
                      }}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
