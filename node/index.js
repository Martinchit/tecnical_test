require('dotenv').config();
const fs = require('fs');
const https = require('https');
const http = require('http');
const models = require('./database/models');
const config = require('./config');
const services = require('./services');
const routers = require('./routers');

const { App } = require('./utils/app')(models, config, routers, services);

// Dun really have any purpose, general practice
const httpsOptions = {
	key: fs.readFileSync('./localhost.key'),
	cert: fs.readFileSync('./localhost.crt'),
};

const httpServer = http.createServer(App);

// Run all the models file and migrate in the database if there is new model file found
models.sequelize.sync().then(function () {
	console.log('Sequelize init done');
});

https.createServer(httpsOptions, App).listen(8000, 'localhost', () => {
	console.log(`https server running at ${8000}`);
});

httpServer.listen(8080, () => {
	console.log(`http server running at ${8080}`);
});
