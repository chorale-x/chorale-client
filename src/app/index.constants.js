/* global moment:true, lodash:true */
(function() {
  'use strict';

  angular
    .module('chorale')
    .constant('moment', moment)
    .constant('angularMomentConfig', { timezone: 'Europe/Paris' });

})();
