"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import User from "@/types/user";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCheck, FaSpinner, FaTrash } from "react-icons/fa";

export default function TableActionRow({
  user,
  email,
  deleteUser,
}: {
  user: User;
  email: string;
  deleteUser(id: string): void;
}) {
  const [attendedToday, setAttendedToday] = useState(false);
  const [load, setLoad] = useState(false);
  const checker = (time: string) => {
    const date = new Date();
    const hour = date.getHours();
    const min =
      date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const format = `${day}/${month}/${year} - ${hour}:${min}`;
    const sameDate = (time: string) => {
      if (!time || !time.includes("-")) return false;
      return format.includes(time.split("-")[0]);
    };
    return sameDate(time);
  };

  useEffect(() => {
    setAttendedToday(user.dateTime !== null && checker(user.dateTime![0]));
  }, [user.dateTime]);

  const attendUser = async (id: string) => {
    setLoad(true);
    const res = await fetch(
      `http://localhost:8080/attend-user/${id}?email=${email}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (res.ok) {
      toast({
        title: "Success",
        description: `User Attendence has been ${
          !attendedToday ? "Marked" : "Deleted"
        }`,
        className: "bg-green-700 text-white",
        duration: 4000,
      });
    }
    setAttendedToday((prev) => !prev);
    setLoad(false);
  };
  console.log(attendedToday);
  const name = user.fullName.split(" ");
  return (
    <TableRow key={user.id} className="border-black">
      <TableCell className="font-medium">
        {name[0]} {name[name.length - 1]}{" "}
      </TableCell>
      <TableCell className="font-medium">{user.phone}</TableCell>
      <TableCell className="font-medium">
        {user.grade
          ? `${user.grade.charAt(0).toUpperCase() + user.grade.slice(1)}`
          : "None"}
      </TableCell>
      <TableCell className="font-medium">
        {user.type
          ? `${user.type.charAt(0).toUpperCase() + user.type.slice(1)}`
          : "None"}
      </TableCell>
      <TableCell className="font-medium text-right">
        <div className="flex flex-row gap-4">
          {load ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                loop: Infinity,
                duration: 1,
                ease: "linear",
              }}
              className="text-black"
            >
              <FaSpinner size={30} />
            </motion.div>
          ) : (
            <>
              {" "}
              <div
                className={!attendedToday ? "text-red-700" : "text-green-700"}
              >
                <FaCheck size={30} onClick={() => attendUser(user.id!)} />
              </div>
              <div className="text-slate-700">
                <FaTrash
                  size={30}
                  onClick={() => {
                    setLoad(true);
                    deleteUser(user.id!);
                    setTimeout(() => {
                      setLoad(false);
                    }, 1000);
                  }}
                />
              </div>
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
