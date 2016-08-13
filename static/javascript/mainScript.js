document.addEventListener('DOMContentLoaded', domContentLoaded, false);
var innerHeight = window.innerHeight;
var innerWidth = screen.width;
var innerWidthMinimumSize = 600;

var mainHighlightsDesktopViewPath = 'views/subHTMLTemplate/desktopView.html';
var mainHighlightsMobileViewPath = 'views/subHTMLTemplate/mobileView.html';
var mainHighlightDiv = document.getElementById('mainHighlights');

function domContentLoaded(event) {
	var mainHighlightDiv = document.getElementById('mainHighlights');
	angular.element(mainHighlightDiv).css('height', innerHeight + 'px');
};
var app1 = angular.module('myPortfolioApp', []);
app1.controller('mainHighlight', function($scope, $window) {
	displayPortfolioTemplates($scope, innerWidth);
	angular.element($window).bind('resize', function () {
		innerWidth = screen.width;
		innerHeight = window.innerHeight;
		console.log(window.innerHeight)
    	displayPortfolioTemplates($scope, innerWidth);
    	$scope.$apply();
	});
});

app1.controller('myPortfolioMain', function($scope, $sce) {
	$scope.helloWorld = $sce.trustAsHtml("<h1>hello dev</h1>");
});
function displayPortfolioTemplates(scope, innerWidth) {
	if(innerWidth > innerWidthMinimumSize && scope.view != mainHighlightsDesktopViewPath) {
		scope.view = mainHighlightsDesktopViewPath;
	} else if(innerWidth <= innerWidthMinimumSize && scope.view != mainHighlightsMobileViewPath) {
		scope.view = mainHighlightsMobileViewPath;
	}
	angular.element(mainHighlightDiv).css('height', innerHeight + 'px');
}