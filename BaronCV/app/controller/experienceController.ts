module BaronCV {
	export interface IExperienceCtrlScope extends ng.IScope {
		controller: ExperienceController;
		myExperiences : MyExperiences;
	}

	export class ExperienceController {
		
		private $scope : IExperienceCtrlScope;
		private myResourceService: Services.MyResourceService;
		private experienceResource: Services.IExperienceResource;


		constructor($scope: IExperienceCtrlScope, myResourceService: Services.MyResourceService) {
			var self = this;
			self.$scope = $scope;
			self.myResourceService = myResourceService;

			self.experienceResource = self.myResourceService.getExperienceesource();

			self.experienceResource.get({}, (experienceWrap) => {
				self.$scope.myExperiences = new MyExperiences(experienceWrap);
			});
		}
	}
}

BaronCV.ExperienceController.$inject = ['$scope', 'myResourceService'];
myApp.addController('experienceController', BaronCV.ExperienceController);