/*
 * Projetado por Johnny Lima
 */
(function() {
  'use strict';

  angular.module("ornamentumApp")
    .directive("onmtFormWizard", function() {
      return {
        restrict: 'E',
        replace: true,
        transclude: true,
        templateUrl: "view/onmtFormWizardView.html",
        scope: {
          // atribute - model: "=",
          // atribute: "@"
        },
        link: function(scope, element, attrs, ctrl) {
          console.log("ok");
          /*
          scope.isOpened = false;
          scope.filhos = scope.$eval(attrs.filhos);
          ctrl.registrosMenuFilhos(scope);

          element.bind("mousemove",function(){
            //console.log(icone);
          });

          scope.open = function() {
            ctrl.closeAll(scope);
            //scope.isOpened = true;
          }
          */
        }
      };

    });
})();
