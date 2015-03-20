'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('app', [   
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngStorage',
        'ui.router',
        'ui.bootstrap',
        'ui.load',
        'ui.jq',
        'ui.validate',
        'oc.lazyLoad',
        'pascalprecht.translate',
        'app.filters',
        'app.services',
        'app.directives',
        'app.controllers',
        'ot.corp',
        'ot.practice'
    ])
    .run( 
        ['$rootScope', '$state', '$stateParams',
            function($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
            function($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {

                // lazy controller, directive and service
                app.controller = $controllerProvider.register;
                app.directive = $compileProvider.directive;
                app.filter = $filterProvider.register;
                app.factory = $provide.factory;
                app.service = $provide.service;
                app.constant = $provide.constant;
                app.value = $provide.value;

                $urlRouterProvider
                    .otherwise('/app/practiceslist');
                $stateProvider
                    .state('app', {
                        name: 'app',
                        abstract: true,
                        url: '/app',
                        controller: 'AppCtrl',
                        templateUrl: 'views/app.html'
                    })
                    .state('app.practices', {
                        url: '/practices',
                        //controller: 'dashboardCtrl',
                        templateUrl: 'views/app_practices.html'
                    })
                    .state('app.ui.detail', {
                        url: '/detail',
                        templateUrl: 'views/ui_detail.html'
                    })
                    .state('app.practiceslist', {
                        url: '/practiceslist',
                        templateUrl: 'views/app_practiceslist.html'

                    })
                    .state('app.practice', {
                        name: 'practice',
                        url: '/practice/id/:id',
                        templateUrl: 'views/app_practice.html'

                    })
                    .state('app.practice.dashboard', {
                        url: '/dashboard',
                        name: 'dashboard',
                        templateUrl: 'views/practice/dashboard.html'

                    })
                    .state('app.practice.medications', {
                        url: '/medications',
                        templateUrl: 'views/practice/medications.html'
                            /*resolve: {
                                // I will cause a 1 second delay
                                delay: function($q, $timeout) {
                                  var delay = $q.defer();
                                  $timeout(delay.resolve, 500);
                                  return delay.promise;
                                }
                              }*/

                    })
                    //biological
                    .state('app.practice.biological', {
                        url: '/biological',
                        templateUrl: 'views/practice/biological.html'

                    })
                    //unusedmedsrecovery
                    .state('app.practice.unusedmedsrecovery', {
                        url: '/unusedmedsrecovery',
                        templateUrl: 'views/practice/unusedmedsrecovery.html'

                    })
                    //medical Waste Recovery
                    .state('app.practice.medicalwasterecovery', {
                        url: '/medicalwasterecovery',
                        templateUrl: 'views/practice/medicalwasterecovery.html'

                    })
                    .state('app.dashboard', {
                        url: '/dashboard',
                        templateUrl: 'views/app_dashboard.html'
                    })
                    // report / sharp
                    .state('app.corporate_sharps', {
                        url: '/sharps',
                        templateUrl: 'views/corp/sharps.html'
                    })
                    // report / bio
                    .state('app.corporate_bio', {
                        url: '/bio',
                        templateUrl: 'views/corp/bio.html'
                    })
                    // report / medications
                    .state('app.corporate_meds', {
                        url: '/meds',
                        templateUrl: 'views/corp/meds.html'
                    });
            }
        ]
    )

/** 
 * jQuery plugin config use ui-jq directive , config the js and css files that required
 * key: function name of the jQuery plugin
 * value: array of the css js file located
 */
.constant('JQ_CONFIG', {
    easyPieChart: ['libs/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
    sparkline: ['libs/jquery/charts/sparkline/jquery.sparkline.min.js'],
    plot: ['libs/jquery/charts/flot/jquery.flot.min.js',
        'libs/jquery/charts/flot/jquery.flot.resize.js',
        'libs/jquery/charts/flot/jquery.flot.tooltip.min.js',
        'libs/jquery/charts/flot/jquery.flot.spline.js',
        'libs/jquery/charts/flot/jquery.flot.orderBars.js',
        'libs/jquery/charts/flot/jquery.flot.pie.min.js'
    ],
    slimScroll: ['libs/jquery/slimscroll/jquery.slimscroll.min.js'],
    sortable: ['libs/jquery/sortable/jquery.sortable.js'],
    nestable: ['libs/jquery/nestable/jquery.nestable.js',
        'libs/jquery/nestable/nestable.css'
    ],
    filestyle: ['libs/jquery/file/bootstrap-filestyle.min.js'],
    slider: ['libs/jquery/slider/bootstrap-slider.js',
        'libs/jquery/slider/slider.css'
    ],
    chosen: ['libs/jquery/chosen/chosen.jquery.min.js',
        'libs/jquery/chosen/chosen.css'
    ],
    TouchSpin: ['libs/jquery/spinner/jquery.bootstrap-touchspin.min.js',
        'libs/jquery/spinner/jquery.bootstrap-touchspin.css'
    ],
    wysiwyg: ['libs/jquery/wysiwyg/bootstrap-wysiwyg.js',
        'libs/jquery/wysiwyg/jquery.hotkeys.js'
    ],
    dataTable: ['libs/jquery/datatables/jquery.dataTables.min.js',
        'libs/jquery/datatables/dataTables.bootstrap.js',
        'libs/jquery/datatables/dataTables.bootstrap.css'
    ],
    vectorMap: ['libs/jquery/jvectormap/jquery-jvectormap.min.js',
        'libs/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
        'libs/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
        'libs/jquery/jvectormap/jquery-jvectormap.css'
    ],
    footable: ['libs/jquery/footable/footable.all.min.js',
        'libs/jquery/footable/footable.core.css'
    ]
})

// modules config
.constant('MODULE_CONFIG', {
    select2: ['libs/jquery/select2/select2.css',
        'libs/jquery/select2/select2-bootstrap.css',
        'libs/jquery/select2/select2.min.js',
        'libs/modules/ui-select2.js'
    ]
});
