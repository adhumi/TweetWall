<?php
/**
 * Ce fichier est un hack pour contourner les limitations de l'API Twitter 
 * qui interdit les appels XMLHttpRequest en Cross-Domain. Il renvoie un JSON correspondant 
 * à la liste des "Trending Topics" pour la France.
 * -----> WOEID France : 23424819
 * @author Adrien Humilière
 */

$cache = 'cache/trends.html';
$expire = time() - 1200 ; // valable une heure
 
if(file_exists($cache) && filemtime($cache) > $expire) {
	readfile($cache);
} else {
    ob_start();
        
    //header ( 'Content-Type: application/json' );
	echo file_get_contents ( "https://api.twitter.com/1/trends/23424819.json" );
        
    $page = ob_get_contents();
    ob_end_clean();
        
    file_put_contents($cache, $page);
    echo $page;
}
?>