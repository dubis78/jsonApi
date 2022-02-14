const { Serializer } = require(`jsonapi-serializer`);

const jsonapiFormat = (
  data,
  type,
  lastOne = true,
  is_page = false,
  has_child = false,
  links = []
) => {
  const [id, ...parentAtri] = Object.keys(data[0]);
  let childDat,
    childAtri = [];
  if (has_child) {
    lastOne
      ? (childDat = data[0][parentAtri[parentAtri.length - 1]][0])
      : (childDat = data[0][parentAtri[parentAtri.length - 2]][0]);
    childAtri = Object.keys(childDat);
  }

  return new Serializer(type, {
    attributes: parentAtri,
    child: {
      attributes: childAtri
    },
    topLevelLinks: links
  }).serialize(data);
};

module.exports = jsonapiFormat;