const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
var response = {};

app.get("/", (req, res) => {
  let tableID = req.query.t;

  fetch(
    `https://getpantry.cloud/apiv1/pantry/339ed5fe-a063-4aea-aed8-424e2637273a/basket/${tableID}`
  )
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

app.listen(3000, () => console.log("swixtt_server is running on port 3000"));
