const axios = require(`axios`);
const { Router } = require(`express`);
const router = Router();

const mysqlConnection = require(`../db/connectionSqlDb.js`);
const data2json = require(`../utils/json-parser`);
const query = require(`../utils/query-selector`);
const jsonapiFormat = require(`../utils/jsonapi-serializer`);


router.get("/", (req, res) => {
  res.json("API");
});

router.get(`/users/comments`, (req, res) => {
  const { id } = req.query;
  let queryWhere = ``;
  id ? (queryWhere = `WHERE U.id = ${id}`) : (queryWhere = ``);
  mysqlConnection.query(query(0, queryWhere), (err, rows, fields) => {
    if (!err) {
      const serialized = jsonapiFormat(data2json(rows),`users`);
      res.json(serialized);
    } else {
      console.log(err);
    }
  });
});

router.post(`/register/`, (req, res) => {
  const { e_mail, password } = req.body;
  mysqlConnection.query(
    `INSERT INTO users (e_mail, password) VALUES ('${e_mail}', '${password}')`,
    (err, rows, fields) => {
      if (!err) {
        res.json({ message: `Usuario registrado` });
      } else {
        res.json({ message: `Usuario no registrado` });
      }
    }
  );
});

router.post(`/login/`, (req, res) => {
  const { e_mail, password } = req.body;
  mysqlConnection.query(
    `SELECT * FROM users WHERE e_mail='${e_mail}' AND password='${password}'`,
    (err, rows, fields) => {
      if (err) {
        res.json({ message: `Error` });
        return console.log(err.message);
      }
      if (rows.length > 0) {
        res.json({ message: `Welcome` });
      } else {
        res.json({
          message: `email or password no not match`
        });
      }
    }
  );
});

module.exports = router;
