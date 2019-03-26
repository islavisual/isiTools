this.it = {
	name: "isiTools",
	version: 1.0,
	author: "Pablo E. Fernández (islavisual@gmail.com)",
	copyright: "2017-2019 Islavisual",
	lastupdate: "14/03/2019",
}

/**
	 AddCSSRule functionality																		
	 @version: 1.00																					
	 @author: Pablo E. Fernández (islavisual@gmail.com).												
	 @Copyright 2017-2019 Islavisual. 																	
	 @Last update: 13/03/2019																			
 **/

this.AddCSSRule = it.AddCSSRule = function (cfg, selector, styles, index) {
	var s, r;

	if ((typeof cfg == "string" && cfg == "help") || cfg.hasOwnProperty("help")) {
		if (typeof showHelper != "undefined") showHelper("AddCSSRule", cfg);
		else alert("Helper not available!")
		return;
	}

	var sheet = cfg;

	// Get style sheet
	if (sheet == null || sheet == "") {
		if (document.querySelector("style[title=isiTools]") == null) {
			var style = document.createElement("style");
			style.setAttribute("title", "isiTools");
			style.setAttribute("media", "screen");
			style.appendChild(document.createTextNode(""));

			// Add style tag to head
			document.head.insertBefore(style, document.head.firstChild);
			s = document.styleSheets[0];
		} else {
			for (var x = 0; x < document.styleSheets.length; x++) {
				if (document.styleSheets[x].title == "isiTools") { s = document.styleSheets[x]; break; }
			}
		}
	} else {
		if (typeof sheet == "number") s = document.styleSheets[sheet];
		else if (typeof sheet == "object") s = sheet;
		else console.log("sheet not avilable!")
	}

	// Get rule
	try { var rText = s.cssRules || s.rules; } catch (ex) { }

	for (var i = rText.length - 1; i >= 0; i--) {
		r = rText[i];
		if (r.selectorText.trim() == selector.trim()) {
			s.deleteRule(i);
			break;
		}
	}

	// Insert rule
	if ("insertRule" in s) {
		s.insertRule(selector + "{" + styles + "}", index);
	}
	else if ("addRule" in s) {
		s.addRule(selector, styles, index);
	}
}

/**
	 Custom alerts functionality
	 @version: 1.00
	 @author: Pablo E. Fernández (islavisual@gmail.com).
	 @Copyright 2017-2019 Islavisual.
	 @Last update: 12/03/2019
 **/

this.Alert = it.Alert = function (cfg) {
	if ((typeof cfg == "string" && cfg == "help") || cfg.hasOwnProperty("help")) {
		if (typeof showHelper != "undefined") showHelper("Alert", cfg);
		else alert("Helper not available!")
		return;
	}

	// Hack for only string
	if (typeof cfg == "string") {
		cfg = { title: window.location.hostname + ' says:', body: cfg };
	}

	// If configuration object is invalid
	if (!cfg.hasOwnProperty('body')) { alert("The 'body' parameter has not been supplied!.\nPlease, see the help with the Alert('help');"); return; }

	// Default Styles
	var defaultStyles;
	var defaultStylesDark = {
		title: { background: '#000', color: '#e0e0e0', extra: '' },
		body: { background: '#2f2f2f', color: '#fff', extra: '' },
		actions: {
			accept: { background: '#467bfe', color: '#fff', extra: '' },
			cancel: { background: 'rgba(0,0,0,0)', color: '#000', extra: '' }
		}
	};

	var defaultStylesLight = {
		title: { background: '#f0f0f0', color: '#2f2f2f', extra: '' },
		body: { background: '#fff', color: '#000', extra: '' },
		actions: {
			accept: { background: '#e0e0e0', color: '#000', extra: '' },
			cancel: { background: 'rgba(0,0,0,0)', color: '#000', extra: '' }
		}
	};

	// Default Actions
	var defaultActions = {
		accept: { enabled: true, text: 'Accept', class: 'btn-accept', alignment: 'right', callback: null },
		cancel: { enabled: false, text: 'Cancel', class: 'btn-cancel', alignment: 'left', callback: null }
	}

	// Create JSON with current opt
	var opt = {
		class: !cfg.hasOwnProperty('class') ? '' : cfg.class,
		title: !cfg.hasOwnProperty('title') ? '' : cfg.title,
		theme: !cfg.hasOwnProperty('theme') ? 'light' : cfg.theme,
		actions: !cfg.hasOwnProperty('actions') ? defaultActions : cfg.actions,
		body: !cfg.hasOwnProperty('body') ? "This is example!" : cfg.body,
		styles: !cfg.hasOwnProperty('styles') ? defaultStylesLight : cfg.styles,
	}

	// Set theme
	if (opt.theme == "dark") opt.styles = defaultStylesDark;
	if (opt.theme == "dark") defaultStyles = defaultStylesDark; else defaultStyles = defaultStylesLight;

	// Set individual actions by default
	if (!opt.actions.hasOwnProperty('accept')) {
		opt.actions.accept = defaultActions.accept;
	} else {
		if (!opt.actions.accept.hasOwnProperty('enabled')) opt.actions.accept.enabled = defaultActions.accept.enabled;
		if (!opt.actions.accept.hasOwnProperty('text')) opt.actions.accept.text = defaultActions.accept.text;
		if (!opt.actions.accept.hasOwnProperty('class')) opt.actions.accept.class = defaultActions.accept.class;
		if (!opt.actions.accept.hasOwnProperty('alignment')) opt.actions.accept.alignment = defaultActions.accept.alignment;
		if (!opt.actions.accept.hasOwnProperty('callback')) opt.actions.accept.callback = defaultActions.accept.callback;
	}
	if (!opt.actions.hasOwnProperty('cancel')) {
		opt.actions.cancel = defaultActions.cancel;
	} else {
		if (!opt.actions.cancel.hasOwnProperty('enabled')) opt.actions.cancel.enabled = defaultActions.cancel.enabled;
		if (!opt.actions.cancel.hasOwnProperty('text')) opt.actions.cancel.text = defaultActions.cancel.text;
		if (!opt.actions.cancel.hasOwnProperty('class')) opt.actions.cancel.class = defaultActions.cancel.class;
		if (!opt.actions.cancel.hasOwnProperty('alignment')) opt.actions.cancel.alignment = defaultActions.cancel.alignment;
		if (!opt.actions.cancel.hasOwnProperty('callback')) opt.actions.cancel.callback = defaultActions.cancel.callback;
	}

	// Set individual styles by default
	if (!opt.styles.hasOwnProperty('title')) {
		opt.styles.title = defaultStyles.title;
	} else {
		if (!opt.styles.title.hasOwnProperty('background')) opt.styles.title.background = defaultStyles.title.background;
		if (!opt.styles.title.hasOwnProperty('color')) opt.styles.title.color = defaultStyles.title.color;
		if (!opt.styles.title.hasOwnProperty('extra')) opt.styles.title.extra = defaultStyles.title.extra;
	}
	if (!opt.styles.hasOwnProperty('body')) {
		opt.styles.body = defaultStyles.body;
	} else {
		if (!opt.styles.body.hasOwnProperty('background')) opt.styles.body.background = defaultStyles.body.background;
		if (!opt.styles.body.hasOwnProperty('color')) opt.styles.body.color = defaultStyles.body.color;
		if (!opt.styles.body.hasOwnProperty('extra')) opt.styles.body.extra = defaultStyles.body.extra;
	}
	if (!opt.styles.hasOwnProperty('actions')) {
		opt.styles.actions = defaultStyles.actions;
	} else {
		if (!opt.styles.actions.hasOwnProperty('accept')) {
			opt.styles.actions.accept = defaultStyles.actions.accept;
		} else {
			if (!opt.styles.actions.accept.hasOwnProperty('background')) opt.styles.actions.accept.background = defaultStyles.actions.accept.background;
			if (!opt.styles.actions.accept.hasOwnProperty('color')) opt.styles.actions.accept.color = defaultStyles.actions.accept.color;
			if (!opt.styles.actions.accept.hasOwnProperty('extra')) opt.styles.actions.accept.extra = defaultStyles.actions.accept.extra;
		}
		if (!opt.styles.actions.hasOwnProperty('cancel')) {
			opt.styles.actions.cancel = defaultStyles.actions.cancel;
		} else {
			if (!opt.styles.actions.cancel.hasOwnProperty('background')) opt.styles.actions.cancel.background = defaultStyles.actions.cancel.background;
			if (!opt.styles.actions.cancel.hasOwnProperty('color')) opt.styles.actions.cancel.color = defaultStyles.actions.cancel.color;
			if (!opt.styles.actions.cancel.hasOwnProperty('extra')) opt.styles.actions.cancel.extra = defaultStyles.actions.cancel.extra;
		}
	}

	var tmpl = '<div class="Alert ' + opt.class + '">\
			<header>\
	 			<h3>__TITLE__</h3>\
	 			<i class="close-btn">X</i>\
 			</header>\
 			<div class="Alert-body">\
	 			<p> __DATA__ </p>\
 			</div>\
 			<footer>\
				__ACCEPT__\
				__CANCEL__\
 			</footer>\
		</div>';

	function render() {
		var aux = tmpl.replace("__TITLE__", opt.title)
			.replace("__DATA__", opt.body)
			.replace("__ACCEPT__", opt.actions.accept.enabled ? ('<button class="' + opt.actions.accept.class + '" ' + (opt.actions.accept.alignment == "" ? '' : (opt.actions.accept.alignment == "left" ? 'style="float: left;"' : 'style="float: right;"')) + '>' + opt.actions.accept.text + '</button>') : '')
			.replace("__CANCEL__", opt.actions.cancel.enabled ? ('<button class="' + opt.actions.cancel.class + '" ' + (opt.actions.cancel.alignment == "" ? '' : (opt.actions.cancel.alignment == "left" ? 'style="float: left;"' : 'style="float: right;"')) + '>' + opt.actions.cancel.text + '</button>') : '')
			.replace(/\n/g, '<br/>');

		var a = document.createElement("div");
			a.setAttribute("class", "Alert-overlay");
			a.innerHTML = aux;

		document.body.appendChild(a);
	}

	function closeAlert(e) {
		e.target.parentElement.parentElement.parentElement.remove();
	}

	function assignEvents() {
		document.querySelector(".Alert .close-btn").addEventListener("click", function (e) {
			if (opt.actions.cancel.callback) opt.actions.cancel.callback("cancel");
			closeAlert(e);
		});

		if (opt.actions.accept.enabled) {
			document.querySelector(".Alert footer ." + opt.actions.accept.class.replace(/\s/g, '.')).addEventListener("click", function (e) {
				if (opt.actions.accept.callback) opt.actions.accept.callback("accept");
				closeAlert(e);
			});
		}

		if (opt.actions.cancel.enabled) {
			document.querySelector(".Alert footer ." + opt.actions.cancel.class.replace(/\s/g, '.')).addEventListener("click", function (e) {
				if (opt.actions.cancel.callback) opt.actions.cancel.callback("cancel");
				closeAlert(e);
			});
		}
	}

	function init() {

		if(typeof it.AddCSSRule != "undefined"){
			AddCSSRule('', ".Alert-overlay", 'position: fixed; background: rgba(0,0,0,0.40); width: 100%; height: 100%; left: 0; top: 0; display: block; z-index: 999999');
			AddCSSRule('', ".Alert", 'max-width: 360px; margin: 100px auto 0; background-color: ' + opt.styles.body.background + '; overflow: hidden; color: ' + opt.styles.body.color + ';');
			AddCSSRule('', ".Alert header", 'padding: 10px 8px; background-color: ' + opt.styles.title.background + '; border-bottom: 1px solid rgba(0,0,0,0.1); color: ' + opt.styles.title.color + '; ' + opt.styles.title.extra);
			AddCSSRule('', ".Alert header h3", 'font-size: 14px; margin: 0; color: ' + opt.styles.title.color + '; display: inline-block');
			AddCSSRule('', ".Alert header i", 'float: right; color: ' + opt.styles.title.color + '; cursor: pointer; padding: 0 2px;');
			AddCSSRule('', ".Alert .Alert-body", 'background-color: ' + opt.styles.body.background + '; color: ' + opt.styles.body.color + '; display: inline-block; width: 100%; padding: 10px; min-height: 100px; font-weight: 600; ' + opt.styles.body.extra);
			AddCSSRule('', ".Alert footer", 'position: relative; top: 5px; padding: 10px 10px 8px 10px; height: auto; display: inline-block; width: 100%; margin: 0;');
			AddCSSRule('', ".Alert ." + opt.actions.accept.class.replace(/\s/g, '.'), 'padding: 5px; border-radius: 0; background-color: ' + opt.styles.actions.accept.background + '; border: 1px solid rgba(0,0,0,0.1); color: ' + opt.styles.actions.accept.color + '; ' + opt.styles.actions.accept.extra);
			AddCSSRule('', ".Alert ." + opt.actions.cancel.class.replace(/\s/g, '.'), 'padding: 5px; border-radius: 0; background-color: ' + opt.styles.actions.cancel.background + '; border: 1px solid rgba(0,0,0,0.1); color: ' + opt.styles.actions.cancel.color + '; ' + opt.styles.actions.cancel.extra);
		}

		try { document.querySelector(".Alert-overlay").remove(); } catch (e) { }

		render();

		assignEvents();
	}

	init();
};

/**
	 Autocomplete functionality
	 @version: 1.00
	 @author: Pablo E. Fernández (islavisual@gmail.com).
	 @Copyright 2017-2019 Islavisual.
	 @Last update: 26/02/2019
 **/

