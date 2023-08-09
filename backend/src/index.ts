import express, { Express, Request, Response } from "express";
import { getUsers, addUsers } from "./connect";
const app = express();

const port = 8080;

app.get("/", async (req: Request, res: Response) => {
  const allUsers = await getUsers();
  res.send(allUsers);
});

app.get("/add", async (req: Request, res: Response) => {
  await addUsers();
  const allUsers = await getUsers();
  res.send(allUsers);
});

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
