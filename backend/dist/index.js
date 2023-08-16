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
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const connect_1 = require("./connect");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = process.env.PORT;
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const allUsers = yield (0, connect_1.getUsers)(email);
    res.send(allUsers);
}));
app.post("/add-attendence", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    (0, connect_1.addAttendences)(email);
    const allUsers = yield (0, connect_1.getUsers)(email);
    res.send(allUsers);
}));
app.get("/find-user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    //   const user = await getUser(id);
    const user = yield (0, connect_1.getUser)("bee1615d-4e02-4f61-9323-d84567aa1ba0");
    res.send(user);
}));
app.get("/all-students/:email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const students = yield (0, connect_1.getUsers)(email);
    res.send(students);
}));
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    yield (0, connect_1.addOrg)({ name, email, password });
    const org = yield (0, connect_1.getOrg)({ email, password });
    res.send(org[0]);
}));
app.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const org = yield (0, connect_1.getOrg)({ email, password });
    res.send(org[0]);
}));
app.post("/reg-user/:org", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { org } = req.params;
    const { fullName, phone, grade, type } = req.body;
    const user = {
        fullName: fullName.trim(),
        phone: phone.trim(),
        grade: grade.trim(),
        type: type.trim(),
    };
    yield (0, connect_1.addUser)({ user, org });
    const users = yield (0, connect_1.getUsersByOrg)(org);
    res.send(users);
}));
app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});
