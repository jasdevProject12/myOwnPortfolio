var fs = require('fs');
var cheerio = require("cheerio");

var jqueryScriptSrc = "http://code.jquery.com/jquery.js";
var projectTitles = [];
var self = module.exports = {
	fileContentFormat: 'utf8',

	getHTMLContentData : function(pathForHTMLContent, callback) {
		fs.readFile(pathForHTMLContent, this.fileContentFormat, function(errorReadingFile, fileContent) {
			if (errorReadingFile) {
				return console.log(errorReadingFile);
			} else {
				self.convertContentDataToHTML(pathForHTMLContent, fileContent, callback);
			}
    	});
	},

	convertContentDataToHTML : function(pathForHTMLContent, fileContent, callback) {
		let HTMLDom = cheerio.load(fileContent);
		//console.log('global : ' + global.pathForMainHighlightsContent);
		if (pathForHTMLContent.includes('mainHighLights.html')) {
			self.getHTMLContentForMainHiglights(HTMLDom, callback);
		} else if (pathForHTMLContent.includes('mainContents.html')) {
			self.getHTMLContentForMainContents(HTMLDom, callback)
		} else {
			console.log('Something is wrong');
		}
	},

	getHTMLContentForMainContents : function(HTMLDom, callback) {
		let HTMLDivChildNodes = HTMLDom('div#contentProjects').find('title');
		projectTitles = [];
		for (let indexPost = 0; indexPost < HTMLDivChildNodes.length; indexPost++) {
			projectTitles.push({title : HTMLDivChildNodes[indexPost].children[0].data});
		}
		callback(projectTitles);
	},

    getHTMLContentForMainHiglights : function (HTMLDom, callback) {
    	let JSONData = {};
    	try {
	    	let HTMLDiv = HTMLDom('div');
	    	let elemPosition = 1;
	    	
	    	while (HTMLDiv.html() != null && HTMLDiv.prop('tagName') == 'DIV') {
				JSONData['elemPosition' + elemPosition] = HTMLDiv.html();
	    		HTMLDiv = HTMLDiv.next();
	    		elemPosition++;
	    	}
    	} catch (error) {
    		console.log(error);
    	} finally {
    		callback(JSONData);
    	}
  	}
};
