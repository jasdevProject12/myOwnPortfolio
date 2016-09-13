function setupPortfolioHTMLContent(ctrlScope, http, sce, ajaxPath) {
	http.get(ajaxPath).then(function(response) {
		if (ajaxPath == ajaxRequestPortfolioMainHighlightContent) {
	        ctrlScope.elemPosition1 = sce.trustAsHtml(response.data.elemPosition1);
	        ctrlScope.elemPosition2 = sce.trustAsHtml(response.data.elemPosition2);
	        ctrlScope.elemPosition3 = sce.trustAsHtml(response.data.elemPosition3);
	        ctrlScope.elemPosition4 = sce.trustAsHtml(response.data.elemPosition4);
    	} else if (ajaxPath == ajaxRequestPortfolioMainContent) {
    		ctrlScope.projectDetails = response.data;
    		for(var i = 0; i <= response.data.length - 1; i++) {
    			projecTitle = removeSpaceAndLowerCases(response.data[i].title);
    			projectContentDocument[projecTitle.toString()] = response.data[i].projectContent;
    		}
    	}
    	console.log(projectContentDocument);
    });
}