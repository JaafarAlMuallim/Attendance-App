import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingHomeContent() {
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
          <Skeleton className="bg-gray-600 h-4 w-[40px]" />
        </CardContent>
      </Card>
      <Card className="order-2">
        <CardHeader>
          <CardTitle>Seniors</CardTitle>
          <CardDescription>Number of Seniors</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="bg-gray-600 h-4 w-[40px]" />
        </CardContent>
      </Card>
      <Card className="order-3">
        <CardHeader>
          <CardTitle>Juniors</CardTitle>
          <CardDescription>Number of Seniors</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="bg-gray-600 h-4 w-[40px]" />
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
          <Skeleton className="bg-gray-600 h-4 w-[40px]" />
        </CardContent>
      </Card>
    </div>
  );
}
