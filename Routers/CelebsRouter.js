import { getCelebById, deleteCelebById, updateCelebById } from "../helper.js";
import { client } from "../index.js";
import express from "express";
import { auth } from "../Middleware/auth.js";

const router = express.Router();

async function findQueryFilter(filters) {
  let filterObject = { ...filters };
  if (Object.keys(filters).length) {
    return await client
      .db("celebrities")
      .collection("celebs")
      .find({ ...filterObject })
      .toArray();
  } else {
    return await client
      .db("celebrities")
      .collection("celebs")
      .find({})
      .toArray();
  }
}
router
  .route("/")
  .get(auth, async (req, res) => {
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
  .post(auth, async (req, res) => {
    const data = req.body;
    const mongoRes = await client
      .db("celebrities")
      .collection("celebs")
      .insertOne(data);

    if (mongoRes.acknowledged) {
      res.send({ status: mongoRes, message: "Celebrity Successfully Added" });
    }
  });
router
  .route("/:id")
  .get(auth, async (req, res) => {
    const { id } = req.params;
    const celebDetails = await getCelebById(id);
    // console.log("ones", id, celebDetails);
    //const celebDetails = celebs.find((item, celebId) => item.id === id);
    celebDetails
      ? res.send(celebDetails)
      : res.status(404).send({ message: "No such data found" });
    res.send();
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    const mongoResponse = await deleteCelebById(id);

    res.send({
      message: "Celebrity Successfully Deleted",
    });
  })
  .put(auth, async (req, res) => {
    const { id } = req.params;
    // console.log("updateid", id, req.body);
    const mongoResponse = await updateCelebById(id, req);

    if (mongoResponse.acknowledged) {
      let updatedRecord = await getCelebById(id);

      res.send({
        celebrity: updatedRecord,
        message: "Celebrity info Succesfully Updated",
      });
    } else {
      res.send({ message: "No record found" });
    }
  });

export const CelebsRouter = router;
