import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";

export default function LoadingTable() {
  return (
    <motion.div
      className="flex flex-col justify-center items-center my-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <Table>
        <TableCaption>A List of All Users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead className="w-[200px]">Phone</TableHead>
            <TableHead className="w-[100px]">Grade</TableHead>
            <TableHead className="w-[100px]">Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {new Array(15).fill(0, 0, 10).map((_, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">
                <Skeleton className="h-4 w-[200px] bg-slate-600"></Skeleton>
              </TableCell>

              <TableCell className="font-medium">
                <Skeleton className="h-4 w-[200px] bg-slate-600"></Skeleton>
              </TableCell>
              <TableCell className="font-medium">
                <Skeleton className="h-4 w-[100px] bg-slate-600"></Skeleton>
              </TableCell>
              <TableCell className="font-medium">
                <Skeleton className="h-4 w-[100px] bg-slate-600"></Skeleton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}
