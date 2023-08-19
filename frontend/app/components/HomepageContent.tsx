import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import User from "@/types/user";

export default function HomePageContent({
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
          <CardTitle>Total Users</CardTitle>
          <CardDescription>
            Number of users in your organizations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{email ? users.length : "313"}</p>
        </CardContent>
      </Card>
      <Card className="order-2">
        <CardHeader>
          <CardTitle>Seniors</CardTitle>
          <CardDescription>Number of Seniors</CardDescription>
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
          <CardTitle>Juniors</CardTitle>
          <CardDescription>Number of Seniors</CardDescription>
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
          <CardTitle>Fresh</CardTitle>
          <CardDescription>
            Number of Entry Levels and Freshmans
          </CardDescription>
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
