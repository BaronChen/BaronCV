///<reference path="../typings/angularjs/angular.d.ts"/>
var BaronCV;
(function (BaronCV) {
    "use strict";
    var MyApp = (function () {
        function MyApp(name, modules) {
            this.app = angular.module(name, modules);
            this.app.run([
                '$rootScope', '$location', function ($rootScope, $location) {
                    $rootScope.Positions = BaronCV.Services.Positions;
                    if ($location.search().locale && $location.search().locale == 'cn_zh') {
                        $rootScope.locale = $location.search().locale;
                    }
                    else {
                        $rootScope.locale = 'en_au';
                    }
                }
            ]);
        }
        MyApp.prototype.addController = function (name, controller) {
            this.app.controller(name, controller);
        };
        MyApp.prototype.addService = function (name, service) {
            this.app.service(name, service);
        };
        MyApp.prototype.addDirective = function (name, directive) {
            this.app.directive(name, directive);
        };
        MyApp.prototype.configApp = function (config) {
            this.app.config(config);
        };
        return MyApp;
    })();
    BaronCV.MyApp = MyApp;
})(BaronCV || (BaronCV = {}));
var myApp = new BaronCV.MyApp("baronCV", ['ngAnimate', 'ui.bootstrap', 'ngRoute', 'duScroll', 'ui.router', 'ngResource', 'chart.js', 'angular-images-loaded']);
var BaronCV;
(function (BaronCV) {
    var Config;
    (function (Config_1) {
        var Config = (function () {
            function Config($stateProvider, $urlRouterProvider) {
                $urlRouterProvider.otherwise("/home");
                $stateProvider
                    .state('home', {
                    url: "/home",
                    templateUrl: "app/view/app.html"
                });
            }
            return Config;
        })();
        Config_1.Config = Config;
    })(Config = BaronCV.Config || (BaronCV.Config = {}));
})(BaronCV || (BaronCV = {}));
BaronCV.Config.Config.$inject = ['$stateProvider', '$urlRouterProvider'];
myApp.configApp(BaronCV.Config.Config);
var BaronCV;
(function (BaronCV) {
    'use strict';
    var AboutController = (function () {
        function AboutController($scope, myResourceService, $rootScope) {
            var self = this;
            self.myResourceService = myResourceService;
            self.$scope = $scope;
            self.aboutTextResource = self.myResourceService.getAboutTextResource();
            self.aboutTextResource.get({}, function (aboutTextWrap) {
                self.$scope.aboutText = new BaronCV.AboutText(aboutTextWrap);
                self.$scope.title = aboutTextWrap.title;
            });
            $rootScope.aboutLoaded = true;
        }
        return AboutController;
    })();
    BaronCV.AboutController = AboutController;
})(BaronCV || (BaronCV = {}));
BaronCV.AboutController.$inject = ['$scope', 'myResourceService', '$rootScope'];
myApp.addController("aboutController", BaronCV.AboutController);
var BaronCV;
(function (BaronCV) {
    var CarouselController = (function () {
        function CarouselController($scope, myResourceService, $rootScope) {
            var self = this;
            self.$scope = $scope;
            self.$scope.controller = this;
            self.myResourceService = myResourceService;
            self.$scope.myInterval = 3000;
            var slides = self.$scope.slides = [
                {
                    text: 'Physicists analyze systems. Web scientists, however, can create the systems.',
                    person: 'Tim Berners-Lee'
                },
                {
                    text: 'Measuring programming progress by lines of code is like measuring aircraft building progress by weight.',
                    person: 'Bill Gates'
                },
                {
                    text: 'I think Microsoft named .Net so it wouldn’t show up in a Unix directory listing.',
                    person: 'Oktal'
                },
                {
                    text: 'Don’t worry if it doesn’t work right. If everything did, you’d be out of a job.',
                    person: 'My mom'
                }
            ];
            $rootScope.contactLoaded = true;
        }
        return CarouselController;
    })();
    BaronCV.CarouselController = CarouselController;
})(BaronCV || (BaronCV = {}));
BaronCV.CarouselController.$inject = ['$scope', 'myResourceService', '$rootScope'];
myApp.addController('carouselController', BaronCV.CarouselController);
var BaronCV;
(function (BaronCV) {
    var EmailDetail = (function () {
        function EmailDetail() {
        }
        return EmailDetail;
    })();
    BaronCV.EmailDetail = EmailDetail;
    var ContactController = (function () {
        function ContactController($scope, $modal) {
            var self = this;
            self.$scope = $scope;
            self.$scope.controller = this;
            self.$modal = $modal;
            self.emailDetail = new EmailDetail();
        }
        ContactController.prototype.openEmailForm = function () {
            var self = this;
            self.emailModal = self.$modal.open({
                animation: true,
                templateUrl: 'emailModal',
                windowClass: 'email-form',
                backdropClass: 'email-form-backdrop',
                scope: self.$scope,
                keyboard: true
            });
        };
        ContactController.prototype.closeEmailForm = function () {
            this.emailModal.dismiss('cancel');
        };
        ContactController.prototype.onSubmit = function () {
            //$http is good....However, in this case it may be just too clever that it always send an option header first...
            $.ajax({
                url: "//formspree.io/baron.zhongyangchen@gmail.com",
                method: "POST",
                data: { name: this.emailDetail.name, email: this.emailDetail.email, message: this.emailDetail.message, _subject: 'Message from personal site' },
                dataType: 'json'
            });
            this.closeEmailForm();
        };
        return ContactController;
    })();
    BaronCV.ContactController = ContactController;
})(BaronCV || (BaronCV = {}));
BaronCV.ContactController.$inject = ['$scope', '$modal'];
myApp.addController("contactController", BaronCV.ContactController);
var BaronCV;
(function (BaronCV) {
    var ExperienceController = (function () {
        function ExperienceController($scope, myResourceService, $rootScope) {
            var self = this;
            self.$scope = $scope;
            self.myResourceService = myResourceService;
            self.experienceResource = self.myResourceService.getExperienceesource();
            self.experienceResource.get({}, function (experienceWrap) {
                self.$scope.myExperiences = new BaronCV.MyExperiences(experienceWrap);
                self.$scope.title = experienceWrap.title;
            });
            $rootScope.experienceLoaded = true;
        }
        return ExperienceController;
    })();
    BaronCV.ExperienceController = ExperienceController;
})(BaronCV || (BaronCV = {}));
BaronCV.ExperienceController.$inject = ['$scope', 'myResourceService', '$rootScope'];
myApp.addController('experienceController', BaronCV.ExperienceController);
var BaronCV;
(function (BaronCV) {
    'use strict';
    var HeaderWrapController = (function () {
        function HeaderWrapController($scope, pagePositionService, myResourceService, $rootScope, $location, $window) {
            var self = this;
            self.pagePositionService = pagePositionService;
            self.myResourceService = myResourceService;
            self.$scope = $scope;
            self.$scope.controller = this;
            self.$location = $location;
            self.$window = $window;
            var url = this.parseUrtl(this.$location.absUrl());
            self.$scope.enUrl = url + "#/home";
            self.$scope.cnUrl = url + "#/home?locale=cn_zh";
            self.personalInfoResource = self.myResourceService.getPersonalInforResource();
            self.personalInfoResource.get({}, function (personalInfoWrap) {
                self.$scope.personalInfo = new BaronCV.PersonalInfo(personalInfoWrap);
            });
            self.$scope.controller.imagesLoadedEvent = {
                always: function (instance) {
                },
                done: function (instance) {
                    $rootScope.headerwrapLoaded = true;
                },
                fail: function (instance) {
                }
            };
        }
        HeaderWrapController.prototype.isBackgroudShowed = function () {
            return this.pagePositionService.isBackgroudShowed();
        };
        HeaderWrapController.prototype.changeToEn = function () {
            var url = this.parseUrtl(this.$location.absUrl()) + "#/home";
            window.location.href = url;
            window.location.reload(true);
        };
        HeaderWrapController.prototype.changeToCn = function () {
            var url = this.parseUrtl(this.$location.absUrl()) + "#/home?locale=cn_zh";
            window.location.href = url;
            window.location.reload(true);
        };
        HeaderWrapController.prototype.parseUrtl = function (absUrl) {
            var parser = document.createElement('a');
            parser.href = absUrl;
            return parser.protocol + "//" + parser.host + "/";
        };
        return HeaderWrapController;
    })();
    BaronCV.HeaderWrapController = HeaderWrapController;
})(BaronCV || (BaronCV = {}));
BaronCV.HeaderWrapController.$inject = ['$scope', 'pagePositionService', 'myResourceService', '$rootScope', '$location', '$window'];
myApp.addController("headerWrapController", BaronCV.HeaderWrapController);
var BaronCV;
(function (BaronCV) {
    var SkillController = (function () {
        function SkillController($scope, myResourceService, $rootScope) {
            var self = this;
            self.$scope = $scope;
            self.$scope.controller = this;
            self.myResourceService = myResourceService;
            self.skillResource = self.myResourceService.getSkillesource();
            self.$scope.graphData = new BaronCV.GraphData(self.skillResource);
            self.$scope.graphData.getData();
            $rootScope.skillLoaded = true;
        }
        return SkillController;
    })();
    BaronCV.SkillController = SkillController;
})(BaronCV || (BaronCV = {}));
BaronCV.SkillController.$inject = ['$scope', 'myResourceService', '$rootScope'];
myApp.addController('skillController', BaronCV.SkillController);
var BaronCV;
(function (BaronCV) {
    'use strict';
    var TopbarController = (function () {
        function TopbarController($scope, pagePositionService, myResourceService, $rootScope) {
            var self = this;
            self.$scope = $scope;
            self.pagePositionService = pagePositionService;
            self.$scope.controller = this;
            $rootScope.topbarLoaded = true;
        }
        TopbarController.prototype.select = function (target) {
            this.pagePositionService.selectPosition(target);
        };
        TopbarController.prototype.isCurrent = function (target) {
            return this.pagePositionService.getPosition() === target;
        };
        TopbarController.prototype.isBackgroudShowed = function () {
            return this.pagePositionService.isBackgroudShowed();
        };
        return TopbarController;
    })();
    BaronCV.TopbarController = TopbarController;
})(BaronCV || (BaronCV = {}));
BaronCV.TopbarController.$inject = ['$scope', 'pagePositionService', 'myResourceService', '$rootScope'];
myApp.addController("topbarController", BaronCV.TopbarController);
var BaronCV;
(function (BaronCV) {
    var Directives;
    (function (Directives) {
        var GlowingDirective = (function () {
            function GlowingDirective($animate, $window, $timeout) {
                var _this = this;
                this.restrict = 'A';
                this.link = function (scope, element, attrs, ctrl) {
                    element.bind('mouseover', function () {
                        element.addClass('glowing');
                        element.removeClass('my-text-muted');
                    });
                    element.bind('mouseleave', function () {
                        var windowHeight = _this.$window.innerHeight;
                        var scrollHeight = _this.$window.pageYOffset;
                        var elementTopHeight = element.offset().top;
                        var elementHeight = element.innerHeight();
                        var targetHeoght = scrollHeight + windowHeight / 2;
                        if (elementTopHeight > targetHeoght || elementTopHeight + elementHeight <= targetHeoght) {
                            element.removeClass('glowing');
                            element.addClass('my-text-muted');
                        }
                    });
                    var debounceHandler = new BaronCV.Services.DebounceHandler(_this.$timeout, 300, false);
                    angular.element(_this.$window).bind('scroll', function () {
                        debounceHandler.process(function () { _this.doScroll(element); });
                    });
                };
                var self = this;
                self.$animate = $animate;
                self.$window = $window;
                self.$timeout = $timeout;
            }
            GlowingDirective.prototype.doScroll = function (element) {
                //console.log("glowing scroll called");
                var windowHeight = this.$window.innerHeight;
                var scrollHeight = this.$window.pageYOffset;
                var elementTopHeight = element.offset().top;
                var elementHeight = element.innerHeight();
                var targetHeoght = scrollHeight + windowHeight / 2;
                if (elementTopHeight <= targetHeoght && elementTopHeight + elementHeight > targetHeoght) {
                    element.addClass('glowing');
                    element.removeClass('my-text-muted');
                }
                else {
                    element.removeClass('glowing');
                    element.addClass('my-text-muted');
                }
            };
            GlowingDirective.factory = function () {
                var directive = function ($animate, $window, debounce) { return new GlowingDirective($animate, $window, debounce); };
                directive.$inject = ['$animate', '$window', '$timeout'];
                return directive;
            };
            return GlowingDirective;
        })();
        Directives.GlowingDirective = GlowingDirective;
    })(Directives = BaronCV.Directives || (BaronCV.Directives = {}));
})(BaronCV || (BaronCV = {}));
myApp.addDirective("myGlowing", BaronCV.Directives.GlowingDirective.factory());
var BaronCV;
(function (BaronCV) {
    var Directives;
    (function (Directives) {
        var ScrollDirective = (function () {
            function ScrollDirective($location, $window, $document, pagePositionService, $timeout) {
                var _this = this;
                this.restrict = 'A';
                this.link = function (scope, element, attrs, ctrl) {
                    var debounceHandler = new BaronCV.Services.DebounceHandler(_this.$timeout, 300, true);
                    angular.element(_this.$window).bind('scroll', function () {
                        debounceHandler.process(function () { _this.doScroll(); });
                    });
                };
                var self = this;
                self.$location = $location;
                self.$window = $window;
                self.$document = $document;
                self.pagePositionService = pagePositionService;
                this.previousOffset = 0;
                this.$timeout = $timeout;
            }
            ScrollDirective.prototype.doScroll = function () {
                var self = this;
                //console.log("topbar scroll called!");
                var scrollHeight = self.$window.pageYOffset;
                if (!self.$workEl) {
                    self.$workEl = angular.element($('#skillswrap'));
                    self.$resumeEl = angular.element($('#resume'));
                    self.$aboutEl = angular.element($('#about'));
                    self.$headerEl = angular.element($('#headerwrap'));
                    self.$contactEl = angular.element($('#footwrap'));
                    self.$headerwrapEl = angular.element($('#headerwrap'));
                }
                //var headerOffset = this.$headerwrapEl.offset().top;
                var windowHeight = this.$window.innerHeight;
                var topbarElement = document.querySelector('#section-topbar');
                var topbarScope = angular.element(topbarElement).scope();
                var skillswrapElement = document.querySelector('#skillswrap');
                var skillswrapScope = angular.element(skillswrapElement).scope();
                var targetHeight = scrollHeight + windowHeight / 3;
                var previousPagePosition = this.pagePositionService.getPosition();
                if (this.$contactEl.offset().top <= targetHeight || scrollHeight + windowHeight >= this.$document.innerHeight()) {
                    this.pagePositionService.selectPosition(BaronCV.Services.Positions.Contact);
                }
                else if (self.$workEl.offset().top <= targetHeight) {
                    this.pagePositionService.selectPosition(BaronCV.Services.Positions.Work);
                    skillswrapScope.graphData.mapData();
                }
                else if (self.$resumeEl.offset().top <= targetHeight) {
                    this.pagePositionService.selectPosition(BaronCV.Services.Positions.Resume);
                }
                else if (self.$aboutEl.offset().top <= targetHeight) {
                    this.pagePositionService.selectPosition(BaronCV.Services.Positions.About);
                }
                else if (self.$headerEl.offset().top <= targetHeight) {
                    this.pagePositionService.selectPosition(BaronCV.Services.Positions.Undefined);
                }
                //top bar class changes
                //var topbarEl = angular.element($('#topbar-inner'));
                //var topbarNavEl = angular.element($('#section-topbar ul#nav'));
                //var topbarAEl = angular.element($('#section-topbar ul#nav a'));
                var previousValue = this.pagePositionService.isBackgroudShowed();
                var newValue = false;
                if (scrollHeight > 0) {
                    newValue = true;
                }
                else {
                    newValue = false;
                }
                if (previousValue !== newValue) {
                    this.pagePositionService.setIsBackGroundShowed(newValue);
                }
                if (previousValue !== newValue || previousPagePosition !== this.pagePositionService.getPosition()) {
                    topbarScope.$apply();
                }
            };
            ScrollDirective.factory = function () {
                var directive = function ($location, $window, $document, pagePositionService, debounce) {
                    return new ScrollDirective($location, $window, $document, pagePositionService, debounce);
                };
                directive.$inject = ['$location', '$window', '$document', 'pagePositionService', '$timeout'];
                return directive;
            };
            return ScrollDirective;
        })();
        Directives.ScrollDirective = ScrollDirective;
    })(Directives = BaronCV.Directives || (BaronCV.Directives = {}));
})(BaronCV || (BaronCV = {}));
myApp.addDirective("myScroll", BaronCV.Directives.ScrollDirective.factory());
var BaronCV;
(function (BaronCV) {
    var Directives;
    (function (Directives) {
        //this directive is for a Angular touch bug work around
        var StopTouchEventDirective = (function () {
            function StopTouchEventDirective() {
                this.restrict = 'A';
                this.link = function (scope, element, attr, ctrl) {
                    if (attr && attr.stopEvent) {
                        element.on(attr.stopEvent, function (e) {
                            e.stopPropagation();
                        });
                    }
                };
                var self = this;
            }
            StopTouchEventDirective.factory = function () {
                var directive = function () { return new StopTouchEventDirective(); };
                directive.$inject = [];
                return directive;
            };
            return StopTouchEventDirective;
        })();
        Directives.StopTouchEventDirective = StopTouchEventDirective;
    })(Directives = BaronCV.Directives || (BaronCV.Directives = {}));
})(BaronCV || (BaronCV = {}));
myApp.addDirective("stopEvent", BaronCV.Directives.StopTouchEventDirective.factory());
var BaronCV;
(function (BaronCV) {
    'use strict';
    var AboutText = (function () {
        function AboutText(aboutTextWrap) {
            this.text = aboutTextWrap.aboutText;
        }
        return AboutText;
    })();
    BaronCV.AboutText = AboutText;
})(BaronCV || (BaronCV = {}));
var BaronCV;
(function (BaronCV) {
    'use strict';
    var Experience = (function () {
        function Experience() {
        }
        return Experience;
    })();
    BaronCV.Experience = Experience;
    var MyExperiences = (function () {
        function MyExperiences(experienceWrap) {
            this.experiences = experienceWrap.experiences;
        }
        return MyExperiences;
    })();
    BaronCV.MyExperiences = MyExperiences;
})(BaronCV || (BaronCV = {}));
var BaronCV;
(function (BaronCV) {
    'use strict';
    var PersonalInfo = (function () {
        function PersonalInfo(personalInfoWrap) {
            this.firstName = personalInfoWrap.firstName;
            this.lastName = personalInfoWrap.lastName;
            this.email = personalInfoWrap.email;
            this.jobTitle = personalInfoWrap.jobTitle;
        }
        return PersonalInfo;
    })();
    BaronCV.PersonalInfo = PersonalInfo;
})(BaronCV || (BaronCV = {}));
var BaronCV;
(function (BaronCV) {
    var SkillSet = (function () {
        function SkillSet() {
            this.data = [[]];
            this.initData = [[]];
            this.labels = [];
        }
        return SkillSet;
    })();
    BaronCV.SkillSet = SkillSet;
    var GraphData = (function () {
        function GraphData(skillResource) {
            this.graphOptions = {
                pointLabelFontColor: "#fff",
                pointLabelFontSize: 14
            };
            this.colors = ['#1abc9c'];
            this.programmingSkill = new SkillSet();
            this.frontEndSkill = new SkillSet();
            this.databaseSkill = new SkillSet();
            this.otherSkill = new SkillSet();
            this.skillResource = skillResource;
        }
        GraphData.prototype.mapData = function () {
            this.programmingSkill.data = this.skillWrap.programmingSkill.data;
            this.frontEndSkill.data = this.skillWrap.frontEndSkill.data;
            this.databaseSkill.data = this.skillWrap.databaseSkill.data;
            this.otherSkill.data = this.skillWrap.otherSkill.data;
        };
        GraphData.prototype.getData = function () {
            var self = this;
            this.skillResource.get({}, function (skillWrap) {
                self.skillWrap = skillWrap;
                self.init();
                self.title = skillWrap.title;
                //self.mapData();
            });
        };
        GraphData.prototype.init = function () {
            this.programmingSkill.labels = this.skillWrap.programmingSkill.labels;
            this.frontEndSkill.labels = this.skillWrap.frontEndSkill.labels;
            this.databaseSkill.labels = this.skillWrap.databaseSkill.labels;
            this.otherSkill.labels = this.skillWrap.otherSkill.labels;
            this.programmingSkill.data = this.skillWrap.programmingSkill.initData;
            this.frontEndSkill.data = this.skillWrap.frontEndSkill.initData;
            this.databaseSkill.data = this.skillWrap.databaseSkill.initData;
            this.otherSkill.data = this.skillWrap.otherSkill.initData;
        };
        return GraphData;
    })();
    BaronCV.GraphData = GraphData;
})(BaronCV || (BaronCV = {}));
var BaronCV;
(function (BaronCV) {
    var Services;
    (function (Services) {
        var DebounceHandler = (function () {
            function DebounceHandler($timeout, interval, actionFirstOne) {
                this.$timeout = $timeout;
                this.interval = interval;
                this.actionFirstOne = actionFirstOne;
            }
            DebounceHandler.prototype.process = function (fn) {
                var _this = this;
                this.fn = fn;
                if (this.previousTask) {
                    this.$timeout.cancel(this.previousTask);
                }
                else if (this.actionFirstOne) {
                    this.fn.apply(this);
                }
                this.previousTask = this.$timeout(function () {
                    _this.fn.apply(_this);
                    _this.previousTask = null;
                }, this.interval);
                return this.previousTask;
            };
            return DebounceHandler;
        })();
        Services.DebounceHandler = DebounceHandler;
    })(Services = BaronCV.Services || (BaronCV.Services = {}));
})(BaronCV || (BaronCV = {}));
var BaronCV;
(function (BaronCV) {
    var Services;
    (function (Services) {
        var MyResourceService = (function () {
            function MyResourceService($resource, $rootScope) {
                var self = this;
                self.$resource = $resource;
                this.locale = $rootScope.locale;
            }
            MyResourceService.prototype.getPersonalInforResource = function () {
                var url = "app/data/" + this.locale + "/personalInfo.json";
                var resource = this.$resource("", {}, {
                    'get': { method: 'GET', url: url }
                });
                return resource;
            };
            MyResourceService.prototype.getAboutTextResource = function () {
                var url = "app/data/" + this.locale + "/about.json";
                var resource = this.$resource("", {}, {
                    'get': { method: 'GET', url: url }
                });
                return resource;
            };
            MyResourceService.prototype.getSkillesource = function () {
                var url = "app/data/" + this.locale + "/skill.json";
                var resource = this.$resource("", {}, {
                    'get': { method: 'GET', url: url }
                });
                return resource;
            };
            MyResourceService.prototype.getExperienceesource = function () {
                var url = "app/data/" + this.locale + "/experience.json";
                var resource = this.$resource("", {}, {
                    'get': { method: 'GET', url: url }
                });
                return resource;
            };
            return MyResourceService;
        })();
        Services.MyResourceService = MyResourceService;
    })(Services = BaronCV.Services || (BaronCV.Services = {}));
})(BaronCV || (BaronCV = {}));
BaronCV.Services.MyResourceService.$inject = ['$resource', '$rootScope'];
myApp.addService('myResourceService', BaronCV.Services.MyResourceService);
var BaronCV;
(function (BaronCV) {
    var Services;
    (function (Services) {
        (function (Positions) {
            Positions[Positions["Undefined"] = 0] = "Undefined";
            Positions[Positions["About"] = 1] = "About";
            Positions[Positions["Resume"] = 2] = "Resume";
            Positions[Positions["Work"] = 3] = "Work";
            Positions[Positions["Contact"] = 4] = "Contact";
        })(Services.Positions || (Services.Positions = {}));
        var Positions = Services.Positions;
        var PagePositionServices = (function () {
            function PagePositionServices() {
            }
            PagePositionServices.prototype.selectPosition = function (position) {
                this.pagePosition = position;
            };
            PagePositionServices.prototype.getPosition = function () {
                return this.pagePosition;
            };
            PagePositionServices.prototype.setIsBackGroundShowed = function (showed) {
                this.isBackGroundShowed = showed;
            };
            PagePositionServices.prototype.isBackgroudShowed = function () {
                return this.isBackGroundShowed;
            };
            return PagePositionServices;
        })();
        Services.PagePositionServices = PagePositionServices;
    })(Services = BaronCV.Services || (BaronCV.Services = {}));
})(BaronCV || (BaronCV = {}));
BaronCV.Services.PagePositionServices.$inject = [];
myApp.addService('pagePositionService', BaronCV.Services.PagePositionServices);
//# sourceMappingURL=app.js.map