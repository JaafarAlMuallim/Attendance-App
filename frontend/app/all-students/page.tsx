"use client";

import Card from "@/app/components/Card/Card";
import User from "@/types/user";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

export default function AllStudents() {
  const [students, setStudents] = useState<User[]>([]);
  const { data: session } = useSession();
  const getData = useCallback(async () => {
    const res = await fetch(
      `http://localhost:8080/all-students?email=${session!.user?.email}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
        }),
      }
    );
    if (!res.ok) {
      throw new Error("Something went wrong!");
    }
    console.log("success");
    const data = await res.json();
    console.log(data);
  }, [session]);

  useEffect(() => {
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
    <div className="flex flex-col justify-center items-center overflow-scroll">
      {students.map((student) => {
        return <Card key={student.id} user={student} />;
      })}
    </div>
  );
}
