/// <reference path="../typings/angularjs/angular.d.ts" />
declare module BaronCV {
    interface IRootScope extends angular.IScope {
        topbarLoaded: boolean;
        aboutLoaded: boolean;
        headerwrapLoaded: boolean;
        skillLoaded: boolean;
        contactLoaded: boolean;
        experienceLoaded: boolean;
    }
    class MyApp {
        app: ng.IModule;
        constructor(name: string, modules: Array<string>);
        addController(name: string, controller: Function): void;
        addService(name: string, service: Function): void;
        addDirective(name: string, directive: ng.IDirectiveFactory): void;
        configApp(config: Function): void;
    }
}
declare var myApp: BaronCV.MyApp;
declare module BaronCV.Config {
    class Config {
        constructor($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider);
    }
}
declare module BaronCV {
    interface IAboutCtrlScope extends ng.IScope {
        aboutText: AboutText;
    }
    class AboutController {
        private $scope;
        private myResourceService;
        private aboutTextResource;
        constructor($scope: IAboutCtrlScope, myResourceService: Services.MyResourceService, $rootScope: IRootScope);
    }
}
declare module BaronCV {
    interface ICarouselCtrlScope extends ng.IScope {
        controller: CarouselController;
        myInterval: number;
        slides: any;
    }
    class CarouselController {
        private $scope;
        private myResourceService;
        constructor($scope: ICarouselCtrlScope, myResourceService: Services.MyResourceService, $rootScope: IRootScope);
    }
}
declare module BaronCV {
    interface IExperienceCtrlScope extends ng.IScope {
        controller: ExperienceController;
        myExperiences: MyExperiences;
    }
    class ExperienceController {
        private $scope;
        private myResourceService;
        private experienceResource;
        constructor($scope: IExperienceCtrlScope, myResourceService: Services.MyResourceService, $rootScope: IRootScope);
    }
}
declare module BaronCV {
    interface IHeaderWrapCtrlScope extends ng.IScope {
        personalInfo: PersonalInfo;
        controller: HeaderWrapController;
    }
    class HeaderWrapController {
        private $scope;
        private pagePositionService;
        private myResourceService;
        private personalInfoResource;
        constructor($scope: IHeaderWrapCtrlScope, pagePositionService: Services.PagePositionServices, myResourceService: Services.MyResourceService, $rootScope: IRootScope);
        isBackgroudShowed(): boolean;
    }
}
declare module BaronCV {
    interface ISkillCtrlScope extends ng.IScope {
        graphData: GraphData;
        controller: SkillController;
    }
    class SkillController {
        private $scope;
        private myResourceService;
        private skillResource;
        constructor($scope: ISkillCtrlScope, myResourceService: Services.MyResourceService, $rootScope: IRootScope);
    }
}
declare module BaronCV {
    interface ITopbarCtrlScope extends angular.IScope {
        controller: TopbarController;
    }
    class TopbarController {
        private $scope;
        private pagePositionService;
        constructor($scope: ITopbarCtrlScope, pagePositionService: Services.PagePositionServices, myResourceService: Services.MyResourceService, $rootScope: IRootScope);
        select(target: Services.Positions): void;
        isCurrent(target: Services.Positions): boolean;
        isBackgroudShowed(): boolean;
    }
}
declare module BaronCV.Directives {
    class GlowingDirective implements ng.IDirective {
        restrict: string;
        private $animate;
        private $window;
        constructor($animate: ng.IAnimateService, $window: ng.IWindowService);
        link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: any) => void;
        static factory(): ng.IDirectiveFactory;
    }
}
declare module BaronCV.Directives {
    class ScrollDirective implements ng.IDirective {
        restrict: string;
        private $location;
        private $window;
        private $document;
        private pagePositionService;
        constructor($location: ng.ILocationService, $window: ng.IWindowService, $document: ng.IDocumentService, pagePositionService: Services.PagePositionServices);
        link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: any) => void;
        static factory(): ng.IDirectiveFactory;
    }
}
declare module BaronCV {
    class AboutText {
        text: string;
        constructor(aboutTextWrap: Services.IAboutTextWrap);
    }
}
declare module BaronCV {
    class Experience {
        title: string;
        company: string;
        time: string;
        badge: string;
        description: string;
        badgeStyle: string;
    }
    class MyExperiences {
        experiences: Experience[];
        constructor(experienceWrap: Services.IExperienceWrap);
    }
}
declare module BaronCV {
    class PersonalInfo {
        firstName: string;
        lastName: string;
        email: string;
        jobTitle: string;
        constructor(personalInfoWrap: Services.IPersonalInfoWrap);
    }
}
declare module BaronCV {
    class SkillSet {
        data: number[][];
        initData: number[][];
        labels: string[];
        constructor();
    }
    class GraphData {
        private skillResource;
        programmingSkill: SkillSet;
        frontEndSkill: SkillSet;
        databaseSkill: SkillSet;
        otherSkill: SkillSet;
        skillWrap: Services.ISkillWrap;
        graphOptions: any;
        colors: any;
        mapData(): void;
        getData(): void;
        init(): void;
        constructor(skillResource: Services.ISkillResource);
    }
}
declare module BaronCV.Services {
    interface IPersonalInfoWrap extends ng.resource.IResource<IPersonalInfoWrap> {
        firstName: string;
        lastName: string;
        email: string;
        jobTitle: string;
    }
    interface IPersonalInfoResource extends ng.resource.IResourceClass<IPersonalInfoWrap> {
    }
    interface IAboutTextWrap extends ng.resource.IResource<IAboutTextWrap> {
        aboutText: string;
    }
    interface IAboutTextResource extends ng.resource.IResourceClass<IAboutTextWrap> {
    }
    interface ISkillWrap extends ng.resource.IResource<ISkillWrap> {
        programmingSkill: SkillSet;
        frontEndSkill: SkillSet;
        databaseSkill: SkillSet;
        otherSkill: SkillSet;
    }
    interface ISkillResource extends ng.resource.IResourceClass<ISkillWrap> {
    }
    interface IExperienceWrap extends ng.resource.IResource<IExperienceWrap> {
        experiences: Experience[];
    }
    interface IExperienceResource extends ng.resource.IResourceClass<IExperienceWrap> {
    }
    class MyResourceService {
        private $resource;
        constructor($resource: ng.resource.IResourceService);
        getPersonalInforResource(): IPersonalInfoResource;
        getAboutTextResource(): IAboutTextResource;
        getSkillesource(): ISkillResource;
        getExperienceesource(): IExperienceResource;
    }
}
declare module BaronCV.Services {
    enum Positions {
        Undefined = 0,
        About = 1,
        Resume = 2,
        Work = 3,
        Contact = 4,
    }
    class PagePositionServices {
        private pagePosition;
        private isBackGroundShowed;
        selectPosition(position: Positions): void;
        getPosition(): Positions;
        setIsBackGroundShowed(showed: boolean): void;
        isBackgroudShowed(): boolean;
    }
}
