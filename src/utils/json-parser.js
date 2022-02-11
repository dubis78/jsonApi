const data2json = (data) => {
  let data2json = JSON.parse(JSON.stringify(data));
  data2json.map((element) => {
    element.comments = JSON.parse(element.comments);
  });
  return data2json[0];
};

module.exports = data2json;