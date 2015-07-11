module BaronCV {
	export interface ICarouselCtrlScope extends ng.IScope {
		controller: CarouselController;

		myInterval: number;
		slides: any;
	}

	export class CarouselController {

		private $scope: ICarouselCtrlScope;
		private myResourceService: Services.MyResourceService;
		

		constructor($scope: ICarouselCtrlScope, myResourceService: Services.MyResourceService, $rootScope: IRootScope) {
			var self = this;
			self.$scope = $scope;
			self.$scope.controller = this;
			self.myResourceService = myResourceService;

			self.$scope.myInterval = 3000;

			var slides = self.$scope.slides = [
				{
					text: 'As a full stack developer, I enjoy doing logical and algorithmic stuff. '
				},
				{
					text: 'I love my life and my work. Most importantly, I am always looking for opportunities to make a difference to the world.'
				},
				{
					text: 'Thank you very much for your precious time~'
				}
			];

			$rootScope.contactLoaded = true;
		}
	}
}

BaronCV.CarouselController.$inject = ['$scope', 'myResourceService', '$rootScope'];
myApp.addController('carouselController', BaronCV.CarouselController);