"use client";
import LoadingTable from "@/app/components/Loading/LoadingTable";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import User from "@/types/user";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AllStudents() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.email) {
      return;
    }
    setLoading(true);
    const res = fetch(
      `http://localhost:8080/all-students/${session?.user?.email}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          const data = res.json().then((data) => {
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
      <Table>
        <TableCaption>A List of All Users</TableCaption>
        <TableHeader>
          <TableRow className="border-black">
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead className="w-[200px]">Phone Number</TableHead>
            <TableHead className="w-[100px]">Grade</TableHead>
            <TableHead className="w-[100px]">Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => {
            const name = user.fullName.split(" ");
            return (
              <TableRow key={user.id} className="border-black">
                <TableCell className="font-medium">
                  {name[0]} {name[name.length - 1]}{" "}
                </TableCell>
                <TableCell className="font-medium">{user.phone}</TableCell>
                <TableCell className="font-medium">
                  {user.grade
                    ? `${
                        user.grade.charAt(0).toUpperCase() + user.grade.slice(1)
                      }`
                    : "None"}
                </TableCell>
                <TableCell className="font-medium">
                  {user.type
                    ? `${
                        user.type.charAt(0).toUpperCase() + user.type.slice(1)
                      }`
                    : "None"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </motion.div>
  );
}
