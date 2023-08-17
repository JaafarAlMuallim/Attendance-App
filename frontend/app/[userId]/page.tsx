export default function StudentPage({
  params,
}: {
  params: { userId: string };
}) {
  return (
    <div>
      <h1>Student Page {params.userId}</h1>
    </div>
  );
}
