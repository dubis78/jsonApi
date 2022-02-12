const { Serializer } = require(`jsonapi-serializer`);

const jsonapiFormat = (data, type) => {
  const [id, ...parentAtri] = Object.keys(data[0]),
    childAtri = Object.keys(data[0][parentAtri[parentAtri.length - 1]][0]);
  return new Serializer(type, {
    attributes: parentAtri,
    child: {
      ref: (parent, child) => {
        return child.id;
      },
      attributes: childAtri
    },
    pluralizeType: false,
    topLevelLinks: {
      self: `http://example.com/users/posts`,
      first: `http://example.com/articles?page[offset]=1`,
      last: `http://example.com/articles?page[offset]=10`,
      prev: `http://example.com/articles?page[offset]=2`,
      next: `http://example.com/articles?page[offset]=2`
    }
  }).serialize(data);
};

module.exports = jsonapiFormat;