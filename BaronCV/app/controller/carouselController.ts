module BaronCV {
	export interface ICarouselCtrlScope extends ng.IScope {
		controller: CarouselController;

		myInterval: number;
		slides: any;
	}

	export class CarouselController {

		private $scope: ICarouselCtrlScope;
		private myResourceService: Services.MyResourceService;
		

		constructor($scope: ICarouselCtrlScope, myResourceService: Services.MyResourceService) {
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
					text: 'I love my life and my work. Most importantly, I am always looking for opportunity to make a difference to the world.'
				},
				{
					text: 'If you reach this line, that means it took you some time to get to know me. Thank you very much. '
				}
			];
	
		
		}
	}
}

BaronCV.CarouselController.$inject = ['$scope', 'myResourceService'];
myApp.addController('carouselController', BaronCV.CarouselController);