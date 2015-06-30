module BaronCV {
	export interface ISkillCtrlScope extends ng.IScope {
		graphData: GraphData;
		controller: SkillController;
	}

	export class SkillController {

		private $scope: ISkillCtrlScope;
		private myResourceService: Services.MyResourceService;
		private skillResource: Services.ISkillResource;

		constructor($scope: ISkillCtrlScope, myResourceService: Services.MyResourceService) {
			var self = this;
			self.$scope = $scope;
			self.$scope.controller = this;
			self.myResourceService = myResourceService;
			self.skillResource = self.myResourceService.getSkillesource();

			self.$scope.graphData = new GraphData(self.skillResource);
			self.$scope.graphData.getData();
			
		}

	}
}

BaronCV.SkillController.$inject = ['$scope', 'myResourceService'];
myApp.addController('skillController', BaronCV.SkillController);