/* **************************************** */
/* Autocomplete Array and JSON examples 		*/
/* **************************************** */
var medicinesList = ["ATP (Adenosina Triposfato)", "Acetilcisteína", "Acetilsalicicato de Lisina", "Adrenalina", "Amiodarona", "Atropina", "Bicarbonato Sódico", "Butilbromuro de Hioscina", "Cloruro Potásico", "Dexametasona", "Dexclorferinamina", "Dexketoprofeno", "Diazepam", "Difenilhidantiína", "Dobutamina", "Dopamina", "Edrofonio", "Enalaprilato", "Esmolol (Clorhidrato)", "Etomidato", "Fentanilo", "Flecainida (Acetato de)", "Flumazenilo", "Furosemida", "Glucagón", "Glucobionato de Calcio", "Glucosa", "Haloperidol", "Hidrocortisona", "Ibuprofeno", "Insulina Rápida", "Isoprotenerol", "Ketorolaco", "Lidocaina", "Manitol", "Meperidina", "Metamizol Magnésico", "Metilprednisolona", "Metoclopramida", "Mivacurio (Cloruro de)", "Morfina", "Naloxona", "Neostigmina", "Nimodipino", "Nitroglicerina", "Nitropusiato Sódico", "Noradrenalina", "Omeprazol", "Propacetamol", "Propafenona", "Propofol", "Ranitidina", "Rocuronio (Bromuro de)", "Salbutamol", "Somatostatina", "Succinilcolina", "Sulfato de Magnesio", "Tiapride", "Tramadol (Clorhidrato)", "Valproato Sódico", "Verapamilo"];
var relationShipList = ["Padre", "Madre", "Cónyuge", "Hermano", "Tío", "Sobrino", "Abuelo", "Bisabuelo", "Tatarabuelo", "Otros"];
var countriesJSON = [{ id: 1, country: "Afghanistan", code: "AFG", capital: "Kabul" }, { id: 2, country: "Albania", code: "ALB", capital: "Tirane" }, { id: 3, country: "Algeria", code: "DZA", capital: "Algiers" }, { id: 4, country: "Andorra", code: "AND", capital: "Andorra la Vella" }, { id: 5, country: "Angola", code: "AGO", capital: "Luanda" }, { id: 6, country: "Antigua and Barbuda", code: "ATG", capital: "Saint John" }, { id: 7, country: "Argentina", code: "ARG", capital: "Buenos Aires" }, { id: 8, country: "Armenia", code: "ARM", capital: "Yerevan" }, { id: 9, country: "Australia", code: "AUS", capital: "Canberra" }, { id: 10, country: "Austria", code: "AUT", capital: "Vienna" }, { id: 11, country: "Azerbaijan", code: "AZE", capital: "Baku" }, { id: 12, country: "The Bahamas", code: "THA", capital: "Nassau" }, { id: 13, country: "Bahrain", code: "BHR", capital: "Manama" }, { id: 14, country: "Bangladesh", code: "BGD", capital: "Dhaka" }, { id: 15, country: "Barbados", code: "BRB", capital: "Bridgetown" }, { id: 16, country: "Belarus", code: "BLR", capital: "Minsk" }, { id: 17, country: "Belgium", code: "BEL", capital: "Brussels" }, { id: 18, country: "Belize", code: "BLZ", capital: "Belmopan" }, { id: 19, country: "Benin", code: "BEN", capital: "Porto-Novo" }, { id: 20, country: "Bhutan", code: "BTN", capital: "Thimphu" }, { id: 21, country: "Bolivia", code: "BOL", capital: "Sucre" }, { id: 22, country: "Bosnia and Herzegovina", code: "BOL", capital: "Sarajevo" }, { id: 23, country: "Botswana", code: "BWA", capital: "Gaborone" }, { id: 24, country: "Brazil", code: "BRA", capital: "Brasilia" }, { id: 25, country: "Brunei", code: "IOT", capital: "Bandar Seri Begawan" }, { id: 26, country: "Bulgaria", code: "BGR", capital: "Sofia" }, { id: 27, country: "Burkina Faso", code: "BFA", capital: "Ouagadougou" }, { id: 28, country: "Burundi", code: "BDI", capital: "Bujumbura" }, { id: 29, country: "Cambodia", code: "KHM", capital: "Phnom Penh" }, { id: 30, country: "Cameroon", code: "CMR", capital: "Yaounde" }, { id: 31, country: "Canada", code: "CAN", capital: "Ottawa" }, { id: 32, country: "Cape Verde", code: "CPV", capital: "Praia" }, { id: 33, country: "Central African Republic", code: "CAF", capital: "Bangui" }, { id: 34, country: "Chad", code: "TCD", capital: "NDjamena" }, { id: 35, country: "Chile", code: "CHL", capital: "Santiago" }, { id: 36, country: "China", code: "CHN", capital: "Beijing" }, { id: 37, country: "Colombia", code: "COL", capital: "Bogota" }, { id: 38, country: "Comoros", code: "COM", capital: "Moroni" }, { id: 39, country: "Congo, Republic of the", code: "COG", capital: "Brazzaville" }, { id: 40, country: "Congo, Democratic Republic of the", code: "COG", capital: "Kinshasa" }, { id: 41, country: "Costa Rica", code: "CRI", capital: "San Jose" }, { id: 42, country: "Cote d’Ivoire", code: "CRI", capital: "Yamoussoukro" }, { id: 43, country: "Croatia", code: "CIV", capital: "Zagreb" }, { id: 44, country: "Cuba", code: "CUB", capital: "Havana" }, { id: 45, country: "Cyprus", code: "CYP", capital: "Nicosia" }, { id: 46, country: "Czech Republic", code: "CZE", capital: "Prague" }, { id: 47, country: "Denmark", code: "DNK", capital: "Copenhagen" }, { id: 48, country: "Djibouti", code: "DJI", capital: "Djibouti" }, { id: 49, country: "Dominica", code: "DMA", capital: "Roseau" }, { id: 50, country: "Dominican Republic", code: "DOM", capital: "Santo Domingo" }, { id: 51, country: "East Timor (Timor-Leste)", code: "TMP", capital: "Dili" }, { id: 52, country: "Ecuador", code: "ECU", capital: "Quito" }, { id: 53, country: "Egypt", code: "EGY", capital: "Cairo" }, { id: 54, country: "El Salvador", code: "SLV", capital: "San Salvador" }, { id: 55, country: "Equatorial Guinea", code: "GNQ", capital: "Malabo" }, { id: 56, country: "Eritrea", code: "ERI", capital: "Asmara" }, { id: 57, country: "Estonia", code: "EST", capital: "Tallinn" }, { id: 58, country: "Ethiopia", code: "ETH ", capital: "Addis Ababa" }, { id: 59, country: "Fiji", code: "FJI", capital: "Suva" }, { id: 60, country: "Finland", code: "FIN", capital: "Helsinki" }, { id: 61, country: "France", code: "FRA", capital: "Paris" }, { id: 62, country: "Gabon", code: "GAB", capital: "Libreville" }, { id: 63, country: "The Gambia", code: "THA", capital: "Banjul" }, { id: 64, country: "Georgia", code: "GEO", capital: "Tbilisi" }, { id: 65, country: "Germany", code: "DEU", capital: "Berlin" }, { id: 66, country: "Ghana", code: "GHA", capital: "Accra" }, { id: 67, country: "Greece", code: "GRC", capital: "Athens" }, { id: 68, country: "Grenada", code: "GRD", capital: "Saint George" }, { id: 69, country: "Guatemala", code: "GTM", capital: "Guatemala City" }, { id: 70, country: "Guinea", code: "GIN", capital: "Conakry" }, { id: 71, country: "Guinea-Bissau", code: "GNB", capital: "Bissau" }, { id: 72, country: "Guyana", code: "GUY", capital: "Georgetown" }, { id: 73, country: "Haiti", code: "HTI", capital: "Port-au-Prince" }, { id: 74, country: "Honduras", code: "HND", capital: "Tegucigalpa" }, { id: 75, country: "Hungary", code: "HUN", capital: "Budapest" }, { id: 76, country: "Iceland", code: "ISL", capital: "Reykjavik" }, { id: 77, country: "India", code: "IND", capital: "New Delhi" }, { id: 78, country: "Indonesia", code: "IDN", capital: "Jakarta" }, { id: 79, country: "Iran", code: "IDN", capital: "Tehran" }, { id: 80, country: "Iraq", code: "IRQ", capital: "Baghdad" }, { id: 81, country: "Ireland", code: "IRL", capital: "Dublin" }, { id: 82, country: "Israel", code: "ISR", capital: "Jerusalem" }, { id: 83, country: "Italy", code: "ITA", capital: "Rome" }, { id: 84, country: "Jamaica", code: "JAM", capital: "Kingston" }, { id: 85, country: "Japan", code: "JPN", capital: "Tokyo" }, { id: 86, country: "Jordan", code: "JOR", capital: "Amman" }, { id: 87, country: "Kazakhstan", code: "KAZ", capital: "Astana" }, { id: 88, country: "Kenya", code: "KEN", capital: "Nairobi" }, { id: 89, country: "Kiribati", code: "KIR", capital: "Tarawa Atoll" }, { id: 90, country: "Korea, North", code: "PRK", capital: "Pyongyang" }, { id: 91, country: "Korea, South", code: "KOR", capital: "Seoul" }, { id: 92, country: "Kosovo", code: "KOR", capital: "Pristina" }, { id: 93, country: "Kuwait", code: "KWT", capital: "Kuwait City" }, { id: 94, country: "Kyrgyzstan", code: "KGZ", capital: "Bishkek" }, { id: 95, country: "Laos", code: "KGZ", capital: "Vientiane" }, { id: 96, country: "Latvia", code: "LVA", capital: "Riga" }, { id: 97, country: "Lebanon", code: "LBN", capital: "Beirut" }, { id: 98, country: "Lesotho", code: "LSO", capital: "Maseru" }, { id: 99, country: "Liberia", code: "LBR", capital: "Monrovia" }, { id: 100, country: "Libya", code: "LBR", capital: "Tripoli" }, { id: 101, country: "Liechtenstein", code: "LIE", capital: "Vaduz" }, { id: 102, country: "Lithuania", code: "LTU", capital: "Vilnius" }, { id: 103, country: "Luxembourg", code: "LUX", capital: "Luxembourg" }, { id: 104, country: "Macedonia", code: "MKD", capital: "Skopje" }, { id: 105, country: "Madagascar", code: "MDG", capital: "Antananarivo" }, { id: 106, country: "Malawi", code: "MWI", capital: "Lilongwe" }, { id: 107, country: "Malaysia", code: "MYS", capital: "Kuala Lumpur" }, { id: 108, country: "Maldives", code: "MDV", capital: "Male" }, { id: 109, country: "Mali", code: "MLI", capital: "Bamako" }, { id: 110, country: "Malta", code: "MLT", capital: "Valletta" }, { id: 111, country: "Marshall Islands", code: "MHL", capital: "Majuro" }, { id: 112, country: "Mauritania", code: "MRT", capital: "Nouakchott" }, { id: 113, country: "Mauritius", code: "MUS", capital: "Port Louis" }, { id: 114, country: "Mexico", code: "MEX", capital: "Mexico City" }, { id: 115, country: "Micronesia, Federated States of", code: "FSM", capital: "Palikir" }, { id: 116, country: "Moldova", code: "FSM", capital: "Chisinau" }, { id: 117, country: "Monaco", code: "MCO", capital: "Monaco" }, { id: 118, country: "Mongolia", code: "MNG", capital: "Ulaanbaatar" }, { id: 119, country: "Montenegro", code: "MNE", capital: "Podgorica" }, { id: 120, country: "Morocco", code: "MAR", capital: "Rabat" }, { id: 121, country: "Mozambique", code: "MOZ", capital: "Maputo" }, { id: 122, country: "Myanmar (Burma)", code: "MMR", capital: "Naypyidaw" }, { id: 123, country: "Namibia", code: "NAM", capital: "Windhoek" }, { id: 124, country: "Nauru", code: "NRU", capital: "Yaren" }, { id: 125, country: "Nepal", code: "NPL", capital: "Kathmandu" }, { id: 126, country: "Netherlands (Holland)", code: "ANT", capital: "Amsterdam" }, { id: 127, country: "New Zealand", code: "NZL", capital: "Wellington" }, { id: 128, country: "Nicaragua", code: "NIC", capital: "Managua" }, { id: 129, country: "Niger", code: "NER", capital: "Niamey" }, { id: 130, country: "Nigeria", code: "NGA", capital: "Abuja" }, { id: 131, country: "Norway", code: "NOR", capital: "Oslo" }, { id: 132, country: "Oman", code: "OMN", capital: "Muscat" }, { id: 133, country: "Pakistan", code: "PAK", capital: "Islamabad" }, { id: 134, country: "Palau", code: "PLW", capital: "Melekeok" }, { id: 135, country: "Panama", code: "PAN", capital: "Panama City" }, { id: 136, country: "Papua New Guinea", code: "PNG", capital: "Port Moresby" }, { id: 137, country: "Paraguay", code: "PRY", capital: "Asuncion" }, { id: 138, country: "Peru", code: "PER", capital: "Lima" }, { id: 139, country: "Philippines", code: "PHL", capital: "Manila" }, { id: 140, country: "Poland", code: "POL", capital: "Warsaw" }, { id: 141, country: "Portugal", code: "PRT", capital: "Lisbon" }, { id: 142, country: "Qatar", code: "QAT", capital: "Doha" }, { id: 143, country: "Romania", code: "ROM", capital: "Bucharest" }, { id: 144, country: "Russia", code: "ROM", capital: "Moscow" }, { id: 145, country: "Rwanda", code: "RWA", capital: "Kigali" }, { id: 146, country: "Saint Kitts and Nevis", code: "KNA", capital: "Basseterre" }, { id: 147, country: "Saint Lucia", code: "LCA", capital: "Castries" }, { id: 148, country: "Saint Vincent and the Grenadines", code: "VCT", capital: "Kingstown" }, { id: 149, country: "Samoa", code: "WSM", capital: "Apia" }, { id: 150, country: "San Marino", code: "SMR", capital: "San Marino" }, { id: 151, country: "Sao Tome and Principe", code: "STP", capital: "Sao Tome" }, { id: 152, country: "Saudi Arabia", code: "SAU", capital: "Riyadh" }, { id: 153, country: "Senegal", code: "SEN", capital: "Dakar" }, { id: 154, country: "Serbia", code: "SRB", capital: "Belgrade" }, { id: 155, country: "Seychelles", code: "SYC", capital: "Victoria" }, { id: 156, country: "Sierra Leone", code: "SLE", capital: "Freetown" }, { id: 157, country: "Singapore", code: "SGP", capital: "Singapore" }, { id: 158, country: "Slovakia", code: "SGP", capital: "Bratislava" }, { id: 159, country: "Slovenia", code: "SVN", capital: "Ljubljana" }, { id: 160, country: "Solomon Islands", code: "SLB", capital: "Honiara" }, { id: 161, country: "Somalia", code: "SOM", capital: "Mogadishu" }, { id: 162, country: "South Africa", code: "ZAF", capital: "Cape Town" }, { id: 163, country: "South Sudan", code: "SSD", capital: "Juba" }, { id: 164, country: "Spain", code: "ESP", capital: "Madrid" }, { id: 165, country: "Sri Lanka", code: "LKA", capital: "Colombo" }, { id: 166, country: "Sudan", code: "SDN", capital: "Khartoum" }, { id: 167, country: "Suriname", code: "SUR", capital: "Paramaribo" }, { id: 168, country: "Swaziland", code: "SWZ", capital: "Lobamba" }, { id: 169, country: "Sweden", code: "SWE", capital: "Stockholm" }, { id: 170, country: "Switzerland", code: "CHE", capital: "Bern" }, { id: 171, country: "Syria", code: "CHE", capital: "Damascus" }, { id: 172, country: "Taiwan", code: "SYR", capital: "Taipei" }, { id: 173, country: "Tajikistan", code: "TJK", capital: "Dushanbe" }, { id: 174, country: "Tanzania", code: "TJK", capital: "Dar es Salaam" }, { id: 175, country: "Thailand", code: "THA", capital: "Bangkok" }, { id: 176, country: "Togo", code: "TGO", capital: "Lome" }, { id: 177, country: "Tonga", code: "TON", capital: "Nukualofa" }, { id: 178, country: "Trinidad and Tobago", code: "TTO", capital: "Port-of-Spain" }, { id: 179, country: "Tunisia", code: "TUN", capital: "Tunis" }, { id: 180, country: "Turkey", code: "TUR", capital: "Ankara" }, { id: 181, country: "Turkmenistan", code: "TKM", capital: "Ashgabat" }, { id: 182, country: "Tuvalu", code: "TUV", capital: "Funafuti province" }, { id: 183, country: "Uganda", code: "UGA", capital: "Kampala" }, { id: 184, country: "Ukraine", code: "UKR", capital: "Kyiv" }, { id: 185, country: "United Arab Emirates", code: "ARE", capital: "Abu Dhabi" }, { id: 186, country: "United Kingdom", code: "GBR", capital: "London" }, { id: 187, country: "United States of America", code: "USA", capital: "Washington D.C." }, { id: 188, country: "Uruguay", code: "URY", capital: "Montevideo" }, { id: 189, country: "Uzbekistan", code: "UZB", capital: "Tashkent" }, { id: 190, country: "Vanuatu", code: "VUT", capital: "Port-Vila" }, { id: 191, country: "Vatican City (Holy See)", code: "VUT", capital: "Vatican City" }, { id: 192, country: "Venezuela", code: "VEN", capital: "Caracas" }, { id: 193, country: "Vietnam", code: "VNM", capital: "Hanoi" }, { id: 194, country: "Yemen", code: "YEM", capital: "Sanaa" }, { id: 195, country: "Zambia", code: "ZMB", capital: "Lusaka" }, { id: 196, country: "Zimbabwe", code: "ZMB", capital: "Harare" }];
var medicinesJSON = [{ id: 1, type: "Especialidad", code: 9724894, name: "ATP (Adenosina Triposfato)", status: "Autorizado", present: "0.25 MG 50 Comprimidos", units: 50 }, { id: 2, type: "Especialidad", code: 9724895, name: "Acetilcisteína", status: "Autorizado", present: "0.25 MG 50 Comprimidos", units: 50 }, { id: 3, type: "Especialidad", code: 9724896, name: "Acetilsalicicato de Lisina", status: "Autorizado", present: "0.25 MG 50 Comprimidos", units: 50 }, { id: 4, type: "Parafarmacia", code: 9724893, name: "Bicarbonato Sódico", status: "Anulado / Cambio código nacional por cambio de precio", present: "0.25 MG 50 Comprimidos", units: 50 }, { id: 5, type: "Parafarmacia", code: 9724892, name: "Cloruro Potásico", status: "Autorizado no comercializado", present: "0.25 MG 50 Comprimidos", units: 50 }, { id: 6, type: "Especialidad", code: 9724891, name: "Dexketoprofeno", status: "Autorizado", present: "0.25 MG 50 Comprimidos", units: 50 }, { id: 7, type: "Especialidad", code: 9724890, name: "Enalaprilato", status: "Autorizado / Autorizado no comercializado", present: "0.25 MG 50 Comprimidos", units: 50 }, { id: 8, type: "Parafarmacia", code: 9724889, name: "Fentanilo", status: "Autorizado", present: "0.25 MG 50 Comprimidos", units: 50 }, { id: 9, type: "Parafarmacia", code: 9724888, name: "Glucagón", status: "Autorizado / Autorizado no comercializado", present: "0.25 MG 50 Comprimidos", units: 50 }, { id: 10, type: "Especialidad", code: 9724887, name: "Hidrocortisona", status: "Autorizado", present: "0.25 MG 50 Comprimidos", units: 50 }, { id: 11, type: "Especialidad", code: 9724886, name: "Ibuprofeno", status: "Autorizado", present: "0.25 MG 50 Comprimidos", units: 50 }, { id: 12, type: "Especialidad", code: 9724885, name: "Insulina Rápida", status: "Autorizado", present: "0.25 MG 50 Comprimidos", units: 50 }, { id: 13, type: "Especialidad", code: 9724884, name: "Ketorolaco", status: "Autorizado", present: "0.25 MG 50 Comprimidos", units: 50 }, { id: 14, type: "Parafarmacia", code: 9724883, name: "Lidocaina", status: "Autorizado", present: "0.25 MG 50 Comprimidos", units: 50 }, { id: 15, type: "Especialidad", code: 9724882, name: "Morfina", status: "Autorizado / Autorizado no comercializado", present: "0.25 MG 50 Comprimidos", units: 50 }, { id: 16, type: "Especialidad", code: 9724881, name: "Noradrenalina", status: "Autorizado", present: "0.25 MG 50 Comprimidos", units: 50 }, { id: 17, type: "Especialidad", code: 9724880, name: "Omeprazol", status: "Autorizado", present: "0.25 MG 50 Comprimidos", units: 50 }, { id: 18, type: "Especialidad", code: 9724879, name: "Propacetamol", status: "Autorizado", present: "0.25 MG 50 Comprimidos", units: 50 }, { id: 19, type: "Parafarmacia", code: 9724878, name: "Ranitidina", status: "Autorizado", present: "0.25 MG 50 Comprimidos", units: 50 }, { id: 20, type: "Especialidad", code: 9724872, name: "Salbutamol", status: "Autorizado", present: "0.25 MG 50 Comprimidos", units: 50 }, { id: 21, type: "Especialidad", code: 9724877, name: "Succinilcolina", status: "Autorizado", present: "0.25 MG 50 Comprimidos", units: 50 }, { id: 22, type: "Especialidad", code: 9724875, name: "Triposfato", status: "Autorizado", present: "0.25 MG 50 Comprimidos", units: 50 }, { id: 23, type: "Parafarmacia", code: 9724874, name: "Verapamilo", status: "Autorizado", present: "0.25 MG 50 Comprimidos", units: 50 }, { id: 24, type: "Parafarmacia", code: 9724873, name: "Valproato", status: "Autorizado", present: "0.25 MG 50 Comprimidos", units: 50 }];
var problemsList = ["Gripe", "Alergia primaveral", "Resfriado", "Cardiovascular", "De huesos y articulaciones", "Respiratorio", "Diabetes", "Agotamiento", "Síndrome del tunel carpiano", "Enfermedad de Buerger", "Insomnio", "Sobrepeso", "Migraña", "Dolor muscular", "Disminución de la masa ósea", "Deterioro cognitivo", "Incontinencia urinaria"]
var clusterList = [
	{ group: "Problemas de salud", items: ["Arritmia Cardiaca", "Dolor de garganta", "Dolor pectoral", "Dolor muscular", "Dolor de cabeza", "Dolor intestinal", "Dolor estomacal", "Fiebre", "Resfriado"] },
	{ group: "Alergias", items: ["Dermatitis", "Gramineas", "Primaveral", "Ácaros", "Polen", "Alimentos", "Pelos animal", "Frío", "Sol", "Picadura mosquito", "Picadura abeja", "Rinitis"] },
	{ group: "Tratamientos activos", items: ["Digoxina Kern Pharma 0.25 MG 50 Comprimidos", "Paracetamol Abamed EFG 1 G 210 Comprimidos", "Diazepan 10 MG Comprimidos", "Bisolvon antitusivo 120 MG Jarabe"] }
];

