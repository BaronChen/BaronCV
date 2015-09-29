module BaronCV.Directives {

	export class GlowingDirective implements ng.IDirective {
		restrict = 'A';

		private $animate : ng.IAnimateService;
		private $window: ng.IWindowService;
		private $timeout: ng.ITimeoutService;

		constructor($animate: ng.IAnimateService, $window: ng.IWindowService, $timeout:ng.ITimeoutService) {
			var self = this;
			self.$animate = $animate;
			self.$window = $window;
			self.$timeout = $timeout;
		}

		link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: any) => {
			element.bind('mouseover', () => {
				element.addClass('glowing');
				element.removeClass('my-text-muted');

			});

			element.bind('mouseleave', () => {
				var windowHeight = this.$window.innerHeight;
				var scrollHeight = this.$window.pageYOffset;
				var elementTopHeight = element.offset().top;
				var elementHeight = element.innerHeight();

				var targetHeoght = scrollHeight + windowHeight / 2;

				if (elementTopHeight > targetHeoght || elementTopHeight + elementHeight <= targetHeoght) {
	
					element.removeClass('glowing');
					element.addClass('my-text-muted');
				}
			
			});

			var debounceHandler = new Services.DebounceHandler(this.$timeout, 300, false);
			angular.element(this.$window).bind('scroll', () => {
				debounceHandler.process(() => { this.doScroll(element); });
			});
		}

		doScroll(element: ng.IAugmentedJQuery) {
			//console.log("glowing scroll called");
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
		}

		static factory(): ng.IDirectiveFactory {
			const directive = ($animate : ng.IAnimateService, $window : ng.IWindowService, debounce:any) => new GlowingDirective($animate, $window, debounce);
			directive.$inject = ['$animate', '$window', '$timeout'];
			return directive;
		}
	}
}

myApp.addDirective("myGlowing", BaronCV.Directives.GlowingDirective.factory());