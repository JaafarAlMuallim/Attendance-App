import { relations } from "drizzle-orm";
import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
export const orgs = pgTable("orgs", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").unique().notNull().unique(),
  password: varchar("password").notNull(),
  email: varchar("email").unique().notNull(),
});
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  fullName: text("full_name").unique().notNull(),
  phone: varchar("phone", { length: 10 }).notNull(),
  dateTime: varchar("date_time", { length: 60 }).array(),
  orgId: uuid("org_id").references(() => orgs.id),
  type: varchar("type", { length: 20 }),
  grade: varchar("grade", { length: 20 }),
});

export const usersRelations = relations(users, ({ one }) => ({
  org: one(orgs, {
    fields: [users.orgId],
    references: [orgs.id],
  }),
}));
export interface User {
  fullName: string;
  phone: string;
  dateTime?: string[];
  id?: string;
  type?: string;
  grade?: string;
}

export interface Org {
  name?: string;
  email: string;
  password: string;
  id?: string;
}
