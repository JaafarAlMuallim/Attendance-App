import { pgTable, serial, text, uuid, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  fullName: text("full_name"),
  phone: varchar("phone", { length: 10 }),
  dateTime: varchar("date_time", { length: 60 }).array(),
});

// export const userRelation = relations(users, ({ many }) => ({
//   attendences: many(attendences),
// }));

// export const attendences = pgTable("attendences", {
//   id: serial("id").primaryKey(),
//   dateTime: varchar("date_time", { length: 60 }).array(),
//   userId: uuid("user_id"),
// });

// export const attendenceRelation = relations(attendences, ({ one }) => ({
//   user: one(users, {
//     fields: [attendences.userId],
//     references: [users.id],
//   }),
// }));
