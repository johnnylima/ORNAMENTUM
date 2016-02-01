/*
 * Projetado por Johnny Lima
 */
(function() {
  'use strict';

  //diretiva onmtToogleMenuPai
  angular.module("ornamentumApp").directive("onmtSidenavMenu", function() {
    return {
      templateUrl:'view/onmtSidenavMenu.html',
      replace: true
    };
  });

})();
