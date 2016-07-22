/*
 * Projetado por Johnny Lima
 */
(function() {
  'use strict';

  angular.module("ornamentumApp")
    .controller("formCadastroClienteCtrl", formCadastroCliente);

  function formCadastroCliente($scope, $mdDialog, $mdMedia, picker) {

    /* ------------------------------------ CALEDÁRIO ------------------------------------ */
    $scope.showCalandario= function (e) {


    }

    /* ------------------------------------ DADOS ------------------------------------ */
    $scope.dado = [];
    $scope.dadoContato = [{
      "telefone": [{
        "tipo": "residencial",
        "ddd": "61",
        "numero": "3082.7115"
      }, {
        "tipo": "principal",
        "ddd": "61",
        "numero": "9 8447.8057"
      }, {
        "tipo": "celular",
        "ddd": "61",
        "numero": "9 9506.6006"
      }, {
        "tipo": "comercial",
        "ddd": "61",
        "numero": "3316.9180"
      }],
      "dado": {
        "nome": "Johnny Wesley Henrique Lima",
        "apelido": "Rick",
        "empresa": "CIMCORP",
        "site": "www.grupocimcorp.com",
        "profissao": "Estagiário",
        "email": "rick@grupocimcorp.com",
        "relacionamento": "eu"
      }
    }];
    $scope.dadoEndereco = [{
      "tipoendereco": "residencial",
      "tipologradouro": "quadra",
      "logradouro": "QNO 16 Conjunto 22",
      "complemento": "Casa",
      "numero": "08",
      "bairro": "Setor \"O\"",
      "localidade": "Ceilândia Norte",
      "uf": "DF",
      "cep": "72260622",
      "observacao": "Casa do Cliente"
    }, {
      "tipoendereco": "evento",
      "tipologradouro": "quadra",
      "logradouro": "406 Conjunto \"E\"",
      "complemento": "Lote",
      "numero": "22",
      "bairro": "",
      "localidade": "Recanto das Emas",
      "uf": "DF",
      "observacao": "Casa da mãe"
    }, {
      "tipoendereco": "comercial",
      "tipologradouro": "setor",
      "logradouro": "SRTVSul Quadra 701 Conj E",
      "complemento": "Sala",
      "numero": "701",
      "bairro": "Ed. Palácio do Rádio II",
      "localidade": "Asa Sul",
      "uf": "DF",
      "cep": "70340-902",
      "observacao": "Local de Trabalho"
    }];


    /* ------------------------------------ DIALOGS ------------------------------------ */
    $scope.showAlert = showAlert;
    $scope.showDialog = showDialog;
    // ENDEREÇO
    $scope.showAddEnderecoDialog = showAddEnderecoDialog;
    $scope.showViewEnderecoDialog = showViewEnderecoDialog;
    $scope.removeEndereco = removeEndereco;
    // CONTATO
    $scope.showAddContatoDialog = showAddContatoDialog;
    $scope.showViewContatoDialog = showViewContatoDialog;
    $scope.removeContato = removeContato;

    $scope.ct = 0;
    $scope.primaryContato = true;

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

    function showViewEnderecoDialog(ev, i) {
      $mdDialog.show({
        controller: viewEnderecoDialogCtrl,
        templateUrl: 'view/cliente/endereco.dialog.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false,
        escapeToClose: false,
        scope: $scope,
        preserveScope: true,
        locals: {
          items: $scope.items,
          enderecoIndex: $scope.dadoEndereco
        }
      });

      function viewEnderecoDialogCtrl($scope, $mdDialog, items, enderecoIndex) {

        $scope.endereco = angular.copy(enderecoIndex[i]);
        $scope.originalEndereco = angular.copy(enderecoIndex[i]);
        $scope.view = true;
        $scope.aLabel = "Visualizar Endereço";
        $scope.items = items;


        $scope.editDialog = function() {
          $scope.aLabel = "Editar Endereço";
          $scope.view = false;
        };
        $scope.closeDialog = function() {
          $scope.limparForm();
          enderecoIndex[i] = $scope.originalEndereco;
          $mdDialog.hide();
          $scope.view = false;
        };
        $scope.limparForm = function() {
          delete $scope.endereco;
          $scope.clienteEnderecoForm.$setPristine();
        };
        $scope.AlterEndereco = function(endereco) {
          enderecoIndex[i] = angular.copy($scope.endereco);
          $scope.limparForm();
          $mdDialog.hide();
          $scope.view = false;
        };
      }
    }

    function removeEndereco(i) {
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
        $scope.aLabel = "Novo Contato";
        $scope.contato = {
          "dado": {
            "nome": "",
            "relacionamento": ""
          }
        };
        $scope.telefones = [ /*{"tipo":"residencial","ddd":"61","numero":"3082.7115"},{"tipo":"principal","ddd":"61","numero":"9 8447.8057"},{"tipo":"celular","ddd":"61","numero":"9 9506.6006"},{"tipo":"comercial","ddd":"61","numero":"3316.9180"}*/ ];
        $scope.items = items;

        if ($scope.ct == 0) {
          $scope.contato.dado.nome = $scope.dados.nome;
          $scope.contato.dado.relacionamento = "eu";
        }

        $scope.closeDialog = function() {
          $scope.limparForm();
          $mdDialog.hide();
        };
        $scope.limparForm = function() {
          delete $scope.contato;
          $scope.clienteContatoForm.$setPristine();
        };
        $scope.limparTelefones = function() {
          $scope.telefones.splice(0);
        }
        $scope.removeTelefone = function(i) {
          $scope.telefones.splice(i, 1);
        };
        $scope.AddTelefone = function(tel) {
          $scope.telefones.push(tel);
          delete $scope.contato.telefone;
        };
        $scope.AddContato = function(contato) {
          $scope.contato.telefone = $scope.telefones;
          $scope.dadoContato.push(contato);
          $scope.closeDialog();

          $scope.ct = 1;
          $scope.primaryContato = false;
        };
      }
    }

    // ----------------------------------------------------

    function showViewContatoDialog(ev, i) {
      $mdDialog.show({
        controller: viewContatoDialogCtrl,
        templateUrl: 'view/cliente/contato.dialog.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false,
        escapeToClose: false,
        scope: $scope,
        preserveScope: true,
        locals: {
          items: $scope.items,
          contatoIndex: $scope.dadoContato
        }
      });

      function viewContatoDialogCtrl($scope, $mdDialog, items, contatoIndex) {

        $scope.contato = angular.copy(contatoIndex[i]);
        $scope.originalContato = angular.copy(contatoIndex[i]);
        $scope.telefones = angular.copy(contatoIndex[i].telefone);
        $scope.view = true;
        $scope.aLabel = "Visualizar Contato";
        $scope.items = items;

        delete $scope.contato.telefone;


        $scope.removeTelefone = function(i) {
          $scope.telefones.splice(i, 1);
        };
        $scope.AddTelefone = function(tel) {
          $scope.telefones.push(tel);
          delete $scope.contato.telefone;
        };

        $scope.closeDialog = function() {
          $scope.limparForm();
          contatoIndex[i] = $scope.originalContato;
          $mdDialog.hide();
          $scope.view = false;
        };
        $scope.editDialog = function() {
          $scope.aLabel = "Editar Contato";
          $scope.view = false;
        };
        $scope.limparForm = function() {
          delete $scope.contato;
          delete $scope.telefones;
          $scope.clienteContatoForm.$setPristine();
        };
        $scope.AlterContato = function(contato) {
          $scope.contato.telefone = angular.copy($scope.telefones);
          contatoIndex[i] = $scope.contato;
          $scope.limparForm();
          $mdDialog.hide();
          $scope.view = false;
        };


      }
    }

    function removeContato(i) {
      $scope.dadoContato.pop(i);
    }

  }
})();
