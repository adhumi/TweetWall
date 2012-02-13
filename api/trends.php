<?php
/**
 * Ce fichier est un hack pour contourner les limitations de l'API Twitter 
 * qui interdit les appels XMLHttpRequest en Cross-Domain. Il renvoie un JSON correspondant 
 * à la liste des "Trending Topics" pour la France.
 * @author Adrien Humilière
 */
header ( 'Content-Type: application/json' );
echo file_get_contents ( "https://api.twitter.com/1/trends/23424819.json" );
?>

<?php // WOEID France : 23424819 ?>