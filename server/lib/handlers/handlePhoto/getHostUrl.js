const getHostUrl = (req) => `${req.protocol}://${req.get("host")}`;

module.exports = getHostUrl;
