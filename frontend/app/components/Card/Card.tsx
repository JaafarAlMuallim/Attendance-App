import User from "@/types/user";
import Link from "next/link";

export default function Card(props: { user: User }) {
  const { fullName, phone } = props.user;
  const name = fullName.split(" ");
  return (
    <Link href={`/${props.user.id}`}>
      <div className="bg-slate-500 flex mt-5 h-10 w-96 items-center justify-between rounded-md p-4">
        <h2 className="inline-block font-serif text-xl">
          {name[0]} {name[name.length - 1]}
        </h2>
        <span className="font-series text-lg">{phone}</span>
      </div>
    </Link>
  );
}
