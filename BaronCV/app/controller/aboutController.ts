module BaronCV {
	'use strict';
	export interface IAboutCtrlScope extends ng.IScope {
		aboutText: AboutText;
	}

	export class AboutController {
		private $scope: IAboutCtrlScope;
		private myResourceService: Services.MyResourceService;
		private aboutTextResource: Services.IAboutTextResource;

		constructor($scope: IAboutCtrlScope, myResourceService: Services.MyResourceService, $rootScope : IRootScope) {
			var self = this;
			self.myResourceService = myResourceService;
			self.$scope = $scope;

			self.aboutTextResource = self.myResourceService.getAboutTextResource();

			self.aboutTextResource.get({}, (aboutTextWrap) => {
				self.$scope.aboutText = new AboutText(aboutTextWrap);
			});

			$rootScope.aboutLoaded = true;
		}
	}

}

BaronCV.AboutController.$inject = ['$scope', 'myResourceService', '$rootScope'];
myApp.addController("aboutController", BaronCV.AboutController); 