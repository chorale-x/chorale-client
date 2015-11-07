(function() {
    'use strict';

    angular
        .module('chorale.concerts')
        .controller('ConcertAddController', ConcertAddController)
        .controller('ConcertAddGeneralController', ConcertAddGeneralController)
        .controller('ConcertAddPiecesController', ConcertAddPiecesController)
        .controller('ConcertAddSoloistsController', ConcertAddSoloistsController)
        .controller('ConcertAddMusiciansController', ConcertAddMusiciansController);

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

    /** @ngInject */
    function ConcertAddSoloistsController(Concert, Soloist, $state, $stateParams, concert, $log) {
        var vm = this;

        vm.soloists = [Soloist.createInstance()];
        vm.soloists[0].rank = 1;
        vm.soloists[0].concert = concert.id;

        vm.addSoloist = function() {
            var newSoloist = Soloist.createInstance();
            newSoloist.rank = vm.soloists.length + 1;
            newSoloist.concert = concert;
            vm.soloists.push(newSoloist);
            $log.debug(vm.soloists);
        };

        vm.removeSoloist = function(soloist) {
            var index = vm.soloists.indexOf(soloist);
            vm.soloists.splice(index, 1);
            _.forEach(vm.soloists, function(s) {
                if (s.rank > index)
                    s.rank -= 1;
            });
            $log.debug(vm.soloists);
        };

        vm.upSoloist = function(soloist) {
            if (soloist.rank > 1) {
                _.find(vm.soloists, function(s) {
                    return s.rank == soloist.rank - 1;
                }).rank += 1;
                soloist.rank -= 1;
            }
            $log.debug(vm.soloists);
        };

        vm.downSoloist = function(soloist) {
            if (soloist.rank < vm.soloists.length) {
                _.find(vm.soloists, function(s) {
                    return s.rank == soloist.rank + 1;
                }).rank -= 1;
                soloist.rank += 1;
            }
            $log.debug(vm.soloists);
        };

        vm.saveSoloists = function() {
            var nbS = 0;
            _.forEach(vm.soloists, function(s) {
                nbS += 1;
                $log.debug(s);
                Soloist.create(s).then(function(ss) {
                    $log.debug('Le soliste de rang ' + ss.rank + ' a été enregistré.');
                    if (nbS == vm.soloists.length) {
                        $state.go('index.concerts.add.musicians', {id: $stateParams.id});
                    }
                }, function(e) {
                    $log.error(e);
                    nbS -= 1;
                });
            });
        };
    }

    /** @ngInject */
    function ConcertAddMusiciansController(Concert, Musician, $state, $stateParams, concert, $log) {
        var vm = this;

        vm.musicians = [Musician.createInstance()];
        vm.musicians[0].rank = 1;
        vm.musicians[0].concert = concert.id;

        vm.addMusician = function() {
            var newMusician = Musician.createInstance();
            newMusician.rank = vm.musicians.length + 1;
            newMusician.concert = concert;
            vm.musicians.push(newMusician);
            $log.debug(vm.musicians);
        };

        vm.removeMusician = function(musician) {
            var index = vm.musicians.indexOf(musician);
            vm.musicians.splice(index, 1);
            _.forEach(vm.musicians, function(m) {
                if (m.rank > index)
                    m.rank -= 1;
            });
            $log.debug(vm.musicians);
        };

        vm.upMusician = function(musician) {
            if (musician.rank > 1) {
                _.find(vm.musicians, function(m) {
                    return m.rank == musician.rank - 1;
                }).rank += 1;
                musician.rank -= 1;
            }
            $log.debug(vm.musicians);
        };

        vm.downMusician = function(musician) {
            if (musician.rank < vm.musicians.length) {
                _.find(vm.musicians, function(m) {
                    return m.rank == musician.rank + 1;
                }).rank -= 1;
                musician.rank += 1;
            }
            $log.debug(vm.musicians);
        };

        vm.saveMusicians = function() {
            var nbM = 0;
            _.forEach(vm.musicians, function(m) {
                nbM += 1;
                $log.debug(m);
                Musician.create(m).then(function(sm) {
                    $log.debug('Le musicien de rang ' + sm.rank + ' a été enregistré.');
                    if (nbM == vm.musicians.length) {
                        $state.go('index.concerts.add.validation', {id: $stateParams.id});
                    }
                }, function(e) {
                    $log.error(e);
                    nbM -= 1;
                });
            });
        };
    }
})();
