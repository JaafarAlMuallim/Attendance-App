"use client";

import { ChangeEvent, useState } from "react";

export default function RegFormAR() {
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handlePhoneNum = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNum(e.target.value);
  };
  return (
    <div className="w-full max-w-xs">
      <form className="rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2" htmlFor="name">
            الاسم <span className="text-red-600">*</span>
          </label>
          <input
            className="shadow appearance-none border rounded-lg w-full py-3 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
            id="name"
            type="text"
            name="name"
            placeholder="الاسم"
            onChange={handleName}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2" htmlFor="phone-num">
            رقم الجوال <span className="text-red-600">*</span>
          </label>
          <input
            className="shadow appearance-none border rounded-lg w-full py-3 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline text-black"
            id="phone-num"
            type="phone-num"
            name="phone-num"
            placeholder="0540000000"
            onChange={handlePhoneNum}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2" htmlFor="phone-num-2">
            رقم الجوال-٢ <span className="text-red-600">*</span>
          </label>
          <input
            className="shadow appearance-none border rounded-lg w-full py-3 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline text-black"
            id="phone-num-2"
            type="phone-num-2"
            name="phone-num-2"
            placeholder="0540000000"
            onChange={handlePhoneNum}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hov text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            تسجيل
          </button>
        </div>
      </form>
      <div className="flex items-center justify-center"></div>
    </div>
  );
}
