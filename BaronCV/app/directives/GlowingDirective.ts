module BaronCV.Directives {

	export class GlowingDirective implements ng.IDirective {
		restrict = 'A';

		private $animate : ng.IAnimateService;
		private $window: ng.IWindowService;

		constructor($animate: ng.IAnimateService, $window : ng.IWindowService) {
			var self = this;
			self.$animate = $animate;
			self.$window = $window;
		}

		link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: any) => {
			//element.bind('mouseover', () => {
			//	element.addClass('glowing');

			//});

			//element.bind('mouseleave', () => {
			//	element.removeClass('glowing');
			
			//});
			angular.element(this.$window).bind('scroll', () => {
				var windowHeight = this.$window.innerHeight;
				var scrollHeight = this.$window.pageYOffset;
				var elementTopHeight = element.offset().top;
				var elementHeight = element.innerHeight();

				var targetHeoght = scrollHeight + windowHeight / 2;

				if (elementTopHeight <= targetHeoght && elementTopHeight + elementHeight > targetHeoght) {
					element.addClass('glowing');
					element.removeClass('my-text-muted');
				} else {
					element.removeClass('glowing');
					element.addClass('my-text-muted');
				}

			});
		}

		static factory(): ng.IDirectiveFactory {
			const directive = ($animate : ng.IAnimateService, $window : ng.IWindowService) => new GlowingDirective($animate, $window);
			directive.$inject = ['$animate', '$window'];
			return directive;
		}
	}
}

myApp.addDirective("myGlowing", BaronCV.Directives.GlowingDirective.factory());