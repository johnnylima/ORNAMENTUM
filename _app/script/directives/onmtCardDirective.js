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
      scope:{
        icon: '@',
        title: '@',
        message: '@'
      }
    };
  })
  .directive('onmtUserCard', function () {
    return {
      restrict: 'E',
      templateUrl: 'view/directives/card/onmtUserCard.tmpl.html',
      scope: {
        name: '@',
        theme: '@'
      },
      controller: function ($scope) {
        $scope.theme = $scope.theme || 'default';
      }
    }
  });

})();
