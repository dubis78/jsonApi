const { Serializer } = require(`jsonapi-serializer`);
const axios = require(`axios`);
const { Router } = require(`express`);
const router = Router();

const mysqlConnection = require(`../db/connectionSqlDb`);

router.get("/", (req, res) => {
  res.json("API");
});

module.exports = router;
