"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";

export default function RegFormEN() {
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [grade, setGrade] = useState("");
  const [type, setType] = useState("");
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
        className: "bg-green-500 text-white",
      });
      setGrade("");
      setType("");
      setName("");
      setPhoneNum("");
    } else {
      toast({
        title: "Error",
        description: "Something Went Wrong",
        className: "bg-red-500 text-white",
      });
    }
  };
  return (
    <div className="w-full max-w-xs">
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
          <Select
            onValueChange={(value) => {
              setType(value);
            }}
          >
            <SelectTrigger id="type" className="w-64 bg-white" value={type}>
              <SelectValue placeholder="Select User Type..." />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="user">Regular User</SelectItem>
              <SelectItem value="employee">Employee</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="my-6">
          <label className="block text-sm font-bold mb-2" htmlFor="grade">
            Employee / Student Grade
          </label>
          <Select
            onValueChange={(value) => {
              setGrade(value);
            }}
          >
            <SelectTrigger id="grade" className="w-64 bg-white" value={grade}>
              <SelectValue placeholder="Select Grade..." />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="senior">Senior</SelectItem>
              <SelectItem value="junior">Junior</SelectItem>
              <SelectItem value="freshman">Freshman</SelectItem>
            </SelectContent>
          </Select>
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
      <div className="flex items-center justify-center"></div>
    </div>
  );
}
