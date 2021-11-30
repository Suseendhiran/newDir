import express from "express";
import { MongoClient } from "mongodb";
const app = express();
app.listen(4000);
app.use(express.json());
const MONGO_URL = "mongodb://localhost";
async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Connected");
  return client;
}
const client = await createConnection();
app.get("/", (req, res) => {
  res.send("Express started");
});
const celebs = [
  {
    id: "104",
    name: "Rajinikanth ",
    imageUrl:
      "https://images.news18.com/ibnlive/uploads/2021/07/1625107981_rajinikanth.jpg",
    about:
      "Rajinikanth was born as Shivaji Rao Gaekwad on 12 December 1950 in a Marathi family in Bangalore, Mysore State ",
    wikiUrl: "https://en.wikipedia.org/wiki/Rajinikanth",
    gender: "male",
    country: "india",
  },
  {
    id: "105",
    name: "Robert Downey Jr",
    imageUrl:
      "https://www.cheatsheet.com/wp-content/uploads/2020/11/Marvel-star-Robert-Downey-Jr.jpg",
    about:
      "Robert John Downey Jr. (born April 4, 1965)[1] is an American actor and producer. His career has been characterized by critical and popular success in his youth, followed by a period of substance abuse and legal troubles, before a resurgence of commercial success later in his career",
    wikiUrl: "https://en.wikipedia.org/wiki/Robert_Downey_Jr.",
    gender: "male",
    country: "america",
  },
  {
    id: "106",
    name: "Tom Holland",
    imageUrl:
      "https://www.gannett-cdn.com/-mm-/cc053686530ce446f0a27dc352961fac33dd12ac/c=1144-81-2630-920/local/-/media/2017/06/26/USATODAY/USATODAY/636340759929048028-XXX-SPIDER-MAN-HOMECOMING-87249008.JPG",
    about:
      "Thomas Stanley Holland (born 1 June 1996)[1] is an English actor. A graduate of the BRIT School for Performing Arts and Technology in London, he began his acting career on London stage in the title role of Billy Elliot the Musical in the West End theatre from 2008 to 2010. ",
    wikiUrl: "https://en.wikipedia.org/wiki/Tom_Holland",
    gender: "male",
    country: "america",
  },
  {
    name: "Freddie highmore",
    about:
      "Alfred Thomas Highmore[1] (born 14 February 1992) is an English actor. He made his debut in the comedy film Women Talking Dirty (1999). He is known for his starring roles in the films Finding Neverland (2004), Charlie and the Chocolate Factory (2005), August Rush (2007), and The Spiderwick Chronicles (2008). He won two consecutive Critics' Choice Movie Awards for Best Young Performer.",
    wikiUrl: "https://en.wikipedia.org/wiki/Freddie_Highmore",
    imageUrl:
      "https://www.tvinsider.com/wp-content/uploads/2021/05/the-good-doctor-freddie-highmore-2.jpg",
    id: "112",
    gender: "male",
    country: "america",
  },

  {
    name: "Hugh Laurie",
    about:
      "James Hugh Calum Laurie CBE (/ˈlɒri/; born 11 June 1959) is an English actor, author, comedian, director, musician, and singer. He is known for portraying the title character on the medical drama television series House (2004–2012), for which he received two Golden Globe Awards and nominations for numerous other accolades",
    wikiUrl: "https://en.wikipedia.org/wiki/Hugh_Laurie",
    imageUrl:
      "https://prd-rteditorial.s3.us-west-2.amazonaws.com/wp-content/uploads/2019/11/15205449/House-hugh-laurie-600x314.jpg",
    id: "113",
    gender: "male",
    country: "america",
  },
  {
    name: "Vera Fermiga",
    about:
      "Vera Ann Farmiga[1] (/fɑːrˈmiːɡə/; born August 6, 1973) is an american actress, director, and producer. She began her professional acting career on stage in the original Broadway production of Taking Sides (1996). Farmiga made her television debut in the Fox fantasy adventure series Roar (1997), and her feature film debut in the drama-thriller Return to Paradise (1998).",
    wikiUrl: "https://en.wikipedia.org/wiki/Vera_Farmiga",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb0RsRcI5tT_RB7H0zN_OGv_ixHSf1KCq8TQ&usqp=CAU",
    id: "114",
    gender: "female",
    country: "america",
  },
];
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
app.get("/celebs", async (req, res) => {
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
});
app.post("/celebs", async (req, res) => {
  const data = req.body;
  //console.log("recievd", data);
  const mongoRes = await client
    .db("guvi")
    .collection("celebs")
    .insertMany(data);
  res.send(mongoRes);
});
app.get("/celeb/:id", async (req, res) => {
  const { id } = req.params;
  const celebDetails = await client
    .db("guvi")
    .collection("celebs")
    .find({ id: id })
    .toArray();
  //console.log("ones", one);
  //const celebDetails = celebs.find((item, celebId) => item.id === id);
  celebDetails
    ? res.send(celebDetails)
    : res.status(404).send({ message: "No such data found" });
  res.send();
});
