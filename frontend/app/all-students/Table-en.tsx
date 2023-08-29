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

export default function TableEN({ users }: { users: User[] }) {
  return (
    <Table>
      <TableCaption>A List of All Users</TableCaption>
      <TableHeader>
        <TableRow className="border-black">
          <TableHead className="w-[200px]">Name</TableHead>
          <TableHead className="w-[200px]">Phone Number</TableHead>
          <TableHead className="w-[100px]">Grade</TableHead>
          <TableHead className="w-[100px]">Type</TableHead>
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
