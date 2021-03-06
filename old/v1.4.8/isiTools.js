//var itEnabledModules = {Datepicker : true, AddCSSRule: true, Include: true, Mask: true }

var it = function(t){
    it.targets = document.querySelectorAll(t);

	return it;
};

it.name = "isiTools";
it.version = "1.4.8",
it.author = "Pablo E. Fernández (islavisual@gmail.com)",
it.copyright = "2017-2019 Islavisual",
it.lastupdate = "02/12/2019",
it.enabledModules = {},
it.target = null,
it.targets = null,
it.help = function(plugin, cfg){
	if(typeof cfg == "undefined") cfg = {help: ''};
	if(!cfg.hasOwnProperty("help")) cfg.help = '';

	if (typeof showHelper != "undefined") showHelper(plugin ? plugin : "index", cfg);
	else alert("Helper not available!")
	return;
}
it.autoload = function(){
	if(typeof itEnabledModules != "undefined"){
		isiToolsCallback(itEnabledModules);

	} else {
		function UrlExists(url){
			var uri = new XMLHttpRequest();
			uri.open('HEAD', url, false);
			uri.send();
			return uri.status!=404;
		}

		function baseName(str){
			var base = new String(str).substring(str.lastIndexOf('/') + 1); 
			if(base.lastIndexOf(".") != -1)       
				base = base.substring(0, base.lastIndexOf("."));
			return base;
		}

		var http = new XMLHttpRequest();

		// When request is ready...
		http.onreadystatechange = function () {
			if (http.readyState == 4 && http.status == 200) {
				isiToolsCallback(JSON.parse(http.response).modules);
			}
		}

		// Get current path
		var scripts = document.querySelectorAll("script"), isiToolsSrc = '';
		for(var x = 0; x < scripts.length; x++){
			var src = scripts[x].getAttribute("src");

			if(!src) continue;
			var path = src.split(baseName(src))[0];
			
			if(UrlExists(path + "config.json")){
				isiToolsSrc = src;
				break;
			}
		}

		if(isiToolsSrc != ""){
			// Load by module
			if(isiToolsSrc.indexOf("?modules=") != -1){
				var json = {};
				isiToolsSrc = isiToolsSrc.split("?modules=")[1].split("+");
				
				// Set all plugins to false
				for(var key in json){ json[key] = false; }
		
				// Enable only sent by url
				for(var i = 0; i < isiToolsSrc.length; i++){
					var item = isiToolsSrc[i];
			
					json[item] = true;
				}

				isiToolsCallback(json);

			} else {
				http.open('GET', path+'config.json', false);
				http.send();
			}
		}
	}
}

it.simulateEvent = function(evt, el){

	var event = new Event(evt, {'bubbles': true, 'cancelable': true});
	el.dispatchEvent(event);

	if(evt == "change"){
		var event = new Event('input', {'bubbles': true, 'cancelable': true});
		el.dispatchEvent(event);
	}
}

it.autoload();

