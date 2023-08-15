import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  fullName: text("full_name").unique().notNull(),
  phone: varchar("phone", { length: 10 }).notNull(),
  dateTime: varchar("date_time", { length: 60 }).array(),
});

export const orgs = pgTable("orgs", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").unique().notNull().unique(),
  password: varchar("password"),
  email: varchar("email"),
});
export interface User {
  fullName: string;
  phone: string;
  dateTime?: string[];
  id?: string;
}

export interface Org {
  name?: string;
  email: string;
  password: string;
  id?: string;
}
