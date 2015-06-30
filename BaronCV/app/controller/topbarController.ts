module BaronCV {
	'use strict';
	export interface ITopbarCtrlScope extends angular.IScope {
		controller : TopbarController;
	}

	export class TopbarController {
		private $scope: ITopbarCtrlScope;
		private pagePositionService : Services.PagePositionServices;
		constructor($scope: ITopbarCtrlScope, pagePositionService : Services.PagePositionServices, myResourceService: Services.MyResourceService) {
			var self = this;
			self.$scope = $scope;
			self.pagePositionService = pagePositionService;
			self.$scope.controller = this;
		}

		select(target: Services.Positions) {
			this.pagePositionService.selectPosition(target);
		}

		isCurrent(target: Services.Positions) {
			return this.pagePositionService.getPosition() === target;
		}

		isBackgroudShowed() {
			return this.pagePositionService.isBackgroudShowed();
		}
	}

}

BaronCV.TopbarController.$inject = ['$scope', 'pagePositionService', 'myResourceService'];
myApp.addController("topbarController", BaronCV.TopbarController); 