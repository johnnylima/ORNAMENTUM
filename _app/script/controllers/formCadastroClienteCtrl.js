/*
 * Projetado por Johnny Lima
 */
(function() {
  'use strict';

  angular.module("ornamentumApp")
    .controller("formCadastroClienteCtrl", formDialogClientCtrl);





  function formDialogClientCtrl($scope, $mdDialog, $mdMedia) {
    var alert;
    $scope.showAlert = showAlert;
    $scope.showDialog = showDialog;
    $scope.showAddEnderecoDialog = showAddEnderecoDialog;
    $scope.showAddContatoDialog = showAddContatoDialog;
    $scope.items = [1, 2, 3, 4, 5];
    // Internal method
    function showAlert() {
      alert = $mdDialog.alert({
        title: 'Attention',
        textContent: 'This is an example of how easy dialogs can be!',
        ok: 'Close'
      });
      $mdDialog
        .show(alert)
        .finally(function() {
          alert = undefined;
        });
    }

    function showDialog($event) {
      var parentEl = angular.element(document.body);
      $mdDialog.show({
        parent: parentEl,
        targetEvent: $event,
        templateUrl: 'view/cliente/dialog.tmpl.endereco.html',
        locals: {
          items: $scope.items
        },
        controller: DialogController
      });

      function DialogController($scope, $mdDialog, items) {
        $scope.items = items;
        $scope.closeDialog = function() {
          $mdDialog.hide();
        }
      }
    }

    function showAddEnderecoDialog(ev) {
      $mdDialog.show({
          controller: DialogController,
          templateUrl: 'view/cliente/endereco.dialog.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          locals: {
            items: $scope.items
          }
        })
    }

    function showAddContatoDialog(ev) {
      $mdDialog.show({
          controller: DialogController,
          templateUrl: 'view/cliente/contato.dialog.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          locals: {
            items: $scope.items
          }
        })
    }

    function DialogController($scope, $mdDialog, items) {
      $scope.items = items;
      $scope.closeDialog = function() {
        $mdDialog.hide();
      }
    }
  }
})();