this.Autocomplete = it.Autocomplete = function (cfg) {
	if(typeof cfg == "undefined") cfg = {};

	if ((typeof cfg == "string" && cfg == "help") || cfg.hasOwnProperty("help")) {
		if (typeof showHelper != "undefined") showHelper("Autocomplete", cfg);
		else alert("Helper not available!")
		return;
	}

	// Hack to old versions
	if(cfg.hasOwnProperty('input') && !cfg.hasOwnProperty('target')) cfg.target = cfg.input;

	// If configuration object is invalid
	if (!cfg.hasOwnProperty('target')) { alert("Control of data entry (target) not defined!.\nPlease, see the help with the Autocomplete('help');"); return; }
	if (!cfg.hasOwnProperty('data')) { alert("The object of possible values has not been supplied!.\nPlease, see the help with the Autocomplete('help');"); return; }
	if (cfg.format == "table" && !cfg.tableFields) { alert("A JSON Array must be specified with the fields to be displayed!.\nPlease, see the help with the Autocomplete('help');"); return; }

	if (document.getElementById(cfg.target) == null) { alert('El ID "' + cfg.target + '" provided to Autocomplete not exists!') }

	// Create JSON with current opt
	var opt = {
		autofocus: !cfg.hasOwnProperty('autofocus') ? false : cfg.autofocus,
		callback: !cfg.hasOwnProperty('callback') ? null : cfg.callback,
		className: !cfg.hasOwnProperty('className') ? "autocomplete" : cfg.className,
		currentFocus: -1,
		data: cfg.data,
		format: !cfg.hasOwnProperty('format') ? "layer" : cfg.format,
		target: document.getElementById(cfg.target),
		minLength: !cfg.hasOwnProperty('minLength') ? 3 : cfg.minLength,
		showHeaders: !cfg.hasOwnProperty('showHeaders') ? false : cfg.showHeaders,
		tableFields: cfg.tableFields
	}

	// If Autocomplete list is visible, is removed
	removeItemsList(true);

	opt.target.addEventListener("input", function (e) {
		var a, b, c, i, val = this.value.trim();

		// Only search when length is greater than 2.
		if (val.length < opt.minLength) {
			removeItemsList(false);
			return false;
		}

		// Close all lists
		closeAllLists(this);

		// Reset current focus / element selected
		opt.currentFocus = -1;

		// Reset list
		removeItemsList(false);

		// Create a DIV element that will contain the values
		a = document.createElement("div");
		a.setAttribute("id", opt.target.id + "-" + opt.className + "-list");
		a.setAttribute("class", opt.className + "-items display");
		a.classList.add(opt.format);

		// Remove list when click outside
		a.addEventListener("mouseleave", function () {
			document.body.onclick = function () {
				a.remove();
			}
		});

		opt.target.addEventListener("mouseleave", function () {
			document.body.onclick = function () {
				a.remove();
			}
		});

		this.parentNode.appendChild(a);

		// If format is table and headers parameter is enabled, add names
		if (opt.format == "table" && opt.showHeaders) {
			var thead = document.createElement("span");
			thead.setAttribute("class", "header");

			var aux = "";
			for (var z = 0; z < opt.tableFields.fields.length; z++) {
				aux += '<span style="width: ' + (100 / opt.tableFields.fields.length) + '%">' + opt.tableFields.headers[z] + "</span>";
			}
			thead.innerHTML = aux;
			a.appendChild(thead);
		}

		// Go through the data
		for (i = 0; i < opt.data.length; i++) {
			// Check if the item contains the text field value
			var cval = opt.format == "layer" ? opt.data[i] : JSON.stringify(opt.data[i]);

			if (cval.toUpperCase().indexOf(val.toUpperCase()) != -1) {
				b = document.createElement("div");
				var bc = null;

				// Highlight the matching coincidences
				if (opt.format == "layer") {
					var aux = cval.toUpperCase().split(val.toUpperCase());
					b.classList.add("value");
					b.innerHTML = aux.join();
					b.innerHTML = b.innerHTML.replace(/,/ig, '<b>' + val + '</b>').toLowerCase();

				} else if (opt.format == "table") {
					b.classList.add("value");
					b.innerHTML = '<span style="width: ' + (100 / opt.tableFields.fields.length) + '%">' + opt.data[i][opt.tableFields.fields[0]] + "</span>";

				} else if (opt.format == "cluster") {
					b.innerHTML = '<span id="clustered' + i + '">' + opt.data[i].group + "</span>";
					b.classList.add("header");
					bc = document.createElement("div");
					bc.classList.add("values");
				}

				if (opt.format == "table") cval = opt.data[i][opt.tableFields.return_value];

				if (b.classList.contains("value")) {
					b.innerHTML += "<input type='hidden' data-index='" + i + "' value='" + cval + "'>";
					b.addEventListener("click", function (e) {
						opt.target.value = this.getElementsByTagName("input")[0].value;
						if (opt.callback) opt.callback(this.getElementsByTagName("input")[0]);
						closeAllLists(this);
					});
				}

				// Add another fields at row
				if (opt.format == "table") {
					for (var f = 1; f < opt.tableFields.fields.length; f++) {
						b.innerHTML += '<span style="width: ' + (100 / opt.tableFields.fields.length) + '%">' + opt.data[i][opt.tableFields.fields[f]] + "</span>";
					}
				}

				a.appendChild(b);
				if (bc != null) a.appendChild(bc);

				// If format is cluster, add all sub-items
				if (opt.format == "cluster") {
					for (var z = 0; z < opt.data[i].items.length; z++) {
						if (opt.data[i].items[z].toUpperCase().indexOf(val.toUpperCase()) != -1) {
							b = document.createElement("div");
							b.classList.add("value");
							b.style.width = "100%";
							b.innerHTML += "<span>" + opt.data[i].items[z] + "</span>";
							b.innerHTML += "<input type='hidden' data-index='" + i + "," + z + "' value='" + opt.data[i].items[z] + "'>";
							// Add element
							bc.appendChild(b);
							// Add event on click
							b.addEventListener("click", function (e) {
								opt.target.value = this.getElementsByTagName("input")[0].value;
								if (opt.callback) opt.callback(this.getElementsByTagName("input")[0]);
								closeAllLists(this);
							});
						}
					}
				}
			}
		}
	});

	// Get Autocomplete List
	function getAutocompleteList(e) {
		var x = document.getElementById(e.id + "-" + opt.className + "-list");
		if (x) x = x.querySelectorAll("div.value");
		return x;
	}

	/* Added keyboard functions */
	opt.target.addEventListener("keydown", function (e) {
		if (e.keyCode == 40) { 			// down
			if (document.querySelectorAll("." + opt.className + "-items").length == 0) {
				var event = new Event('input', {
					'bubbles': true,
					'cancelable': true
				});

				e.target.dispatchEvent(event);
			}

			var x = getAutocompleteList(this);
			opt.currentFocus++;

			addActive(x);
			setScrollTop("down");
		} else if (e.keyCode == 38) { 	//up
			var x = getAutocompleteList(this);

			opt.currentFocus--;
			addActive(x);
			setScrollTop("up");
		} else if (e.keyCode == 13) {
			var x = getAutocompleteList(this);

			e.preventDefault();
			if (opt.currentFocus > -1) {
				if (x) x[opt.currentFocus].click();
			}
		}
	});

	if (opt.autofocus) opt.target.addEventListener("focusin", function (e) { e.target.select(); })
	opt.target.addEventListener("click", function (e) { closeAllLists(e.target); });

	function addActive(x) {
		if (!x) return false;
		removeActive(x);
		if (opt.currentFocus >= x.length) opt.currentFocus = 0;
		if (opt.currentFocus < 0) opt.currentFocus = (x.length - 1);
		x[opt.currentFocus].classList.add(opt.className + "-active");
	}

	function setScrollTop(dir) {
		// Move scroll to current position
		try {
			var active = document.querySelector('.' + opt.className + '-active'), items = document.querySelector("." + opt.className + "-items");
			if (dir == "down") {
				items.scrollTop = active.offsetTop - items.offsetHeight + active.offsetHeight + 2;
			} else if (active.offsetTop < items.scrollTop || document.querySelector('.' + opt.className + '-active:last-child').offsetTop == active.offsetTop) {
				items.scrollTop = active.offsetTop - items.offsetHeight + items.offsetHeight + 2;
			}
		} catch (e) { }
	}

	function removeActive(x) {
		for (var i = 0; i < x.length; i++) {
			x[i].classList.remove(opt.className + "-active");
		}
	}

	function closeAllLists(elmnt) {
		var x = document.getElementsByClassName(opt.className + "-items");
		for (var i = 0; i < x.length; i++) {
			if (elmnt != x[i] && elmnt != opt.target) {
				x[i].parentNode.removeChild(x[i]);
			}
		}
	}

	function removeItemsList(reset) {
		var items = opt.target.parentElement.querySelectorAll("." + opt.className + "-items");
		for (var i = 0; i < items.length; ++i) {
			var item = items[i];

			item.remove();
		}
		if (reset) opt.target.value = "";

	}
}

/**
	 Benchmark functionality
	 @version: 1.00
	 @author: Pablo E. Fernández (islavisual@gmail.com).
	 @Last update: 15/03/2019
 **/

this.Benchmark = it.Benchmark = {
	showLog: false,
	maxIterations: 0x3FFFFFFF,
	testTime: 3000,
	preTestIterations: 1000,
	results: [],
	help: function(cfg){
		if(typeof cfg == "undefined") cfg = {help: ''};
		if(!cfg.hasOwnProperty("help")) cfg.help = '';

		if (typeof showHelper != "undefined") showHelper("Benchmark", cfg);
		else alert("Helper not available!")
		return;
	},
	test: function(cfg){
		// Default parameters
		if(typeof cfg.name == "undefined"){ alert("You need to specify a name or condition\nPlease see the Benchmark.test('help');"); return; }
		if(typeof cfg.fn == "undefined"){ alert("You need to specify a function where test the name or condition!\nPlease see the Benchmark.test('help');"); return; }

		// Assign configuration obteins from parameter
		for(var key in cfg){ this[key] = cfg[key]; }

		"use strict";
		// Prepare innerloop function
		var innerLoop = eval(
			"(function(f) {" +
			"   return function innerLoop4" + this.fn.name + "(n) {" +
			"       for (var i = 0; i < n; i++) f()" +
			"   };" +
			"})")(this.fn);

		// Pre test
		var timeExcess = this.testTime * 1.1;
		var init = Date.now();
		innerLoop(this.preTestIterations, this.fn);
		var elapsed = Date.now() - init + 1;
		var iterations = 0 | Math.min(this.maxIterations, timeExcess / elapsed * 1000);

		// Test
		var checks = 0;
		var totalIterations = 0;
		init = Date.now();
		do {
			innerLoop(iterations);
			totalIterations += iterations;
			checks++;
			elapsed = Date.now() - init;
			if (elapsed >= this.testTime) break;
			iterations = 0 | Math.min(this.maxIterations, (timeExcess - elapsed) / (elapsed + 1) * totalIterations);
		} while (elapsed < this.testTime);

		// Stats
		var secs = elapsed / 1000;
		var perSecondIterations = 0 | totalIterations / secs;
		if (this.showLog) {
			console.log('Function "%s" running for %d seconds: %s checks, %s total iterations, %s iterations per second',
				this.name,
				Math.round(secs * 100) / 100,
				checks,
				totalIterations.toLocaleString(),
				perSecondIterations.toLocaleString()
			);
		}

		// Global stats
		this.results.push({
			name: this.name,
			elapsed: elapsed,
			checks: checks,
			totalIterations: totalIterations,
			perSecondIterations: perSecondIterations
		});
		this.results.sort(function (a, b) {
			return b.perSecondIterations - a.perSecondIterations;}
		);
		var max = this.results[0].perSecondIterations;
		this.results.forEach(function (a) {
			return a.diff = Math.round((max - a.perSecondIterations) / max * 10000) / 100 + "%";
		});
		
		// Options method
		Benchmark.options = function () {
			return {
				showLog: this.showLog,
				maxIterations: this.maxIterations,
				testTime: this.testTime,
				preTestIterations: this.preTestIterations
			};
		};
	},
	version: 1.0
}

/**
	 Constraint to input functionality
	 @version: 1.00
	 @author: Pablo E. Fernández (islavisual@gmail.com).
	 @Copyright 2017-2019 Islavisual.
	 @Last update: 04/03/2019
 **/
