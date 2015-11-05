(function() {
    'use strict';

    angular
        .module('chorale.concerts')
        .config(ConcertsRouter);

    /** @ngInject */
    function ConcertsRouter($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('/concerts', '/concerts/');
        $stateProvider
            .state('index.concerts', {
                url: "concerts",
                // abstract: true,
                template: "<ui-view />"
            })
                .state('index.concerts.list', {
                    url: "/",
                    templateUrl: "app/components/concerts/list.html",
                    controller: 'ConcertListController',
                    controllerAs: 'cListCtl',
                    resolve: {
                        concerts: function(Concert, Piece) {
                            return Concert.findAll();
                        }
                    }
                })
                .state('index.concerts.add', {
                    url: "/add",
                    abstract: true,
                    templateUrl: "app/components/concerts/add/layout.html",
                    controller: 'ConcertAddController',
                    controllerAs: 'cAddCtl'
                })
                    .state('index.concerts.add.general', {
                        url: "/",
                        templateUrl: "app/components/concerts/add/general.html",
                        controller: 'ConcertAddGeneralController',
                        controllerAs: 'cAddGenCtl'
                    })
                //     .state('index.concerts.add.pieces', {
                //         url: "/pieces/:id",
                //         templateUrl: "app/components/concert/add/pieces.html",
                //         controller: 'concerts.ctrl.add.pieces'
                //     })
                //     .state('index.concerts.add.soloists', {
                //         url: "/soloists/:id",
                //         templateUrl: "app/components/concert/add/soloists.html",
                //         controller: 'concerts.ctrl.add.soloists'
                //     })
                //     .state('index.concerts.add.musicians', {
                //         url: "/musicians/:id",
                //         templateUrl: "app/components/concert/add/musicians.html",
                //         controller: 'concerts.ctrl.add.musicians'
                //     })
                //     .state('index.concerts.add.validation', {
                //         url: "/validation/:id",
                //         templateUrl: "app/components/concert/add/validation.html",
                //         controller: 'concerts.ctrl.add.validation'
                //     })
                .state('index.concerts.details', {
                    url: "/:id",
                    templateUrl: "app/components/concerts/details.html",
                    controller: 'ConcertDetailController',
                    controllerAs: 'cDetailCtl',
                    resolve: {
                        concert: function(Concert, $stateParams) {
                            return Concert.find($stateParams.id);
                        }
                    }
                })
                // .state('index.concerts.edit', {
                //     url: "/edit/:id",
                //     abstract: true,
                //     templateUrl: "app/components/concerts/edit/layout.html",
                //     controller: ['$stateParams', '$scope', function($stateParams, $scope) {
                //         $scope.concert_id = $stateParams.id;
                //     }]
                // })
                //     .state('index.concerts.edit.general', {
                //         url: "/",
                //         templateUrl: "app/components/concerts/edit/general.html",
                //         controller: 'concerts.ctrl.edit.general'
                //     })
                //     .state('index.concerts.edit.pieces', {
                //         url: "/pieces/",
                //         templateUrl: "app/components/concerts/add/pieces.html",
                //         controller: 'concerts.ctrl.edit.pieces'
                //     })
                //     .state('index.concerts.edit.soloists', {
                //         url: "/soloists/",
                //         templateUrl: "app/components/concerts/add/soloists.html",
                //         controller: 'concerts.ctrl.edit.soloists'
                //     })
                //     .state('index.concerts.edit.musicians', {
                //         url: "/musicians/",
                //         templateUrl: "app/components/concerts/add/musicians.html",
                //         controller: 'concerts.ctrl.edit.musicians'
                //     })
                .state('index.concerts.remove', {
                    url: "/remove/:id",
                    templateUrl: "app/components/concerts/remove.html",
                    controller: 'ConcertRemoveController',
                    controllerAs: 'cRemoveCtl',
                    resolve: {
                        concert: function(Concert, $stateParams) {
                            return Concert.find($stateParams.id);
                        }
                    }
                })
        ;
    }
})();
