var readDOMContentData = require('./ReadDOMContentData');

//paths for content
const pathForMainHighlightsContent = './myData/mainHighLights.html';
const pathForMainContent = './myData/mainContents.html';

//time taken to refresh cache
const intervalTimeTaken = 10000;

function setupCacheValuesForPortfolio(pathToGetPortfolioContent) {
	readDOMContentData.getHTMLContentData(pathToGetPortfolioContent, function(JSONData) {
		if (JSONData != {}) {
			if (pathToGetPortfolioContent.includes('mainHighLights.html')) {
				global.myData['mainPortfolioHighLights'] = JSONData;
			} else if(pathToGetPortfolioContent.includes('mainContents.html')) {
				global.myData['mainPortfolioContents'] = JSONData;
			}
		}
	});
};

setInterval(function() {
	setupCacheValuesForPortfolio(pathForMainHighlightsContent);
	setupCacheValuesForPortfolio(pathForMainContent);
},intervalTimeTaken);

module.exports = {
	setupCache : function() {
		setupCacheValuesForPortfolio(pathForMainHighlightsContent);
		setupCacheValuesForPortfolio(pathForMainContent);
	}
};
