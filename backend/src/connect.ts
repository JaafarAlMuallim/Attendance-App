import { compareSync, hash } from "bcrypt";
import { config } from "dotenv";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { Org, User, orgs, users } from "./schema";
config();
const connect = () => {
  const client = postgres(process.env.DB_URL!);
  const db = drizzle(client);
  return db;
};
const getUsers = async (email: string) => {
  const db = connect();
  const org = await getOrgByEmail(email);
  const allUsers = await db.select().from(users).where(eq(users.orgId, org.id));
  return allUsers;
};
const getOrgByEmail = async (email: string) => {
  const db = connect();
  const org = await db
    .select()
    .from(orgs)
    .where(eq(orgs.email, email!.toLowerCase()));
  return org[0];
};

const getUsersByOrg = async (orgId: string) => {
  const db = connect();
  const org = await db.select().from(orgs).where(eq(orgs.id, orgId));
  return org[0];
};

const getUser = async (id: string) => {
  const db = connect();
  const user = await db.select().from(users).where(eq(users.id, id));
  return user;
};

const addUser = async ({ user, org }: { user: User; org: string }) => {
  if (org === null) {
    throw new Error(
      "No Associated Org With The Form, Check With Your instituation"
    );
  }
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
      grade: user.grade,
      type: user.type,
    })
    .onConflictDoNothing({ target: users.fullName });
};
const addOrg = async (org: Org) => {
  if (org.name!.split(" ").length < 1) {
    throw new Error("Enter Your Orgnaization Name (At least 1 letter)");
  }
  if (!org.email.includes("@") && !org.email.includes(".com")) {
    throw new Error("Enter Your Organization Email Address Correctly");
  }
  const db = connect();
  const hashedPass = await hash(org.password, 10);
  await db
    .insert(orgs)
    .values({
      name: org.name!,
      email: org.email.toLowerCase(),
      password: hashedPass,
    })
    .onConflictDoNothing({ target: orgs.email });
};
const getOrg = async (org: Org) => {
  const db = connect();

  const foundOrg = await db
    .select()
    .from(orgs)
    .where(eq(orgs.email, org.email));
  if (compareSync(org.password, foundOrg[0].password!)) {
    return foundOrg;
  }
  return [];
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

export {
  addAttendences,
  addOrg,
  addUser,
  getOrg,
  getUser,
  getUsers,
  getUsersByOrg,
};
