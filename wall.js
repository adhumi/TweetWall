/**
 * Cette fonction recupère le JSON correspondant à la recherche, 
 * insère les images correspondantes dans la page HTML et 
 * conserve l'historique de recherche dans un Cookie
 * @returns {Boolean}
 */
function showImages() {			
	// Récupération du mot-clé à rechercher
	var search = document.getElementById('twSearch');
	
	// On vérifie que la recherche est valide 
	if (search.value == "") {
		alert("Veuillez indiquer une recherche");
		return false;
	} 
	var val = search.value;
	
	// Initialisation des variables
	var img_html = "";
	var doc;
	
	// Requete AJAX
	var req = new XMLHttpRequest();
	req.open("GET", "/tw/get.php?q=" + val.replace(" ", "%20"), true);
	document.getElementById('wall').innerHTML = "<p class=\"loader\"><img src=\"loader.gif\" alt=\"Patientez...\" /></p>";
	// On parse le JSON et on insère le code HTML qui permet d'afficher les images
	req.onreadystatechange = function() {
		if (req.readyState == 4) { 
			doc = eval('(' + req.responseText + ')');
			for (var i = 0; i < doc.results.length; i++) {
				img_html += "<a href=\"https://twitter.com/#!/" + doc.results[i].from_user + "\"><img src=" + doc.results[i].profile_image_url + " width='48' height='48' alt=\"" + doc.results[i].from_user + "\" /></a>"
			}
			if (img_html == "") {
				img_html = "Aucun résultat"
			}
			document.getElementById('wall').innerHTML = img_html;
		}
	}
	req.send(null);

	//Nom du Cookie
	var name = "TweetWall_RecentlySearched" ;
	
	// Récupération de la valeur actuelle du cookie
	var value = getCookieVal(name);
	var list = value.split("##");
	
	// Génération du nouveau contenu du cookie
	var content = "";
	content += search.value ;
	for (var i=0; i < list.length && i<9; i++) {
		content += "##" + list[i];
	}

	// Mise à jour du cookie
	var expdate = new Date () ;
	expdate.setTime (expdate.getTime() + ( 10 * 24 * 60 * 60 * 1000)) ;
	document.cookie = name + "=" + content + "; expires=" + expdate.toGMTString() +";";

	// Affichage du contenu du cookie sur la page
	readCookie();
	return true;
}
/**
 * Fonction qui permet la récupération de la valeur d'un cookie à partir de son nom
 * @author Adrien Humilière
 * @param offset
 * @returns
 */
function getCookieVal (offset) {
	var endstr = document.cookie.indexOf (";", offset);
	if (endstr == -1) { endstr = document.cookie.length; }
	var index = document.cookie.indexOf(offset);
	return unescape(document.cookie.substring(index + offset.length + 1, endstr));
}

/**
 * Fonction qui permet l'affichage du contenu du cookie sous forme de tableau dans le div#recent_searches
 * @author Adrien Humilière
 */
function readCookie () {
	var value = getCookieVal("TweetWall_RecentlySearched");
	var list = value.split("##");
	var content = "";

	if(list.length != 0 && list[0] != "") {
		content += "<h2>Recherches precedentes</h2><ol>";
		for (var i=0; i < list.length && i<10; i++) {
			if (list[i] != "") {
				content += "<li><a href=\"#\" onclick=\"getHistorique('" + list[i] + "')\" >" + list[i] + "</a></li>";
			}
		}
		content += "</ol>";
	}	
	document.getElementById('recent_searches').innerHTML = content;
}

/**
 * Fonction qui permet de supprimer le Cookie
 * @author Adrien Humilière
 */
function clearCookie() {
	document.getElementById('wall').innerHTML = "";
	var name = "TweetWall_RecentlySearched" ;
	var content = "";
	var expdate = new Date () ;
	expdate.setTime (expdate.getTime() - ( 10 * 24 * 60 * 60 * 1000)) ;
	document.cookie = name + "=" + content + "; expires=" + expdate.toGMTString() +";";
	readCookie();
	
}

/**
 * Fonction permettant de récupérer une recherche de l'historique
 * @param valeur
 */
function getHistorique (valeur) {
	document.getElementById('twSearch').value = valeur; 
	showImages(); 
}