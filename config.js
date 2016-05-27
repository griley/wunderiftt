var config = {};

config.http = {};
config.http.port = process.env.PORT || 5000

config.wunderlist = {};
config.wunderlist.clientId = process.env.WUNDERLIST_CLIENT_ID
config.wunderlist.accessToken = process.env.WUNDERLIST_ACCESS_TOKEN

module.exports = config;
