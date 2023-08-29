import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import User from "@/types/user";

export default function TableAR({ users }: { users: User[] }) {
  return (
    <Table>
      <TableCaption>قائمة اسماء المستخدمين</TableCaption>
      <TableHeader>
        <TableRow className="border-black">
          <TableHead className="w-[200px]">الاسم</TableHead>
          <TableHead className="w-[200px]">رقم الجوال</TableHead>
          <TableHead className="w-[100px]">درجة المستخدم</TableHead>
          <TableHead className="w-[100px]">النوع</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => {
          const name = user.fullName.split(" ");
          return (
            <TableRow key={user.id} className="border-black">
              <TableCell className="font-medium">
                {name[0]} {name[name.length - 1]}{" "}
              </TableCell>
              <TableCell className="font-medium">{user.phone}</TableCell>
              <TableCell className="font-medium">
                {user.grade
                  ? `${
                      user.grade.charAt(0).toUpperCase() + user.grade.slice(1)
                    }`
                  : "None"}
              </TableCell>
              <TableCell className="font-medium">
                {user.type
                  ? `${user.type.charAt(0).toUpperCase() + user.type.slice(1)}`
                  : "None"}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
