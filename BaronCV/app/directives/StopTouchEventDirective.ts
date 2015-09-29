module BaronCV.Directives {
	//this directive is for a Angular touch bug work around
	export class StopTouchEventDirective implements ng.IDirective {
		restrict = 'A';

		private $animate: ng.IAnimateService;
		private $window: ng.IWindowService;

		constructor() {
			var self = this;
		}

		link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attr: any, ctrl: any) => {
			if (attr && attr.stopEvent) {
				element.on(attr.stopEvent, e => {
					e.stopPropagation();
				});
			}
		}

		static factory(): ng.IDirectiveFactory {
			const directive = () => new StopTouchEventDirective();
			directive.$inject = [];
			return directive;
		}
	}
}

myApp.addDirective("stopEvent", BaronCV.Directives.StopTouchEventDirective.factory());