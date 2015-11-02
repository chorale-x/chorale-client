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
        // return $resource(API.route('concerts/:id'), {field: '@field', id: '@id'}, {
        //     next_concert: {url: API.route('concerts/next')},
        //     update: {method: 'PUT', url: API.route('concerts/:id')},
        //     bookable: {method: 'GET', url: API.route('concerts/bookable'), isArray: true},
        //     toggle: {method: 'PUT', url: API.route('concerts/toggle/:field/:id')}
        // }, {stripTrailingSlashes: false});
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
        // return $resource(API.route('pieces/:id'), {id: '@id', concert_id: '@concert_id'}, {
        //     by_concert: {method: 'GET', url: API.route('pieces/by-concert/:concert_id'), isArray: true},
        //     update: {method: 'PUT', url: API.route('pieces/:id')}
        // }, {stripTrailingSlashes: false});
        return DS.defineResource({
            name: 'piece',
            // relations: {
            //     belongsTo: {
            //         concert: {
            //             localField: 'concert',
            //             localKey: 'concert_id'
            //         }
            //     }
            // }
        });
    }

    /** @ngInject */
    function Soloist(DS) {
        // return $resource(API.route('soloists/:id'), {id: '@id'}, {
        //     by_concert: {method: 'GET', url: API.route('soloists/by-concert/:concert_id'), isArray: true},
        //     update: {method: 'PUT', url: API.route('soloists/:id')}
        // }, {stripTrailingSlashes: false});
        return DS.defineResource({
            name: 'soloist',
            // relations: {
            //     belongsTo: {
            //         concert: {
            //             localField: 'concert',
            //             localKey: 'concert_id'
            //         }
            //     }
            // }
        });
    }

    /** @ngInject */
    function Musician(DS) {
        // return $resource(API.route('musicians/:id'), {id: '@id'}, {
        //     by_concert: {method: 'GET', url: API.route('musicians/by-concert/:concert_id'), isArray: true},
        //     update: {method: 'PUT', url: API.route('musicians/:id')}
        // }, {stripTrailingSlashes: false});
        return DS.defineResource({
            name: 'musician',
            // relations: {
            //     belongsTo: {
            //         concert: {
            //             localField: 'concert',
            //             localKey: 'concert_id'
            //         }
            //     }
            // }
        });
    }
})();