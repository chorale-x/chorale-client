(function() {
    'use strict';

    angular
        .module('chorale.subscribers')
        .config(SubscribersRouter);

    /** @ngInject */
    function SubscribersRouter($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('/subscribers', '/subscribers/enrole');
        $stateProvider
            .state('index.subscribers', {
                url: "subscribers",
                template: "<ui-view />"
            })
                .state('index.subscribers.list', {
                    url: "/list",
                    templateUrl: "app/components/subscribers/list.html",
                    controller: 'SubscriberListController',
                    controllerAs: 'subsLCtl',
                    resolve: {
                        subscribers_list: function(Subscriber) {
                            return Subscriber.findAll();
                        }
                    }
                })
                .state('index.subscribers.enrole', {
                    url: "/enrole",
                    templateUrl: "app/components/subscribers/enrole.html",
                    controller: 'SubscriberEnroleController',
                    controllerAs: 'subsECtl'
                })
        ;
    }
})();
