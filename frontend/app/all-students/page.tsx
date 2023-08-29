"use client";
import LoadingTable from "@/app/components/Loading/LoadingTable";
import { LangContext } from "@/store/lang-store";

import User from "@/types/user";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import TableEN from "./Table-en";
import TableAR from "./Table-ar";

export default function AllStudents() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const langCtx = useContext(LangContext);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.email) {
      return;
    }
    setLoading(true);
    fetch(`http://localhost:8080/all-students/${session?.user?.email}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setUsers(data);
          });
        }
      })
      .catch((e) => console.log(e));
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [session]);
  return loading ? (
    <LoadingTable />
  ) : (
    <motion.div
      className="flex flex-col justify-center items-center my-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      {langCtx.lang === "en" ? (
        <TableEN users={users} />
      ) : (
        <TableAR users={users} />
      )}
    </motion.div>
  );
}
