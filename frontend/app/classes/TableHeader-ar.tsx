import {
  TableCaption,
  TableRow,
  TableHead,
  TableHeader,
} from "@/components/ui/table";

export default function TableHeaderAR() {
  return (
    <>
      <TableCaption>A List of All Users</TableCaption>
      <TableHeader>
        <TableRow className="border-black">
          <TableHead className="w-[200px]">الاسم</TableHead>
          <TableHead className="w-[200px]">رقم الجوال</TableHead>
          <TableHead className="w-[100px]">الدجة</TableHead>
          <TableHead className="w-[100px]">النوع</TableHead>
          <TableHead className="w-[200px]">الاجراءات</TableHead>
        </TableRow>
      </TableHeader>
    </>
  );
}
