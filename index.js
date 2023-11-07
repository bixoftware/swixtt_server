const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const pantryId = process.env.PANTRY_ID;
var response = {};

app.get("/view", (req, res) => {
  let tableID = req.query.t;

  fetch(`https://getpantry.cloud/apiv1/pantry/${pantryId}/basket/$${tableID}`)
    .then((recv) => {
      return recv.json();
    })
    .then((data) => {
      response = {
        type: "PASS",
        data: data,
      };
      res.json(response);
      console.log("Request Handling successful");
      console.log("Served time table with ID:", data.id);
      console.log("======");
    })
    .catch((err) => {
      response = {
        type: "FAIL",
        data: {},
      };
      res.json(response);
      console.log("Request Handling failed");
      console.error(err);
      console.log("======");
    });
});

app.listen(3000, () =>
  console.log("swixtt_server is running on port 3000. Pantry ID:", pantryId)
);
