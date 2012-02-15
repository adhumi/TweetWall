/**
 * Cette fonction recupère le JSON correspondant à la recherche, 
 * insère les images correspondantes dans la page HTML et 
 * conserve l'historique de recherche dans un Cookie
 * @author Adrien Humilière
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
	var req;
	// Requete AJAX (multi browsers)
	try {
		// Navigateurs modernes (!)
		req = new XMLHttpRequest();
	} catch (e) {
		// Internet Explorer
		try {
			req = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				req = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				// Si rien ne marche
				alert('Erreur AJAX :\n' + e);
			}
		}
	}
	req.open("GET", "/tw/api/get.php?q=" + encodeURIComponent(val), true);
	document.getElementById('wall').innerHTML = "<p class=\"loader\"><img src=\"img/loader.gif\" alt=\"Patientez...\" /></p>";
	// On parse le JSON et on insère le code HTML qui permet d'afficher les images
	req.onreadystatechange = function() {
		if (req.readyState == 4) { 
			try {
				doc = eval('(' + req.responseText + ')');
			} catch(e) {
				alert('Erreur JSON :\n' + e);
			}
			for (var i = 0; i < doc.results.length; i++) {
				img_html += "<a href=\"https://twitter.com/#!/" + doc.results[i].from_user + "/status/" + doc.results[i].id_str + "\"><img src=" + doc.results[i].profile_image_url + " width='48' height='48' alt=\"" + doc.results[i].from_user + "\" /></a>"
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
	content += escape(search.value) ;
	for (var i=0; i < list.length && i<9; i++) {
		content += "##" + escape(list[i]);
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
 * Fonction d'initialisation appelée au chargement de la page. 
 * Met le focus sur le champ de recherche et affiche les informations contenues dans le cookie.
 * @author Adrien Humilière
 */
function initialisation () {
	document.getElementById("searchForm").search.focus();
	readCookie();
	
	// Hack pour masquer la barre d'adresse sur les navigateurs mobiles
	if (screen.width <= 699) {
		setTimeout(function() { window.scrollTo(0, 1) }, 100);
	}
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
	if(list.length != 0 && list[0] != "" && list[0] != "; __ut") {
		content += "<h2>Recherches precedentes</h2><ol>";
		for (var i=0; i < list.length && i<10; i++) {
			if (list[i] != "") {
				content += "<li><a href=\"#\" onclick=\"getSearch('" + escape(list[i]) + "')\" >" + list[i] + "</a></li>";
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
	var name = "TweetWall_RecentlySearched" ;
	var content = "";
	var expdate = new Date () ;
	expdate.setTime (expdate.getTime() - ( 10 * 24 * 60 * 60 * 1000)) ;
	document.cookie = name + "=" + content + "; expires=" + expdate.toGMTString() +";";
	document.getElementById('wall').innerHTML = "";
	readCookie();
}

/**
 * Fonction permettant de récupérer une recherche de l'historique
 * @author Adrien Humilière
 * @param valeur
 */
function getSearch (valeur) {
	document.getElementById('twSearch').value = unescape(valeur); 
	showImages(); 
}

/**
 * Fonction qui permet l'affichage des Trending Topics dans une bulle à
 * coté du champ de recherche.
 * @author Adrien Humilière
 */
function displayTrends () {
	if (document.getElementById('trend_block').innerHTML == "") {
	var trends = "<div id=\"trends\">";
	var doc;
	
	var req2;
	// Requete AJAX
	try {
		// Navigateurs modernes (!)
		req2 = new XMLHttpRequest();
	} catch (e) {
		// Internet Explorer
		try {
			req2 = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				req2 = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				// Si rien ne marche
				alert('Erreur AJAX :\n' + e);
			}
		}
	};
	req2.open("GET", "/tw/api/trends.php", true);
	//document.getElementById('trend_block').innerHTML = "<div id=\"trends\"><p class=\"loader\"><img src=\"loader.gif\" alt=\"Patientez...\" /></p></div>";
	// On parse le JSON et on insère le code HTML qui permet d'afficher les images
	req2.onreadystatechange = function() {
		if (req2.readyState == 4) { 
			try {
				doc = eval('(' + req2.responseText + ')');
			} catch(e) {
				alert('Erreur JSON :\n' + e);
			}
			for (var i = 0; i < doc[0].trends.length; i++) {
				trends += "<p><a href=\"" + doc[0].trends[i].url + "\" onclick=\"getTrend('" + doc[0].trends[i].name + "'); return false;\">"+doc[0].trends[i].name+"</a></p>";
			}
			document.getElementById('trend_block').innerHTML = trends + "</div>";
		}
	}
	req2.send(null);
	} else {
		document.getElementById('trend_block').innerHTML = "";
	}

}

/**
 * Récupération d'un TT pour recherche
 * @param chaine
 */
function getTrend(chaine) {
	getSearch(chaine);
	hideTrends();
}

/**
 * Fonction qui permet de masquer la bulle des TT
 */
function hideTrends() {
	document.getElementById('trend_block').innerHTML = "";
}