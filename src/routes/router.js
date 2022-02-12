const { Router } = require(`express`);
const router = Router();

const mysqlConnection = require(`../db/connectionSqlDb`);
// const jsonConnection = require(`../db/connectionJsonDb`);
const data2json = require(`../utils/json-parser`);
const query = require(`../utils/query-selector`);
const jsonapiFormat = require(`../utils/jsonapi-serializer`);

router.get(`/`, async (req, res) => {
  res.json(`API REST Movies`);
});


router.get(`/users/comments`, (req, res) => {
  const { id } = req.query;
  let queryWhere = ``;
  id ? (queryWhere = `WHERE U.id = ${id}`) : (queryWhere = ``);
  mysqlConnection.query(query(0, queryWhere), (err, rows, fields) => {
    if (!err) {
      const serialized = jsonapiFormat(data2json(rows), `users`);
      res.json(serialized);
    } else {
      console.log(err);
    }
  });
});

router.get(`/public-posts/some-comments`, (req, res) => {
  mysqlConnection.query(query(1, ``), (err, rows, fields) => {
    if (!err) {
      const serialized = jsonapiFormat(data2json(rows), `posts`);
      res.json(serialized);
    } else {
      console.log(err);
    }
  });
});

router.get(`/private-posts`, (req, res) => {
  mysqlConnection.query(query(2, ``), (err, rows, fields) => {
    if (!err) {
      const serialized = rows;
      res.json(serialized);
    } else {
      console.log(err);
    }
  });
});

router.get(`/post`, (req, res) => {
  const { id } = req.query;
  const user_id = 0;
  let queryWhere = ``;
  if (true) {
    queryWhere = `WHERE P.id = ${id} AND P.is_published = 1`
  }
  else if (true) {
    queryWhere = `WHERE P.id = ${id} AND P.is_published = 0 AND user_id = ${user_id}`
  }
  mysqlConnection.query(query(3, queryWhere), (err, rows, fields) => {
      if (!err) {
        const serialized = jsonapiFormat(rows);
        console.log(serialized);
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});

router.post(`/post`, (req, res) => {
  const {title, body, slug, is_published} = req.body;
  const user_id = 0;
  const str = `${user_id}, ${title}, ${body}, ${slug}, ${is_published}`;
  mysqlConnection.query(query(4, str), (err, rows, fields) => {
      if (!err) {
        const serialized = jsonapiFormat(rows);
        console.log(serialized);
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});

router.put(`/post`, (req, res) => {
  const {title, body, slug, is_published} = req.body;
  const user_id = 0;
  const { id } = req.query;
  mysqlConnection.query(query(5, ``),[title,body,slug,is_published,user_id,id], (err, rows, fields) => {
      if (!err) {
        const serialized = jsonapiFormat(rows);
        console.log(serialized);
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});

router.delete(`/post`, (req, res) => {
  const user_id = 0;
  const { id } = req.query;
  mysqlConnection.query(query(6, ``),[user_id,id], (err, rows, fields) => {
      if (!err) {
        const serialized = jsonapiFormat(rows);
        console.log(serialized);
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
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
