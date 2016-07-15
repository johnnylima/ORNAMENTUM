/*
 * Projetado por Johnny Lima
 */
(function() {
  'use strict';

  //diretiva onmtToogleMenuPai
  angular.module("ornamentumApp")
    .directive("onmtRegularCard", function() {
      return {
        restrict: 'E',
        templateUrl: 'view/directives/card/onmtRegularCard.tmpl.html',
        replace: true,
        scope: {
          icon: '@',
          title: '@',
          message: '@'
        }
      };
    })
    .directive('onmtUserCard', function() {
      return {
        restrict: 'E',
        replace: true,
        transclude: true,
        templateUrl: 'view/directives/card/onmtUserCard.tmpl.html',
        scope: {
          icon: '@',
        }
      }
    });

})();
