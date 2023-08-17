"use client";

import Card from "@/app/components/Card/Card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import User from "@/types/user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ClassesPage() {
  const [selectedClass, setClass] = useState("freshman");
  const [users, setUsers] = useState<User[]>([]);
  const { data: session } = useSession();
  const email = session?.user?.email;
  useEffect(() => {
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

  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <RadioGroup
        defaultValue="Freshman"
        className="flex flex-row"
        onValueChange={(value) => onClassChange(value)}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Freshman" id="freshman" />
          <Label htmlFor="freshman">Freshman</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Junior" id="junior" />
          <Label htmlFor="junior">Junior</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Senior" id="senior" />
          <Label htmlFor="senior">Senior</Label>
        </div>
      </RadioGroup>
      <div className="flex flex-col justify-center items-center">
        <ul>
          {users
            .filter((user) => user.grade === selectedClass)
            .map((user) => (
              <li key={user.id}>
                <Card user={user} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
