var EJS = require('ejs');
var Express = require('express');
var HTTP = require('http');
//var IO = require('socket.io');
var Path = require('path');

var config = require('../config');

var app = Express();
var server = HTTP.createServer(app);

//var io = IO.listen(server);
//io.set('log level', 1);

app.engine('html', EJS.renderFile);
app.set('views', Path.resolve(__dirname, "../view"));
app.locals.repo = config.repo || "https://github.com/jmanero/boots";

app.use(Express.bodyParser());
app.use(Express.logger());
app.use(app.router);
app.use(Express.static(Path.join(__dirname, '../resource')));

require('../lib/control/view').create(app);

server.listen(config.port || 8980, function() {
	console.log("Listening for HTTP requests on port " + (config.port || 8980));
});
