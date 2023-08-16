import cors from "cors";
import express, { Request, Response } from "express";
import {
  addAttendences,
  addOrg,
  addUser,
  getOrg,
  getUser,
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
  const allUsers = await getUsers(email);
  res.send(allUsers);
});

app.post("/add-attendence", async (req: Request, res: Response) => {
  const { email } = req.body;
  addAttendences(email);
  const allUsers = await getUsers(email);
  res.send(allUsers);
});
app.get("/find-user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  //   const user = await getUser(id);
  const user = await getUser("bee1615d-4e02-4f61-9323-d84567aa1ba0");
  res.send(user);
});

app.get("/all-students/:email", async (req: Request, res: Response) => {
  const { email } = req.params;
  const students = await getUsers(email);
  res.send(students);
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
  res.send(org[0]);
});
app.post("/reg-user/:org", async (req: Request, res: Response) => {
  const { org } = req.params;
  const { fullName, phone, grade, type } = req.body;
  const user: User = {
    fullName,
    phone,
    grade,
    type,
  };
  await addUser({ user, org });
  const users = await getUsersByOrg(org);
  res.send(users);
});
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
