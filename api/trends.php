<?php
/**
 * Ce fichier est un hack pour contourner les limitations de l'API Twitter 
 * qui interdit les appels XMLHttpRequest en Cross-Domain. Il renvoie un JSON correspondant 
 * à la liste des "Trending Topics" pour la France.
 * Gestion d'un cache avec 5 minutes de mémoire, pour éviter la surcharge des requêtes sur l'API.
 * -----> WOEID France : 23424819
 * @author Adrien Humilière
 */

$cache = 'cache/trends.html';
$expire = time () - 300; // valable 5 minutes

if (file_exists ( $cache ) && filemtime ( $cache ) > $expire) {
	readfile ( $cache );
} else {
	ob_start ();
	
	// header ( 'Content-Type: application/json' );
	echo file_get_contents ( "https://api.twitter.com/1/trends/23424819.json" );
	
	$page = ob_get_contents ();
	ob_end_clean ();
	
	// On vérifie si le résultat est bien au format json
	// (Ce n'est pas le cas si il y a un probleme avec l'API)
	json_decode ( $page );
	if (json_last_error () == JSON_ERROR_NONE) {
		file_put_contents ( $cache, $page );
		echo $page;
	} else {
		readfile ( $cache );
	}
}
?>