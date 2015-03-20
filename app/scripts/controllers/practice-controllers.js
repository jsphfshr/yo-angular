'use strict';

var moduleOtPractice = angular.module('ot.practice', ['pascalprecht.translate', 'ngCookies']);

//Ontraq Controller
moduleOtPractice.controller('practiceCtrl', ['$scope', '$http', '$stateParams', 'UserService', '$state', function($scope, $http, $stateParams, UserService, $state) {
        $scope.loaded = false;
        $scope.practice = false;
        UserService.getPractice(function(data) {
            $scope.practice = data;
            $scope.loaded = true;
        });

        if ($state.current.name === 'app.practice') {
            $state.go('app.practice.dashboard');
        }

        $scope.reportlaststatus = function(data) {
            var status = '';
            if (data === 'reject') {
                status = 'rejected';
            } else if (data === 'partial') {
                status = 'partially rejected';
            } else if (data === 'process') {
                status = 'processed';
            } else {
                status = 'N/A';
            }
            return status;
        };
    }])
    //Ontraq practice home page controller

.controller('dashboardCrtl', ['$scope', '$http', '$stateParams', 'UserService', function($scope, $http, $stateParams, UserService) {
        $scope.loaded = false;
        UserService.getDashboard(function(data) {
            $scope.dashboard = data;
            $scope.loaded = true;
        });
    }])
//Ontraq one practice medication controller biologicalCrtl
.controller('medicationsCrtl', ['$scope', '$http', '$stateParams', 'MedicationsService', function($scope, $http, $stateParams, MedicationsService) {
    $scope.loaded = false;
    MedicationsService.getMedications(function(data) {
        if (data.length === 0 || !data) {
            $scope.message = true;
            $scope.loaded = true;
        } else {
            $scope.message = false;
            $scope.medications = false;
            for (var i = 0; i < data.medications.length; i++) {
                // console.log(data.autoclaves[i].id);
                data.medications[i].collapsed = true;
            }
            $scope.medications = data;
            $scope.loaded = true;
            // Filter the kits 

            var num_otrs = $scope.medications.count.a_otrs + $scope.medications.count.po_otrs;
            $scope.numOtrs = num_otrs;
            $scope.categories = [{
                id: 1,
                name: 'Active (' + num_otrs + ')'
            }, {
                id: 2,
                name: 'Inactive (' + $scope.medications.count.not_otrs + ')'
            }];
            $scope.category = $scope.categories[0];
            $scope.changeCategory = function(categoryId) {
                $scope.inCctive = false;
                if (categoryId === 1) {
                    $scope.filter = {
                        active: true
                    };
                    $scope.in_active = false;

                } else {
                    $scope.filter = {
                        active: false
                    };
                    $scope.in_active = true;
                }
            };
            $scope.changeCategory(1);
        }
    });
    $scope.textcolor = function(val, type) {
        var color = '';
        val = val.toLowerCase();
        if (val === 'expired') {
            color = 'danger';
        } else if (val === 'expiring' && type === 'po_otrs') {
            color = 'ot-warning';
        } else if (val === 'expires') {
            color = 'success';
        } else if (val === 'onhold') {
            color = 'muted';
        } else {
            color = 'success';
        }
        return color;
    }; 
}])
//Ontraq Practice biological controller
.controller('biologicalCrtl', ['$scope', '$http', '$stateParams', 'BiologicalService', function($scope, $http, $stateParams, BiologicalService) {
    $scope.loaded = false;
    BiologicalService.getbiological(function(data) {
        if (!data || data.length >= 0) {
            $scope.biomessage = true;
            $scope.loaded = true;
        } else {
            $scope.biomessage = false;
            var today = new Date();
            var latesttest = new Date(data.last_activity);
            var difference2 = Math.floor((today - latesttest) / 86400000);
            
            $scope.is_missing = difference2;
            for (var i = 0; i < data.autoclaves.length; i++) {
                //console.log(data.autoclaves[i].id);
                data.autoclaves[i].collapsed = true;
                data.autoclaves[i].testStatus = false;
                if (data.autoclaves[i].id !== 0) {
                    var tdate = new Date(data.autoclaves[i].lastactivity);
                    var difference1 = Math.floor((today - tdate) / 86400000);
                    var status;
                    if (difference1 > 45) {
                        status = 'danger';
                    } else if (difference1 > 30 && difference1 < 45) {
                        status = 'ot-warning';
                    } else {
                        status = 'success';
                    }
                    data.autoclaves[i].testStatus = status;
                }
            }
            $scope.biological = data;
            $scope.loaded = true;
        }
    });
    $scope.testcolor = function(data) {
        var iconcolor = '';
        if (data === 'Fail') {
            iconcolor = 'danger';
        } else if (data === 'Invalid') {
            iconcolor = 'test-warning';
        } else {
            iconcolor = 'success';
        }
        return iconcolor;
    };
}])
//OnTraQ Unused Medication Recovery Controller
.controller('unusedmedsCrtl', ['$scope', '$http', '$stateParams', 'UnusedmedsService', function($scope, $http, $stateParams, UnusedmedsService) {
    $scope.loaded = false;
    $scope.unusedmeds = false;
    UnusedmedsService.getUnusedmeds(function(data) {
        if (!data || data.length >= 0) {
            $scope.message = true;
            $scope.loaded = true;
        } else {
            $scope.message = false;
            $scope.unusedmeds = data;
            $scope.loaded = true;
        }
    });

    $scope.bgcolor = function(val) {
        var color = '';
        if (val === 5) {
            color = 'danger';
        } else if (val === 7) {
            color = 'ot-warning';
        } else {
            color = 'success';
        }
        return color;
    };

    $scope.bagStatus = function(data) {
        var status = '';
        if (data === 5) {
            status = 'Rejected';
        } else if (data === 7) {
            status = 'Partially Rejected';
        } else if (data === 2) {
            status = 'Sent from practice for destruction';
        } else if (data === 3) {
            status = 'At destruction facility';
        } else if (data === 4) {
            status = 'Processed';
        } else {
            status = 'N/A';
        }
        return status;
    };
}])
//Ontraq Controller Sharps Recovery
.controller('sharpsrecoveryCtrl', ['$scope', '$http', '$stateParams', 'SharpsService', function($scope, $http, $stateParams, SharpsService) {
    $scope.loaded = false;
    SharpsService.getSharps(function(data) {
        if (!data || data.length >= 0) {
            $scope.loaded = true;
            $scope.message = true;

        } else {
            $scope.message = false;

            $scope.sharps = data;
            $scope.loaded = true;
        }
    });
}]);
