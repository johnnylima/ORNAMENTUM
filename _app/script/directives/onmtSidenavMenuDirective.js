/*
 * Projetado por Johnny Lima
 */
(function() {
  'use strict';

  //diretiva onmtToogleMenuPai
  angular.module("ornamentumApp").directive("onmtSidenavMenu", function() {
    return {
      controller: function($scope, $mdSidenav) {
      },
      templateUrl: 'view/onmtSidenavMenu.html',
      replace: true,
      link: function(scope) {
        scope.sidenavMin = false;
      }
    };
  });

})();
