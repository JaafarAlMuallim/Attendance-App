"use client";

import RadioButtons from "@/app/classes/RadioButtons";
import Card from "@/app/components/Card/Card";
import { toast } from "@/components/ui/use-toast";
import User from "@/types/user";
import { useSession } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";
export default function ClassesPage() {
  const [selectedClass, setClass] = useState("freshman");
  const [users, setUsers] = useState<User[]>([]);
  const { data: session } = useSession();
  const email = session?.user?.email;
  useEffect(() => {
    if (!email) {
      return;
    }
    const res = fetch(`http://localhost:8080/all-students?email=${email}`, {
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
    <div className="flex flex-col items-center justify-center mt-5">
      <RadioButtons
        onClassChange={onClassChange}
        selectedClass={selectedClass}
      />
      <Suspense fallback={<p>Loading..</p>}>
        <div className="flex flex-col w-full">
          <ul>
            {users
              .filter((user) => user.grade === selectedClass)
              .map((user) => (
                <li key={user.id}>
                  <Card user={user} email={email!} deleteUser={deleteUser} />
                </li>
              ))}
          </ul>
        </div>
      </Suspense>
    </div>
  );
}
