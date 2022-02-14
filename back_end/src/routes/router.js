const { Router } = require(`express`);
const router = Router();

const mysqlConnection = require(`../db/connectionSqlDb`);
// const jsonConnection = require(`../db/connectionJsonDb`);
const data2json = require(`../utils/json-parser`);
const query = require(`../utils/query-selector`);
const jsonapiFormat = require(`../utils/jsonapi-serializer`);
const urlGenerator = require(`../utils/url-generator`);

router.get(`/`, async (req, res) => {
  res.json(`API REST Movies`);
});

router.get(`/public-posts-some-comments`, (req, res) => {
  let url = {};
  url.self = urlGenerator(req);
  mysqlConnection.query(query(1, ``), (err, rows, fields) => {
    if (!err) {
      if (rows.length > 0) {
        const filtData = data2json(rows).map((element) => {
          element.tolt_comments = element.comments.length;
          element.comments.splice(5);
          return element;
        });
        const serialized = jsonapiFormat(
          filtData,
          `posts`,
          false,
          null,
          true,
          url
        );
        res.json(serialized);
      } else {
        res.status(404).json(`Data Not Found`);
      }
    } else {
      res.status(500).json(err.code);
    }
  });
});

router.get(`/private-posts`, (req, res) => {
  let url = {};
  url.self = urlGenerator(req);
  mysqlConnection.query(query(2, ``), (err, rows, fields) => {
    if (!err) {
      if (rows.length > 0) {
        const serialized = jsonapiFormat(rows, `posts`, false, null, null, url);
        res.json(serialized);
      } else {
        res.status(401).json(`unauthorized`);
      }
    } else {
      res.status(500).json(err.code);
    }
  });
});

router.get(`/posts/:id`, (req, res) => {
  let url = {};
  url.self = urlGenerator(req);
  const { id } = req.params;
  const user_id = 1;
  let queryWhere = ``;
  if (user_id) {
    queryWhere = `WHERE P.id = ${id} AND P.is_published = 0 AND P.user_id = ${user_id}`;
  } else {
    queryWhere = `WHERE P.id = ${id} AND P.is_published = 1`;
  }
  mysqlConnection.query(query(3, queryWhere), (err, rows, fields) => {
    if (!err) {
      if (rows.length > 0) {
        const serialized = jsonapiFormat(rows, `posts`, false, null, null, url);
        res.json(serialized);
      } else {
        res.status(401).json(`unauthorized`);
      }
    } else {
      res.status(500).json(err.code);
    }
  });
});

router.post(`/posts`, (req, res) => {
  const { title, body, slug, is_published } = req.body;
  const user_id = 1;
  const str = `${user_id}, ${title}, ${body}, ${slug}, ${is_published}`;
  if (user_id) {
    mysqlConnection.query(query(4, str), (err, rows, fields) => {
      if (!err) {
        res.status(201).json(rows);
      } else {
        res.status(500).json(err.code);
      }
    });
  } else {
    res.status(401).json(`unauthorized`);
  }
});

router.put(`/posts/:id`, (req, res) => {
  const { title, body, slug, is_published } = req.body;
  const user_id = 1;
  const { id } = req.params;
  if (user_id) {
    mysqlConnection.query(
      query(5, ``),
      [title, body, slug, is_published, user_id, id],
      (err, rows, fields) => {
        if (!err) {
          res.status(204).json(rows);
        } else {
          res.status(500).json(err.code);
        }
      }
    );
  } else {
    res.status(401).json(`unauthorized`);
  }
});

router.delete(`/posts/:id`, (req, res) => {
  const user_id = 1;
  const { id } = req.params;
  if (user_id) {
    mysqlConnection.query(query(6, ``), [user_id, id], (err, rows, fields) => {
      if (!err) {
        res.status(204).json(rows);
      } else {
        res.status(500).json(err.code);
      }
    });
  } else {
    res.status(401).json(`unauthorized`);
  }
});

router.get(`/comments-per-user/:id`, (req, res) => {
  let url = {};
  url.self = urlGenerator(req);
  const { id } = req.params;
  const user_id = 1;
  let queryWhere = ``;
  id ? (queryWhere = `WHERE U.id = ${id}`) : (queryWhere = ``);
  mysqlConnection.query(query(0, queryWhere), (err, rows, fields) => {
    if (!err) {
      if (rows.length > 0) {
        const serialized = jsonapiFormat(
          data2json(rows),
          `users`,
          true,
          null,
          true,
          url
        );
        res.json(serialized);
      } else {
        res.status(404).json(`Data Not Found`);
      }
    } else {
      res.status(500).json(err.code);
    }
  });
});

router.get(`/comments-per-post/:id`, (req, res) => {
  let url = {};
  url.self = urlGenerator(req);
  const { id } = req.params;
  const user_id = 1;
  let queryWhere = ``;
  id ? (queryWhere = `WHERE C.id = ${id}`) : (queryWhere = ``);
  console.log(query(1, queryWhere));
  mysqlConnection.query(query(1, queryWhere), (err, rows, fields) => {
    if (!err) {
      if (rows.length > 0) {
        const serialized = jsonapiFormat(
          data2json(rows),
          `posts`,
          true,
          null,
          true,
          url
        );
        res.json(serialized);
      } else {
        res.status(404).json(`Data Not Found`);
      }
    } else {
      res.status(500).json(err.code);
    }
  });
});

router.post(`/comments`, (req, res) => {
  const { body, is_published } = req.body;
  const { post_id } = req.query;
  const user_id = 1;
  if (user_id) {
    const str = `${user_id}, ${post_id}, ${body}, ${is_published}`;
    mysqlConnection.query(query(8, str), (err, rows, fields) => {
      if (!err) {
        res.status(201).json(rows);
      } else {
        res.status(500).json(err.code);
      }
    });
  } else {
    res.status(401).json(`unauthorized`);
  }
});

router.put(`/comments/:id`, (req, res) => {
  const { body, is_published } = req.body;
  const user_id = 1;
  const { id } = req.params;
  if (user_id) {
    mysqlConnection.query(
      query(9, ``),
      [body, is_published, user_id, id],
      (err, rows, fields) => {
        if (!err) {
          res.status(204).json(rows);
        } else {
          res.status(500).json(err.code);
        }
      }
    );
  } else {
    res.status(401).json(`unauthorized`);
  }
});

router.delete(`/comments/:id`, (req, res) => {
  const user_id = 1;
  const { id } = req.params;
  if (user_id) {
    mysqlConnection.query(query(10, ``), [user_id, id], (err, rows, fields) => {
      if (!err) {
        res.status(204).json(rows);
      } else {
        res.status(500).json(err.code);
      }
    });
  } else {
    res.status(401).json(`unauthorized`);
  }
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

function paginate(page = 1, pageSize = 5, records) {
  const recordsPage = records.slice(pageSize * (page - 1), pageSize * page);
  if (recordsPage.length > 0) {
    return recordsPage;
  }
  return "No Page";
}

module.exports = router;
