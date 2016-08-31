var express = require('express');
var readDOMContentData = require('./myOwnNodeModules/ReadDOMContentData');
var cachePortfolioData = require('./myOwnNodeModules/CachePortfolioData');
var app = express();

//set up templates and static files
app.use('/static', express.static(__dirname + '/static'));
app.use('/views', express.static(__dirname + '/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

var myData = {};

//paths for content
global.pathForMainHighlightsContent = './myData/mainHighLights.html';
global.pathForMainContent = './myData/mainContents.html';

//time taken to refresh cache
var intervalTimeTaken = 10000;

setupCacheValuesForPortfolio = function(pathToGetPortfolioContent) {
	readDOMContentData.getHTMLContentData(pathToGetPortfolioContent, function(JSONData) {
		if (JSONData != {}) {
			console.log('success');
			if (pathToGetPortfolioContent.includes('mainHighLights.html')) {
				myData['mainPortfolioHighLights'] = JSONData;
			} else if(pathToGetPortfolioContent.includes('mainContents.html')) {
				myData['mainPortfolioContents'] = JSONData;
			}
		}
	});
}
setInterval(function() {
	setupCacheValuesForPortfolio(global.pathForMainHighlightsContent);
	setupCacheValuesForPortfolio(global.pathForMainContent);
},intervalTimeTaken);

setupCacheValuesForPortfolio(global.pathForMainHighlightsContent);
setupCacheValuesForPortfolio(global.pathForMainContent);

app.get('/', function (request, respond) {
	respond.render('mainHTMLTemplate/myPortfolio.html');
	respond.end();
});

app.get('/getMainPortfolioHighLights', function (request, respond) {
	respond.send(myData.mainPortfolioHighLights);
	respond.end();
});

app.get('/getMainPortfolioContents', function (request, respond) {
	respond.send(myData.mainPortfolioContents);
	respond.end();
});

app.listen(8080, function () {
  	console.log('Example app listening on port 8080! dir name : ' + __dirname);
});