module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config["externals"] = {
    "config": JSON.stringify({
      "apiUrl": "http://localhost:5001/api",
      "websocketUrl": "http://localhost:5001/chat"
    })
  }
  return config;
}
