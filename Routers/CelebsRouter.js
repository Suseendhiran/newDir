import { getCelebById, deleteCelebById, updateCelebById } from "../helper.js";
import { client, app } from "../index.js";
import express from "express";

const router = express.Router();

async function findQueryFilter(filters) {
  console.log("filters", filters);
  let filterObject = { ...filters };
  if (Object.keys(filters).length) {
    return await client
      .db("guvi")
      .collection("celebs")
      .find({ ...filterObject })
      .toArray();
  } else {
    return await client.db("guvi").collection("celebs").find({}).toArray();
  }
}
router
  .route("/")
  .get(async (req, res) => {
    // console.log("mongo", client);
    // let query = req.query;
    // let queryKeys = Object.keys(req.query);
    // const celebDetails = queryKeys.length
    //   ? celebrities.filter((item) => {
    //       return queryKeys.every((key) => item[[key]] === query[key]);
    //     })
    //   : celebrities;
    const celebDetails = await findQueryFilter(req.query);
    celebDetails.length
      ? res.send(celebDetails)
      : res.status(404).send({ message: "No celebs found" });
  })
  .post(async (req, res) => {
    const data = req.body;
    console.log("recievd", data);
    const mongoRes = await client
      .db("guvi")
      .collection("celebs")
      .insertMany(data);
    res.send(mongoRes);
  });
router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    const celebDetails = await getCelebById(id);
    //console.log("ones", one);
    //const celebDetails = celebs.find((item, celebId) => item.id === id);
    celebDetails
      ? res.send(celebDetails)
      : res.status(404).send({ message: "No such data found" });
    res.send();
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    const mongoResponse = await deleteCelebById(id);

    res.send(mongoResponse);
  })
  .put(async (req, res) => {
    const { id } = req.params;
    const mongoResponse = await updateCelebById(id, req);
    if (mongoResponse.modifiedCount > 0) {
      let updatedRecord = await getCelebById(id);
      res.send(updatedRecord);
    } else {
      res.send({ message: "No record found" });
    }
  });

export const CelebsRouter = router;
