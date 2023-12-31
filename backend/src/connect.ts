import { compareSync, hash } from "bcrypt";
import { config } from "dotenv";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { Org, User, orgs, users } from "./schema";
config();
const connect = () => {
  const client = postgres(process.env.DB_URL!);
  const db = drizzle(client);
  return db;
};
const getUsers = async (orgId: string) => {
  const db = connect();
  const allUsers = await db.select().from(users).where(eq(users.orgId, orgId));
  return allUsers;
};
const deleteUser = async (id: string, org: Org) => {
  const db = connect();
  await db.delete(users).where(and(eq(users.id, id), eq(users.orgId, org.id!)));
};
const getOrgByEmail = async (email: string) => {
  const db = connect();
  const org = await db
    .select()
    .from(orgs)
    .where(eq(orgs.email, email!.toLowerCase()));
  return org[0];
};

const getUsersByOrg = async (orgEmail: string) => {
  const db = connect();
  const org = await db.select().from(orgs).where(eq(orgs.email, orgEmail));
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
  const foundOrg = await getOrgByEmail(org);
  const db = connect();
  await db
    .insert(users)
    .values({
      fullName: user.fullName,
      phone: user.phone,
      dateTime: null,
      grade: user.grade,
      type: user.type,
      orgId: foundOrg.id,
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
const checkTodayAttendence = async (id: string, orgId: string) => {
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
    .where(and(eq(users.id, id), eq(users.orgId, orgId)));

  return result[0]?.dateTime?.some(sameDate);
};
const addAttendences = async (id: string, orgId: string) => {
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
    .where(and(eq(users.id, id), eq(users.orgId, orgId)));
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
      .where(and(eq(users.id, id), eq(users.orgId, orgId)));
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
    .where(and(eq(users.id, id), eq(users.orgId, orgId)));
  return;
};

export {
  addAttendences,
  addOrg,
  addUser,
  checkTodayAttendence,
  deleteUser,
  getOrg,
  getOrgByEmail,
  getUser,
  getUsers,
  getUsersByOrg,
};
