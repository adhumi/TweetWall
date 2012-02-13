<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>TweetWall</title>
<script type="text/javascript" src="wall.js"></script>
<link rel="stylesheet" type="text/css" href="style.css" />
</head>
<body onload="initialisation();" onclick="hideTrends();">
	<h1>
		<a href="">TweetWall</a>
	</h1>
	<p id="presentation">Vous voulez savoir qui parle de vos sujets
		préférés sur Twitter ? C'est ici !</p>
	<div id="main">
		<form action="" name="searchForm">
			<p class="twSearch">
				<input id="twSearch" type="text" name="search" />
				<a id="getTrends" onclick="displayTrends(); return false;"></a>
			</p>
			<p>
				<input type="submit" onclick="showImages(); return false;"
					class="myButton" value="Rechercher" />
				<button onclick="clearCookie(); return false;" class="myButtonRed">Effacer</button>
			</p>
		</form>
		
		<div id="trend_block">
		</div>
		<div id="wall"></div>
		<div id="recent_searches"></div>

	</div>

	<p class="w3">
		<a href="http://validator.w3.org/check?uri=referer"><img
			src="http://www.w3.org/Icons/valid-xhtml10"
			alt="Valid XHTML 1.0 Strict" height="31" width="88" /></a>
	</p>

</body>
</html>
