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
      LEFT JOIN comments C ON C.user_id=U.id ${extra} GROUP BY U.id 
      
    `,
    `SELECT * FROM users ${extra}`
  ];
  return queries[index];
};

module.exports = query;