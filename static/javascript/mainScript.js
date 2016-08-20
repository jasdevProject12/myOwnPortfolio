var myPortfolioApp = angular.module('myPortfolioApp', []);

var innerWidthMinimumSize = 734;

var mainHighlightsDesktopViewPath = 'views/subHTMLTemplate/desktopView.html';
var mainHighlightsMobileViewPath = 'views/subHTMLTemplate/mobileView.html';
var ajaxRequestForMainHighlightContent = '/getMainHighlightContent';

var mainHighlightAngularElem;

var isTouchDevice = 'ontouchstart' in document.documentElement;

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
	let screenWidth = window.outerWidth;
	let screenHeight = window.innerHeight;
	/*if(isTouchDevice) {
		screenWidth = screen.width;
		screenHeight = screen.height;
	} else {
		screenWidth = window.innerWidth;
		screenHeight = window.innerHeight;
		let screenWidth = screen.availWidth;
	let screenHeight = screen.availHeight;
	}*/
	return {width: screenWidth, height: screenHeight};
}

function setupPortfolioTemplates(scope, windowObj) {
	let screenSize = {};
	screenSize = getScreenSize();
	displayPortfolioTemplates(scope, screenSize);
	angular.element(windowObj).bind('resize', function () {
		screenSize = getScreenSize();
		displayPortfolioTemplates(scope, screenSize);
		mainHighlightAngularElem.css('height', screenSize.height + 'px');
		scope.$apply();
	});
}

function displayPortfolioTemplates(scope, innerWidth) {
	if(innerWidth.width > innerWidthMinimumSize && scope.view != mainHighlightsDesktopViewPath) {
		scope.view = mainHighlightsDesktopViewPath;
	} else if(innerWidth.width <= innerWidthMinimumSize && scope.view != mainHighlightsMobileViewPath) {
		//console.log('Should Change ' + innerWidth);
		scope.view = mainHighlightsMobileViewPath;
	}
}