"use client";

import Card from "@/app/components/Card/Card";
import User from "@/types/user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AllStudents() {
  const [students, setStudents] = useState<User[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.email) {
      return;
    }
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
            setStudents(data);
          });
        }
      })
      .catch((e) => console.log(e));
  }, [session]);
  return (
    // <div className="flex flex-col justify-center items-center overflow-scroll">
    <div className="flex flex-col justify-center items-center">
      <ul>
        {students.map((student) => {
          return (
            <li key={student.id}>
              <Card
                key={student.id}
                user={student}
                email={session?.user!.email!}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
