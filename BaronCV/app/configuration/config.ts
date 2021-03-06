﻿module BaronCV.Config {

	export  class Config{
		constructor($stateProvider: ng.ui.IStateProvider, $urlRouterProvider : ng.ui.IUrlRouterProvider) {
			$urlRouterProvider.otherwise("/home");

			$stateProvider
				.state('home', {
					url: "/home",
					templateUrl: "app/view/app.html"
				});
		}
	}
} 

BaronCV.Config.Config.$inject = ['$stateProvider', '$urlRouterProvider'];
myApp.configApp(BaronCV.Config.Config);