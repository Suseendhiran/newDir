import { client } from "./index.js";
import { ObjectId } from "mongodb";

async function updateCelebById(id, req) {
  delete req.body._id;

  return await client
    .db("guvi")
    .collection("celebs")
    .updateOne({ _id: ObjectId(id) }, { $set: req.body });
}
async function deleteCelebById(id) {
  return await client
    .db("guvi")
    .collection("celebs")
    .deleteOne({ _id: ObjectId(id) });
}
async function getCelebById(id) {
  console.log("from get", id, typeof ObjectId(id), typeof id);
  return await client
    .db("guvi")
    .collection("celebs")
    .findOne({ _id: ObjectId(id) });
}

export { updateCelebById, deleteCelebById, getCelebById };
