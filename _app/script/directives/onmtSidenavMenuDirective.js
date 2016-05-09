/*
* Projetado por Johnny Lima
*/
(function() {
  'use strict';

  //diretiva onmtToogleMenuPai
  angular.module("ornamentumApp")
  .directive("onmtSidenavMenu", function() {
    return {
      controller: function($scope, $mdSidenav) {

        $scope.close = function () {
          $mdSidenav('left').close();
        };
        $scope.toggleLeft = buildToggler('left');

        function buildToggler(navID) {
          return function() {
            $mdSidenav(navID)
            .toggle();
          }
        };

      },
      templateUrl: 'view/directives/onmtSidenavMenuView.html',
      replace: true,
      link: function(scope) {
        scope.sidenavMin = false;
      }
    };
  });

})();
