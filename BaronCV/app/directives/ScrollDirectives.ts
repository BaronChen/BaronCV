module BaronCV.Directives {

	export class ScrollDirective implements ng.IDirective {
		restrict = 'A';

		private $location : ng.ILocationService;
		private $window: ng.IWindowService;
		private $document: ng.IDocumentService;
		private pagePositionService: Services.PagePositionServices;

		constructor($location: ng.ILocationService, $window : ng.IWindowService, $document : ng.IDocumentService, pagePositionService : Services.PagePositionServices) {
			var self = this;
			self.$location = $location;
			self.$window = $window;
			self.$document = $document;
			self.pagePositionService = pagePositionService;
		}

		link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: any) => {
			angular.element(this.$window).bind('scroll', () => {
				var $workEl = angular.element($('#skillswrap'));
				var $resumeEl = angular.element($('#resume'));
				var $aboutEl = angular.element($('#about'));
				var $headerEl = angular.element($('#headerwrap'));
				var $contactEl = angular.element($('#contactWrap'));
				var $headerwrapEl = angular.element($('#headerwrap'));

				var headerOffset = $headerwrapEl.offset().top;
				var windowHeight = this.$window.innerHeight;
				var scrollHeight = this.$window.pageYOffset;
				var topbarElement = document.querySelector('#section-topbar');
				var topbarScope = angular.element(topbarElement).scope();
				var skillswrapElement = document.querySelector('#skillswrap');
				var skillswrapScope = <ISkillCtrlScope> angular.element(skillswrapElement).scope();

				var targetHeight = scrollHeight + windowHeight/3;


				if ($contactEl.offset().top <= targetHeight) {
					this.pagePositionService.selectPosition(Services.Positions.Contact);
				}
				else if ($workEl.offset().top <= targetHeight) {
					this.pagePositionService.selectPosition(Services.Positions.Work);
					skillswrapScope.graphData.mapData();
				}else if ($resumeEl.offset().top <= targetHeight) {
					this.pagePositionService.selectPosition(Services.Positions.Resume);
				} else if ($aboutEl.offset().top <= targetHeight) {
					this.pagePositionService.selectPosition(Services.Positions.About);
				} else if ($headerEl.offset().top <= targetHeight) {
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
					topbarScope.$apply();	
				}
			});
			
		}

		static factory(): ng.IDirectiveFactory {
			const directive = ($location: ng.ILocationService,
								$window: ng.IWindowService,
								$document: ng.IDocumentService,
								pagePositionService: Services.PagePositionServices
								) => new ScrollDirective($location, $window, $document, pagePositionService);
			directive.$inject = ['$location', '$window', '$document', 'pagePositionService'];
			return directive;
		}
	}
}

myApp.addDirective("myScroll", BaronCV.Directives.ScrollDirective.factory());