/*
 * Projetado por Johnny Lima
 */
(function() {
  'use strict';

  //diretiva onmtToogleMenuPai
  angular.module("ornamentumApp")
    .directive("onmtDivInfo", function() {
      return {
        restrict: 'E',
        templateUrl: 'view/directives/ui/onmtDivInfo.tmpl.html',
        replace: true,
        scope: {
          icon: '@',
          title: '@',
          message: '@'
        },
        link: function(scope){
          scope.icondefault='info_outline';
          scope.icon = scope.icon!=null?scope.icon:scope.icondefault;
        }
      };
    });

})();