this.Constraint = it.Constraint = function (cfg) {
	if ((typeof cfg == "string" && cfg == "help") || cfg.hasOwnProperty("help")) {
		if (typeof showHelper != "undefined") showHelper("Constraint", cfg);
		else alert("Helper not available!")
		return;
	}

	if (typeof cfg == "string" && cfg == "increment") {
		var opt = this.options;
		if (opt.type == 'hour') {
			setHour(document.getElementById(opt.target), "up");
		} else {
			setNumber(document.getElementById(opt.target), "up");
		}
		return;
	} else if (typeof cfg == "string" && cfg == "decrement") {
		var opt = this.options;
		if (opt.type == 'hour') {
			setHour(document.getElementById(opt.target), "down");
		} else {
			setNumber(document.getElementById(opt.target), "down");
		}
		return;
	}

	// If configuration object is invalid
	if (!cfg.hasOwnProperty('target')) { alert("You need set an input ID into 'target' parameter!. Please, see the help with the Constraint('help');"); return false; }
	if (document.getElementById(cfg.target) == null) { alert("The element with ID '" + cfg.target + "' not exists!"); return false; }
	if (!cfg.hasOwnProperty('type')) { alert("You need set an input type!. Please, see the help with the Constraint('help');"); return false; }

	// Create JSON with current opt
	var opt = {
		target: cfg.target,
		type: cfg.type,
		step: !cfg.hasOwnProperty('step') ? 1 : parseFloat(cfg.step),
		indicators: !cfg.hasOwnProperty('indicators') ? { enabled: true, color: 'rgba(0,0,0,0.25)' } : cfg.indicators,
		ds: !cfg.hasOwnProperty('decimalpoint') ? '.' : cfg.decimalpoint,
		base: !cfg.hasOwnProperty('base') ? (cfg.type == "binary" ? 2 : (cfg.type == "hexadecimal" ? 16 : 10)) : cfg.base,
		custom: cfg.type == "custom" ? true : false,
		function: !cfg.hasOwnProperty('function') ? null : cfg.function,
	}
	if (!opt.hasOwnProperty('enabled')) opt.indicators.enabled = true;
	if (!opt.hasOwnProperty('color')) opt.indicators.color = 'rgba(0,0,0,0.25)';

	// Formats by default
	var types = {
		int: function (value) { return /^-?\d*$/.test(value); },
		uint: function (value) { return /^\d*$/.test(value); },
		float: function (value) { return new RegExp('^-?\\d*[' + opt.ds + ']?\\d*$').test(value); },
		decimal: function (value) { return new RegExp('^-?\\d*[' + opt.ds + ']?\\d{0,2}$').test(value); },
		percent: function (value) { return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 100); },
		binary: function (value) { return /^(0|1)*$/.test(value); },
		hexadecimal: function (value) { return /^[0-9a-f]*$/i.test(value); },
		hour: function (value) { return /^([0-2]{0,1}|0[0-9]|1[0-9]|2[0-3])([:]?|:[0-5]{1}[0-9]{0,1})$/.test(value); },
		custom: opt.function ? opt.function : null,
	}

	if (opt.custom && opt.function == null) alert("You must define a function. Please, see the help with the Constraint('help');");

	// Set events to input
	function assignEvents(textbox, filterFn) {
		["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
			textbox.addEventListener(event, function () {
				if (filterFn(this.value)) {
					this.oldValue = this.value;
					this.oldSelectionStart = this.selectionStart;
					this.oldSelectionEnd = this.selectionEnd;
				} else if (this.hasOwnProperty("oldValue")) {
					this.value = this.oldValue;
					this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
				}
			});
		});
	}

	// update hours / minutes from cursor position
	function setHour(e, d) {
		if (e.value.trim() == "") e.value = 0;

		var aux = e.value.split(":"), sep = e.value.indexOf(":"), sp = e.selectionStart < sep ? 0 : 5;
		var va = 0, d = d == 'down' ? -1 : 1;

		if (sep != -1 && sp < 3) {
			va = parseInt(aux[0]) + d;
			aux = (va < 10 ? ('0' + va) : va) + ":" + aux[1];
		} else if (sep != -1 && sp >= 3) {
			va = parseInt(aux[1]) + d;
			aux = aux[0] + ":" + (va < 10 ? ('0' + va) : va);
		} else if (sep == -1) {
			va = parseInt(aux) + d;
			aux = va < 10 ? ('0' + va) : va;
		}
		e.value = aux;

		setTimeout(function () { e.setSelectionRange(sp, sp); }, 10);
	}

	function setNumber(e, d) {
		if (e.value.trim() == "") e.value = 0;

		var aux = '';
		var d = (d == 'down' ? -1 : 1) * opt.step;
		var v = parseFloat(opt.ds != "." ? e.value.replace(opt.ds, ".") : e.value);
		var md = parseInt((Math.abs(d) < 1.0) ? d.toString().split(".")[1].length : 0);
		var dec = e.value.indexOf(opt.ds) != -1 ? (e.value.length - e.value.indexOf(opt.ds) - 1) : md;
		dec = dec < md ? md : dec;

		if (opt.base != 10) {
			aux = parseInt(e.value, opt.base) + d;
			e.value = aux.toString(opt.base);
		} else {
			aux = (v + d).toFixed(dec);
			e.value = opt.ds != "." ? aux.toString().replace(".", opt.ds) : aux;
		}
	}

	// Set indicators into input
	if (opt.indicators.enabled) {
		var input = document.getElementById(opt.target), iDown = document.createElement("div"), iUp = document.createElement("div");
		iDown.setAttribute("class", "caret-down");
		iDown.setAttribute("onclick", 'document[\'' + opt.target + '\'].Constraint("decrement")');
		iDown.style = 'cursor: pointer; border: 5px solid red; border-width: 5px 5px 0 5px; border-color: ' + opt.indicators.color + ' transparent transparent transparent; width: 7px; position: absolute; bottom: 0; margin: 10px; right: 15px;';
		iUp.setAttribute("class", "caret-up");
		iUp.setAttribute("onclick", 'document[\'' + opt.target + '\'].Constraint("increment")');
		iUp.style = 'cursor: pointer; border: 5px solid red; border-width: 0 5px 5px 5px; border-color: transparent transparent ' + opt.indicators.color + ' transparent; width: 7px; position: absolute; bottom: 10px; margin: 10px; right: 15px;';

		input.parentNode.insertBefore(iDown, input.nextSibling);
		input.parentNode.insertBefore(iUp, input.nextSibling);

		// Add events of increment and decrement
		input.addEventListener("keydown", function (e) {
			if (e.keyCode == 38) {
				if (opt.type == "hour") {
					setHour(e.target, 'up');
					return false;
				} else {
					setNumber(e.target, 'up');
				}


			} else if (e.keyCode == 40) {
				if (opt.type == "hour") {
					setHour(e.target, 'down');
					return false;
				} else {
					setNumber(e.target, 'down');
				}
			}

			return true;
		});
	}

	// Enable control
	assignEvents(document.getElementById(opt.target), types[opt.type]);

	document[opt.target] = {};
	document[opt.target]['options'] = opt;
	document[opt.target]['Constraint'] = Constraint;
}

/**
	 IntelliForm functionality
	 @version: 1.00
	 @author: Pablo E. Fernández (islavisual@gmail.com).
	 @Copyright 2017-2019 Islavisual.
	 @Last update: 19/03/2019
 **/

this.IntelliForm = it.IntelliForm = {
	sequenceList: [],
	sequence: [],
	undo: {},
	redo: {},
	target: [],
	_startAt: -1,
	addElements: function(cfg){
		// If configuration object is invalid
		if (!cfg.hasOwnProperty('data') && !cfg.hasOwnProperty('file')) { alert("You need set a JSON 'data' parameter!. Please, see the help with the IntelliForm.help({help: 'send'});"); return false; }
		if (!cfg.hasOwnProperty('target')) { alert("You need set an object like target to insert the lements!. Please, see the help with the IntelliForm.help({help: 'send'});"); return false; }
		
		for(var x = 0; x < cfg.data.length; x++){
			var item = cfg.data[x], aux, proccessValidation = false;
			for(var key in item){
				if(key == "tag"){
					aux = document.createElement(item[key]);
				} else{
					if(key == "dataset"){
						for(var di = 0; di < item[key].length; di++){
							aux.setAttribute("data-" + item[key][di].name, item[key][di].value);
						}
					} else {
						if(typeof item[key] == "function"){
							aux.addEventListener(item[key], item[key]);

						} else if(key == "validate") {
							proccessValidation = true;

						} else if(typeof item[key] == "object"){
							aux[key] = item[key];
						} else {
							aux.setAttribute(key, item[key]);
						}
					}
				}
			}
			
			document.body.appendChild(aux);
			if(proccessValidation){
				var params = item['validate'];
				params.target = aux.id;
				Validator.set(params);
			}
		}
	},
	autofill: function(){
		try {
			var path = this.sha1(window.location.pathname);
			var su = JSON.parse(sessionStorage.getItem('iFormUndo'));
			
			for(var key in su[path]){
				var aux = document.getElementById(key), val = su[path][key].pop();
				if(aux.getAttribute("type") == "radio" || aux.getAttribute("type") == "checkbox"){
					aux.checked = val
				} else {
					aux.value = val;
				}
			}
		} catch(e){ }
	},
	version: '1.0',
	help: function(cfg){
		if(typeof cfg == "undefined") cfg = {help: ''};
		if(!cfg.hasOwnProperty("help")) cfg.help = '';

		if (typeof showHelper != "undefined") showHelper("IntelliForm", cfg);
		else alert("Helper not available!")
		return;
	},
	setUndo: function(cfg){
		// Assign configuration obteins from parameter
		for(var key in cfg){ this[key] = cfg[key]; }

		// If targets, enable undo functionality.
		if(this.hasOwnProperty("target")){
			var und = this;

			for(var key in this.target){
				var items = document.querySelectorAll(this.target[key]);
				for(var i = 0; i < items.length; i++){
					items[i].addEventListener("keydown", function(e){
						if ( (e.which == 121 || e.which == 89) && e.ctrlKey ) {
							// Redo
							IntelliForm.historyForward(e.target.id);
							return false;
					
						} else if ( (e.which == 122 || e.which == 90) && e.ctrlKey ) {
							// Undo
							IntelliForm.historyBack(e.target.id);
							return false;
						} else {
							und.addHistoryBack(e.target.id, e.target.value);
						}
					});

					items[i].addEventListener("change", function (e) {
						if(e.target.getAttribute("type") == "radio" || e.target.getAttribute("type") == "checkbox"){
							und.addHistoryBack(e.target.id, e.target.checked);
						} else {
							und.addHistoryBack(e.target.id, e.target.value);
						}
					});
				}
			}
		} else {
			alert('You need to configure at least one object as a target to execute the "setUndo" functionality. Please, see the help with the IntelliForm.help({help: "setUndo"});');
			return false;
		}

		// Set undo session
		var sessionUndo = JSON.parse(sessionStorage.getItem('iFormUndo'));
		if(typeof sessionUndo != 'undefined' && sessionUndo != null && sessionUndo != '') this.undo = sessionUndo;
	},
	_addEvent: function(e){
		// Set values
		var iform = it.IntelliForm;
		var trg = e.target, id = trg.id, evt = e.type, tagName = trg == document ? "document" : trg.tagName.toLowerCase();
		var st  = iform._startAt == -1 ? (iform._startAt = new Date().getTime()) : iform._startAt;
		var ts  = new Date().getTime() - st;
		var val = typeof trg.value != "undefined" ? trg.value : trg.innerHTML;
			val = val == "" ? '""' : (!isNaN(val) ? parseFloat(val) : ('"' + val + '"'));

		// Get IDs
		var dID = '';
		if(evt != "scroll"){
			try {
				dID = typeof trg.dataset.id != "undefined" ? trg.dataset.id : '';
				dID = dID.replace("#", '');
			} catch(e){ }
		} else {
			id = document;
		}

		// Trigger change event id data-id is set
		if(dID != ""){
			var EV = new Event('change', {'bubbles': true, 'cancelable': true});
			document.getElementById(dID).dispatchEvent(EV);
		}

		// If id is empty dont make anything
		if(id == "" || (evt == "click" && tagName == 'input')) return;
		
		// If input is checkbox or radio, the value is checked
		if(id != document && tagName == "input" && (trg.getAttribute("type") == "radio" || trg.getAttribute("type") == "checkbox")){
			val = trg.checked;
		} else if(id == document) { id = "document"; }
		
		// Find the old element
		var json = {}, found = false, lst = iform.sequence.length != 0 ? iform.sequence[iform.sequence.length-1] : {};
		for(var i = 0; i < iform.sequence.length; i++){
			var item = iform.sequence[i];

			if(lst.event == "keydown" && lst.id == id && lst.keyCode == e.keyCode && lst.ts + 100 > ts){
				found = true; 
				break;
			} else if(lst.event == "change" && lst.id == id && lst.value == val && lst.ts + 100 > ts){
				found = true; 
				break;
			} else if(lst.event == "scroll" && lst.id == id && lst.top == e.target.scrollingElement.scrollTop && lst.left == e.target.scrollingElement.scrollLeft && lst.ts + 1000 > ts){
				found = true; 
				break;
			} else if(lst.event == e.type && lst.id == id && lst.ts + 100 > ts){
				found = true; 
				break;
			}
		}
		
		if(!found){
			if(evt == "keydown"){
				json = '{"ts": ' + ts + ', "id": "' + id + '", "event": "' + evt + '", "keyCode": ' + e.keyCode + ', "key": "' + e.key + '"}';
			} else if(evt == "change"){
				json = '{"ts": ' + ts + ', "id": "' + id + '", "event": "' + evt + '", "value": ' + val + '}';
			} else if(evt == "scroll"){
				json = '{"ts": ' + ts + ', "id": "' + id + '", "event": "' + evt + '", "top": ' + e.target.scrollingElement.scrollTop + ', "left": ' + e.target.scrollingElement.scrollLeft + '}';
			} else if(evt == "mutation"){
				json = '{"ts": ' + ts + ', "id": "' + id + '", "event": "' + evt + '", "mutation": "' + e.mutation + '", "value": "' + e.value + '"}';
			} else {
				json = '{"ts": ' + ts + ', "id": "' + id + '", "event": "' + evt + '"}';
			}

			iform._updateSequence(JSON.parse(json))
		} 
	},
	_updateSequence: function(s){
		if(typeof s == "undefined" || s == null) s = [];
		
		// Set sequence
		if(s.length == 0){
			this.sequence = [{ts: 0, id: "document", event: "scroll", top: window.pageYOffset, left: window.pageXOffset, on: window.navigator.userAgent}];
		} else {
			this.sequence.push(s);
		}
	},
	removeSequence: function(){
		this._updateSequence();
		var path = IntelliForm.sha1(window.location.pathname);
		sessionStorage.removeItem(path + 'IFormSeq');
	},
	startSequence: function(){
		// Set attribute id for all element without ID
		this.setIDs();

		// add listeners of change, blur, focus, keydown and click to input, select, buttons and contenteditable sets to "true"
		var events = 'change click keydown focusin focusout';
		var elmnts = 'a, input, select, textarea, button, [contenteditable=true], [onclick]';

		// Disable submit events
		var items = document.querySelectorAll("form");
		for(var i = 0; i < items.length; i++){
			var item = items[i];
			if(item.getAttribute("onsubmit") != null){
				item.setAttribute("data-onsubmit", item.getAttribute("onsubmit"));
			}
			item.setAttribute("onsubmit", "return false");
		}

		// Reset old sequence
		this.removeSequence();
		
		// Add global events
		window.addEventListener("scroll", this._addEvent);

		// Add events to all elements
		events.split(' ').forEach(function (event) {
			var items = document.querySelectorAll(elmnts);
			for(var its = 0; its < items.length; its++){
				var elm = items[its];

				// Ignore combinations of element and event
				if(elm.tagName.toLowerCase() == "select" && event != "change") continue;
				else if(elm.tagName.toLowerCase() == "input" && (elm.type != "radio" || elm.type == "checkbox" ) && event == "click") continue;
				else if(elm.tagName.toLowerCase() == "a" && event != "click") continue;

				// Add CSS rule to disabling the children selection
				if(typeof it.AddCSSRule != "undefined"){
					it.AddCSSRule('', "#" + elm.id + " *", "pointer-events: none;");
				}

				// Add event/element
				elm.addEventListener(event, it.IntelliForm._addEvent);
			}
		});
	},
	stopSequence: function(){
		// add listeners of change, blur, focus, keydown and click to input, select, buttons and contenteditable sets to "true"
		var events = 'change click keydown focusin focusout';
		var elmnts = 'a, input, select, textarea, button, [contenteditable=true], [onclick]';

		// Restore submit events
		var items = document.querySelectorAll("form");
		for(var i = 0; i < items.length; i++){
			var item = items[i];
			if(item.getAttribute("data-onsubmit") != null){
				item.setAttribute("onsubmit", item.getAttribute("data-onsubmit"));
				item.removeAttribute("data-onsubmit");
			} else {
				item.removeAttribute("onsubmit");
			}
		}

		// Remove global events
		window.removeEventListener("scroll", this._addEvent);

		// Remove events to all elements added
		events.split(' ').forEach(function (event) {
			var items = document.querySelectorAll(elmnts);
			for(var its = 0; its < items.length; its++){
				var elm = items[its];

				// Add event/element
				elm.removeEventListener(event, it.IntelliForm._addEvent);
			}
		});

		// Save in session storage if cache is enabled
		var path = IntelliForm.sha1(window.location.pathname);
		sessionStorage.setItem(path + 'IFormSeq', JSON.stringify(this.sequence));
	},
	getSequence: function(j){
		var path = IntelliForm.sha1(window.location.pathname), json = sessionStorage.getItem(path + 'IFormSeq');
		if(typeof j == "undefined"){
			return json;
		} else if(j == 0){
			return JSON.parse(json);
		}
	},
	setSequence: function(s){
		if(typeof s != "undefined" && s.trim() != ""){
			s = JSON.parse(s);
			for(var i = 0; i < s.length; i++){
				this._updateSequence({sequence: s[i]});
			}
		}
	},
	playSequence: function(cfg){
		// Set attribute id for all element without ID
		this.setIDs();

		// If dont have ID or ID is empty, assign sequential index
		var elmnts = 'a, input, select, textarea, button, [contenteditable=true], [onclick]';
		var items = document.querySelectorAll(elmnts);
		for(var its = 0; its < items.length; its++){
			var elm = items[its];

			if(typeof elm.id == "undefined" || elm.id == "") elm.id = elm.tagName + "ID" + its;
		}

		// Get configuration
		if(typeof cfg == "undefined") cfg = { seq: [], velocity: 1 };
		if(!cfg.hasOwnProperty("velocity")) cfg.velocity = 1;
		if(!cfg.hasOwnProperty("seq") || cfg.seq.length == 0){
			// If not send sequence, get by url name
			cfg.seq = this.getSequence(0);
		}
		
		// Add overlay
		var overlay = document.createElement("div");
			overlay.setAttribute("id", "ov3rl4y");
			overlay.innerHTML = '<div id="ovT1m3r" style="position: fixed; bottom: 5px; right: 5px; padding: 5px 10px; background: rgba(0,0,0,0.75); color: #fff;">';
			overlay.style.width = "100%";
			overlay.style.height = "100%";
			overlay.style.position = "fixed";
			overlay.style.background = "rgba(0,0,0,0.1)";
			overlay.style.top = "0";
			overlay.style.left = "0";
			overlay.style.zIndex = 999999999999;
		document.body.appendChild(overlay);		

		// Add countdown
		var initial = cfg.seq[cfg.seq.length - 1].ts / 10 / cfg.velocity, count = initial, counter;
		function timer() { if (count <= 0) { clearInterval(counter); return; } count--; displayCount(count); }

		function displayCount(count) { 
			var res = parseFloat((count / 100).toFixed(2));
			var prc = res.toString().indexOf(".") == -1 ? (res.length + 2) : (res.toString().split(".")[1].length == 1 ? (res.length + 1) : res.length);
			try{ document.getElementById("ovT1m3r").innerHTML = (cfg.velocity > 1 ? (cfg.velocity + "x ") : '') + "\u25B6 " + res.toPrecision(prc) + " secs"; } catch (e){}
		}
		counter = setInterval(timer, 10);
		displayCount(initial);

		// focusin the current element
		function _focus(e){
			if(e != null){
				e.style = "background: #2f2f2f; box-shadow: 0 0 2px 1px #fff; color: #ffffff !important";

				var aux = document.querySelector('[for=' + e.id + ']');
				if( aux != null){
					aux.style = "background: #2f2f2f; color: #ffffff !important";
				};
			}
		}
		
		// focusout the current element
		function _blur(e){
			if(e != null){
				e.style.background = "";
				e.style.boxShadow = "";
				e.style.color = "";

				var aux = document.querySelector('[for=' + e.id + ']');
				if( aux != null){
					aux.style.background = "";
					aux.style.boxShadow = "";
					aux.style.color = "";
				};
			}
		}		

		// Execute sequence
		for(var x = 0; x < cfg.seq.length; x++){
			var item = cfg.seq[x];

			setTimeout(function(item, x){
				var el = document.getElementById(item.id), val = item.value;

				// Change events
				if(item.event == "change"){
					if(el.tagName.toLowerCase() == "input" && (el.getAttribute("type") == "radio" || el.getAttribute("type") == "checkbox")){
						el.checked = val
					} else {
						el.value = val;
					}

				// keyborads events
				} else if(item.event == "keydown"){
					var ignore = false;
					if(item.keyCode >= 112 && item.keyCode <= 123){
						ignore = true;
					} else if(item.keyCode > 48){
						el.value += item.key; //String.fromCharCode(item.keyCode);
					} else if(item.keyCode == 8) {
						el.value = el.value.substr(0, el.value.length - 1);
					}
					if(!ignore){
						var evt = new KeyboardEvent('keydown', {'keyCode': item.keyCode, 'which': item.keyCode});
						el.dispatchEvent (evt);
					}

				// Change events
				} else if(item.event == "change"){
					el.value = val;

				// Scroll events
				} else if(item.event == "scroll"){
					window.scroll({ top: item.top, left: item.left, behavior: 'smooth' });

				// Focusin
				} else if(item.event == "focusin"){
					_focus(el);

				// Focusout
				} else if(item.event == "focusout"){
					_blur(el);

				// Another events
				} else {
					var EV = new Event(item.event, {'bubbles': true, 'cancelable': true});
					el.dispatchEvent(EV);

					// If item have data-id
					try {
						dID = typeof trg.dataset.id != "undefined" ? trg.dataset.id : '';
						dID = dID.replace("#", '');

						var EV = new Event('change', {'bubbles': true, 'cancelable': true});
						document.getElementById(dID).dispatchEvent(EV);
					} catch(e){ }
				}

				if(x == cfg.seq.length - 1) {
					document.getElementById("ov3rl4y").remove();
					_blur(el);
					console.log("sequence ended!");
				}
			}.bind(null, item, x), item.ts / cfg.velocity);
		}
	},
	send: function (cfg) {
		// If configuration object is invalid
		if (!cfg.hasOwnProperty('url')) { alert("The 'url' parameter has not been supplied!.\nPlease, see the help with the IntelliForm.help({help: 'send'});"); return; }
		if (!cfg.hasOwnProperty('params')) { alert("The 'params' parameter has not been supplied!.\nPlease, see the help with the IntelliForm.help({help: 'send'});"); return; }
	
		// Create form
		var f = document.createElement("form");
		f.setAttribute('method', "post");
		f.setAttribute('action', cfg.url);
		f.style.display = "none";
	
		for (var i = 0; i < cfg.params.length; i++) {
			var item = cfg.params[i], p = document.createElement("input");
	
			p.setAttribute('type', item.type);
			p.setAttribute('name', item.id);
			p.setAttribute('id', item.id);
			p.setAttribute('value', item.value);
	
			f.appendChild(p);
		}
		var s = document.createElement("input");
		s.setAttribute('type', "submit");
		s.setAttribute('value', "Submit");
		f.appendChild(s);
	
		document.getElementsByTagName('body')[0].appendChild(f);
	
		s.click();
	},
	setIDs: function(e){
		var items = document.body.querySelectorAll("*");
		for(var x = 0; x < items.length; x++){
			var i = items[x];
			if(typeof i.id == "undefined" || i.id == "") i.id = "_bodyItem" + x;
		}
	},
	addHistoryBack: function (id, value){
		var path = this.sha1(window.location.pathname);

		if(typeof this.undo[path] == 'undefined'){ this.undo[path] = {}; }
		try {
			if(this.undo[path][id][this.undo[path][id].length-1] != value) this.undo[path][id][this.undo[path][id].length] = value;
		} catch (e){
			this.undo[path][id] = new Array();
			this.undo[path][id][0] = value;
		}
		sessionStorage.setItem('iFormUndo', JSON.stringify(this.undo));
    },
    historyBack: function(id){
		try {
			var path = this.sha1(window.location.pathname);
			var value = this.undo[path][id].pop();
			
			if(document.getElementById(id).value ==  value) var value = this.undo[path][id].pop();

			if(typeof value !== 'undefined' && value != null && value != ""){
				if(this.undo[path][id].length == 0) delete this.undo[path][id];
				sessionStorage.setItem('iFormUndo', JSON.stringify(this.undo));
				this.addHistoryForward(id, document.getElementById(id).value);
				document.getElementById(id).value = value;

				var event = new Event('change', {'bubbles': true, 'cancelable': true});
				e.target.dispatchEvent(event);

				return value;
			}

			return null;
		} catch(e){ }
    },
    addHistoryForward: function (id, value){
		var path = this.sha1(window.location.pathname);

		if(typeof this.redo[path] == 'undefined'){ this.redo[path] = {}; }
		try {
			if(this.redo[path][id][this.redo[path][id].length-1] != value) this.redo[path][id][this.redo[path][id].length] = value;
		} catch (e){
			this.redo[path][id] = new Array();
			this.redo[path][id][0] = value;
		}
		sessionStorage.setItem('iFormUndo', JSON.stringify(this.redo));
    },
    historyForward: function(id){
		try {
			var path = this.sha1(window.location.pathname);
			var value = this.redo[path][id].pop();
			if(document.getElementById(id).value ==  value) var value = this.undo[path][id].pop();

			if(typeof value != 'undefined' && value != null && value != ""){
				if(this.redo[path][id].length == 0) delete this.redo[path][id];
				sessionStorage.setItem('iFormUndo', JSON.stringify(this.redo));
				this.addHistoryBack(id, document.getElementById(id).value);
				document.getElementById(id).value = value;

				var event = new Event('change', {'bubbles': true, 'cancelable': true});
				e.target.dispatchEvent(event);

				return value;
			}

			return null;
		} catch(e){ }
	},
	sha1:function(str){
        var rotate_left=function(e,t){var n=e<<t|e>>>32-t;return n};var cvt_hex=function(e){var t="";var n;var r;for(n=7;n>=0;n--){r=e>>>n*4&15;t+=r.toString(16)}return t};var blockstart,i,j,W=new Array(80),H0=1732584193,H1=4023233417,H2=2562383102,H3=271733878,H4=3285377520,A,B,C,D,E,temp,str_len=str.length,word_array=[];for(i=0;i<str_len-3;i+=4){j=str.charCodeAt(i)<<24|str.charCodeAt(i+1)<<16|str.charCodeAt(i+2)<<8|str.charCodeAt(i+3);word_array.push(j)}switch(str_len%4){case 0:i=2147483648;break;case 1:i=str.charCodeAt(str_len-1)<<24|8388608;break;case 2:i=str.charCodeAt(str_len-2)<<24|str.charCodeAt(str_len-1)<<16|32768;break;case 3:i=str.charCodeAt(str_len-3)<<24|str.charCodeAt(str_len-2)<<16|str.charCodeAt(str_len-1)<<8|128;break}word_array.push(i);while(word_array.length%16!=14){word_array.push(0)}word_array.push(str_len>>>29);word_array.push(str_len<<3&4294967295);for(blockstart=0;blockstart<word_array.length;blockstart+=16){for(i=0;i<16;i++){W[i]=word_array[blockstart+i]}for(i=16;i<=79;i++){W[i]=rotate_left(W[i-3]^W[i-8]^W[i-14]^W[i-16],1)}A=H0;B=H1;C=H2;D=H3;E=H4;for(i=0;i<=19;i++){temp=rotate_left(A,5)+(B&C|~B&D)+E+W[i]+1518500249&4294967295;E=D;D=C;C=rotate_left(B,30);B=A;A=temp}for(i=20;i<=39;i++){temp=rotate_left(A,5)+(B^C^D)+E+W[i]+1859775393&4294967295;E=D;D=C;C=rotate_left(B,30);B=A;A=temp}for(i=40;i<=59;i++){temp=rotate_left(A,5)+(B&C|B&D|C&D)+E+W[i]+2400959708&4294967295;E=D;D=C;C=rotate_left(B,30);B=A;A=temp}for(i=60;i<=79;i++){temp=rotate_left(A,5)+(B^C^D)+E+W[i]+3395469782&4294967295;E=D;D=C;C=rotate_left(B,30);B=A;A=temp}H0=H0+A&4294967295;H1=H1+B&4294967295;H2=H2+C&4294967295;H3=H3+D&4294967295;H4=H4+E&4294967295}temp=cvt_hex(H0)+cvt_hex(H1)+cvt_hex(H2)+cvt_hex(H3)+cvt_hex(H4); return temp.toLowerCase();
    },
};

