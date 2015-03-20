'use strict';

angular.module('app').factory('UserService', function($http, $stateParams) {
    var UserService = {};
    //console.log($stateParams);  
    UserService.getPractice = function(callback) {
        return $http.get('/api/users/onepractice/customer_number/' + $stateParams.id, {
            cache: true
        }).success(callback);
    };

    UserService.getDashboard = function(callback) {
        return $http.get('/api/users/dashboard/customernumber/' + $stateParams.id, {
            cache: true
        }).success(callback);
    };
    return UserService;
});

angular.module('app').service('MedicationsService', function($http, $stateParams) {
    var MedicationsService = {};
    MedicationsService.getMedications = function(callback) {
        return $http.get('/api/users/medications/customernumber/' + $stateParams.id, {
            cache: true
        }).success(callback);
    };
    return MedicationsService;
});

angular.module('app').service('BiologicalService', function($http, $stateParams) {
    var BiologicalService = {};
    BiologicalService.getbiological = function(callback) {
        return $http.get('/api/users/biological/customernumber/' + $stateParams.id, {
            cache: true
        }).success(callback);
    };
    return BiologicalService;
});

angular.module('app').service('UnusedmedsService', function($http, $stateParams) {
    var UnusedmedsService = {};
    UnusedmedsService.getUnusedmeds = function(callback) {
        return $http.get('/api/users/unusedmeds/customernumber/' + $stateParams.id, {
            cache: true
        }).success(callback);
    };
    return UnusedmedsService;
});

angular.module('app').service('SharpsService', function($http, $stateParams) {
    var SharpsService = {};
    SharpsService.getSharps = function(callback) {
        return $http.get('/api/users/sharpsrecovery/customernumber/' + $stateParams.id, {
            cache: true
        }).success(callback);
    };
    return SharpsService;
});
