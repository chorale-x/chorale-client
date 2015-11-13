(function() {
    'use strict';

    angular
        .module('chorale.reservations')
        .controller('ReservationsHomeController', ReservationsHomeController)
        .controller('ReservationsAdminController', ReservationsAdminController)
        .controller('ReservationsListController', ReservationsListController)
        .controller('ReservationsMakeController', ReservationsMakeController);

    /** @ngInject */
    function ReservationsHomeController(Concert, bookable_concerts, $log) {
        var vm = this;

        vm.bookable_concerts = bookable_concerts;
    }

    /** @ngInject */
    function ReservationsAdminController(Concert, $log) {
        var vm = this;

        Concert.findAll().then(function(c) {
            vm.concerts = c;
        });
    }

    /** @ngInject */
    function ReservationsListController(Concert, Reservation, reservations_list, the_concert, $log) {
        var vm = this;

        vm.reservations_list = reservations_list;
        vm.the_concert = the_concert;

        vm.checkResa = function(resa) {
            resa.checked = true;
            Reservation.update(resa, resa.id).then(function() {
                $log.debug('Réservation modifiée.');
            }, function(e) {
                $log.error(e);
            });
        };

        vm.uncheckResa = function(resa) {
            resa.checked = false;
            Reservation.update(resa, resa.id).then(function() {
                $log.debug('Réservation modifiée.');
            }, function(e) {
                $log.error(e);
            });
        };

        vm.deleteResa = function(resa) {
            if (confirm('Attention ! Cette opération est irréversible !')) {
                Reservation.destroy(resa.id).then(function() {
                    _.pull(vm.reservations_list, resa);
                    $log.debug('Réservation supprimée.');
                }, function(e) {
                    $log.error(e);
                });
            }
        };

        vm.deleteAllResas = function() {
            if (confirm('Attention ! Cette opération est irréversible !')) {
                Reservation.empty_concert({concert_id: the_concert.id}).$promise.then(function(res) {
                    console.log(res);
                    $state.go('index.reservations.admin');
                }, function(error) {
                    console.log(error);
                });
            }
        };
    }

    /** @ngInject */
    function ReservationsMakeController(Concert, Reservation, Subscriber, the_concert, $state, $timeout, $log) {
        var vm = this;

        vm.alerts = [];
        vm.closeAlert = function(index) {
            vm.alerts.splice(index, 1);
        };

        vm.the_concert = the_concert;
        vm.resa = Reservation.createInstance();
        vm.resa.civility = 'Monsieur';
        vm.resa.subscriber = false;
        vm.resa.concert = the_concert.id;

        vm.saveResa = function(resa) {
            Reservation.create(resa).then(function() {
                $log.debug('Réservation effectuée avec succès.');
                if (!vm.resa.subscriber) {
                    $state.go('index.concerts.list');
                }
            }, function(e) {
                $log.error(e);
            });
            if (vm.resa.subscriber) {
                Subscriber.create({
                    'civility': vm.resa.civility,
                    'last_name': vm.resa.lastname,
                    'first_name': vm.resa.firstname,
                    'email_address': vm.resa.email,
                    'phone': vm.resa.phone,
                }).then(function(es) {
                    vm.alerts.push({type: 'success', msg: "Votre inscription a été prise en compte. Vous allez recevoir un mail de confirmation, merci de cliquer sur le lien qu'il contient afin de valider votre inscription."});
                    $imeout(function () {
                        $state.go('index.concerts.list');
                    }, 2000);
                }, function(e) {
                    vm.alerts.push({type: 'danger', msg: "Un problème est survenu. Veuillez vérifier vos informations et recommencer."});
                    $log.error(e);
                });
            }
        };
    }
})();
