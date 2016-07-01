/*
 * Projetado por Johnny Lima
 */
(function() {
  'use strict';

  angular.module("ornamentumApp")
    .controller("formCadastroClienteCtrl", formCadastroCliente);

  function formCadastroCliente($scope, $mdDialog, $mdMedia) {
    var alert;

    /* ------------------------------------ DADOS ------------------------------------ */
    $scope.dado=[];
    $scope.dadoContato=[];
    $scope.dadoEndereco=[];

    /* ------------------------------------ DIALOGS ------------------------------------ */
    $scope.showAlert = showAlert;
    $scope.showDialog = showDialog;
    $scope.showAddEnderecoDialog = showAddEnderecoDialog;
    $scope.showAddContatoDialog = showAddContatoDialog;
    $scope.items = [];
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
        controller: EnderecoDialogCtrl,
        templateUrl: 'view/cliente/endereco.dialog.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        scope: $scope,
        preserveScope: true,
        locals: {
          items: $scope.items
        }
      });

      function EnderecoDialogCtrl($scope, $mdDialog, items) {
        $scope.items = items;
        $scope.closeDialog = function() {
          $scope.limparForm();
          $mdDialog.hide();
        };
        $scope.limparForm = function(){
          delete $scope.endereco;
          $scope.clienteEnderecoForm.$setPristine();
        };
        $scope.AddEndereco = function(endereco){
          $scope.dadoEndereco.push(angular.copy(endereco));
          $scope.closeDialog();
        };
      }
    }

    function showAddContatoDialog(ev) {
      $mdDialog.show({
        controller: ContatoDialogCtrl,
        templateUrl: 'view/cliente/contato.dialog.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        scope: $scope,
        preserveScope: true,
        locals: {
          items: $scope.items
        }
      });

      function ContatoDialogCtrl  ($scope, $mdDialog, items) {
        $scope.items = items;
        $scope.telefones=[/*
          {"tipo":"residencial","ddd":"61","numero":"84478057"},
          {"tipo":"residencial","ddd":"61","numero":"84478057"},
          {"tipo":"residencial","ddd":"61","numero":"84478057"},
          {"tipo":"residencial","ddd":"61","numero":"84478057"}//*/
        ];
        $scope.closeDialog = function() {
          $scope.limparForm();
          $mdDialog.hide();
        };
        $scope.limparForm = function(){
          delete $scope.contato;
          $scope.clienteContatoForm.$setPristine();
        };
        $scope.AddContato = function(contato){
          $scope.dadoContato.push(angular.copy(contato));
          $scope.closeDialog();
        };
        $scope.removerTelefones = function(){
          $scope.telefones.pop();
        };
        $scope.removeTelefone = function(){
          delete $scope.contato;
          $scope.clienteContatoForm.$setPristine();
        };
        $scope.AddTelefone = function(telefone){
          $scope.telefones.push(telefone);
          console.log($scope.telefones);
          delete $scope.contato.telefone;
        };
      }
    }
  }
})();
