javascript:
(function(window, document) {
    var API = "http://sefaria.org/api/";
    
    myAlertHe = function (data) { alert(data.he); }; 
    myAlertEn = function (data) { alert(data.en); }; 
    function makeScriptTag(refId, lang) { 
        var sefaria = document.createElement("script"); 
        sefaria.type="application/javascript";
        var callbackString = "myAlertHe";
        if(lang && lang === "en") {
            callbackString = "myAlertEn";
        }
        sefaria.src = API + "texts/" + refId + "?context=0&commentary=0&callback=myAlert";
        document.body.appendChild(sefaria); 
    }
    var getAllSefariaSeforim = function () {
        return ["Kohelet", "Shir haShirim"];
    }
    
    window.addEventListener("input", function (eventData) { 
        var seforim = getAllSeforim();
        if(eventData.target.value) {
            for(var i = 0; i < seforim.length; i++) {
                var regex = new Regex("\\[\\s*sef:\\/\\/(" + seforim[i] + "(?=.*?))(?=/(en|he))?\\]", "mig");
                while (true) {
                    var match = regex.exec(textarea.value);
                    if (!match) {
                        break;
                    }
                    makeScriptTag(match[1], match[2]);
                }
            }
        } 
    }); 
})(window, document);