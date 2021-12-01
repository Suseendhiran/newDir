import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { CelebsRouter } from "./Routers/CelebsRouter.js";
dotenv.config();

export const app = express();

app.listen(4000);
app.use(express.json());

//const MONGO_URL = "mongodb://localhost";

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Connected");
  return client;
}
export const client = await createConnection();
app.get("/", (req, res) => {
  res.send("Express started");
});

app.use("/celebs", CelebsRouter);
