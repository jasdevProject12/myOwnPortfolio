var express = require('express');
var readDOMContentData = require('./myOwnNodeModules/ReadDOMContentData');
var app = express();

//set up templates and static files
app.use('/static', express.static(__dirname + '/static'));
app.use('/views', express.static(__dirname + '/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//paths for content
var pathForMainHighlightsContent = './myData/mainHighLights.html';


app.get('/', function (request, respond) {
	respond.render('mainHTMLTemplate/myPortfolio.html');
	respond.end();
});

app.get('/getMainHighlightContent', function (request, respond) {
	readDOMContentData.getHTMLContentData(pathForMainHighlightsContent, function(JSONData) {
		respond.send(JSONData);
		respond.end();
	});
});

app.listen(8080, function () {
  	console.log('Example app listening on port 8080! dir name : ' + __dirname);
});