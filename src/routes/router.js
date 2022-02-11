const { Serializer } = require(`jsonapi-serializer`);
const axios = require(`axios`);
const { Router } = require(`express`);
const router = Router();

const mysqlConnection = require(`../db/connectionSqlDb.js`);
const data2json = require(`../utils/json-parser`);
const query = require(`../utils/query-selector`);


router.get("/", (req, res) => {
  res.json("API");
});

router.get(`/users/comments`, (req, res) => {
  const { id } = req.query;
  let queryWhere = ``;
  id ? (queryWhere = `WHERE U.id = ${id}`) : (queryWhere = ``);
  mysqlConnection.query(query(0, queryWhere), (err, rows, fields) => {
    if (!err) {
      console.log(query(0, queryWhere));
      res.json(data2json(rows));
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
