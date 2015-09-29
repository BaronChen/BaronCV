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
					text: 'Physicists analyze systems. Web scientists, however, can create the systems.',
					person: 'Tim Berners-Lee'
				},
				{
					text: 'Measuring programming progress by lines of code is like measuring aircraft building progress by weight.',
					person: 'Bill Gates'
				},
				{
					text: 'I think Microsoft named .Net so it wouldn’t show up in a Unix directory listing.',
					person:'Oktal'
				},
				{
					text: 'Don’t worry if it doesn’t work right. If everything did, you’d be out of a job.',
					person:'My mom'
				}
			];

			$rootScope.contactLoaded = true;
		}
	}
}

BaronCV.CarouselController.$inject = ['$scope', 'myResourceService', '$rootScope'];
myApp.addController('carouselController', BaronCV.CarouselController);