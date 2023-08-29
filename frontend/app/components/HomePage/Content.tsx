"use client";

import { LangContext } from "@/store/lang-store";
import { useContext, useEffect, useState } from "react";
import HomePageContentEN from "./HomePageContent-en";
import HomePageContentAR from "./HomePageContent-ar";
import { useSession } from "next-auth/react";
import LoadingHomeContent from "../Loading/LoadingHomeContent";
import User from "@/types/user";

export default function Content() {
  const langCtx = useContext(LangContext);
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const email = session?.user?.email;
  useEffect(() => {
    if (email) {
      fetch(`http://localhost:8080/all-students/${email}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            const data = res.json().then((data) => {
              setUsers(data);
              console.log(data);
            });
          }
        })
        .catch((e) => console.log(e));
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    () => clearTimeout(timer);
  }, [email]);
  if (!email) {
    return (
      <>
        {loading ? (
          <LoadingHomeContent />
        ) : (
          <div className="flex flex-col mt-20 mx-5 whitespace-wrap gap-10">
            <p className="text-xl font-serif order-1 text-center mx-44">
              Show Attendence of Students, Employees, or Any Type of Users in
              This Simple View, And Also Attend Them or Delete From Organization
              Using Classes Action. <span>Register Your Organization</span>
            </p>

            {langCtx.lang === "en" ? (
              <HomePageContentEN users={users} email={email!} />
            ) : (
              <HomePageContentAR users={[]} email={""} />
            )}
          </div>
        )}
      </>
    );
  }
  return (
    <>
      {loading ? (
        <LoadingHomeContent />
      ) : langCtx.lang === "en" ? (
        <HomePageContentEN users={users} email={email!} />
      ) : (
        <HomePageContentAR users={[]} email={""} />
      )}
    </>
  );
}
