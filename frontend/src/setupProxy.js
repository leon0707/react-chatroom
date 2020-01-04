const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  // app.use(
  //   '/sockjs-node',
  //   proxy({
  //     target: 'ws://localhost:5001',
  //     ws: true
  //   })
  // );
  // app.use(
  //   '/socket.io',
  //   proxy({
  //     target: 'ws://localhost:5001',
  //     ws: true
  //   })
  // );
  // app.use(
  //   '/api',
  //   proxy({
  //     target: 'http://localhost:5001',
  //   })
  // );
};
