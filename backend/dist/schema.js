"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.uuid)("id").primaryKey(),
    fullName: (0, pg_core_1.text)("full_name"),
    phone: (0, pg_core_1.varchar)("phone", { length: 10 }),
    dateTime: (0, pg_core_1.varchar)("date_time", { length: 60 }).array(),
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
