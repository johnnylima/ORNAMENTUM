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
    $scope.dado = [];
    $scope.dadoContato = [];
    $scope.dadoEndereco = [{"tipoendereco":"residencial","tipologradouro":"quadra","logradouro":"QNO 16 Conjunto 22","complemento":"Casa","numero":"08","bairro":"Setor \"O\"","localidade":"Ceilândia Norte","uf":"DF","cep":"72260622","observacao":"Casa do Cliente"},{"tipoendereco":"evento","tipologradouro":"quadra","logradouro":"406 Conjunto \"E\"","complemento":"Lote","numero":"22","bairro":"","localidade":"Recanto das Emas","uf":"DF","observacao":"Casa da mãe"},{"tipoendereco":"comercial","tipologradouro":"setor","logradouro":"SRTVSul Quadra 701 Conj E","complemento":"Sala","numero":"701","bairro":"Ed. Palácio do Rádio II","localidade":"Asa Sul","uf":"DF","cep":"70340-902","observacao":"Local de Trabalho"}];

    /* ------------------------------------ DIALOGS ------------------------------------ */
    $scope.showAlert = showAlert;
    $scope.showDialog = showDialog;
    // ENDEREÇO
    $scope.showAddEnderecoDialog = showAddEnderecoDialog;
    $scope.showViewEnderecoDialog = showViewEnderecoDialog;
    $scope.removeEndereco = removeEndereco;
    // CONTATO
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

    // ENDEREÇOS --------------------------------------------------

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
        console.log(ev);
        $scope.items = items;
        $scope.aLabel = "Novo Endereço";
        $scope.closeDialog = function() {
          $scope.limparForm();
          $mdDialog.hide();
        };
        $scope.limparForm = function() {
          delete $scope.endereco;
          $scope.clienteEnderecoForm.$setPristine();
        };
        $scope.AddEndereco = function(endereco) {
          $scope.dadoEndereco.push(angular.copy(endereco));
          $scope.closeDialog();
        };
      }
    }

    // ----------------------------------------------------

    function showViewEnderecoDialog(i) {
      $mdDialog.show({
        controller: viewEnderecoDialogCtrl,
        templateUrl: 'view/cliente/endereco.dialog.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: i,
        clickOutsideToClose: true,
        scope: $scope,
        preserveScope: true,
        locals: {
          items: $scope.items,
          enderecoIndex: $scope.dadoEndereco
        }
      });

      function viewEnderecoDialogCtrl($scope, $mdDialog, items, enderecoIndex) {
        console.log(i);
        $scope.endereco=enderecoIndex[i];
        $scope.originalEndereco= angular.copy(enderecoIndex[i]);
        $scope.view = true;
        $scope.viewEditClose= true;
        $scope.aLabel = "Visualizar Endereço";
        $scope.items = items;
        console.log($scope.originalEndereco);


        $scope.editDialog = function() {
          $scope.viewEditClose = false;
          $scope.aLabel = "Editar Endereço";
          $scope.view = false;
        };
        $scope.closeDialog = function() {
          $scope.limparForm();
          enderecoIndex[i]=$scope.originalEndereco;
          $mdDialog.hide();
          $scope.viewEditClose = true;
        };
        $scope.limparForm = function() {
          delete $scope.endereco;
          $scope.clienteEnderecoForm.$setPristine();
        };
        $scope.AlterEndereco = function(endereco) {
          $scope.limparForm();
          $mdDialog.hide();
          $scope.viewEditClose = true;
        };
      }
    }

    function removeEndereco(i){
      $scope.dadoEndereco.pop(i);
    }

    // CONTATOS --------------------------------------------------

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

      function ContatoDialogCtrl($scope, $mdDialog, items) {
        $scope.items = items;
        $scope.telefones = [
          {"tipo":"residencial","ddd":"61","numero":"84478057"},{"tipo":"residencial","ddd":"61","numero":"84478057"},{"tipo":"residencial","ddd":"61","numero":"84478057"},{"tipo":"residencial","ddd":"61","numero":"84478057"}
        ];

        $scope.closeDialog = function() {
          $scope.limparForm();
          $mdDialog.hide();
        };
        $scope.limparForm = function() {
          delete $scope.contato.dado;
          $scope.clienteContatoForm.$setPristine();
        };
        $scope.AddContato = function(contato) {
          $scope.contato.telefone = $scope.telefones;
          $scope.dadoContato.push(angular.copy(contato));
          $scope.closeDialog();
        };
        $scope.removeTelefone = function(i) {
          console.log($scope.telefones[i]);
          // delete $scope.contato.telefones[i];
          // $scope.clienteContatoForm.$setPristine();
        };
        $scope.AddTelefone = function(telefone) {
          $scope.telefones.push(telefone);
          delete $scope.contato.telefone;
        };
      }
    }
  }
})();
