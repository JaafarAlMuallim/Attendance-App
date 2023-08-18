"use client";

import { toast } from "@/components/ui/use-toast";

import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function RegFormEN() {
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [grade, setGrade] = useState("freshman");
  const [type, setType] = useState("student");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handlePhoneNum = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNum(e.target.value);
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(
      `http://localhost:8080/reg-user/${session?.user?.email}`,
      {
        method: "POST",
        body: JSON.stringify({
          fullName: name,
          phone: phoneNum,
          grade,
          type,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setLoading(false);
    console.log(res.ok);
    if (res.ok) {
      toast({
        title: "Account Created",
        description: "You have successfully created the user account",
        className: "bg-green-700 text-white",
        duration: 4000,
      });
      setName("");
      setPhoneNum("");
    } else {
      toast({
        title: "Error",
        description: "Something Went Wrong",
        className: "bg-red-700 text-white",
        duration: 4000,
      });
    }
  };
  return (
    <form className="rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-6">
        <label className="block text-sm font-bold mb-2" htmlFor="name">
          Name <span className="text-red-600">*</span>
        </label>
        <input
          className="shadow appearance-none border rounded-lg w-full py-3 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
          id="name"
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleName}
          value={name}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="phone-num">
          Phone Number <span className="text-red-600">*</span>
        </label>
        <input
          className="shadow appearance-none border rounded-lg w-full py-3 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline text-black"
          id="phone-num"
          type="phone-num"
          name="phone-num"
          placeholder="0540000000"
          onChange={handlePhoneNum}
          value={phoneNum}
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-bold mb-2" htmlFor="type">
          User Type
        </label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-64">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>User Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={type}
              onValueChange={(value: string) => setType(value)}
            >
              <DropdownMenuRadioItem value="student">
                Student
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="regular user">
                Regular User
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="employee">
                Employee
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="my-6">
        <label className="block text-sm font-bold mb-2" htmlFor="grade">
          Employee / Student Grade
        </label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-64">
              {grade.charAt(0).toUpperCase() + grade.slice(1)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>User Grade</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={grade}
              onValueChange={(value: string) => setGrade(value)}
            >
              <DropdownMenuRadioItem value="freshman">
                Freshman
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="junior">
                Junior
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="senior">
                Senior
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hov text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={(e) => handleSubmit(e)}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Register"}
        </button>
      </div>
    </form>
  );
}