/**
	 Debugger functionality
	 @version: 1.00
	 @author: Pablo E. Fernández (islavisual@gmail.com).
	 @Copyright 2017-2019 Islavisual.
	 @Last update: 15/03/2019
 **/

this.Debugger = it.Debugger = {
    target: '',
    targetWindow: null,
    mutationObserver: 'Not Supported',
    attributesFilter:[],
    excludedAttributesFilter:['style'],
    selectorsFilter:[],
	excludedSelectorsFilter:[],
	elements: '*',
    eventsFilter:[],
    enableHistory: false,
    history: {},
    messages:{
        ajaxBeforeSend:'Processing request. Method: <method>. Type: <type>. CrossDomain: <crossDomain>.  File: <url>. Content Type: <contentType>',
        ajaxComplete:'The Ajax processing request FINISHED for the <url> file.',
        ajaxSuccess:'The Ajax request was completed SUCCESSFULLY for the <url> file.',
        ajaxError:'An error occurred into Ajax processing request into <url> file.',
        beforeUnloadPage:'Page request unload',
        unloadPage:'Unloaded page',
        errorPage:'An error occurred into file',
        parsedPage:'Page loaded and parsed.',
        pageChangedStatus:'Page changed status:',
        valueChanged: 'The <selector> changed the value property to <value>.',
        getsFocus: '<selector> gets focus.',
        losesFocus: '<selector> loses focus.',
        click: 'User clicks into <selector>.',
        attributeMutation: 'The <attributeName> attribute has mutated from "<oldValue>" to "<value>" into <selector> element.',
        addedChildren: 'Added children into <selector> element. Total children: <totalChildren>',
        removedChildren: 'Removed children into <selector> element. Total children: <totalChildren>',
        mouseOver: 'The mouse pointer is over the <selector> element.',
        mouseOut: 'The mouse pointer leaves the <selector> element.',
        keyPress: 'Keyboard event received into <selector> element. Keys Combination: "<keys>". Keys Combination Code: "<keysCode>".',
        separator: '<div style="border: 1px solid #333; border-width: 0px 0px 1px 0px; height:5px; width:100%;margin-bottom: 5px;">&nbsp;</div>'
	},
    colors: {
        added:"#709050",
        attributeChanged: '#ff00ff',
        background:"#000000",
        blur:"#ff6694",
        focus:"#467bfe ",
        click:"#909090",
        mouseOver:"#a07090",
        mouseOut:"#807090",
        keyPress:"#999",
        error: '#a02020',
        headerForeground:"#ffffff",
        headerBackground:"#333",
        normal:"#606060",
        proccessing:"#8AC007",
        readyState:"#8AC007",
        removed: "#a01010",
        sending:"#8AC007",
        updated:"#80a0e0",
        valueChanged:"#FE2466"
    },
	version: '1.0',
	help: function(cfg){
		if(typeof cfg == "undefined") cfg = {help: ''};
		if(!cfg.hasOwnProperty("help")) cfg.help = '';

		if (typeof showHelper != "undefined") showHelper("Debugger", cfg);
		else alert("Helper not available!")
		return;
	},
    isObserved: function(e){
        if(this.selectorsFilter.length != 0){
            if((this.inArray(e.tagName, this.selectorsFilter) != -1 && this.inArray(e.tagName, this.excludedSelectorsFilter) == -1) || // if the TAG must be observed
               (typeof e.id != 'undefined' && (this.inArray('#'+ e.id, this.selectorsFilter) != -1 && this.inArray('#'+ e.id, this.excludedSelectorsFilter) == -1)) || // if the ID must be observed
               (typeof e.className != 'undefined' && (this.inArray('.'+ e.className.replace(/ /g, ' .'), this.selectorsFilter) != -1 && this.inArray('.'+e.className.replace(/ /g, ' .'), this.excludedSelectorsFilter) == -1)) // if the CLASS must be observed
              ){
                return true;
            }
        } else if(this.selectorsFilter.length == 0 && this.inArray(e.tagName, this.excludedSelectorsFilter) == -1 && this.inArray('#'+ e.id, this.excludedSelectorsFilter) == -1 && this.inArray('.'+ e.className, this.excludedSelectorsFilter) == -1){
            return true;
        }

        return false;
    },
    init: function(cfg){
		if(typeof cfg == "undefined") cfg = {target: 'console'}
		else if(cfg.target == "undefined") cfg[target] = "console";

		// Assign configuration obteins from parameter
		for(var key in cfg){ this[key] = cfg[key]; }

		if(this.target == 'window') {
            this.targetWindow = window.open("", "Debugger Window", "toolbar=no, scrollbars=yes, resizable=yes, top=0, left=0, width=500, height=500");
            this.targetWindow.document.body.innerHTML = "";
            this.targetWindow.document.write('<style>body { background:'+this.colors.background+'; } h2 {background:'+this.colors.headerBackground+'; color:'+this.colors.headerForeground+'; padding:5px;}</style>');
            this.targetWindow.document.write('<H2>isiTools Debugger 1.0 - Page loaded at '+this.getTime()+"</H2>");
        }
        this.showMessage("Target: "+this.target, 'normal');

        // Prepare MutationObserver options to normal use
        var MutationOptions = {subtree: true, childList: true, attributes: true, attributeOldValue: true, characterData: true, characterDataOldValue: true};
        if(typeof this.attributesFilter != 'undefined' && this.attributesFilter.length != 0) MutationOptions.attributesFilter = this.attributesFilter;

        // Mutation Observer feature detection
        var prefixes = ['WebKit', 'Moz', 'O', 'Ms', '']
        for(var i=0; i < prefixes.length; i++) {
            if(prefixes[i] + 'MutationObserver' in window) {
                this.mutationObserver = window[prefixes[i] + 'MutationObserver'];
            }
        }

        this.showMessage("Mutation Observer Functionality: "+this.mutationObserver, 'normal');

        var blp = this;

        var observer = new this.mutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                var id       = mutation.target.id;
                var classID  = mutation.target.className;
                var tagName  = mutation.target.tagName;
                var lastMod  = mutation.target.ownerDocument.lastModified;

                if(blp.isObserved(mutation.target)){
                    if(typeof id == 'undefined' || id == '') id = tagName + "." + classID; else id = '#'+id;
                   
                    if(mutation.type == "attributes" && blp.excludedAttributesFilter.indexOf(mutation.attributeName) == -1 ){
						blp.showMessage(blp.messages.attributeMutation.replace('<attributeName>', mutation.attributeName).replace('<oldValue>', mutation.oldValue).replace('<value>', mutation.target.getAttribute(mutation.attributeName)).replace('<selector>', id), 'attributeChanged');

                    } else if(mutation.type == "childList"){
                        if( mutation.addedNodes.length != 0 && blp.inArray('add', blp.eventsFilter) != -1 ){
                            blp.showMessage(blp.messages.addedChildren.replace('<totalChildren>', mutation.addedNodes.length).replace('<selector>', id), 'added');
                        } else if( mutation.removedNodes.length != 0 && blp.inArray('remove', blp.eventsFilter) != -1 ){
                            blp.showMessage(blp.messages.removedChildren.replace('<totalChildren>', mutation.removedNodes.length).replace('<selector>', id), 'removed');
                        }
                    }
                }
            });
        });

        observer.observe(document, MutationOptions);

        // Set Page Events (ready, load, unload and error)
        // Events control (change, focus, blur, click, ...) and call control files from Ajax and jQuery
        try{
            blp.setUserEvents();
        } catch(e){
            window.onload = function(){
                blp.setUserEvents();
            }
        }
		
		// Show Messages of Ajax from jQuery
		this.showMessage(this.messages.parsedPage, 'sending');

		if(typeof jQuery != "undefined"){
			$(document).ajaxSuccess(function (evt, jqxhr, settings) {
				var s = this.messages.ajaxSuccess.replace('<method>', settings.async);
				s     = s.replace('<type>', settings.type);
				s     = s.replace('<crossDomain>', settings.crossDomain);
				s     = s.replace('<url>', settings.url);
				s     = s.replace('<contentType>', settings.contentType);
				this.showMessage(s, 'updated');
			});

			$(document).ajaxError(function (evt, jqxhr, settings, err) {
				this.showMessage(this.messages.ajaxError+(this.target=='console'?'\n':'<br/>')+" Status Error: "+jqxhr.status+(this.target=='console'?'\n':'<br/>')+"Status Text: "+jqxhr.statusText+(this.target=='console'?'\n':'<br/>')+"Description: "+jqxhr.responseText, 'error');
			});

			$(document).ajaxComplete(function (evt, jqxhr, settings) {
				var s = this.messages.ajaxComplete.replace('<url>', settings.url);
				this.showMessage(s, 'readyState');
			});
			$.ajaxSetup({
				beforeSend: function() {
					var s = this.messages.ajaxBeforeSend.replace('<method>', this.async);
					s     = s.replace('<type>', this.type);
					s     = s.replace('<crossDomain>', this.crossDomain);
					s     = s.replace('<url>', this.url);
					s     = s.replace('<contentType>', this.contentType);
					this.showMessage(s, 'proccessing');
				}
			});
		}

		// Show messages on ready
		document.onreadystatechange = function () {
			if (document.readyState == "interactive") {
				this.showMessage(this.messages.pageChangedStatus+" "+document.readyState, 'proccessing');
			} else{
				this.showMessage(this.messages.pageChangedStatus+" "+document.readyState, 'readyState');
			}
		
		}
		
		// Show messages on load
		window.addEventListener('load', function(){ this.showMessage(this.messages.pageChangedStatus+" finished", 'updated'); } );
		
		// Show messages on error
		window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
			console.log(errorObj);
			alert('Error: ' + errorMsg + '\n' + 'Script: ' + url + '\n' + 'Line: ' + lineNumber + '\n' + 'Column: ' + column);
			return true;
		}
    },
    getTime: function(){
        var date = new Date();
        var d = date.getDay(), m = date.getMonth()+1, y = date.getFullYear(), h = date.getHours(), i = date.getMinutes(), s = date.getSeconds(), ms = date.getMilliseconds();
        return (d<10?"0"+d:d)+"/"+(m<10?"0"+m:m)+"/"+(y<10?"0"+y:y)+" "+(h<10?"0"+h:h)+":"+(i<10?"0"+i:i)+":"+(s<10?"0"+s:s)+"."+ms;
    },
    setUserEvents: function(){
        var blp = this;
        var events = blp.eventsFilter.join(' ');
        events = events.replace("add", "").replace("remove", "");
		if(blp.eventsFilter.length == 0) events = 'change click focusin focusout keydown';
		
		events.split(' ').forEach(function (event) {
			var items = document.body.querySelectorAll(blp.elements);
			for(var its = 0; its < items.length; its++){
				items[its].addEventListener(event, function (e) {
					e.stopPropagation();
					var id       = e.target.id;
					var classID  = e.target.className;
					var tagName  = e.target.tagName;
					var type     = e.type;

					if(blp.isObserved(e.target)){
						if(typeof id == 'undefined' || id == '') id = tagName + "." + classID; else id = '#'+id;

						if(type == 'change'){
							blp.showMessage(blp.messages.valueChanged.replace("<selector>", id).replace("<value>", e.target.value), 'valueChanged');

						} else if(type == 'focusin' || type == 'focus'){
							blp.showMessage(blp.messages.getsFocus.replace("<selector>", id), 'focus');
						} else if(type == 'focusout' || type == 'blur'){
							blp.showMessage(blp.messages.losesFocus.replace("<selector>", id), 'blur');
						} else if(type == 'click' || type == 'dblclick'){
							blp.showMessage(blp.messages.click.replace("<selector>", id), 'click');
						} else if(type == 'mouseenter' || type == 'mouseover'){
							blp.showMessage(blp.messages.mouseOver.replace("<selector>", id), 'mouseOver');
						} else if(type == 'mouseleave' || type == 'mouseout'){
							blp.showMessage(blp.messages.mouseOut.replace("<selector>", id), 'mouseOut');
						} else if(type == 'keydown' || type == 'keyup' || type == 'keypress'){
							var charCode = (e.which) ? e.which : e.keyCode;
							var strKey = "", strCombKey = "", codeCombKey = "";
							if(e.shiftKey || charCode == 16){ strCombKey += "Shift + "; codeCombKey = "16 + "; }
							if(e.ctrlKey  || charCode == 17){ strCombKey += "Ctrl + ";  codeCombKey = "17 + "; }
							if(e.altKey   || charCode == 18){ strCombKey += "Alt + ";   codeCombKey = "18 + "; }

							if(charCode == 8) strKey += 'Backspace';
							else if(charCode == 9) strKey += 'Tab';
							else if(charCode == 13) strKey += 'Enter';
							else if(charCode == 19) strKey += 'Pause / Break';
							else if(charCode == 27) strKey += 'Escape';
							else if(charCode == 19) strKey += 'Pause / Break';
							else if(charCode == 33) strKey += 'Page Up';
							else if(charCode == 34) strKey += 'Page Down';
							else if(charCode == 35) strKey += 'End';
							else if(charCode == 36) strKey += 'Home';
							else if(charCode == 37) strKey += 'Left Arrow';
							else if(charCode == 38) strKey += 'Up Arrow';
							else if(charCode == 39) strKey += 'Right Arrow';
							else if(charCode == 40) strKey += 'Down Arrow';
							else if(charCode == 45) strKey += 'Insert';
							else if(charCode == 46) strKey += 'Delete';
							else if(charCode == 91) strKey +="Left window";
							else if(charCode == 92) strKey +="Right window";
							else if(charCode == 93) strKey +="Select key";
							else if(charCode == 96) strKey +="Numpad 0";
							else if(charCode == 97) strKey +="Numpad 1";
							else if(charCode == 98) strKey +="Numpad 2";
							else if(charCode == 99) strKey +="Numpad 3";
							else if(charCode == 100) strKey +="Numpad 4";
							else if(charCode == 101) strKey +="Numpad 5";
							else if(charCode == 102) strKey +="Numpad 6";
							else if(charCode == 103) strKey +="Numpad 7";
							else if(charCode == 104) strKey +="Numpad 8";
							else if(charCode == 105) strKey +="Numpad 9";
							else if(charCode == 106) strKey +="Multiply";
							else if(charCode == 107) strKey +="Add";
							else if(charCode == 109) strKey +="Subtract";
							else if(charCode == 110) strKey +="Decimal point";
							else if(charCode == 111) strKey +="Divide";
							else if(charCode == 112) strKey +="F1";
							else if(charCode == 113) strKey +="F2";
							else if(charCode == 114) strKey +="F3";
							else if(charCode == 115) strKey +="F4";
							else if(charCode == 116) strKey +="F5";
							else if(charCode == 117) strKey +="F6";
							else if(charCode == 118) strKey +="F7";
							else if(charCode == 119) strKey +="F8";
							else if(charCode == 120) strKey +="F9";
							else if(charCode == 121) strKey +="F10";
							else if(charCode == 122) strKey +="F11";
							else if(charCode == 123) strKey +="F12";
							else if(charCode == 144) strKey +="num lock";
							else if(charCode == 145) strKey +="scroll lock";
							else if(charCode == 186) strKey +="Semi-colon (;)"; // semi-colon
							else if(charCode == 187) strKey +="Equal-sign (=)"; //
							else if(charCode == 188) strKey +="Comma (,)"; // comma
							else if(charCode == 189) strKey +="Dash (-)"; // dash
							else if(charCode == 190) strKey +="Period (.)";
							else if(charCode == 191) strKey +="Forward Slash (/)";
							else if(charCode == 192) strKey +="Grave Accent(`)";
							else if(charCode == 219) strKey +="Open Bracket ([)";
							else if(charCode == 220) strKey +="Back Slash (\\)";
							else if(charCode == 221) strKey +="Close Bracket (])";
							else if(charCode == 222) strKey +="Single Quote (')";
							else strKey += String.fromCharCode(charCode);

							blp.showMessage(blp.messages.keyPress.replace("<selector>", id).replace("<keys>", strCombKey+strKey).replace("<keysCode>", codeCombKey+charCode), 'keyPress');
							if(typeof e.target.id != "undefined" && e.target.id != '' && e.target.id != null){
								var event = new Event('change', {'bubbles': true, 'cancelable': true});
								e.target.dispatchEvent(event);
							}
						}
					}
				});
			}
		});
	},
    getHistory: function(){
        var path = this.sha1(window.location.pathname);
        return this.history[path];
    },
    sha1:function(str){
        var rotate_left=function(e,t){var n=e<<t|e>>>32-t;return n};var cvt_hex=function(e){var t="";var n;var r;for(n=7;n>=0;n--){r=e>>>n*4&15;t+=r.toString(16)}return t};var blockstart,i,j,W=new Array(80),H0=1732584193,H1=4023233417,H2=2562383102,H3=271733878,H4=3285377520,A,B,C,D,E,temp,str_len=str.length,word_array=[];for(i=0;i<str_len-3;i+=4){j=str.charCodeAt(i)<<24|str.charCodeAt(i+1)<<16|str.charCodeAt(i+2)<<8|str.charCodeAt(i+3);word_array.push(j)}switch(str_len%4){case 0:i=2147483648;break;case 1:i=str.charCodeAt(str_len-1)<<24|8388608;break;case 2:i=str.charCodeAt(str_len-2)<<24|str.charCodeAt(str_len-1)<<16|32768;break;case 3:i=str.charCodeAt(str_len-3)<<24|str.charCodeAt(str_len-2)<<16|str.charCodeAt(str_len-1)<<8|128;break}word_array.push(i);while(word_array.length%16!=14){word_array.push(0)}word_array.push(str_len>>>29);word_array.push(str_len<<3&4294967295);for(blockstart=0;blockstart<word_array.length;blockstart+=16){for(i=0;i<16;i++){W[i]=word_array[blockstart+i]}for(i=16;i<=79;i++){W[i]=rotate_left(W[i-3]^W[i-8]^W[i-14]^W[i-16],1)}A=H0;B=H1;C=H2;D=H3;E=H4;for(i=0;i<=19;i++){temp=rotate_left(A,5)+(B&C|~B&D)+E+W[i]+1518500249&4294967295;E=D;D=C;C=rotate_left(B,30);B=A;A=temp}for(i=20;i<=39;i++){temp=rotate_left(A,5)+(B^C^D)+E+W[i]+1859775393&4294967295;E=D;D=C;C=rotate_left(B,30);B=A;A=temp}for(i=40;i<=59;i++){temp=rotate_left(A,5)+(B&C|B&D|C&D)+E+W[i]+2400959708&4294967295;E=D;D=C;C=rotate_left(B,30);B=A;A=temp}for(i=60;i<=79;i++){temp=rotate_left(A,5)+(B^C^D)+E+W[i]+3395469782&4294967295;E=D;D=C;C=rotate_left(B,30);B=A;A=temp}H0=H0+A&4294967295;H1=H1+B&4294967295;H2=H2+C&4294967295;H3=H3+D&4294967295;H4=H4+E&4294967295}temp=cvt_hex(H0)+cvt_hex(H1)+cvt_hex(H2)+cvt_hex(H3)+cvt_hex(H4); return temp.toLowerCase();
    },
    inArray: function (needle, haystackArray){
        if(typeof needle == "undefined" || needle.indexOf("undefined") != -1 || needle == "#" || needle == ".") return -1;
        if(typeof haystackArray == "undefined" || haystackArray.length == 0) return -1;

        var len = haystackArray.length, str = needle.toString().toLowerCase();
        for ( var i = 0; i < len; i++ ) {
            if( haystackArray[i].indexOf('.') != -1){
                var a = haystackArray[i];
                var arr = needle.split(" ");
                for(var x = 0; x < arr.length; x++){
                    if ( arr[x] == a ) { return i; }
                }

            } else {
                if ( haystackArray[i].toLowerCase() == str ) { return i; }
            }
        }
        return -1;
    },
    showMessage: function (message, type){
		var woname = false;
		var blp = this;
        function object2String(message) {
            var output = '';
            if(typeof(message) == 'object') {
                for(var phrase in message) {
                    var isArr = false;
                    try {isArr = (Array.isArray(phrase)==true||parseFloat(phrase)>=0)?true:false; } catch(e){ isArr = false; }
                    if(typeof message[phrase] == 'string' && (message[phrase].indexOf("<pre>") != -1 || message[phrase].indexOf("</pre>") != -1)){
                        output += message[phrase];
                        woname = true;
                    } else {
                        output += '<b style="color:'+blp.colors.headerForeground+'">'+(woname==false?(isArr==true?(phrase + ' => [ '):(phrase + ' : ')):'')+'</b>';
                        woname = false;
                        output += object2String(message[phrase]) + (woname==false?(isArr==true?' ] ':''):'') + (blp.target=='console'?'\n':'<br/>');
                    }
                }
            } else {
                output += message;
                woname = false;
            }

			if(blp.enableHistory){
				var path = blp.sha1(window.location.pathname);
				if(typeof blp.history[path] == 'undefined'){ blp.history[path] = 'Debugger '+blp.version+' - Page loaded at '+blp.getTime()+"\n---------------------------------------------------\n"; }

                blp.history[path] += "[" + blp.getTime() + "] " + output + "\n";
            }

            return output;
        }

        var typeColor = '';
        if(typeof type == 'undefined'){
            typeColor = this.colors.normal;
        } else {
            typeColor = this.colors[type];
        }

        if(this.target == 'console' || this.target == ''){
			var msg = "[" + this.getTime() + "] "+object2String(message);
            			
			console.log("%c " + msg, "color: " + typeColor + "; background: #242424; ");

        } else {
            var msg = "<span style='color:"+this.colors.normal+"'>[" + this.getTime() + "]</span> ";
            msg += '<span style="color:'+typeColor+'">'+object2String(message)+'</span>';
            try{ this.targetWindow.document.write(msg+this.messages.separator); } catch(e){}
        }
    }
}

