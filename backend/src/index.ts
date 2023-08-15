import cors from "cors";
import express, { Request, Response } from "express";
import {
  addAttendences,
  addOrg,
  addUser,
  getOrg,
  getUser,
  getUsers,
} from "./connect";
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;
app.get("/", async (req: Request, res: Response) => {
  const allUsers = await getUsers();
  res.send(allUsers);
});

app.post("/add-user", async (req: Request, res: Response) => {
  const { fullName, phone } = req.body;
  try {
    await addUser({
      //   fullName: fullName,
      //   phone: phone,
      fullName: "Carlos Michael Andrea Snow",
      phone: "0500000000",
    });
    res.send("PASSED");
    return;
  } catch (e: any) {
    console.log(e.message);
    res.send(e.message);
    return;
  }
});

app.post("/add-attendence", async (req: Request, res: Response) => {
  const { id } = req.body;
  //   await addAttendences(id);
  await addAttendences("bee1615d-4e02-4f61-9323-d84567aa1ba0");
  const allUsers = await getUsers();
  res.send(allUsers);
});
app.get("/find-user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  //   const user = await getUser(id);
  const user = await getUser("bee1615d-4e02-4f61-9323-d84567aa1ba0");
  res.send(user);
});

app.get("/all-students", async (req: Request, res: Response) => {
  const students = await getUsers();
  res.send(students);
});
app.post("/signup", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  await addOrg({ name, email, password });
  const org = await getOrg({ email, password });
  res.send(org);
});
app.post("/signin", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const org = await getOrg({ email, password });
  res.send(org);
});
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
