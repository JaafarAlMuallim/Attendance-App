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
exports.getUsersByOrg = exports.getUsers = exports.getUser = exports.getOrg = exports.addUser = exports.addOrg = exports.addAttendences = void 0;
const bcrypt_1 = require("bcrypt");
const dotenv_1 = require("dotenv");
const drizzle_orm_1 = require("drizzle-orm");
const postgres_js_1 = require("drizzle-orm/postgres-js");
const postgres_1 = __importDefault(require("postgres"));
const schema_1 = require("./schema");
(0, dotenv_1.config)();
const connect = () => {
    const client = (0, postgres_1.default)(process.env.DB_URL);
    const db = (0, postgres_js_1.drizzle)(client);
    return db;
};
const getUsers = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const db = connect();
    const org = yield getOrgByEmail(email);
    const allUsers = yield db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.orgId, org.id));
    return allUsers;
});
exports.getUsers = getUsers;
const getOrgByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const db = connect();
    const org = yield db
        .select()
        .from(schema_1.orgs)
        .where((0, drizzle_orm_1.eq)(schema_1.orgs.email, email.toLowerCase()));
    return org[0];
});
const getUsersByOrg = (orgEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const db = connect();
    const org = yield db.select().from(schema_1.orgs).where((0, drizzle_orm_1.eq)(schema_1.orgs.email, orgEmail));
    return org[0];
});
exports.getUsersByOrg = getUsersByOrg;
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = connect();
    const user = yield db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, id));
    return user;
});
exports.getUser = getUser;
const addUser = ({ user, org }) => __awaiter(void 0, void 0, void 0, function* () {
    if (org === null) {
        throw new Error("No Associated Org With The Form, Check With Your instituation");
    }
    if (user.fullName.split(" ").length < 4) {
        throw new Error("Enter Your Full Name (4 Names At Least)");
    }
    if (user.phone.length !== 10) {
        throw new Error("Enter Your Phone Number (10 Characters long)");
    }
    const foundOrg = yield getOrgByEmail(org);
    const db = connect();
    yield db
        .insert(schema_1.users)
        .values({
        fullName: user.fullName,
        phone: user.phone,
        dateTime: null,
        grade: user.grade,
        type: user.type,
        orgId: foundOrg.id,
    })
        .onConflictDoNothing({ target: schema_1.users.fullName });
});
exports.addUser = addUser;
const addOrg = (org) => __awaiter(void 0, void 0, void 0, function* () {
    if (org.name.split(" ").length < 1) {
        throw new Error("Enter Your Orgnaization Name (At least 1 letter)");
    }
    if (!org.email.includes("@") && !org.email.includes(".com")) {
        throw new Error("Enter Your Organization Email Address Correctly");
    }
    const db = connect();
    const hashedPass = yield (0, bcrypt_1.hash)(org.password, 10);
    yield db
        .insert(schema_1.orgs)
        .values({
        name: org.name,
        email: org.email.toLowerCase(),
        password: hashedPass,
    })
        .onConflictDoNothing({ target: schema_1.orgs.email });
});
exports.addOrg = addOrg;
const getOrg = (org) => __awaiter(void 0, void 0, void 0, function* () {
    const db = connect();
    const foundOrg = yield db
        .select()
        .from(schema_1.orgs)
        .where((0, drizzle_orm_1.eq)(schema_1.orgs.email, org.email));
    if ((0, bcrypt_1.compareSync)(org.password, foundOrg[0].password)) {
        return foundOrg;
    }
    return [];
});
exports.getOrg = getOrg;
const addAttendences = (id) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, id));
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
            .where((0, drizzle_orm_1.eq)(schema_1.users.id, id));
        return;
    }
    yield db
        .update(schema_1.users)
        .set({
        dateTime: result[0].dateTime !== null
            ? [...result[0].dateTime, format]
            : [format],
    })
        .where((0, drizzle_orm_1.eq)(schema_1.users.id, id));
    return;
});
exports.addAttendences = addAttendences;
