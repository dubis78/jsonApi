const query = (index, extra) => {
  const queries = [
    `
    SELECT U.id, U.name, U.username, U.e_mail, 
    JSON_ARRAYAGG(
      JSON_OBJECT(
        'id', C.id,
        'body', C.body, 
        'is_published', C.is_published
        )
      ) AS comments FROM users U 
      LEFT JOIN comments C ON C.user_id=U.id ${extra}
      GROUP BY U.id    
    `,
    `
    SELECT P.id, P.title, P.body, P.slug, P.created_at, P.updated_at, (
      SELECT JSON_ARRAYAGG( 
        JSON_OBJECT( 'id', C.id, 'body', C.body, 'is_published', C.is_published )
      ) FROM comments C LIMIT 5
    ) AS comments FROM posts P 
    LEFT JOIN comments C ON C.user_id=P.id WHERE P.is_published = 1     
    `,
    `
    SELECT P.id, P.title, P.body, P.slug, P.created_at, P.updated_at 
    FROM posts P WHERE P.is_published = 0 
    `,
    `
    SELECT * FROM posts P ${extra}`,
    `INSERT INTO posts (user_id, title, body, slug, is_published) 
    VALUES(${extra});
    `,
    `
    UPDATE post SET title = ?, body = ?, slug = ?, is_published = ? 
    WHERE user_id = ? AND id = ?
    `,
    `
    DELETE FrOM posts
    WHERE user_id = ? AND id = ?
    `,
  ];
  return queries[index];
};

module.exports = query;