function setupPortfolioHTMLContent(ctrlScope, http, sce, ajaxPath) {
	http.get(ajaxPath).then(function(response) {
        ctrlScope.elemPosition1 = sce.trustAsHtml(response.data.elemPosition1);
        ctrlScope.elemPosition2 = sce.trustAsHtml(response.data.elemPosition2);
        ctrlScope.elemPosition3 = sce.trustAsHtml(response.data.elemPosition3);
        ctrlScope.elemPosition4 = sce.trustAsHtml(response.data.elemPosition4);
    });
}