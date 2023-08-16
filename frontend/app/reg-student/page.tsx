import RegFormAR from "./RegForm-ar";
import RegFormEN from "./RegForm-en";

export default function RegisterPage() {
  return (
    <div
      dir="rtl"
      className="flex justify-center my-20 bg-slate-500 bg-opacity-30 rounded-xl mx-5 md:rounded-2xl md:mx-96"
    >
      <RegFormEN />
      <RegFormAR />
    </div>
  );
}
