(function() {
    'use strict';

    angular
        .module('chorale.concerts')
        .controller('ConcertAddController', ConcertAddController)
        .controller('ConcertAddGeneralController', ConcertAddGeneralController)
        .controller('ConcertAddPiecesController', ConcertAddPiecesController);

    /** @ngInject */
    function ConcertAddController($state) {
        var vm = this;

        var steps_name = ['general', 'pieces', 'soloists', 'musicians', 'validation'];

        vm.steps = function(name) {
            var curStateW = $state.$current.name.split('.');
            var curState = _.last(curStateW);
            if (_.indexOf(steps_name, name) > _.indexOf(steps_name, curState)) {
                return 'progress-bar-danger';
            } else if (_.indexOf(steps_name, name) == _.indexOf(steps_name, curState)) {
                return 'progress-bar-warning';
            } else {
                return 'progress-bar-success';
            }
        };
    }

    /** @ngInject */
    function ConcertAddGeneralController(Concert, $state, $log) {
        var vm = this;

        vm.concert = Concert.createInstance();
        vm.concert_date = moment().set('hour', 20).set('minute', 0).toDate();
        vm.opened = false;

        vm.add = function(c) {
            c.date = vm.concert_date.toISOString();
            $log.debug(c);
            Concert.create(c).then(function(rc) {
                $state.go('index.concerts.add.pieces', {id: rc.id});
            }, function(e) {
                $log.error(e);
            });
        };

        // Utils functions for date-/time-picker
        vm.time_change = function() {
            if (vm.ngModel && vm.time) {
                vm.ngModel.setHours(vm.time.getHours(), vm.time.getMinutes());
                vm.ngModel = new Date(vm.ngModel);
            }
        };
        vm.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            vm.opened = true;
        };
    }

    /** @ngInject */
    function ConcertAddPiecesController(Concert, Piece, $state, $stateParams, concert, $log) {
        var vm = this;

        vm.pieces = [Piece.createInstance()];
        vm.pieces[0].rank = 1;
        vm.pieces[0].concert = concert.id;

        vm.addPiece = function() {
            var newPiece = Piece.createInstance();
            newPiece.rank = vm.pieces.length + 1;
            newPiece.concert = concert;
            vm.pieces.push(newPiece);
            $log.debug(vm.pieces);
        };

        vm.removePiece = function(piece) {
            var index = vm.pieces.indexOf(piece);
            vm.pieces.splice(index, 1);
            _.forEach(vm.pieces, function(p) {
                if (p.rank > index)
                    p.rank -= 1;
            });
            $log.debug(vm.pieces);
        };

        vm.upPiece = function(piece) {
            if (piece.rank > 1) {
                _.find(vm.pieces, function(p) {
                    return p.rank == piece.rank - 1;
                }).rank += 1;
                piece.rank -= 1;
            }
            $log.debug(vm.pieces);
        };

        vm.downPiece = function(piece) {
            if (piece.rank < vm.pieces.length) {
                _.find(vm.pieces, function(p) {
                    return p.rank == piece.rank + 1;
                }).rank -= 1;
                piece.rank += 1;
            }
            $log.debug(vm.pieces);
        };

        vm.savePieces = function() {
            var nbP = 0;
            _.forEach(vm.pieces, function(p) {
                nbP += 1;
                $log.debug(p);
                Piece.create(p).then(function(sp) {
                    $log.debug('La pièce de rang ' + sp.rank + ' a été enregistrée.');
                    if (nbP == vm.pieces.length) {
                        $state.go('index.concerts.add.soloists', {id: $stateParams.id});
                    }
                }, function(e) {
                    $log.error(e);
                    nbP -= 1;
                });
            });
        };
    }
})();
