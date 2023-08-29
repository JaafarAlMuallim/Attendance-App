import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import User from "@/types/user";
import React from "react";

export default function HomePageContentAR({
  users,
  email,
}: {
  users: User[];
  email: string;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 order-2 my-20">
      <Card className="order-2">
        <CardHeader>
          <CardTitle>عدد المستخدمين</CardTitle>
          <CardDescription>عدد المستخدمين الكلي في النظام</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{email ? users.length : "313"}</p>
        </CardContent>
      </Card>
      <Card className="order-2">
        <CardHeader>
          <CardTitle>ثالث ثانوي</CardTitle>
          <CardDescription>عدد متسخدمين ثالث ثانوي الكلي</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">
            {email
              ? users.filter((user) => user.grade === "senior").length
              : "313"}
          </p>
        </CardContent>
      </Card>
      <Card className="order-3">
        <CardHeader>
          <CardTitle>ثاني ثانوي</CardTitle>
          <CardDescription>عدد ثاني ثانوي الكلي</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">
            {email
              ? users.filter((user) => user.grade === "junior").length
              : "313"}
          </p>
        </CardContent>
      </Card>
      <Card className="order-4">
        <CardHeader>
          <CardTitle>اول ثانوي</CardTitle>
          <CardDescription>عدد اول ثانوي الكلي</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">
            {email
              ? users.filter((user) => user.grade === "freshman").length
              : "313"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
