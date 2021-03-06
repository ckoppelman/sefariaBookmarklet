javascript:
(function (window, document) {
    "use strict";
	var API = "http://sefaria.org/api/",
		getAllSefariaSeforim = function () {
			return ["Kohelet", "Shir haShirim"];
		};

    window.myAlertHe = function (data) { window.alert(data.he); };
    window.myAlertEn = function (data) { window.alert(data.en); };
    function makeScriptTag(refId, lang) {
        var sefaria = document.createElement("script"),
			callbackString = "myAlertHe";
        sefaria.type = "application/javascript";

        if (lang && lang === "en") {
            callbackString = "myAlertEn";
        }
        sefaria.src = API + "texts/" + refId + "?context=0&commentary=0&callback=myAlert";
        document.body.appendChild(sefaria);
    }

    window.addEventListener("input", function (eventData) {
        var seforim = getAllSefariaSeforim(),
			i,
			regex,
			match;
        if (eventData.target.value) {
            for (i = 0; i < seforim.length; i += 1) {
                regex = new RegExp("\\[\\s*sef:\\/\\/(" + seforim[i] + "(?=.*?))(?=/(en|he))?\\]", "mig");
                while (true) {
                    match = regex.exec(eventData.target.value);
                    if (!match) {
                        break;
                    }
                    makeScriptTag(match[1], match[2]);
                }
            }
        }
    });
}(window, document));