module BaronCV {
	export interface ISkillCtrlScope extends ng.IScope {
		graphData: GraphData;
		controller: SkillController;
	}

	export class SkillController {

		private $scope: ISkillCtrlScope;
		private myResourceService: Services.MyResourceService;
		private skillResource: Services.ISkillResource;

		constructor($scope: ISkillCtrlScope, myResourceService: Services.MyResourceService, $rootScope : IRootScope) {
			var self = this;
			self.$scope = $scope;
			self.$scope.controller = this;
			self.myResourceService = myResourceService;
			self.skillResource = self.myResourceService.getSkillesource();

			self.$scope.graphData = new GraphData(self.skillResource);
			self.$scope.graphData.getData();

			$rootScope.skillLoaded = true;

		}

	}
}

BaronCV.SkillController.$inject = ['$scope', 'myResourceService', '$rootScope'];
myApp.addController('skillController', BaronCV.SkillController);