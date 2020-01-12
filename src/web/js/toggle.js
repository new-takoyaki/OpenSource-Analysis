function toggleMenuElements(element) {
	document.getElementById(element).classList.toggle("collapsed");
	if (document.getElementById(element)['aria-expanded'] == "true") {
		document.getElementById(element)['aria-expanded'] = "false";
	} else {
		document.getElementById(element)['aria-expanded'] = "true";
	}
}