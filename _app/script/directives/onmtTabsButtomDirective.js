/*
 * Projetado por Johnny Lima
 */
(function() {
  'use strict';

  angular.module("ornamentumApp")
    .directive("onmtTabsButtom", function() {
      return {


        template:
        '<md-divider></md-divider>'+
        ''+
        '<md-content class="footer" layout="row" layout-align="space-between center" layout-padding>'+
        ''+
<<<<<<< HEAD
          '<div ng-hide="hidePrev();">'+
=======
          '<div>'+
>>>>>>> origin/master
            '<md-button class="md-hue-1 md-primary" ng-click="prevTab()">'+
              '<md-icon md-font-icon="material-icons">keyboard_arrow_left</md-icon>'+
               'anterior'+
            '</md-button>'+
          '</div>'+
          '<div></div>'+
<<<<<<< HEAD
          '<div ng-hide="hideNext();">'+
=======
          '<div>'+
>>>>>>> origin/master
            '<md-button class="md-hue-1 md-primary" ng-click="nextTab();">'+
              'Próximo'+
              '<md-icon md-font-icon="material-icons">keyboard_arrow_right</md-icon>'+
            '</md-button>'+
          '</div>'+
        '</md-content>'
        ,


        link: function(scope) {
          scope.selectedTab = 1;
          scope.selectedTab = scope.selectedTab-1;
          scope.ctTabs = scope.$$childHead.$mdTabsCtrl.tabs.length;

<<<<<<< HEAD
          scope.hidePrev = function () {
            if(scope.selectedTab == 0) return true;
          };
          scope.hideNext = function () {
            if(scope.selectedTab == scope.ctTabs-1) return true;
          };
          console.log(scope.ctTabs);

=======
>>>>>>> origin/master
          scope.nextTab = function(){
            // console.log(scope.$$childHead.$mdTabsCtrl.tabs.length);
            if (scope.selectedTab === (scope.ctTabs - 1)) {
              scope.selectedTab = scope.ctTabs - 1;
            }
            else {scope.selectedTab++;}
          };

          scope.prevTab = function(){
            if (scope.selectedTab === (scope.ctTabs - scope.ctTabs)) {
              scope.selectedTab = scope.ctTabs - scope.ctTabs;
            }
            else {scope.selectedTab--;}
          };

        }
      };

    });

})();
