import { pgTable, serial, text, uuid, varchar } from "drizzle-orm/pg-core";
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  fullName: text("full_name").unique().notNull(),
  phone: varchar("phone", { length: 10 }).notNull(),
  dateTime: varchar("date_time", { length: 60 }).array(),
});

export interface user {
  fullName: string;
  phone: string;
  dateTime?: string[];
  id?: string;
}
