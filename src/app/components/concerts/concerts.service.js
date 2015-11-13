(function() {
    'use strict';

    angular
        .module('chorale.concerts')
        .factory('Concert', Concert)
        .factory('Piece', Piece)
        .factory('Soloist', Soloist)
        .factory('Musician', Musician);

    /** @ngInject */
    function Concert(DS, Piece, Soloist, Musician) {
        return DS.defineResource({
            name: 'concert',
            relations: {
                hasMany: {
                    piece: {
                        localField: 'pieces',
                        foreignKey: 'concert_id'
                    },
                    soloist: {
                        localField: 'soloists',
                        foreignKey: 'concert_id'
                    },
                    musician: {
                        localField: 'musicians',
                        foreignKey: 'concert_id'
                    },
                    reservation: {
                        localField: 'reservations',
                        foreignKey: 'concert_id'
                    }
                }
            },
            actions: {
                next: {
                    method: 'GET'
                }
            }
        });
    }

    /** @ngInject */
    function Piece(DS) {
        return DS.defineResource({
            name: 'piece',
            relations: {
                belongsTo: {
                    concert: {
                        localField: '_concert',
                        localKey: 'concert'
                    }
                }
            }
        });
    }

    /** @ngInject */
    function Soloist(DS) {
        return DS.defineResource({
            name: 'soloist',
            relations: {
                belongsTo: {
                    concert: {
                        localField: '_concert',
                        localKey: 'concert'
                    }
                }
            }
        });
    }

    /** @ngInject */
    function Musician(DS) {
        return DS.defineResource({
            name: 'musician',
            relations: {
                belongsTo: {
                    concert: {
                        localField: '_concert',
                        localKey: 'concert'
                    }
                }
            }
        });
    }
})();
