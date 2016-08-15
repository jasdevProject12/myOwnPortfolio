var myPortfolioApp = angular.module('myPortfolioApp', []);

var innerWidthMinimumSize = 600;

var mainHighlightsDesktopViewPath = 'views/subHTMLTemplate/desktopView.html';
var mainHighlightsMobileViewPath = 'views/subHTMLTemplate/mobileView.html';
var ajaxRequestForMainHighlightContent = '/getMainHighlightContent';

var mainHighlightAngularElem;

document.addEventListener('DOMContentLoaded', domContentLoaded, false);

myPortfolioApp.controller('mainHighlight', function($scope, $window, $http, $sce) {
	setupPortfolioTemplates($scope, $window);
	setupPortfolioHTMLContent($scope, $http, $sce, ajaxRequestForMainHighlightContent);
});

myPortfolioApp.controller('myPortfolioMain', function($scope, $sce) {
	//$scope.helloWorld = $sce.trustAsHtml("<h1>hello dev</h1>");
});

function domContentLoaded(event) {
	let screenSize = getScreenSize();
	let mainHighlightDiv = document.getElementById('mainHighlights');
	mainHighlightAngularElem = angular.element(mainHighlightDiv);
	mainHighlightAngularElem.css('height', screenSize.height + 'px');
}

function getScreenSize() {
	console.log(innerWidth);
	return {width: window.innerWidth, height: window.innerHeight};
}

function setupPortfolioTemplates(scope, windowObj) {
	displayPortfolioTemplates(scope, innerWidth);
	let screenSize = {};
	angular.element(windowObj).bind('resize', function () {
		screenSize = getScreenSize();
		displayPortfolioTemplates(scope, screenSize.width);
		mainHighlightAngularElem.css('height', screenSize.height + 'px');
		scope.$apply();
	});
}

function displayPortfolioTemplates(scope, innerWidth) {
	console.log('innerWidth : ' + innerWidth + ' innerWidthMinimumSize : ' + innerWidthMinimumSize);
	if(innerWidth > innerWidthMinimumSize && scope.view != mainHighlightsDesktopViewPath) {
		scope.view = mainHighlightsDesktopViewPath;
	} else if(innerWidth <= innerWidthMinimumSize && scope.view != mainHighlightsMobileViewPath) {
		console.log('Should Change ' + innerWidth);
		scope.view = mainHighlightsMobileViewPath;
	}
}