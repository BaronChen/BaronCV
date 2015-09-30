module BaronCV {

	import ModalService = angular.ui.bootstrap.IModalService;

	 export interface IContactControllerScope extends ng.IScope{
		 controller: ContactController;
	 }

	export class EmailDetail {
		name: string;
		email: string;
		message: string;
     }

	 export class ContactController {
		 public $scope: IContactControllerScope;

		 private $modal: ModalService;

		 private emailModal: ng.ui.bootstrap.IModalServiceInstance;


		 public emailDetail : EmailDetail;

		 constructor($scope:IContactControllerScope, $modal:ModalService) {
			 var self = this;
			 self.$scope = $scope;
			 self.$scope.controller = this;

			 self.$modal = $modal;

			 self.emailDetail = new EmailDetail();
		 }

		 openEmailForm() {
			 var self = this;
			 self.emailModal = self.$modal.open({
				 animation: true,
				 templateUrl: 'emailModal',
				 windowClass: 'email-form',
				 backdropClass: 'email-form-backdrop',
				 scope: self.$scope,
				 keyboard: true
			 });
		 }

		 closeEmailForm() {
			 this.emailModal.dismiss('cancel');
		 }

		 onSubmit() {
			 //$http is good....However, in this case it may be just too clever that it always send an option header first...
             var setting: JQueryAjaxSettings = {
                 url: '//formspree.io/baron.zhongyangchen@gmail.com',
                 type: "Post",
                 data: { name: this.emailDetail.name, email: this.emailDetail.email, message: this.emailDetail.message, _subject: 'Message from personal site' },
                 dataType: "json"
             };     

             $.ajax(setting);
			
			 this.closeEmailForm();
		 }

	 }
}

 BaronCV.ContactController.$inject = ['$scope', '$modal'];
 myApp.addController("contactController", BaronCV.ContactController);