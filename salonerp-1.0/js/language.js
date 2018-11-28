var language = new Object();

function loadLanguage(lang){
	$.post("backend.php", {
		what: "language",
		language: lang
	}, 
	function(data) {
		language = data;
                for(word in language){
			var elements = document.getElementsByClassName("language_" + word);
			for(var i = 0; i < elements.length; i++){
				elements[i].innerHTML = language[word];
			}
		}
		nav.locale = language.calendarLocale;
		dp.locale = language.calendarLocale;
		nav.update();
		updateCalendar();
	});
}
