<?php
/**
 * Ce fichier est un hack pour contourner les limitations de l'API Twitter 
 * qui interdit les appels XMLHttpRequest en Cross-Domain. Il renvoie un JSON correspondant 
 * à la recherche indiquée en $_GET.
 * Gestion d'un cache avec 1 minute de mémoire, pour éviter la surcharge des requêtes sur l'API.
 * @author Adrien Humilière
 */
$cache = "cache/get_".urlencode ( $_GET ['q'] ).".html";
$expire = time() - 60 ; // valable une minute
 
if(file_exists($cache) && filemtime($cache) > $expire) {
	readfile($cache);
} else {
    ob_start();
        
	echo file_get_contents ( "http://search.twitter.com/search.json?q=" . urlencode ( $_GET ['q'] ) . "+exclude:retweets&rpp=100&result_type=recent" );
        
    $page = ob_get_contents();
    ob_end_clean();
        
    file_put_contents($cache, $page);
    echo $page;
}

?>