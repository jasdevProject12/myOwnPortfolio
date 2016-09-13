'use strict';
var express = require('express');
var cachePortfolioData = require('./myOwnNodeModules/CachePortfolioData');
var app = express();

//set up templates and static files
app.use('/static', express.static(__dirname + '/static'));
app.use('/views', express.static(__dirname + '/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

global.myData = {};

cachePortfolioData.setupCache();

app.get('/', function (request, respond) {
	respond.render('mainHTMLTemplate/myPortfolio.html');
	respond.end();
});

app.get('/getMainPortfolioHighLights', function (request, respond) {
	respond.send(global.myData.mainPortfolioHighLights);
	respond.end();
});

app.get('/getMainPortfolioContents', function (request, respond) {
	respond.send(global.myData.mainPortfolioContents);
	respond.end();
});

app.listen(8080, function () {
  	console.log('Example app listening on port 8080! dir name : ' + __dirname);
});