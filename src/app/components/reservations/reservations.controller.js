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
    function ReservationsAdminController(Concert, concerts_list, $log) {
        var vm = this;

        vm.concerts = concerts_list;
    }

    /** @ngInject */
    function ReservationsListController(Concert, Reservation, reservations_list, the_concert, $state, $log) {
        var vm = this;

        vm.reservations_list = reservations_list;
        vm.the_concert = the_concert;

        vm.checkResa = function(resa) {
            resa.checked = true;
            resa.concert = the_concert.id
            Reservation.update(resa.id, resa).then(function() {
                $log.debug('Réservation modifiée.');
            }, function(e) {
                $log.error(e);
            });
        };

        vm.uncheckResa = function(resa) {
            resa.checked = false;
            resa.concert = the_concert.id;
            Reservation.update(resa.id, resa).then(function() {
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
                Reservation.empty_concert({suffix: '?concert=' + the_concert.id}).then(function() {
                    Reservation.ejectAll({
                        where: {
                            _concert: the_concert
                        }
                    });
                    $state.go('index.reservations.admin');
                }, function(e) {
                    $log.error(e);
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
                vm.alerts.push({type: 'success', msg: "Votre réservation a été prise en compte. Nous allons vous contacter prochainement pour la valider."});
                window.scrollTo(0, 0);
                // if (!vm.resa.subscriber) {
                //     $state.go('index.concerts.list');
                // }
                $timeout(function () {
                    $state.go('index.concerts.list');
                }, 5000);
            }, function(e) {
                vm.alerts.push({type: 'danger', msg: "Un problème est survenu. Veuillez réessayer ultérieurement."});
                window.scrollTo(0, 0);
                $log.error(e);
            });
            // if (vm.resa.subscriber) {
            //     Subscriber.create({
            //         'civility': vm.resa.civility,
            //         'last_name': vm.resa.lastname,
            //         'first_name': vm.resa.firstname,
            //         'email_address': vm.resa.email,
            //         'phone': vm.resa.phone
            //     }).then(function(es) {
            //         vm.alerts.push({type: 'success', msg: "Votre inscription a été prise en compte. Vous allez recevoir un mail de confirmation, merci de cliquer sur le lien qu'il contient afin de valider votre inscription."});
            //         $timeout(function () {
            //             $state.go('index.concerts.list');
            //         }, 2000);
            //     }, function(e) {
            //         vm.alerts.push({type: 'danger', msg: "Un problème est survenu. Veuillez vérifier vos informations et recommencer."});
            //         $log.error(e);
            //     });
            // }
        };
    }
})();
