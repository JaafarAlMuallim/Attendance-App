"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    fullName: (0, pg_core_1.text)("full_name").unique().notNull(),
    phone: (0, pg_core_1.varchar)("phone", { length: 10 }).notNull(),
    dateTime: (0, pg_core_1.varchar)("date_time", { length: 60 }).array(),
});
