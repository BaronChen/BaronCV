module BaronCV {
	'use strict';
	export interface IAboutCtrlScope extends ng.IScope {
		aboutText: AboutText;
	}

	export class AboutController {
		private $scope: IAboutCtrlScope;
		private myResourceService: Services.MyResourceService;
		private aboutTextResource: Services.IAboutTextResource;

		constructor($scope: IAboutCtrlScope, myResourceService: Services.MyResourceService) {
			var self = this;
			self.myResourceService = myResourceService;
			self.$scope = $scope;

			self.aboutTextResource = self.myResourceService.getAboutTextResource();

			self.aboutTextResource.get({}, (aboutTextWrap) => {
				self.$scope.aboutText = new AboutText(aboutTextWrap);
			});

		}
	}

}

BaronCV.AboutController.$inject = ['$scope', 'myResourceService'];
myApp.addController("aboutController", BaronCV.AboutController); 