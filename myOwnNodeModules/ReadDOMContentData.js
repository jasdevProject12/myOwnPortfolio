var fs = require('fs');
var jsdom = require("jsdom");

var jqueryScriptSrc = "http://code.jquery.com/jquery.js";

var self = module.exports = {
	fileContentFormat: 'utf8',

	getHTMLContentData: function(pathForHTMLContent, callback) {
		fs.readFile(pathForHTMLContent, this.fileContentFormat, function(errorReadingFile, fileContent) {
			if (errorReadingFile) {
				return console.log(errorReadingFile);
			} else {
				jsdom.env(fileContent, [jqueryScriptSrc], function(errorConvertingHTML, window) {
					if (errorConvertingHTML) {
						return console.log(errorConvertingHTML);
					} else {
						self.getHTMLContentForMainHiglights(window, callback);
					}
				});
			}
    	});
	},

    getHTMLContentForMainHiglights: function (HTMLDoc, callback) {
    	let HTMLParagraphs = HTMLDoc.$('div');
    	let JSONData = {};
    	let elemPosition = 1;
    	console.log(HTMLParagraphs);
    	while (typeof HTMLParagraphs.html() !== 'undefined' && HTMLParagraphs.prop('tagName') == 'DIV') {
			JSONData['elemPosition' + elemPosition] = HTMLParagraphs.html();
			console.log(HTMLParagraphs.html());
    		HTMLParagraphs = HTMLParagraphs.next();
    		elemPosition++;
    	}
    	callback(JSONData);
  	}
};
