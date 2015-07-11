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
		private $location: ng.ILocationService;
		private $window: ng.IWindowService;

		public imagesLoadedEvent  : any;

		constructor($scope: IHeaderWrapCtrlScope, pagePositionService: Services.PagePositionServices, myResourceService: Services.MyResourceService, $rootScope:IRootScope, $location:ng.ILocationService, $window:ng.IWindowService) {
			var self = this;	
			self.pagePositionService = pagePositionService;
			self.myResourceService = myResourceService;
			self.$scope = $scope;
			self.$scope.controller = this;

			self.$location = $location;
			self.$window = $window;

			self.personalInfoResource = self.myResourceService.getPersonalInforResource();

			self.personalInfoResource.get({}, (personalInfoWrap) => {
				self.$scope.personalInfo = new PersonalInfo(personalInfoWrap);				
			});

			self.$scope.controller.imagesLoadedEvent = {

				always: (instance) => {
				},

				done: (instance) => {
					$rootScope.headerwrapLoaded = true;
				},

				fail: (instance) => {
				}

			};

		}

		isBackgroudShowed() {
			return this.pagePositionService.isBackgroudShowed();
		}

		changeToEn() {
			this.$location.url('/home');

			this.$window.location.reload();
		}

		changeToCn() {

			this.$location.url('/home?locale=cn_zh');

			this.$window.location.reload();

		}
	}

}

BaronCV.HeaderWrapController.$inject = ['$scope', 'pagePositionService', 'myResourceService', '$rootScope', '$location', '$window'];
myApp.addController("headerWrapController", BaronCV.HeaderWrapController);