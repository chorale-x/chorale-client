(function() {
    'use strict';

    angular
        .module('chorale.reservations')
        .config(ReservationsRouter);

    /** @ngInject */
    function ReservationsRouter($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('/reservations', '/reservations/');
        $stateProvider
            .state('index.reservations', {
                url: "reservations",
                template: "<ui-view />"
            })
                .state('index.reservations.home', {
                    url: "/",
                    templateUrl: "app/components/reservations/home.html",
                    controller: 'ReservationsHomeController',
                    controllerAs: 'resaHomeCtl',
                    resolve: {
                        bookable_concerts: function(Concert) {
                            return Concert.filter({
                                where: {
                                    'booking': true
                                  }
                                });
                        }
                    }
                })
                .state('index.reservations.admin', {
                    url: "/admin",
                    templateUrl: "app/components/reservations/admin.html",
                    controller: 'ReservationsAdminController',
                    controllerAs: 'resaAdminCtl',
                    resolve: {
                        concerts_list: function(Concert) {
                            return Concert.findAll();
                        }
                    }
                })
                .state('index.reservations.list', {
                    url: "/concert/:concert_id",
                    templateUrl: "app/components/reservations/list.html",
                    controller: 'ReservationsListController',
                    controllerAs: 'resaListCtl',
                    resolve: {
                        the_concert: function(Concert, $stateParams) {
                            return Concert.find($stateParams.concert_id);
                        },
                        reservations_list: function(Reservation, $stateParams) {
                            return Reservation.findAll({}, {suffix: '?concert=' + $stateParams.concert_id});
                        }
                    }
                })
                .state('index.reservations.make', {
                    url: "/make/:concert_id",
                    templateUrl: "app/components/reservations/make.html",
                    controller: 'ReservationsMakeController',
                    controllerAs: 'resaMakeCtl',
                    resolve: {
                        the_concert: function(Concert, $stateParams) {
                            return Concert.find($stateParams.concert_id);
                        }
                    }
                })
        ;
    }
})();
