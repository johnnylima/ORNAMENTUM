/*
* Projetado por Johnny Lima
*/
(function() {
  'use strict';

  angular.module("ornamentumApp")
  .config(function($routeProvider){

    /*Formulário de Cadastro de Cliente*/
    $routeProvider.when('/cliente/cadastro', {
      templateUrl: 'view/cliente/formCadastroClienteView.html',
      controller: 'formCadastroClienteCtrl',
      resolve: {

      }
    });
    $routeProvider.otherwise({redirectTo: '/cliente/cadastro' })

  });
})();