function isiToolsCallback(json){
	it.enabledModules = json;

	/**
		 AddCSSRule functionality																		
		@version: 1.00																					
		@author: Pablo E. Fernández (islavisual@gmail.com).												
		@Copyright 2017-2019 Islavisual. 																	
		@Last update: 13/03/2019																			
	**/
	document.body.addEventListener("keydown", function(e){
		if(e.keyCode == 112 || e.which == 112) {
			if(e.target.dataset.helper){
				e.preventDefault();
				e.stopImmediatePropagation();
				helper(e.target.dataset.helper);
			}
		} else if(e.keyCode == 27 || e.which == 27) {
			document.querySelector("#h31p3r .btn-times").click();
		}
	}, false);
	if(json.AddCSSRule){
		this.AddCSSRule = it.addCSSRule = function (cfg, selector, styles, index) {
			var s, r, itS = document.getElementById("isiToolsStyles");

			if ((typeof cfg == "string" && cfg == "help") || cfg.hasOwnProperty("help")) {
				if (typeof showHelper != "undefined") showHelper("AddCSSRule", cfg);
				else alert("Helper not available!")
				return;
			}

			var sheet = cfg;

			// Get style sheet
			if (sheet == null || sheet == "") {
				if (itS == null) {
					var style = document.createElement("style");
					style.setAttribute("id", "isiToolsStyles");
					style.setAttribute("media", "screen");
					
					// Add style tag to head
					document.head.insertBefore(style, document.head.firstChild);
					s = style.sheet;
				} else {
					s  = itS.sheet;
				}
			} else {
				if (typeof sheet == "number") s = document.styleSheets[sheet];
				else if (typeof sheet == "object") s = sheet;
				else console.log("sheet not avilable!")
			}


			// Get rules
			var rText = s.cssRules || s.rules; 
				index = typeof index == "undefined" ? rText.length : index;

			for(var i = 0; i < index; i++) {
				r = rText[i];

				if (typeof r.selectorText != "undefined" && r.selectorText.trim() == selector.trim()) {
					s.deleteRule(i);
					index--;
					break;
				}
			}

			// Insert rule
			if ("insertRule" in s) {
				try{
					s.insertRule(selector + "{ " + styles + " }", index);
				} catch(e){}
				
			} else if ("addRule" in s) {
				try{
					s.addRule(selector, styles, index);
				} catch(e){}
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
		this.Alert = it.alert = function (cfg) {
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

				if(typeof it.addCSSRule != "undefined"){
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
		@version: 2.0
		@author: Pablo E. Fernández (islavisual@gmail.com).
		@Copyright 2017-2019 Islavisual.
		@Last update: 02/12/2019
	**/

	if(json.Autocomplete){
		window._timeoutAC = null, window._continueAC = false;
		this.Autocomplete = it.Autocomplete = function (cfg) {
			if(typeof cfg == "undefined") cfg = {};

			// If configuration object is invalid
			if (!cfg.hasOwnProperty('target')) { alert("No se ha definido el control de entrada de datos (target).\nPor favor, mire la ayuda pulsando F1."); return; }
			if (!cfg.ajax && !cfg.hasOwnProperty('data')) { alert("No se ha suministrado el objeto con los datos (data).\nPor favor, mire la ayuda pulsando F1."); return; }
			if (cfg.format == "table" && !cfg.row) { alert("No se ha especificado la matriz JSON (row) con los campos que a mostrar.\nPor favor, mire la ayuda pulsando F1."); return; }

			if (document.getElementById(cfg.target) == null) { alert('El ID "' + cfg.target + '" provided to Autocomplete not exists!') }

			// Create JSON with current opt
			var opt = {
				ajax: !cfg.hasOwnProperty('ajax') ? false : cfg.ajax,
				url: !cfg.hasOwnProperty('url') ? null : cfg.url,
				autofocus: !cfg.hasOwnProperty('autofocus') ? false : cfg.autofocus,
				callback: !cfg.hasOwnProperty('callback') ? null : cfg.callback,
				className: !cfg.hasOwnProperty('className') ? "autocomplete" : cfg.className,
				currentFocus: -1,
				data: cfg.data,
				delay: !cfg.hasOwnProperty('delay') ? 300 : cfg.delay,
				format: !cfg.hasOwnProperty('format') ? "list" : cfg.format,
				highlight: !cfg.hasOwnProperty('highlight') ? null : cfg.highlight,
                disable: !cfg.hasOwnProperty('disable') ? null : cfg.disable,
				minLengthMessage: !cfg.hasOwnProperty('minLengthMessage') ? "Cargando..." : cfg.minLengthMessage,
                voidMessage: !cfg.hasOwnProperty('voidMessage') ? "No se han encontrado coincidencias" : cfg.voidMessage,
				minLength: !cfg.hasOwnProperty('minLength') ? 3 : cfg.minLength,
				row: !cfg.hasOwnProperty('row') ? {} : cfg.row,
				target: document.getElementById(cfg.target),
				tooltips: !cfg.hasOwnProperty('tooltips') ? null : cfg.tooltips,
			}

            if(opt.format == "table"){
                // Define column fields by default
                if(!opt.row.hasOwnProperty('columns')){
                    opt.row.columns = [];
                    for(var key in opt.data[0]){
                        opt.row.columns.push(key);
                    }
                }

                // Define header fields by default
                if(!opt.row.hasOwnProperty('headers')){
                    opt.row.headers = [];
                    for(var key in opt.data[0]){
                        opt.row.headers.push(key.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function(s){ return s.toUpperCase(); }));
                    }
                }

                // Define return value by default
                if(!opt.row.hasOwnProperty('return_value')) opt.row.return_value = Object.keys(opt.data[0])[0];
                if(!opt.row.hasOwnProperty('showHeaders')) opt.row.showHeaders = false;
                
            } else if(opt.format == "cluster"){
                // Define fields by default
                if(!opt.row.hasOwnProperty('groupby')) opt.row.groupby = 'group';
                if(!opt.row.hasOwnProperty('items')) opt.row.items = 'items';
				if(!opt.row.hasOwnProperty('return_value')) opt.row.return_value = 'text';
				
				if(!opt.row.hasOwnProperty('columns')){
					opt.row.columns = [opt.row.return_value];
				} else if(typeof opt.row.columns == "string"){
					opt.row.columns = [opt.row.columns];
				}
            }

			// Backup of placeholder if exists
			if(!opt.target.getAttribute("data-placeholder")){
				if(opt.target.getAttribute("placeholder")){
					opt.target.setAttribute("data-placeholder", opt.target.getAttribute("placeholder"));
				} else {
					opt.target.setAttribute("data-placeholder", "");
				}
			}

			// Save config of all targets
			if(!Autocomplete.targets) {
				Autocomplete.targets = [];
			}
			Autocomplete.targets[opt.target.id] = {};
			Autocomplete.targets[opt.target.id].opt = opt;
			opt.target.dataset.helper = "Autocomplete";
			
			// Remove duplicating events for body element
			document.body.removeEventListener('click', Autocomplete._checkFocus);
			document.body.addEventListener('click', Autocomplete._checkFocus);

			// Set message if minLength is -1 and message and events if minLength not id -1
			if(opt.minLength == -1) {
				opt.target.setAttribute("placeholder", opt.minLengthMessage);

				opt.target.onkeydown = function(){ return false; }
				
			} else {
				opt.target.setAttribute("placeholder", opt.target.dataset.placeholder);
				opt.target.onkeydown = null;

                function callbackInputAfter(e){
                    opt.data = e;
                    
                    var event = new Event('inputAfter');
                    opt.target.dispatchEvent(event);
                }

				function triggerAfterKey(t){
					if(!opt.ajax){
						var event = new Event('inputAfter');
						t.dispatchEvent(event);
					} else {
						new HttpRequest({
							url: opt.url + (opt.url.split("?").length == 1 ? "?q=" : "&q=") + t.value, 
							ajax: true, 
							callback: callbackInputAfter, 
							contentType: "application/json; charset=utf-8"}
						);
					}
				}

                opt.target.addEventListener("keydown",  function (e) {
					var kc = e.keyCode, t = e.target;

					if (e.keyCode == 40) { 			// down
						if (document.querySelectorAll("." + opt.className + "-items").length == 0) {
							it.simulateEvent("input", e.target);
						}
	
						var x = Autocomplete._getAutocompleteList(this, opt.className);
						opt.currentFocus++;
	
						Autocomplete._addActive(x, opt);
						Autocomplete._setScrollTop(e.target.id, opt.className, "down");

					} else if (e.keyCode == 38) { 	//up
						var x = Autocomplete._getAutocompleteList(this, opt.className);
	
						opt.currentFocus--;
						Autocomplete._addActive(x, opt);
						Autocomplete._setScrollTop(e.target.id, opt.className, "up");

					} else if (e.keyCode == 13) {
						var x = Autocomplete._getAutocompleteList(this, opt.className);
	
						e.preventDefault();
						if (opt.currentFocus > -1) {
							if (x) x[opt.currentFocus].click();

							Autocomplete._removeItemsList(false, opt)
							return false;
						}
					}

					if(kc == 9){ Autocomplete._removeItemsList(false, opt); return false; }
					else if([16,18,33,34,35,36,37,38,39,45,107].indexOf(kc) != -1 || (kc == 187 && !e.shiftKey) || e.ctrlKey || e.altKey) { return false; } 
					else if(kc == 40 && document.getElementById(e.target.id + "-" + opt.className + "-list")) return false;

					var goon = (t.value.trim().length + (kc == 8 || kc == 46 ? -1: 1) < opt.minLength) || (t.value.trim().length == 1 && (kc == 8 || kc == 46) ) ? false : true;

					clearTimeout(_timeoutAC); 
					if(goon) {
                        _timeoutAC = setTimeout(triggerAfterKey, opt.delay, t); 
                    } else {
                        Autocomplete._removeItemsList(false, opt)
                    }
				});

				opt.target.addEventListener("paste", function (e) { clearTimeout(_timeoutAC); _timeoutAC = setTimeout(triggerAfterKey, opt.delay, e.target); });

                opt.target.addEventListener("inputAfter", function (e) {
					var a, b, c, i, val = this.value.trim();

					// Contains wildcard
					var wildCard = val.indexOf("*") == -1 ? -1 : (val.indexOf("*") == val.length - 1 ? 1 : 0);

					// Only search when length is greater than "minLength" attribute.
                    Autocomplete._removeItemsList(false, opt);
					if (opt.minLength == -1) this.value = "";
					if (opt.minLength == -1 || val.length < opt.minLength) {
						return false;
					}

                    // Close all lists
                    Autocomplete._closeAllLists(this);

                    // Reset current focus / element selected
                    opt.currentFocus = -1;

                    // Create a DIV element that will contain the values
					a = document.createElement("div");
					a.setAttribute("id", opt.target.id + "-" + opt.className + "-list");
					a.setAttribute("class", opt.className + "-items display");
					a.classList.add(opt.format);

                    
					document.body.addEventListener("click", function (e) {
                        if(e.path.filter(function(e){ return e != document && e!= window && e.classList.contains("expand-layer")}).length == 0){
                            try{ document.getElementById(opt.target.id + "-" + opt.className + "-list").remove(); } catch(e){ }
                        }
					});

                    this.parentNode.appendChild(a);

					if (opt.format == "table") {
                        // If format is table and is desired show headers 
                        if(opt.row.showHeaders){
                            var thead = document.createElement("span");
                            thead.setAttribute("class", "header");

                            var aux = "";
                            for (var z = 0; z < opt.row.columns.length; z++) {
                                aux += '<span style="width: ' + (100 / opt.row.columns.length) + '%">' + opt.row.headers[z] + "</span>";
                            }
                            thead.innerHTML = aux;
                            a.appendChild(thead);
                        }

					} else if(opt.format == "cluster"){
                        var jsonCluster = false;
					    if(opt.data.length != 0 && typeof opt.data.find(function (x){return x!==undefined})[opt.row.items].find(function (x){return x!==undefined}) == "object") jsonCluster = true;
                    }

                    // Searching...
                    Autocomplete.foreach(val, opt, a)

                    // Clean memory
                    a = b = c = val = jsonCluster = wildcard = thead = aux = null;
				});
			}

            if(opt.autofocus){ opt.target.focus(); }
		}

		this.Autocomplete.foreach = function(val, opt, a){
            var itemsCount = 0;
            
            for (var i = 0; i < opt.data.length; i++) {
                // If val is empty only process the first 100 elements
				if(val.length == 0 && itemsCount > 99) break;

                // Check if the item contains the text field value
				var cval = '', found, optData = opt.data[i];
                if(typeof optData != "string"){
                    cval = JSON.stringify(optData);
                    for(var key in optData){
                        cval = cval.replace(/[\{\}\[\]\:\,\"]/mg, '|').replace(new RegExp("\\|" + key + "\\|", "mg"), '|').replace(/\|+/mg, '|')
                    }

                } else {
                    cval = optData;
                }

                // Now, we have the item converted to string and separated by pipes.
                // Extract wildcards and check item
                var wildCard = val.indexOf("*") == -1 ? -1 : (val.indexOf("*") == val.length - 1 ? 1 : 0);
                found = opt.format == "cluster" || opt.ajax || Autocomplete.search(val, cval, wildCard, 0);

                // Add items to autocomplete list
                if(found){
                    b = document.createElement("div");
					var bc = null;

                    if(opt.format == "list"){
                        var aux = cval.toUpperCase().split(val.toUpperCase());
                        b.classList.add("value");
                        b.innerHTML = aux.join();
                        b.innerHTML = b.innerHTML.replace(/,/ig, '<b>' + val + '</b>').toLowerCase();

                        b.innerHTML += "<input type='hidden' data-id='" + opt.target.id + "' data-index='" + i + "' value='" + cval + "'>";

                    } else if(opt.format == "table"){
                        var highlighting = opt.highlight ? true : false;
                        var disabling = opt.disable ? true : false;
                        var tooltips = opt.tooltips ? true : false;

                        for (var f = 0; f < opt.row.columns.length; f++) {
                            if(f == 0){
                                b.classList.add("value");
                                b.innerHTML += "<input type='hidden' data-id='" + opt.target.id + "' data-index='" + i + "' value='" + optData[opt.row.return_value] + "'>";
                            }

                            var tfld = opt.row.columns[f], tval = optData[opt.row.columns[f]];
                            var faux = '<span __tp__ style="width: ' + (100 / opt.row.columns.length) + '%">' + optData[opt.row.columns[f]] + "</span>";
                            
                            // If items is highlighting
                            if(highlighting){
                                if(typeof optData[opt.highlight.field] != 'undefined' &&  optData[opt.highlight.field] != 0){
                                    b.classList.add(opt.highlight.class);
                                }
                            }

                            // If items is disabling
                            if(disabling){
                                if(typeof optData[opt.disable.field] != 'undefined' &&  optData[opt.disable.field] != 0){
                                    b.classList.add(opt.disable.class);
                                }
                            }

                            // If items have tooltips and add items
                            if(tooltips){
                                for (var t = 0; t < opt.tooltips.length; t++) {
                                    if(tfld == opt.tooltips[t].field){
                                        faux= faux.replace("__tp__", 'title="' + optData[opt.tooltips[t].text] + '"');
                                        break
                                    } 
                                }
                            } else {
                                faux = faux.replace("__tp__", '');
                            }
                            b.innerHTML += faux.replace("__tp__", '');
                        }

                    } else if(opt.format == "cluster"){
                        b.innerHTML = '<span id="clustered' + i + '">' + optData[opt.row['groupby']] + "</span>";
                        b.classList.add("header");
                        bc = document.createElement("div");
                        bc.classList.add("values");

                        var tooltips = opt.tooltips ? true : false;

                        var len = optData[opt.row['items']].length;
                        for (var z = 0; z < len; z++) {
                            if(itemsCount > 99) break;
                            
                            var text = '', cItem = optData[opt.row['items']][z];

                            if(typeof cItem == "object"){ 
                                text = Object.values(cItem).join("|");
                            } else { 
                                text = cItem; 
                            }

                            text += (text.indexOf("|") == -1) ? "|" : "";

                            if (opt.ajax || Autocomplete.search(val, text, wildCard, 1)) {
								text = '';
                                for(var x = 0; x < opt.row.columns.length; x++){
                                    var aux = cItem[opt.row.columns[x]];
                                    text += aux != undefined ? (aux + " ") : '';
                                }
                                text = text.trim();

                                var aux = document.createElement("div");
                                aux.classList.add("value");
                                aux.style.width = "100%";
                                aux.innerHTML += "<span>" + text  + "</span>";
                                aux.innerHTML += "<input type='hidden' data-id='" + opt.target.id + "' data-index='" + i + "," + z + "' value='" + text + "'>";

                                // Mark highlight
                                if(opt.highlight && cItem[opt.highlight.field] && cItem[opt.highlight.field] != 0) {
                                    aux.classList.add(opt.highlight.class);
                                }

                                // Mark disable
                                if(opt.disable && cItem[opt.disable.field] && cItem[opt.disable.field] != 0) {
                                    aux.classList.add(opt.disable.class);
                                }

                                // Set tooltips
                                if(tooltips){
                                    aux.setAttribute("title", cItem[opt.tooltips.field]);
                                } else {
                                    aux.setAttribute("title", "");
                                }

                                // Add element
                                bc.appendChild(aux);

                                // Add event on click
                                aux.setAttribute("onclick", 'Autocomplete._click(this)');

                                itemsCount++
                            }
                        }
                    }

                    if(bc && bc.children.length != 0){
                        a.appendChild(b);
					    a.appendChild(bc);

                    } else if(b.classList.contains("value") && b.children.length != 0){
                        a.appendChild(b);

                        // Add event on click
                        b.setAttribute("onclick", 'Autocomplete._click(this)');

                        itemsCount++
                    }
                }
            }

            if(a.children.length == 0){
                a.innerHTML = '<div class="error not-found"><span>Buscando "' + opt.target.value + '":</span></div>'
                a.innerHTML += '<div class="value">' + opt.voidMessage + '</div>';
            }

            // Clean all temporary variables
            cval = found = optData = keyVal = valAux = wildCard = bc = aux = highlighting = tooltips = tfld = faux = i = f = null;
		}

        this.Autocomplete.search = function(value, text, wildCards, pass){
            var mode = value.match(/\*(.+)\*/ig) != null ? "contains" : ( value.match(/\*(.+)/ig) != null ? 'ends' : 'starts');

			// Replace double wildcard
            value = value.replace("**", '*');
            text = text.replace(/false/ig, '').replace(/true/ig, '')

            // Clean of wildcards the value to search
            value = value.replace(/\*/g, '');

            // transform to lower case all
            text = text.toLowerCase();

            // Remove empty elements
            var complexSearch = value.indexOf("+") != -1 ? true : false, value = value.replace(/^\++|\++$/g, '').toLowerCase().split("+");
            for(var v in value){
                if(value[v].trim() == "") delete value[v];
            }

            // If search is complex
            var aux = Autocomplete._test(text, value, mode);

            return aux;
        }

        this.Autocomplete._test = function (text, value, method){
            method = value.length > 1 ? "contains" : method;
            var aux = value, counter = 0;

            for(var i = 0; i <= aux.length-1; i++){
                value = aux[i].toString().trim();

                counter += text.split("|").filter(function(v){ 
                    v = v.trim();

                    var exacts = value.split('"');
                    if(exacts.length == 3){ value = exacts[1]; method = "exacts"; }

                    var c = {
                        'starts': function(v, value) { return v.trim().indexOf(value) == 0 },
                        'ends': function(v, value) { return v.trim().indexOf(value) == v.length - value.length },
                        'contains': function(v, value) { return v.trim().indexOf(value) != -1 },
                        'exacts': function(v, value) { return v.trim() == value },
                    }

                    return v.length >= value.length && v != "" && c[method](v, value);
                }).length != 0 ? 1 : 0;
            }

            return counter == aux.length;
		}
		
		this.Autocomplete._addActive = function(x, opt) {
			if(!x) return false;
			Autocomplete._removeActive(x, opt.className);

			if(opt.currentFocus >= x.length) opt.currentFocus = 0;
			if(opt.currentFocus < 0) opt.currentFocus = (x.length - 1);
			if(x[opt.currentFocus]) x[opt.currentFocus].classList.add(opt.className + "-active");
		}

		// Get Autocomplete List
		this.Autocomplete._getAutocompleteList = function(e, cls) {
			var x = document.getElementById(e.id + "-" + cls + "-list");
			if (x) x = x.querySelectorAll("div.value");
			return x;
		}

		this.Autocomplete._removeActive = function(x, cls) {
			for (var i = 0; i < x.length; i++) {
				x[i].classList.remove(cls + "-active");
			}
		}

		this.Autocomplete._setScrollTop = function(id, cls, dir) {
			// Move scroll to current position
			try {
				var active = document.querySelector('.' + cls + '-active'), items = document.getElementById(id + "-" + cls + "-list");
				if (dir == "down") {
					items.scrollTop = active.offsetTop - items.offsetHeight + active.offsetHeight + 2;
				} else if (active.offsetTop < items.scrollTop || document.querySelector('.' + cls + '-active:last-child').offsetTop == active.offsetTop) {
					items.scrollTop = active.offsetTop - items.offsetHeight + items.offsetHeight + 2;
				}
			} catch (e) { }
		}

        this.Autocomplete._removeItemsList = function(reset, opt) {
            var item = opt.target.parentElement.querySelector("." + opt.className + "-items");
            if(item) item.remove();
            if (reset) opt.target.value = "";

            item = null;
        }

        Autocomplete._getID = function(e){
			return e.id || e.querySelector("[data-id]").dataset.id;
		}

        Autocomplete._click = function(val){
			var id = Autocomplete._getID(val);
			var opt = Autocomplete.targets[id].opt;
			
			opt.target.value = val.getElementsByTagName("input")[0].value;
			if (opt.callback) opt.callback(val.getElementsByTagName("input")[0]);
			Autocomplete._closeAllLists(val);
		}

        Autocomplete._closeAllLists = function(elmnt){
			var id = Autocomplete._getID(elmnt);
			var opt = Autocomplete.targets[id].opt;

			var x = document.querySelectorAll("." + opt.className + "-items");
			for (var i = 0; i < x.length; i++) {
				if (elmnt != x[i] && elmnt != opt.target) {
					x[i].parentNode.removeChild(x[i]);
				}
			}
		}

		this.Autocomplete._checkFocus = function(e){
			var trg = e.target;
			for(var trgID in Autocomplete.targets){
				var opt = Autocomplete.targets[trgID].opt;

				while(trg && trg.id != trgID && !trg.classList.contains(opt.className + "-items") && trg.tagName != "BODY"){
					trg = trg.parentNode;
				}

				if(!trg || (!trg.classList.contains(opt.className + "-items") && trg.id != trgID)){
					try{ 
						document.getElementById(opt.target.id + "-" + opt.className + "-list").remove();
					} catch(e) { }
				} 
			}
		}

        this.Autocomplete.help = function(){
			if(typeof cfg == "undefined") cfg = {help: ''};
			if(!cfg.hasOwnProperty("help")) cfg.help = '';

			if (typeof showHelper != "undefined") showHelper("Autocomplete", cfg);
			else alert("Helper not available!")
			return;
		}
	}

	/**
		 Benchmark functionality
		@version: 1.00
		@author: Pablo E. Fernández (islavisual@gmail.com).
		@Last update: 15/03/2019
	**/
	if(json.Benchmark){
		this.Benchmark = it.benchmark = {
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
		@version: 1.1
		@author: Pablo E. Fernández (islavisual@gmail.com).
		@Copyright 2017-2019 Islavisual.
		@Last update: 04/03/2019
	**/
	if(json.Constraint){
		this.Constraint = it.constraint = {
			version: '1.1',
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
				// If it.target has value, set to cfg object
				if(!cfg.hasOwnProperty('target') && this.targets) cfg.target = this.targets[0].id;

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
				
				// Set custom function
				if (opt.custom && !opt.function) alert("You must define a function. Please, see the help with the Constraint('help');");
				else if (opt.custom && opt.function) Constraint._types[cfg.target] = opt.function;

				// Set events to input
				function assignEvents(textbox, type, ds) {
					["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
						textbox.addEventListener(event, function () {
							var valid;
							
							// Is a number with separator
							if(type == "decimal" || type == "float"){ 
								valid = Constraint._types[type](this.value, ds); 

							// Is customized
							} else if(type == "custom"){
								valid = Constraint._types[this.id](this.value, ds); 

							// Any other case
							} else { 
								valid = Constraint._types[type](this.value); 
							}

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
		this.IntelliForm = it.intelliForm = {
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

				// If it.target has value, set to cfg object
				if(!cfg.hasOwnProperty('target') && this.targets) cfg.target = this.targets[0].id;

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
				var iform = it.intelliForm;
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
					it.simulateEvent("change", document.getElementById(dID));
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
						if(typeof it.addCSSRule != "undefined"){
							it.addCSSRule('', "#" + elm.id + " *", "pointer-events: none;");
						}

						// Add event/element
						elm.addEventListener(event, it.intelliForm._addEvent);
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
						elm.removeEventListener(event, it.intelliForm._addEvent);
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
							it.simulateEvent(item.event, el);

							// If item have data-id
							try {
								dID = typeof trg.dataset.id != "undefined" ? trg.dataset.id : '';
								dID = dID.replace("#", '');

								it.simulateEvent("change", document.getElementById(dID));
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

						it.simulateEvent("change", e.target);

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

						it.simulateEvent("change", e.target);

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
		Datepicker functionality
		@version: 1.06
		@author: Pablo E. Fernández (islavisual@gmail.com).
		@Copyright 2017-2019 Islavisual.
		@Last update: 08/10/2019
	**/
	if (json.Datepicker) {
        this.Datepicker = it.datepicker = function (cfg) {
            // If the target is only one, we update targets
            if ((typeof cfg == "string" && cfg == "show")) {
                cfg = it.datepicker.config.custom[this.targets[0].id];
            } else {
				// If the device is mobile, we change the type of input element to date and do nothing else.
				var type = "text";
				try {
					if (typeof document.createEvent("TouchEvent") != "undefined") {
						type = "date";
					}
				} catch (e) { }
			

				// Set datepicker field type
				Array.prototype.slice.call(this.targets).forEach(function (target, idx) {
					var aux = target.value;
					target.type = type;
					target.value = aux;
				});
			}

            Array.prototype.slice.call(this.targets).forEach(function (target, idx) {
                // Get ID
				var id = target.id;
				
				// If the id attrtibute is not set, we assign it by default
                id = id == "" ? ('DatePicker_' + idx) : id;

				if(cfg == undefined) cfg = it.datepicker.config;
				
                for (var key in it.datepicker.config) {
                    cfg[key] = cfg.hasOwnProperty(key) ? cfg[key] : it.datepicker.config[key]
                }
                
                // Assure the input format
                if (target.value.substr(4, 1) == "-" && target.value.substr(7, 1) == "-") {
                    var date = new Date(target.value).toLocaleString().split(" ")[0].toString().split(/[\-|\/]/g);

                    for (var x = 0; x < date.length; x++) {
                        if (date[x] < 10) date[x] = "0" + date[x];
                    }

					target.value = cfg.format.replace("DD", date[0]).replace("MM", date[1]).replace("YYYY", date[2]).replace("YY", date[2].substring(2));
					target.value = target.value.replace(/[^(0-9|\-|\/)]/g, '');
                }


                try { cfg.custom[id].md = { b: [], c: [], a: [] }; } catch (e) { }

                // If the process is in create/assign mode
                var loading = false;

                if (!target.classList.contains("has-datepicker")) {
                    cfg.custom[id] = {};

                    // Set default properties
                    for (var k in cfg) {
                        if (k == 'custom') continue;
                        cfg.custom[id][k] = cfg[k];
                    }

                    if (!cfg.hasOwnProperty("background")) cfg.custom[id].background = '#0066a8';
                    if (!cfg.hasOwnProperty("color")) cfg.custom[id].foreground = '#fff';


                    // Add Styles
                    it.datepicker.addStyles(id, cfg.custom[id].background, cfg.custom[id].foreground);

                    // Add class to target input 
                    target.classList.add("has-datepicker");

                    // Add and configure trigger button
                    var trigger = document.createElement('button');
                    trigger.id = 'DatePicker_trigger_' + idx;
                    trigger.type = "button";
                    if (cfg.buttonicon.indexOf("<") != -1) {
                        trigger.innerHTML = cfg.buttonicon;
                    } else {
                        var cls = cfg.buttonicon.split(" ");
                        cls.forEach(function (val) {
                            trigger.classList.add(val)
                        });
                    }
                    target.parentElement.insertBefore(trigger, target.nextElementSibling);

                    // Add event to show picker
                    target.nextElementSibling.onclick = function (e) {
                        e.preventDefault();
                        var trg = e.target.previousElementSibling;

                        if (!trg) trg = e.target.parentElement.previousElementSibling;

                        it('#' + trg.id).datepicker('show');
                    }

                    loading = true;
                }

                // Get config
                cfg = cfg.custom[id];

                if (!loading) {
                    // Close all previous datepickers
                    var items = document.querySelectorAll(".datepicker-close");
                    for (var x = 0; x < items.length; x++) {
                        items[x].click();
					}
					
					it.simulateEvent("change", target);

                    // Get current values
                    cfg.curDate = new Date();
                    cfg.curDate.setMinutes(new Date().getMinutes() - new Date().getTimezoneOffset());
                    cfg.curDate = cfg.curDate.toJSON().slice(0, 10);
                    cfg.curYear = cfg.curDate.split(/[\-|\/]/g)[0];
                    cfg.curMonth = cfg.curDate.split(/[\-|\/]/g)[1];
                    cfg.curDay = cfg.curDate.split(/[\-|\/]/g)[2];

                    // Get requested values
                    if (target.value.trim() == "" || target.value.length < 10) {
                        cfg.selYear = cfg.curYear;
                        cfg.selMonth = cfg.curMonth;
                        cfg.selDay = cfg.curDay;

                    } else {
						target.value = target.value.trim();
                        cfg.selYear = target.value.substr(cfg.format.indexOf("YYYY"), 4);
                        cfg.selMonth = target.value.substr(cfg.format.indexOf("MM"), 2);
						cfg.selDay = target.value.substr(cfg.format.indexOf("DD"), 2);

						if(!it.datepicker.validDate(cfg.selDay, cfg.selMonth, cfg.selYear)){
							// console.log("Invalid Date!")
							cfg.selYear = cfg.curYear;
							cfg.selMonth = cfg.curMonth;
							cfg.selDay = cfg.curDay;
						}
					}
					
					target.value = cfg.format.replace(/DD/, cfg.selDay).replace(/MM/, cfg.selMonth).replace(/YYYY/, cfg.selYear);
                    it.simulateEvent("change", target);

                    cfg.selMName = cfg.longmonths[parseInt(cfg.selMonth - 1)];
                    cfg.selDName = cfg.longdays[new Date(cfg.selYear + "-" + cfg.selMonth + "-" + cfg.selDay).getUTCDay()];

                    // Get all days from requested month
                    var x = 1, c = true, firstdate = '', lastdate = '';
                    while (c) {
                        var dt = new Date(cfg.selYear + '-' + cfg.selMonth + '-' + (x < 10 ? ('0' + x) : x));

                        c = dt.getMonth() + 1 == cfg.selMonth;

                        if (x == 1) firstdate = cfg.selYear + '-' + cfg.selMonth + '-01';

                        if (c) {
                            cfg.md.c[x - 1] = (x < 10 ? ('0' + x) : x) + '-' + cfg.selMonth + '-' + cfg.selYear;
                            lastdate = cfg.selYear + '-' + cfg.selMonth + '-' + (x < 10 ? ('0' + x) : x);
                        }
                        x++;
                    }

                    // Get before days from requested month
                    var aux = new Date(firstdate).getUTCDay() - cfg.weekstart, dt = 0;
                    aux = (aux < 0 ? 6 : aux);
                    for (var x = 0; x < aux; x++) {
                        dt = new Date(new Date(firstdate).getTime() - (86400000 * (x + 1)));
                        var d = dt.getDate(), m = dt.getMonth() + 1, y = dt.getFullYear();

                        cfg.md.b[aux - x - 1] = (d < 10 ? ('0' + d) : d) + '-' + (m < 10 ? ('0' + m) : m) + '-' + y;
                    }

                    // Fill after days to complete 42
                    var aux = new Date(lastdate).getUTCDay(), dt = 0, cc = cfg.md.c.length + cfg.md.b.length;
                    for (var x = cc; x < 42; x++) {
                        dt = new Date(new Date(lastdate).getTime() + (86400000 * (x - cc + 1)));
                        var d = dt.getDate(), m = dt.getMonth() + 1, y = dt.getFullYear();

                        cfg.md.a[x - cc] = (d < 10 ? ('0' + d) : d) + '-' + (m < 10 ? ('0' + m) : m) + '-' + y;
                    }

                    // Define picker object
                    var cal = document.createElement("section");
                    cal.classList.add("datepicker-date");
                    cal.id = "datepicker-layer-" + target.id
					cal.setAttribute("data-id", target.id);
					cal.setAttribute("tabindex", "0");
					cal.setAttribute("onkeydown", "it.datepicker.onkeydown()");
					cal.setAttribute("onclick", "it.datepicker.click(this)");
					
                    var cclose = document.createElement("i");
                    cclose.classList.add("datepicker-close");
                    cclose.innerHTML = "Cerrar";

                    var lcal = document.createElement("div");
                    lcal.classList.add("l-cal");
                    var aux = '<span>' + cfg.selDay + '</span>';
                    aux += '<span>' + cfg.selDName + '</span>';
                    aux += '<span>' + cfg.selMName + '</span>';
                    aux += '<span>' + cfg.selYear + '</span>';
                    aux += '<div class="datepicker-buttons">';
                    aux += ' <button id="datepicker-layer-' + target.id + '-today">' + cfg.textToday + '</button>';
                    aux += ' <button id="datepicker-layer-' + target.id + '-remove">' + cfg.textRemove + '</button>';
                    aux += '</div>';

                    lcal.innerHTML = aux;

                    // Create right layer
                    var rcal = document.createElement("div");
                    rcal.classList.add("r-cal");

                    // Fill years select 
                    var aux = "";
                    for (var x = 1900; x < parseInt(cfg.curYear) + 10; x++) {
                        var active = x == cfg.selYear ? 'selected' : '';
                        aux += '<option value="' + x + '"' + active + '>' + x + '</option>'
                    }
                    rcal.innerHTML = '<div class="datepicker-years"><select id="datepicker-year">' + aux + '</select></div>';

                    // Fill months buttons
                    var aux = "";
                    for (var x = 0; x < cfg.shortmonths.length; x++) {
                        var active = x == cfg.selMonth - 1 ? ' active' : '';
                        aux += '<span data-id="' + x + '" class="month' + active + '">' + cfg.shortmonths[x] + '</span>';
                    }
                    rcal.innerHTML += '<div class="datepicker-months">' + aux + '</div>';

                    // Now create template
                    var all = cfg.md.b.concat(cfg.md.c).concat(cfg.md.a);
                    var vday = parseInt(target.value.split('-')[0]), vmon = parseInt(target.value.split('-')[1]);

                    // Fill day names
                    var dm = '<div class="datepicker-week-names"><div class="datepicker-week">';
                    for (var k = cfg.weekstart; k < cfg.shortdays.length; k++) {
                        dm += '<span class="dayname">' + cfg.shortdays[k] + '</span>';
                    }
                    for (var k = 0; k < cfg.weekstart; k++) {
                        dm += '<span class="dayname">' + cfg.shortdays[k] + '</span>';
                    }
                    dm += '</div></div>';
                    rcal.innerHTML += dm;

                    // Fill day values
                    var tmpl = '<div class="datepicker-week-data">', x = 0, antday = 0;
                    for (var k in all) {
                        var y = all[k].split('-')[2], m = all[k].split('-')[1], d = all[k].split('-')[0];
                        var day = parseInt(d), mon = parseInt(m);

                        if (x == 0) { tmpl += '<div class="datepicker-week">'; }
                        else if (x % 7 == 0) { tmpl += '</div><div class="datepicker-week">'; }

                        var mode = '';
                        if (mon == parseInt(cfg.selMonth) && day == vday) mode += ' active';
                        if (mon != parseInt(cfg.selMonth)) mode += " disabled";

                        antday = day;

                        tmpl += '<span class="day' + mode + '">' + d + '</span>';
                        x++;
                    }
                    tmpl += '</div>';

                    rcal.innerHTML += tmpl;

                    cal.appendChild(cclose);
                    cal.appendChild(lcal);
                    cal.appendChild(rcal);

					document.body.appendChild(cal);
					cal.focus();

                    // Add close event
                    cclose.onclick = it.datepicker.closeEvent;

                    // Add day event
                    var items = rcal.querySelectorAll(".day");
                    for (var x = 0; x < items.length; x++) {
                        var item = items[x];
                        item.onclick = it.datepicker.dayEvent;
                    }

                    // Add month event
                    var m = rcal.querySelectorAll(".month");
                    for (var x = 0; x < m.length; x++) {
                        var item = m[x];

                        item.onclick = it.datepicker.monthEvent;
                    }

                    // Add year event
                    var s = rcal.querySelector("select");
                    s.onchange = it.datepicker.yearEvent;

                    // Add set today event
                    var b = document.getElementById("datepicker-layer-" + target.id + "-today");
                    b.onclick = it.datepicker.todayEvent;

                    // Add remove data event
                    var b = document.getElementById("datepicker-layer-" + target.id + "-remove");
                    b.onclick = it.datepicker.removeEvent;
                }
            }); // end forEach
		}
		
		it.datepicker.validDate = function(d, m, y){
			var validDaysPerMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

			var validYear = y >= 1900 && y < (new Date(Date.now()).getFullYear() + 10);
			
			var isleap = (y % 100 === 0) ? (y % 400 === 0) : (y % 4 === 0);
			if(isleap){
				validDaysPerMonth[1]++;
			}

			var validMonth = m >= 1 && m <= 12;
			var validDay = d >= 1 && d <= (validDaysPerMonth[m-1]); 

			if(validYear && validMonth && validDay) return true;

			return false;
		}

        it.datepicker.closeEvent = function (e) {
            e.target.parentElement.remove();
        }

        it.datepicker.dayEvent = function (e) {
            if (e.target.classList.contains("disabled")) return;

            var aux = e.target.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling;
            aux.click();

            var prt = aux.parentElement.dataset.id;
            var cfg = it.datepicker.config.custom[prt];

            document.getElementById(prt).value = cfg.format.replace(/DD/, e.target.innerHTML).replace(/MM/, cfg.selMonth).replace(/YYYY/, cfg.selYear);

            it.simulateEvent("change", document.getElementById(prt));

            if(!cfg.autoClose) it('#' + prt).datepicker('show');
        }

        it.datepicker.monthEvent = function (e) {
            var aux = e.target.parentElement.parentElement.previousElementSibling.previousElementSibling;
            aux.click();
            var prt = aux.parentElement.dataset.id;
            var cfg = it.datepicker.config.custom[prt];
            var mm = parseInt(e.target.dataset.id) + 1;
			mm = mm < 10 ? ('0' + mm) : mm;
			
			// Adjustment by nonexistent day
			var ndate = new Date(cfg.selYear,  mm-1, cfg.selDay);
			if(ndate.getDate() != cfg.selDay){
				var ndate = new Date(cfg.selYear, mm, 0);
				cfg.selDay = ndate.getDate();
				cfg.selDay = cfg.selDay < 10 ? ('0' + cfg.selDay) : cfg.selDay;
				cfg.selYear = ndate.getFullYear();
				mm = ndate.getMonth() + 1;
				mm = mm < 10 ? ('0' + mm) : mm;
			}
			
			// Asign selected date
			document.getElementById(prt).value = cfg.format.replace(/DD/, cfg.selDay).replace(/MM/, mm).replace(/YYYY/, cfg.selYear);
			
            it.simulateEvent("change", document.getElementById(prt));

            it('#' + prt).datepicker('show');
        }

        it.datepicker.yearEvent = function (e) {
            var aux = e.target.parentElement.parentElement.previousElementSibling.previousElementSibling;
            aux.click();

            var prt = aux.parentElement.dataset.id;
            var cfg = it.datepicker.config.custom[prt];

            document.getElementById(prt).value = cfg.format.replace(/DD/, cfg.selDay).replace(/MM/, cfg.selMonth).replace(/YYYY/, e.target.value);

            it.simulateEvent("change", document.getElementById(prt));

            it('#' + prt).datepicker('show');
        }

        it.datepicker.todayEvent = function (e) {
            var aux = e.target.parentElement.parentElement.parentElement;
            var cfg = it.datepicker.config.custom[aux.dataset.id];

            document.getElementById(aux.dataset.id).value = cfg.format.replace(/DD/, cfg.curDay).replace(/MM/, cfg.curMonth).replace(/YYYY/, cfg.curYear);

            it.simulateEvent("change", document.getElementById(aux.dataset.id));
			
            if(cfg.autoClose){
				e.target.parentElement.parentElement.parentElement.children[0].click();
			} else {
				it('#' + aux.dataset.id).datepicker('show');
			}
        }

        it.datepicker.removeEvent = function (e) {
			var aux = e.target.parentElement.parentElement.parentElement;
			var cfg = it.datepicker.config.custom[aux.dataset.id];

            document.getElementById(aux.dataset.id).value = '';

			it.simulateEvent("change", document.getElementById(aux.dataset.id));
			
			if(cfg.autoClose){
				e.target.parentElement.parentElement.parentElement.children[0].click();
			}
		}
		
		it.datepicker.onkeydown = function () {
			var key = window.event.keyCode || window.event.which;
			if (key == 9 || key == 27) {
				if (document.querySelector(".datepicker-close")) {
					document.querySelector(".datepicker-close").click();
				}
			}
		}

		it.datepicker.click = function () {
			var trg = window.event.target;
			if(trg.tagName.toLowerCase() == "section"){
				trg.querySelector('.datepicker-close').click();
			}
		}

		it.datepicker.version = '1.0';

        it.datepicker.addStyles = function (id, bg, fg) {
            it.addCSSRule('', "#datepicker-layer-" + id, 'width: 360px; display: block; border: 1px solid rgba(0,0,0,0.05); padding: 0; height: auto; box-sizing: content-box; position: fixed; z-index: 999999; top: 15%; left: calc(50% - 180px); overflow: hidden;');
            it.addCSSRule('', "#datepicker-layer-" + id + "::before", 'content: ""; width: 100%; left: 0; top: 0; height: 100%; position: fixed; background: rgba(0,0,0,0.3); z-index: -1;');
            it.addCSSRule('', "#datepicker-layer-" + id + "::after ", 'content: ""; width: 100%; left: 0; top: 0; height: 100%; position: absolute; background:' + fg + '; z-index: -1;');
            it.addCSSRule('', "#datepicker-layer-" + id + " .datepicker-close", ' cursor: pointer; position: absolute; top: 0; left: 25%; font-size: 1rem; width: 25%; color: ' + bg + '; padding-left: 36px; line-height: 36px; font-style: normal; font-weight: bold;');
            it.addCSSRule('', "#datepicker-layer-" + id + " .datepicker-close::before, #datepicker-layer-" + id + " .datepicker-close::after", 'content: ""; border-top: 2px solid ' + bg + '; width: 18px; height: 2px; display: block; transform: rotate(45deg); position: absolute; top: 16px; left: 10px;');
            it.addCSSRule('', "#datepicker-layer-" + id + " .datepicker-close::after", 'transform: rotate(-45deg);');
            it.addCSSRule('', "#datepicker-layer-" + id + " .l-cal", 'position: absolute; top: 0; left: 0; width: 25%; display: block; height: 100%; background: ' + bg + '; color: ' + fg + '; float: left; text-align: center; padding: 0px 3px 5px 3px;');
            it.addCSSRule('', "#datepicker-layer-" + id + " .l-cal span", 'opacity: 0.5;');
            it.addCSSRule('', "#datepicker-layer-" + id + " .l-cal span:first-child", 'font-size: 38px; width: 100%; display: block; margin-top: 5px;');
            it.addCSSRule('', "#datepicker-layer-" + id + " .l-cal span:nth-child(2)", 'font-size: 18px; width: 100%; display: block; margin-bottom: 18px;');
            it.addCSSRule('', "#datepicker-layer-" + id + " .l-cal span:nth-child(4)", 'line-height: 32px; display: block;');
            it.addCSSRule('', "#datepicker-layer-" + id + " .r-cal", 'background: ' + fg + '; width: 75%; display: block; height: 100%; float: left; padding: 5px 0; margin-left: 25%;');
            it.addCSSRule('', "#datepicker-layer-" + id + " .datepicker-years", 'margin-bottom: 0; padding: 0 5px 5px;');
            it.addCSSRule('', "#datepicker-layer-" + id + " .datepicker-years select", 'font-size: 14px; cursor: pointer; height: 24px; width: 25%; background: ' + fg + '; color: #000; border: 0 navajowhite; margin-left: 75%;');
            it.addCSSRule('', "#datepicker-layer-" + id + " .datepicker-months", 'border-bottom: 1px solid rgba(0,0,0,0.2); padding: 0 4px;');
            it.addCSSRule('', "#datepicker-layer-" + id + " .datepicker-months .month", 'cursor: pointer; font-size: 14px; width: 40px; display: inline-block; text-align: center; border: 1px solid rgba(0,0,0,0.1); margin: 0 0 5px 3px; padding: 1px 0 0 0; line-height: 21px; box-sizing: border-box;');
            it.addCSSRule('', "#datepicker-layer-" + id + " .datepicker-months .month.active, #datepicker-layer-" + id + " .datepicker-months .month:hover", ' background: ' + bg + '; color: ' + fg + '; border-color: rgba(0,0,0,0.1); font-weight: normal; padding: 0;');
            it.addCSSRule('', "#datepicker-layer-" + id + " .datepicker-week", 'padding: 0 5px; display: table;');
            it.addCSSRule('', "#datepicker-layer-" + id + " .r-cal .datepicker-week-names .datepicker-week", 'padding: 5px; background: ' + bg + '; color: ' + fg + ';');
            it.addCSSRule('', "#datepicker-layer-" + id + " .datepicker-week .dayname, #datepicker-layer-" + id + " .datepicker-week .day", 'cursor: pointer; font-size: 14px; width: 40px; display: table-cell; text-align: center; border: 0 none; margin: 0; padding: 2px 6px 0px 6px; margin-bottom: 5px; border-color: rgba(0, 0, 0, 0);');
            it.addCSSRule('', "#datepicker-layer-" + id + " .datepicker-week .day.disabled", 'opacity: 0.5;');
            it.addCSSRule('', "#datepicker-layer-" + id + " .datepicker-week .day.active, #datepicker-layer-" + id + " .datepicker-week .day:hover", 'font-weight: normal; background: ' + bg + '; color: ' + fg + '; border-color: rgba(0,0,0,0.1); padding: 0 6px;');
            it.addCSSRule('', "#datepicker-layer-" + id + " .datepicker-buttons", 'position: absolute; bottom: 0; left: 0; width: 100%; background: rgba(0,0,0,0.2); padding: 0;');
            it.addCSSRule('', "#datepicker-layer-" + id + " .datepicker-buttons button", 'cursor: pointer; color: ' + fg + '; background: ' + bg + '; border: 1px solid ' + bg + '; height: 30px; font-weight: normal; font-size: 14px; width: 100%; margin: 0; padding-top: 1px;');
            it.addCSSRule('', "input.has-datepicker + button", 'cursor:pointer; background: rgba(0,0,0,0); border: 0 none; position: relative; left: 0; top: 0; min-height: 24px;');
        };

        it.datepicker.config = {
            buttonicon: '<i class="fa fa-calendar"></i>',
            shortdays: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
            longdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            shortmonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            longmonths: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
			weekstart: 1,
			textToday: 'Hoy',
            textRemove: 'Eliminar',
			autoClose: true,
			curDate: null,
            selMonth: null,
            selYear: null,
            selDay: null,
            format: 'DD-MM-YYYY',
            md: {},
            custom: []
        }

        it.datepicker.help = function (cfg) {
            it.help('Datepicker', cfg);
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
		this.Debugger = it.debugger = {
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
										it.simulateEvent("change", e.target);
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
		this.GetBrowser = it.getBrowser = function (cfg) {
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
		@version: 1.03
		@author: Pablo E. Fernández (islavisual@gmail.com).
		@Copyright 2017-2019 Islavisual.
		@Last update: 07/04/2019
	**/
	if(json.GetParam){
		this.GetParam = it.getParam = function (cfg) {
			if (typeof cfg == "undefined") cfg = {};

			if ((typeof cfg == "string" && cfg == "help") || cfg.hasOwnProperty("help")) {
				if (typeof showHelper != "undefined") showHelper("GetParam", cfg);
				else alert("Helper not available!")
				return;
			}

			var vars = {};
			var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
				if(typeof cfg == "string" && cfg == key){
					vars = value;
					return vars;

				} else if(typeof cfg == 'object'){
					vars[key] = value;
				}
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
		this.HttpRequest = it.httpRequest = function (cfg) {
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
			try{
				http.responseType = opt.responseType;
				http.timeout = opt.timeout
			} catch(e) {}

			http.onloadstart = function (e) { opt.onLoadStart ? opt.onLoadStart(e) : (opt.debug ? console.log("onLoadStart", e) : null); }
			http.onload = function (e) { opt.onLoad ? opt.onLoad(e) : (opt.debug ? console.log("onLoad", e) : null); }
			http.onprogress = function (e) { opt.onProgress ? opt.onProgress(e) : (opt.debug ? console.log("onProgress", e) : null); }
			http.onloadend = function (e) { opt.onLoadEnd ? opt.onLoadEnd(e) : (opt.debug ? console.log("onLoadEnd", e) : null); }
			http.ontimeout = function (e) { opt.onTimeout ? opt.onTimeout(e) : (opt.debug ? console.log("onTimeout", e) : null); }
			http.onerror = function (e) { opt.onError ? opt.onError(e) : (opt.debug ? console.log("onError", e) : null); }
			http.onabort = function (e) { opt.onAbort ? opt.onAbort(e) : (opt.debug ? console.log("onAbort", e) : null); }

			// When request is ready...
			http.onreadystatechange = function () {
				if (http.readyState == 4) {
					if(http.status == 200){
						if (opt.returnFullResponse)
							opt.callback(http);
						else
							if(it.browser == "IE" && opt.responseType == "json") setTimeout(function(){ opt.callback(JSON.parse(http.response)); }, 150);
							else opt.callback(http.response);
					}
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
		this.Include = it.include = function (cfg) {
			// Default values to cfg
			if (typeof cfg == "undefined" || cfg == null) cfg = {};

			if ((typeof cfg == "string" && cfg == "help") || cfg.hasOwnProperty("help")) {
				if (typeof showHelper != "undefined") showHelper("Include", cfg);
				else alert("Helper not available!")
				return;
			}

			if(!this.targets){
				if (!cfg.hasOwnProperty('target')) { alert("You need set an object like target to execute the include!. Please, see the help with the Include('help');"); return false; }
			}

			Array.prototype.slice.call(this.targets).forEach(function(target){
				cfg.target = target;

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

				// Create JSON with current opt
				var opt = {
					data: !cfg.hasOwnProperty('data') ? '' : cfg.data,
					file: !cfg.hasOwnProperty('file') ? '' : cfg.file,
					target: target,
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
			});
		}
	}

	/**
		 Function to detect if a device is mobile or tablet.
		@version: 1.00
		@author: Pablo E. Fernández (islavisual@gmail.com).
		@Copyright 2017-2019 Islavisual.
		@Last update: 30/07/2019
	**/
	if(json.IsMobile){
		this.IsMobile = it.isMobile = function (cfg) {
			if (typeof cfg == "undefined") cfg = {};

			if ((typeof cfg == "string" && cfg == "help") || cfg.hasOwnProperty("help")) {
				if (typeof showHelper != "undefined") showHelper("IsMobile", cfg);
				else alert("Helper not available!")
				return;
			}

			// Test touch event
			var te;
			try{ 
				document.createEvent("TouchEvent");
				if(typeof te != "undefined") return true;
			} catch(e){}

			// Test the operative system
			var devices = ["webOS", "iPhone", "iPad", 
                   "iPod", "BlackBerry", "IEMobile", 
				   "Opera Mini"];
			devices = new RegExp(devices.join("|"), 'i');
			if (devices.test(navigator.userAgent)) return true;
			
			// Test width of screen
			if(window.screen.width <= 768) return true;

			// Test width of window (for developers mode with the opened console)
			if(window.innerWidth <= 768) return true;

			return false;
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
		this.Language = it.language = {
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
		Masking inputs functionality
		@version: 1.00																					
		@author: Pablo E. Fernández (islavisual@gmail.com).
		@Copyright 2019 Islavisual.
		@Last update: 11/07/2019
	**/
	if(json.Mask){
		this.Mask = it.mask = {
			version: '1.0',
			config: [],
			help: function(cfg){
				if(typeof cfg == "undefined") cfg = {help: ''};
				if(!cfg.hasOwnProperty("help")) cfg.help = '';

				if (typeof showHelper != "undefined") showHelper("Mask", cfg);
				else alert("Helper not available!")
				return;
			},
			set: function(cfg){
				// If it.target has value, set to cfg object
				if(!cfg.hasOwnProperty('target') && this.targets) cfg.target = this.targets[0].id;

				if (document.getElementById(cfg.target) == null) { alert("The element with ID '" + cfg.target + "' not exists!"); return false; }
				if (cfg.hasOwnProperty("mask") == null) { alert("Mask not defined to '" + cfg.target + "'"); return false; }

				if(arguments.length == 0) opt = {};

				// Assign arguments
				this.config[cfg.target] = cfg;
				
				cfg.target = document.getElementById(cfg.target);
				cfg.target.type = "text";

				// Set attributes
				cfg.target.setAttribute("placeholder", cfg.mask);
				cfg.target.setAttribute("maxlength", cfg.mask.length);

				// Set paste event
				cfg.target.addEventListener('paste', function (e){
					var EV = e;
					setTimeout(function(){ Mask.fullFormat(EV)} , 150);
				});

				// Set keyborad events
				cfg.target.addEventListener('keydown', function (e){
					return Mask._customEvent(e, Mask.config[e.target.id]);
				});
			},
			getPositionCursor: function(e) {
				var p = 0, trg = e.target;
			  
				if (document.selection) {
					trg.focus();

					var s = document.selection.createRange();
						s.moveStart('character', -trg.value.length);

					p = s.text.length;

				} else if (trg.selectionStart || trg.selectionStart == '0'){
					p = trg.selectionDirection=='backward' ? trg.selectionStart : trg.selectionEnd;
				}

				return p;
			  },
			_customEvent: function(e, config){
				var kc = e.keyCode, k = e.key[0], aok;

				// Check if ignore keys
				var _ignoreKeys = [8,9,16,17,18,33,34,35,36,37,38,39,40,45,46,112,113,114,115,116,117,118,119,120,121,122,123];
				if(_ignoreKeys.indexOf(kc) != -1){ return false; }
				if(e.ctrlKey) return true;

				// Check if char coincidence with mask
				var m = config.mask.charAt(this.getPositionCursor(e));
				if(config.target.selectionEnd - config.target.selectionStart == 0 && !/[9ADMYHIS#]/g.test(m)){ 
					e.target.value += m; 
					m = config.mask.charAt(this.getPositionCursor(e));
				}

				var isSep = config.mask.replace(/[9ADMYHIS#]/mg, '').indexOf(k) != -1;
				if(isSep){
					
				}

				aok = ('9DMYHIS'.indexOf(m) != -1 ? /\d/ : (m == 'A' ? /[a-zA-Z]/ : /./)).test(k);

				var reg, tmp = m, mg = true;
				switch (m) {
					case "D":
						reg = /(0[1-9]|1[0-9]|2[0-9]|3[0-1])/;
						break;
					case "M":
						reg = /(0[1-9]|1[0-2])/;
						break;
					case "Y":
						reg = /\d{4}/;
						break;
					case "H":
						reg = /(0[0-9]|1[0-9]|2[0-3])/;
						break;
					case "I":
						reg = /(0[0-9]|[1-5][0-9])/;
						break;
					case "S":
						reg = /(0[0-9]|[1-5][0-9])/;
						break;
					case "#":
						reg = /./;
						break;
					default:
						mg = false;
				}
				
				if(mg){
					if('DMYHIS'.indexOf(m) != -1) tmp = m+m; 
					if(config.mask.substr(config.mask.indexOf(m)+2,1) == "Y") tmp = "YYYY";

					aok = aok ? this._check(tmp, reg, e) : false;
				}
				
				if (aok){
					if(e.type == "paste") {e.target.value += k;}
				} else {
					return this._rollbackEvent(e);
				}

				return aok;
			},
			fullFormat: function(e){
				var cfg  = this.config[e.target.id];
				var v = e.target.value;
				e.target.value = "";

				for(var x = 0; x < v.length; x++){
					if(cfg.mask.replace(/[9ADMYHIS]/g, '').indexOf(v[x]) != -1) continue;

					// Modify event
					var e1 = e;
						e1.keyCode = v[x].charCodeAt(0); e1.which = v[x].charCodeAt(0); e1.key = v[x];
						e1.ctrlKey = false; e1.altKey = false; e1.shiftKey = false;
					
					// Trigger custom event
					var st = this._customEvent(e1, cfg);
					if(!st) break;
				}
			},
			_check: function(f, reg, e){
				var cfg  = this.config[e.target.id];
				var p    = cfg.mask.indexOf(f)
				var pmax = cfg.mask.indexOf(f) + cfg.mask.substr(cfg.mask.indexOf(f),4).length;
				var b    = true;
				var v    = e.target.value, k = e.key[0];
				var ss   = e.target.selectionStart, se = e.target.selectionEnd;

				if(f == 'YYYY' && ss == pmax - 1){
					var yy = v.substr(p, 4) + k
					var dd = (v + k).substr(cfg.mask.indexOf('DD'), 2);
					var mm = (v + k).substr(cfg.mask.indexOf('MM'), 2);
					
					var isleap = (yy % 100 === 0) ? (yy % 400 === 0) : (yy % 4 === 0);
					if ((mm == 2 && dd > 29) || (mm == 2 && dd == 29 && !isleap)) b = false;

				} else if(f == 'YY' && ss == pmax - 1){
						var yy = 20 + v.substr(p, 2) + k
						var dd = (v + k).substr(cfg.mask.indexOf('DD'), 2);
						var mm = (v + k).substr(cfg.mask.indexOf('MM'), 2);
						
						var isleap = (yy % 100 === 0) ? (yy % 400 === 0) : (yy % 4 === 0);
						if ((mm == 2 && dd > 29) || (mm == 2 && dd == 29 && !isleap)) b = false;

				} else if(f == 'MM' && ss == p + 1){
					var dd = (v + k).substr(cfg.mask.indexOf('DD'), 2);
					var mm = (v + k).substr(cfg.mask.indexOf('MM'), 2);
					var monthdays=[31,29,31,30,31,30,31,31,30,31,30,31];
					var max = monthdays[parseInt(mm) - 1];
					
					b = dd <= max;

				} else {
					if(se - ss > 0){
						e.target.value = v.substring(0, ss) + v.substring(se, v.length);
						v = e.target.value;
						e.target.selectionStart = ss;
						e.target.selectionEnd = ss;
					}

					// rebuild new input value
					v = v.substr(0, ss) + k + v.substr(ss, v.length);
					v = parseInt(v.substr(cfg.mask.indexOf(f), f.length))

					// Show log
					//console.log("F:", f, "SS:",ss, "SE:", se, "V:",v, "PM:", p)

					// Truncate 00 to 01 in day type
					var fb = false;
					if(f == "HH" && ss == p && k != 0) fb = /[0-2]/.test(k);
					else if(f == "II" && ss == p && k != 0) fb = /[0-5]/.test(k);
					else if(f == "SS" && ss == p && k != 0) fb = /[0-5]/.test(k);
					else if(f == "DD" && ss == p && k != 0) fb = /[0-3]/.test(k);
					else if(f == "MM" && ss == p && k != 0) fb = /[0-1]/.test(k);
					else if(f[0] == "Y" && ss < pmax) return /[0-9]/.test(k);

					if(!fb && ss == p && ((f == "DD" || f == "MM") || (k != 0 && (f == "HH" || f == "II" || f == "SS")))){
						e.target.value = e.target.value.substr(0, ss) + '0' + e.target.value.substr(se);
					}
				
					// Add zero before if lower than 10
					v = v < 10 ? ("0" + v) : (v + "");

					b = new RegExp(reg).test(v);
				}

				return b;
			},
			_rollbackEvent: function(e){
				e.preventDefault();
				e.stopImmediatePropagation();
				return false;
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
		N-State
		@version: 1.00
		@author: Pablo E. Fernández (islavisual@gmail.com).
		@Copyright 2017-2019 Islavisual.
		@Last update: 11/06/2019
	**/
	if(json.Nstate){
		this.Nstate = it.nstate = {
			version: '1.0',
			config: { type: 'switch', style: '', id: '' },
			help: function(cfg){
				if(typeof cfg == "undefined") cfg = {help: ''};
				if(!cfg.hasOwnProperty("help")) cfg.help = '';

				if (typeof showHelper != "undefined") showHelper("Nstate", cfg);
				else alert("Helper not available!")
				return;
			},
			addRules: function(type, cfg){
				if(typeof type == "undefined") type = "switch";

				this.config.colors= cfg.hasOwnProperty('colors') ? cfg.colors : { background: '#02a5a5', textColor: '#000000', trackColor: '#f0f0f0' };

				if(type == "switch"){
					it.addCSSRule('', "nstate[type=switch]", "border-radius: 5px; display: inline-block; height: 24px; padding: 3px; position: relative; vertical-align: top; width: 200px; max-width: 86px; margin: 0; top: 0;");
					it.addCSSRule('', "nstate[type=switch] input", "cursor: pointer; width: 100%; left: 0; opacity: 0; position: absolute; top: 0; height: 20px !important; z-index: 1; ");
					it.addCSSRule('', "nstate[type=switch] label", "color: #000; font-size: 12px; background: " + this.config.colors.background2 + " none repeat scroll 0 0; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12) inset, 0 0 2px rgba(0, 0, 0, 0.15) inset; display: block; font-size: 10px; height: inherit; position: relative; text-transform: uppercase; transition: all 0.15s ease-out 0s;");
					it.addCSSRule('', "nstate[type=switch] label::before, nstate[type=switch] label::after", "font-size: 12px; line-height: 1; margin-top: -0.5em; position: absolute; top: 50%; transition: inherit;");
					it.addCSSRule('', "nstate[type=switch] label::before", "color: " + this.config.colors.textColor + "; content: attr(data-off); right: 7px; ");
					it.addCSSRule('', "nstate[type=switch] label::after", "color: " + this.config.colors.textColor + "; content: attr(data-on); left: 7px; opacity: 0; ");
					it.addCSSRule('', "nstate[type=switch] input ~ label", "background: linear-gradient(to bottom, " + this.config.colors.trackColor2 + " 0%, " + this.config.colors.trackColor + " 100%); box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15) inset, 0 0 3px rgba(0, 0, 0, 0.2) inset; border-radius: 5px;");
					it.addCSSRule('', "nstate[type=switch] input:checked ~ label::before", "opacity: 0;");
					it.addCSSRule('', "nstate[type=switch] input:checked ~ label::after", "opacity: 1;");
					it.addCSSRule('', "nstate[type=switch] handle", "background: linear-gradient(to bottom, " + this.config.colors.background + " 0%, " + this.config.colors.background2 + " 100%); box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2); height: 22px; left: 4px; position: absolute; top: 4px; transition: left 0.15s ease-out 0s; width: 50%; border-radius: 5px;");
					it.addCSSRule('', "nstate[type=switch] handle::before", "background: linear-gradient(to bottom, " + this.config.colors.background2 + " 0%, " + this.config.colors.background + " 100%); border-radius: 6px; box-shadow: 0 1px rgba(0, 0, 0, 0.02) inset; content: ''; height: 12px; left: 50%; margin: -6px 0 0 -6px; position: absolute; top: 50%; width: 12px;");
					it.addCSSRule('', "nstate[type=switch] input:checked ~ handle", "box-shadow: -1px 1px 5px rgba(0, 0, 0, 0.2); left: calc(50% - 5px);");

				} else if(type == "multiple") {
					it.addCSSRule('', "nstate[type=multiple] values", "width: 100%; display: table; height: auto;");
					it.addCSSRule('', "nstate[type=multiple] values span", "color: " + this.config.colors.textColor + "; width: 33.3333%; text-align: left; float: left; margin-top: 5px; cursor: pointer;");
					it.addCSSRule('', "nstate[type=multiple] values span:nth-child(2)", "text-align: center;");
					it.addCSSRule('', "nstate[type=multiple] values span:nth-child(3)", "text-align: right;");
					it.addCSSRule('', "nstate[type=multiple] values span.selected", "font-weight: 600;");
					it.addCSSRule('', "nstate[type=multiple] input[type=range]", 'position:relative; -o-appearance: none; -ms-appearance: none; -moz-appearance: none; -webkit-appearance: none; appearance: none; margin: 18px 0; width: 100%; outline: none;');
					it.addCSSRule('', "nstate[type=multiple] input[type=range]:focus", 'border: 0 none !important; outline: none; background: ' + this.config.colors.trackColor + ' !important;');
					it.addCSSRule('', "nstate[type=multiple] input[type=range]::-webkit-slider-runnable-track", 'width: 100%; height: 8.4px; cursor: pointer; background: ' + this.config.colors.trackColor + '; border: 0.2px solid ' + this.config.colors.trackColor2 + '; border-radius: 0;');
					it.addCSSRule('', "nstate[type=multiple] input[type=range]::-webkit-slider-thumb", 'border: 1px solid ' + this.config.colors.background2 + '; height: 24px; width: 24px; background: ' + this.config.colors.background + '; cursor: pointer; -webkit-appearance: none; margin-top: -8px; border-radius: 0;');
					it.addCSSRule('', "nstate[type=multiple] input[type=range]:focus::-webkit-slider-runnable-track", 'background: ' + this.config.colors.background + '; border: 0 none !important;');
					it.addCSSRule('', "nstate[type=multiple] input[type=range]::-moz-range-track", 'width: 100%; height: 8.4px; cursor: pointer; background: ' + this.config.colors.trackColor + '; border: 0.2px solid ' + this.config.colors.trackColor2 + '; border-radius: 0;');
					it.addCSSRule('', "nstate[type=multiple] input[type=range]::-moz-range-thumb", 'border: 1px solid ' + this.config.colors.background2 + '; height: 24px; width: 24px; background: ' + this.config.colors.background + '; cursor: pointer; border-radius: 0;');
					it.addCSSRule('', "nstate[type=multiple] input[type=range]::-ms-track", 'width: 100%; height: 8.4px; cursor: pointer; background: rgba(0,0,0,0); border-color: ' + this.config.colors.trackColor + '; border-width: 0; color: transparent; border-radius: 0;');
					it.addCSSRule('', "nstate[type=multiple] input[type=range]::-ms-fill-lower", 'background: ' + this.config.colors.trackColor + '; border: 0.2px solid ' + this.config.colors.trackColor2 + ';');
					it.addCSSRule('', "nstate[type=multiple] input[type=range]::-ms-fill-upper", 'background: ' + this.config.colors.trackColor + '; border: 0.2px solid ' + this.config.colors.trackColor2 + ';');
					it.addCSSRule('', "nstate[type=multiple] input[type=range]::-ms-thumb", 'border: 1px solid ' + this.config.colors.background2 + '; height: 24px; width: 24px; background: ' + this.config.colors.background + '; cursor: pointer; border-radius: 0;');
					it.addCSSRule('', "nstate[type=multiple] input[type=range]:focus::-ms-fill-lower", 'background: ' + this.config.colors.background + '; border: 0 none !important;');
					it.addCSSRule('', "nstate[type=multiple] input[type=range]:focus::-ms-fill-upper", 'background: ' + this.config.colors.background + '; border: 0 none !important;');
					it.addCSSRule('', "nstate[type=multiple] input[type=range]::-ms-tooltip", 'display: none;');
					it.addCSSRule('', "@media all and (-ms-high-contrast:none)", 'nstate[type=multiple] { position:relative; top: 6px; } nstate[type=multiple] input[type=range]{ margin: 0 0 10px 0; padding: 0; height: 24px; } nstate[type=multiple] input[type=range]:focus { background: rgba(0,0,0,0) !important; }');
				}
			},
			set: function(cfg){
				// If it.target has value, set to cfg object
				if(!cfg.hasOwnProperty('target') && this.targets) cfg.target = this.targets[0].id;
				
				if (document.getElementById(cfg.target) == null) { alert("The element with ID '" + cfg.target + "' not exists!"); return false; }

				// Configure execution
				this.target       = document.getElementById(cfg.target);
				this.config.type  = cfg.hasOwnProperty('type') ? cfg.type : 'switch';
				this.config.style = cfg.hasOwnProperty('style') ? cfg.style.trim() : '';
				this.config.colors= cfg.hasOwnProperty('colors') ? cfg.colors : { background: '#02a5a5', textColor: '#000000', trackColor: '#f0f0f0' };
				
				// Calculate background color to gradient
				var bg2 = (parseInt(this.config.colors.background.replace("#", '0x')) - 0x101010).toString(16);
				if(bg2 <= 0) {
					bg2 = (parseInt(this.config.colors.background.replace("#", '0x')) + 0x151515).toString(16);
					this.config.colors.background2 = this.config.colors.background;
					this.config.colors.background = "#"+bg2;
				} else {
					this.config.colors.background2 = "#"+bg2;
				}

				// Calculate track color to gradient and border
				var tc2 = (parseInt(this.config.colors.trackColor.replace("#", '0x')) - 0x101010).toString(16);
				if(tc2 <= 0) {
					tc2 = (parseInt(this.config.colors.trackColor.replace("#", '0x')) + 0x151515).toString(16);
					this.config.colors.trackColor2 = this.config.colors.trackColor;
					this.config.colors.trackColor = "#"+tc2;
				} else {
					this.config.colors.trackColor2 = "#"+tc2;
				}
				
				// Create main element container
				var cont = document.createElement('nstate');
					cont.setAttribute("type", this.config.type);
				
				// Add styles
				if(cfg.hasOwnProperty('style')) cont.setAttribute('style', cfg.style);
				
				["onblur", "onfocus", "onfocusin", "onfocusout", 
				 "onmousedown", "onmouseup", "onmouseover", "onmouseout",  
				 "oninput", "onclick", "onchange", 
				 "ontouchcancel", "ontouchend", "ontouchmove", "ontouchstart"].forEach(function (event) {
					if(cfg.hasOwnProperty(event)) cont.setAttribute(event, cfg[event]);
				});
				
				// Add rules
				this.addRules(this.config.type, this.config);

				// Add rule styles
				if(this.config.type == "switch"){
					var input = document.createElement("input");
						input.id = this.target.id;
						input.name = this.target.id;
						input.checked = cfg.selected=="0" || cfg.checked == "true" || cfg.checked == true ? true : false;
						input.type = "checkbox";
					var label = document.createElement("label");
						label.setAttribute("data-on", cfg.labelOn);
						label.setAttribute("data-off", cfg.labelOff);
					var handle = document.createElement("handle");
					
					cont.appendChild(input);
					cont.appendChild(label);
					cont.appendChild(handle);
					
					this.target.parentNode.insertBefore(cont, this.target.nextElementSibling);
					this.target.parentNode.removeChild(this.target);

					this.target = cont;

				} else if(this.config.type == "multiple") {
					var input = document.createElement("input");
						input.id = this.target.id;
						input.name = this.target.id;
						input.type = "range";
						input.setAttribute("min", 0);
						input.setAttribute("max", cfg.values.length - 1);
						input.setAttribute("value", cfg.selected);
					var labels = document.createElement("values");

					for(var x = 0; x < cfg.values.length; x++){
						var label = document.createElement("span");
							label.setAttribute("data-value", cfg.values[x].value)
							label.innerHTML = cfg.values[x].label;
						
							if(cfg.hasOwnProperty("selected") && cfg.selected == cfg.values[x].value){
								label.classList.add("selected")
							}

						labels.appendChild(label);
					}

					cont.appendChild(input);
					cont.appendChild(labels);
					
					this.target.parentNode.insertBefore(cont, this.target.nextElementSibling);
					this.target.parentNode.removeChild(this.target);
					this.target = cont;

					// Declare events
					input.addEventListener("change", function(e){
						var items = e.target.parentElement.querySelectorAll("span");
						for(var x = 0; x < items.length; x++){
							items[x].classList.remove("selected");
						}
			
						e.target.nextElementSibling.querySelectorAll("span")[e.target.value].classList.add("selected");
					});

					var items = labels.querySelectorAll("span");
					for(var x = 0; x < items.length; x++){
						var item = items[x];
						item.addEventListener("click", function(e){
							e.target.parentElement.previousElementSibling.value = e.target.dataset.value;
							it.simulateEvent("change", e.target.parentElement.previousElementSibling);
						});
					}
				}

				if(this.config.style != "") this.target.style = this.config.style;
			},
			autoDraw: function(){
				var items = document.querySelectorAll("nstate");
				for(var x = 0; x < items.length; x++){
					var item = items[x], arr = {}, colors = {};

					for (var i = 0, atts = item.attributes, n = atts.length, arr = []; i < n; i++){
						var key = atts[i].nodeName, value = atts[i].value;
							key = key.replace(/\-[a-z]/, function(v) { return v.toUpperCase(); }).replace("-", '');
						
						if(key == "id"){
							key = 'target';

						} else if(key == "values"){
							var aux = [], values = value.split(",");
							for(var y=0; y < values.length; y++){
								var v = values[y].split(":");
								aux.push({label: v[0], value: v[1]});
							}
							value = aux;

						} else if(key == "background" || key.toLowerCase().indexOf("color") != -1 ){
							colors[key] = value;
							continue;
						}

						arr[key] = value;
					}
					arr.colors = colors;

					// Generate new component
					this.set(arr);
				}
			}
		}

		this.Nstate.autoDraw();
	}

	/**
		Bootstrap Overflow Tabs
		@version: 1.0
		@author: Pablo E. Fernández (islavisual@gmail.com).
		@Copyright 2017-2019 Islavisual.
		@Last update: 23/09/2019
	**/
	if(json.BootstrapOverflowTabs){
		this.BootstrapOverflowTabs = it.bootstrapOverflowTabs = function(cfg){
			// Default values to cfg
			if (typeof cfg == "undefined" || cfg == null) cfg = {};

			// Check targets
			if(!this.targets){
				if (!cfg.hasOwnProperty('target')) { alert("You need set an object like target to execute the include!. Please, see the help with the Include('help');"); return false; }
			}

			Array.prototype.slice.call(this.targets).forEach(function(target){
				cfg.target = target;

				// Init and format the overflow tabs plugin
				var ntoItem = it.bootstrapOverflowTabs.initOverflowTabs(cfg.target);
		
				// Get buttons to scroll
				var prev = ntoItem.querySelector(".nav-prev")
				var next = ntoItem.querySelector(".nav-next");
				
				// Set current width.
				var items = ntoItem.querySelectorAll(".nav-tabs li"), navCurrentWidth = 0;
				for(var x = 0; x < items.length; x++){
					var item = items[x], style = window.getComputedStyle(item);
					
					navCurrentWidth += item.offsetWidth + parseInt(style.marginRight) + parseInt(style.marginLeft);
				}
				ntoItem.querySelector('ul').style.width = (navCurrentWidth + prev.offsetWidth + next.offsetWidth) + 'px';
				
				//Assign events
				prev.onmousedown = function(Event){ it.bootstrapOverflowTabs.navMousedown(Event); }
				prev.onmouseup = function(Event){ it.bootstrapOverflowTabs.navmouseup(Event); }
				next.onmousedown = function(Event){ it.bootstrapOverflowTabs.navMousedown(Event); }
				next.onmouseup = function(Event){ it.bootstrapOverflowTabs.navmouseup(Event); }
			});
		}

		it.bootstrapOverflowTabs.version =  '1.0';
		it.bootstrapOverflowTabs._navMousedownID = -1;
		it.bootstrapOverflowTabs._navMouseStep = 10;
		
		it.bootstrapOverflowTabs.help = function(cfg){
			if(typeof cfg == "undefined") cfg = {help: ''};
			if(!cfg.hasOwnProperty("help")) cfg.help = '';

			if (typeof showHelper != "undefined") showHelper("BootstrapOverflowTabs", cfg);
			else alert("Helper not available!")
			return;
		};

		it.bootstrapOverflowTabs.wrap = function(el, wrapper){
			el.parentNode.insertBefore(wrapper, el); wrapper.appendChild(el);
		};

		it.bootstrapOverflowTabs.initOverflowTabs = function (ul){
			// Wrap the nav-tabs element
			ul.classList.remove("nav-tabs-overflow");
			var nto =  document.createElement("div");
			nto.classList.add("nav-tabs-overflow");
			this.wrap(ul, nto);
			
			// Traspasing styles
			var style = window.getComputedStyle(ul);
			nto.style.margin = style.margin;
			ul.style.margin = "";
					
			// Add prev button
			var prev = document.createElement("i");
			prev.classList.add("nav-prev", "fa", "fa-caret-left");
			nto.insertBefore(prev, nto.childNodes[0]);
			
	
			// Add next button
			var next = document.createElement("i");
			next.classList.add("nav-next", "fa", "fa-caret-right");
			nto.appendChild(next);
	
		return nto;
		};

		it.bootstrapOverflowTabs.navMousedown = function (event) {
			if(it.bootstrapOverflowTabs._navMousedownID==-1){
				it.bootstrapOverflowTabs._navMousedownID = setInterval(function(){
					it.bootstrapOverflowTabs.whileNavMousedown(event); 
				}, 15); 
			} 
		};
		
		it.bootstrapOverflowTabs.navmouseup = function (event) {
			if(it.bootstrapOverflowTabs._navMousedownID!=-1) {
				clearInterval(it.bootstrapOverflowTabs._navMousedownID); it.bootstrapOverflowTabs._navMousedownID=-1; 
			}
		};

		it.bootstrapOverflowTabs.whileNavMousedown = function (Event) { 
			var trg = Event.target;
			var px = null; 
	
			if(trg.classList.contains("fa-caret-right")){
				var width = trg.offsetWidth;
				trg = trg.previousElementSibling;
				px = trg.offsetLeft - width;
				
				if(Math.abs(trg.offsetLeft) + trg.parentElement.offsetWidth > trg.offsetWidth ) return;
	
				px = px - it.bootstrapOverflowTabs._navMouseStep;
				trg.style.left = px + 'px';
			} else{
				var width = trg.offsetWidth;
				trg = trg.nextElementSibling;
				px = trg.offsetLeft - width;
	
				if(px == 0) return;
				
				px = px + it.bootstrapOverflowTabs._navMouseStep;
				trg.style.left = px + 'px';
			}
		}
	}

	/**
		Password tools
		@version: 1.00
		@author: Pablo E. Fernández (islavisual@gmail.com).
		@Copyright 2017-2019 Islavisual.
		@Last update: 22/05/2019
	**/
	if(json.Password){
		this.Password = it.password = {
			version: '1.0',
			config: { autoDraw: true, colorok : 'rgba(255,255,255,0.75)', colornok : '#e0e0e0', onerror: null },
			minFeatures: { length: 6, uppers:1, lowers: 1, numbers: 1, special: 1, extra: 10 },
			features: { allowed: false, complexity: 0, extra: 0, length: 0, lowers: 0, numbers: 0, special: 0, uppers: 0 },
			help: function(cfg){
				if(typeof cfg == "undefined") cfg = {help: ''};
				if(!cfg.hasOwnProperty("help")) cfg.help = '';

				if (typeof showHelper != "undefined") showHelper("Password", cfg);
				else alert("Helper not available!")
				return;
			},
			check: function(cfg){
				// If it.target has value, set to cfg object
				if(!cfg.hasOwnProperty('target') && this.targets) cfg.target = this.targets[0].id;
				
				if (document.getElementById(cfg.target) == null) { alert("The element with ID '" + cfg.target + "' not exists!"); return false; }

				// Configure execution
				if(cfg.hasOwnProperty('autoDraw')) this.config.autoDraw = cfg.autoDraw;
				if(cfg.hasOwnProperty('colorok')) this.config.colorok = cfg.colorok;
				if(cfg.hasOwnProperty('colornok')) this.config.colornok = cfg.colornok;
				if(cfg.hasOwnProperty('onerror')) this.config.onerror = cfg.onerror;

				// Get target
				this.setTarget(cfg.target);
				var val = this.target.value;

				// If length lower than three, update values and return false
				if(val.length < this.minFeatures.length){
					this.features.complexity = 0;
					this.features.allowed = false;

				} else {
					this._checkComplexity(val);
				}
				
				if(!this.features.allowed){
					if(!this.target.form.getAttribute("data-updated")){
						if(this.target.form.getAttribute("onsubmit")){
							this.target.form.setAttribute("data-onsubmit", this.target.form.getAttribute("onsubmit"));
							this.target.form.setAttribute("data-updated", "true");
						} 

						var str = '';
						if(this.config.onerror){
							str += 'Password.getError(); ';
						}
						this.target.form.setAttribute("onsubmit", str + "return false;");
						this.target.form.setAttribute("data-updated", "true");
					}

				} else {
					if(this.target.form.getAttribute("data-updated")){
						if(this.target.form.getAttribute("data-onsubmit")){
							this.target.form.setAttribute("onsubmit", this.target.form.getAttribute("data-onsubmit"))
							this.target.form.removeAttribute("data-onsubmit");

						} else {
							this.target.form.removeAttribute("onsubmit");
						}
						this.target.form.removeAttribute("data-updated");
					}
				}

				// Auto draw strength chart
				if(this.config.autoDraw) this.draw(this.features.complexity);
			},
			sameLike: function(e){
				if(this.target.value.trim() != e.trim()) return false; else return true;
			},
			isEmpty: function(e){
				if(e.trim() != "") return false; else return true;
			},
			generate: function(length){
				if(typeof length == "undefined") length = this.minFeatures.length;
				if(length < this.minFeatures.length) return false;

				var val, charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!·$%&()*+_-";

				this.features.allowed = false;
				while(!this.features.allowed){
					this.features.complexity = 0;
					this.features.length = 0;
					val = '';
					for (var i = 0, n = charset.length; i < length; ++i) {
						val += charset.charAt(Math.floor(Math.random() * n));
					}
					
					this._checkComplexity(val);
					if(this.features.length != length) this.features.allowed = false;
				}
				
				return val;
			},
			draw: function(c){
				// Add CSS Rules
				if(typeof it.addCSSRule != "undefined"){
					it.addCSSRule('', ".strength", "width: 100%; height: 10px; position: absolute; bottom: -2px; left: 0; z-index: 99; padding: 2px 1px 1px 1px; border: 0 none; margin: 0 0 5px 0; display: none");
					it.addCSSRule('', ".strength::after", "content: attr(data-label); display: block; position: absolute; left: 0; top: -5px; width: 100%; padding: 3px 5px 2px; font-size: 12px; line-height: 12px;");
					it.addCSSRule('', ".strength > div", "background: rgba(0,0,0,0.1); width: calc(16.667% - 4px); float: left; height: 6px; padding: 0; margin: 0px 2px; position: relative;");
					it.addCSSRule('', ".strength[data-label] > div", "display: none;");
					it.addCSSRule('', ".strength > div.spotlight", "background: " + this.config.colorok + ";");
					it.addCSSRule('', "input:focus ~ .strength", "background: " + this.config.colornok + "; display: block;");
				}

				// Define layers
				var cont = document.createElement("div");
					cont.classList.add("strength");
				
				var str = '';
				for(var x = 0; x < 6; x++){
					if(x <= c - 1){
						str += '<div class="spotlight"></div>';
					} else {
						str += '<div></div>';
					}
				}

				cont.innerHTML = str;

				// Add/Remove layers
				var child = this.target.parentElement.children;
					child = child[child.length - 1];

				if(child && child.classList.contains("strength")) child.remove();
				this.target.parentNode.insertBefore(cont, this.target.previousElementSibling);
			},
			getError: function(e){
				if(this.config.onerror){
					var msg = '';

					if(this.target.value.trim() == "") msg = "empty";
					else if(!this.features.allowed) msg = "not_allowed";

					eval(this.config.onerror.name + '("' + msg + '")');
				}
			},
			setError: function(e){
				this.config.onerror = e;
			},
			setAutodraw: function(e){
				this.config.autoDraw = e;
			},
			setAutocheck: function(cfg){
				if(typeof cfg == "undefined") cfg = {};
				
				for(var aux in cfg){ this[aux] = cfg[aux]; }
				
				// If it.target has value, set to cfg object
				if(!cfg.hasOwnProperty('target') && this.targets) cfg.target = this.targets[0].id;

				this.target.addEventListener("keyup", function(e){
					Password.check({target: cfg.target.id, colorok: Password.config.colorok, colornok: Password.config.colornok});
				});

				this.target.form.setAttribute("onsubmit", "return " + Password.config.onerror.name + "('')");
			},
			setColors: function(ok, nok){
				this.config.colorok = ok;
				this.config.colornok = nok;
			},
			setMinimals: function(cfg){
				for(var aux in cfg){
					this.minFeatures[aux] = cfg[aux];
				}
			},
			setTarget: function(e){
				this.target = document.getElementById(e);
				if(!this.target.getAttribute("name")) this.target.setAttribute("name", this.target.id);
			},
			_checkComplexity: function(val){
				// Get features
				this.features.length  = val ? val.length : 0;
				this.features.uppers  = val.match(/[A-Z]/g) ? val.match(/[A-Z]/g).length : 0;
				this.features.lowers  = val.match(/[a-z]/g) ? val.match(/[a-z]/g).length : 0;
				this.features.numbers = val.match(/[0-9]/g) ? val.match(/[0-9]/g).length : 0;
				this.features.special = this.features.length - this.features.uppers - this.features.lowers - this.features.numbers
				this.features.extra   = this.features.length >= this.minFeatures.extra ? 1 : 0;

				// Get initial complexity
				this.features.complexity = (this.features.length >= this.minFeatures.length ? 1 : 0) + (this.features.numbers >= this.minFeatures.numbers ? 1 : 0) + (this.features.uppers >= this.minFeatures.uppers ? 1 : 0) + (this.features.lowers >= this.minFeatures.lowers ? 1 : 0) + (this.features.special >= this.minFeatures.special ? 1 : 0) + this.features.extra;

				// Penalties by consecutive types
				var consecutive = this._consecutive(val, 'uppers', val.length < this.minFeatures.length ? 2 : 4);
				this.features.complexity = consecutive ? (this.features.complexity - 1) : this.features.complexity;
				
				var consecutive = this._consecutive(val, 'lowers', val.length < this.minFeatures.length ? 2 : 4);
				this.features.complexity = consecutive ? (this.features.complexity - 1) : this.features.complexity;
				
				var consecutive = this._consecutive(val, 'numbers', val.length < this.minFeatures.length ? 2 : 4);
				this.features.complexity = consecutive ? (this.features.complexity - 1) : this.features.complexity;

				// Penalties by repeated characters
				var repeated = this._repeated(val, val.length < this.minFeatures.length ? 2 : 3);
				this.features.complexity = repeated ? (this.features.complexity - 1) : this.features.complexity;
				
				// Update allowed flag and form
				this.features.allowed = (this.features.length >= this.minFeatures.length ? true : false) && (this.features.numbers >= this.minFeatures.numbers ? true : false) && (this.features.uppers >= this.minFeatures.uppers ? true : false) && (this.features.lowers >= this.minFeatures.lowers ? true : false) && (this.features.special >= this.minFeatures.special ? true : false);
			},
			_consecutive: function(value, pattern, len){
				var value = value.split(''), total = 0;

				// If the value length is greater, ignore validation
				if(value.length >= 15) len = (len-1) * 2;

				// Check consecutive characters
				for(var x = 0; x < value.length; x++){
					var code = value[x].charCodeAt(0);

					if(pattern == "uppers"){
						if(code >= 65 && code <= 90) total++; else total = 0;
					} else if(pattern == "lowers"){
						if(code >= 97 && code <= 122) total++; else total = 0;
					} else if(pattern == "numbers"){
						if(code >= 48 && code <= 57) total++; else total = 0;
					}

					if(total == len) return true;
				}

				return false;
			},
			_repeated: function(value, len){
				var total = 1, charAnt = '';

				for(var x = 0; x < value.length; x++){
					var char = value[x];

					if(charAnt == char) total++; else charAnt = char;
					if(total == len) return true;
				}

				return false;
			}
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
		this.Selectpicker = it.selectpicker = {
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
							it.simulateEvent("change", e);
							Selectpicker._update(e.id, e.querySelector('option[value="' + e.value + '"]').index);
						}
					}.bind(null, trg), 150);
				} /* End for trgi */

				// Add default Styles
				if(typeof it.addCSSRule != "undefined"){
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
		this.SendForm = it.sendForm = function (cfg) {
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
		this.StripTags = it.stripTags = function (inp, allowed) {
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
		this.Treeview = it.treeview = function (cfg) {
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

			// If it.target has value, set to cfg object
			if(!cfg.hasOwnProperty('target') && this.targets) cfg.target = this.targets[0].id;

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
				if(typeof it.addCSSRule != "undefined"){
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
		this.Validator = it.validator = {
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

				// If configuration object is invalid
				if (!cfg.hasOwnProperty('target')) { alert("You need set an object like target to create the Treeview!. Please, see the help with the Treeview('help');"); return false; }

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

				// If it.target has value, set to cfg object
				if(!cfg.hasOwnProperty('target') && this.targets) cfg.target = this.targets[0].id;

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

				if(typeof it.addCSSRule != "undefined"){
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

// If ie, override some functions and methods
var e, r = navigator.userAgent;
it.browser = r.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; /trident/i.test(it.browser[1]) && (e = /\brv[ :]+(\d+)/g.exec(r) || [], it.browser[1] = "Internet Explorer", it.browser[2] = e[1])
it.browser = it.browser[1] == "Internet Explorer" ? "IE" : "W3C";
if(it.browser == "IE"){
	// Redefine Event Object
	function Event(type, json){
		if(!json) json = {bubbles: true, cancelable: true};
		var EV = document.createEvent('Event');
		EV.initEvent(type, json.hasOwnProperty("bubbles") ? json.bubbles : true, json.hasOwnProperty("cancelable") ? json.cancelable : true);
		return EV;
	}

	// Override KeyborarEvent
	function KeyboardEvent(type, json){
		// Creamos el evento de teclado
		var keyboardEvent = document.createEvent("KeyboardEvent");
	
		// Comprobamos el método de inicialización
		var initMethod = typeof keyboardEvent.initKeyboardEvent 
			!== 'undefined' 
			? "initKeyboardEvent" 
			: "initKeyEvent";
	
		if(!json.hasOwnProperty("bubbles")) json.bubbles = true;
		if(!json.hasOwnProperty("cancelable")) json.cancelable = true;
		if(!json.hasOwnProperty("ctrlKey"))  json.ctrlKey = false;
		if(!json.hasOwnProperty("altKey"))   json.altKey = false;
		if(!json.hasOwnProperty("shiftKey")) json.shiftKey = false;
		if(!json.hasOwnProperty("metaKey")) json.metaKey = false;
		
		keyboardEvent[initMethod](type,
			json.bubbles,
			json.cancelable,
			window,
			json.ctrlKey,
			json.altKey,
			json.shiftKey,
			json.metaKey,
			json.keyCode, 0);
		
		return keyboardEvent;
	}

	// Redefine remove method
	HTMLElement.prototype.remove=function(){
		try{
			this.parentElement.removeChild(this);
		} catch(e){}
	} 

	// Polyfill find method to arrays
	if (!Array.prototype.find) {
		Object.defineProperty(Array.prototype, 'find', {
		  value: function(predicate) {
		   // 1. Let O be ? ToObject(this value).
			if (this == null) {
			  throw new TypeError('"this" is null or not defined');
			}
	  
			var o = Object(this);
	  
			// 2. Let len be ? ToLength(? Get(O, "length")).
			var len = o.length >>> 0;
	  
			// 3. If IsCallable(predicate) is false, throw a TypeError exception.
			if (typeof predicate !== 'function') {
			  throw new TypeError('predicate must be a function');
			}
	  
			// 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
			var thisArg = arguments[1];
	  
			// 5. Let k be 0.
			var k = 0;
	  
			// 6. Repeat, while k < len
			while (k < len) {
			  // a. Let Pk be ! ToString(k).
			  // b. Let kValue be ? Get(O, Pk).
			  // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
			  // d. If testResult is true, return kValue.
			  var kValue = o[k];
			  if (predicate.call(thisArg, kValue, k, o)) {
				return kValue;
			  }
			  // e. Increase k by 1.
			  k++;
			}
	  
			// 7. Return undefined.
			return undefined;
		  },
		  configurable: true,
		  writable: true
		});
	  }
}
