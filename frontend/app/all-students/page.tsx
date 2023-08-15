export default async function AllStudents() {
  const res = await fetch("http://localhost:8080/all-students", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Something went wrong!");
  }

  console.log("success");
  const data = await res.json();
  return <div>ALL STUDENTS HERE</div>;
}
