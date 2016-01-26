/*
 * Projetado por Johnny Lima
 */
(function() {
  'use strict';

  // Nomeando o Módulo e fazendo carregamento dos módulos dependentes
  angular.module("ornamentumApp").directive("onmtToogleMenu", function() {
    return {
      templateUrl: "view/toogleMenu.html",
      scope:{
        icone:  "@",
        link:   "@",
        filhos: "@",
        filhosview: "@"
      },
      link: function(attrs){
        console.log("ok");
        console.log(attrs);
      }
    };
  });

})();
