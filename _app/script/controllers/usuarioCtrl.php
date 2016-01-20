<?php

require('../../../_backend/_config/config.inc.php');
//var_dump($_POST);
//        //$Query = "SELECT COLUMN_NAME FROM information_schema.columns WHERE table_name = 'onmt_usuario' AND ORDINAL_POSITION > 1";
//
//        $Tb = 'onmt_usuario';
//        $nCT = new read;
//
//        
////        $nCT->FullRead($Query);
//        $nCT->ExeRead($Tb);
//        $result = $nCT->getResult();
//        
//        //$r = serialize($result);print_r("<pre>".$r."</pre>");
//        //var_dump($result);
//        print_r(json_encode($result));




extract($_GET, EXTR_SKIP);
//var_dump(extract($_POST));
//var_dump(array_keys(array_reverse($colunas)));


/**
 * @var string acao: vem do arquivo .js e foi extraido;
 */
switch ($acao):
    case "l_colunas": //leitura de colunas de uma determinada tabela
        /**
         * @var string $tabela é referente ao nome da tabela no BD
         */
        // CARREGANDO COLUNAS DA TABELA ONMT_USUÁRIO
        /* QUERY NO MYSQL
         * "SELECT `nome`, `email`, `celular` FROM `onmt_usuario`";
         */

        /* Decodificando a string Json:
         * Foi feito assim pois se o for recebido como array/object vem em ordem
         * alfabética, o que é ruim. */
        $colunas = json_decode($colunas, TRUE);
        if ((count($colunas)) > 0):
            /**
             * @var $colunaQString : Geração da Qeury String para consulta.
             */
            $colunaQString = ( "`" . implode("`, `", array_keys($colunas)) . "`" );
            //echo $colunaQString;

            $nCT = new read;
            $nCT->ExeReadColumn($tabela, $colunaQString);
            $result = $nCT->getResult();
            print_r(json_encode($result));
            
        else:

            echo "<b>Erro na variável \$Colunas:</b> @ Esta variável deve ser<br>"
            . " passada como array (json) contendo o nome das colunas que devem<br>"
            . ' ser obitidas na busca ao BD.<br><b> Ex.:</b> headers: {nome: "Nome", email:"E-mail", celular:"Celular"}<p><p>';

        endif;


//        $nCT = new read;
//
//        //$Query = "SELECT {$colunaQString} FROM `onmt_usuario`";
//        //$nCT->FullRead($Query);
//        $nCT->ExeReadColumn($tabela, $colunaQString);
//        $result = $nCT->getResult();
//
//        //$r = serialize($result);print_r("<pre>".$r."</pre>");
//        //var_dump($result);
//        print_r(json_encode($result));

        break;
    case "create":

        break;

    default:
        echo "default";
        break;
endswitch;

//*/