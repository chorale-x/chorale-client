(function() {
    'use strict';

    angular
        .module('chorale.subscribers')
        .controller('SubscriberListController', SubscriberListController)
        .controller('SubscriberEnroleController', SubscriberEnroleController);

    /** @ngInject */
    function SubscriberListController(Subscriber, subscribers_list, $log) {
        var vm = this;

        vm.subscribers = subscribers_list;

        vm.trash = function(id) {
            if (!confirm('Cette opération est irréversible. Voulez-vous continuer ?')) {
                return ;
            }
            var subscriber = _.filter(vm.subscribers, {'id': id});
            $log.debug(subscriber[0]);

            if (subscriber.length > 0 && subscriber.length < 2) {
                Subscriber.destroy(id).then(function() {
                    _.pull(vm.subscribers, subscriber[0]);
                }, function(e) {
                    $log.error(e);
                });
            }
        };
    }

    /** @ngInject */
    function SubscriberEnroleController(Subscriber, $log) {
        var vm = this;

        vm.alerts = [];
        vm.closeAlert = function(index) {
            vm.alerts.splice(index, 1);
        };

        vm.subscriber = Subscriber.createInstance();
        vm.enrole = function(s) {
            Subscriber.create(s).then(function(es) {
                vm.alerts.push({type: 'success', msg: "Votre inscription a été prise en compte. Vous allez recevoir un mail de confirmation, merci de cliquer sur le lien qu'il contient afin de valider votre inscription."});
            }, function(e) {
                vm.alerts.push({type: 'danger', msg: "Un problème est survenu. Veuillez vérifier vos informations et recommencer."});
                $log.error(e);
            });
        };
    }
})();
