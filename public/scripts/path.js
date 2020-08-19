(function previouspath() {
	const path = document.URL;
	const margin = "/margin";
	match = document.querySelector(".match-link");
	if (match != null) {
		match.setAttribute("href", path.replace(margin, ""));
	} else {
		document
			.querySelector(".margin-link")
			.setAttribute("href", document.URL + "/margin");
	}
})();
