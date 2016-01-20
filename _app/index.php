<!DOCTYPE html>
<?php
require('./../_backend/_config/config.inc.php');
?>
<html ng-app="ornamentum">
    <head>
        <title>ORNAMENTUM</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- Importação da folha de estilo principal -->
        <link rel="stylesheet" type="text/css" href="lib/angular-material/angular-material.css">
        <link rel="stylesheet" type="text/css" href="style/material-icons/material-icons.css">
        <!--<link rel="stylesheet" type="text/css" href="lib/angular-material/angular-material.layouts.css">-->
        <!-- Importação da folha de estilo secundário e personalizados -->
        <link rel="stylesheet" type="text/css" href="style/my-table.css">


        <!-- Importação dos scripts principais -->
        <script src="lib/angular/angular.js"></script>
        <!-- Grupo de importações correnpondente ao ANGULAR-MATERIAL -->
        <script src="lib/angular-animate/angular-animate.js"></script>
        <script src="lib/angular-aria/angular-aria.js"></script>
        <script src="lib/angular-material/angular-material.js"></script>
        <script src="lib/angular-messages/angular-messages.js"></script>
        <!-- Grupo de importações correnpondente ao ANGULAR-MATERIAL -->

        <!-- Script inline -->
        <script>
            // Nomeando o Módulo e fazendo carregamento dos módulos dependentes
            var ornamentum = angular.module("ornamentum", ["ngMaterial", "ngMessages"]);
            // Controles
            ornamentum.controller('TituloCtrl', function ($scope) {
                $scope.title = 'Clientes';
            });
            ornamentum.controller('TabelaCtrl', function ($scope, $http) {
                //Este trecho foi retirado de Toolbar

                /* CONFIGURAÇÃO DO FORM */
                $scope.cfgForm = {
                    item: {
                        headers: ["Nome", "Idade", "Função"],
                        icon: ["person", "date_range", "business_center"]
                    }
                };
                /* DADOS */
                var url = "script/controllers/usuarioCtrl.php";
                $http.get(url).then(function(data){
                    console.log(data);
                });
                
                $scope.clientes=[];
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
        </script>

    </head>

    <body>
        
        
        
        <?php
        
        $new = new create;
        
        //var_dump($new);
        /*
        echo "Uso de memoria:" . (memory_get_usage() / 100000) . " Mb<hr>";

        //*/
        
        /*
        $Query = "SELECT COLUMN_NAME FROM information_schema.columns WHERE table_name = 'onmt_usuario' AND ORDINAL_POSITION > 1";

        //  $nCT = nameColumnTable
        $nCT = new read;
        $nCT->FullRead($Query);
        $result = $nCT->getResult();//*/

        //var_dump($result);
//        header("location: ./_app/_user/view/user/cadastro.html");

    
        ?>
        
        

        <div ng-cloak>
            <md-content class="md-padding" layout="row" layout-wrap layout-align="center start" layout-xs="column">
                <div flex="50" flex-xs="100" layout="column">

                    <md-card>
                        <!--Topo-->
                        <md-toolbar md-scroll-shrink ng-if="true" ng-controller="TituloCtrl" class="md-card-image" >
                            <div class="md-toolbar-tools">
                                <h3>
                                    <span>{{title}}</span>
                                </h3>
                                <span flex></span>
                                <!--Botões de ação-->
                                <md-card-actions layout="row" layout-align="end center">
                                    <md-button class="md-icon-button">
                                        <i class="material-icons md-light" >add_box</i>
                                        <md-tooltip  md-direction="left">
                                            Adicionar Usuário
                                        </md-tooltip>
                                    </md-button>
                                </md-card-actions>
                            </div>
                        </md-toolbar>

                        <!--Corpo do Card-->
                        <md-card-content ng-controller="TabelaCtrl">
                            <!--Tabela-->
                            <table ng-show="clientes.length > 0" class="md-table">


                                <thead>
                                    <tr>
                                        <th>

                                <md-button class="md-icon-button" style="color:#FF5252;" ng-show="clienteSel(clientes)" ng-click="delCliente(clientes)">
                                    <i class="material-icons" >delete</i>
                                    <md-tooltip  md-direction="right">
                                        Apagar
                                    </md-tooltip>
                                </md-button>
                                </th>
                                <th class="md-table-header" ng-repeat="i in cfgForm.item.headers">
                                    <a href="" ng-if="i=='Nome'" ng-click="Ordenacao(i)">{{i}}</a>
                                    <any ng-if="i!='Nome'">{{i}}</any>
                                </th>
                                </tr>
                                </thead>


                                <tbody>
                                    <tr ng-class="{sel: c.sel}" ng-repeat="c in clientes | orderBy:'nome':dirOrdenacao">
                                        <td>
                                            <md-checkbox class="md-primary" ng-model="c.sel" ng-click="seltAll(this)" aria-label="{c}">
                                            </md-checkbox>
                                        </td>
                                        <td class="md-table-content" ng-repeat="(k, v) in c" ng-if="v!=true && v!=false">{{v}}</td>
                                    </tr>
                                </tbody>

                            </table>

                            <br />
                            <hr />

                            Virgem: {{formCliente.nome.$pristine}}
                            <!--Botões de ação do Card-->
                            <!--<pre>{{cons(cliente)}}</pre>-->                           
                            <md-card-actions layout="row" layout-align="end center">
                                <md-button class="md-icon-button md-primary" ng-disabled="formCliente.$invalid" ng-click="addCliente(cliente)">
                                    <i class="material-icons" >add_box</i>
                                    <md-tooltip  md-direction="buttom">
                                        Adicionar
                                    </md-tooltip>
                                </md-button>
                            </md-card-actions>

                            <div>
                                <form name="formCliente">

                                    <md-input-container md-no-float class="md-block">
                                        <label>{{cfgForm.item.headers[0]}}</label>
                                        <md-icon><i class="material-icons" >{{cfgForm.item.icon[0]}}</i></md-icon>
                                        <input ng-model="cliente.nome" name="nome" type="text" required minlength="3">
                                        <div ng-messages="formCliente.$error">
                                            <div ng-message="required">Favor preencher o nome.</div>
                                            <div ng-message="minlength">Nome composto por no mínimo de 3 caractéres.</div>
                                        </div>
                                    </md-input-container>

                                    <md-input-container md-no-float class="md-block">
                                        <label>{{cfgForm.item.headers[1]}}</label>
                                        <md-icon><i class="material-icons" >{{cfgForm.item.icon[1]}}</i></md-icon>
                                        <input ng-model="cliente.idade" name="idade" type="text" >
                                        <div ng-messages="formCliente.idade.$error && formCliente.idade.$pristine">
                                            <div ng-message="required">Favor preencher a idade.</div>
                                        </div>
                                    </md-input-container>

                                    <md-input-container md-no-float class="md-block">
                                        <label>{{cfgForm.item.headers[2]}}</label>
                                        <md-icon><i class="material-icons" >{{cfgForm.item.icon[2]}}</i></md-icon>
                                        <input ng-model="cliente.funcao" name="funcao" type="text" >
                                        <div ng-messages="formCliente.funcao.$invalid && formCliente.funcao.$pristine">
                                            <div ng-message="required">Favor preencher a função.</div>
                                        </div>
                                    </md-input-container>

                                </form>
                            </div>


                        </md-card-content>
                    </md-card>

                </div>
            </md-content>
        </div>

    </body>
</html
