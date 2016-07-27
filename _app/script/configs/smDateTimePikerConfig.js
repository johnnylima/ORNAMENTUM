/*
 * Projetado por Johnny Lima
 */
(function() {
  'use strict';

  angular.module('ornamentumApp')
    .config(function($mdThemingProvider, pickerProvider) {
      pickerProvider.setOkLabel('OK');
      pickerProvider.setCancelLabel('FECHAR');
      //  Over ride day names by changing here
      pickerProvider.setCustomHeader({
          date:'EEE, dd \'d\'e MMMM',
          dateTime:'EEE, dd \'d\'e MMM HH:mm', /*ddd, MMM DD HH:mm'*/
          time:'HH:mm',
      });
      pickerProvider.setDayHeader('single'); //Options 'single','shortName', 'fullName'
      pickerProvider.setDaysNames([{
        'single': 'D',
        'shortName': 'Dom',
        'fullName': 'Domingo'
      }, {
        'single': 'S',
        'shortName': 'Seg',
        'fullName': 'Segunda'
      }, {
        'single': 'T',
        'shortName': 'Ter',
        'fullName': 'Terça'
      }, {
        'single': 'Q',
        'shortName': 'Qua',
        'fullName': 'Quarta'
      }, {
        'single': 'Q',
        'shortName': 'Qui',
        'fullName': 'Quinta'
      }, {
        'single': 'S',
        'shortName': 'Sex',
        'fullName': 'Sexta'
      }, {
        'single': 'S',
        'shortName': 'Sáb',
        'fullName': 'Sábado'
      }]);
      // Range Picker Configuration
      pickerProvider.setDivider('até');
      pickerProvider.setMonthNames([
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setrembo",
        "Outubro",
        "Novembro",
        "Dezembro"
      ]);
      pickerProvider.setRangeDefaultList([
        'Hoje',
        'Nos últimos 7 dias',
        'Este mês',
        'Mês passado',
        'Este Trimestre',
        'No acumulado do ano',
        'Este ano',
        'Intervalo Personalizado'
      ]);
      pickerProvider.setRangeCustomStartEnd([
        'Data Inicial',
        'Data Final'
      ]);
    });
})();
