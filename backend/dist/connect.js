"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUsers = exports.getUsers = void 0;
const postgres_js_1 = require("drizzle-orm/postgres-js");
const postgres_1 = __importDefault(require("postgres"));
const schema_1 = require("./schema");
const dotenv_1 = require("dotenv");
const drizzle_orm_1 = require("drizzle-orm");
(0, dotenv_1.config)();
const connect = () => {
    const client = (0, postgres_1.default)(process.env.DB_URL);
    const db = (0, postgres_js_1.drizzle)(client);
    return db;
};
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = connect();
    //   await db.insert(users).values({
    //     phone: "0500000000",
    //     fullName: "Jaafar",
    //   });
    const allUsers = yield db.select().from(schema_1.users);
    return allUsers;
});
exports.getUsers = getUsers;
const addUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const format = `${day}/${month}/${year} - ${hour}:${min}`;
    const sameDate = (time) => {
        return format.includes(time.split("-")[0]);
    };
    const db = connect();
    const result = yield db
        .select()
        .from(schema_1.users)
        .where((0, drizzle_orm_1.eq)(schema_1.users.id, "d95da9e1-1ba8-4e67-8ade-23ddceab550a"));
    if (!result[0]) {
        return null;
    }
    const checker = (_b = (_a = result[0]) === null || _a === void 0 ? void 0 : _a.dateTime) === null || _b === void 0 ? void 0 : _b.some(sameDate);
    if (checker) {
        const dateTimes = result[0].dateTime;
        dateTimes.pop();
        yield db
            .update(schema_1.users)
            .set({
            dateTime: dateTimes,
        })
            .where((0, drizzle_orm_1.eq)(schema_1.users.id, "d95da9e1-1ba8-4e67-8ade-23ddceab550a"));
        return;
    }
    yield db
        .update(schema_1.users)
        .set({
        dateTime: result[0].dateTime !== null
            ? [...result[0].dateTime, format]
            : [format],
    })
        .where((0, drizzle_orm_1.eq)(schema_1.users.id, "d95da9e1-1ba8-4e67-8ade-23ddceab550a"));
    return;
});
exports.addUsers = addUsers;
