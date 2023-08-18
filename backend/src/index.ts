import cors from "cors";
import express, { Request, Response } from "express";
import {
  addAttendences,
  addOrg,
  addUser,
  checkTodayAttendence,
  deleteUser,
  getOrg,
  getOrgByEmail,
  getUsers,
  getUsersByOrg,
} from "./connect";
import { User } from "./schema";
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;
app.get("/", async (req: Request, res: Response) => {
  const { email } = req.body;
  const org = await getOrgByEmail(email);
  const allUsers = await getUsers(org.id);
  res.send(allUsers);
});
app.get("/all-students/:email", async (req: Request, res: Response) => {
  const { email } = req.params;
  console.log(email);
  const org = await getOrgByEmail(email);
  const students = await getUsers(org.id);
  res.send(students);
});
app.get("/check-attendence/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const email = req.query.email! as string;
  const org = await getOrgByEmail(email);
  const attended = await checkTodayAttendence(id, org.id);
  console.log(attended);
  res.send({ attended });
});
app.post("/signup", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  await addOrg({ name, email, password });
  const org = await getOrg({ email, password });
  res.send(org[0]);
});
app.post("/signin", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const org = await getOrg({ email, password });
  res.send({ status: 200, message: "success" });
});
app.post("/delete-user/:id", async (req: Request, res: Response) => {
  const email: string = req.query.email as string;
  const { id } = req.params;
  const org = await getOrgByEmail(email);
  await deleteUser(id, org);
  res.send({ status: 200, message: "success" });
});
app.post("/attend-user/:id", async (req: Request, res: Response) => {
  const email: string = req.query.email as string;
  const { id } = req.params;
  const org = await getOrgByEmail(email);
  await addAttendences(id, org.id);
  res.send({ status: 200, message: "success" });
});
app.post("/reg-user/:org", async (req: Request, res: Response) => {
  const { org } = req.params;
  const { fullName, phone, grade, type } = req.body as {
    fullName: string;
    phone: string;
    grade: string;
    type: string;
  };
  const user: User = {
    fullName: fullName.trim(),
    phone: phone.trim(),
    grade: grade.trim(),
    type: type.trim(),
  };
  await addUser({ user, org });
  const users = await getUsersByOrg(org);
  res.send(users);
});
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
