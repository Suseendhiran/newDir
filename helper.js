import { client } from "./index.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

async function updateCelebById(id, req) {
  delete req.body._id;
  console.log("new", id);
  return await client
    .db("celebrities")
    .collection("celebs")
    .updateOne({ _id: ObjectId(id) }, { $set: req.body });
}
async function deleteCelebById(id) {
  return await client
    .db("celebrities")
    .collection("celebs")
    .deleteOne({ _id: ObjectId(id) });
}
async function getCelebById(id) {
  console.log("from get", id, typeof ObjectId(id), typeof id);
  return await client
    .db("celebrities")
    .collection("celebs")
    .findOne({ _id: ObjectId(id) });
}

async function createUser(userDetails) {
  return await client
    .db("celebrities")
    .collection("users")
    .insertOne(userDetails);
}
async function getUserByUserName(userName) {
  return await client
    .db("celebrities")
    .collection("users")
    .findOne({ userName: userName });
}
async function generateHashPassword(password) {
  let saltRounds = 10;
  const saltedPassword = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, saltedPassword);
  return hashedPassword;
}

export {
  updateCelebById,
  deleteCelebById,
  getCelebById,
  createUser,
  generateHashPassword,
  getUserByUserName,
};
