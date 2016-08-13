var express = require('express');
var readDOMContentData = require('./myOwnNodeModules/ReadDOMContentData');
var app = express();

app.use('/static', express.static(__dirname + '/static'));
app.use('/views', express.static(__dirname + '/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', function (request, respond) {
	readDOMContentData.sampleFunction({name: 'jasdev', age: 12},function(data) {
	  console.log(data);
	});
	readDOMContentData.gethtmlDataForMainHiglights(function(content) {
	  respond.render('mainHTMLTemplate/myPortfolio.html');
	});
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080! dir name : ' + __dirname);
});