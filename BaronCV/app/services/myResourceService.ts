module BaronCV.Services {
	export interface IPersonalInfoWrap extends ng.resource.IResource<IPersonalInfoWrap> {
		firstName: string;
		lastName: string;
		email: string;
		jobTitle: string;
	}
	export interface IPersonalInfoResource extends ng.resource.IResourceClass<IPersonalInfoWrap> {
	}

	export interface IAboutTextWrap extends ng.resource.IResource<IAboutTextWrap> {
		title: string;
		aboutText : string;
	}
	export interface IAboutTextResource extends ng.resource.IResourceClass<IAboutTextWrap> {
	}

	export interface ISkillWrap extends ng.resource.IResource<ISkillWrap> {
		title: string;
		programmingSkill: SkillSet;
		frontEndSkill: SkillSet;
		databaseSkill: SkillSet;
		otherSkill: SkillSet;
	}

	export interface ISkillResource extends ng.resource.IResourceClass<ISkillWrap> {
	}

	export interface IExperienceWrap extends ng.resource.IResource<IExperienceWrap> {
		title: string;
		experiences : Experience[];
	}

	export interface IExperienceResource extends ng.resource.IResourceClass<IExperienceWrap> {
	}

	export class MyResourceService {

		private $resource: ng.resource.IResourceService;
		
		private locale:string;

		constructor($resource: ng.resource.IResourceService, $rootScope:IRootScope) {
			var self = this;
			self.$resource = $resource;
			this.locale = $rootScope.locale;
		}

		getPersonalInforResource(): IPersonalInfoResource {
			var url = "app/data/" + this.locale+"/personalInfo.json";
			var resource = this.$resource("", {},
				{
					'get': { method: 'GET', url: url }
				});

			return <IPersonalInfoResource> resource;
		}

		getAboutTextResource(): IAboutTextResource {
			var url = "app/data/" + this.locale +"/about.json";
			var resource = this.$resource("", {},
				{
					'get': { method: 'GET', url: url }
				});

			return <IAboutTextResource> resource;
		}

		getSkillesource(): ISkillResource {
			var url = "app/data/" + this.locale +"/skill.json";
			var resource = this.$resource("", {},
				{
					'get': { method: 'GET', url: url }
				});

			return <ISkillResource> resource;
		}

		getExperienceesource(): IExperienceResource {
			var url = "app/data/" + this.locale +"/experience.json";
			var resource = this.$resource("", {},
				{
					'get': { method: 'GET', url: url }
				});

			return <IExperienceResource> resource;
		}

	}
}

BaronCV.Services.MyResourceService.$inject = ['$resource', '$rootScope'];
myApp.addService('myResourceService', BaronCV.Services.MyResourceService);




