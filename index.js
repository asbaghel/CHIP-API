const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "myfirstdb",
  password: "admin123",
  port: 5432,
});
client.connect().then(() => {
  console.log("Connected to PostgreSQL Server");
});

const app = express();

app.use(cors());
app.set("json spaces", 2);
app.use(bodyParser.json({ limit: "15mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/master", (req, res) => {
  let query = req.body.query;
  console.log({ query });

  client
    .query(query)
    .then((result) => {
      console.log({ query, result });
      res.json({ res: result });
    })
    .catch((err) => {
      console.error({ query, err });
      res.status(500).json({ err });
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
