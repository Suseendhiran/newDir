import { client } from "./index.js";

async function updateCelebById(id, req) {
  return await client
    .db("guvi")
    .collection("celebs")
    .updateOne({ id: id }, { $set: { ...req.body } });
}
async function deleteCelebById(id) {
  return await client.db("guvi").collection("celebs").deleteOne({ id: id });
}
async function getCelebById(id) {
  return await client.db("guvi").collection("celebs").findOne({ id: id });
}

export { updateCelebById, deleteCelebById, getCelebById };
