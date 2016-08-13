var DOMParser = require('xmldom').DOMParser;
var fs = require('fs');
module.exports = {
	fileContentFormat: 'utf8',
	pathForMainHighlightsContent: './myData/mainHighLights.html',

	sampleFunction: function(user, callback) {
		let message = 'helloWorld from RDCDs ' + user.name + ' and age is ' + user.age;
		callback(message);
	},
	getHTMLContentData: function() {

	},
    getHTMLContentForMainHiglights: function (callback) {
    	let doc = new DOMParser();
    	fs.readFile(this.pathForMainHighlightsContent, this.fileContentFormat, function(errorReadingFile, fileContent) {
			if(errorReadingFile) {
				return console.log(errorReadingFile);
			} else {
				doc = doc.parseFromString(fileContent);
				console.log(doc);
    			callback(true);
			}
    	});
  	}
};
