this.it = {
	name: "isiTools",
	version: 1.0,
	author: "Pablo E. Fernández (islavisual@gmail.com)",
	copyright: "2017-2019 Islavisual",
	lastupdate: "03/04/2019",
	enabledModules: {},
	autoload: function(cfg){
		if(typeof cfg != "undefined" || cfg == null){
			var http = new XMLHttpRequest();

			// When request is ready...
			http.onreadystatechange = function () {
				if (http.readyState == 4 && http.status == 200) {
					isiToolsCallback(JSON.parse(http.response).modules);
				}
			}

			// Get current path
			var curs = document.querySelectorAll("script");
				curs = curs[curs.length - 1].src;
			var dirn = curs.substring(curs.lastIndexOf('/') + 1); 
				dirn = curs.replace(dirn, '')
			
			http.open('GET', dirn+'config.json', false);
			http.send();
		} else {
			isiToolsCallback(cfg);
		}
	},
}

it.autoload();

function isiToolsCallback(json){
	var lstScript = document.querySelectorAll("script");
	lstScript = lstScript[lstScript.length - 1].src;

	// Load by module
	if(lstScript.indexOf("?modules=") != -1){
		lstScript = lstScript.split("?modules=")[1].split("+");
		
		// Set all plugins to false
		for(var key in json){ json[key] = false; }

		// Enable only sent by url
		for(var i = 0; i < lstScript.length; i++){
			var item = lstScript[i];
	
			json[item] = true;
		}
	}

	it.enabledModules = json;

	/**
		 AddCSSRule functionality																		
		@version: 1.00																					
		@author: Pablo E. Fernández (islavisual@gmail.com).												
		@Copyright 2017-2019 Islavisual. 																	
		@Last update: 13/03/2019																			
	**/
	if(json.AddCSSRule){
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
	}
	
	/**
		 Custom alerts functionality
		@version: 1.00
		@author: Pablo E. Fernández (islavisual@gmail.com).
		@Copyright 2017-2019 Islavisual.
		@Last update: 12/03/2019
	**/
	if(json.Alert){
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
	}

	/**
		 Autocomplete functionality
		@version: 1.00
		@author: Pablo E. Fernández (islavisual@gmail.com).
		@Copyright 2017-2019 Islavisual.
		@Last update: 26/02/2019
	**/
	if(json.Autocomplete){
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
				startsWith: !cfg.hasOwnProperty('startsWith') ? false : cfg.startsWith,
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
					var cval = '', found;
					if(opt.format != "layer"){
						cval = '|';
						for(var keyVal in opt.data[i]){
							var valAux = opt.data[i][keyVal];
							cval += (typeof valAux == "object" ? valAux.join("|") : valAux) + "|";
						}
					} else {
						cval = opt.data[i];
					}
					
					// Check if the entry stars with and if the format is object
					if(opt.format != "layer"){
						if(opt.startsWith){
							found = cval.toUpperCase().indexOf('|' + val.toUpperCase()) != -1;
						} else {
							found = cval.toUpperCase().indexOf(val.toUpperCase()) != -1;
						}
					} else {
						if(opt.startsWith){
							found = cval.toUpperCase().indexOf(val.toUpperCase()) == 0;
						} else {
							found = cval.toUpperCase().indexOf(val.toUpperCase()) != -1;
						}
					}
					
					// If item is found
					if (found) {
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
							b.innerHTML += "<input type='hidden' data-id='" + opt.target.id + "' data-index='" + i + "' value='" + cval + "'>";
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
								if(opt.startsWith){
									found = cval.toUpperCase().indexOf('|' + val.toUpperCase()) != -1;
								} else {
									found = cval.toUpperCase().indexOf(val.toUpperCase()) != -1;
								}
								if (opt.startsWith ? (opt.data[i].items[z].toUpperCase().indexOf(val.toUpperCase()) == 0) : (opt.data[i].items[z].toUpperCase().indexOf(val.toUpperCase()) != -1)) {
									b = document.createElement("div");
									b.classList.add("value");
									b.style.width = "100%";
									b.innerHTML += "<span>" + opt.data[i].items[z] + "</span>";
									b.innerHTML += "<input type='hidden' data-id='" + opt.target.id + "' data-index='" + i + "," + z + "' value='" + opt.data[i].items[z] + "'>";
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
	}

	/**
		 Benchmark functionality
		@version: 1.00
		@author: Pablo E. Fernández (islavisual@gmail.com).
		@Last update: 15/03/2019
	**/
	if(json.Benchmark){
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
				if(typeof cfg.name == "undefined"){ alert("You need to specify a name or condition\nPlease see the Benchmark.help();"); return; }
				if(typeof cfg.fn == "undefined"){ alert("You need to specify a function where test the name or condition!\nPlease see the Benchmark.help();"); return; }

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
	}

	/**
		 Constraint to input functionality
		@version: 1.00
		@author: Pablo E. Fernández (islavisual@gmail.com).
		@Copyright 2017-2019 Islavisual.
		@Last update: 04/03/2019
	**/
	if(json.Constraint){
		this.Constraint = it.Constraint = {
			version: '1.01',
			options: {},
			help: function(cfg){
				if(typeof cfg == "undefined") cfg = {help: ''};
				if(!cfg.hasOwnProperty("help")) cfg.help = '';

				if (typeof showHelper != "undefined") showHelper("Constraint", cfg);
				else alert("Helper not available!")
				return;
			},
			increment: function(t){
				var opt = document[t].options;
				if (opt.type == 'hour') {
					this._setHour(document.getElementById(opt.target), "up");
				} else {
					this._setNumber(document.getElementById(opt.target), "up");
				}
			},
			decrement: function(t){
				var opt = document[t].options;
				if (opt.type == 'hour') {
					this._setHour(document.getElementById(opt.target), "down");
				} else {
					this._setNumber(document.getElementById(opt.target), "down");
				}
			},
			set: function (cfg){
				// If configuration object is invalid
				if (!cfg.hasOwnProperty('target')) { alert("You need set an input ID into 'target' parameter!. Please, see the help with the Constraint.help();"); return false; }
				if (document.getElementById(cfg.target) == null) { alert("The element with ID '" + cfg.target + "' not exists!"); return false; }
				if (!cfg.hasOwnProperty('type')) { alert("You need set an input type!. Please, see the help with the Constraint.help();"); return false; }

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

				// Update input type assigned
				document.getElementById(opt.target).setAttribute("type", "text");
				
				if (opt.custom && opt.function == null) alert("You must define a function. Please, see the help with the Constraint('help');");

				// Set events to input
				function assignEvents(textbox, type, ds) {
					["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
						textbox.addEventListener(event, function () {
							var valid;
							if(type == "decimal" || type == "float"){ valid = Constraint._types[type](this.value, ds); } 
							else { valid = Constraint._types[type](this.value); }

							if(valid){ this.oldValue = this.value; } 
							else if (this.hasOwnProperty("oldValue")) { this.value = this.oldValue; }

							return valid;
						});
					});
				}

				// Set indicators into input
				if (opt.indicators.enabled) {
					var input = document.getElementById(opt.target), iDown = document.createElement("div"), iUp = document.createElement("div");
					iDown.setAttribute("class", "caret-down");
					iDown.setAttribute("onclick", 'Constraint.decrement("' + opt.target + '")');
					iDown.style = 'cursor: pointer; border: 5px solid red; border-width: 5px 5px 0 5px; border-color: ' + opt.indicators.color + ' transparent transparent transparent; width: 7px; position: absolute; bottom: 0; margin: 10px; right: 15px;';
					iUp.setAttribute("class", "caret-up");
					iUp.setAttribute("onclick", 'Constraint.increment("' + opt.target + '")');
					iUp.style = 'cursor: pointer; border: 5px solid red; border-width: 0 5px 5px 5px; border-color: transparent transparent ' + opt.indicators.color + ' transparent; width: 7px; position: absolute; bottom: 10px; margin: 10px; right: 15px;';

					input.parentNode.insertBefore(iDown, input.nextSibling);
					input.parentNode.insertBefore(iUp, input.nextSibling);

					// Add events of increment and decrement
					input.addEventListener("keydown", function (e) {
						if (e.keyCode == 38) {
							if (opt.type == "hour") {
								Constraint._setHour(e.target, 'up');
								return false;
							} else {
								Constraint._setNumber(e.target, 'up');
							}


						} else if (e.keyCode == 40) {
							if (opt.type == "hour") {
								Constraint._setHour(e.target, 'down');
								return false;
							} else {
								Constraint._setNumber(e.target, 'down');
							}
						}

						return true;
					});
				}

				// Enable control
				assignEvents(document.getElementById(opt.target), opt.type, opt.ds);

				document[opt.target] = {};
				document[opt.target]['Constraint'] = Constraint;
				document[opt.target]['options'] = opt;
				return this;
			},
			_setNumber: function(e, d){
				var opt = document[e.id].options, aux = '';
				var d = (d == 'down' ? -1 : 1) * opt.step;
				var v = parseFloat(opt.ds != "." ? e.value.replace(opt.ds, ".") : e.value);
				var md = parseInt((Math.abs(d) < 1.0) ? d.toString().split(".")[1].length : 0);
				var dec = e.value.indexOf(opt.ds) != -1 ? (e.value.length - e.value.indexOf(opt.ds) - 1) : md;
				dec = dec < md ? md : dec;

				if (opt.base != 10) {
					aux = parseInt(e.value, opt.base) + d;
					aux = aux.toString(opt.base);
				} else {
					aux = (v + d).toFixed(dec);
					aux = opt.ds != "." ? aux.toString().replace(".", opt.ds) : aux;
				}

				var _type = opt.type, valid;
				if(_type == "decimal" || _type == "float"){
					valid = Constraint._types[opt.type](aux, opt.ds);
				} else {
					valid = Constraint._types[opt .type](aux);
				}
				
				if(!valid) aux = '0';
				e.value = aux;
			},
			_setHour: function(e, d) {
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

				var valid = Constraint._types[document[e.id].options.type](aux);
				if(!valid && aux.toString().length < 3) aux = '00:00';
				else if(valid && aux.toString().length < 3) aux = aux + ':00';
				else if(!valid) aux = e.value;
				e.value = aux;
				
				setTimeout(function () { e.setSelectionRange(sp, sp); }, 10);
			},
			_types: {
				// Formats by default
				int: function (value) { return /^-?\d*$/.test(value); },
				uint: function (value) { return /^\d*$/.test(value); },
				float: function (value, ds) { return new RegExp('^-?\\d*[' + ds + ']?\\d*$').test(value); },
				decimal: function (value, ds) { return new RegExp('^-?\\d*[' + ds + ']?\\d{0,2}$').test(value); },
				percent: function (value) { return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 100); },
				binary: function (value) { return /^(0|1)*$/.test(value); },
				hexadecimal: function (value) { return /^[0-9a-f]*$/i.test(value); },
				hour: function (value) { return /^([0-2]{0,1}|0[0-9]|1[0-9]|2[0-3])([:]?|:[0-5]{1}[0-9]{0,1})$/.test(value); },
				custom: this.function ? this.function : null,
			}
		}
	}

	/**
		 IntelliForm functionality
		@version: 1.00
		@author: Pablo E. Fernández (islavisual@gmail.com).
		@Copyright 2017-2019 Islavisual.
		@Last update: 19/03/2019
	**/
	if(json.IntelliForm){
		this.IntelliForm = it.IntelliForm = {
			sequenceList: [],
			sequence: [],
			undo: {},
			redo: {},
			target: [],
			_startAt: -1,
			version: '1.0',
			help: function(cfg){
				if(typeof cfg == "undefined") cfg = {help: ''};
				if(!cfg.hasOwnProperty("help")) cfg.help = '';

				if (typeof showHelper != "undefined") showHelper("IntelliForm", cfg);
				else alert("Helper not available!")
				return;
			},
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
						if(e.style.length != 0) e.setAttribute("data-style", e.getAttribute("style").replace(/\s{2,8}/g, ' ').trim());
						e.style.background = "#2f2f2f";
						e.style.boxShadow = "0 0 2px 1px #fff";
						e.style.color = "#ffffff";

						var aux = document.querySelector('[for=' + e.id + ']');
						if( aux != null){
							if(aux.style.length != 0) aux.setAttribute("data-style", aux.getAttribute("style").replace(/\s{2,8}/g, ' ').trim());
							aux.style.background = "#2f2f2f";
							aux.style.color = "#ffffff";
						};
					}
				}
				
				// focusout the current element
				function _blur(e){
					if(e != null){
						e.style.background = "";
						e.style.boxShadow = "";
						e.style.color = "";
						if(e.getAttribute("data-style")) e.style = e.dataset.style;

						var aux = document.querySelector('[for=' + e.id + ']');
						if( aux != null){
							aux.style.background = "";
							aux.style.boxShadow = "";
							aux.style.color = "";
							if(aux.getAttribute("data-style")) aux.style = aux.dataset.style;
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
		}
	}

	/**
		 Debugger functionality
		@version: 1.00
		@author: Pablo E. Fernández (islavisual@gmail.com).
		@Copyright 2017-2019 Islavisual.
		@Last update: 15/03/2019
	**/
	if(json.Debugger){
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
				ajaxBeforeSend:'PROCESSING request <url> in format <type>. Result: <statusText>.',
				ajaxComplete:'The Ajax processing request FINISHED for the <url> file. Result: <statusText>.',
				ajaxSuccess:'The Ajax request was completed SUCCESSFULLY for the <url> file.',
				ajaxError:'An error occurred into Ajax processing request into <url> file. Result: <statusCode>: <statusText>.',
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
				} else {
					var oldXHR = window.XMLHttpRequest;
					function newXHR() {
						var realXHR = new oldXHR();

						//open(method, url, async, user, psw)
				
						realXHR.addEventListener("readystatechange", function(e) { 
							if(this.readyState == 1){
								// Client has been created. open() not called yet.
								Debugger.showMessage(this.responseURL + ': Client has been created. open() not called yet.', 'proccessing');

							} else if(this.readyState == 2){
								// Has been called. The headers and status are available.
								Debugger.showMessage(this.responseURL + ' has been called. The headers and status are available.', 'proccessing');

							} else if(this.readyState == 3){
								// Request in progress

								var s = Debugger.messages.ajaxBeforeSend.replace('<type>', this.responseType).replace('<url>', this.responseURL).replace('<statusText>', this.statusText);
								Debugger.showMessage(s, 'proccessing');

							} else if(this.readyState == 4 && this.status == 200){
								// Request successfully completed
								var s = Debugger.messages.ajaxSuccess.replace('<url>', this.responseURL);
								Debugger.showMessage(s, 'updated');

							} else if(this.readyState == 4 && this.status >= 400){
								// Request had errors
								Debugger.showMessage(Debugger.messages.ajaxError+(Debugger.target=='console'?'\n':'<br/>')+" Status Error: "+this.status+(Debugger.target=='console'?'\n':'<br/>')+"Status Text: "+this.statusText+(Debugger.target=='console'?'\n':'<br/>')+"Description: "+this.responseText, 'error');

							} else if(this.readyState == 4){
								// Request is done
								var s = Debugger.messages.ajaxComplete.replace('<url>', this.url).replace('<statusText>', this.statusText);
								Debugger.showMessage(s, 'readyState');
							}
						}, false);
				
						return realXHR;
					}
				
					window.XMLHttpRequest = newXHR;
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
									if(e.shifdata-tkey || charCode == 16){ strCombKey += "Shift + "; codeCombKey = "16 + "; }
									if(e.ctrlKey  || charCode == 17){ strCombKey += "Ctrl + ";  codeCombKey = "17 + "; }
									if(e.aldata-tkey   || charCode == 18){ strCombKey += "Alt + ";   codeCombKey = "18 + "; }

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
	}

	/**
		 Simple DOM ready() detection in pure JS.
		@version: 1.00
		@author: Carl Danley.
		@Copyright 2017-2019 Islavisual.
		@Last update: 04/03/2019
	**/
	if(json.DOM){
		this.DOM = it.DOM = new function () {
			var IS_READY = false;
			var CALLBACKS = [];
			var SELF = this;

			SELF.ready = function (callback) {
				if (typeof callback == "string" && callback == "help" || callback.hasOwnProperty("help")) {
					if (typeof showHelper != "undefined") showHelper("DOM", callback);
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
	}

	/**
		 Get Browser Plugin
		@version: 1.02
		@author: Pablo E. Fernández (islavisual@gmail.com).
		@Copyright 2017-2019 Islavisual.
		@Last update: 05/03/2019
	**/
	if(json.GetBrowser){
		this.GetBrowser = it.GetBrowser = function (cfg) {
			if (typeof cfg == "undefined") cfg = {};

			if ((typeof cfg == "string" && cfg == "help") || cfg.hasOwnProperty("help")) {
				if (typeof showHelper != "undefined") showHelper("GetBrowser", cfg);
				else alert("Helper not available!")
				return;
			}

			var e, r = navigator.userAgent, t = r.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; /trident/i.test(t[1]) && (e = /\brv[ :]+(\d+)/g.exec(r) || [], t[1] = "Internet Explorer", t[2] = e[1]), "Chrome" === t[1] && (e = r.match(/\b(OPR|Edge)\/(\d+)/), t[1] = null != e ? e.slice(1).join(" ").replace("OPR", "Opera") : "Chrome"), t = t[2] ? [t[1], t[2]] : [navigator.appName, navigator.appVersion, "-?"], null != (e = r.match(/version\/(\d+)/i)) && t.splice(1, 1, e[1]); var o = /firefox/.test(navigator.userAgent.toLowerCase()) && !/webkit    /.test(navigator.userAgent.toLowerCase()), a = /webkit/.test(navigator.userAgent.toLowerCase()), s = /opera/.test(navigator.userAgent.toLowerCase()), n = /edge/.test(navigator.userAgent.toLowerCase()) || /msie/.test(navigator.userAgent.toLowerCase()) || /msie (\d+\.\d+);/.test(navigator.userAgent.toLowerCase()) || /trident.*rv[ :]*(\d+\.\d+)/.test(navigator.userAgent.toLowerCase()), i = n ? "" : a ? "-webkit-" : o ? "-moz-" : ""; return { name: t[0], version: t[1], firefox: o, opera: s, msie: n, chrome: a, prefix: i }
		};
	}

	/**
		 Get parameter from url
		@version: 1.02
		@author: Pablo E. Fernández (islavisual@gmail.com).
		@Copyright 2017-2019 Islavisual.
		@Last update: 05/03/2019
	**/
	if(json.GetParam){
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
	}

	/**
		 HttpRequest functionality																		
		@version: 2.00																					
		@author: Pablo E. Fernández (islavisual@gmail.com).												
		@Copyright 2017-2019 Islavisual. 																	
		@Last update: 27/02/2019																			
	**/
	if(json.HttpRequest){
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
	}

	/**
		 Include files in HTML through Ajax
		@version: 1.00
		@author: Pablo E. Fernández (islavisual@gmail.com).
		@Copyright 2017-2019 Islavisual.
		@Last update: 27/02/2019
	**/
	if(json.Include){
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
	}

	/**
		 Function to detect if a device is mobile or tablet.
		@version: 1.00
		@author: Pablo E. Fernández (islavisual@gmail.com).
		@Copyright 2017-2019 Islavisual.
		@Last update: 11/03/2019
	**/
	if(json.IsMobile){
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
	}
	
	/**
		Multi-Language functionality
		@version: 1.00
		@author: Pablo E. Fernández (islavisual@gmail.com).
		@Copyright 2017-2019 Islavisual.
		@Last update: 31/03/2019
	**/
	
	if(json.Language){
		this.Language = it.Language = {
			version: '1.0',
			translations: {},
			selectedLang: '',
			availableLangs: [],
			help: function(cfg){
				if(typeof cfg == "undefined") cfg = {help: ''};
				if(!cfg.hasOwnProperty("help")) cfg.help = '';

				if (typeof showHelper != "undefined") showHelper("Language", cfg);
				else alert("Helper not available!")
				return;
			},
			get: function(id, lang){
				if(typeof id == "undefined" || id.trim() == ""){
					alert("You need to specify a string id to translate.\nPlease see the Language.help();")
				}

				if(typeof lang == "undefined" || lang.trim() == ""){
					lang = this.selectedLang;
				}
				
				var tkeys = this.translations[lang];
				
				for(var x = 0; x < tkeys.length; x++){
					var item = tkeys[x];
					
					if(item.id == id) return item.text;
				}
				
				return id;
			},
			set: function(lang){
				if(typeof lang == "undefined" || lang.trim() == "" || lang.length < 5){
					alert("The language must be described using BCP 47 language tags.\nPlease see the Language.help();")
				}
				this.selectedLang = lang;
				sessionStorage.setItem("itLang", lang)
			},
			render: function(){
				// Replace labels
				var items = document.querySelectorAll("[data-tkey]");
				for(var x = 0; x < items.length; x++){
					var item = items[x], tn = item.tagName.toLowerCase();
					
					if(tn == "input" || tn == "select" || tn == "textarea"){
						item.value = this.get(item.getAttribute("data-tkey"));
					} else {
						item.innerHTML = this.get(item.getAttribute("data-tkey"));
					}
					item.setAttribute("lang", this.selectedLang);
				}
				
				// Replace common attributes (title, placeholder,...)
				var items = document.querySelectorAll("[placeholder], [title]");
				for(var x = 0; x < items.length; x++){
					var item = items[x];
					
					if(item.getAttribute("title")){
						if(!item.getAttribute("data-title-tkey")){
							item.setAttribute("data-title-tkey", item.getAttribute("title"));
						}

						item.setAttribute("title", this.get(item.getAttribute("data-title-tkey")));
					}

					if(item.getAttribute("placeholder")){
						if(!item.getAttribute("data-placeholder-tkey")){
							item.setAttribute("data-placeholder-tkey", item.getAttribute("placeholder"));
						}
						
						item.setAttribute("placeholder", this.get(item.getAttribute("data-placeholder-tkey")));
					}
				}
			},
			init: function(availableLangs, translations){
				if(typeof availableLangs != "object" || availableLangs.length == 0){
					alert("You need to specify a object with the available languages.\nPlease see the Language.help();")
				} else if(typeof translations != "object" || translations.length == 0){
					alert("You need to specify a object with the available translations of every language.\nPlease see the Language.help();")
				}

				// Get language saved
				this.selectedLang = sessionStorage.getItem("itLang") ? sessionStorage.getItem("itLang") : navigator.languages[0];
				
				// Set document language
				document.querySelector("html").setAttribute("lang", this.selectedLang.substr(0, 2));

				// Set availables languages and translations
				this.availableLangs = availableLangs;
				this.translations = translations;
			}
		}
	}

	/**
		Now functionality
		@version: 1.00																					
		@author: Pablo E. Fernández (islavisual@gmail.com).
		@Copyright 2019 Islavisual.
		@Last update: 14/03/2019
	**/
	if(json.Now){
		Date.prototype.currentDate = (function () { var local = new Date(this); local.setMinutes(this.getMinutes() - this.getTimezoneOffset()); return local.toJSON().slice(0, 10); });
		this.now = it.now = function () {
			return new Date().currentDate();
		}
	}

	/**
		Dropdown select
		@version: 1.00
		@author: Pablo E. Fernández (islavisual@gmail.com).
		@Copyright 2017-2019 Islavisual.
		@Last update: 03/04/2019
	**/
	if(json.Selectpicker){
		this.Selectpicker = it.Selectpicker = {
			version: 1.0,
			help: function(cfg){
				if(typeof cfg == "undefined") cfg = {help: ''};
				if(!cfg.hasOwnProperty("help")) cfg.help = '';

				if (typeof showHelper != "undefined") showHelper("Selectpicker", cfg);
				else alert("Helper not available!");
				return;
			},
			init: function(cfg){
				var sp = this;

				// Get options
				if(typeof cfg == "string") cfg = { target: cfg };
				if (!cfg.hasOwnProperty('target')) { alert("You need set an object like target to create Selectpicker!. Please, see the help with the Selectpicker.help();"); return false; }
				if(!cfg.hasOwnProperty('liveSearch')) cfg.liveSearch = false;

				// Creating and initializing dropdowns
				var trgs = document.querySelectorAll(cfg.target);
				for(var tgri = 0; tgri < trgs.length; tgri++){
					// Get target
					var trg = trgs[tgri];

					// select needs searcher
					if(trg.getAttribute("data-live-search") != null && trg.getAttribute("data-live-search") == "true") cfg.liveSearch = true; else cfg.liveSearch = false; 

					sp._curIndex[trg.id] = -1;

					if (trg.tagName.toLowerCase() != "select") { 
						alert("Error into #" + trg.id + " element. You need set an SELECT element like target to create Selectpicker!. Please, see the help with the Selectpicker.help();"); 
						return false; 
					}

					// Add layer will contents button and list
					var div = document.createElement("div");
					div.setAttribute("class", "select-picker");

					// Add button will contents the selected text
					var btn = document.createElement("button");
					btn.setAttribute("id", trg.id + "trigger");
					btn.setAttribute("class", trg.getAttribute('class') + "-trigger");
					btn.setAttribute("data-id", trg.id);
					btn.setAttribute("aria-expanded", "false");
					btn.setAttribute("type", "button");
					btn.setAttribute("tabindex", "-1");

					// Assign all select properties 
					for (var i = 0, atts = trg.attributes, n = atts.length; i < n; i++){
						var att = atts[i];
						if(att.name == "id" || att.name == "name" || att.name == "class") continue;
					
						btn.setAttribute(att.name, att.value);
					}

					// If select was hidden, remove style
					btn.style.display = "";

					// Add events to button trigger
					btn.addEventListener("click", function(e){
						var t = e.target, div = t.nextElementSibling;

						t.parentElement.classList.toggle("open");
						div.style.display = div.style.display === 'none' ? '' : 'none';

						// Set aria attributes
						t.setAttribute("aria-expanded", t.getAttribute("aria-expanded") == "false" ? "true": "false");

						// Set focus into input search
						var t = t.parentElement;
						if(t.classList.contains("open") && t.querySelectorAll("input").length != 0)
							t.querySelector("input").focus();
						
						// Mark active
						var items = t.querySelectorAll("li"), btn = t.querySelector("button");
						for(var i = 0; i < items.length; i++){
							var item = items[i];

							if(item.innerHTML == btn.innerText){
								item.classList.add("select-picker-active");
								sp._curIndex[t.previousElementSibling.id] = i;
							} else{
								item.classList.remove("select-picker-active");
							}
						}

						// Allocate scroll
						var active = t.querySelector('.select-picker-active');
						var trg = t.querySelector("ul");
						if(active) trg.scrollTop = active.offsetTop - trg.offsetHeight + active.offsetHeight + 2;
					});

					window.addEventListener("click", this._windowListener);

					// Add dropdown-container
					var diC = document.createElement("div");
					diC.setAttribute("class", "dropdown-container");
					diC.setAttribute("style", "display: none");

					// Add list with possibles values
					var lst = document.createElement("ul");
					lst.setAttribute("class", "dropdown options");
					lst.setAttribute("role", "menu");
					
					// If autocomplete is requested
					var inp = document.createElement("input");
					inp.setAttribute("class", "input-search");
					inp.setAttribute("type", "search");
					inp.setAttribute("data-id", trg.id);
					inp.addEventListener("input", function(e){
						var trg = e.target, val = trg.value.trim(), lis = trg.parentElement.nextElementSibling.querySelectorAll("li");
						for(var i = 0; i < lis.length; i++){
							var li = lis[i];
							if(val != "" && li.innerHTML.toLowerCase().indexOf(val.toLowerCase()) == -1){
								li.style.display = "none";
							} else {
								li.style.display = "";
							}
						}
					});

					// Keyboard management
					inp.addEventListener("keydown", function(){
						var e = arguments[0], trg = e.target, val = trg.value;

						function getList(id) {
							var x = document.getElementById(id).nextElementSibling.querySelectorAll("li");
							return x;
						}

						function setActive(x, dir){
							if(x >= 0 && x <= list.length - 1) list[x].classList.remove("select-picker-active");

							function getNext(){
								if(dir == '+') x++; else x--;
								if (x >= list.length) x = 0;
								else if (x < 0) x = list.length - 1;
	
								return x;
							}
							
							x = getNext();
							while(list[x].style.display == "none"){	x = getNext(); }
						
							list[x].classList.add("select-picker-active");
							return x;
						}

						function setScrollTop(dir, trg) {
							try {
								trg = trg.parentElement.nextElementSibling;
								
								// Move scroll to current position
								var active = trg.querySelector('.select-picker-active');
								if (dir == "down") {
									trg.scrollTop = active.offsetTop - trg.offsetHeight + active.offsetHeight + 2;
								} else if (active.offsetTop < trg.scrollTop || document.querySelector('.select-picker-active:last-child').offsetTop == active.offsetTop) {
									trg.scrollTop = active.offsetTop - trg.offsetHeight + trg.offsetHeight + 2;
								}
							} catch (e) { }
						}

						if(e.keyCode == 38){ // up
							var list = getList(trg.dataset.id);
							
							sp._curIndex[trg.dataset.id] = setActive(sp._curIndex[trg.dataset.id], '-');
							setScrollTop('up', trg);

						} else if(e.keyCode == 40){ // down
							var list = getList(trg.dataset.id);
							sp._curIndex[trg.dataset.id] = setActive(sp._curIndex[trg.dataset.id], '+');
							setScrollTop('down', trg);

						} else if(e.keyCode == 13){ // enter
							e.preventDefault();
							e.stopPropagation();

							var list = getList(trg.dataset.id);
							document.getElementById(trg.dataset.id).selectedIndex = sp._curIndex[trg.dataset.id];
							return false;
						}
					}.bind(sp));

					// Create and add input picker
					var src = document.createElement("div");
					src.setAttribute("class", "searcher");
					src.appendChild(inp);
					
					// If search is disabled, hide searcher
					if(!cfg.liveSearch)	src.style = 'opacity: 0; height: 0; overflow: hidden; min-height: inherit;';
					
					// Add icon search
					var ic = document.createElement("i");
					ic.setAttribute("class", "search-icon");
					src.appendChild(ic);

					// Add like first option
					diC.appendChild(src);

					var idx = 0;
					if(trg.getAttribute("placeholder")){
						var li = document.createElement("li");
						li.setAttribute("rel", "0");
						li.setAttribute("data-value", "");
						li.innerHTML = trg.getAttribute("placeholder");
					
						lst.appendChild(li);
						idx++
					} 

					var items = trg.querySelectorAll("option");
					for(var i = idx; i < items.length; i++){
						var item = items[i];

						var li = document.createElement("li");
						li.setAttribute("rel", i);
						li.setAttribute("data-value", item.value);
						li.innerHTML = item.innerText;
						li.setAttribute("onclick", 'Selectpicker._update("' + trg.id + '", ' + i + ')');
						if(item.getAttribute("selected") != null && item.getAttribute("disabled") == null){
							li.setAttribute("class", "selected");
							btn.innerText = item.innerText;
						}
						
						lst.appendChild(li);
					}

					// Auto-select first option
					if(btn.innerText.trim() == "") btn.innerText = items[0].innerHTML;
					
					// Add components to layer
					diC.appendChild(lst);
					div.appendChild(btn);
					div.appendChild(diC);

					// Hide select and append new dropdown
					trg.parentNode.insertBefore(div, trg.nextSibling);

					trg.style = 'display: block !important; height: 0 !important; width: 0; overflow: hidden !important; opacity: 0; font-size: 0; position: absolute;';
					
					setInterval(function(e){ 
						if(e.getAttribute("data-value") != e.value){
							e.setAttribute("data-value", e.value);
							e.dispatchEvent(new Event('change'));
							Selectpicker._update(e.id, e.querySelector('option[value="' + e.value + '"]').index);
						}
					}.bind(null, trg), 150);
				} /* End for trgi */

				// Add default Styles
				if(typeof it.AddCSSRule != "undefined"){
					AddCSSRule('', ".select-picker", 'position: relative; width: auto; width: 164px;');
					AddCSSRule('', ".select-picker .dropdown-container", 'list-style: none; background: #fff; border: 1px solid rgba(0,0,0,0.1); padding: 0; position: absolute; top: 32px; width: 100%; z-index: 99999;');
					AddCSSRule('', ".select-picker ul", 'overflow: auto; max-height: 164px; padding: 0; list-style: none; margin: 0;');
					AddCSSRule('', ".select-picker button", 'background: #f4f4f4; border: 1px solid rgba(0,0,0,0.1); width: 100%; height: 32px; text-align: left; line-height: 28px; font-weight: 500; padding-right: 32px; position: relative;');
					AddCSSRule('', ".select-picker button::before", 'content: ""; display: inline-block; width: 0; height: 0; margin-left: 2px; vertical-align: middle; border-top: 4px dashed; border-right: 4px solid transparent; border-left: 4px solid transparent; position: absolute; right: 15px; top: 15px;');
					AddCSSRule('', ".select-picker button:hover", 'border-color: #adadad;');
					AddCSSRule('', ".select-picker.open button", ' background: #000; color: #ffffff;');
					AddCSSRule('', ".select-picker li", 'min-height: 36px; border-bottom: 1px solid rgba(0,0,0,0.1); padding: 4px 10px 0px 10px; line-height: 36px;');
					AddCSSRule('', ".select-picker li:not(.searcher):hover", 'background: #000; color: #fff;');
					AddCSSRule('', ".select-picker .searcher", 'position: relative; padding: 3px 40px 0 4px; min-height: 39px; border-bottom: 1px solid rgba(0,0,0,0.1);');
					AddCSSRule('', ".select-picker .searcher .input-search", 'line-height: 36px;  height: 32px; padding-right: 26px; color: #000; width: 100%;');
					AddCSSRule('', ".select-picker .search-icon::before", 'content: ""; background: #ccc; width: 10px; height: 3px; position: absolute; border-radius: 100px; top: 21px; right: 4px; transform: rotate(40deg);');
					AddCSSRule('', ".select-picker .search-icon:after", 'content: ""; width: 10px; height: 10px; border: 3px solid #ccc; border-radius: 100px; display: block; position: absolute; top: 8px; right: 10px;');
					AddCSSRule('', ".select-picker-active", 'background: #000; color: #fff;');
				}
			},
			_curIndex: {},
			_update: function(e, i){
				// update HTML select
				e = document.getElementById(e);
				e.selectedIndex = i;
				
				// update selectpicker
				e.nextElementSibling.children[0].innerText = e[i].innerText;
				
				// Close selectpicker list
				e.nextElementSibling.classList.remove("open");
				e.nextElementSibling.children[1].style.display = "none";
				e.nextElementSibling.children[0].setAttribute("aria-expanded", "false");
			},
			_windowListener: function(e){
				var p = e.target;
				
				while (p != document && p.getAttribute("class") && !p.classList.contains("select-picker")){
					p = p.parentNode;
				}
				
				if(p == document){
					var items = document.querySelectorAll("div.select-picker");
					for(var i = 0; i < items.length; i++){
						var item = items[i];
						item.classList.remove("open");
						item.querySelector(".dropdown-container").style.display = 'none';
						item.querySelector("button").setAttribute("aria-expanded", "false");
					}
				}
			},
		}
	}
	
	/**
		Create and send forms in real time.
		@version: 1.00
		@author: Pablo E. Fernández (islavisual@gmail.com).
		@Copyright 2017-2019 Islavisual.
		@Last update: 11/03/2019
		@status PENDING to UPDATE
	**/
	if(json.SendForm){
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
	}

	/**
		 StripTags functionality
		@version: 1.00																					
		@author: Pablo E. Fernández (islavisual@gmail.com).
		@Copyright 2019 Islavisual.
		@Last update: 09/02/2019
	**/
	if(json.StripTags){
		this.StripTags = it.StripTags = function (inp, allowed) {
			if ((typeof inp == "string" && inp == "help") || inp.hasOwnProperty("help")) {
				if (typeof showHelper != "undefined") showHelper("StripTags", inp);
				else alert("Helper not available!")
				return;
			}

			allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
			var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
			return inp.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
				return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
			});
		}
	}
	
	/**
		 TreeView functionality
		@version: 1.00																					
		@author: Pablo E. Fernández (islavisual@gmail.com).
		@Copyright 2019 Islavisual.
		@Last update: 09/03/2019
	**/
	if(json.Treeview){
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
	}

	/**
		 Validator functionality
		@version: 1.00
		@author: Pablo E. Fernández (islavisual@gmail.com).
		@Copyright 2017-2019 Islavisual.
		@Last update: 17/03/2019
	**/
	if(json.Validator){
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
	}
}
