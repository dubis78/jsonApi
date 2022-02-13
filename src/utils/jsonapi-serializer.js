const { Serializer } = require(`jsonapi-serializer`);

const jsonapiFormat = (
  data,
  type,
  lastOne = true,
  is_page = false,
  links = []
) => {
  const [id, ...parentAtri] = Object.keys(data[0]);
  let childDat;
  lastOne
    ? (childDat = data[0][parentAtri[parentAtri.length - 1]][0])
    : (childDat = data[0][parentAtri[parentAtri.length - 2]][0]);
  childAtri = Object.keys(childDat);
  return new Serializer(type, {
    attributes: parentAtri,
    child: {
      ref: (parent, child) => {
        return child.id;
      },
      attributes: childAtri
    },
    topLevelLinks: links
  }).serialize(data);
};

module.exports = jsonapiFormat;


module.exports = jsonapiFormat;