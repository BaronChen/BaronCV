module BaronCV {
	'use strict';
	export interface IHeaderWrapCtrlScope extends ng.IScope {
		personalInfo: PersonalInfo;
		controller: HeaderWrapController;
	}

	export class HeaderWrapController {
		private $scope: IHeaderWrapCtrlScope;
		private pagePositionService: Services.PagePositionServices;
		private myResourceService: Services.MyResourceService;
		private personalInfoResource: Services.IPersonalInfoResource;

		constructor($scope: IHeaderWrapCtrlScope, pagePositionService: Services.PagePositionServices, myResourceService: Services.MyResourceService) {
			var self = this;	
			self.pagePositionService = pagePositionService;
			self.myResourceService = myResourceService;
			self.$scope = $scope;
			self.$scope.controller = this;
			
			self.personalInfoResource = self.myResourceService.getPersonalInforResource();

			self.personalInfoResource.get({}, (personalInfoWrap) => {
				self.$scope.personalInfo = new PersonalInfo(personalInfoWrap);				
			});

		}

		isBackgroudShowed() {
			return this.pagePositionService.isBackgroudShowed();
		}
	}

}

BaronCV.HeaderWrapController.$inject = ['$scope', 'pagePositionService', 'myResourceService'];
myApp.addController("headerWrapController", BaronCV.HeaderWrapController);