module BaronCV.Directives {

	export class ScrollDirective implements ng.IDirective {
		restrict = 'A';

		private $location : ng.ILocationService;
		private $window: ng.IWindowService;
		private $document: ng.IDocumentService;
		private pagePositionService: Services.PagePositionServices;
		private $workEl : ng.IAugmentedJQuery;
		private $resumeEl : ng.IAugmentedJQuery;
		private $aboutEl : ng.IAugmentedJQuery;
		private $headerEl: ng.IAugmentedJQuery;
		private $contactEl: ng.IAugmentedJQuery;
		private $headerwrapEl: ng.IAugmentedJQuery;
		private previousOffset:number;

		private $timeout : ng.ITimeoutService;

		constructor($location: ng.ILocationService, $window: ng.IWindowService, $document: ng.IDocumentService, pagePositionService: Services.PagePositionServices, $timeout : ng.ITimeoutService) {
			var self = this;
			self.$location = $location;
			self.$window = $window;
			self.$document = $document;
			self.pagePositionService = pagePositionService;
			this.previousOffset = 0;

			this.$timeout = $timeout;
		}

		link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: any) => {
			var debounceHandler = new Services.DebounceHandler(this.$timeout, 300, true);
			angular.element(this.$window).bind('scroll', () => {
				debounceHandler.process(() => { this.doScroll(); });
			});	
		}

		doScroll() {
			var self = this;
			//console.log("topbar scroll called!");
			var scrollHeight = self.$window.pageYOffset;

			if (!self.$workEl) {
				self.$workEl = angular.element($('#skillswrap'));
				self.$resumeEl = angular.element($('#resume'));
				self.$aboutEl = angular.element($('#about'));
				self.$headerEl = angular.element($('#headerwrap'));
				self.$contactEl = angular.element($('#footwrap'));
				self.$headerwrapEl = angular.element($('#headerwrap'));
			}
				

			//var headerOffset = this.$headerwrapEl.offset().top;
			var windowHeight = this.$window.innerHeight;
			var topbarElement = document.querySelector('#section-topbar');
			var topbarScope = angular.element(topbarElement).scope();
			var skillswrapElement = document.querySelector('#skillswrap');
			var skillswrapScope = <ISkillCtrlScope> angular.element(skillswrapElement).scope();

			var targetHeight = scrollHeight + windowHeight / 3;

			var previousPagePosition = this.pagePositionService.getPosition();

			if (this.$contactEl.offset().top <= targetHeight || scrollHeight + windowHeight >= this.$document.innerHeight()) {
				this.pagePositionService.selectPosition(Services.Positions.Contact);
			}
			else if (self.$workEl.offset().top <= targetHeight) {
				this.pagePositionService.selectPosition(Services.Positions.Work);
				skillswrapScope.graphData.mapData();
			} else if (self.$resumeEl.offset().top <= targetHeight) {
				this.pagePositionService.selectPosition(Services.Positions.Resume);
			} else if (self.$aboutEl.offset().top <= targetHeight) {
				this.pagePositionService.selectPosition(Services.Positions.About);
			} else if (self.$headerEl.offset().top <= targetHeight) {
				this.pagePositionService.selectPosition(Services.Positions.Undefined);
			}

			//top bar class changes

			//var topbarEl = angular.element($('#topbar-inner'));
			//var topbarNavEl = angular.element($('#section-topbar ul#nav'));
			//var topbarAEl = angular.element($('#section-topbar ul#nav a'));

			var previousValue = this.pagePositionService.isBackgroudShowed();
			var newValue = false;

			if (scrollHeight > 0) {
				newValue = true;
			} else {
				newValue = false;
			}

			if (previousValue !== newValue) {
				this.pagePositionService.setIsBackGroundShowed(newValue);
			}

			if (previousValue !== newValue || previousPagePosition !== this.pagePositionService.getPosition()) {

				topbarScope.$apply();
			}
		}

		static factory(): ng.IDirectiveFactory {
			const directive = ($location: ng.ILocationService,
								$window: ng.IWindowService,
								$document: ng.IDocumentService,
								pagePositionService: Services.PagePositionServices,
								debounce : any
								) => new ScrollDirective($location, $window, $document, pagePositionService, debounce);
			directive.$inject = ['$location', '$window', '$document', 'pagePositionService', '$timeout'];
			return directive;
		}
	}
}

myApp.addDirective("myScroll", BaronCV.Directives.ScrollDirective.factory());