import {
  TableCaption,
  TableRow,
  TableHead,
  TableHeader,
} from "@/components/ui/table";

export default function TableHeaderEN() {
  return (
    <>
      <TableCaption>A List of All Users</TableCaption>
      <TableHeader>
        <TableRow className="border-black">
          <TableHead className="w-[200px]">Name</TableHead>
          <TableHead className="w-[200px]">Phone Number</TableHead>
          <TableHead className="w-[100px]">Grade</TableHead>
          <TableHead className="w-[100px]">Type</TableHead>
          <TableHead className="w-[200px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
    </>
  );
}
