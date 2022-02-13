const url_generator = ({ protocol, hostname, originalUrl }) => {
  return protocol + "://" + hostname + originalUrl;
};

module.exports = url_generator;
