import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { users } from "./schema";
import { config } from "dotenv";
import { eq } from "drizzle-orm";
config();
const connect = () => {
  const client = postgres(process.env.DB_URL!);
  const db = drizzle(client);
  return db;
};
const getUsers = async () => {
  const db = connect();
  //   await db.insert(users).values({
  //     phone: "0500000000",
  //     fullName: "Jaafar",
  //   });
  const allUsers = await db.select().from(users);
  return allUsers;
};

const addUsers = async () => {
  const date = new Date();
  const hour = date.getHours();
  const min =
    date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const format = `${day}/${month}/${year} - ${hour}:${min}`;
  const sameDate = (time: string) => {
    return format.includes(time.split("-")[0]);
  };
  const db = connect();
  const result = await db
    .select()
    .from(users)
    .where(eq(users.id, "d95da9e1-1ba8-4e67-8ade-23ddceab550a"));
  if (!result[0]) {
    return null;
  }
  const checker = result[0]?.dateTime?.some(sameDate);
  if (checker) {
    const dateTimes = result[0].dateTime!;
    dateTimes.pop();
    await db
      .update(users)
      .set({
        dateTime: dateTimes,
      })
      .where(eq(users.id, "d95da9e1-1ba8-4e67-8ade-23ddceab550a"));
    return;
  }
  await db
    .update(users)
    .set({
      dateTime:
        result[0].dateTime !== null
          ? [...result[0].dateTime!, format]
          : [format],
    })
    .where(eq(users.id, "d95da9e1-1ba8-4e67-8ade-23ddceab550a"));
  return;
};

export { getUsers, addUsers };
