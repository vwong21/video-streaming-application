require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const router = require("./router");

const app = express();

app.use(bodyparser.json());
app.use(cors());
app.use("/stream", router);

app.listen(3003, () => {
    console.log("Server is running on port 3003");
});
