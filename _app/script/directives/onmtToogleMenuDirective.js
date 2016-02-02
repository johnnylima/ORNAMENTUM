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
        var uLink;
        var vLink = false;

        // $element.bind("mousemove",function(){
        //   console.log($scope.side);
        // });

        //registro dos scope's dos links detro de <onmt-toogle-menu-pai>
        this.registrosMenuFilhos = function(menuFilho) {
          toogleMenuFilhos.push(menuFilho);
        };

        //controle dos <onmt-toogle-menu-filho> que serão fechados/aberto
        this.closeAll = function(sLink) {

          if (vLink == false) {
            //Primeira vez
            // console.log('blok 1');
            toogleMenuFilhos.forEach(function(menuFilho) {
              if (menuFilho.link == sLink.link) {
                //console.log(sLink.link);
                uLink = sLink.link;
                menuFilho.isOpened = true;
              } else {
                menuFilho.isOpened = false;
              }
            })
            vLink = true;

          } else if (sLink.link == uLink) {
            //A partir da segunda vez
            // console.log('blok 2');
            // console.log(sLink.link);

            toogleMenuFilhos.forEach(function(menuFilho) {
              menuFilho.isOpened = false;
              vLink = false;
            })


          } else {
            // console.log(sLink.link + ' : ' + uLink);
            // console.log('blok 3');

            toogleMenuFilhos.forEach(function(menuFilho) {
              if (menuFilho.link == sLink.link) {
                //console.log(sLink.link);
                menuFilho.isOpened = true;
                uLink = sLink.link;
              } else {
                menuFilho.isOpened = false;
              }
            })
            vLink = true;
          }
        }
      }
    };
  });
  // diretiva filha de ontmToogleMenuPai
  angular.module("ornamentumApp").directive("onmtToogleMenuFilho", function() {
    return {
      templateUrl: "view/toogleMenu.html",
      scope: {
        side: "=",
        icone: "@",
        link: "@",
        filhosview: "@"
      },
      require: "^onmtToogleMenuPai",
      link: function(scope, element, attrs, ctrl) {
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
      }
    };
  });

})();