/**
	 Simple DOM ready() detection in pure JS.
	 @version: 1.00
	 @author: Carl Danley.
	 @Copyright 2017-2019 Islavisual.
	 @Last update: 04/03/2019
 **/
this.DOM = it.DOM = new function () {
	var IS_READY = false;
	var CALLBACKS = [];
	var SELF = this;

	SELF.ready = function (callback) {
		if (typeof callback == "string" && callback == "help" || callback.hasOwnProperty("help")) {
			if (typeof showHelper != "undefined") showHelper("DOM", cfg);
			else alert("Helper not available!")
			return;
		}

		//check to see if we're already finished
		if (IS_READY === true && typeof callback === 'function') {
			callback();
			return;
		}

		//else, add this callback to the queue
		CALLBACKS.push(callback);
	};
	var addEvent = function (event, obj, func) {
		if (window.addEventListener) {
			obj.addEventListener(event, func, false);
		}
		else if (document.attachEvent) {
			obj.attachEvent('on' + event, func);
		}
	};
	var doScrollCheck = function () {
		//check to see if the callbacks have been fired already
		if (IS_READY === true) {
			return;
		}

		//now try the scrolling check
		try {
			document.documentElement.doScroll('left');
		}
		catch (error) {
			setTimeout(doScrollCheck, 1);
			return;
		}

		//there were no errors with the scroll check and the callbacks have not yet fired, so fire them now
		fireCallbacks();
	};
	var fireCallbacks = function () {
		//check to make sure these fallbacks have not been fired already
		if (IS_READY === true) {
			return;
		}

		//loop through the callbacks and fire each one
		var callback = false;
		for (var i = 0, len = CALLBACKS.length; i < len; i++) {
			callback = CALLBACKS[i];
			if (typeof callback === 'function') {
				callback();
			}
		}

		//now set a flag to indicate that callbacks have already been fired
		IS_READY = true;
	};
	var listenForDocumentReady = function () {
		//check the document readystate
		if (document.readyState === 'complete') {
			return fireCallbacks();
		}

		//begin binding events based on the current browser
		if (document.addEventListener) {
			addEvent('DOMContentLoaded', document, fireCallbacks);
			addEvent('load', window, fireCallbacks);
		}
		else if (document.attachEvent) {
			addEvent('load', window, fireCallbacks);
			addEvent('readystatechange', document, fireCallbacks);

			//check for the scroll stuff
			if (document.documentElement.doScroll && window.frameset === null) {
				doScrollCheck();
			}
		}
	};

	//since we have the function declared, start listening
	listenForDocumentReady();
};

