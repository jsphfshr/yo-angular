'use strict';

/* Controllers */

angular.module('app.controllers', ['pascalprecht.translate', 'ngCookies'])
    .controller('AppCtrl', ['$rootScope', '$scope', '$translate', '$localStorage', '$window',
        function($rootScope, $scope, $translate) {

            // function isSmartDevice($window) {
            //     // Adapted from http://www.detectmobilebrowsers.com
            //     var ua = $window.navigator.userAgent || $window.navigator.vendor || $window.opera;
            //     // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
            //     return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
            // }

            // add 'ie' classes to html
            //var isIE = !!navigator.userAgent.match(/MSIE/i);
            //isIE && angular.element($window.document.body).addClass('ie');
            //isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

            // config
            $scope.app = {
                name: 'Angulr',
                version: '1.3.1',
                // for chart colors
                color: {
                    primary: '#7266ba',
                    info: '#23b7e5',
                    success: '#27c24c',
                    warning: '#fad733',
                    danger: '#f05050',
                    light: '#e8eff0',
                    dark: '#3a3f51',
                    black: '#1c2b36'
                },
                settings: {
                    themeID: 1,
                    navbarHeaderColor: 'bg-primary',
                    navbarCollapseColor: 'bg-primary',
                    asideColor: 'bg-light',
                    headerFixed: true,
                    asideFixed: false,
                    asideFolded: false,
                    asideDock: false,
                    container: false
                }
            };

            //$rootScope.me = ontraqMe;
           // $rootScope.me.name = 'JOE';//$rootScope.me.firstname + ' ' + $rootScope.me.lastname;

            $rootScope.tSortHelper = function(orderby, search) {
                if ((typeof(search) === 'undefined') || (typeof(search.orderby) === 'undefined')) {
                    return '';
                }
                if (search.orderby === orderby) {
                    if (search.reverse === true) {
                        return 'sort_desc';
                    } else {
                        return 'sort_asc';
                    }
                } else {
                    return '';
                }
            };

            $rootScope.reportFilter = {
                search: '',
                options: {},
                state: [],
                sharps: {
                    status: 'total'
                },
                filterState: function(practice) {
                    var pass = true;
                    if (typeof $rootScope.reportFilter.state !== 'undefined') {
                        if ($rootScope.reportFilter.state.length > 0) {
                            return ($rootScope.reportFilter.state.indexOf(practice.state) !== -1);
                        }
                    }
                    return pass;
                },
                filterSharps: function(practice) {
                    if ($rootScope.reportFilter.sharps.status === false) {
                        return true;
                    } else {
                        switch ($rootScope.reportFilter.sharps.status) {
                            case 'used':
                                if (_.contains(practice.status, 'used')) {
                                    return true;
                                }
                                return false;
                            case 'neverused':
                                if (_.contains(practice.status, 'neverused')) {
                                    return true;
                                }
                                return false;
                            case 'outofcontainers':
                                if (_.contains(practice.status, 'outofcontainers')) {
                                    return true;
                                }
                                return false;
                            case 'outofcontainersall':
                                if ((_.contains(practice.status, 'outofcontainers')) || (_.contains(practice.status, 'neverused'))) {
                                    return true;
                                }
                                return false;
                            case 'available':
                                if (_.contains(practice.status, 'available')) {
                                    return true;
                                }
                                return false;
                            case 'undersharps':
                                if (_.contains(practice.status, 'undersharps')) {
                                    return true;
                                }
                                return false;
                            default:
                                return true;

                        }
                    }
                },
                reset: function() {
                    this.search = '';
                    this.options = {};
                    this.state = [];
                    this.sharps = {
                        status: 'total',
                    };
                }
            };
            $rootScope.reportFilter.reset();

            // save settings to local storage
            // if ( angular.isDefined($localStorage.settings) ) {
            //   $scope.app.settings = $localStorage.settings;
            // } else {
            //   $localStorage.settings = $scope.app.settings;
            // }
            // $scope.$watch('app.settings', function(){
            //   if( $scope.app.settings.asideDock  &&  $scope.app.settings.asideFixed ){
            //     // aside dock and fixed must set the header fixed.
            //     $scope.app.settings.headerFixed = true;
            //   }
            //   // save to local storage
            //   $localStorage.settings = $scope.app.settings;
            // }, true);

            // angular translate
            $scope.lang = {
                isopen: false
            };
            $scope.langs = {
                en: 'English',
                deDE: 'German',
                itIT: 'Italian'
            };
            $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || 'English';
            $scope.setLang = function(langKey) {
                // set the current lang
                $scope.selectLang = $scope.langs[langKey];
                // You can change the language during runtime
                $translate.use(langKey);
                $scope.lang.isopen = !$scope.lang.isopen;
            };

            //Compliance status
            $scope.status = function(val) {
                var color = '';
                if (val === 3) {
                    color = 'danger';
                } else if (val === 2) {
                    color = 'ot-warning';
                } else if (val === 1) {
                    color = 'success';
                } else if (val === 4) {
                    color = 'ot-na';
                }
                return color;
            };
        }
    ]);
