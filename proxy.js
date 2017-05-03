//http://stackoverflow.com/questions/8165570/https-proxy-server-in-node-js
//https://github.com/nodejitsu/node-http-proxy
//https://gist.github.com/ncthis/6863947
//http://www.catonmat.net/http-proxy-in-nodejs/
var vhost = {
	'www.giaothoa.com':'http://localhost:3000/',
  'giaothoa.com':'http://localhost:3000/'

};
//setup virtual domain
var http = require('http');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});
var server = http.createServer(function(req, res) {
    var hostname = req.headers.host.split(":")[0];
    proxy.web(req, res, { target: 'http://localhost:5984/' });
});
server.listen(2000);