/**
	 Get Browser Plugin
	 @version: 1.02
	 @author: Pablo E. Fernández (islavisual@gmail.com).
	 @Copyright 2017-2019 Islavisual.
	 @Last update: 05/03/2019
 **/
this.GetBrowser = it.GetBrowser = function (cfg) {
	if (typeof cfg == "undefined") cfg = {};

	if ((typeof cfg == "string" && cfg == "help") || cfg.hasOwnProperty("help")) {
		if (typeof showHelper != "undefined") showHelper("GetBrowser", cfg);
		else alert("Helper not available!")
		return;
	}

	var e, r = navigator.userAgent, t = r.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; /trident/i.test(t[1]) && (e = /\brv[ :]+(\d+)/g.exec(r) || [], t[1] = "Internet Explorer", t[2] = e[1]), "Chrome" === t[1] && (e = r.match(/\b(OPR|Edge)\/(\d+)/), t[1] = null != e ? e.slice(1).join(" ").replace("OPR", "Opera") : "Chrome"), t = t[2] ? [t[1], t[2]] : [navigator.appName, navigator.appVersion, "-?"], null != (e = r.match(/version\/(\d+)/i)) && t.splice(1, 1, e[1]); var o = /firefox/.test(navigator.userAgent.toLowerCase()) && !/webkit    /.test(navigator.userAgent.toLowerCase()), a = /webkit/.test(navigator.userAgent.toLowerCase()), s = /opera/.test(navigator.userAgent.toLowerCase()), n = /edge/.test(navigator.userAgent.toLowerCase()) || /msie/.test(navigator.userAgent.toLowerCase()) || /msie (\d+\.\d+);/.test(navigator.userAgent.toLowerCase()) || /trident.*rv[ :]*(\d+\.\d+)/.test(navigator.userAgent.toLowerCase()), i = n ? "" : a ? "-webkit-" : o ? "-moz-" : ""; return { name: t[0], version: t[1], firefox: o, opera: s, msie: n, chrome: a, prefix: i }
};

/* GetParam */
this.GetParam = it.GetParam = function (cfg) {
	if (typeof cfg == "undefined") cfg = {};

	if ((typeof cfg == "string" && cfg == "help") || cfg.hasOwnProperty("help")) {
		if (typeof showHelper != "undefined") showHelper("GetParam", cfg);
		else alert("Helper not available!")
		return;
	}

	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
		vars[key] = value;
	});
	return vars;
}

/**
	 HttpRequest functionality																		
	 @version: 2.00																					
	 @author: Pablo E. Fernández (islavisual@gmail.com).												
	 @Copyright 2017-2019 Islavisual. 																	
	 @Last update: 27/02/2019																			
 **/

this.HttpRequest = it.HttpRequest = function (cfg) {
	if ((typeof cfg == "string" && cfg == "help") || cfg.hasOwnProperty("help")) {
		if (typeof showHelper != "undefined") showHelper("HttpRequest", cfg);
		else alert("Helper not available!")
		return;
	}

	// If configuration object is invalid
	if (!cfg || !cfg.hasOwnProperty('url')) { alert("You need set one url!.\nPlease, see the help with the HttpRequest('help');"); return; }
	if (!cfg || !cfg.hasOwnProperty('callback')) { alert("you need set one callback function!.\nPlease, see the help with the HttpRequest('help');"); return false; }

	// Create JSON with current opt
	var opt = {
		ajax: !cfg.hasOwnProperty('ajax') ? true : cfg.ajax,
		callback: cfg.callback,
		contentType: !cfg.hasOwnProperty('contentType') ? "application/x-www-form-urlencoded" : cfg.contentType,
		debug: !cfg.hasOwnProperty('debug') ? false : cfg.debug,
		onAbort: !cfg.hasOwnProperty('onAbort') ? null : cfg.onAbort,
		onError: !cfg.hasOwnProperty('onError') ? null : cfg.onError,
		onLoad: !cfg.hasOwnProperty('onLoad') ? null : cfg.onLoad,
		onLoadEnd: !cfg.hasOwnProperty('onLoadEnd') ? null : cfg.onLoadEnd,
		onLoadStart: !cfg.hasOwnProperty('onLoadStart') ? null : cfg.onLoadStart,
		onProgress: !cfg.hasOwnProperty('onProgress') ? null : cfg.onProgress,
		onTimeout: !cfg.hasOwnProperty('onTimeout') ? null : cfg.onTimeout,
		method: !cfg.hasOwnProperty('method') ? "post" : cfg.method,
		params: !cfg.hasOwnProperty('parameters') ? {} : cfg.parameters,
		returnFullResponse: !cfg.hasOwnProperty('returnFullResponse') ? false : cfg.returnFullResponse,
		timeout: !cfg.hasOwnProperty('timeout') ? 0 : cfg.timeout,
		url: cfg.url,
		withCredentials: !cfg.hasOwnProperty('withCredentials') ? false : cfg.withCredentials
	}

	// ResponseType must be 'json', 'text', 'blob' or 'arrayBuffer'
	var rt = opt.contentType.split("/")[1].split(";")[0];
	rt = rt == "html" ? "text" : rt;
	opt.responseType = !cfg.hasOwnProperty('responseType') ? rt : cfg.responseType;

	// Set string parameters, if method is get
	var paramsStr = "";
	var arrkeys = Object.keys(opt.params);
	for (var x = 0; x < arrkeys.length; x++) {
		paramsStr += arrkeys[x] + "=" + opt.params[arrkeys[x]] + '&';
	}

	paramsStr = paramsStr.substr(0, paramsStr.length - 1)

	// Make request
	var http = new XMLHttpRequest();
	http.responseType = opt.responseType;
	http.timeout = opt.timeout

	http.onloadstart = function (e) { opt.onLoadStart ? opt.onLoadStart(e) : (opt.debug ? console.log("onLoadStart", e) : null); }
	http.onload = function (e) { opt.onLoad ? opt.onLoad(e) : (opt.debug ? console.log("onLoad", e) : null); }
	http.onprogress = function (e) { opt.onProgress ? opt.onProgress(e) : (opt.debug ? console.log("onProgress", e) : null); }
	http.onloadend = function (e) { opt.onLoadEnd ? opt.onLoadEnd(e) : (opt.debug ? console.log("onLoadEnd", e) : null); }
	http.ontimeout = function (e) { opt.onTimeout ? opt.onTimeout(e) : (opt.debug ? console.log("onTimeout", e) : null); }
	http.onerror = function (e) { opt.onError ? opt.onError(e) : (opt.debug ? console.log("onError", e) : null); }
	http.onabort = function (e) { opt.onAbort ? opt.onAbort(e) : (opt.debug ? console.log("onAbort", e) : null); }

	// When request is ready...
	http.onreadystatechange = function () {
		if (http.readyState == 4 && http.status == 200) {
			if (opt.returnFullResponse)
				opt.callback(http);
			else
				opt.callback(http.response);
		}
	}

	if (opt.method.toUpperCase() == "GET") {
		http.open(opt.method, opt.url + paramsStr, opt.ajax);
		http.setRequestHeader("Content-type", opt.contentType);
		http.withCredentials = opt.withCredentials;
		http.send();
	} else {
		http.open(opt.method, opt.url, opt.ajax);
		http.setRequestHeader("Content-type", opt.contentType);
		http.withCredentials = opt.withCredentials;
		http.send(paramsStr);
	}
};

/**
	 Include files in HTML through Ajax
	 @version: 1.00
	 @author: Pablo E. Fernández (islavisual@gmail.com).
	 @Copyright 2017-2019 Islavisual.
	 @Last update: 27/02/2019
 **/

this.Include = it.Include = function (cfg) {
	// Default values to cfg
	if (typeof cfg == "undefined" || cfg == null) cfg = {};

	if ((typeof cfg == "string" && cfg == "help") || cfg.hasOwnProperty("help")) {
		if (typeof showHelper != "undefined") showHelper("Include", cfg);
		else alert("Helper not available!")
		return;
	}

	// If the request is data-include
	if (cfg.hasOwnProperty('attribute') && cfg.attribute != "") {
		dataInclude(cfg.attribute);
		return;

	} else if (cfg.hasOwnProperty('attribute') && cfg.attribute == "") {
		alert("The 'attribute' parameter can not be empty!.");
		return;
	}

	// If configuration object is invalid
	if (!cfg.hasOwnProperty('data') && !cfg.hasOwnProperty('file')) { alert("You need set a string 'data' or 'file' parameter!. Please, see the help with the Include('help');"); return false; }
	if (!cfg.hasOwnProperty('target')) { alert("You need set an object like target to execute the include!. Please, see the help with the Include('help');"); return false; }

	// Create JSON with current opt
	var opt = {
		data: !cfg.hasOwnProperty('data') ? '' : cfg.data,
		file: !cfg.hasOwnProperty('file') ? '' : cfg.file,
		target: document.getElementById(cfg.target),
	}

	if (opt.file) {
		getData(opt.target, opt.file, false);
		return;

	} else {
		opt.target.innerHTML = opt.data;
		opt.target.querySelector("script") ? execute(opt.target) : '';
	}

	function execute(trg) {
		setTimeout(function () {
			try { eval(trg.querySelector("script").innerHTML); } catch (e) { }
		}, 250);
	}

	function getData(trg, file, dIncFlag) {
		var xhttp = new XMLHttpRequest(), dIncFlag = typeof dIncFlag == "undefined" ? false : true;
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4) {
				if (this.status == 200) { trg.innerHTML = this.responseText; trg.querySelector("script") ? execute(trg) : ''; }
				if (this.status == 404) { trg.innerHTML = "Page not found."; }

				if (dIncFlag) {
					trg.removeAttribute(cfg.attribute);
					dataInclude(cfg.attribute);
				}
			}
		}

		xhttp.open("GET", file, true);
		xhttp.send();

		return;
	}

	function dataInclude(attr) {
		var z, i, trg, file, xhttp;

		z = document.querySelectorAll("[" + attr + "]");
		for (i = 0; i < z.length; i++) {
			trg = z[i];

			file = trg.getAttribute(attr);
			if (file) {
				getData(trg, file, true);

				return;
			}
		}
	}
}

/**
	 Function to detect if a device is mobile or tablet.
	 @version: 1.00
	 @author: Pablo E. Fernández (islavisual@gmail.com).
	 @Copyright 2017-2019 Islavisual.
	 @Last update: 11/03/2019
 **/
this.IsMobile = it.IsMobile = function (cfg) {
	if (typeof cfg == "undefined") cfg = {};

	if ((typeof cfg == "string" && cfg == "help") || cfg.hasOwnProperty("help")) {
		if (typeof showHelper != "undefined") showHelper("IsMobile", cfg);
		else alert("Helper not available!")
		return;
	}

	var mobile = false;
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) mobile = true;
	return mobile;
};

/**
	 Now functionality
	 @version: 1.00																					
	 @author: Pablo E. Fernández (islavisual@gmail.com).
	 @Copyright 2019 Islavisual.
	 @Last update: 14/03/2019
 **/

Date.prototype.currentDate = (function () { var local = new Date(this); local.setMinutes(this.getMinutes() - this.getTimezoneOffset()); return local.toJSON().slice(0, 10); });
this.now = it.now = function () {
	return new Date().currentDate();
}

/**
	 Create and send forms in real time.
	 @version: 1.00
	 @author: Pablo E. Fernández (islavisual@gmail.com).
	 @Copyright 2017-2019 Islavisual.
	 @Last update: 11/03/2019
	 @status PENDING to UPDATE
 **/
this.SendForm = it.SendForm = function (cfg) {
	if ((typeof cfg == "string" && cfg == "help") || cfg.hasOwnProperty("help")) {
		if (typeof showHelper != "undefined") showHelper("SendForm", cfg);
		else alert("Helper not available!")
		return;
	}

	// If configuration object is invalid
	if (!cfg.hasOwnProperty('url')) { alert("The 'url' parameter has not been supplied!.\nPlease, see the help with the SendForm('help');"); return; }
	if (!cfg.hasOwnProperty('params')) { alert("The 'params' parameter has not been supplied!.\nPlease, see the help with the SendForm('help');"); return; }

	// Create form
	var f = document.createElement("form");
	f.setAttribute('method', "post");
	f.setAttribute('action', cfg.url);
	f.style.display = "none";

	for (var i = 0; i < cfg.params.length; i++) {
		var item = cfg.params[i], p = document.createElement("input");

		p.setAttribute('type', item.type);
		p.setAttribute('name', item.id);
		p.setAttribute('id', item.id);
		p.setAttribute('value', item.value);

		f.appendChild(p);
	}
	var s = document.createElement("input");
	s.setAttribute('type', "submit");
	s.setAttribute('value', "Submit");
	f.appendChild(s);

	document.getElementsByTagName('body')[0].appendChild(f);

	s.click();
}

/**
	 StripTags functionality
	 @version: 1.00																					
	 @author: Pablo E. Fernández (islavisual@gmail.com).
	 @Copyright 2019 Islavisual.
	 @Last update: 09/02/2019
 **/

this.StripTags = it.StripTags = function (inp, allowed) {
	if ((typeof inp == "string" && inp == "help") || inp.hasOwnProperty("help")) {
		if (typeof showHelper != "undefined") showHelper("StripTags", inp);
		else alert("Helper not available!")
		return;
	}

	allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
	var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
	return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
		return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
	});
}

/**
	 TreeView functionality
	 @version: 1.00																					
	 @author: Pablo E. Fernández (islavisual@gmail.com).
	 @Copyright 2019 Islavisual.
	 @Last update: 09/03/2019
 **/

var treeviewJSON = {
	items: [{
		id: 1,
		label: "Parent 1",
		expanded: true,
		children: [{
			id: 2,
			label: "Element 1",
			children: [
				{ id: 3, label: "Child 1 of Element 1", href: '#' },
				{ id: 4, label: "Child 2 of Element 1", href: '#' },
				{ id: 5, label: "Child 3 of Element 1", href: '#' },
				{ id: 6, label: "Child 4 of Element 1", href: '#' },
				{ id: 7, label: "Child 5 of Element 1", href: '#' },
				{ id: 8, label: "Child 6 of Element 1", href: '#' },
				{ id: 9, label: "Child 7 of Element 1", href: '#' },
				{ id: 10, label: "Child 8 of Element 1", href: '#' },
				{ id: 11, label: "Child 9 of Element 1", href: '#' },
				{ id: 12, label: "Child 10 of Element 1", href: '#' },
			]
		},
		{
			id: 13,
			label: "Element 2",
			children: [
				{ id: 14, label: "Child 1 of Element 2", href: '#' },
				{ id: 15, label: "Child 2 of Element 2", href: '#' },
			]
		}]
	},
	{
		id: 16,
		label: "Parent 2",
		expanded: true,
		checkable: false,
		children: [{
			id: 17,
			label: "Element 3",
			expanded: false,
			children: [
				{ id: 18, label: "Child 1 of Element 3", href: '#' },
				{ id: 19, label: "Child 2 of Element 3", href: '#' },
			]
		},
		{
			id: 20,
			label: "Element 4",
			expanded: true,
			children: [
				{ id: 21, label: "Child 1 of Element 4", href: '#', checkable: true, checked: true },
				{ id: 22, label: "Child 2 of Element 4", href: '#', checkable: true, checked: false },
			]
		}]
	}]
}

