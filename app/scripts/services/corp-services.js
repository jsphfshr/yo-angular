'use strict';

var moduleOtCorp;

moduleOtCorp.factory('CorporateService', function($http) {
    var CorporateService = {};

    CorporateService.getAllPractices = function(callback) {
        return $http.get('/api/users/me/practices', {
            cache: true
        }).success(callback);
    };

    CorporateService.getSharpsReports = function($params, callback) {
        return $http.get('/api/customers/:id/corporate/sharps/report', {
            cache: true
        }).success(callback);
    };

    CorporateService.getMedsReports = function($params, callback) {
        return $http.get('/api/meds/corporatereport/', {
            cache: true
        }).success(callback);
    };

    CorporateService.getExpMeds = function($params, callback) {
        return $http.get('/api/meds/exp/', {
            cache: true
        }).success(callback);
    };

    CorporateService.filterState = function() {

    };

    CorporateService.search = {
        states: [],
        meds: [],
        mwaste: [],
        bio: [],
        unuseds: [],
        filterStates: function(practices, statFnc) {
            if (practices.length === 0) {
                return [];
            }
            if (this.states.length === 0) {
                if (typeof(statFnc) === 'function') {
                    for (var i = 0; i < practices.length; i++) {
                        statFnc(practices[i]);
                    }
                }
                return angular.copy(practices);
            } else {
                var filteredPractices = [];
                var filteredPracticesIndice = 0;
                for (var ii = 0; ii < practices.length; ii++) {
                    if (this.states.indexOf(practices[ii].state) !== -1) {
                        filteredPractices[filteredPracticesIndice] = practices[ii];
                        filteredPracticesIndice++;
                        if (typeof(statFnc) === 'function') {
                            statFnc(practices[ii]);
                        }

                    }
                }
                return filteredPractices;
            }
        },
        init: function() {
            var gridTemplateOption = {
                orderby: '',
                reverse: false,
                limit: 0,
                offset: 0,
                search: '',
                setOrderBy: function(order) {
                    if (this.orderby === order) {
                        this.reverse = !this.reverse;
                    } else {
                        this.reverse = true;
                    }
                    this.orderby = order;
                }
            };
            this.meds = angular.copy(gridTemplateOption);
            this.mwaste = angular.copy(gridTemplateOption);
        }
    };
    CorporateService.search.init();

    return CorporateService;
});
