var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );

if(iOS){
	var link = document.createElement("link");
	link.href = "/css/ios.css";
	link.type = "text/css";
	link.rel = "stylesheet";
	document.getElementsByTagName("head")[0].appendChild(link);
}