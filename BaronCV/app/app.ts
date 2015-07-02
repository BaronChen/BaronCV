///<reference path="../typings/angularjs/angular.d.ts"/>

module BaronCV {
	"use strict";

	export interface IRootScope extends angular.IScope {
		topbarLoaded: boolean;
		aboutLoaded: boolean;
		headerwrapLoaded : boolean;
		skillLoaded: boolean;
		contactLoaded: boolean;
		experienceLoaded:boolean;
	}

	export class MyApp {
		app: ng.IModule;

		constructor(name: string, modules: Array<string>) {
			this.app = angular.module(name, modules);
			this.app.run([
				'$rootScope', $rootScope => {
					$rootScope.Positions = Services.Positions;
				}
			]);
		}

		addController(name: string, controller: Function) {
			this.app.controller(name, controller);
		}

		addService(name: string, service: Function) {
			this.app.service(name, service);
		}

		addDirective(name: string, directive: ng.IDirectiveFactory) {
			this.app.directive(name, directive);
		}

		configApp(config:Function) {
			this.app.config(config);
		}
	}
}

var myApp = new BaronCV.MyApp("baronCV", ['ngAnimate', 'ngTouch', 'ui.bootstrap', 'ngRoute', 'smoothScroll', 'pc035860.scrollWatch', 'ui.router', 'ngResource', 'chart.js', 'angular-images-loaded']);
