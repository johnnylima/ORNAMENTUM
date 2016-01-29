/*
 * Projetado por Johnny Lima
 */
(function() {
  'use strict';

  //diretiva onmtToogleMenuPai
  angular.module("ornamentumApp").directive("onmtToogleMenuPai", function() {
    return {
      controller: function($scope, $element, $attrs) {
        var toogleMenuFilhos = [];

        this.registrosMenuFilhos = function(menuFilho) {
          toogleMenuFilhos.push(menuFilho);
        };
        this.closeAll = function() {
          toogleMenuFilhos.forEach(function(menuFilho) {
            menuFilho.isOpened = false;
          })
        }
      }
    };
  });
  // diretiva filha de ontmToogleMenuPai
  angular.module("ornamentumApp").directive("onmtToogleMenuFilhos", function() {
    return {
      templateUrl: "view/toogleMenu.html",
      scope: {
        icone: "@",
        link: "@",
        filhosview: "@"
      },
      require: "^onmtToogleMenuPai",
      link: function(scope, element, attrs, ctrl) {
        scope.filhos = scope.$eval(attrs.filhos);
        ctrl.registrosMenuFilhos(scope);
        var registroFilho;

        scope.open = function() {
          ctrl.closeAll();

          scope.isOpened = true;
        }
      }
    };
  });

})();
