<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>TweetWall</title>
<script type="text/javascript" src="wall.js"></script>
<link rel="stylesheet" media="screen" href="style.css" />
<link rel="shortcut icon" href="favicon.ico" />

<!-- Infos spéciales pour navigateus mobiles -->
<link rel="stylesheet"
	media="handheld, only screen and (max-device-width: 640px)"
	href="mobile.css" />
<meta name="viewport" content="width=device-width" />
<meta name="viewport" content="initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" />
<link rel="apple-touch-icon-precomposed" href="img/icon-touch.png"/>

</head>
<body onload="initialisation();" onclick="hideTrends();">
	<h1>
		<a href="">TweetWall</a>
	</h1>
	<p id="presentation">Vous voulez voir qui parle de vos sujets préférés sur Twitter ? C'est ici !</p>
	<div id="main">
		<form action="" id="searchForm">
			<p class="twSearch">
				<input id="twSearch" type="text" name="search" /> <a id="getTrends"
					onclick="displayTrends(); return false;"></a>
			</p>
			<p>
				<input type="submit" onclick="showImages(); return false;"
					class="myButton" value="Rechercher" />
				<button onclick="clearCookie(); return false;" class="myButtonRed">Effacer</button>
			</p>
		</form>

		<div id="trend_block"></div>
		<div id="wall"></div>
		<div id="recent_searches"></div>

	</div>
	
	<p class="w3">
		<a href="http://validator.w3.org/check?uri=referer"><img
			src="http://www.w3.org/Icons/valid-xhtml10"
			alt="Valid XHTML 1.0 Strict" height="31" width="88" /></a>
	</p>
	<!--<p class="github">Dev par <a href="http://www.adhumi.fr">adhumi</a> | <a href="https://github.com/adhumi/TweetWall">Code</a></p>-->

</body>
</html>
