'use strict';

var moduleOtCorp;

// Directives
moduleOtCorp.directive('statefilter', ['$rootScope', 'CorporateService', function($rootScope, CorporateService) {
    return {
        templateUrl: 'views/corp/directives/state_filter.html',
        link: function(scope) {
            scope.me = $rootScope.me;
            scope.search = CorporateService.search;
        }
    };
}]);

moduleOtCorp.directive('calendar', ['$http', '$timeout', '$location', function($http, $timeout, $location) {
    return {
        scope: {
            period: '=',
            columntype: '=',
        },
        link: function(scope) {
            scope.clickme = function(customerNumber) {
                $location.path('/practice/' + customerNumber);
            };

            scope.loaded = false;
            $http({
                method: 'GET',
                url: '/api/customers/me/corporate/mailin/calendar/period/' + scope.period + '/columntype/' + scope.columntype + '?version=2',
                cache: true
            }).
            success(function(data) {
                if (data.length === 0) {
                    scope.calendar = false;
                    scope.loaded = true;
                    return;
                }
                scope.calendar = data;
                scope.calendar.data = _.sortBy(scope.calendar.data, function(num) {
                    return num[0][3] * -1;
                });
                scope.loaded = true;
                //console.log(data['weeks']);
                $timeout(
                    function() {
                        renderCalendar();
                        $('.otcal-right-table').scrollLeft($('.otcal-right-header-scroll').width());

                        /*var top = $(".otcal-right-table" ).height();*/
                        //$('.otcal-right').find('#next').css("margin-top","-"+top+"px");

                        /*  console.log($('#otcal-table').height());
                        console.log($(window).height());*/
                        /*$('.otcal-right').find('.calander-arrow .calendar-left-right-arrow').css('color','green').hover(
                        function() {
                            $(this).animate({'opacity':"1.5"}, 200);
                        },
                        function() {
                            $(this).animate({'opacity':"0.5"}, 200);
                        }
                        );*/
                    }
                );
            }).
            error(function() {});

            function renderCalendar() {
                var weekWidth = 21;
                // var  weekWidth = $(".otcal-right-table table td").width()-1;
                // console.log('render calendar');
                // console.log($(".otcal-right-table table td").size());
                var weekNums = scope.calendar.weeks.length;
                /*$('#next').hide();
                $('#previous').hide();*/
                // Header total width
                var periodCoeff;
                if (scope.period === '1w') {
                    periodCoeff = 4;
                } else {
                    periodCoeff = 2;
                }
                // console.log(periodCoeff);
                // console.log(weekWidth);
                if (weekNums < 8) {
                    $('.otcal-right-header-scroll div').width(3 * weekWidth + 'px');
                } else {
                    $('.otcal-right-header-scroll div').width(periodCoeff * weekWidth + 'px');
                }

                var computetablewidth = function() {
                    var tableWidth;
                    if (isSideNavTop()) {
                        tableWidth = $(window).width() - $('.otcal-left').width() - 35;
                    } else {
                        tableWidth = $(window).width() - $('.otcal-left').width() - $('.navi').width() - 35;
                    }

                    $('.otcal-right-table-width').width(tableWidth);
                };

                computetablewidth();

                function isSideNavTop() {
                    if ($('.primary-sidebar').css('position') === 'static') {
                        return true;
                    }
                    return false;
                }

                $(window).resize(function() {
                    computetablewidth();
                });

                var computedWidth;
                if (weekNums < 8) {
                    computedWidth = ($('div .week').size()) * ($('div .week').width());
                } else {
                    computedWidth = weekNums * weekWidth;
                }

                $('.otcal-right-table-scroll-width').width(computedWidth + 'px');

                /*$('.pass').css('color','green').html('Pass');
                $('.fail').css('color','orange').html('Fail');
                $('.miss').css('color','red').html('Missed');   */
                $('.otcal-right-table').scroll(function() {
                    $('.otcal-right-header').scrollLeft($(this).scrollLeft());
                });

                function computeTableHeaderPosition() {
                        var height;
                        if (isSideNavTop()) {
                            height = $('.navbar-inner').height() + $('.primary-sidebar').height() + $('.navbar-search').height() + $('.row-fluid').height() + 20;
                        } else {
                            height = $('.navbar-inner').height() + $('.navbar-search').height() + $('.row-fluid').height() + 20;
                        }
                        if ($(window).scrollTop() > height) {
                            $('.otcal-left  .otcal-left-header').addClass('fixed-header');
                            $('.otcal-right  .otcal-right-header').addClass('fixed-header');
                            //$( ".otcal-right-table" ).find('tr').css("background-color","red");
                            /*$('#next').show();
                            $('#previous').show();*/
                            $('#floatingnav').hide();
                        } else {
                            $('.otcal-left .otcal-left-header').removeClass('fixed-header');
                            $('.otcal-right  .otcal-right-header').removeClass('fixed-header');
                            /* $('#next').hide();
                            $('#previous').hide();*/
                            $('#floatingnav').show();
                        }
                        /*  if($(this).scrollTop()+20 > height){
                                console.log($(this).scrollTop());
                                $('#next').show();
                                $('#previous').show();
                            }
                            else{
                                $('#next').hide();
                                $('#previous').hide();
                            }*/
                    }
                    /*$('#next').click(function(){                  
                    var leftPos = $('.otcal-right-table').scrollLeft();
                    $(".otcal-right-table").animate({
                        scrollLeft:  leftPos -350}, 600);
                    // $(this).show(".otcal-right-table", { direction: "left" }, 1000);
                    
                });
                $('#previous').click(function(){                    
                    var leftPos = $('.otcal-right-table').scrollLeft();
                    $(".otcal-right-table").animate({
                        scrollLeft:  leftPos + 350}, 600);
                    
});*/
                    //              $(document).ready(function() {
                    //                    options = {
                    //                      trigger : 'hover focus',
                    //                      content:'example',
                    //                      delay:{show: 500, hide: 100}
                    //                    }
                    //                    $('[rel="popover"]').popover(options);
                    //                  });                 

                var myFlag;
                myFlag = false;
                $('.testResult').hover(function(event) {
                        myFlag = Math.random();
                        var myCurrentFlag = myFlag;
                        var current = $(this);
                        var adjusttooltip;
                        setTimeout(function() {
                            if (myCurrentFlag === myFlag) {
                                var x = $(current).attr('coordx');
                                var y = $(current).closest('tr').attr('coordy');
                                var testR = renderTooltipText(scope.calendar.data[y][1][x]);
                                var text = '' + scope.calendar.weeks[x][0] + ' to ' + scope.calendar.weeks[x][1] + '<br>';
                                var prop;
                                for (prop in testR) {
                                    if (prop === 'Missed') {
                                        text += testR[prop];
                                    } else if (prop === 'Notstarted') {
                                        text += testR[prop];
                                    } else {
                                        text += testR[prop] + ' ' + prop + '</br>';
                                    }
                                }

                                adjusttooltip = $('#ournewtooltip').width();
                                // $('#ournewtooltip').css('top',current.offset().top
                                // -
                                // current.height()
                                // -
                                // 20).css('left',current.offset().left
                                // -
                                // 30).fadeIn();
                                /*$('#ournewtooltip').css('top',current.offset().top - current.height()- $(window).scrollTop()- 30)
                                .css('left',    current.offset().left- positiontooltip).html(text).fadeIn();*/
                                $('#ournewtooltip').css('top', event.pageY - $(window).scrollTop() + 17).css('left', event.pageX - adjusttooltip).html(text).fadeIn();
                                //$('#ournewtooltip').appendTo(current).css('top',0).css('left',0).fadeIn();
                            }
                        }, 500);
                    },
                    function() {
                        myFlag = false;
                        $('#ournewtooltip').fadeOut();
                    });
                $(window).scroll(function() {
                    computeTableHeaderPosition();
                });
            }

            function renderTooltipText(testResult) {
                var res = testResult.split('');
                var counts = {},
                    i;
                for (i = 0; i < res.length; i++) {
                    var num = res[i];
                    if (num === 'P') {
                        num = 'Pass';
                        counts[num] = counts[num] ? counts[num] + 1 : 1;
                    } else if (num === 'F') {
                        num = 'Fail';
                        counts[num] = counts[num] ? counts[num] + 1 : 1;
                    } else if (num === 'I') {
                        num = 'Invalid';
                        counts[num] = counts[num] ? counts[num] + 1 : 1;
                    }
                    if (num === 'M') {
                        num = 'Missed';
                        counts[num] = 'Missed Testing';
                    }
                    if (num === 'X' || num === 'N') {
                        num = 'Notstarted';
                        counts[num] = 'Testing have not been started yet';
                    }

                }
                return counts;
            }

            scope.clickme = function() {
                var currentcustomer = this.customer[0][0];
                $location.path('/practice/' + currentcustomer);
            };
            scope.type = function(val) {
                var color = '';
                if (val.indexOf('F') >= 0) {
                    color = '#D63636';
                } else if (val.indexOf('I') >= 0) {
                    color = '#fdca96';
                } else if (val.indexOf('P') >= 0) {
                    color = '#00cc3a';
                } else if (val.indexOf('M') >= 0) {
                    color = '#fdca96';
                } else if (val.indexOf('X') >= 0) {
                    color = '#ececec';
                } else if (val.indexOf('N') >= 0) {
                    color = '#ececec';
                } else {
                    color = '';
                }

                /*  switch (val) {
                    case 'P':
                    case 'PP':
                        color = 'lightgreen';
                        break;
                    case 'F':
                    case 'FF':
                    case 'IF':
                    case 'FP':
                    case 'PF':
                        color = 'red';
                        break;
                    case 'I':
                    case 'II':
                    case 'IP':
                    case 'PI':
                        color = 'orange';
                        break;
                    case 'X':
                        color = 'white';// not at all
                        break;
                    case 'N':
                        color = 'white'; // Test not
                        // started yet
                        break;
                    case 'M':
                        color = 'lightblue'; //missed   
                        break;
                    default:
                        color = ' ';
                        break;
                    }*/
                return color; //,$image;
            };
        },
        templateUrl: 'views/corp/directives/bio_calendar.html',
    };
}]);
