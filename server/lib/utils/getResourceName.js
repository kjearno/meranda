const getResourceName = (req) => req.baseUrl.split("/").slice(-1)[0];

module.exports = getResourceName;
