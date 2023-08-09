import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { users, user } from "./schema";
import { config } from "dotenv";
import { eq, not } from "drizzle-orm";
config();
const connect = () => {
  const client = postgres(process.env.DB_URL!);
  const db = drizzle(client);
  return db;
};
const getUsers = async () => {
  const db = connect();
  const allUsers = await db.select().from(users);
  return allUsers;
};

const getUser = async (id: string) => {
  const db = connect();
  const user = await db.select().from(users).where(eq(users.id, id));
  return user;
};

const addUser = async (user: user) => {
  if (user.fullName.split(" ").length < 4) {
    throw new Error("Enter Your Full Name (4 Names At Least)");
  }
  if (user.phone.length !== 10) {
    throw new Error("Enter Your Phone Number (10 Characters long)");
  }
  const db = connect();
  await db
    .insert(users)
    .values({
      fullName: user.fullName,
      phone: user.phone,
      dateTime: null,
    })
    .onConflictDoNothing({ target: users.fullName });
};

const addAttendences = async (id: string) => {
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
  const result = await db.select().from(users).where(eq(users.id, id));
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
      .where(eq(users.id, id));
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
    .where(eq(users.id, id));
  return;
};

export { getUsers, addAttendences, addUser, getUser };
