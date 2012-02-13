<?php
/**
 * Ce fichier est un hack pour contourner les limitations de l'API Twitter 
 * qui interdit les appels XMLHttpRequest en Cross-Domain. Il renvoie un JSON correspondant 
 * à la recherche indiquée en $_GET.
 * @author Adrien Humilière
 */
header ( 'Content-Type: application/json' );
echo file_get_contents ( "http://search.twitter.com/search.json?q=" . urlencode ( $_GET ['q'] ) . "+exclude:retweets&rpp=100&result_type=recent" );
?>