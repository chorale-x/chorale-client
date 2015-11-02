(function() {
    'use strict';

    angular
        .module('chorale.reservations')
        .config(ReservationsRouter);

    /** @ngInject */
    function ReservationsRouter($stateProvider) {
        $stateProvider
            .state('index.reservations', {
                url: "reservations",
                abstract: true,
                template: "<ui-view />"
            })
                // .state('index.reservations.home', {
                //     url: "/",
                //     templateUrl: "app/components/reservations/home.html",
                //     controller: 'ReservationHomeController',
                //     controllerAs: 'resaHomeCtl'
                // })
                // .state('index.reservations.admin', {
                //     url: "/admin",
                //     templateUrl: "app/components/reservations/admin.html",
                //     controller: 'ReservationAdminController',
                //     controllerAs: 'resaAdminCtl'
                // })
                // .state('index.reservations.list', {
                //     url: "/concert/:concert_id",
                //     templateUrl: "app/components/reservations/list.html",
                //     controller: 'ReservationListController',
                //     controllerAs: 'resaListCtl'
                // })
                // .state('index.reservations.make', {
                //     url: "/make/:concert_id",
                //     templateUrl: "app/components/reservations/make.html",
                //     controller: 'ReservationsMakeController',
                //     controllerAs: 'resaMakeCtl'
                // })
        ;
    }
})();