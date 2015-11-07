(function() {
    'use strict';

    angular
    .module('chorale')
    .run(runBlock);

    /** @ngInject */
    function runBlock($log, amMoment, moment) {
        $log.debug('runBlock end');

        moment.locale('fr', {
            calendar : {
                lastDay : '[Hier]',
                sameDay : "[Aujourd'hui]",
                nextDay : '[Demain]',
                lastWeek : 'dddd [dernier]',
                nextWeek : 'dddd [prochain]',
                sameElse : 'L'
            }
        });
        amMoment.changeLocale('fr');
    }
})();
