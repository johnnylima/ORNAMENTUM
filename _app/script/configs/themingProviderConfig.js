/*
 * Projetado por Johnny Lima
 */
(function() {
  'use strict';

  angular.module('ornamentumApp')
    .config(function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('blue');
    });
})();
