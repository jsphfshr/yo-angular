'use strict';

var moduleOtCorp = angular.module('ot.corp', ['pascalprecht.translate', 'ngCookies']);
//Ontraq Controller
  
moduleOtCorp 
.controller('dashboardCtrl', ['$scope','$http','$location','CorporateService', function($scope,$http,$location,CorporateService) {
    $scope.loaded = false;
    $scope.practices = false;
    CorporateService.getAllPractices(function(data) {      
        $scope.loaded = true;
        $scope.numberofpractices =(data.length);        
        $scope.practicesMaster = data;
        $scope.practices = CorporateService.search.filterStates($scope.practicesMaster);
        $scope.$watch('search.states', function() {
            $scope.practices = CorporateService.search.filterStates($scope.practicesMaster);
            
              /*$('.footable').trigger('footable_resized');*/ 
        });
    });
}])
.controller('corpBioCtrl', ['$rootScope','$scope', function($rootScope, $scope) {
    $scope.loaded = true;
    $scope.period = bioPeriod; 
    $scope.columntype = bioColumnType; 
}])
.controller('corpMedsCtrl', ['$timeout','$scope','$http','$location','CorporateService', function($timeout,$scope,$http,$location,CorporateService) {
    $scope.loaded = false;
    $scope.selectedReport = 'report';

    $scope.cursearch = CorporateService.search.meds;
    if ($scope.cursearch.orderby === '') {
        $scope.cursearch.orderby = 'kit_compliance_status';
        $scope.cursearch.reverse = true;
    }

    $scope.filterOptions = [
            {label:'All Compliance Status', value:0},
            {label:'Not Compliant', value:3},
            {label:'At Risk', value:2},
            {label:'Compliant', value:1},
            {label:'Not on Medical Waste', value:4},
        ];
        $scope.statusFilter = $scope.filterOptions[0];

        $scope.$watch('statusFilter', function(newValue) {
            $scope.mapStatusFilter(newValue);
        },true);

        $scope.selectStatusFilter = function(status) {
            if ((typeof($scope.statusFilter) === 'undefined') ||  (typeof($scope.statusFilter.value) === 'undefined') || ($scope.statusFilter.value === status)) {
                $scope.statusFilter = $scope.filterOptions[0];
            }
            else {
                $scope.statusFilter = _.find($scope.filterOptions, { 'value': status });
            }
        };
        $scope.mapStatusFilter = function(statusFilterSelected) {
            if ((typeof(statusFilterSelected) === 'undefined') || (typeof(statusFilterSelected.value) === 'undefined') || (statusFilterSelected.value === 0)) {
                $scope.cursearch.filter={};
            }
            else {
                $scope.cursearch.filter={kitComplianceStatus:statusFilterSelected.value};
            }
        };

        if (typeof($scope.cursearch.filter) === 'undefined') {
            $scope.statusFilter = _.find($scope.filterOptions, { 'value': 0 });
        }
        else {
            $scope.statusFilter = _.find($scope.filterOptions, { 'value': $scope.cursearch.filter.kitComplianceStatus });
        }

    CorporateService.getMedsReports(null, function(data) {  
        $scope.practices_master = data;
        $scope.practices = CorporateService.search.filterStates($scope.practices_master);
        $scope.$watch('search.states', function() {
            initStats();
            $scope.practices = CorporateService.search.filterStates($scope.practices_master,statFnc);
        },true);

        $scope.loaded = true;
    });

    CorporateService.getExpMeds(null, function(data) {  
        if (typeof(data.expired) !== 'undefined') {
            $scope.expired_master = data.expired;
        }
        else {
            $scope.expired_master = []; 
        }
        if (typeof(data.expiring) !== 'undefined') {
            $scope.expiringMaster = data.expiring;
        }
        else {
            $scope.expiringMaster = [];    
        }
        $scope.expired = CorporateService.search.filterStates($scope.expired_master);
        $scope.$watch('search.states', function() {
            $scope.expired = CorporateService.search.filterStates($scope.expired_master);
        },true);

        $scope.expiring = CorporateService.search.filterStates($scope.expiring_master);
        $scope.$watch('search.states', function() {
            $scope.expiring = CorporateService.search.filterStates($scope.expiring_master);
        },true);
    });


    var initStats = function() {
        $scope.stats = {
            status: {
                success:0,
                alert:0,
                warning:0,
                na:0
            },
            count: {
                aotrs:0,
                expired:0,
                expiring:0
            }
        };
    };
    initStats();
    var statFnc = function(practice) {
        if (practice.kitComplianceStatus === 1) {
            $scope.stats.status.success++;
        }
        else if (practice.kitComplianceStatus === 2) {
            $scope.stats.status.warning++;
        }
        else if (practice.kitComplianceStatus === 3) {
            $scope.stats.status.alert++;
        }
        else if (practice.kitComplianceStatus === 4) {
            $scope.stats.status.na++;
        }

        $scope.stats.count.aotrs += parseInt(practice.num_otrs);
        $scope.stats.count.expired += parseInt(practice.num_expired);
        $scope.stats.count.expiring += parseInt(practice.num_expiring);
    };

}])
.controller('corpSharpsCtrl', ['$rootScope','$scope','$location','CorporateService', function($rootScope, $scope,$location,CorporateService) {
    $scope.loaded = false;

    $scope.cursearch = CorporateService.search.mwaste;
    if ($scope.cursearch.orderby === '') {
        $scope.cursearch.orderby = 'mwaste_compliance_status';
        $scope.cursearch.reverse = true;
    }

    $scope.filterOptions = [
        {label:'All Compliance Status', value:0},
        {label:'Not Compliant', value:3},
        {label:'Compliant', value:1},
        {label:'Not on Medical Waste', value:4},
    ];
    $scope.statusFilter = $scope.filterOptions[0];

    $scope.$watch('statusFilter', function(newValue) {
        $scope.mapStatusFilter(newValue);
    },true);


    // $scope.statusFilter = 0;

    $scope.selectStatusFilter = function(status) {
        if ((typeof($scope.statusFilter) === 'undefined') || (typeof($scope.statusFilter.value) === 'undefined') || ($scope.statusFilter.value === status)) {
            $scope.statusFilter = $scope.filterOptions[0];
        }
        else {
            $scope.statusFilter = _.find($scope.filterOptions, { 'value': status });
            // $scope.statusFilter = $scope.filterOptions[status];
        }
    };
    $scope.mapStatusFilter = function(statusFilterSelected) {
        if ((typeof(statusFilterSelected) === 'undefined') || (typeof(statusFilterSelected.value) === 'undefined') || (statusFilterSelected.value === 0)) {
            $scope.cursearch.filter={};
        }
        else {
            $scope.cursearch.filter={mwasteComplianceStatus:statusFilterSelected.value};
        }
    }; 

    if (typeof($scope.cursearch.filter) === 'undefined') {
        $scope.statusFilter = _.find($scope.filterOptions, { 'value': 0 });
    }
    else {
        $scope.statusFilter = _.find($scope.filterOptions, { 'value': $scope.cursearch.filter.mwaste_compliance_status });
    }

    CorporateService.getSharpsReports(null, function(data) {
        $scope.practices_master = data.practices;
        $scope.practices = CorporateService.search.filterStates($scope.practices_master);
        $scope.$watch('search.states', function() {
            initStats();
            $scope.practices = CorporateService.search.filterStates($scope.practices_aster,statFnc);
        },true);

        $scope.loaded = true;
    });

    var initStats = function() {
        $scope.stats = {
            status: {
                success:0,
                alert:0,
                warning:0,
                na:0
            },
            count: {
                available:0,
                destroyed:0
            }
        };
    };
    initStats();
    var statFnc = function(practice) {
        if (practice.mwaste_compliance_status === 1) {
            $scope.stats.status.success++;
        }
        else if (practice.mwaste_compliance_status === 2) {
            $scope.stats.status.warning++;
        }
        else if (practice.mwaste_compliance_status === 3) {
            $scope.stats.status.alert++;
        }
        else if (practice.mwaste_compliance_status === 4) {
            $scope.stats.status.na++;
        }
        $scope.stats.count.available += parseInt(practice.available);
        $scope.stats.count.destroyed += parseInt(practice.destroyed);
    };

}]);
