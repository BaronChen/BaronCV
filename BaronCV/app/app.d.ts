/// <reference path="../typings/angularjs/angular.d.ts" />
declare module BaronCV {
    interface IRootScope extends angular.IScope {
        topbarLoaded: boolean;
        aboutLoaded: boolean;
        headerwrapLoaded: boolean;
        skillLoaded: boolean;
        contactLoaded: boolean;
        experienceLoaded: boolean;
        locale: string;
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
        title: string;
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
    import ModalService = angular.ui.bootstrap.IModalService;
    interface IContactControllerScope extends ng.IScope {
        controller: ContactController;
    }
    class EmailDetail {
        name: string;
        email: string;
        message: string;
    }
    class ContactController {
        $scope: IContactControllerScope;
        private $modal;
        private emailModal;
        emailDetail: EmailDetail;
        constructor($scope: IContactControllerScope, $modal: ModalService);
        openEmailForm(): void;
        closeEmailForm(): void;
        onSubmit(): void;
    }
}
declare module BaronCV {
    interface IExperienceCtrlScope extends ng.IScope {
        title: string;
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
        enUrl: string;
        cnUrl: string;
        controller: HeaderWrapController;
    }
    class HeaderWrapController {
        private $scope;
        private pagePositionService;
        private myResourceService;
        private personalInfoResource;
        private $location;
        private $window;
        imagesLoadedEvent: any;
        constructor($scope: IHeaderWrapCtrlScope, pagePositionService: Services.PagePositionServices, myResourceService: Services.MyResourceService, $rootScope: IRootScope, $location: ng.ILocationService, $window: ng.IWindowService);
        isBackgroudShowed(): boolean;
        changeToEn(): void;
        changeToCn(): void;
        private parseUrtl(absUrl);
    }
}
declare module BaronCV {
    interface ISkillCtrlScope extends ng.IScope {
        title: string;
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
        private $timeout;
        constructor($animate: ng.IAnimateService, $window: ng.IWindowService, $timeout: ng.ITimeoutService);
        link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: any) => void;
        doScroll(element: ng.IAugmentedJQuery): void;
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
        private $workEl;
        private $resumeEl;
        private $aboutEl;
        private $headerEl;
        private $contactEl;
        private $headerwrapEl;
        private previousOffset;
        private $timeout;
        constructor($location: ng.ILocationService, $window: ng.IWindowService, $document: ng.IDocumentService, pagePositionService: Services.PagePositionServices, $timeout: ng.ITimeoutService);
        link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: any) => void;
        doScroll(): void;
        static factory(): ng.IDirectiveFactory;
    }
}
declare module BaronCV.Directives {
    class StopTouchEventDirective implements ng.IDirective {
        restrict: string;
        private $animate;
        private $window;
        constructor();
        link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attr: any, ctrl: any) => void;
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
        description: string[];
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
        title: string;
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
    class DebounceHandler {
        private $timeout;
        private fn;
        private interval;
        private previousTask;
        private actionFirstOne;
        constructor($timeout: ng.ITimeoutService, interval: number, actionFirstOne: boolean);
        process(fn: Function): ng.IPromise<any>;
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
        title: string;
        aboutText: string;
    }
    interface IAboutTextResource extends ng.resource.IResourceClass<IAboutTextWrap> {
    }
    interface ISkillWrap extends ng.resource.IResource<ISkillWrap> {
        title: string;
        programmingSkill: SkillSet;
        frontEndSkill: SkillSet;
        databaseSkill: SkillSet;
        otherSkill: SkillSet;
    }
    interface ISkillResource extends ng.resource.IResourceClass<ISkillWrap> {
    }
    interface IExperienceWrap extends ng.resource.IResource<IExperienceWrap> {
        title: string;
        experiences: Experience[];
    }
    interface IExperienceResource extends ng.resource.IResourceClass<IExperienceWrap> {
    }
    class MyResourceService {
        private $resource;
        private locale;
        constructor($resource: ng.resource.IResourceService, $rootScope: IRootScope);
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
