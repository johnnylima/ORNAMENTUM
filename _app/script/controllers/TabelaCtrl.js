/*
 * Projetado por Johnny Lima
 */

// Controles
var ornamentum = angular.module("ornamentum");
ornamentum.controller('TituloCtrl', function ($scope) {
    $scope.title = 'Clientes';
});
ornamentum.controller('TabelaCtrl', function ($scope, $http) {
    //Este trecho foi retirado de Toolbar

    /* CONFIGURAÇÃO DO FORM */
    $scope.cfgForm = {
        item: {
            /**
             * @key headers: {nome:"Nome", cod:"Código do Usuário"} onde os key's
             * são os nomes das colunas a serem obitidas no BD(deve ser exatamente o mesmo)
             * e os value's são os nics que aparecerão na tabela.
             */
            headers: {
                nome: "Cliente",
                email: "E-mail",
                celular: "Celular"
            },
            icon: [
                "person",
                "date_range",
                "business_center"
            ]
        }
    };
    /* DADOS */
    $scope.clientes = [];

    /**
     * <b>@syntax paramentros:</b> Carrega todos os parâmetros da busca nos banco,
     * de dados. Deve obrigatoriamente ter os seguintes 'Parameters' como chaves:
     * @param KEY acao = Nome da ação existente na controller.php
     * @param KEY tabela = Nome da tabela no BD
     * @param KEY colunas = Nome das colunas na tabela no BD a serem pesquisadas quando a ação for igual a "l_colunas"
     * @example var parametros = {acao: "l_colunas", tabela: "onmt_usuario", colunas: $scope.cfgForm.item.headers};
     */
    var parametros = {
        acao: "l_colunas",
        tabela: "onmt_usuario",
        colunas: $scope.cfgForm.item.headers
    };
    var req = {
        method: 'GET',
        url: 'script/controllers/usuarioCtrl.php',
        params: (parametros)
    };

    $http(req).then(function (response) {
        $scope.clientes = response.data;
    }, function (response) {
        $scope.danger = response.data;
    });

    //$scope.clientes = [{"cod":"0","nome":"Fernando Dias de Sousa","email":"fernan@mailg.com","celular":"84478057","senha":"123","cpf":"3076437194","nascimento":"1991-01-27"}]
    /*
     $scope.clientes = [
     {nome: "Pablo Mendoça", idade: 25, funcao: "Estagiário"},
     {nome: "Ricardo Leite", idade: 41, funcao: "Diretor"},
     {nome: "Francisco Motta", idade: 35, funcao: "Gerente de Contas"}
     ];//*/

    /* FUNÇÕES */
    /* ADICIONAR CLIENTE */
    $scope.addCliente = function (dado) {
        $scope.clientes.push(dado);
        $scope.cons($scope.formCliente);
        delete $scope.cliente;
        $scope.formCliente.$setPristine();
//                    $scope.cons(dado);
    };

    /* DELETAR CLIENTE */
    $scope.delCliente = function (dados) {
        $scope.clientes = dados.filter(function (dado) {
            if (!dado.sel)
                return dado;
        });
//                    $scope.cons(dadosSel);
    };

    /* SELECT CLIENTE */
    $scope.clienteSel = function (dados) {
        return dados.some(function (dado) {
            return dado.sel;
        });
//                    $scope.cons(dadoSel);
//                    console.log("clienteSel \n");
    };

    /* FILTROS CLIENTE */
    $scope.Ordenacao = function (campo) {
        $scope.criterioOrdenacao = campo;
        $scope.dirOrdenacao = !$scope.dirOrdenacao;

//                    $scope.cons(dadosSel);
    };

    $scope.cons = function (csle) {
        console.clear();
        console.log(csle);
    };
});
