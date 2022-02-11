const data2json = (data) => {
  console.log(Object.keys(data));
  let data2json = JSON.parse(JSON.stringify(data));
  console.log(data2json);
  data2json.map((element) => {
    element.comments = JSON.parse(element.comments);
  });
  return data2json[0];
};

module.exports = data2json;