"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRelations = exports.users = exports.orgs = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
exports.orgs = (0, pg_core_1.pgTable)("orgs", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    name: (0, pg_core_1.text)("name").unique().notNull().unique(),
    password: (0, pg_core_1.varchar)("password").notNull(),
    email: (0, pg_core_1.varchar)("email").unique().notNull(),
});
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    fullName: (0, pg_core_1.text)("full_name").unique().notNull(),
    phone: (0, pg_core_1.varchar)("phone", { length: 10 }).notNull(),
    dateTime: (0, pg_core_1.varchar)("date_time", { length: 60 }).array(),
    orgId: (0, pg_core_1.uuid)("org_id").references(() => exports.orgs.id),
    type: (0, pg_core_1.varchar)("type", { length: 20 }),
    grade: (0, pg_core_1.varchar)("grade", { length: 20 }),
});
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.users, ({ one }) => ({
    org: one(exports.orgs, {
        fields: [exports.users.orgId],
        references: [exports.orgs.id],
    }),
}));
