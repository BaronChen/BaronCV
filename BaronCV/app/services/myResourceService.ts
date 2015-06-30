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
		aboutText : string;
	}
	export interface IAboutTextResource extends ng.resource.IResourceClass<IAboutTextWrap> {
	}

	export interface ISkillWrap extends ng.resource.IResource<ISkillWrap> {
		programmingSkill: SkillSet;
		frontEndSkill: SkillSet;
		databaseSkill: SkillSet;
		otherSkill: SkillSet;
	}

	export interface ISkillResource extends ng.resource.IResourceClass<ISkillWrap> {
	}

	export interface IExperienceWrap extends ng.resource.IResource<IExperienceWrap> {
		experiences : Experience[];
	}

	export interface IExperienceResource extends ng.resource.IResourceClass<IExperienceWrap> {
	}

	export class MyResourceService {

		private $resource: ng.resource.IResourceService;
		
		constructor($resource: ng.resource.IResourceService) {
			var self = this;
			self.$resource = $resource;
		}

		getPersonalInforResource(): IPersonalInfoResource {
			var url = "app/data/personalInfo.json";
			var resource = this.$resource("", {},
				{
					'get': { method: 'GET', url: url }
				});

			return <IPersonalInfoResource> resource;
		}

		getAboutTextResource(): IAboutTextResource {
			var url = "app/data/about.json";
			var resource = this.$resource("", {},
				{
					'get': { method: 'GET', url: url }
				});

			return <IAboutTextResource> resource;
		}

		getSkillesource(): ISkillResource {
			var url = "app/data/skill.json";
			var resource = this.$resource("", {},
				{
					'get': { method: 'GET', url: url }
				});

			return <ISkillResource> resource;
		}

		getExperienceesource(): IExperienceResource {
			var url = "app/data/experience.json";
			var resource = this.$resource("", {},
				{
					'get': { method: 'GET', url: url }
				});

			return <IExperienceResource> resource;
		}

	}
}

BaronCV.Services.MyResourceService.$inject = ['$resource'];
myApp.addService('myResourceService', BaronCV.Services.MyResourceService);




