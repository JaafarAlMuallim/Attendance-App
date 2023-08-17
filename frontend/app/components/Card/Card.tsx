"use client";
import { toast } from "@/components/ui/use-toast";
import User from "@/types/user";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCheck, FaSpinner, FaTrash } from "react-icons/fa";
export default function Card({
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
    setAttendedToday(user.dateTime !== null && checker(user.dateTime!));
  }, [user.dateTime]);

  const { fullName, phone } = user;
  const name = fullName.split(" ");
  const attendUser = async (id: string) => {
    setLoad(true);
    const res = await fetch(
      `http://localhost:8080/attend-user/${id}?email=${email}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
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
  return (
    <div className="bg-sky-400 border-2 bg-opacity-40 border-sky-500 text-black flex mt-5 h-10 mx-2 md:mx-20 items-center justify-around rounded-md p-4">
      <h2 className="inline-block font-serif text-xl overflow-hidden">
        <Link href={`/${user.id}`}>
          {name[0]} {name[name.length - 1]}
        </Link>
      </h2>
      <span className="font-series text-lg">{phone}</span>
      <div className="flex flex-row items-center justify-between gap-2">
        {load ? (
          <div className="text-black">
            <FaSpinner size={30} />
          </div>
        ) : (
          <div className={!attendedToday ? "text-red-700" : "text-green-700"}>
            <FaCheck size={30} onClick={() => attendUser(user.id!)} />
          </div>
        )}
        <div className="text-slate-700">
          <FaTrash size={30} onClick={() => deleteUser(user.id!)} />
        </div>
      </div>
    </div>
  );
}
