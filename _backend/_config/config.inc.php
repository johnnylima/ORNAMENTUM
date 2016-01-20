<?php

// CONFIGRAÇÕES DO BANCO ####################
define('HOST', 'localhost');
define('USER', 'root');
define('PASS', '');
define('DBSA', 'ornamentum');

/*

  // DEFINE SERVIDOR DE E-MAIL ################
  define('MAILUSER', 'email@dominio.com.br');
  define('MAILPASS', 'senhadoemail');
  define('MAILPORT', 'postadeenvio');
  define('MAILHOST', 'servidordeenvio');

  // DEFINE IDENTIDADE DO SITE ################
  define('SITENAME', 'Cidade Online');
  define('SITEDESC', 'Este site foi desenvolvido no curso de PHP Orientado a Objetos da UPINSIDE TREINAMENTOS. O mesmo utiliza a arquitetura semântica do HTML5 e foi criado com as últimas técnologias disponíveis!');

  // DEFINE A BASE DO SITE ####################
  define('HOME', 'http://dominiocompleto.com.br');
  define('THEME', 'cidadeonline');

  define('INCLUDE_PATH', HOME . DIRECTORY_SEPARATOR . 'themes' . DIRECTORY_SEPARATOR . THEME);
  define('REQUIRE_PATH', 'themes' . DIRECTORY_SEPARATOR . THEME);
 */

// AUTO LOAD DE CLASSES ####################
function __autoload($Class) {
    
    $root = str_replace("/", DIRECTORY_SEPARATOR, dirname($_SERVER['DOCUMENT_ROOT'].'/prototipos/ORNAMENTUM/'));
    //$root = 'D:\JOHNNY\LOCALHOST\wamp\www\prototipos\ornamentum\';
    $ClassExtension = ($Class . ".class.php");

    /*     * Faz uma listagem de diretórios diretórios.
     * 
     * A seguir é feita um verificação em todos os caminhos (arquivos) para
     * confirmar se existe o nome da classe chamada em algum deles.
     * 
     * 
     * 
     * Se for achado a string da $ClassExtension no $file (caminho), será
     * chamado o include_once;
     */
    
    //Server();
 
    //var_dump($root);

    $root = (isset($root) ? $root : '.'); // Coloque o caminho raiz!
    $root = ($root[strlen($root) - 1] == '\\' || $root[strlen($root) - 1] == '/') ? $root : $root . DIRECTORY_SEPARATOR;
    
    $empytfile = null;
    
    //var_dump($root);

    $car = "*";
    //$glob = glob($root.$car, GLOB_MARK);
    while (!empty(glob($root.$car, GLOB_MARK))):
        //var_dump($glob);
        if (!empty($FileClass = glob(substr_replace($root.$car, "", -1) . $ClassExtension))):
            include_once ($FileClass[0]);
            //var_dump($root . $FileClass[0]);
            $empytfile = true;
        endif;
        $car = $car . "\*";
    endwhile;

    if (!$empytfile):
        trigger_error("A Classe <b><u>{$Class}</u></b> não existe.", E_USER_ERROR);
        die;
    endif;
}

// TRATAMENTO DE TIPO DE MENSAGENS#####################
// CSS constantes :: Mensagem
define('WF_ACCEPT', 'accept');
define('WF_INFOR', 'infor');
define('WF_ALERT', 'alert');
define('WF_ERROR', 'error');

//WFMsg :: Exibe erros lançados :: Front

function WFMsg($ErrMsg, $ErrNo, $ErrDie = null) {
    // Classe de identificação para o CSS
    $IdentClassCSS = "trigger";
    $CssClass = ($ErrNo == E_USER_NOTICE ? WF_INFOR : ($ErrNo == E_USER_WARNING ? WF_ALERT : ($ErrNo == E_USER_ERROR ? WF_ERROR : $ErrNo)));
    echo "<p class={$IdentClassCSS} {$CssClass}>{$ErrMsg}<span class=\"ajax_close\"></span></p>";

    if ($ErrDie):
        die;
    endif;
}

//PHPErro :: personaliza o gatilho do PHP
function PHPMsg($ErrNo, $ErrMsg, $ErrFile, $ErrLine) {
    // Classe de identificação para o CSS
    $IdentClassCSS = "trigger";
    $CssClass = ($ErrNo == E_USER_NOTICE ? WF_INFOR : ($ErrNo == E_USER_WARNING ? WF_ALERT : ($ErrNo == E_USER_ERROR ? WF_ERROR : $ErrNo)));
    echo "<p class={$IdentClassCSS}  {$CssClass}>";
    echo "<b>Erro na Linha: #{$ErrLine} ::</b> {$ErrMsg}<br>";
    echo "<small>{$ErrFile}</small>";
    echo "<span class=\"ajax_close\"></span></p>";

    if ($ErrNo == E_USER_ERROR):
        die;
    endif;
}

set_error_handler('PHPMsg');

function Server() {
    $indicesServer = array('PHP_SELF',
        'argv',
        'argc',
        'GATEWAY_INTERFACE',
        'SERVER_ADDR',
        'SERVER_NAME',
        'SERVER_SOFTWARE',
        'SERVER_PROTOCOL',
        'REQUEST_METHOD',
        'REQUEST_TIME',
        'REQUEST_TIME_FLOAT',
        'QUERY_STRING',
        'DOCUMENT_ROOT',
        'HTTP_ACCEPT',
        'HTTP_ACCEPT_CHARSET',
        'HTTP_ACCEPT_ENCODING',
        'HTTP_ACCEPT_LANGUAGE',
        'HTTP_CONNECTION',
        'HTTP_HOST',
        'HTTP_REFERER',
        'HTTP_USER_AGENT',
        'HTTPS',
        'REMOTE_ADDR',
        'REMOTE_HOST',
        'REMOTE_PORT',
        'REMOTE_USER',
        'REDIRECT_REMOTE_USER',
        'SCRIPT_FILENAME',
        'SERVER_ADMIN',
        'SERVER_PORT',
        'SERVER_SIGNATURE',
        'PATH_TRANSLATED',
        'SCRIPT_NAME',
        'REQUEST_URI',
        'PHP_AUTH_DIGEST',
        'PHP_AUTH_USER',
        'PHP_AUTH_PW',
        'AUTH_TYPE',
        'PATH_INFO',
        'ORIG_PATH_INFO');


    echo '<hr><pre><table cellpadding="1" style="font-size:12px;">';
    foreach ($indicesServer as $arg):
        if (isset($_SERVER[$arg])):
            echo '<tr><td>' . $arg . '</td><td>=> ' . '<font color="#cc0000">' . $_SERVER[$arg] . '</font></td></tr>';
        else:
            echo '<tr><td>' . $arg . '</td><td>=> <i>null</i></td></tr>';
        endif;
    endforeach;
    echo '</font></table><hr>';
}
