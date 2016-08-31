var myPortfolioApp = angular.module('myPortfolioApp', []);

var screenSizeMinimumSize = 738;

var mainHighlightsDesktopViewPath = 'views/subHTMLTemplate/mainHiglightsDesktopView.html';
var mainHighlightsMobileViewPath = 'views/subHTMLTemplate/mainHiglightsMobileView.html';
var mainContentDesktopViewPath = 'views/subHTMLTemplate/mainContentDesktopView.html';
var ajaxRequestPortfolioMainHighlightContent = '/getMainPortfolioHighLights';
var ajaxRequestPortfolioMainContent = '/getMainPortfolioContents';

var mainHighlightAngularElem;

document.addEventListener('DOMContentLoaded', domContentLoaded, false);

myPortfolioApp.controller('mainHighlight', function($scope, $window, $http, $sce) {
	setupPortfolioTemplates($scope, $window);
	setupPortfolioHTMLContent($scope, $http, $sce, ajaxRequestPortfolioMainHighlightContent);
});

myPortfolioApp.directive('myportfoliomain', function() {
	return {
		restrict : 'EA',
		templateUrl : mainContentDesktopViewPath,
		controller : function($scope, $http, $sce) {
			setupPortfolioHTMLContent($scope, $http, $sce, ajaxRequestPortfolioMainContent);
			console.log('hello world');
		}
	};
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
	return {width: screenWidth, height: screenHeight};
}

function setupPortfolioTemplates(scope, windowObj) {
	let screenSize = {};
	screenSize = getScreenSize();
	displayPortfolioTemplates(scope, screenSize);
	angular.element(windowObj).bind('resize', function () {
		screenSize = getScreenSize();
		displayPortfolioTemplates(scope, screenSize);
		scope.$apply();
	});
}

function displayPortfolioTemplates(scope, screenSize) {
	if(screenSize.width > screenSizeMinimumSize && scope.mainHighlightView != mainHighlightsDesktopViewPath) {
		try {
			mainHighlightAngularElem.css('height', screenSize.height + 'px');
		} catch (error) {
			console.log(error);
		}
		scope.mainHighlightView = mainHighlightsDesktopViewPath;
	} else if(screenSize.width <= screenSizeMinimumSize && scope.mainHighlightView != mainHighlightsMobileViewPath) {
		scope.mainHighlightView = mainHighlightsMobileViewPath;
	}
}