this.Treeview = it.Treeview = function (cfg) {
	if ((typeof cfg == "string" && cfg == "help") || cfg.hasOwnProperty("help")) {
		if (typeof showHelper != "undefined") showHelper("Treeview", cfg);
		else alert("Helper not available!")
		return;
	}

	// Refreshing data
	if (typeof cfg.hasOwnProperty('data') && cfg.hasOwnProperty('refresh')) {
		var opt = this.options;
		refresh();
		return;
	}

	// Checking data
	if (typeof cfg.hasOwnProperty('id') && cfg.hasOwnProperty('checked')) {
		var opt = this.options;
		checkID();
		return;
	}

	// If configuration object is invalid
	if (!cfg.hasOwnProperty('data')) { alert("You need set an object 'data' parameter!. Please, see the help with the Treeview('help');"); return false; }
	if (!cfg.hasOwnProperty('target')) { alert("You need set an object like target to create the Treeview!. Please, see the help with the Treeview('help');"); return false; }

	// Create JSON with current opt
	var opt = {
		classLeaf: !cfg.hasOwnProperty('classLeaf') ? 'leaf-node' : cfg.classLeaf,
		collapsedIcon: !cfg.hasOwnProperty('collapsedIcon') ? '\u25BA' : cfg.collapsedIcon,
		customCheck: !cfg.hasOwnProperty('customCheck') ? '' : cfg.customCheck,
		data: cfg.data,
		expandedIcon: !cfg.hasOwnProperty('expandedIcon') ? '\u25BC' : cfg.expandedIcon,
		leafIcon: !cfg.hasOwnProperty('leafIcon') ? '' : cfg.leafIcon,
		branchIcon: !cfg.hasOwnProperty('branchIcon') ? '' : cfg.branchIcon,
		onSelectNode: !cfg.hasOwnProperty('onSelectNode') ? null : cfg.onSelectNode,
		onCheckNode: !cfg.hasOwnProperty('onCheckNode') ? null : cfg.onCheckNode,
		selectable: !cfg.hasOwnProperty('selectable') ? false : cfg.selectable,
		searchable: !cfg.hasOwnProperty('searchable') ? false : cfg.searchable,
		placeholderText: !cfg.hasOwnProperty('placeholderText') ? 'Filter...' : cfg.placeholderText,
		styles: !cfg.hasOwnProperty('styles') ? { bgTree: "rgba(0,0,0,0)", borderTree: "rgba(0,0,0,0.15)", textColor: "#000", searchColor: "#000", searchBg: "#fff", activeColor: "#ffffff", activeBg: "#000000", linkColor: "#069", linkBg: "rgba(0,0,0,0)" } : cfg.styles,
		target: document.getElementById(cfg.target),
	}

	function render(items, target, level) {
		if (level == 0) {
			target.classList.add("treeview");

			if (opt.searchable) {
				var input = document.createElement("input");
				input.setAttribute("type", "search");
				input.setAttribute("placeholder", opt.placeholderText);
				input.setAttribute("name", "twSearch");

				var li = document.createElement("li");
				li.classList.add('search-box');
				li.appendChild(input);

				target.appendChild(li);
			}
		}

		for (var i = 0; i < items.length; i++) {
			var item = items[i];

			// Set values by default
			item.expanded = item.hasOwnProperty('expanded') ? item.expanded : false;
			item.checkable = item.hasOwnProperty('checkable') ? item.checkable : false;
			item.checked = item.hasOwnProperty('checked') ? item.checked : false;

			// Create li item 
			var li = document.createElement("li");
			li.classList.add(item.expanded ? 'expanded' : 'collapsed');
			li.classList.add('level-' + (level + 1));

			target.appendChild(li);

			// Insert toggler
			if (item.hasOwnProperty('children')) {
				var toggler = document.createElement("i");
				toggler.setAttribute("class", "toggler");
				toggler.innerHTML = item.expanded ? opt.expandedIcon : opt.collapsedIcon;

				li.appendChild(toggler);
			}

			// Insert checkbox
			if (item.hasOwnProperty('checkable') && item.checkable && opt.customCheck.trim() == '') {
				var chk = document.createElement("input");
				chk.setAttribute("type", "checkbox");
				chk.setAttribute("name", "twNode" + (level + "" + i));
				if (item.hasOwnProperty("id")) chk.setAttribute("data-id", item.id);
				chk.checked = item.hasOwnProperty('checked') ? item.checked : false;

				li.appendChild(chk);
			} else if (item.hasOwnProperty('checkable') && item.checkable && opt.customCheck.trim() != "") {
				li.innerHTML += opt.customCheck;
			}

			// Insert checkbox
			if (item.hasOwnProperty('href')) {
				var a = document.createElement("a");
				a.setAttribute("href", item.href);
				a.innerHTML = '<span rel="label" ' + (item.hasOwnProperty("id") ? ('data-id="' + item.id + '"') : '') + '>' + item.label + '</span>';

				li.appendChild(a);
			} else {
				var s = document.createElement("span");
				s.setAttribute("rel", "label");
				s.innerHTML = item.label;

				if (item.hasOwnProperty("id")) s.setAttribute("data-id", item.id);

				li.appendChild(s);
			}

			if (item.hasOwnProperty('children')) {
				var ul = document.createElement("ul");
				if (opt.hasOwnProperty('branchIcon')) {
					li.innerHTML = '<i class="icon">' + opt.branchIcon + "</i>" + li.innerHTML;
				}

				li.appendChild(ul);

				render(item.children, ul, level + 1);
			} else {
				if (opt.classLeaf.trim() != "") li.classList.add(opt.classLeaf);
				if (opt.hasOwnProperty('leafIcon')) {
					li.innerHTML = '<i class="icon">' + opt.leafIcon + "</i>" + li.innerHTML;
				}
			}
		}
	}

	// function to refresh all data
	function refresh() {
		opt.data = cfg.data;
		opt.target.innerHTML = "";
		cfg = opt;
		init();
	}

	// function to check one item
	function checkID() {
		opt.target.querySelector("input[data-id='" + cfg.id + "']").checked = cfg.checked;
	}

	function assignEvents() {
		// Toggle status to hierarchical list
		var items = opt.target.querySelectorAll(".toggler");
		for (var i = 0; i < items.length; i++) {
			var item = items[i];

			item.addEventListener("click", function (e) {
				var trg = e.target;
				if (!trg.classList.contains("toggler")) {
					trg = trg.parentElement;
				}

				var nItems = trg.nextElementSibling.nextElementSibling.querySelectorAll("li").length
				var mh = document.querySelector(".treeview span").offsetHeight * nItems;

				trg.nextElementSibling.nextElementSibling.style.maxHeight = trg.parentElement.classList.contains("collapsed") ? (mh + "px") : "0";
				trg.parentElement.classList.toggle("collapsed");
				trg.innerHTML = trg.parentElement.classList.contains("collapsed") ? opt.collapsedIcon : opt.expandedIcon;
			});
		}

		// Event to set active node when this is focused
		if (opt.selectable) {
			var items = opt.target.querySelectorAll("span");
			for (var i = 0; i < items.length; i++) {
				var item = items[i];

				item.addEventListener("click", function (e) {
					var span = e.target;

					// Reset active items
					var items = opt.target.querySelectorAll("span");
					for (var i = 0; i < items.length; i++) {
						items[i].classList.remove("active");
					}

					span.classList.toggle("active");

					if (opt.onSelectNode) opt.onSelectNode(span);
				});
			}
		}

		// Event to set active node when this is focused
		var items = opt.target.querySelectorAll("input");
		for (var i = 0; i < items.length; i++) {
			var item = items[i];

			item.addEventListener("change", function (e) {
				if (opt.onCheckNode) opt.onCheckNode(e.target);
			});
		}

		// Filter elements from Treeview
		if (opt.searchable) {
			opt.target.querySelector('[type=search]').addEventListener("input", function (e) {
				var items = opt.target.querySelectorAll("li:not(.search-box)"), str = e.target.value.trim();

				for (var x = 0; x < items.length; x++) {
					var item = items[x];

					item.style.display = "";
					if (str > 0 && item.querySelector("span").innerHTML.indexOf(str) != -1) {
						var aux = item.parentElement
						while (!aux.classList.contains("treeview")) {
							if (item.tagName.toLowerCase() == "li") {
								aux.style.display = "";
								if (aux.classList.contains("collapsed")) {
									aux.classList.remove("collapsed");
									aux.classList.add("expanded");
									if (!aux.classList.contains("leaf-node")) aux.querySelector(".toggler").innerHTML = opt.expandedIcon;
								}
							}
							aux = aux.parentElement;
						}

					} else if (str.length > 0) {
						item.style.display = "none";
						if (item.classList.contains("expanded")) {
							item.classList.remove("expanded");
							item.classList.add("collapsed");
							if (!item.classList.contains("leaf-node")) item.querySelector(".toggler").innerHTML = opt.collapsedIcon;
						}
					} else {
						item.style.display = "";
						if (item.classList.contains("collapsed")) {
							item.classList.remove("collapsed");
							item.classList.add("expanded");
							if (!item.classList.contains("leaf-node")) item.querySelector(".toggler").innerHTML = opt.expandedIcon;
						}
					}
				}
			});
		}
	}

	function addRules() {
		if(typeof it.AddCSSRule != "undefined"){
			AddCSSRule('', "ul.treeview", "background: " + opt.styles.bgTree + "; width: 100%; border: 1px solid " + opt.styles.borderTree + "; padding: 5px;");
			AddCSSRule('', "ul.treeview, ul.treeview ul", "list-style: none;", 0);
			AddCSSRule('', "ul.treeview li", "color: " + opt.styles.textColor + ";");
			AddCSSRule('', "ul.treeview li i", "cursor: pointer;");
			AddCSSRule('', "ul.treeview li ul", "transition: 0.3s; max-height: 10000px; overflow: hidden;");
			AddCSSRule('', "ul.treeview li.collapsed ul", "max-height: 0;");
			AddCSSRule('', "ul.treeview li a", "color: " + opt.styles.linkColor + "; background: " + opt.styles.linkBg + ";");
			AddCSSRule('', "ul.treeview li span", "padding: 2px 5px; display: inline-block;");
			AddCSSRule('', "ul.treeview li i.icon", "margin-right: 8px;");
			AddCSSRule('', "ul.treeview li.search-box input", "width: 100%; background: " + opt.styles.searchBg + "; color: " + opt.styles.searchColor + "; border: 1px solid rgba(0,0,0,0.1)");
			AddCSSRule('', "ul.treeview li .active", "background: " + opt.styles.activeBg + "; color: " + opt.styles.activeColor + ";");
		}
	}

	function init() {
		// Add rules
		addRules();

		// Render tree
		render(opt.data.items, opt.target, 0);

		// Assign events to element
		assignEvents();
	}

	init();

	it[opt.target.id] = {};
	it[opt.target.id]['options'] = opt;
	it[opt.target.id]['Treeview'] = Treeview;
}

/**
	 Validator functionality
	 @version: 1.00
	 @author: Pablo E. Fernández (islavisual@gmail.com).
	 @Copyright 2017-2019 Islavisual.
	 @Last update: 17/03/2019
 **/
this.Validator = it.Validator = {
	setTarget: function(e){
		this.opt.target = document.getElementById(e);
	},
	opt: {},
	help: function(cfg){
		if(typeof cfg == "undefined") cfg = {help: ''};
		if(!cfg.hasOwnProperty("help")) cfg.help = '';

		if (typeof showHelper != "undefined") showHelper("Validator", cfg);
		else alert("Helper not available!")
		return;
	},
	set: function(cfg){
		// Assign options and mandatories
		var msg = this._assignOptions(cfg);
		if(msg != "") return this._showErrorMessage(msg);

		// Get constraints and values
		if(cfg.hasOwnProperty("constraint")){
			var p = '(!=|==|===|<|>|<=|>=';
			var c = cfg.constraint.match(new RegExp ('[' + p + ']', 'g')), v = cfg.constraint.match(new RegExp ('[^' + p + ']', 'g')).join('');
				c = c != null ? c.join('') : '';
		}

		// Set required attribute
		if(cfg.hasOwnProperty("required") && cfg.required) cfg.target.setAttribute("required", "required");

		// Set pattern attribute
		if(cfg.hasOwnProperty("pattern")) cfg.target.setAttribute("pattern", cfg.pattern);

		// Assign configuration
		cfg = this.opt;

		var aux, auxi, auxv;
		if(cfg.hasOwnProperty("oninvalid")){
			this.onInvalid(cfg.oninvalid);
			return;

		} else if(Object.values(p.split("|")).indexOf(c) != -1 && c != ""){
			var fc = 'e.target.value';
			if(!isNaN(v)) fc = '!isNaN(' + fc + ') && parseFloat(' + fc + ')';
			
			aux = '	if (' + fc + ' ' + c + " " + v + ') {\n __AUXV__ } else {\n __AUXI__ }';
		} else {
			aux = 'if (' + cfg.constraint + ') {\n __AUXV__ } else {\n __AUXI__ }';
		}

		// If fixed is enable, add message under input
		var fa = this._fixed(cfg) ? '	Validator.addMessage(e.target);\n' : '';
		var fr = this._fixed(cfg) ? '	if(e.target.nextElementSibling != null && e.target.nextElementSibling.classList.contains("validator-error-msg")) e.target.nextElementSibling.remove();\n' : '';

		auxv  = '	e.target.setCustomValidity("");\n';
		auxv += '	e.target.classList.remove("validator-error");\n';
		auxv += fr;
		auxi  = '	e.target.setCustomValidity("' + cfg.message + '");\n';
		auxi += '	e.target.classList.add("validator-error")\n';
		auxi += fa;

		this.newValidation('invalid', auxi);
		this.newValidation('input', aux.replace(/__AUXV__/ig, auxv).replace(/__AUXI__/ig, auxi));
	},
	newValidation: function(type, fn){
		if (type == null || type == "") { return this._showErrorMessage("Type validation not valid!.\nPlease, see the help with the Validator('help');"); }
		if (fn == null || fn == "") { return this._showErrorMessage("Function code is empty!.\nPlease, see the help with the Validator('help');"); }
		
		var prefix = '';
		if(this.opt.fixed) prefix = 'e.preventDefault();\n';

		fn = 'document.getElementById("' + this.opt.target.id + '").addEventListener("' + type + '", function(e){\n' + prefix + fn + '\n});';
		eval(fn);
	},
	onInvalid: function(msg){
		// Not soported IE9- and Safari
		if (msg == null || msg == "") { return this._showErrorMessage("Message no valid!.\nPlease, see the help with the Validator('help');"); }
		
		this.opt.target.setAttribute("oninvalid", "this.setCustomValidity('" + this.opt.oninvalid + "'); this.classList.add('validator-error'); Validator.addMessage(this);");
		this.opt.target.setAttribute("oninput", "this.setCustomValidity(''); this.classList.remove('validator-error'); try{ this.nextElementSibling.remove(); } catch(e) {}");
	},
	_fixed: function(cfg){
		var f = false;
		if((cfg.hasOwnProperty("fixed") && cfg.fixed) || (cfg.hasOwnProperty("messages") && cfg.messages.hasOwnProperty("fixed") & cfg.messages.fixed)) f = true;

		return f;
	},
	fileset: function(cfg){
		// Assign options and mandatories
		var msg = this._assignOptions(cfg);
		if(msg != "") return this._showErrorMessage(msg);

		var fa = this._fixed(cfg) ? '		Validator.addMessage(e.target);\n' : '';
		var fr = this._fixed(cfg) ? '		try{ e.target.nextElementSibling.remove(); } catch(e) {}\n' : '';

		// Set accpet attribute
		if(cfg.hasOwnProperty("accept") && cfg.accept != "") cfg.target.setAttribute("accept", cfg.accept);

		// Set required attribute
		if(cfg.hasOwnProperty("required") && cfg.required) cfg.target.setAttribute("required", "required");

		// Assign configuration
		cfg = this.opt;

		// Limit file maxsize
		if(cfg.hasOwnProperty("maxsize")){
			var aux = 'var el = e.target;\n';
				aux += 'for(var i = 0; i < el.files.length; i++){\n';
				aux += '	if(el.files[i].size > ' + cfg.maxsize + ' * 1024){\n';
				aux += '		el.setCustomValidity(el.files[i].name + ": ' + (cfg.hasOwnProperty("messages") ? cfg.messages.maxsize : cfg.message) + '");\n';
				aux += '		el.classList.add("validator-error");\n';
				aux += '		e.value = ""\n';
				aux += fa;
				aux += '		return false;\n';
				aux += '	} else {\n';
				aux += '		e.target.setCustomValidity("");\n';
				aux += '		e.target.classList.remove("validator-error");\n';
				aux += fr;
				aux += '		return false;\n';
				aux += '	}\n';
				aux += '}\n';
			this.newValidation('change', aux);
			this.newValidation('invalid', aux);
		}

		// Enabling preview
		if(cfg.hasOwnProperty("preview")){
			cfg.target.addEventListener("change", function(e){
				var el = e.target;
				if (el.files && el.files[0]) {
					var reader = new FileReader();
					reader.onload = function(e) {
						cfg.thumbnail.innerHTML = '<img src="'+e.target.result+'"/>';
					};
					reader.readAsDataURL(el.files[0]);
				}
			});
		}
	},
	_assignOptions: function(cfg){
		var msg = "";

		cfg.target = document.getElementById(cfg.target);
		this.opt = cfg; 

		if (!cfg.hasOwnProperty('target')) msg = "'target' parameter is not defined!.\nPlease, see the help with the Validator('help');";

		if((!cfg.hasOwnProperty('message') || cfg.message == "") && !cfg.hasOwnProperty('messages') && !cfg.hasOwnProperty("oninvalid")){
			msg = "You needs set 'message' or 'messages' parameter!.\nPlease, see the help with the Validator('help');";
		}
		if(!cfg.hasOwnProperty('messages')){
			this.opt.fixed = !cfg.hasOwnProperty('fixed') ? false : cfg.fixed;
		}
		if (cfg.hasOwnProperty('messages')) {
			if (!cfg.hasOwnProperty('maxsize')) this.opt.messages.maxsize = "";
			if (!cfg.hasOwnProperty('accept')) this.opt.messages.accept = "";
			if (!cfg.hasOwnProperty('fixed')) this.opt.messages.fixed = false;
		}
		return msg;
	},
	addMessage: function(trg){
		var ns = trg.nextElementSibling;
		var exists = !ns ? false : ns.classList.contains("validator-error-msg");

		if(!exists){
			var aux = document.createElement("span");
				aux.setAttribute("class", "validator-error-msg");
				aux.innerHTML = trg.validationMessage;

			trg.parentNode.insertBefore(aux, trg.nextSibling);
		} else {
			ns.innerHTML = trg.validationMessage;
		}

		if(typeof it.AddCSSRule != "undefined"){
			AddCSSRule('', ".validator-error-msg",  'background: rgba(255,0,0,0.1); width: 100%; display: block; padding: 5px; border: 1px solid rgba(255,0,0,0.2);');
		}
	},
	_showErrorMessage: function(msg){
		try { Alert(msg); } catch(e) { alert(msg); }
		return false;
	}
}