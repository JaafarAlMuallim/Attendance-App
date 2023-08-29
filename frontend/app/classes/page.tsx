"use client";

import TableActionRow from "@/app/components/TableActionRow/TableActionRow";
import { Table, TableBody } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { LangContext } from "@/store/lang-store";
import User from "@/types/user";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import TableHeaderEN from "./TableHeader-en";
import TableHeaderAR from "./TableHeader-ar";
import RadioButtonsEN from "./RadioButtons-en";
import RadioButtonsAR from "./RadioButtons-ar";
export default function ClassesPage() {
  const [selectedClass, setClass] = useState("freshman");
  const [users, setUsers] = useState<User[]>([]);
  const langCtx = useContext(LangContext);
  const { data: session } = useSession();
  const email = session?.user?.email;

  useEffect(() => {
    if (!email) {
      return;
    }
    fetch(`http://localhost:8080/all-students/${email}`, {
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
  }, [email]);

  const onClassChange = (value: string) => {
    setClass(value.toLowerCase());
  };

  const deleteUser = async (id: string) => {
    const res = await fetch(
      `http://localhost:8080/delete-user/${id}?email=${email}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (res.ok) {
      await res.json();
      setUsers((prev) => prev.filter((user) => user.id !== id));
      toast({
        title: "Success",
        description: "User has been Deleted",
        className: "bg-green-700 text-white",
        duration: 4000,
      });
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="flex flex-col items-center justify-center mt-5"
      >
        {langCtx.lang === "en" ? (
          <RadioButtonsEN onClassChange={onClassChange} />
        ) : (
          <RadioButtonsAR onClassChange={onClassChange} />
        )}
        <motion.div
          className="flex flex-col justify-center items-center my-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <Table>
            {langCtx.lang === "en" ? <TableHeaderEN /> : <TableHeaderAR />}
            <TableBody>
              {users
                .filter((user) => user.grade === selectedClass)
                .map((user) => (
                  <TableActionRow
                    key={user.id}
                    user={user}
                    email={email!}
                    deleteUser={deleteUser}
                  />
                ))}
            </TableBody>
          </Table>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
