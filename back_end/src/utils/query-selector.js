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
    SELECT P.id, P.title, P.body, P.slug, P.created_at, P.updated_at, 
    JSON_ARRAYAGG( 
      JSON_OBJECT( 'id', C.id, 'body', C.body, 'is_published', C.is_published,
      'created_at', C.created_at, 'updated_at', C.updated_at )
    ) AS comments FROM posts P 
    LEFT JOIN comments C ON C.post_id=P.id WHERE P.is_published = 1 
    GROUP BY P.id 
    `,
    `
    SELECT P.id, P.title, P.body, P.slug, P.created_at, P.updated_at 
    FROM posts P WHERE P.is_published = 0 
    `,
    `
    SELECT P.id, P.title, P.body, P.slug, P.created_at, P.updated_at 
    FROM posts P ${extra}
    `,
    `
    INSERT INTO comments (user_id, title, body, slug, is_published) 
    VALUES(${extra});
    `,
    `
    UPDATE posts SET title = ?, body = ?, slug = ?, is_published = ? 
    WHERE user_id = ? AND id = ?
    `,
    `
    DELETE FROM posts
    WHERE user_id = ? AND id = ?
    `,
    `
    SELECT C.id, C.body, C.is_published,
    C.created_at, C.updated_at FROM comments C ${extra}
    `,
    `
    INSERT INTO comments (user_id, body, is_published, ) 
    VALUES(${extra});
    `,
    `
    UPDATE comments SET body = ?, is_published = ? 
    WHERE user_id = ? AND id = ?
    `,
    `
    DELETE FROM comments
    WHERE user_id = ? AND id = ?
    `
  ];
  return queries[index];
};

module.exports = query;