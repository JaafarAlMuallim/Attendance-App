"use client";

import RadioButtons from "@/app/classes/RadioButtons";
import Card from "@/app/components/Card/Card";
import { toast } from "@/components/ui/use-toast";
import User from "@/types/user";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
export default function ClassesPage() {
  const [selectedClass, setClass] = useState("freshman");
  const [users, setUsers] = useState<User[]>([]);
  const { data: session } = useSession();
  const email = session?.user?.email;
  useEffect(() => {
    if (!email) {
      return;
    }
    const res = fetch(`http://localhost:8080/all-students/${email}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          const data = res.json().then((data) => {
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
      }
    );
    if (res.ok) {
      const data = await res.json();
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
        <RadioButtons
          onClassChange={onClassChange}
          selectedClass={selectedClass}
        />
        <div className="flex flex-col w-full">
          <motion.ul>
            {users
              .filter((user) => user.grade === selectedClass)
              .map((user) => (
                <Card
                  key={user.id}
                  user={user}
                  email={email!}
                  deleteUser={deleteUser}
                />
              ))}
          </motion.ul>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
motion.li;
