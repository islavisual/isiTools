var itEnabledModules = {
    AddCSSRule: true,
    Alert: false,
    Autocomplete: false,
    Benchmark: false,
    Constraint: false,
    Counter: false,
    Datepicker: false,
    Debugger: false,
    DOM: false,
    Flexbox: false,
    GetBrowser: false,
    GetParam: false,
    HttpRequest: true,
    Include: false,
    IntelliForm: false,
    IsMobile: false,
    Language: false,
    Mask: false,
    Slider: false,
    Password: false,
    Selectpicker: false,
    SendForm: false,
    SlideShow: false,
    Sorter: false,
    StripTags: false,
    Tabs: false,
    Treeview: false,
    Validator: false
}

var it = function(t, f){
    if(f == undefined){
        if(typeof t == "string"){
            it.targets = document.querySelectorAll(t) || t;
        } else {
            if(t.length == undefined) it.targets = [t]; else it.targets = t;
        }
    } else if(typeof f == "object"){
        it.targets = f.querySelectorAll(t);
    } else {
        it.targets = document.querySelector(f).querySelectorAll(t);
    }

    if(it.targets.length == 0 && !it.loading){
        console.log("No se encontraron elementos con el selector:", t, f ? f : '');
    }

    return it;
};

it.name = "isiTools";
it.version = "2.2.2",
it.author = "Pablo E. Fernández (islavisual@gmail.com)",
it.copyright = "2017-2022 Islavisual",
it.lastupdate = "08/03/2022",
it.loading = true;
it.enabledModules = {},
it.targets = null,

it.checkTargets = function(el){ if(el.targets == undefined) el.targets = el; if(el.targets.length == undefined) el.targets = [el.targets]; return el.targets; }

it.help = function(plugin, cfg){
    if(typeof cfg == "undefined") cfg = { help: '' };
    if(!cfg.hasOwnProperty("help")) cfg.help = '';

    if(typeof showHelper != "undefined") showHelper("index", cfg);
    else alert("Helper not available!")
    return;
}

it.autoload = function(){
    document.currentScript = document.currentScript || (function() {
        var scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1];
    })();

    var json = itEnabledModules;
    
    // Load by modules parameter
    var isiToolsSrc = document.currentScript.src;
    if(isiToolsSrc.indexOf("?modules=") != -1){
        isiToolsSrc = isiToolsSrc.split("?modules=")[1].split("+");

        // Enable only sent by url
        for(var i = 0; i < isiToolsSrc.length; i++){
            var item = isiToolsSrc[i];

            json[item] = true;
        }
    }
    
    isiToolsCallback(json);
}

/**
	Devolver el primer elemento de los elementos recuperados por la función constructora
	@version: 1.0.0
	@author: Pablo E. Fernández (islavisual@gmail.com).
	@Copyright 2017-2022 Islavisual.
	@Last update: 10/06/2020
**/
it.first = function(){ return this.targets[0] }

/**
	Formatear las fechas a Big Endian (YYYY-MM-DD), Medium Endian (MM-DD-YYYY) o Little Endian (DD-MM-YYYY)
	@version: 1.00																					
	@author: Pablo E. Fernández (islavisual@gmail.com).
	@Copyright 2017-2022 Islavisual.
	@Last update: 14/03/2019
**/
it.formatedDate = function(fmt, dt){
    if(!fmt || fmt == "") fmt = 'DD-MM-YYYY';
    fmt = fmt.toLowerCase();

    var lang, notISO = fmt.indexOf("d") != -1 && fmt.indexOf("m") != -1 && fmt.indexOf("y") != -1;

    Date.prototype.now = (function(){
        var local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
    });

    if(!dt) dt = new Date().now();

    if(notISO){
        var sep1 = fmt.replace(/[a-zA-Z]/g, '').substr(0, 1);
        var sep2 = fmt.replace(/[a-zA-Z]/g, '').substr(1, 2);
        var aux = fmt.replace(/[^a-zA-Z]/g, '-').toLowerCase();
        lang = 'en-GB';

        switch (aux){
            case 'mm-dd-yyyy':
                lang = 'es-PA';
                break;
            case 'yyyy-mm-dd':
                lang = 'en-CA';
                break;
        }

        dt = new Intl.DateTimeFormat(lang).format(new Date(dt)).split(/[^0-9]/);
        return dt[0] + sep1 + dt[1] + sep2 + dt[2];

    } else {
        return new Intl.DateTimeFormat(fmt).format(new Date(dt));
    }
}

it.get = function(index){ if(index == undefined) index = 0; return this.targets[index]; }

/**
	Recorrer todos los elementos y asignarle propiedades, comportamientos o eventos
	@version: 1.0.2
	@author: Pablo E. Fernández (islavisual@gmail.com).
	@Copyright 2017-2022 Islavisual.
	@Last update: 18/06/2020
	@Examples 
**/
it.each = function(){
    var trgs = this.targets;
    for(var i = 0; i < trgs.length; i++){
        var item = trgs[i];

        for(var j = 0; j < arguments.length; j++){
            var arg = arguments[j], targ = typeof arg;
            if(targ == 'object'){
                for(var key in arg){
                    item[key] = arg[key];
                }
            } else if(targ == 'function'){
                var res = arg.call(item, i)
                if(res != undefined) return res;
            }
        }
    }

    return trgs;
}

/**
	Función para calcular el ancho de un elemento en base a un texto dado
	@version: 1.2
	@author: Pablo E. Fernández (islavisual@gmail.com).
	@Copyright 2017-2022 Islavisual.
	@Last update: 26/01/2021
**/
it.getTextWidth = function(obj, fontFamily, fontSize, padding){
    var text = "";

    // Si es un SELECT, recuperamos los OPTION
    if(obj.tagName == "SELECT"){
        obj = Array.prototype.slice.call(obj.querySelectorAll("option"), 0);
    }

    if(typeof obj == "object" && obj.length != undefined){
        // Si es un array de elementos NodeList
        try{
            obj = obj.reduce(function(a, b){ return a.innerText.length > b.innerText.length ? a : b; });
            text = obj.innerText;
        } catch (e){
            console.log("No se puede recuperar el elemento de mayor lonfitud del array")
        }

    } else if(typeof obj.innerText != undefined || typeof obj.value != undefined){
        // Si es un elemento con texto, lo recuperamos
        text = obj.innerText || obj.value;

    } else {
        text = obj;
    }

    var offset = 0;
    if(typeof obj == "object" && text != obj){
        if(!fontFamily){ fontFamily = getComputedStyle(obj).fontFamily }
        if(!fontSize){ fontSize = getComputedStyle(obj).fontSize }
        if(!padding){
            if(obj.tagName == "OPTION") obj = obj.parentElement;
            offset = parseInt(getComputedStyle(obj).paddingLeft) + parseInt(getComputedStyle(obj).paddingRight);
        }

    } else if(typeof obj == "string" && (!fontFamily || !fontSize)){
        return "Los parámetros fontFamily y fontSize son necesarios";
    }

    if(padding != undefined) offset = padding;

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    ctx.font = fontSize + ' ' + fontFamily;

    return Math.ceil(ctx.measureText(text).width) + offset;
}

/**
	Convertir valor hexadecimal en RGB con un valor de alfa determinado
	@version: 1.0
	@author: Pablo E. Fernández (islavisual@gmail.com).
	@Copyright 2017-2022 Islavisual.
	@Last update: 07/03/2021
**/
it.hexToRGBA = function(hex, alpha){
    var c;

    if(alpha == undefined) alpha = 1;

    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c = hex.substring(1).split('');
        if(c.length == 3){
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
    }
    console.error('Código hexadecimal inválido. Sólo se permiten valores en formato de 3 o 6 dígitos');
}

/**
	Devolver el último elemento de los elementos recuperados por la función constructora
	@version: 1.0.0
	@author: Pablo E. Fernández (islavisual@gmail.com).
	@Copyright 2017-2022 Islavisual.
	@Last update: 10/06/2020
**/
it.last = function(){ return this.targets[this.targets.length - 1] }

/**
	Recuperar un determinado padre establecido por nombre de etiqueta o todos los padres de un elemento
	@version: 1.1
	@author: Pablo E. Fernández (islavisual@gmail.com).
	@Copyright 2017-2022 Islavisual.
	@Last update: 02/03/2021
**/
it.parents = function(e){
    var r = [], el = it.targets[0];

    for(var p = el && el.parentElement; e ? (p && !p.matches(e)) : p; p = p.parentElement){
        r.push(p);
    }

    if(e) return p; else return r;
}

/**
	Función para mover el scroll vertical hasta una posición determinada
	@version: 1.1
	@author: Pablo E. Fernández (islavisual@gmail.com).
	@Copyright 2017-2022 Islavisual.
	@Last update: 26/01/2021
**/
it.scrollTo = function(offset){
    if(this.targets[0].tagName == "BODY"){
        var pos = this.targets[0].getBoundingClientRect();
        document.documentElement.scrollTop += pos.top + offset;
    } else {
        this.targets[0].scrollTop = offset;
    }
    return this.targets[0];
}


it.set = function(){ if(this.so != null) this[this.so].set.call(this[this.so]) }

/**
	Simular evento como fuese lanzado por el usuario
	@version: 1.1
	@author: Pablo E. Fernández (islavisual@gmail.com).
	@Copyright 2017-2022 Islavisual.
	@Last update: 21/03/2021
**/
it.simulateEvent = function(){
    var args = Array.prototype.slice.call(arguments), event;

    if(args[0] == "change"){
        event = new Event(args[0],{ 'bubbles': true, 'cancelable': true });
        args[1].dispatchEvent(event);

        event = new Event('input',{ 'bubbles': true, 'cancelable': true });
        args[1].dispatchEvent(event);

    } else if(args[0].indexOf("key") == 0){
        event = new KeyboardEvent(args[0],{ 'keyCode': args[1].charCodeAt(0), 'which': args[1].charCodeAt(0) });
        args[2].dispatchEvent(event);

    } else {
        var event = new Event(args[0],{ 'bubbles': true, 'cancelable': true });
        args[1].dispatchEvent(event);
    }
}

/**
	Convertir el primer carácter a mayúscula y, el resto, minúsculas.
	@version: 1.1
	@author: Pablo E. Fernández (islavisual@gmail.com).
	@Copyright 2017-2022 Islavisual.
	@Last update: 26/01/2021
**/
it.ucwords = function(txt, all){
    if(all == undefined) all = true;

    if(all){
        txt = txt.split(" ");
        var s = '';
        for(var i = 0; i < txt.length; i++){
            var item = txt[i]
            s += item.toLowerCase().charAt(0).toUpperCase() + item.toLowerCase().slice(1) + " ";
        }
    } else {
        s = txt.toLowerCase().charAt(0).toUpperCase() + txt.toLowerCase().slice(1);
    }

    return s.trim();
};

Number.prototype.leftPad = function(w){
    var n1 = Array.from(this + "");

    if(w - n1.length <= 0) return this;
    else return new Array(w - n1.length).fill(0).concat(n1).join("");
}

String.prototype.leftPad = function(len){
    var str = this;
    while (str.length < len) str = "0" + str;

    return str;
}

it.autoload();

function isiToolsCallback(json){
    it.enabledModules = json;

    /**
    	 AddCSSRule functionality																		
    	@version: 1.1																					
    	@author: Pablo E. Fernández (islavisual@gmail.com).												
    	@Copyright 2017-2022 Islavisual. 																	
    	@Last update: 13/03/2019																			
    **/
    if(json.AddCSSRule){
        this.AddCSSRule = it.addCSSRule = function(cfg, selector, styles, index){
            var s, r, itS = document.getElementById("isiToolsStyles");
            var sheet = cfg;

            // Get style sheet
            if(sheet == null || sheet == ""){
                if(itS == null){
                    var style = document.createElement("style");
                    style.setAttribute("id", "isiToolsStyles");
                    style.setAttribute("media", "screen");

                    // Add style tag to head
                    document.head.insertBefore(style, document.head.firstChild);
                    s = style.sheet;
                } else {
                    s = itS.sheet;
                }
            } else {
                if(typeof sheet == "number") s = document.styleSheets[sheet];
                else if(typeof sheet == "object") s = sheet;
                else console.log("sheet not avilable!")
            }


            // Get rules
            var rText = s.cssRules || s.rules;
            index = typeof index == "undefined" ? rText.length : index;

            for(var i = 0; i < index; i++){
                r = rText[i];

                if(typeof r.selectorText != "undefined" && r.selectorText.trim() == selector.trim()){
                    s.deleteRule(i);
                    index--;
                    break;
                }
            }

            // Insert rule
            if(styles == undefined){
                try{ s.insertRule(selector); } catch (e){}

            } else {
                try{ s.insertRule(selector + "{ " + styles + " } ", index); } catch (e){}
            }
        }

        it.addCSSRule.help = function(cfg){
            if(typeof cfg == "undefined") cfg = { help: '' };
            if(!cfg.hasOwnProperty("help")) cfg.help = '';

            if(typeof showHelper != "undefined") showHelper("AddCSSRule", cfg);
            else alert("Helper no disponible!")
            return;
        }
    }

    /**
    	 Custom alerts functionality
    	@version: 1.6.3
    	@author: Pablo E. Fernández (islavisual@gmail.com).
    	@Copyright 2017-2022 Islavisual.
    	@Last update: 06/04/2021
    **/
    if(json.Alert){
        this.Alert = it.alert = function(cfg){
            if((typeof cfg == "string" && cfg == "help") || cfg.hasOwnProperty("help")){
                if(typeof showHelper != "undefined") showHelper("Alert", cfg);
                else alert("Helper not available!")
                return;
            }

            // Hack for only string
            if(typeof cfg == "string"){
                cfg = { title: window.location.hostname + ' dice:', body: cfg };
            }

            // If configuration object is invalid
            if(!cfg.hasOwnProperty('body')){ alert("The 'body' parameter has not been supplied!.\nPlease, see the help with the it.alert('help');"); return; }

            // Default Styles
            var defaultStyles;
            var defaultStylesDark = {
                title:{ background: '#000', color: '#e0e0e0', extra: '' },
                body:{ background: '#2f2f2f', color: '#fff', extra: '' },
                actions:{
                    accept:{ background: '#467bfe', color: '#fff', extra: '' },
                    cancel:{ background: 'rgba(0,0,0,0)', color: '#000', extra: '' }
                }
            };

            var defaultStylesLight = {
                title:{ background: '#f0f0f0', color: '#2f2f2f', extra: '' },
                body:{ background: '#fff', color: '#000', extra: '' },
                actions:{
                    accept:{ background: '#e0e0e0', color: '#000', extra: '' },
                    cancel:{ background: 'rgba(0,0,0,0)', color: '#000', extra: '' }
                }
            };

            // Default Actions
            var defaultActions = {
                accept:{ enabled: true, text: 'Acceptar', class: '', alignment: 'right', callback: null, addtocallback:{} },
                cancel:{ enabled: false, text: 'Cancelar', class: '', alignment: 'left', callback: null, addtocallback:{} }
            }

            // Create JSON with current opt
            var opt = {
                stylesheet: !cfg.hasOwnProperty('stylesheet') ? false : cfg.stylesheet,
                ajaxmethod: !cfg.hasOwnProperty('ajaxmethod') ? 'GET' : cfg.ajaxmethod,
                class: !cfg.hasOwnProperty('class') ? '' : cfg.class,
                actions: !cfg.hasOwnProperty('actions') ? defaultActions : cfg.actions,
                body: !cfg.hasOwnProperty('body') ? "This is example!" : cfg.body,
                draggable: !cfg.hasOwnProperty('draggable') ? false : cfg.draggable,
                onerror: !cfg.hasOwnProperty('onerror') ? null : cfg.onerror,
                title: !cfg.hasOwnProperty('title') ? '' : cfg.title,
                theme: !cfg.hasOwnProperty('theme') ? 'light' : cfg.theme,
                styles: !cfg.hasOwnProperty('styles') ? defaultStylesLight : cfg.styles,
                onshow: !cfg.hasOwnProperty('onshow') ? null : cfg.onshow,
                onhide: !cfg.hasOwnProperty('onhide') ? null : cfg.onhide,
            }

            // If parameter callback is set to global level, assign to accept button 
            if(cfg.hasOwnProperty('callback')){
                opt.actions.accept.callback = cfg.callback;
            }

            // Set theme
            if(opt.theme == "dark") opt.styles = defaultStylesDark;
            if(opt.theme == "dark") defaultStyles = defaultStylesDark;
            else defaultStyles = defaultStylesLight;

            // Set individual actions by default
            if(!opt.actions.hasOwnProperty('accept')){
                opt.actions.accept = defaultActions.accept;
            } else {
                if(!opt.actions.accept.hasOwnProperty('enabled')) opt.actions.accept.enabled = defaultActions.accept.enabled;
                if(!opt.actions.accept.hasOwnProperty('text')) opt.actions.accept.text = defaultActions.accept.text;
                if(!opt.actions.accept.hasOwnProperty('class')) opt.actions.accept.class = defaultActions.accept.class;
                if(!opt.actions.accept.hasOwnProperty('alignment')) opt.actions.accept.alignment = defaultActions.accept.alignment;
                if(!opt.actions.accept.hasOwnProperty('callback')) opt.actions.accept.callback = defaultActions.accept.callback;
                if(!opt.actions.accept.hasOwnProperty('addtocallback')) opt.actions.accept.addtocallback = defaultActions.accept.addtocallback;
            }
            if(!opt.actions.hasOwnProperty('cancel')){
                opt.actions.cancel = defaultActions.cancel;
            } else {
                if(!opt.actions.cancel.hasOwnProperty('enabled')) opt.actions.cancel.enabled = defaultActions.cancel.enabled;
                if(!opt.actions.cancel.hasOwnProperty('text')) opt.actions.cancel.text = defaultActions.cancel.text;
                if(!opt.actions.cancel.hasOwnProperty('class')) opt.actions.cancel.class = defaultActions.cancel.class;
                if(!opt.actions.cancel.hasOwnProperty('alignment')) opt.actions.cancel.alignment = defaultActions.cancel.alignment;
                if(!opt.actions.cancel.hasOwnProperty('callback')) opt.actions.cancel.callback = defaultActions.cancel.callback;
                if(!opt.actions.accept.hasOwnProperty('addtocallback')) opt.actions.cancel.addtocallback = defaultActions.cancel.addtocallback;
            }

            // Set individual styles by default
            if(!opt.styles.hasOwnProperty('title')){
                opt.styles.title = defaultStyles.title;
            } else {
                if(!opt.styles.title.hasOwnProperty('background')) opt.styles.title.background = defaultStyles.title.background;
                if(!opt.styles.title.hasOwnProperty('color')) opt.styles.title.color = defaultStyles.title.color;
                if(!opt.styles.title.hasOwnProperty('extra')) opt.styles.title.extra = defaultStyles.title.extra;
            }
            if(!opt.styles.hasOwnProperty('body')){
                opt.styles.body = defaultStyles.body;
            } else {
                if(!opt.styles.body.hasOwnProperty('background')) opt.styles.body.background = defaultStyles.body.background;
                if(!opt.styles.body.hasOwnProperty('color')) opt.styles.body.color = defaultStyles.body.color;
                if(!opt.styles.body.hasOwnProperty('extra')) opt.styles.body.extra = defaultStyles.body.extra;
            }
            if(!opt.styles.hasOwnProperty('actions')){
                opt.styles.actions = defaultStyles.actions;
            } else {
                if(!opt.styles.actions.hasOwnProperty('accept')){
                    opt.styles.actions.accept = defaultStyles.actions.accept;
                } else {
                    if(!opt.styles.actions.accept.hasOwnProperty('background')) opt.styles.actions.accept.background = defaultStyles.actions.accept.background;
                    if(!opt.styles.actions.accept.hasOwnProperty('color')) opt.styles.actions.accept.color = defaultStyles.actions.accept.color;
                    if(!opt.styles.actions.accept.hasOwnProperty('extra')) opt.styles.actions.accept.extra = defaultStyles.actions.accept.extra;
                }
                if(!opt.styles.actions.hasOwnProperty('cancel')){
                    opt.styles.actions.cancel = defaultStyles.actions.cancel;
                } else {
                    if(!opt.styles.actions.cancel.hasOwnProperty('background')) opt.styles.actions.cancel.background = defaultStyles.actions.cancel.background;
                    if(!opt.styles.actions.cancel.hasOwnProperty('color')) opt.styles.actions.cancel.color = defaultStyles.actions.cancel.color;
                    if(!opt.styles.actions.cancel.hasOwnProperty('extra')) opt.styles.actions.cancel.extra = defaultStyles.actions.cancel.extra;
                }
            }

            var tmpl = '<it-dialog class="it-alert ' + opt.class + '" aria-labelledby="__ID__" aria-modal="true" role="dialog">\
					<header>\
						<h3 id="__ID__">__TITLE__</h3>\
						<i class="close-btn">&times;</i>\
					</header>\
					<div class="it-alert-body">\
						__DATA__\
					</div>\
					<footer>\
						__CANCEL__\
						__ACCEPT__\
					</footer>\
				</it-dialog>';

            function alertDragStart(e){
                var style = window.getComputedStyle(opt.target, null);
                e.dataTransfer.setData("text/html", (style.left.replace(/[^0-9]/ig, '') - e.clientX) + ',' + (style.top.replace(/[^0-9]/ig, '') - e.clientY));
            }

            function alertDragOver(e){
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                return false;
            }

            function alertDrop(e){
                var offset = e.dataTransfer.getData("text/html").split(',');
                opt.target.style.left = (e.clientX + parseInt(offset[0])) + 'px';
                opt.target.style.top = (e.clientY + parseInt(offset[1])) + 'px';
                e.preventDefault();
                return false;
            }

            function render(){
                if(opt.body.indexOf("<form ") != -1 || opt.body.indexOf("<form>") != -1){
                    // If content have a form inside
                    var aux = document.createElement("div")
                    aux.innerHTML = opt.body;
                    aux = aux.querySelector("form").id;

                    // If ID attribute is defined, assign to accept button
                    if(aux){ opt.actions.accept.form = 'form="' + aux + '" type="submit"'; }
                }

                if(opt.actions.accept.form == undefined) opt.actions.accept.form = '';

                // Create template
                var aux = tmpl.replace("__TITLE__", opt.title)
                    .replace(/__ID__/g, 'dlg_' + Math.random().toString(36).substr(2, 5))
                    .replace("__DATA__", opt.body)
                    .replace("__ACCEPT__", opt.actions.accept.enabled ? ('<button ' + opt.actions.accept.form + ' class="' + opt.actions.accept.class + '" ' + (opt.actions.accept.alignment == "" ? '' : (opt.actions.accept.alignment == "left" ? 'style="float: left;"' : 'style="float: right;"')) + '>' + opt.actions.accept.text + '</button>') : '')
                    .replace("__CANCEL__", opt.actions.cancel.enabled ? ('<button class="' + opt.actions.cancel.class + '" ' + (opt.actions.cancel.alignment == "" ? '' : (opt.actions.cancel.alignment == "left" ? 'style="float: left;"' : 'style="float: right;"')) + '>' + opt.actions.cancel.text + '</button>') : '');

                // Create overlay and add to body
                var a = document.createElement("div");
                a.setAttribute("class", "it-alert-overlay");
                a.onclick = function(e){ if(e.target.classList.contains("it-alert-overlay")) e.target.querySelector(".close-btn").click() }
                a.innerHTML = aux;

                document.body.appendChild(a);

                // Set target
                opt.target = a.children[0];

                a.querySelector("script") ? execute(a) : '';

                if(opt.draggable){
                    opt.target.setAttribute("draggable", 'true')
                    opt.target.style.left = opt.target.offsetLeft + 'px';
                    opt.target.style.top = opt.target.offsetTop + 'px';
                    opt.target.style.position = "fixed";

                    document.body.addEventListener("dragstart", alertDragStart, false);
                    document.body.addEventListener("dragover", alertDragOver, false);
                    document.body.addEventListener("drop", alertDrop, false);
                }
            }

            function closeAlert(e){
                e.target.parentElement.parentElement.parentElement.remove();
                if(opt.onhide){ opt.onhide(); }
            }

            function getData(e, accepted){
                var trg = e.target.parentElement.parentElement;
                var items = trg.querySelectorAll('[name], [contenteditable="true"]');

                var json = { general:{ title: opt.title, accepted: accepted ? true : false }, elements: [] };
                for(var i = 0; i < items.length; i++){
                    var item = items[i], aux = {};

                    if(item.validationMessage) return{ invalidMessage: item.validationMessage };

                    for(var x = 0, atts = item.attributes; x < atts.length; x++){
                        aux[atts[x].nodeName] = atts[x].nodeValue;
                    }
                    
                    if(item.tagName == "SELECT"){
                        aux.value = Array.prototype.slice.call(item.querySelectorAll('option:checked'),0).map(function(v,i,a) { 
                            return v.value; 
                        }).join();
                    } else if(item.type && (item.type == "radio" || item.type == "checkbox")){
                        aux.value = item.checked
                    } else {
                        aux.value = item.value || item.innerHTML
                    }

                    json.elements.push(aux);
                }

                var addcb = opt.actions.accept.addtocallback;
                if(accepted){
                    addcb = opt.actions.accept.addtocallback;
                } else {
                    addcb = opt.actions.cancel.addtocallback;
                }

                if(addcb && addcb.length == undefined) addcb = [addcb];

                if(typeof addcb != "undefined" && JSON.stringify(addcb[0]) != '{}'){
                    for(var arg in addcb){
                        item = addcb[arg];
                        if(item instanceof HTMLElement){
                            if(item.id == "") item.id = arg;
                            for(var x = 0, atts = item.attributes; x < atts.length; x++){
                                aux = {};
                                aux._id = arg;
                                aux[atts[x].nodeName] = atts[x].nodeValue;
                            }
                            aux.node = item;
                        } else {
                            aux = { arg: item }
                        }

                        json.elements.push(aux);
                    }
                }

                return json;
            }

            function assignEvents(){
                document.addEventListener("keydown", function(e){
                    if(e.keyCode == 27 && document.querySelector(".it-alert")){
                        document.querySelector(".it-alert .close-btn").click();
                        return false;
                    }
                    return;
                });

                document.querySelector(".it-alert .close-btn").addEventListener("click", function(e){
                    if(opt.actions.cancel.callback) opt.actions.cancel.callback(getData(e, false));
                    closeAlert(e);
                });

                if(opt.actions.accept.enabled){
                    var cls = "." + opt.actions.accept.class.replace(/\s/g, '.');
                    cls = cls == "." ? 'button' : cls;
                    document.querySelector(".it-alert footer " + cls).addEventListener("click", function(e){
                        var aux = getData(e, true);
                        if(!aux.hasOwnProperty("invalidMessage")){
                            if(opt.actions.accept.callback) opt.actions.accept.callback(aux);
                            closeAlert(e);
                        }
                    });
                }

                if(opt.actions.cancel.enabled){
                    document.querySelector(".it-alert footer ." + opt.actions.cancel.class.replace(/\s/g, '.')).addEventListener("click", function(e){
                        if(opt.actions.cancel.callback) opt.actions.cancel.callback(getData(e, false));
                        closeAlert(e);
                    });
                }
            }

            function execute(trg){
                setTimeout(function(){
                    try{ window.eval(trg.querySelector("script").innerHTML); } catch (e){}
                }, 250);
            }

            function getContent(file){
                var xhttp = new XMLHttpRequest(), dIncFlag = typeof dIncFlag == "undefined" ? false : true;

                xhttp.onreadystatechange = function(){
                    if(this.readyState == 4){
                        if(this.status == 200){
                            opt.body = this.responseText;
                            init();

                        } else if(this.status == 404){
                            if(opt.onerror){
                                opt.onerror("Documento o módulo no encontrado:" + "<br/>" + "URL: " + file)
                            }
                            opt.body = "Documento o módulo no encontrado:" + "<br/>" + "URL: " + file;
                            init();
                        }
                    }
                }

                xhttp.open(opt.ajaxmethod, file, true);
                xhttp.send();
            }

            function init(){
                if(!opt.stylesheet){
                    AddCSSRule('', ".it-alert-overlay", 'position: fixed; background: rgba(0,0,0,0.40); width: 100%; height: 100%; left: 0; top: 0; display: block; z-index: 999999');
                    AddCSSRule('', ".it-alert", 'display: block; max-width: 360px; margin: 100px auto 0; background-color: ' + opt.styles.body.background + '; border: 1px solid rgba(0,0,0,0.75); overflow: hidden; color: ' + opt.styles.body.color + ';');
                    AddCSSRule('', ".it-alert header", 'padding: 10px 8px; background-color: ' + opt.styles.title.background + '; border-bottom: 1px solid rgba(0,0,0,0.1); color: ' + opt.styles.title.color + '; ' + opt.styles.title.extra);
                    AddCSSRule('', ".it-alert header h3", 'font-size: 14px; margin: 0; color: ' + opt.styles.title.color + '; display: inline-block');
                    AddCSSRule('', ".it-alert header .close-btn", 'float: right; color: ' + opt.styles.title.color + '; cursor: pointer; position: relative; top: -5px; left: 0; font-size: 21px; padding: 0;');
                    AddCSSRule('', ".it-alert .it-alert-body", 'background-color: ' + opt.styles.body.background + '; color: ' + opt.styles.body.color + '; display: inline-block; width: 100%; padding: 10px; min-height: 100px; max-height:60vh; overflow:auto; font-weight: 600; ' + opt.styles.body.extra);
                    AddCSSRule('', ".it-alert footer", 'position: relative; top: 5px; padding: 10px 10px 8px 10px; height: auto; display: inline-block; width: 100%; margin: 0;');
                    AddCSSRule('', ".it-alert footer button", 'background: ' + opt.styles.body.background + '; color: ' + opt.styles.body.color + '; border: 1px solid ' + opt.styles.body.color + '; padding: 3px 5px;');
                    AddCSSRule('', ".it-alert footer button:focus", 'background: ' + opt.styles.body.color + '; color: ' + opt.styles.body.background + '; border: 1px solid ' + opt.styles.body.color + ';');

                    if(opt.actions.accept.class == ""){
                        AddCSSRule('', ".it-alert ." + opt.actions.accept.class.replace(/\s/g, '.'), 'padding: 5px; border-radius: 0; background-color: ' + opt.styles.actions.accept.background + '; border: 1px solid rgba(0,0,0,0.1); color: ' + opt.styles.actions.accept.color + '; ' + opt.styles.actions.accept.extra);
                    }

                    if(opt.actions.accept.class == ""){
                        AddCSSRule('', ".it-alert ." + opt.actions.cancel.class.replace(/\s/g, '.'), 'padding: 5px; border-radius: 0; background-color: ' + opt.styles.actions.cancel.background + '; border: 1px solid rgba(0,0,0,0.1); color: ' + opt.styles.actions.cancel.color + '; ' + opt.styles.actions.cancel.extra);
                    }
                }

                try{ document.querySelector(".it-alert-overlay").remove(); } catch (e){}

                render();
                assignEvents();

                if(opt.onshow){ opt.onshow(); }

                if(!opt.actions.cancel.enabled) document.querySelector(".it-alert footer button").focus();
            }

            var aux = opt.body.match(/^url\((.*)\)$/i);
            if(aux){
                getContent(aux[1]);
            } else {
                init();
            }
        };
    }

    /**
    	Autocomplete functionality
    	@version: 1.6.1
    	@author: Pablo E. Fernández (islavisual@gmail.com).
    	@Copyright 2017-2022 Islavisual.
    	@Last update: 23/03/2021
    **/

    if(json.Autocomplete){
        window._timeoutAC = null, window._continueAC = false;
        this.Autocomplete = it.autocomplete = function(cfg){
            if(typeof cfg == "undefined") cfg = {};

            // If method was called by HTMLSelectElement
            this.targets = this.tagName != undefined ? [this] : (this.entries == undefined ? this.targets : this);

            for(var x = 0; x < this.targets.length; x++){
                cfg.target = this.targets[x];

                // If target is a select tag, rebuild element and create data
                if(cfg.target.tagName.toLowerCase() == "select"){
                    var items = cfg.target.options;

                    cfg.data = [];
                    for(var x = 0; x < items.length; x++){
                        var item = items[x];

                        var option = {}
                        for(var i = 0, atts = item.attributes, n = atts.length, arr = []; i < n; i++){
                            var akey = atts[i].nodeName, avalue = atts[i].value;

                            option[akey] = avalue;
                        }
                        option.text = item.innerHTML;

                        cfg.data.push(option);
                    }

                    var newTag = document.createElement("input");
                    newTag.type = "text";
                    for(var i = 0, atts = cfg.target.attributes, n = atts.length, arr = []; i < n; i++){
                        var akey = atts[i].nodeName, avalue = atts[i].value;

                        newTag.setAttribute(akey, avalue);
                    }
                    newTag.id = newTag.id + "_newNode-it-autocomplete";

                    cfg.target.parentElement.insertBefore(newTag, cfg.target);

                    cfg.target.remove();

                    newTag.id = newTag.id.replace("_newNode-it-autocomplete", "");

                    cfg.target = newTag;
                }

                // If configuration object is invalid
                //if(!cfg.hasOwnProperty('target')){ alert("No se ha definido el control de entrada de datos (target).\nPor favor, mire la ayuda pulsando F1."); return; }
                if(!cfg.ajax && !cfg.hasOwnProperty('data')){ alert("No se ha suministrado el objeto con los datos (data).\nPor favor, mire la ayuda pulsando F1."); return; }
                if(cfg.ajax && !cfg.hasOwnProperty('url')){ alert("No se ha suministrado la URL para recuperar los datos.\nPor favor, mire la ayuda pulsando F1."); return; }
                if(cfg.format == "table" && !cfg.row){ alert("No se ha especificado la matriz JSON (row) con los campos que a mostrar.\nPor favor, mire la ayuda pulsando F1."); return; }

                // Create JSON with current opt
                var opt = {
                    stylesheet: !cfg.hasOwnProperty('stylesheet') ? false : cfg.stylesheet,
                    ajax: !cfg.hasOwnProperty('ajax') ? false : cfg.ajax,
                    url: !cfg.hasOwnProperty('url') ? null : cfg.url,
                    autoFocus: !cfg.hasOwnProperty('autoFocus') ? false : cfg.autoFocus,
                    autoExpand: !cfg.hasOwnProperty('autoExpand') ? false : cfg.autoExpand,
                    autoSelect: !cfg.hasOwnProperty('autoSelect') ? false : cfg.autoSelect,
                    autoChoose: !cfg.hasOwnProperty('autoChoose') ? true : cfg.autoChoose,
                    callback: !cfg.hasOwnProperty('callback') ? null : cfg.callback,
                    className: !cfg.hasOwnProperty('className') ? "it-autocomplete" : cfg.className,
                    currentFocus: -1,
                    data: cfg.data,
                    delay: !cfg.hasOwnProperty('delay') ? 300 : cfg.delay,
                    disable: !cfg.hasOwnProperty('disable') ? null : cfg.disable,
                    format: !cfg.hasOwnProperty('format') ? "list" : cfg.format,
                    helper: !cfg.hasOwnProperty('helper') ? false : cfg.helper,
                    highlight: !cfg.hasOwnProperty('highlight') ? null : cfg.highlight,
                    minLength: !cfg.hasOwnProperty('minLength') ? 3 : cfg.minLength,
                    row: !cfg.hasOwnProperty('row') ?{} : cfg.row,
                    resort: !cfg.hasOwnProperty('resort') ? false : cfg.resort,
                    statusMessage: !cfg.hasOwnProperty('statusMessage') ? "Cargando..." : cfg.statusMessage,
                    target: cfg.target,
                    tooltip: !cfg.hasOwnProperty('tooltip') ? null : cfg.tooltip,
                    voidMessage: !cfg.hasOwnProperty('voidMessage') ? "No se han encontrado coincidencias" : cfg.voidMessage,
                }

                if(opt.highlight && !opt.highlight.hasOwnProperty("value")) opt.highlight.value = "";

                if(opt.format == "table"){
                    // Define column fields by default
                    if(!opt.row.hasOwnProperty('columns') && opt.data){
                        opt.row.columns = [];
                        for(var key in opt.data[0]){
                            opt.row.columns.push(key);
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
                if(!it.autocomplete.targets){
                    it.autocomplete.targets = [];
                }
                it.autocomplete.targets[opt.target.id] = {};
                it.autocomplete.targets[opt.target.id].opt = opt;
                if(opt.helper) opt.target.dataset.helper = opt.target.id

                // Assign aria controls
                opt.target.setAttribute("role", "combobox");
                opt.target.setAttribute("aria-autocomplete", "both");
                opt.target.setAttribute("aria-expanded", "false");
                opt.target.setAttribute("aria-haspopup", "true");
                opt.target.setAttribute("aria-owns", opt.target.id + "-" + opt.className + "-list");
                opt.target.setAttribute("aria-activedescendant", "");

                // Remove duplicating events for body element
                document.body.removeEventListener('click', it.autocomplete._checkFocus);
                document.body.addEventListener('click', it.autocomplete._checkFocus);

                // Set message if minLength is -1 and message and events if minLength not id -1
                if(opt.minLength == -1){
                    opt.target.setAttribute("placeholder", opt.statusMessage);

                    opt.target.onkeydown = function(){ return false; }

                } else {
                    opt.target.setAttribute("placeholder", opt.target.dataset.placeholder);
                    opt.target.onkeydown = null;

                    opt.target.addEventListener("keydown", function(e){
                        var kc    = e.keyCode, t = e.target;
                        var aList = it.autocomplete._getAutocompleteList(this, opt.className);

                        if(kc == 13) e.preventDefault();

                        if((kc == 13 || kc == 9) && aList){
                            if(opt.currentFocus > -1 && aList){
                                aList[opt.currentFocus].click();

                                it.autocomplete._removeItemsList(false, opt);
                            }

                            return false;
                        } else if(kc == 9 || kc == 27){
                            it.autocomplete._removeItemsList(false, opt);
                            return;

                        } else if(kc == 40){ // down
                            if(document.querySelectorAll("." + opt.className + "-items").length == 0){
                                it.simulateEvent("input", e.target);
                            }

                            var x = it.autocomplete._getAutocompleteList(this, opt.className);
                            opt.currentFocus++;

                            it.autocomplete._addActive(x, opt);
                            it.autocomplete._setScrollTop(e.target.id, opt.className, "down");

                        } else if(kc == 38){ //up
                            var x = it.autocomplete._getAutocompleteList(this, opt.className);

                            opt.currentFocus--;
                            it.autocomplete._addActive(x, opt);
                            it.autocomplete._setScrollTop(e.target.id, opt.className, "up");

                        }

                        if([16, 18, 33, 34, 35, 36, 37, 38, 39, 45, 107].indexOf(kc) != -1 || (kc == 187 && !e.shiftKey) || e.ctrlKey || e.altKey){ return false; } else if(kc == 40 && document.getElementById(e.target.id + "-" + opt.className + "-list")) return false;

                        var goon = ((t.value.trim().length + (kc == 8 || kc == 46 ? -1 : 1)) < opt.minLength) || (t.value.trim().length == 1 && (kc == 8 || kc == 46)) ? false : true;

                        clearTimeout(_timeoutAC);
                        if(goon){
                            _timeoutAC = setTimeout(it.autocomplete._triggerAfterKey, opt.delay, t, opt);
                        } else {
                            it.autocomplete._removeItemsList(false, opt)
                        }

                        setTimeout(function(){ if(this.value == '') it.autocomplete._closeAllLists(this); }.bind(this), 50);
                    });

                    // Auto select all
                    opt.target.addEventListener("focusin", function(e){
                        if(opt.autoSelect){
                            e.target.select();
                        }

                        if(opt.autoExpand){
                            var evt = new KeyboardEvent('keydown',{ 'keyCode': 40, 'which': 40 });
                            e.target.dispatchEvent(evt);
                        }
                    });

                    opt.target.addEventListener("paste", function(e){
                        clearTimeout(_timeoutAC);
                        _timeoutAC = setTimeout(it.autocomplete._triggerAfterKey, opt.delay, e.target, opt);
                    });

                    opt.target.addEventListener("inputAfter", function(e){
                        var a, b, c, i, val = this.value.trim();
                        var opt = it.autocomplete.targets[e.target.id].opt;

                        // Only search when length is greater than "minLength" attribute.
                        it.autocomplete._removeItemsList(false, opt);
                        if(opt.minLength == -1) this.value = "";
                        if(opt.minLength == -1 || val.length < opt.minLength){
                            return false;
                        }

                        // Close all lists
                        it.autocomplete._closeAllLists(this);

                        // Reset current focus / element selected
                        opt.currentFocus = -1;

                        // Create a DIV element that will contain the values
                        a = document.createElement("div");
                        a.setAttribute("id", opt.target.id + "-" + opt.className + "-list");
                        a.setAttribute("class", opt.className + "-items display");
                        a.classList.add(opt.format);

                        // Assign inline styles
                        var aPos = opt.target.getBoundingClientRect();
                        a.style.top = (aPos.top + aPos.height - 1) + 'px';
                        a.style.width = aPos.width + 'px';
                        a.style.left = aPos.x + 'px';

                        e.target.setAttribute("aria-expanded", 'true')

                        document.body.addEventListener("click", function(e){
                            if(e.target.classList.contains(opt.className + "-items") || it(e.target).parents("." + opt.className + "-items")) return;

                            if(e.path.filter(function(e){ return e != document && e != window && e.classList.contains("expand-layer") }).length == 0){
                                try{ document.getElementById(opt.target.id + "-" + opt.className + "-list").remove(); } catch (e){}
                            }
                        });

                        ["scroll", "resize"].forEach(function(event){
                            window.addEventListener(event, function(){
                                it('.' + opt.className + '-items').each(function(){
                                    var aPos = opt.target.getBoundingClientRect();
                                    this.style.top = (aPos.top + aPos.height - 1) + 'px';
                                    this.style.width = aPos.width + 'px';
                                    this.style.left = aPos.x + 'px';
                                });
                            });
                        });

                        this.parentNode.appendChild(a);

                        if(opt.format == "table"){
                            // If format is table and is desired show headers 
                            if(opt.row.showHeaders){
                                var thead = document.createElement("span");
                                thead.setAttribute("class", "header");

                                var aux = "";
                                for(var z = 0; z < opt.row.columns.length; z++){
                                    aux += '<span style="width: ' + (100 / opt.row.columns.length) + '%">' + opt.row.headers[z] + "</span>";
                                }
                                thead.innerHTML = aux;
                                a.appendChild(thead);
                            }

                        } else if(opt.format == "cluster"){
                            var jsonCluster = false;
                            if(opt.data.length != 0 && typeof opt.data.find(function(x){ return x !== undefined })[opt.row.items].find(function(x){ return x !== undefined }) == "object") jsonCluster = true;
                        }

                        // Searching...
                        it.autocomplete.foreach(val, opt, a)

                        if(opt.autoChoose){
                            var x = it.autocomplete._getAutocompleteList(this, opt.className);
                            opt.currentFocus++;

                            it.autocomplete._addActive(x, opt);
                            it.autocomplete._setScrollTop(e.target.id, opt.className, "down");
                        }

                        // Clean memory
                        a = b = c = val = jsonCluster = wildcard = thead = aux = null;
                    });
                }

                if(opt.helper){
                    var icon = document.createElement("i");
                    icon.classList.add("it-autocomplete-helper-icon");
                    icon.onclick = function(){
                        it.autocomplete.showHelper(this);
                    }
                    icon.innerHTML = '?';

                    opt.target.parentNode.insertBefore(icon, opt.target.nextSibling);
                }

                if(!opt.stylesheet){
                    it.addCSSRule('', '.' + opt.className + '-items', 'position: fixed; background: #ffffff; border: 1px solid #e0e0e0; z-index: 99; top: 100%; left: 15px; right: 0; width: -moz-calc(100% - 30px); width: -webkit-calc(100% - 30px); width: calc(100% - 30px); max-height: 210px; overflow-y: auto; overflow-x: hidden; ');
                    it.addCSSRule('', '.' + opt.className + '-items div.value', 'color: #000; line-height: normal; padding: 4px 10px; cursor: pointer; background-color: #fff; border-bottom: 0px solid #d4d4d4; text-transform: capitalize;');
                    it.addCSSRule('', '.' + opt.className + '-items div.value b', 'color: #000;');
                    
                    it.addCSSRule('', '.' + opt.className + '-items div.value:hover,.' + opt.className + '-items div.value:hover b, .' + opt.className + '-active, .' + opt.className + '-active b', 'background-color: #006699 !important; color: #ffffff !important;');
                    it.addCSSRule('', '.' + opt.className + '-items .header, .' + opt.className + '-items .error', 'position: initial; background: #fff; border-bottom: 1px solid #bfbfbf; box-shadow: none; width: 100%; line-height: 28px; padding: 0 10px; pointer-events: none;');
                    it.addCSSRule('', '.' + opt.className + '-items .header span, .' + opt.className + '-items .value span', 'width: 100%; display: inline-block; vertical-align: top;');
                    it.addCSSRule('', '.' + opt.className + '-items .header span, .' + opt.className + '-items .error span', 'display: table-cell; height: auto; min-height: 32px; padding: 5px 0; line-height: normal; color: #000; font-size: 13px; font-weight: 600; text-transform: uppercase;');
                    it.addCSSRule('', '.' + opt.className + '-items .error span', 'color: #f01223; ');
                    it.addCSSRule('', '.' + opt.className + '-items .error.not-found span', 'color: #a0a0a0; text-transform: none;');
                    it.addCSSRule('', '.' + opt.className + '-items .error + .value', 'color: #000; font-weight: bold;');
                    it.addCSSRule('', '.' + opt.className + '-items.table .header', 'display: table; ');
                    it.addCSSRule('', '.' + opt.className + '-items.cluster .header, .' + opt.className + '-items .error', 'border-bottom: 0 none; margin-top: 0; text-transform: uppercase; font-size: 0.85rem; font-weight: 600;');
                    it.addCSSRule('', '.' + opt.className + '-items.cluster .error', 'margin-top: 15px;');
                    it.addCSSRule('', '.' + opt.className + '-items.cluster .values .value', 'padding-left: 25px');
                    it.addCSSRule('', '.' + opt.className + '-items.cluster .header span', 'color: #bbb;');
                    it.addCSSRule('', '.' + opt.className + '-items .value.highlighted', 'font-weight: bold; background: transparent; color: #008bb2;');
                    it.addCSSRule('', '.' + opt.className + '-items .value.disabled', 'font-weight: 100; background: #eee; color: #aaa; pointer-events: none');

                    // Add helper button
                    if(opt.helper){
                        it.addCSSRule('', "input[data-helper]", "padding-right: 28px;");
                        it.addCSSRule('', ".it-autocomplete-helper-icon", "cursor: pointer; background: #000; color: #fff; height: 28px; width: 28px; line-height: 28px; position: absolute; right: 0; top: 0; text-align: center; z-index: 9;");
                        it.addCSSRule('', ".it-autocomplete-helper", "background: #f0f0f0; border: 1px solid #ccc; padding: 10px; position: fixed; top: 25vh; left: 10vw; display: block; width: 80vw; max-height: 550px; overflow: auto; z-index: 99;");
                        it.addCSSRule('', ".it-autocomplete-helper::after", 'content: ""; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: -1;');
                        it.addCSSRule('', ".it-autocomplete-helper ul", "background: #fff; border: 1px solid #ccc; padding: 10px; list-style: none;");
                        it.addCSSRule('', ".it-autocomplete-helper ul b", "font-weight: bold;");
                        it.addCSSRule('', ".it-autocomplete-helper code", "padding: 2px 4px; font-size: 90%; color: #c7254e; background-color: #f9f2f4; border-radius: 4px;");
                        it.addCSSRule('', ".it-autocomplete-helper button", "cursor: pointer; background: #000; color: #fff; height: 28px; line-height: 28px; float: right; padding: 0 10px;");
                        it.addCSSRule('', ".it-autocomplete-helper h3", "background: linear-gradient(90deg, rgba(0,0,0,0.06), transparent); font-size: 20px; color: #000; padding: 5px;");
                        it.addCSSRule('', ".it-autocomplete-helper .hidden", "display: none !important");
                        it.addCSSRule('', "@media all and (max-width: 640px)", ".it-autocomplete-helper{ width: 100%; left: 0; top: 0;}");
                    }
                }

                if(opt.autoFocus){ opt.target.focus(); }
            }
        }

        it.autocomplete.foreach = function(val, opt, a){
            var itemsCount = 0;

            for(var i = 0; i < opt.data.length; i++){
                // If val is empty only process the first 100 elements
                if(val.length == 0 && itemsCount > 99) break;

                // Check if the item contains the text field value
                var cval = '', found, optData = opt.data[i];
                if(typeof optData != "string"){
                    var nOptData = JSON.parse(JSON.stringify(optData));
                    for(var key in nOptData){
                        if(opt.format == "list" && opt.row.hasOwnProperty('columns') && opt.row.columns.indexOf(key) == -1){
                            delete nOptData[key];
                            continue;
                        }

                        cval += nOptData[key] + "|";
                    }
                    cval = cval.replace(/(^\||\|$)/g, '');

                    nOptData = null;

                } else {
                    cval = optData;
                }


                // Now, we have the item converted to string and separated by pipes.
                // Extract wildcards and check item
                var wildCard = val.indexOf("*") == -1 ? -1 : (val.indexOf("*") == val.length - 1 ? 1 : 0);
                found = opt.format == "cluster" || opt.ajax || it.autocomplete.search(val, cval, wildCard, 0);

                // Add items to autocomplete list
                if(found){
                    b = document.createElement("div");
                    var bc = null;

                    if(opt.format == "list"){
                        var aux = cval.toUpperCase().split(val.toUpperCase());
                        b.classList.add("value");
                        b.innerHTML = aux.join('|~|');
                        b.innerHTML = b.innerHTML.replace(/\|\~\|/ig, '<b>' + val + '</b>').toLowerCase();

                        // Add weight to sort, if applicable
                        b.dataset.weight = 1;
                        if(cval.toLowerCase().indexOf(val.replace(/\*/g, '')) > 0){
                            b.dataset.weight = 0;
                        }

                        if(opt.row.return_value) cval = optData[opt.row.return_value];

                        b.innerHTML += "<input type='hidden' data-id='" + opt.target.id + "' data-index='" + i + "' value='" + cval + "'>";
                        b.id = "ac-" + opt.target.id + '-' + i;

                        // If items is highlighting

                        if(opt.highlight && typeof optData[opt.highlight.field] != 'undefined' && (opt.highlight.value == '' || (optData[opt.highlight.field] == opt.highlight.value))){
                            b.classList.add(opt.highlight.class);
                        }


                    } else if(opt.format == "table"){
                        var disabling = opt.disable ? true : false;
                        var tooltips = opt.tooltip ? true : false;

                        for(var f = 0; f < opt.row.columns.length; f++){
                            if(f == 0){
                                b.classList.add("value");
                                b.innerHTML += "<input type='hidden' data-id='" + opt.target.id + "' data-index='" + i + "' value='" + optData[opt.row.return_value] + "'>";
                            }

                            // Add weight to sort, if applicable
                            b.dataset.weight = 0;

                            if(cval.split("|").find(function(el){ return el.toLowerCase().indexOf(val.toLowerCase()) > 0 })){
                                b.dataset.weight = 1;
                            }

                            var tfld = opt.row.columns[f];
                            var faux = '<span __tp__ style="width: ' + (100 / opt.row.columns.length) + '%">' + optData[opt.row.columns[f]] + "</span>";

                            // If items is highlighting
                            if(opt.highlight && typeof optData[opt.highlight.field] != 'undefined' && (opt.highlight.value == '' || (optData[opt.highlight.field] == opt.highlight.value))){
                                b.classList.add(opt.highlight.class);
                            }

                            // If items is disabling
                            if(disabling){
                                if(typeof optData[opt.disable.field] != 'undefined' && optData[opt.disable.field] != 0){
                                    b.classList.add(opt.disable.class);
                                }
                            }

                            // If items have tooltips and add items
                            if(tooltips){
                                for(var t = 0; t < opt.tooltip.length; t++){
                                    if(tfld == opt.tooltip[t].field){
                                        faux = faux.replace("__tp__", 'title="' + optData[opt.tooltip[t].text] + '"');
                                        break
                                    }
                                }
                            } else {
                                faux = faux.replace("__tp__", '');
                            }
                            b.innerHTML += faux.replace("__tp__", '');
                        }

                    } else if(opt.format == "cluster"){
                        b.innerHTML = '<span id="clustered' + i + '">' + optData[opt.row.groupby] + "</span>";
                        b.classList.add("header");
                        bc = document.createElement("div");
                        bc.classList.add("values");

                        var tooltips = opt.tooltip ? true : false;

                        var len = optData[opt.row.items].length;
                        for(var z = 0; z < len; z++){
                            if(itemsCount > 99) break;

                            var text = '', cItem = optData[opt.row.items][z];

                            if(typeof cItem == "object"){
                                text = Object.values(cItem).join("|");
                            } else {
                                text = cItem;
                            }

                            text += (text.indexOf("|") == -1) ? "|" : "";

                            if(opt.ajax || it.autocomplete.search(val, text, wildCard, 1)){
                                text = '';
                                for(var x = 0; x < opt.row.columns.length; x++){
                                    var aux = cItem[opt.row.columns[x]];
                                    text += aux != undefined ? (aux + " ") : '';
                                }
                                text = text.trim();

                                var aux = document.createElement("div");
                                aux.classList.add("value");
                                aux.style.width = "100%";
                                aux.innerHTML += "<span>" + text + "</span>";
                                aux.innerHTML += "<input type='hidden' data-id='" + opt.target.id + "' data-index='" + i + "," + z + "' value='" + text + "'>";

                                // If items is highlighting
                                if(opt.highlight && cItem[opt.highlight.field] && (opt.highlight.value == '' || (cItem[opt.highlight.field] == opt.highlight.value))){
                                    aux.classList.add(opt.highlight.class);
                                }

                                // Mark disable
                                if(opt.disable && cItem[opt.disable.field] && cItem[opt.disable.field] != 0){
                                    aux.classList.add(opt.disable.class);
                                }

                                // Set tooltips
                                if(tooltips){
                                    aux.setAttribute("title", cItem[opt.tooltip.field]);
                                } else {
                                    aux.setAttribute("title", "");
                                }

                                // Add element
                                bc.appendChild(aux);

                                // Add event on click
                                aux.setAttribute("onclick", 'it.autocomplete._click(this)');

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
                        b.setAttribute("onclick", 'it.autocomplete._click(this)');

                        itemsCount++
                    }
                }
            }

            if(a.children.length == 0){
                a.innerHTML = '<div class="error not-found"><span>Buscando "' + opt.target.value + '":</span></div>'
                a.innerHTML += '<div class="value">' + opt.voidMessage + '</div>';
            }

            // If autocomple resort is enabled,
            // show the words that start with the value first
            // and the words that contains after
            if(opt.resort){
                var toSort2 = Array.prototype.slice.call(a.children, 0);
                toSort2.sort(function(a, b){
                    var aord = +a.dataset.weight;
                    var bord = +b.dataset.weight;
                    return (aord == bord) ? (a.textContent < b.textContent ? -1 : 1) : (bord - aord);
                });
                a.innerHTML = '';
                for(var i = 0; i < toSort2.length; i++){
                    a.innerHTML += toSort2[i].outerHTML
                }
            }

            // Clean all temporary variables
            cval = found = optData = keyVal = valAux = wildCard = bc = aux = tooltips = tfld = faux = i = f = null;
        }

        it.autocomplete.search = function(value, text, wildCards, pass){
            var mode = value.match(/\*(.+)\*/ig) != null ? "contains" : (value.match(/\*(.+)/ig) != null ? 'ends' : (value.indexOf("*") == -1 ? 'contains' : 'starts'));

            // Replace double wildcard
            value = value.replace("**", '*');
            text = text.replace(/false/ig, '').replace(/true/ig, '')

            // Clean of wildcards the value to search
            value = value.replace(/\*/g, '');

            // transform to lower case all
            text = text.toLowerCase();

            // Remove empty elements
            var value = value.replace(/^\++|\++$/g, '').toLowerCase().split("+");
            for(var v in value){
                if(value[v].trim() == "") delete value[v];
            }

            // If search is complex
            var aux = it.autocomplete._test(text, value, mode);

            return aux;
        }

        it.autocomplete._test = function(text, value, method){
            method = value.length > 1 ? "contains" : method;
            var aux = value, counter = 0;

            for(var i = 0; i <= aux.length - 1; i++){
                value = aux[i].toString().trim();

                counter += text.split("|").filter(function(v){
                    v = v.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
                    value = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

                    var exacts = value.split('"');
                    if(exacts.length == 3){
                        value = exacts[1];
                        method = "exacts";
                    }

                    var c = {
                        'starts': function(v, value){ return v.trim().indexOf(value) == 0 },
                        'ends': function(v, value){ return v.trim().indexOf(value) == v.length - value.length },
                        'contains': function(v, value){ return v.trim().indexOf(value) != -1 },
                        'exacts': function(v, value){ return v.trim() == value },
                    }

                    return v.length >= value.length && v != "" && c[method](v, value);
                }).length != 0 ? 1 : 0;
            }

            return counter == aux.length;
        }

        it.autocomplete._triggerAfterKey = function(t, opt){
            if(!opt.ajax){
                var event = new Event('inputAfter');
                t.dispatchEvent(event);
            } else {
                new HttpRequest({
                    url: opt.url + (opt.url.split("?").length == 1 ? "?q=" : "&q=") + encodeURIComponent(t.value),
                    ajax: true,
                    callback: it.autocomplete._callbackInputAfter.bind(opt),
                    contentType: "application/json; charset=utf-8",
                    responseType: "json"
                });
            }
        }

        it.autocomplete._callbackInputAfter = function(e){
            this.data = e;

            // Define header fields by default
            if(this.format == "table"){
                if(!this.row.hasOwnProperty('headers') && this.data){
                    this.row.headers = [];
                    for(var key in this.data[0]){
                        this.row.headers.push(key.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function(s){ return s.toUpperCase(); }));
                    }
                }
            }

            // If file is JSON, disable ajax property to filter by this component
            if(this.url.split(".json")[this.url.split(".json").length - 1] == '') this.ajax = false;

            var event = new Event('inputAfter');
            this.target.dispatchEvent(event);
        }

        it.autocomplete._addActive = function(x, opt){
            if(!x) return false;
            it.autocomplete._removeActive(x, opt.className);

            if(opt.currentFocus >= x.length) opt.currentFocus = 0;
            if(opt.currentFocus < 0) opt.currentFocus = (x.length - 1);
            if(x[opt.currentFocus]) x[opt.currentFocus].classList.add(opt.className + "-active");
        }

        // Get Autocomplete List
        it.autocomplete._getAutocompleteList = function(e, cls){
            var x = document.getElementById(e.id + "-" + cls + "-list");
            if(x) x = x.querySelectorAll("div.value:not(.disabled)");
            return x;
        }

        it.autocomplete._removeActive = function(x, cls){
            for(var i = 0; i < x.length; i++){
                x[i].classList.remove(cls + "-active");
            }
        }

        it.autocomplete._setScrollTop = function(id, cls, dir){
            // Move scroll to current position
            try{
                var active = document.querySelector('.' + cls + '-active'), items = document.getElementById(id + "-" + cls + "-list");
                if(dir == "down"){
                    items.scrollTop = active.offsetTop - items.offsetHeight + active.offsetHeight + 2;
                } else if(active.offsetTop < items.scrollTop || document.querySelector('.' + cls + '-active:last-child').offsetTop == active.offsetTop){
                    items.scrollTop = active.offsetTop - items.offsetHeight + items.offsetHeight + 2;
                }
            } catch (e){}
        }

        it.autocomplete._removeItemsList = function(reset, opt){
            var item = opt.target.parentElement.querySelector("." + opt.className + "-items");
            if(item) item.remove();
            if(reset) opt.target.value = "";
            opt.target.setAttribute("aria-expanded", "false");

            item = null;
        }

        it.autocomplete._getID = function(e){
            var aux = e.id || e.querySelector("[data-id]").dataset.id;
            if(e.classList.contains("value")){
                aux = e.querySelector("[data-id]").dataset.id;
            }

            return aux;
        }

        it.autocomplete._click = function(val){
            if(!val.classList.contains("disabled")){
                var id = it.autocomplete._getID(val);
                var opt = it.autocomplete.targets[id].opt;
                var trg = it(val).parents("." + opt.className + "-items").previousElementSibling;
                if(trg.classList.contains("it-autocomplete-helper-icon")) trg = trg.previousElementSibling;

                if(trg.tagName != "INPUT") trg = trg.previousElementSibling;

                trg.value = val.getElementsByTagName("input")[0].value;
                if(opt.callback) opt.callback(val.getElementsByTagName("input")[0]);
                it.autocomplete._closeAllLists(val);

                trg.setAttribute("aria-activedescendant", val.id);
                trg.focus();
            }
        }

        it.autocomplete._closeAllLists = function(elmnt){
            var id = it.autocomplete._getID(elmnt);
            var opt = it.autocomplete.targets[id].opt;

            var x = document.querySelectorAll("." + opt.className + "-items");
            for(var i = 0; i < x.length; i++){
                if(elmnt != x[i] && elmnt != opt.target){
                    x[i].parentNode.removeChild(x[i]);
                    x[i].setAttribute("aria-expanded", "false");
                }
            }
        }

        it.autocomplete._checkFocus = function(e){
            var trg = e.target;
            for(var trgID in it.autocomplete.targets){
                var opt = it.autocomplete.targets[trgID].opt;

                while (trg && trg.id != trgID && !trg.classList.contains(opt.className + "-items") && trg.tagName != "BODY"){
                    trg = trg.parentNode;
                }

                if(!trg || (!trg.classList.contains(opt.className + "-items") && trg.id != trgID)){
                    try{
                        document.getElementById(opt.target.id + "-" + opt.className + "-list").remove();
                    } catch (e){}
                }
            }
        }

        it.autocomplete.help = function(cfg){
            if(typeof cfg == "undefined") cfg = { help: '' };
            if(!cfg.hasOwnProperty("help")) cfg.help = '';

            if(typeof showHelper != "undefined") showHelper("Autocomplete", cfg);
            else alert("Helper not available!")
            return;
        }

        it.autocomplete.showHelper = function(el){
            var data = ["Humanes de Madrid", "Madrid", "Rivas-Vaciamadrid", "Rozas de Madrid, Las", "Madridejos", "Madridanos", "Valmadrid"];

            // Definimos el array de ejemplo
            var strData = ''
            for(var x = 0; x < data.length; x++){
                strData += '<b>"' + (typeof data[x] == "string" ? data[x] : Object.values(data[x])[0]) + '"</b>, ';
            }

            function getResults(pattern){
                var str = [], iCount = 0;

                for(var i = 0; i < data.length; i++){
                    if(it.autocomplete.search(pattern, data[i])){
                        str.push(data[i]);
                        iCount++;
                    }

                    if(iCount == 3) break;
                }

                var text = 'devolvera, entre otros, ';
                if(iCount == 0) text = 'no devolverá nada';

                return text + "<b>" + str.join("</b>, <b>") + '</b>';
            }

            // Definimos los resultados para los ejemplos recuperados
            var equal = getResults('"' + data[0] + '"');
            var contains = getResults(data[0].toLowerCase().substr(0, 1) + "+" + data[0].toLowerCase().substr(1, 1));
            var astStart = getResults("*" + data[0].toLowerCase().substr(0, 1));
            var astEnds = getResults(data[0].toLowerCase().substr(0, 1) + "*");
            var astAst = getResults("*" + data[0].toLowerCase().substr(0, 1) + "*");

            // Creamos la capa de ayuda
            var div = document.createElement("div");
            div.classList.add("it-autocomplete-helper");

            var ul = document.createElement("ul");
            var li1 = document.createElement("li");
            li1.innerHTML = '<button onclick="this.parentElement.parentElement.parentElement.remove()">Cerrar</button>';
            ul.append(li1);

            var li2 = document.createElement("li");
            li2.innerHTML = '<h3>Ayuda de autocompletado</h3>';
            ul.append(li2);

            var li3 = document.createElement("li");
            li3.innerHTML = '<p>Este campo permite realizar búsquedas mediante caracteres comodín como son las comillas dobles, el símbolo más o el símbolo asterisco.</p>';
            //li3.innerHTML +='<p>Para entender mejor el significado de los caracteres comodín, supóngase que se tiene una lista que contiene los siguientes datos:</p>';
            //li3.innerHTML  ='<p>Por ejemplo:/p>';
            li3.innerHTML += '<code style="display: block;margin: 10;margin: 10px 0;">' + strData + '</code>';
            li3.innerHTML += '<p><b>""</b>: Busca los resultados que coincidan exactamente con la cadena entrecomillada. Por ejemplo, si buscamos <b>"' + data[0] + '-"</b> no devolverá nada, pero si buscamos <b>"' + data[0] + '"</b>, nos devolverá el registro que tenga como texto, exáctamente ese valor. En este caso, ' + equal.replace('devolvera, entre otros, ', '') + '.</p>';
            ul.append(li3);

            var li4 = document.createElement("li");
            li4.innerHTML = '<p><b>+</b>: Permite establecer búsquedas que tengan coincidencias parciales o totales de ambas expresiones. Por ejemplo, si buscamos <b>' + (data[0].toLowerCase().substr(0, 1) + "+" + data[0].toLowerCase().substr(1, 1)) + '</b> ' + contains + '.</p>';
            ul.append(li4);

            var li5 = document.createElement("li"), str = '';
            str += '<p><b>*</b>: El símbolo asterisco equivale a decir "cualquier cosa", pero dependiendo de dónde se encuentre y cuántos haya, significará una cosa u otra. ';
            str += 'Por ejemplo, si se establece delante de una expresión buscará todas las coincidencias que terminen con la expresión, por lo que si buscamos <b>' + ("*" + data[0].toLowerCase().substr(0, 1)) + '</b> ' + astStart + '. ';
            str += 'Si se establece detrás de una expresión buscará todas las coincidencias que empiecen con la expresión, por lo que si buscamos <b>' + (data[0].toLowerCase().substr(0, 1) + "*") + '</b> ' + astEnds + '. ';
            str += 'Si se establece delante y detrás de una expresión buscará todas las coincidencias que contengan la expresión, por lo que si buscamos <b>' + ("*" + data[0].toLowerCase().substr(0, 1) + "*") + '</b>, ' + astAst + '.</p>';
            li5.innerHTML = str;
            ul.append(li5);

            div.append(ul);

            // La mostramos en pantalla
            document.body.append(div);
        }

        it.autocomplete.hideHelper = function(el){
            document.querySelector(".it-autocomplete-helper").remove();
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
                if(typeof cfg == "undefined") cfg = { help: '' };
                if(!cfg.hasOwnProperty("help")) cfg.help = '';

                if(typeof showHelper != "undefined") showHelper("Benchmark", cfg);
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
                    "(function(f){" +
                    "   return function innerLoop4" + this.fn.name + "(n){" +
                    "       for(var i = 0; i < n; i++) f()" +
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
                do{
                    innerLoop(iterations);
                    totalIterations += iterations;
                    checks++;
                    elapsed = Date.now() - init;
                    if(elapsed >= this.testTime) break;
                    iterations = 0 | Math.min(this.maxIterations, (timeExcess - elapsed) / (elapsed + 1) * totalIterations);
                } while (elapsed < this.testTime);

                // Stats
                var secs = elapsed / 1000;
                var perSecondIterations = 0 | totalIterations / secs;
                if(this.showLog){
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
                this.results.sort(function(a, b){
                    return b.perSecondIterations - a.perSecondIterations;
                });
                var max = this.results[0].perSecondIterations;
                this.results.forEach(function(a){
                    return a.diff = Math.round((max - a.perSecondIterations) / max * 10000) / 100 + "%";
                });

                // Options method
                Benchmark.options = function(){
                    return{
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
    	@version: 1.2
    	@author: Pablo E. Fernández (islavisual@gmail.com).
    	@Copyright 2017-2022 Islavisual.
    	@Last update: 19/05/2020
    **/
    if(json.Constraint){
        this.Constraint = it.constraint = function(cfg){
            if(!cfg || cfg == ""){ alert("Restricción no definida!. Por favor, mira la ayuda a través de: Helper('Constraint')"); return false; }

            if(this.targets.length == 0) alert("Restricción no definida!.\nNo se ha encontrado el objetivo.")

            Array.prototype.slice.call(this.targets).forEach(function(target){
                it.constraint.config[target.id] = cfg;
                it.constraint.config[target.id].target = target.id;
            });

            this.constraint.set();

            this.so = "constraint";
        }
        it.constraint.version = '1.1';
        it.constraint.config = {};
        it.constraint.options = {};
        it.constraint.help = function(cfg){
            if(typeof cfg == "undefined") cfg = { help: '' };
            if(!cfg.hasOwnProperty("help")) cfg.help = '';

            if(typeof showHelper != "undefined") showHelper("Constraint", cfg);
            else alert("Helper not available!")
            return;
        }

        it.constraint.increment = function(id){
            if(id == undefined) id = it.targets[0].id;

            var opt = document[id].options;
            if(opt.type == 'hour'){
                this._setHour(document.getElementById(opt.target), "up");
            } else {
                this._setNumber(document.getElementById(opt.target), "up");
            }
        }

        it.constraint.decrement = function(id){
            if(id == undefined) id = it.targets[0].id;

            var opt = document[id].options;
            if(opt.type == 'hour'){
                this._setHour(document.getElementById(opt.target), "down");
            } else {
                this._setNumber(document.getElementById(opt.target), "down");
            }
        }
        it.constraint.set = function(){
            for(var key in this.config){
                // Set attributes
                cfg = this.config[key];

                // If configuration object is invalid
                if(!cfg.hasOwnProperty('target')){ alert("You need set an input ID into 'target' parameter!. Please, see the help with the Constraint.help();"); return false; }
                if(document.getElementById(cfg.target) == null){ alert("The element with ID '" + cfg.target + "' not exists!"); return false; }
                if(!cfg.hasOwnProperty('type')){ alert("You need set an input type!. Please, see the help with the Constraint.help();"); return false; }

                // Create JSON with current opt
                var opt = {
                    base: !cfg.hasOwnProperty('base') ? (cfg.type == "binary" ? 2 : (cfg.type == "hexadecimal" ? 16 : 10)) : cfg.base,
                    custom: cfg.type == "custom" ? true : false,
                    ds: !cfg.hasOwnProperty('decimalpoint') ? '.' : cfg.decimalpoint,
                    function: !cfg.hasOwnProperty('function') ? null : cfg.function,
                    indicators: !cfg.hasOwnProperty('indicators') ?{ enabled: true, color: 'rgba(0,0,0,0.25)' } : cfg.indicators,
                    step: !cfg.hasOwnProperty('step') ? 1 : parseFloat(cfg.step),
                    target: cfg.target,
                    type: cfg.type
                }
                if(!opt.indicators.hasOwnProperty('enabled')) opt.indicators.enabled = true;
                if(!opt.indicators.hasOwnProperty('color')) opt.indicators.color = 'rgba(0,0,0,0.25)';

                // Update input type assigned
                document.getElementById(opt.target).setAttribute("type", "text");

                // Set custom function
                if(opt.custom && !opt.function) alert("You must define a function. Please, see the help with the Constraint('help');");
                else if(opt.custom && opt.function) Constraint._types[cfg.target] = opt.function;

                // Set events to input
                function assignEvents(textbox, type, ds){
                    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event){
                        textbox.addEventListener(event, function(){
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

                            if(valid){ this.oldValue = this.value; } else if(this.hasOwnProperty("oldValue")){ this.value = this.oldValue; }

                            return valid;
                        });
                    });
                }

                // Set indicators into input
                if(opt.indicators.enabled){
                    var input = document.getElementById(opt.target),
                        iDown = document.createElement("div"),
                        iUp = document.createElement("div");

                    iDown.setAttribute("class", "caret-down");
                    iDown.setAttribute("onclick", 'Constraint.decrement("' + opt.target + '")');
                    iDown.style = 'cursor: pointer; border: 5px solid red; border-width: 5px 5px 0 5px; border-color: ' + opt.indicators.color + ' transparent transparent transparent; width: 7px; position: absolute; bottom: 0; margin: 10px; right: 15px;';
                    iUp.setAttribute("class", "caret-up");
                    iUp.setAttribute("onclick", 'Constraint.increment("' + opt.target + '")');
                    iUp.style = 'cursor: pointer; border: 5px solid red; border-width: 0 5px 5px 5px; border-color: transparent transparent ' + opt.indicators.color + ' transparent; width: 7px; position: absolute; bottom: 10px; margin: 10px; right: 15px;';

                    input.parentNode.insertBefore(iDown, input.nextSibling);
                    input.parentNode.insertBefore(iUp, input.nextSibling);

                    // Add events of increment and decrement
                    input.addEventListener("keydown", function(e){
                        if(e.keyCode == 38){
                            if(opt.type == "hour"){
                                Constraint._setHour(e.target, 'up');
                                return false;
                            } else {
                                Constraint._setNumber(e.target, 'up');
                            }


                        } else if(e.keyCode == 40){
                            if(opt.type == "hour"){
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
            }

            return this;
        };

        it.constraint._setNumber = function(e, d){
            var opt = document[e.id].options, aux = '';
            var d = (d == 'down' ? -1 : 1) * opt.step;
            var v = parseFloat(opt.ds != "." ? e.value.replace(opt.ds, ".") : e.value);
            var md = parseInt((Math.abs(d) < 1.0) ? d.toString().split(".")[1].length : 0);
            var dec = e.value.indexOf(opt.ds) != -1 ? (e.value.length - e.value.indexOf(opt.ds) - 1) : md;
            dec = dec < md ? md : dec;

            if(opt.base != 10){
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
                valid = Constraint._types[opt.type](aux);
            }

            if(!valid) aux = '0';
            e.value = aux;
        }

        it.constraint._setHour = function(e, d){
            var aux = e.value.split(":"), sep = e.value.indexOf(":"), sp = e.selectionStart < sep ? 0 : 5;
            var va = 0, d = d == 'down' ? -1 : 1;

            if(sep != -1 && sp < 3){
                va = parseInt(aux[0]) + d;
                aux = (va < 10 ? ('0' + va) : va) + ":" + aux[1];
            } else if(sep != -1 && sp >= 3){
                va = parseInt(aux[1]) + d;
                aux = aux[0] + ":" + (va < 10 ? ('0' + va) : va);
            } else if(sep == -1){
                va = parseInt(aux) + d;
                aux = va < 10 ? ('0' + va) : va;
            }

            var valid = Constraint._types[document[e.id].options.type](aux);
            if(!valid && aux.toString().length < 3) aux = '00:00';
            else if(valid && aux.toString().length < 3) aux = aux + ':00';
            else if(!valid) aux = e.value;
            e.value = aux;

            setTimeout(function(){ e.setSelectionRange(sp, sp); }, 10);
        }

        it.constraint._types = {
            // Formats by default
            int: function(value){ return /^-?\d*$/.test(value); },
            uint: function(value){ return /^\d*$/.test(value); },
            float: function(value, ds){ return new RegExp('^-?\\d*[' + ds + ']?\\d*$').test(value); },
            decimal: function(value, ds){ return new RegExp('^-?\\d*[' + ds + ']?\\d{0,2}$').test(value); },
            percent: function(value){ return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 100); },
            binary: function(value){ return /^(0|1)*$/.test(value); },
            hexadecimal: function(value){ return /^[0-9a-f]*$/i.test(value); },
            hour: function(value){ return /^([0-2]{0,1}|0[0-9]|1[0-9]|2[0-3])([:]?|:[0-5]{1}[0-9]{0,1})$/.test(value); },
            custom: this.function ? this.function : null,
        }
    }

    /**
    	Create counters.
    	@version: 1.1.0
    	@author: Pablo E. Fernández (islavisual@gmail.com).
    	@Copyright 2017-2022 Islavisual.
    	@Last update: 19/05/2020
    **/
    if(json.Counter){
        this.Counter = it.counter = function(cfg){
            if(!cfg || cfg == ""){ alert("Counter not defined!"); return false; }

            Array.prototype.slice.call(this.targets).forEach(function(target){
                it.counter.config[target.id] = { target: target, config: cfg }
            });

            if(arguments.length == 0){
                alert("No se ha definido la máscara")
                return;
            }

            var low, half, high;
            for(var key in it.counter.config){
                // Recover the configuration
                cfg = it.counter.config[key].config;

                // Set the default values if not setted
                if(!cfg.hasOwnProperty("colors")){
                    low = 'rgb(255,0,0)'.replace(/rgb\(/i, '').replace(/\)/, '').trim().split(',');
                    half = 'rgb(255,175,0)'.replace(/rgb\(/i, '').replace(/\)/, '').trim().split(',');
                    high = 'rgb(128,128,128)'.replace(/rgb\(/i, '').replace(/\)/, '').trim().split(',');

                } else {
                    low = cfg.colors.low.replace(/rgb\(/i, '').replace(/\)/, '').trim().split(',');
                    half = cfg.colors.half.replace(/rgb\(/i, '').replace(/\)/, '').trim().split(',');
                    high = cfg.colors.high.replace(/rgb\(/i, '').replace(/\)/, '').trim().split(',');
                }

                if(!cfg.hasOwnProperty("notify")) cfg.notify = {};
                if(!cfg.hasOwnProperty("interval")) cfg.interval = 1;
                if(!cfg.hasOwnProperty("mode")) cfg.mode = 'timer';
                if(!cfg.hasOwnProperty("showvalue")) cfg.showvalue = true;
                if(!cfg.hasOwnProperty("title")) cfg.title = '';
                if(!cfg.hasOwnProperty("renew")) cfg.renew = false;
                if(!cfg.hasOwnProperty("format")) cfg.format = "HH:MM:SS";
                if(!cfg.hasOwnProperty("stylesheet")) cfg.stylesheet = false;

                // Notify status is false by default
                cfg.notify.shown = false;

                // Set colors to counter
                if(cfg.from){
                    cfg.colors = [
                       { pct: 0.0, color:{ r: low[0], g: low[1], b: low[2] } },
                       { pct: 0.5, color:{ r: half[0], g: half[1], b: half[2] } },
                       { pct: 1.0, color:{ r: high[0], g: high[1], b: high[2] } }
                    ]
                } else {
                    cfg.colors = [
                       { pct: 0.0, color:{ r: high[0], g: high[1], b: high[2] } },
                       { pct: 0.5, color:{ r: half[0], g: half[1], b: half[2] } },
                       { pct: 1.0, color:{ r: low[0], g: low[1], b: low[2] } }
                    ]
                }

                // Create element container to counter
                var div = document.createElement("div");
                div.classList.add("it-counter");

                if(cfg.showvalue){
                    if(cfg.from){
                        if(cfg.mode == 'timer'){
                            var h = Math.floor(cfg.from / 60 / 60);
                            var m = Math.floor((cfg.from - (h * 3600)) / 60);
                            var s = Math.floor(cfg.from - (h * 3600) - (m * 60));

                            var tmpl = cfg.format.replace("HH", h < 10 ? ("0" + h) : h)
                                .replace("MM", m < 10 ? ("0" + m) : m)
                                .replace("SS", s < 10 ? ("0" + s) : s)
                            div.dataset.value = tmpl;
                        } else {
                            div.dataset.value = cfg.from;
                        }

                    } else if(cfg.to){
                        if(cfg.mode == 'timer'){
                            div.dataset.value = cfg.format.replace("HH", "00").replace("MM", "00").replace("SS", "00");
                        } else {
                            div.dataset.value = '0';
                        }
                    }
                }

                div.setAttribute("title", cfg.title);

                var span = document.createElement("span");
                span.classList.add("progress");
                span.style.width = "100%";

                div.append(span);

                // Store the target to future uses
                it.counter.config[key].target.innerHTML = '';
                it.counter.config[key].target.append(div);

                // Trigger timeout
                if(cfg.from){
                    it.counter.timer = setTimeout(it.counter.countdown, cfg.interval * 1000, div, cfg);
                } else if(cfg.to){
                    it.counter.timer = setTimeout(it.counter.countup, cfg.interval * 1000, div, cfg);
                }
            }

            if(!cfg.stylesheet){
                it.addCSSRule('', '.it-counter', 'position: relative; float: right; width: 64px; height: 27px; margin: 10px 10px 10px 5px; border-radius: 4px; padding: 3px; border: 1px solid rgba(255,255,255, 0.8); box-shadow: 0 0 0 2px rgb(0 0 0) inset;');
                it.addCSSRule('', '.it-counter::before', 'content: attr(data-value); position: absolute; top: 0; left: 0; text-align: center; width: 100%; color: #000; height: 100%; padding: 0; line-height: 24px; font-size: 0.9rem; z-index: 1;');
                it.addCSSRule('', '.it-counter::after', 'content: ""; background: rgba(0, 0 , 0, 0.8); position: absolute; right: -5px; top: 5px; width: 5px; height: calc(100% - 10px); padding: 0;');
                it.addCSSRule('', '.it-counter span.progress', 'width: 100%; height: 19px; min-height: auto; line-height: normal; padding: 0; float: left; border-radius: 2px; background: rgba(0,64,128, 1); position: relative; top: auto; right: auto; z-index: 0;');
            }

            this.so = "counter";
        }

        it.counter.version = '1.0';
        it.counter.config = [];
        it.counter.help = function(cfg){
            if(typeof cfg == "undefined") cfg = { help: '' };
            if(!cfg.hasOwnProperty("help")) cfg.help = '';

            if(typeof showHelper != "undefined") showHelper("Counter", cfg);
            else alert("Helper not available!")
            return;
        }
        it.counter.timer = null;
        it.counter.countdown = function(trg, cfg){
            if(!cfg.start) cfg.start = cfg.mode == 'timer' ? Math.floor(new Date().getTime() / 1000) : 0;

            clearTimeout(it.counter.timer);

            var t = cfg.mode == 'timer' ? Math.floor(cfg.from - (new Date().getTime() / 1000 - cfg.start)) : (cfg.from - cfg.start)

            if(t <= 0) t = 0;

            it.counter.updateCounter(t, trg, cfg);

            t = null;
        }
        it.counter.countup = function(trg, cfg){
            if(!cfg.start) cfg.start = cfg.mode == 'timer' ? Math.floor(new Date().getTime() / 1000) : 0;

            clearTimeout(it.counter.timer);

            var t = cfg.mode == 'timer' ? Math.floor((new Date().getTime() / 1000) - cfg.start) : cfg.start++;

            if(t > cfg.to) t = cfg.to;

            it.counter.updateCounter(t, trg, cfg);

            t = null;
        }
        it.counter.updateCounter = function(t, trg, cfg){
            var h, m, s;

            if(cfg.notify && !cfg.notify.shown && t <= cfg.notify.in){
                alert(cfg.notify.message)
                cfg.notify.shown = true;

                if(cfg.notify.callback) cfg.notify.callback();
            }

            if(cfg.from && cfg.renew && t <= cfg.renew.in){
                cfg.showvalue = false;
                trg.dataset.value = cfg.renew.message;
                trg.setAttribute("onclick", "it.counter.renew(this)");
                trg.style.cursor = "pointer";
            }

            if(cfg.showvalue || (cfg.from && t == 0)){
                if(cfg.mode == 'timer'){
                    h = Math.floor(t / 60 / 60);
                    m = Math.floor((t - (h * 3600)) / 60);
                    s = Math.floor(t - (h * 3600) - (m * 60));

                    var tmpl = cfg.format.replace("HH", h < 10 ? ("0" + h) : h)
                        .replace("MM", m < 10 ? ("0" + m) : m)
                        .replace("SS", s < 10 ? ("0" + s) : s)
                    trg.dataset.value = tmpl;

                } else {
                    trg.dataset.value = t;
                    cfg.start++;
                }
            }

            var pct = (t * 100 / (cfg.from || cfg.to)).toFixed(2);

            trg.querySelector("span").style.width = pct + "%";
            trg.querySelector("span").style.background = it.counter.getColorForPercentage(pct / 100, cfg.colors);

            if(cfg.from && t > 0){
                it.counter.timer = setTimeout(it.counter.countdown, cfg.interval * 1000, trg, cfg)
            } else if(t < cfg.to){
                it.counter.timer = setTimeout(it.counter.countup, cfg.interval * 1000, trg, cfg)
            } else {
                it.counter.renew(trg);
                it.counter.timer = null;

                if(cfg.callback) cfg.callback();
            }

            t = h = m = s = null;
        }
        it.counter.renew = function(el){
            el = el.parentElement;
            var cfg = it.counter.config[el.id].config;
            cfg.start = cfg.mode == 'timer' ? Math.floor(new Date().getTime() / 1000) : 0;
            cfg.showvalue = true;

            el.removeAttribute("onclick");
            el.style.cursor = "";

            if(cfg.renew && cfg.renew.callback){
                cfg.renew.callback();
            }
        }
        it.counter.getColorForPercentage = function(pct, colors){
            for(var i = 1; i < colors.length - 1; i++){
                if(pct < colors[i].pct){
                    break;
                }
            }
            var lower = colors[i - 1];
            var upper = colors[i];
            var range = upper.pct - lower.pct;
            var rangePct = (pct - lower.pct) / range;
            var pctLower = 1 - rangePct;
            var pctUpper = rangePct;
            var color1 = {
                r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
                g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
                b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
            };

            var color2 = { r: color1.r - 32, g: color1.g - 32, b: color1.b - 32 };

            if(color2.r < 0) color2.r = 0;
            if(color2.g < 0) color2.g = 0;
            if(color2.b < 0) color2.b = 0;

            pct = colors = lower = upper = range = rangePct = pctLower = pctUpper = null;

            return 'linear-gradient(90deg, rgb(' + [color1.r, color1.g, color1.b].join(',') + '), rgb(' + [color2.r, color2.g, color2.b].join(',') + '))';
        };
    }

    /**
    	Datepicker functionality
    	@version: 1.2.4
    	@author: Pablo E. Fernández (islavisual@gmail.com).
    	@Copyright 2017-2022 Islavisual.
    	@Last update: 06/04/2021
    **/
    if(json.Datepicker){
        this.Datepicker = it.datepicker = function(cfg){
            // If the target is only one, we update targets
            if((typeof cfg == "string" && cfg == "show")){
                cfg = it.datepicker.config.custom[this.targets[0].id];
            } else {
                // If the device is mobile, we change the type of input element to date and do nothing else.
                var type = "text";
                try{
                    if(typeof document.createEvent("TouchEvent") != "undefined"){
                        type = "date";
                    }
                } catch (e){}


                // Set datepicker field type
                Array.prototype.slice.call(this.targets).forEach(function(target, idx){
                    var aux = target.value;
                    target.type = type;
                    target.value = aux;
                });
            }

            Array.prototype.slice.call(this.targets).forEach(function(target, idx){
                // Get ID
                var id = target.id;

                // If the id attrtibute is not set, we assign it by default
                id = id == "" ? ('it-datepicker_' + idx) : id;

                if(cfg == undefined) cfg = it.datepicker.config;

                for(var key in it.datepicker.config){
                    cfg[key] = cfg.hasOwnProperty(key) ? cfg[key] : it.datepicker.config[key]
                }

                // Assure the input format
                if(target.value.substr(4, 1) == "-" && target.value.substr(7, 1) == "-"){
                    var date = new Date(target.value);
                    date = it.datepicker.dateToUTC(date).toLocaleString().split(" ")[0].toString().split(/[\-|\/]/g);

                    for(var x = 0; x < date.length; x++){
                        if(date[x] < 10) date[x] = "0" + date[x];
                    }

                    target.value = cfg.format.replace("DD", date[0]).replace("MM", date[1]).replace("YYYY", date[2]).replace("YY", date[2].substring(2));
                    target.value = target.value.replace(/[^(0-9|\-|\/)]/g, '');
                }


                try{ cfg.custom[id].md = { b: [], c: [], a: [] }; } catch (e){}

                // If the process is in create/assign mode
                var loading = false;

                if(!target.parentElement.classList.contains("has-datepicker")){
                    cfg.custom[id] = {};

                    // Set default properties
                    for(var k in cfg){
                        if(k == 'custom') continue;
                        cfg.custom[id][k] = cfg[k];
                    }

                    if(!cfg.hasOwnProperty("background")) cfg.custom[id].background = '#24549c';
                    if(!cfg.hasOwnProperty("color")) cfg.custom[id].foreground = '#fff';
                    if(!cfg.hasOwnProperty("stylesheet")) cfg.custom[id].stylesheet = false;

                    // Add Styles
                    if(!cfg.stylesheet){
                        it.datepicker._addCSSRules(id, cfg.custom[id].background, cfg.custom[id].foreground);
                    }

                    // Create new container to datepicker 
                    var aux = target.outerHTML;
                    var new_html = "<div class='has-datepicker'>" + aux + "</div>";
                    target.insertAdjacentHTML("afterend", new_html);
                    aux = target.nextElementSibling.querySelector("input")
                    target.remove();
                    target = aux;
                    aux = null;

                    // Add and configure trigger button
                    var trigger = document.createElement('button');
                    trigger.id = 'it-datepicker-trigger-' + idx;
                    trigger.type = "button";
                    trigger.setAttribute("aria-lbel", cfg.textTrigger)
                    if(cfg.icon.indexOf("<") != -1){
                        trigger.innerHTML = cfg.icon;
                    } else {
                        var cls = cfg.icon.split(" ");
                        cls.forEach(function(val){
                            trigger.classList.add(val)
                        });
                    }
                    target.parentElement.insertBefore(trigger, target.nextElementSibling);

                    // Add event to show picker
                    target.nextElementSibling.onclick = function(e){
                        e.preventDefault();
                        var trg = e.target.previousElementSibling;

                        if(!trg) trg = e.target.parentElement.previousElementSibling;

                        it('#' + trg.id).datepicker('show');
                    }

                    loading = true;
                }

                // Get config
                cfg = cfg.custom[id];

                if(!loading){
                    // Close all previous datepickers
                    var items = document.querySelectorAll(".datepicker-close");
                    for(var x = 0; x < items.length; x++){
                        items[x].click();
                    }

                    it.simulateEvent("change", target);

                    // Get current values
                    cfg.curDate = it.datepicker.createDate();
                    cfg.curDate.setMinutes(new Date().getMinutes() - new Date().getTimezoneOffset());
                    cfg.curDate = cfg.curDate.toJSON().slice(0, 10);
                    cfg.curYear = cfg.curDate.split(/[\-|\/]/g)[0];
                    cfg.curMonth = cfg.curDate.split(/[\-|\/]/g)[1];
                    cfg.curDay = cfg.curDate.split(/[\-|\/]/g)[2];

                    // Get requested values
                    if(target.value.trim() == ""){
                        cfg.selYear = cfg.curYear;
                        cfg.selMonth = cfg.curMonth;
                        cfg.selDay = cfg.curDay;

                    } else {
                        target.value = target.value.trim();
                        cfg.selYear = target.value.substr(cfg.format.indexOf("YYYY"), 4);
                        cfg.selMonth = target.value.substr(cfg.format.indexOf("MM"), 2);
                        cfg.selDay = target.value.substr(cfg.format.indexOf("DD"), 2);

                        if(!it.datepicker.validDate(cfg.selDay, cfg.selMonth, cfg.selYear)){
                            cfg.selYear = cfg.curYear;
                            cfg.selMonth = cfg.curMonth;
                            cfg.selDay = cfg.curDay;
                        }
                    }

                    target.value = cfg.format.replace(/DD/, cfg.selDay).replace(/MM/, cfg.selMonth).replace(/YYYY/, cfg.selYear);

                    it.simulateEvent("change", target);

                    cfg.selMName = cfg.longmonths[parseInt(cfg.selMonth - 1)];
                    var dtSel = it.datepicker.createDate(1970 + "-" + cfg.selMonth + "-" + cfg.selDay);
                    dtSel.setFullYear(cfg.selYear);
                    cfg.selDName = cfg.longdays[dtSel.getUTCDay()];

                    // Get all days from requested month
                    var x = 1, c = true, firstdate = '', lastdate = '';
                    while (c){
                        var dt = new Date(cfg.selYear, cfg.selMonth - 1, (x < 10 ? ('0' + x) : x), 12, 00, 00);

                        c = dt.getMonth() + 1 == cfg.selMonth;

                        if(x == 1) firstdate = cfg.selYear + '-' + cfg.selMonth + '-01';

                        if(c){
                            cfg.md.c[x - 1] = (x < 10 ? ('0' + x) : x) + '-' + cfg.selMonth + '-' + cfg.selYear;
                            lastdate = cfg.selYear + '-' + cfg.selMonth + '-' + (x < 10 ? ('0' + x) : x);
                        }
                        x++;
                        if(x > 31) break;
                    }

                    // Get before days from requested month
                    var dtFirst = it.datepicker.createDate(firstdate);
                    dtFirst.setFullYear(cfg.selYear);
                    var aux = dtFirst.getUTCDay() - cfg.weekstart, dt = 0;

                    aux = (aux < 0 ? 6 : aux);
                    for(var x = 0; x < aux; x++){
                        dt = new Date(dtFirst.getTime() - (86400000 * (x + 1)));
                        var d = dt.getDate(), m = dt.getMonth() + 1, y = dt.getFullYear();

                        cfg.md.b[aux - x - 1] = (d < 10 ? ('0' + d) : d) + '-' + (m < 10 ? ('0' + m) : m) + '-' + y;
                    }

                    // Fill after days to complete 42
                    var dtLast = it.datepicker.createDate(lastdate);
                    dtLast.setFullYear(cfg.selYear);
                    var aux = dtLast.getUTCDay(), dt = 0, cc = cfg.md.c.length + cfg.md.b.length;
                    for(var x = cc; x < 42; x++){
                        dt = new Date(dtLast.getTime() + (86400000 * (x - cc + 1)));
                        var d = dt.getDate(), m = dt.getMonth() + 1, y = dt.getFullYear();

                        cfg.md.a[x - cc] = (d < 10 ? ('0' + d) : d) + '-' + (m < 10 ? ('0' + m) : m) + '-' + y;
                    }

                    // Define picker object
                    var cal = document.createElement("section");
                    cal.classList.add("it-datepicker");
                    cal.id = "datepicker-layer-" + target.id
                    cal.setAttribute("data-id", target.id);
                    cal.setAttribute("tabindex", "0");
                    cal.setAttribute("onkeydown", "it.datepicker.onkeydown()");
                    cal.setAttribute("onclick", "it.datepicker.click(this)");
                    cal.setAttribute("role", "dialog");
                    cal.setAttribute("aria-modal", "true");
                    cal.setAttribute("aria.labelledby", 'cal_' + Math.random().toString(36).substr(2, 5));

                    var cclose = document.createElement("i");
                    cclose.classList.add("datepicker-close");
                    cclose.innerHTML = "Cerrar";

                    var lcal = document.createElement("div");
                    lcal.classList.add("l-cal");
                    lcal.id = cal.getAttribute("aria-labelledby");
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
                    rcal.innerHTML = '<div class="datepicker-years"><input id="datepicker-year" aria-label="' + cfg.textYear + '" maxlength="4" value="' + cfg.selYear + '" /><span class="dt-up"></span><span class="dt-down"></span></div>';

                    rcal.querySelector(".dt-up").setAttribute("onmousedown", "window.interval_ = setInterval(function(){ it.datepicker.updateYear(event, 1)}, 50)");
                    rcal.querySelector(".dt-up").setAttribute("onmouseup", "clearInterval(window.interval_)");
                    rcal.querySelector(".dt-down").setAttribute("onmousedown", "window.interval_ = setInterval(function(){ it.datepicker.updateYear(event, -1)}, 50)");
                    rcal.querySelector(".dt-down").setAttribute("onmouseup", "clearInterval(window.interval_)");

                    // Fill months buttons
                    var aux = "";
                    for(var x = 0; x < cfg.shortmonths.length; x++){
                        var active = x == cfg.selMonth - 1 ? ' active' : '';
                        aux += '<button aria-label="' + cfg.longmonths[x] + '" data-id="' + x + '" class="month' + active + '">' + cfg.shortmonths[x] + '</button>';
                    }
                    rcal.innerHTML += '<div class="datepicker-months">' + aux + '</div>';

                    // Now create template
                    var all = cfg.md.b.concat(cfg.md.c).concat(cfg.md.a);
                    var vday = parseInt(target.value.split('-')[0]);

                    // Fill day names
                    var dm = '<div class="datepicker-week-names"><div class="datepicker-week">';
                    for(var k = cfg.weekstart; k < cfg.shortdays.length; k++){
                        dm += '<span class="dayname">' + cfg.shortdays[k] + '</span>';
                    }
                    for(var k = 0; k < cfg.weekstart; k++){
                        dm += '<span class="dayname">' + cfg.shortdays[k] + '</span>';
                    }
                    dm += '</div></div>';
                    rcal.innerHTML += dm;

                    // Fill day values
                    var tmpl = '<div class="datepicker-week-data">', x = 0, antday = 0;

                    for(var k in all){
                        var y = all[k].split('-')[2], m = all[k].split('-')[1], d = all[k].split('-')[0]; var day = parseInt(d), mon = parseInt(m);

                        if(x == 0){ tmpl += '<div class="datepicker-week">'; } else if(x % 7 == 0){ tmpl += '</div><div class="datepicker-week">'; }

                        var mode = '';
                        if(mon == parseInt(cfg.selMonth) && day == vday) mode += ' active';
                        if(mon != parseInt(cfg.selMonth)) mode += " disabled";

                        antday = day;

                        tmpl += '<span class="day' + mode + '">' + d + '</span>';
                        x++;

                        if(x > 42) break;
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
                    for(var x = 0; x < items.length; x++){
                        var item = items[x];
                        item.onclick = it.datepicker.dayEvent;
                    }

                    // Add month event
                    var m = rcal.querySelectorAll(".month");
                    for(var x = 0; x < m.length; x++){
                        var item = m[x];

                        item.onclick = it.datepicker.monthEvent;
                    }

                    // Add year event
                    var s = rcal.querySelector("input");
                    s.onkeydown = it.datepicker.updateYear;

                    // Add event of set today
                    var b = document.getElementById("datepicker-layer-" + target.id + "-today");
                    b.onclick = it.datepicker.todayEvent;

                    // Add event to removing data
                    var b = document.getElementById("datepicker-layer-" + target.id + "-remove");
                    b.onclick = it.datepicker.removeEvent;
                }
            }); // end forEach
        }

        it.datepicker.createDate = function(date){
            date = date != undefined ? new Date(date) : new Date();
            return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
        }

        it.datepicker.dateToUTC = function(date){
            return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
        }

        it.datepicker.updateYear = function(e, v){
            if(v == undefined) v = 0;

            var k = e.keyCode || e.which;
            var kv = (k >= 48 && k <= 57 && e.location == 0) || (k >= 96 && k <= 105 && e.location == 3) || k == 8 || k == 46;

            if(e.type == 'keydown' && k == 38){
                e.preventDefault();
                v = 1;
            } else if(e.type == 'keydown' && k == 40){
                e.preventDefault();
                v = -1;
            } else if(e.type == 'keydown' && !kv) return true;

            var cs = e.target.selectionStart, ce = e.target.selectionEnd;

            var trg = it("#datepicker-year").get();
            var key = e.key;

            if(v != 0){
                trg.value = parseInt(trg.value) + v;
            } else {
                if(cs == ce && k == 8){
                    cs--;
                    key = ''
                } else if(cs == ce && k == 46){
                    ce++;
                    key = ''
                } else if(cs != ce && (k == 8 || k == 46)){ key = ''; }

                trg.value = trg.value.substr(0, cs) + key + trg.value.substr(ce);

                if(k == 8 || k == 46){
                    cs--;
                    ce = cs;
                }

                if(cs == ce){
                    cs++;
                    ce++;
                }
            }

            it.datepicker.yearEvent(e, cs, ce)
        }

        it.datepicker.validDate = function(d, m, y){
            var validDaysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            var validYear = true;

            var isleap = (y % 100 === 0) ? (y % 400 === 0) : (y % 4 === 0);
            if(isleap){
                validDaysPerMonth[1]++;
            }

            var validMonth = m >= 1 && m <= 12;
            var validDay = d >= 1 && d <= (validDaysPerMonth[m - 1]);

            if(validYear && validMonth && validDay) return true;

            return false;
        }

        it.datepicker.closeEvent = function(e){
            e.target.parentElement.remove();
        }

        it.datepicker.dayEvent = function(e){
            if(e.target.classList.contains("disabled")) return;

            var aux = e.target.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling;
            aux.click();

            var prt = aux.parentElement.dataset.id;
            var cfg = it.datepicker.config.custom[prt];

            document.getElementById(prt).value = cfg.format.replace(/DD/, e.target.innerHTML).replace(/MM/, cfg.selMonth).replace(/YYYY/, cfg.selYear);

            it.simulateEvent("change", document.getElementById(prt));

            if(!cfg.autoClose) it('#' + prt).datepicker('show');
        }

        it.datepicker.monthEvent = function(e){
            var aux = e.target.parentElement.parentElement.previousElementSibling.previousElementSibling;
            aux.click();
            var prt = aux.parentElement.dataset.id;
            var cfg = it.datepicker.config.custom[prt];
            var mm = parseInt(e.target.dataset.id) + 1;
            mm = mm < 10 ? ('0' + mm) : mm;

            // Adjustment by nonexistent day
            var ndate = new Date(cfg.selYear, mm - 1, cfg.selDay, 12, 0, 0);
            ndate = it.datepicker.dateToUTC(ndate);

            ndate.setFullYear(cfg.selYear);

            if(ndate.getDate() != cfg.selDay){
                var ndate = new Date(1970, mm, 0);
                ndate = it.datepicker.dateToUTC(ndate);
                ndate.setFullYear(cfg.selYear);

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

        it.datepicker.yearEvent = function(e, cs, ce){
            e.preventDefault();

            var value = it("#datepicker-year").get().value;
            var aux = e.target.parentElement.parentElement.previousElementSibling.previousElementSibling;
            aux.click();

            var prt = aux.parentElement.dataset.id;
            var cfg = it.datepicker.config.custom[prt];

            document.getElementById(prt).value = cfg.format.replace(/DD/, cfg.selDay).replace(/MM/, cfg.selMonth).replace(/YYYY/, value);

            it.simulateEvent("change", document.getElementById(prt));

            it('#' + prt).datepicker('show');

            if(e.type == "keydown"){
                setTimeout(function(ce){
                    var aux = document.getElementById(this);
                    aux.focus();
                    aux.setSelectionRange(ce, ce)
                }.bind(e.target.id, ce), 0);
            }
        }

        it.datepicker.todayEvent = function(e){
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

        it.datepicker.removeEvent = function(e){
            var aux = e.target.parentElement.parentElement.parentElement;
            var cfg = it.datepicker.config.custom[aux.dataset.id];

            document.getElementById(aux.dataset.id).value = '';

            it.simulateEvent("change", document.getElementById(aux.dataset.id));

            if(cfg.autoClose){
                e.target.parentElement.parentElement.parentElement.children[0].click();
            }
        }

        it.datepicker.onkeydown = function(){
            var key = window.event.keyCode || window.event.which;
            if(key == 9 || key == 27){
                if(document.querySelector(".datepicker-close")){
                    document.querySelector(".datepicker-close").click();
                }
            }
        }

        it.datepicker.click = function(){
            var trg = window.event.target;
            if(trg.tagName.toLowerCase() == "section"){
                trg.querySelector('.datepicker-close').click();
            }
        }

        it.datepicker.version = '1.0';

        it.datepicker._addCSSRules = function(id, bg, fg){
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
            it.addCSSRule('', "#datepicker-layer-" + id + " .datepicker-years", 'margin-bottom: 0; padding: 0 5px 5px; position: relative;');
            it.addCSSRule('', "#datepicker-layer-" + id + " .datepicker-years input", 'font-size: 14px; height: 24px; width: 3.2em; background: ' + fg + '; color: #000;     border: 1px solid rgba(0,0,0,0.1); padding: 0; text-align: center; float: right; margin: 0 3px 5px calc(75% - 10px); position: relative; left: -10px; box-shadow: none !important;');
            it.addCSSRule('', "#datepicker-layer-" + id + " .datepicker-years input ~ span.dt-down", 'display: block; position: absolute; right: 8px; top: 12px; border: 1px solid rgba(0,0,0,0.1); width: 11px; height: 12px;');
            it.addCSSRule('', "#datepicker-layer-" + id + " .datepicker-years input ~ span.dt-down::before", 'display: block; position: absolute; right: 2px; top: 3px; border-left: 3px solid transparent; border-right: 3px solid transparent; border-top: 6px solid rgba(0,0,0,0.5); width: 0; height: 0; content: "";');
            it.addCSSRule('', "#datepicker-layer-" + id + " .datepicker-years input ~ span.dt-up", 'display: block; position: absolute; right: 8px; top: 0; border: 1px solid rgba(0,0,0,0.1); width: 11px; height: 12px;');
            it.addCSSRule('', "#datepicker-layer-" + id + " .datepicker-years input ~ span.dt-up::before", 'display: block; position: absolute; right: 2px; top: 2px; border-left: 3px solid transparent; border-right: 3px solid transparent; border-bottom: 6px solid rgba(0,0,0,0.5); width: 0; height: 0; content: "";');
            it.addCSSRule('', "#datepicker-layer-" + id + " .datepicker-months", 'border-bottom: 1px solid rgba(0,0,0,0.2); padding: 0 4px;');
            it.addCSSRule('', "#datepicker-layer-" + id + " .datepicker-months .month", 'cursor: pointer; font-size: 14px; width: 40px; display: inline-block; text-align: center; background: ' + fg + '; border: 1px solid rgba(0,0,0,0.1); margin: 0 0 5px 3px; padding: 1px 0 0 0; line-height: 21px; box-sizing: border-box;');
            it.addCSSRule('', "#datepicker-layer-" + id + " .datepicker-months .month.active, #datepicker-layer-" + id + " .datepicker-months .month:hover", ' background: ' + bg + '; color: ' + fg + '; border-color: rgba(0,0,0,0.1); font-weight: normal;');
            it.addCSSRule('', "#datepicker-layer-" + id + " .datepicker-week", 'padding: 0 5px; display: table;');
            it.addCSSRule('', "#datepicker-layer-" + id + " .r-cal .datepicker-week-names .datepicker-week", 'padding: 5px; background: ' + bg + '; color: ' + fg + ';');
            it.addCSSRule('', "#datepicker-layer-" + id + " .datepicker-week .dayname, #datepicker-layer-" + id + " .datepicker-week .day", 'cursor: pointer; font-size: 14px; width: 40px; display: table-cell; text-align: center; border: 0 none; margin: 0; padding: 2px 6px 0px 6px; margin-bottom: 5px; border-color: rgba(0, 0, 0, 0);');
            it.addCSSRule('', "#datepicker-layer-" + id + " .datepicker-week .day.disabled", 'opacity: 0.5;');
            it.addCSSRule('', "#datepicker-layer-" + id + " .datepicker-week .day.active, #datepicker-layer-" + id + " .datepicker-week .day:hover", 'font-weight: normal; background: ' + bg + '; color: ' + fg + '; border-color: rgba(0,0,0,0.1); padding: 0 6px;');
            it.addCSSRule('', "#datepicker-layer-" + id + " .datepicker-buttons", 'position: absolute; bottom: 0; left: 0; width: 100%; background: rgba(0,0,0,0.2); padding: 0;');
            it.addCSSRule('', "#datepicker-layer-" + id + " .datepicker-buttons button", 'cursor: pointer; color: ' + fg + '; background: ' + bg + '; border: 1px solid ' + bg + '; height: 30px; font-weight: normal; font-size: 14px; width: 100%; margin: 0; padding-top: 1px;');
            it.addCSSRule('', ".has-datepicker input", 'width: 6.8em !important; float: left;');
            it.addCSSRule('', ".has-datepicker input + button", 'cursor:pointer; background: rgba(0,0,0,0); border: 0 none; position: relative; left: 0; top: 0; min-height: 28px; min-width: 28px;');
        };

        it.datepicker.config = {
            icon: '<i class="fa fa-calendar"></i>',
            shortdays: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
            longdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            shortmonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            longmonths: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            weekstart: 1,
            textTrigger: 'Mostrar el calendario',
            textYear: 'Año',
            textToday: 'Hoy',
            textRemove: 'Eliminar',
            autoClose: true,
            curDate: null,
            selMonth: null,
            selYear: null,
            selDay: null,
            format: 'DD-MM-YYYY',
            md:{},
            custom: []
        }

        it.datepicker.help = function(cfg){
            if(typeof cfg == "undefined") cfg = { help: '' };
            if(!cfg.hasOwnProperty("help")) cfg.help = '';

            if(typeof showHelper != "undefined") showHelper("Datepicker", cfg);
            else alert("Helper no disponible!")
            return;
        }
    }

    /**
    	 Debugger functionality
    	@version: 1.00
    	@author: Pablo E. Fernández (islavisual@gmail.com).
    	@Copyright 2017-2022 Islavisual.
    	@Last update: 15/03/2019
    **/
    if(json.Debugger){
        this.Debugger = it.debugger = {
            target: '',
            targetWindow: null,
            mutationObserver: 'Not Supported',
            attributesFilter: [],
            excludedAttributesFilter: ['style'],
            selectorsFilter: [],
            excludedSelectorsFilter: [],
            elements: '*',
            eventsFilter: [],
            enableHistory: false,
            history:{},
            messages:{
                ajaxBeforeSend: 'PROCESSING request <url> in format <type>. Result: <statusText>.',
                ajaxComplete: 'The Ajax processing request FINISHED for the <url> file. Result: <statusText>.',
                ajaxSuccess: 'The Ajax request was completed SUCCESSFULLY for the <url> file.',
                ajaxError: 'An error occurred into Ajax processing request into <url> file. Result: <statusCode>: <statusText>.',
                beforeUnloadPage: 'Page request unload',
                unloadPage: 'Unloaded page',
                errorPage: 'An error occurred into file',
                parsedPage: 'Page loaded and parsed.',
                pageChangedStatus: 'Page changed status:',
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
            colors:{
                added: "#709050",
                attributeChanged: '#ff00ff',
                background: "#000000",
                blur: "#ff6694",
                focus: "#467bfe ",
                click: "#909090",
                mouseOver: "#a07090",
                mouseOut: "#807090",
                keyPress: "#999",
                error: '#a02020',
                headerForeground: "#ffffff",
                headerBackground: "#333",
                normal: "#606060",
                proccessing: "#8AC007",
                readyState: "#8AC007",
                removed: "#a01010",
                sending: "#8AC007",
                updated: "#80a0e0",
                valueChanged: "#FE2466"
            },
            version: '1.0',
            help: function(cfg){
                if(typeof cfg == "undefined") cfg = { help: '' };
                if(!cfg.hasOwnProperty("help")) cfg.help = '';

                if(typeof showHelper != "undefined") showHelper("Debugger", cfg);
                else alert("Helper not available!")
                return;
            },
            isObserved: function(e){
                if(this.selectorsFilter.length != 0){
                    if((this.inArray(e.tagName, this.selectorsFilter) != -1 && this.inArray(e.tagName, this.excludedSelectorsFilter) == -1) || // if the TAG must be observed
                        (typeof e.id != 'undefined' && (this.inArray('#' + e.id, this.selectorsFilter) != -1 && this.inArray('#' + e.id, this.excludedSelectorsFilter) == -1)) || // if the ID must be observed
                        (typeof e.className != 'undefined' && (this.inArray('.' + e.className.replace(/ /g, ' .'), this.selectorsFilter) != -1 && this.inArray('.' + e.className.replace(/ /g, ' .'), this.excludedSelectorsFilter) == -1)) // if the CLASS must be observed
                    ){
                        return true;
                    }
                } else if(this.selectorsFilter.length == 0 && this.inArray(e.tagName, this.excludedSelectorsFilter) == -1 && this.inArray('#' + e.id, this.excludedSelectorsFilter) == -1 && this.inArray('.' + e.className, this.excludedSelectorsFilter) == -1){
                    return true;
                }

                return false;
            },
            init: function(cfg){
                if(typeof cfg == "undefined") cfg = { target: 'console' }
                else if(cfg.target == "undefined") cfg[target] = "console";

                // Assign configuration obteins from parameter
                for(var key in cfg){ this[key] = cfg[key]; }

                if(this.target == 'window'){
                    this.targetWindow = window.open("", "Debugger Window", "toolbar=no, scrollbars=yes, resizable=yes, top=0, left=0, width=500, height=500");
                    this.targetWindow.document.body.innerHTML = "";
                    this.targetWindow.document.write('<style>body{ background:' + this.colors.background + '; } h2{background:' + this.colors.headerBackground + '; color:' + this.colors.headerForeground + '; padding:5px;}</style>');
                    this.targetWindow.document.write('<H2>isiTools Debugger 1.0 - Page loaded at ' + this.getTime() + "</H2>");
                }
                this.showMessage("Target: " + this.target, 'normal');

                // Prepare MutationObserver options to normal use
                var MutationOptions = { subtree: true, childList: true, attributes: true, attributeOldValue: true, characterData: true, characterDataOldValue: true };
                if(typeof this.attributesFilter != 'undefined' && this.attributesFilter.length != 0) MutationOptions.attributesFilter = this.attributesFilter;

                // Mutation Observer feature detection
                var prefixes = ['WebKit', 'Moz', 'O', 'Ms', '']
                for(var i = 0; i < prefixes.length; i++){
                    if(prefixes[i] + 'MutationObserver' in window){
                        this.mutationObserver = window[prefixes[i] + 'MutationObserver'];
                    }
                }

                this.showMessage("Mutation Observer Functionality: " + this.mutationObserver, 'normal');

                var blp = this;

                var observer = new this.mutationObserver(function(mutations){
                    mutations.forEach(function(mutation){
                        var id = mutation.target.id;
                        var classID = mutation.target.className;
                        var tagName = mutation.target.tagName;
                        var lastMod = mutation.target.ownerDocument.lastModified;

                        if(blp.isObserved(mutation.target)){
                            if(typeof id == 'undefined' || id == '') id = tagName + "." + classID;
                            else id = '#' + id;

                            if(mutation.type == "attributes" && blp.excludedAttributesFilter.indexOf(mutation.attributeName) == -1){
                                blp.showMessage(blp.messages.attributeMutation.replace('<attributeName>', mutation.attributeName).replace('<oldValue>', mutation.oldValue).replace('<value>', mutation.target.getAttribute(mutation.attributeName)).replace('<selector>', id), 'attributeChanged');

                            } else if(mutation.type == "childList"){
                                if(mutation.addedNodes.length != 0 && blp.inArray('add', blp.eventsFilter) != -1){
                                    blp.showMessage(blp.messages.addedChildren.replace('<totalChildren>', mutation.addedNodes.length).replace('<selector>', id), 'added');
                                } else if(mutation.removedNodes.length != 0 && blp.inArray('remove', blp.eventsFilter) != -1){
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
                } catch (e){
                    window.onload = function(){
                        blp.setUserEvents();
                    }
                }

                // Show Messages of Ajax from jQuery
                this.showMessage(this.messages.parsedPage, 'sending');

                if(typeof jQuery != "undefined"){
                    $(document).ajaxSuccess(function(evt, jqxhr, settings){
                        var s = this.messages.ajaxSuccess.replace('<method>', settings.async);
                        s = s.replace('<type>', settings.type);
                        s = s.replace('<crossDomain>', settings.crossDomain);
                        s = s.replace('<url>', settings.url);
                        s = s.replace('<contentType>', settings.contentType);
                        this.showMessage(s, 'updated');
                    });

                    $(document).ajaxError(function(evt, jqxhr, settings, err){
                        this.showMessage(this.messages.ajaxError + (this.target == 'console' ? '\n' : '<br/>') + " Status Error: " + jqxhr.status + (this.target == 'console' ? '\n' : '<br/>') + "Status Text: " + jqxhr.statusText + (this.target == 'console' ? '\n' : '<br/>') + "Description: " + jqxhr.responseText, 'error');
                    });

                    $(document).ajaxComplete(function(evt, jqxhr, settings){
                        var s = this.messages.ajaxComplete.replace('<url>', settings.url);
                        this.showMessage(s, 'readyState');
                    });
                    $.ajaxSetup({
                        beforeSend: function(){
                            var s = this.messages.ajaxBeforeSend.replace('<method>', this.async);
                            s = s.replace('<type>', this.type);
                            s = s.replace('<crossDomain>', this.crossDomain);
                            s = s.replace('<url>', this.url);
                            s = s.replace('<contentType>', this.contentType);
                            this.showMessage(s, 'proccessing');
                        }
                    });
                } else {
                    var oldXHR = window.XMLHttpRequest;

                    function newXHR(){
                        var realXHR = new oldXHR();

                        //open(method, url, async, user, psw)

                        realXHR.addEventListener("readystatechange", function(e){
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
                                Debugger.showMessage(Debugger.messages.ajaxError + (Debugger.target == 'console' ? '\n' : '<br/>') + " Status Error: " + this.status + (Debugger.target == 'console' ? '\n' : '<br/>') + "Status Text: " + this.statusText + (Debugger.target == 'console' ? '\n' : '<br/>') + "Description: " + this.responseText, 'error');

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
                document.onreadystatechange = function(){
                    if(document.readyState == "interactive"){
                        this.showMessage(this.messages.pageChangedStatus + " " + document.readyState, 'proccessing');
                    } else {
                        this.showMessage(this.messages.pageChangedStatus + " " + document.readyState, 'readyState');
                    }

                }

                // Show messages on load
                window.addEventListener('load', function(){ this.showMessage(this.messages.pageChangedStatus + " finished", 'updated'); });

                // Show messages on error
                window.onerror = function(errorMsg, url, lineNumber, column, errorObj){
                    alert('Error: ' + errorMsg + '\n' + 'Script: ' + url + '\n' + 'Line: ' + lineNumber + '\n' + 'Column: ' + column);
                    return true;
                }
            },
            getTime: function(){
                var date = new Date();
                var d = date.getDay(),
                    m = date.getMonth() + 1,
                    y = date.getFullYear(),
                    h = date.getHours(),
                    i = date.getMinutes(),
                    s = date.getSeconds(),
                    ms = date.getMilliseconds();
                return (d < 10 ? "0" + d : d) + "/" + (m < 10 ? "0" + m : m) + "/" + (y < 10 ? "0" + y : y) + " " + (h < 10 ? "0" + h : h) + ":" + (i < 10 ? "0" + i : i) + ":" + (s < 10 ? "0" + s : s) + "." + ms;
            },
            setUserEvents: function(){
                var blp = this;
                var events = blp.eventsFilter.join(' ');
                events = events.replace("add", "").replace("remove", "");
                if(blp.eventsFilter.length == 0) events = 'change click focusin focusout keydown';

                events.split(' ').forEach(function(event){
                    var items = document.body.querySelectorAll(blp.elements);
                    for(var its = 0; its < items.length; its++){
                        items[its].addEventListener(event, function(e){
                            e.stopPropagation();
                            var id = e.target.id;
                            var classID = e.target.className;
                            var tagName = e.target.tagName;
                            var type = e.type;

                            if(blp.isObserved(e.target)){
                                if(typeof id == 'undefined' || id == '') id = tagName + "." + classID;
                                else id = '#' + id;

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
                                    var strKey = "",
                                        strCombKey = "",
                                        codeCombKey = "";
                                    if(e.shifdata - tkey || charCode == 16){
                                        strCombKey += "Shift + ";
                                        codeCombKey = "16 + ";
                                    }
                                    if(e.ctrlKey || charCode == 17){
                                        strCombKey += "Ctrl + ";
                                        codeCombKey = "17 + ";
                                    }
                                    if(e.aldata - tkey || charCode == 18){
                                        strCombKey += "Alt + ";
                                        codeCombKey = "18 + ";
                                    }

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
                                    else if(charCode == 91) strKey += "Left window";
                                    else if(charCode == 92) strKey += "Right window";
                                    else if(charCode == 93) strKey += "Select key";
                                    else if(charCode == 96) strKey += "Numpad 0";
                                    else if(charCode == 97) strKey += "Numpad 1";
                                    else if(charCode == 98) strKey += "Numpad 2";
                                    else if(charCode == 99) strKey += "Numpad 3";
                                    else if(charCode == 100) strKey += "Numpad 4";
                                    else if(charCode == 101) strKey += "Numpad 5";
                                    else if(charCode == 102) strKey += "Numpad 6";
                                    else if(charCode == 103) strKey += "Numpad 7";
                                    else if(charCode == 104) strKey += "Numpad 8";
                                    else if(charCode == 105) strKey += "Numpad 9";
                                    else if(charCode == 106) strKey += "Multiply";
                                    else if(charCode == 107) strKey += "Add";
                                    else if(charCode == 109) strKey += "Subtract";
                                    else if(charCode == 110) strKey += "Decimal point";
                                    else if(charCode == 111) strKey += "Divide";
                                    else if(charCode == 112) strKey += "F1";
                                    else if(charCode == 113) strKey += "F2";
                                    else if(charCode == 114) strKey += "F3";
                                    else if(charCode == 115) strKey += "F4";
                                    else if(charCode == 116) strKey += "F5";
                                    else if(charCode == 117) strKey += "F6";
                                    else if(charCode == 118) strKey += "F7";
                                    else if(charCode == 119) strKey += "F8";
                                    else if(charCode == 120) strKey += "F9";
                                    else if(charCode == 121) strKey += "F10";
                                    else if(charCode == 122) strKey += "F11";
                                    else if(charCode == 123) strKey += "F12";
                                    else if(charCode == 144) strKey += "num lock";
                                    else if(charCode == 145) strKey += "scroll lock";
                                    else if(charCode == 186) strKey += "Semi-colon (;)"; // semi-colon
                                    else if(charCode == 187) strKey += "Equal-sign (=)"; //
                                    else if(charCode == 188) strKey += "Comma (,)"; // comma
                                    else if(charCode == 189) strKey += "Dash (-)"; // dash
                                    else if(charCode == 190) strKey += "Period (.)";
                                    else if(charCode == 191) strKey += "Forward Slash (/)";
                                    else if(charCode == 192) strKey += "Grave Accent(`)";
                                    else if(charCode == 219) strKey += "Open Bracket ([)";
                                    else if(charCode == 220) strKey += "Back Slash (\\)";
                                    else if(charCode == 221) strKey += "Close Bracket (])";
                                    else if(charCode == 222) strKey += "Single Quote (')";
                                    else strKey += String.fromCharCode(charCode);

                                    blp.showMessage(blp.messages.keyPress.replace("<selector>", id).replace("<keys>", strCombKey + strKey).replace("<keysCode>", codeCombKey + charCode), 'keyPress');
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
            sha1: function(str){
                var rotate_left = function(e, t){ var n = e << t | e >>> 32 - t; return n };
                var cvt_hex = function(e){
                    var t = "";
                    var n;
                    var r;
                    for(n = 7; n >= 0; n--){
                        r = e >>> n * 4 & 15;
                        t += r.toString(16)
                    }
                    return t
                };
                var blockstart, i, j, W = new Array(80),
                    H0 = 1732584193,
                    H1 = 4023233417,
                    H2 = 2562383102,
                    H3 = 271733878,
                    H4 = 3285377520,
                    A, B, C, D, E, temp, str_len = str.length,
                    word_array = [];
                for(i = 0; i < str_len - 3; i += 4){
                    j = str.charCodeAt(i) << 24 | str.charCodeAt(i + 1) << 16 | str.charCodeAt(i + 2) << 8 | str.charCodeAt(i + 3);
                    word_array.push(j)
                }
                switch (str_len % 4){
                    case 0:
                        i = 2147483648;
                        break;
                    case 1:
                        i = str.charCodeAt(str_len - 1) << 24 | 8388608;
                        break;
                    case 2:
                        i = str.charCodeAt(str_len - 2) << 24 | str.charCodeAt(str_len - 1) << 16 | 32768;
                        break;
                    case 3:
                        i = str.charCodeAt(str_len - 3) << 24 | str.charCodeAt(str_len - 2) << 16 | str.charCodeAt(str_len - 1) << 8 | 128;
                        break
                }
                word_array.push(i);
                while (word_array.length % 16 != 14){ word_array.push(0) }
                word_array.push(str_len >>> 29);
                word_array.push(str_len << 3 & 4294967295);
                for(blockstart = 0; blockstart < word_array.length; blockstart += 16){
                    for(i = 0; i < 16; i++){ W[i] = word_array[blockstart + i] }
                    for(i = 16; i <= 79; i++){ W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1) }
                    A = H0;
                    B = H1;
                    C = H2;
                    D = H3;
                    E = H4;
                    for(i = 0; i <= 19; i++){
                        temp = rotate_left(A, 5) + (B & C | ~B & D) + E + W[i] + 1518500249 & 4294967295;
                        E = D;
                        D = C;
                        C = rotate_left(B, 30);
                        B = A;
                        A = temp
                    }
                    for(i = 20; i <= 39; i++){
                        temp = rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 1859775393 & 4294967295;
                        E = D;
                        D = C;
                        C = rotate_left(B, 30);
                        B = A;
                        A = temp
                    }
                    for(i = 40; i <= 59; i++){
                        temp = rotate_left(A, 5) + (B & C | B & D | C & D) + E + W[i] + 2400959708 & 4294967295;
                        E = D;
                        D = C;
                        C = rotate_left(B, 30);
                        B = A;
                        A = temp
                    }
                    for(i = 60; i <= 79; i++){
                        temp = rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 3395469782 & 4294967295;
                        E = D;
                        D = C;
                        C = rotate_left(B, 30);
                        B = A;
                        A = temp
                    }
                    H0 = H0 + A & 4294967295;
                    H1 = H1 + B & 4294967295;
                    H2 = H2 + C & 4294967295;
                    H3 = H3 + D & 4294967295;
                    H4 = H4 + E & 4294967295
                }
                temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
                return temp.toLowerCase();
            },
            inArray: function(needle, haystackArray){
                if(typeof needle == "undefined" || needle.indexOf("undefined") != -1 || needle == "#" || needle == ".") return -1;
                if(typeof haystackArray == "undefined" || haystackArray.length == 0) return -1;

                var len = haystackArray.length, str = needle.toString().toLowerCase();
                for(var i = 0; i < len; i++){
                    if(haystackArray[i].indexOf('.') != -1){
                        var a = haystackArray[i];
                        var arr = needle.split(" ");
                        for(var x = 0; x < arr.length; x++){
                            if(arr[x] == a){ return i; }
                        }

                    } else {
                        if(haystackArray[i].toLowerCase() == str){ return i; }
                    }
                }
                return -1;
            },
            showMessage: function(message, type){
                var woname = false;
                var blp = this;

                function object2String(message){
                    var output = '';
                    if(typeof(message) == 'object'){
                        for(var phrase in message){
                            var isArr = false;
                            try{ isArr = (Array.isArray(phrase) == true || parseFloat(phrase) >= 0) ? true : false; } catch (e){ isArr = false; }
                            if(typeof message[phrase] == 'string' && (message[phrase].indexOf("<pre>") != -1 || message[phrase].indexOf("</pre>") != -1)){
                                output += message[phrase];
                                woname = true;
                            } else {
                                output += '<b style="color:' + blp.colors.headerForeground + '">' + (woname == false ? (isArr == true ? (phrase + ' => [ ') : (phrase + ' : ')) : '') + '</b>';
                                woname = false;
                                output += object2String(message[phrase]) + (woname == false ? (isArr == true ? ' ] ' : '') : '') + (blp.target == 'console' ? '\n' : '<br/>');
                            }
                        }
                    } else {
                        output += message;
                        woname = false;
                    }

                    if(blp.enableHistory){
                        var path = blp.sha1(window.location.pathname);
                        if(typeof blp.history[path] == 'undefined'){ blp.history[path] = 'Debugger ' + blp.version + ' - Page loaded at ' + blp.getTime() + "\n---------------------------------------------------\n"; }

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
                    var msg = "[" + this.getTime() + "] " + object2String(message);

                    console.log("%c " + msg, "color: " + typeColor + "; background: #242424; ");

                } else {
                    var msg = "<span style='color:" + this.colors.normal + "'>[" + this.getTime() + "]</span> ";
                    msg += '<span style="color:' + typeColor + '">' + object2String(message) + '</span>';
                    try{ this.targetWindow.document.write(msg + this.messages.separator); } catch (e){}
                }
            }
        }
    }

    /**
    	 Simple DOM ready() detection in pure JS.
    	@version: 1.00
    	@author: Carl Danley.
    	@Copyright 2017-2022 Islavisual.
    	@Last update: 04/03/2019
    **/
    if(json.DOM){
        this.DOM = it.DOM = new function(){
            var IS_READY = false;
            var CALLBACKS = [];
            var SELF = this;

            SELF.ready = function(callback){
                //check to see if we're already finished
                if(IS_READY === true && typeof callback === 'function'){
                    callback();
                    return;
                }

                //else, add this callback to the queue
                CALLBACKS.push(callback);
            };
            var addEvent = function(event, obj, func){
                if(window.addEventListener){
                    obj.addEventListener(event, func, false);
                } else if(document.attachEvent){
                    obj.attachEvent('on' + event, func);
                }
            };
            var doScrollCheck = function(){
                //check to see if the callbacks have been fired already
                if(IS_READY === true){
                    return;
                }

                //now try the scrolling check
                try{
                    document.documentElement.doScroll('left');
                } catch (error){
                    setTimeout(doScrollCheck, 1);
                    return;
                }

                //there were no errors with the scroll check and the callbacks have not yet fired, so fire them now
                fireCallbacks();
            };
            var fireCallbacks = function(){
                //check to make sure these fallbacks have not been fired already
                if(IS_READY === true){
                    return;
                }

                //loop through the callbacks and fire each one
                var callback = false;
                for(var i = 0, len = CALLBACKS.length; i < len; i++){
                    callback = CALLBACKS[i];
                    if(typeof callback === 'function'){
                        callback();
                    }
                }

                //now set a flag to indicate that callbacks have already been fired
                IS_READY = true;
            };
            var listenForDocumentReady = function(){
                //check the document readystate
                if(document.readyState === 'complete'){
                    return fireCallbacks();
                }

                //begin binding events based on the current browser
                if(document.addEventListener){
                    addEvent('DOMContentLoaded', document, fireCallbacks);
                    addEvent('load', window, fireCallbacks);
                } else if(document.attachEvent){
                    addEvent('load', window, fireCallbacks);
                    addEvent('readystatechange', document, fireCallbacks);

                    //check for the scroll stuff
                    if(document.documentElement.doScroll && window.frameset === null){
                        doScrollCheck();
                    }
                }
            };

            //since we have the function declared, start listening
            listenForDocumentReady();
        };

        it.DOM.help = function(cfg){
            if(typeof cfg == "undefined") cfg = { help: '' };
            if(!cfg.hasOwnProperty("help")) cfg.help = '';

            if(typeof showHelper != "undefined") showHelper("DOM", cfg);
            else alert("Helper no disponible!")
            return;
        }
    }

    /**
    	 FlexBox Plugin
    	@version: 1.3
    	@author: Pablo E. Fernández (islavisual@gmail.com).
    	@Copyright 2017-2022 Islavisual.
    	@Last update: 08/03/2022
    **/
    if(json.Flexbox){
        this.Flexbox = it.flexbox = function(cfg){
            if(!cfg) cfg = {};

            cfg.factor = !cfg.hasOwnProperty('factor') ? it.flexbox.config.factor : cfg.factor;
            cfg.gap = !cfg.hasOwnProperty('gap') ? it.flexbox.config.gap : cfg.gap;
            cfg.resolutions = !cfg.hasOwnProperty('resolutions') ? it.flexbox.config.resolutions : cfg.resolutions;
            cfg.stylesheet = !cfg.hasOwnProperty('stylesheet') ? it.flexbox.config.stylesheet : cfg.stylesheet;

            // Añadimos las clases CSS genéricas
            if(!cfg.stylesheet){
                it.addCSSRule('', '.it-flexbox *', 'box-sizing: border-box;');
                it.addCSSRule('', '.it-flexbox', '--gap: ' + cfg.gap + '; display: block; flex-direction: column;');
                it.addCSSRule('', '.it-flexbox > .row', 'display: flex; flex-flow: row wrap; flex-direction: row; width: 100%; position: relative;');
                it.addCSSRule('', '.it-flexbox .col, .it-flexbox [class*="col-"]', 'display: flex; flex-flow: column wrap; justify-content: left; align-items: flex-start; flex: none; margin: 0; padding: 0;');
                it.addCSSRule('', '.it-flexbox .col + .col, .it-flexbox [class*="col-"] + [class*="col-"]', 'padding: 0 0 0 var(--gap);');
                it.addCSSRule('', '.it-flexbox .row .row', 'display: flex; flex-flow: row wrap; width: 100%; ');
            }

            // Recuperamos todos los nombres de resoluciones
            var names = [];
            Object.keys(it.flexbox.config.resolutions).forEach(function(key){
                names.push(it.flexbox.config.resolutions[key].name)
            });

            // Recuperamos todas las clases de loa elementos a nivel de columna de los flexbox
            var items = document.querySelectorAll('.it-flexbox .row > *');
            Array.prototype.slice.call(items).forEach(function(target){
                Array.prototype.slice.call(target.classList).forEach(function(cls){
                    var val = Math.round(parseFloat(cls.replace(/[^\.0-9]/ig, '').trim()) * cfg.factor * 10000) / 10000;
                        val = val.toFixed(4);

                    // Si el valor es igual al valor entero, eliminamos los decimales
                    if(val == parseInt(val)){ val = parseInt(val) }
                    
                    // Si el valor no es NaN, cambiamos la clase del elemento
                    // para asegurar la asignación
                    if(!isNaN(val)){
                        target.classList.replace(cls, cls.replace(/[0-9\.]/g, '')+val)
                        cls = cls.replace(/[0-9\.]/g, '')+val;
                    }

                    var clss = cls.replace(/\./g, '\\.').trim();

                    // Recorremos las diferentes resoluciones para 
                    // añadir la definición de la clase CSS si no existe 
                    // y en su media-query cuando proceda
                    for(var x = 0; x < it.flexbox.config.resolutions.length; x++){
                        var cs = it.flexbox.config.resolutions[x], name = cs.name;

                        it.addCSSRule('', '.it-flexbox .row .' + name + '-show', 'display: none !important;');

                        if(!cs.hasOwnProperty("media")){
                            cs.media = '';
                        }

                        // Si la clase CSS es específica de una resolución la añadimos a la definición de su media-query
                        if(cls.indexOf('-show') == -1 && cls.indexOf('-hide') == -1 && cls.indexOf(name) != -1 && cs.media.indexOf('.it-flexbox .row > .' + clss) == -1){
                            if(cls.indexOf('offset') != -1){
                                cs.media += '.it-flexbox .row > .' + clss + '{ margin-left: calc(' + val + '% + var(--gap)) }';

                            } else if(cls.indexOf('order') != -1){
                                cs.media += '.it-flexbox .row > .' + clss + '{order:' + val + ';}';

                            } else {
                                cs.media += '.it-flexbox .row > .' + clss + '{' + ('flex-basis: ' + val + '%; max-width: ' + val + '%;') + '}';
                            }
                        }
                    }

                    // Si la clase CSS NO es específica de una resolución, la añadimos directamente
                    if(cls.indexOf('col') != -1 && val > 0 && !cfg.stylesheet){
                        // Si es de tipo COL
                        it.addCSSRule('', '.it-flexbox .row > .' + clss, 'flex-basis: ' + val + '%; max-width: ' + val + '%;');

                    } else if(names.indexOf(cls.substr(0, 2)) == -1 && cls.indexOf('offset') != -1 && val > 0 && !cfg.stylesheet){
                        // Si es de tipo OFFSET
                        it.addCSSRule('', '.it-flexbox .row > .' + clss, 'margin-left: calc(' + val + '% + var(--gap))');

                    } else if(names.indexOf(cls.substr(0, 2)) == -1 && cls.indexOf('order') != -1 && val > 0 && !cfg.stylesheet){
                        // Si es de tipo ORDER
                        it.addCSSRule('', '.it-flexbox .row > .' + clss, 'order:' + val);

                    }
                });

                var cols = Array.prototype.slice.call(target.parentElement.children);
                var rows = Array.prototype.slice.call(target.parentElement.parentElement.children);
                
                target.setAttribute("role", "gridcell");
                target.setAttribute("aria-colindex", cols.indexOf(target));
                target.parentElement.setAttribute("role", "row");
                target.parentElement.setAttribute("aria-rowindex", rows.indexOf(target.parentElement));
            });

            var items = document.querySelectorAll('.it-flexbox');
            Array.prototype.slice.call(items).forEach(function(target){
                target.setAttribute("role", "grid");
                target.setAttribute("aria-rowcount", target.children.length);
            });

            it.flexbox.config.resolutions.sort(function(a, b){
                return a.minWidth - b.minWidth;
            })

            // Añadimos las medias-queries
            for(var x = 0; x < it.flexbox.config.resolutions.length; x++){
                var cs = it.flexbox.config.resolutions[x];
                var csmax = it.flexbox.config.resolutions[x+1];

                if(!cfg.stylesheet){
                    it.addCSSRule('', '@media all and (min-width: ' + (cs.minWidth) + 'px)', cs.media);

                    cs.specialMedia = '.it-flexbox .row .' + cs.name + '-hide { display: none !important; }';
                    cs.specialMedia += '.it-flexbox .row .' + cs.name + '-show { display: block !important; }'
                    
                    if(csmax != undefined){
                        it.addCSSRule('', '@media all and (min-width: ' + (cs.minWidth) + 'px) and (max-width: ' + (csmax.minWidth-1) + 'px)', cs.specialMedia);
                    } else{
                        it.addCSSRule('', '@media all and (min-width: ' + (cs.minWidth) + 'px)', cs.specialMedia);
                    }
                }
            }
        }

        it.flexbox.config = {
            gap: '5px',
            padding: '5px',
            factor: 1,
            resolutions: [
               { name: 'xs', minWidth: 0 },
               { name: 'sm', minWidth: 640 },
               { name: 'md', minWidth: 1024 },
               { name: 'lg', minWidth: 1366 },
               { name: 'xl', minWidth: 1680 },
            ]
        };
    }

    /**
    	 Get Browser Plugin
    	@version: 1.1
    	@author: Pablo E. Fernández (islavisual@gmail.com).
    	@Copyright 2017-2022 Islavisual.
    	@Last update: 05/03/2019
    **/
    if(json.GetBrowser){
        this.GetBrowser = it.getBrowser = function(cfg){
            if(typeof cfg == "undefined") cfg = {};

            if((typeof cfg == "string" && cfg == "help") || cfg.hasOwnProperty("help")){
                if(typeof showHelper != "undefined") showHelper("GetBrowser", cfg);
                else alert("Helper not available!")
                return;
            }

            var e, r = navigator.userAgent, t = r.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            /trident/i.test(t[1]) && (e = /\brv[ :]+(\d+)/g.exec(r) || [], t[1] = "Internet Explorer", t[2] = e[1]), "Chrome" === t[1] && (e = r.match(/\b(OPR|Edge)\/(\d+)/), t[1] = null != e ? e.slice(1).join(" ").replace("OPR", "Opera") : "Chrome"), t = t[2] ? [t[1], t[2]] : [navigator.appName, navigator.appVersion, "-?"], null != (e = r.match(/version\/(\d+)/i)) && t.splice(1, 1, e[1]);
            var o = /firefox/.test(navigator.userAgent.toLowerCase()) && !/webkit    /.test(navigator.userAgent.toLowerCase()),
                a = /webkit/.test(navigator.userAgent.toLowerCase()),
                s = /opera/.test(navigator.userAgent.toLowerCase()),
                n = /edge/.test(navigator.userAgent.toLowerCase()) || /msie/.test(navigator.userAgent.toLowerCase()) || /msie (\d+\.\d+);/.test(navigator.userAgent.toLowerCase()) || /trident.*rv[ :]*(\d+\.\d+)/.test(navigator.userAgent.toLowerCase()),
                i = n ? "" : a ? "-webkit-" : o ? "-moz-" : "";
            return{ name: t[0], version: t[1], firefox: o, opera: s, msie: n, chrome: a, prefix: i }
        };
    }

    /**
    	 Get parameter from url
    	@version: 1.1
    	@author: Pablo E. Fernández (islavisual@gmail.com).
    	@Copyright 2017-2022 Islavisual.
    	@Last update: 07/04/2019
    **/
    if(json.GetParam){
        this.GetParam = it.getParam = function(cfg){
            if(typeof cfg == "undefined") cfg = {};

            if((typeof cfg == "string" && cfg == "help") || cfg.hasOwnProperty("help")){
                if(typeof showHelper != "undefined") showHelper("GetParam", cfg);
                else alert("Helper not available!")
                return;
            }

            var vars = {};
            var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value){
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
    	@Copyright 2017-2022 Islavisual. 																	
    	@Last update: 27/02/2019																			
    **/
    if(json.HttpRequest){
        this.HttpRequest = it.httpRequest = function(cfg){
            if((typeof cfg == "string" && cfg == "help") || cfg.hasOwnProperty("help")){
                if(typeof showHelper != "undefined") showHelper("HttpRequest", cfg);
                else alert("Helper not available!")
                return;
            }

            // If configuration object is invalid
            if(!cfg || !cfg.hasOwnProperty('url')){ alert("You need set one url!.\nPlease, see the help with the HttpRequest('help');"); return; }
            if(!cfg || !cfg.hasOwnProperty('callback')){ alert("you need set one callback function!.\nPlease, see the help with the HttpRequest('help');"); return false; }

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
                params: !cfg.hasOwnProperty('parameters') ?{} : cfg.parameters,
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
            for(var x = 0; x < arrkeys.length; x++){
                paramsStr += arrkeys[x] + "=" + opt.params[arrkeys[x]] + '&';
            }

            paramsStr = paramsStr.substr(0, paramsStr.length - 1)

            // Make request
            var http = new XMLHttpRequest();
            try{
                http.responseType = opt.responseType;
                http.timeout = opt.timeout
            } catch (e){}

            http.onloadstart = function(e){ opt.onLoadStart ? opt.onLoadStart(e) : (opt.debug ? console.log("onLoadStart", e) : null); }
            http.onload = function(e){ opt.onLoad ? opt.onLoad(e) : (opt.debug ? console.log("onLoad", e) : null); }
            http.onprogress = function(e){ opt.onProgress ? opt.onProgress(e) : (opt.debug ? console.log("onProgress", e) : null); }
            http.onloadend = function(e){ opt.onLoadEnd ? opt.onLoadEnd(e) : (opt.debug ? console.log("onLoadEnd", e) : null); }
            http.ontimeout = function(e){ opt.onTimeout ? opt.onTimeout(e) : (opt.debug ? console.log("onTimeout", e) : null); }
            http.onerror = function(e){ opt.onError ? opt.onError(e) : (opt.debug ? console.log("onError", e) : null); }
            http.onabort = function(e){ opt.onAbort ? opt.onAbort(e) : (opt.debug ? console.log("onAbort", e) : null); }

            // When request is ready...
            http.onreadystatechange = function(){
                if(http.readyState == 4){
                    if(http.status == 200){
                        if(opt.returnFullResponse)
                            opt.callback(http);
                        else
                        if(it.browser == "IE" && opt.responseType == "json") setTimeout(function(){ opt.callback(JSON.parse(http.response)); }, 150);
                        else opt.callback(http.response);
                    }
                }
            }

            if(opt.method.toUpperCase() == "GET"){
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
    	@version: 1.3.0
    	@author: Pablo E. Fernández (islavisual@gmail.com).
    	@Copyright 2017-2022 Islavisual.
    	@Last update: 27/05/2020
    **/
    if(json.Include){
        this.Include = it.include = function(cfg){
            // Default values to cfg
            if(typeof cfg == "undefined" || cfg == null) cfg = {};

            if(cfg.hasOwnProperty('attribute') && cfg.attribute.trim() != ""){
                this.targets = document.querySelectorAll('[' + cfg.attribute.trim() + ']')
            }

            if((typeof cfg == "string" && cfg == "help") || cfg.hasOwnProperty("help")){
                if(typeof showHelper != "undefined") showHelper("Include", cfg);
                else alert("Helper not available!")
                return;
            }

            if(!this.targets){
                if(!cfg.hasOwnProperty('target')){ alert("You need set an object like target to execute the include!. Please, see the help with the Include('help');"); return false; }
            }

            // Assign options 
            var opt = {
                add: !cfg.hasOwnProperty('add') ? false : cfg.add,
                attribute: !cfg.hasOwnProperty('attribute') ? null : cfg.attribute,
                callback: !cfg.hasOwnProperty('callback') ? null : cfg.callback,
                data: !cfg.hasOwnProperty('data') ? '' : cfg.data,
                file: !cfg.hasOwnProperty('file') ? '' : cfg.file,
                target: this.targets[0],
            }

            // If the request is data-include
            if(opt.attribute){
                dataInclude(opt.attribute);
                return;

            } else if(opt.attribute && opt.attribute == ""){
                alert("The 'attribute' parameter can not be empty!.");
                return;
            }

            Array.prototype.slice.call(this.targets).forEach(function(target){
                opt.target = target;

                // If configuration object is invalid
                if(!opt.hasOwnProperty('data') && !opt.hasOwnProperty('file')){ alert("You need set a string 'data' or 'file' parameter!. Please, see the help with the Include('help');"); return false; }

                if(opt.file){
                    getData(opt.target, opt.file, false);
                    return;

                } else {
                    if(!opt.add){
                        opt.target.innerHTML = opt.data;
                    } else {
                        opt.target.innerHTML += opt.data;
                    }

                    opt.target.querySelector("script") ? execute(opt.target) : '';

                    if(opt.callback) opt.callback();
                }
            });

            function execute(trg){
                setTimeout(function(){
                    try{ window.eval(trg.querySelector("script").innerHTML); } catch (e){}
                }, 250);
            }

            function getData(trg, file, dIncFlag){
                var xhttp = new XMLHttpRequest(), dIncFlag = !dIncFlag ? false : true;
                xhttp.onreadystatechange = function(){
                    if(this.readyState == 4){
                        if(this.status == 200){
                            if(!opt.add){
                                trg.innerHTML = this.responseText;
                            } else {
                                trg.innerHTML += this.responseText;
                            }

                            trg.querySelector("script") ? execute(trg) : '';

                            if(opt.callback && !dIncFlag) opt.callback();
                        }
                        if(this.status == 404){ trg.innerHTML = "Page not found."; }

                        if(dIncFlag){
                            trg.removeAttribute(opt.attribute);
                            dataInclude(opt.attribute)

                            if(opt.callback && document.querySelectorAll("[" + opt.attribute + "]").length == 0){
                                opt.callback();
                            }
                        }
                    }
                }

                xhttp.open("GET", file, true);
                xhttp.send();

                return;
            }

            function dataInclude(attr){
                var trg, file;

                var trg = document.querySelector("[" + attr + "]");
                if(trg) file = trg.getAttribute(attr);
                if(file){
                    getData(trg, file, true);

                    return;
                }
            }
        }

        this.Include.includedFiles = false;
    }

    /**
    	 IntelliForm functionality
    	@version: 1.00
    	@author: Pablo E. Fernández (islavisual@gmail.com).
    	@Copyright 2017-2022 Islavisual.
    	@Last update: 19/03/2019
    **/
    if(json.IntelliForm){
        this.IntelliForm = it.intelliForm = {
            sequenceList: [],
            sequence: [],
            undo:{},
            redo:{},
            target: [],
            _startAt: -1,
            version: '1.0',
            help: function(cfg){
                if(typeof cfg == "undefined") cfg = { help: '' };
                if(!cfg.hasOwnProperty("help")) cfg.help = '';

                if(typeof showHelper != "undefined") showHelper("IntelliForm", cfg);
                else alert("Helper not available!")
                return;
            },
            addElements: function(cfg){
                // If configuration object is invalid
                if(!cfg.hasOwnProperty('data') && !cfg.hasOwnProperty('file')){ alert("You need set a JSON 'data' parameter!. Please, see the help with the IntelliForm.help({help: 'send'});"); return false; }
                if(!cfg.hasOwnProperty('target')){ alert("You need set an object like target to insert the lements!. Please, see the help with the IntelliForm.help({help: 'send'});"); return false; }

                for(var x = 0; x < cfg.data.length; x++){
                    var item = cfg.data[x], aux, proccessValidation = false;
                    for(var key in item){
                        if(key == "tag"){
                            aux = document.createElement(item[key]);
                        } else {
                            if(key == "dataset"){
                                for(var di = 0; di < item[key].length; di++){
                                    aux.setAttribute("data-" + item[key][di].name, item[key][di].value);
                                }
                            } else {
                                if(typeof item[key] == "function"){
                                    aux.addEventListener(item[key], item[key]);

                                } else if(key == "validate"){
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
                try{
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
                } catch (e){}
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
                                if((e.which == 121 || e.which == 89) && e.ctrlKey){
                                    // Redo
                                    IntelliForm.historyForward(e.target.id);
                                    return false;

                                } else if((e.which == 122 || e.which == 90) && e.ctrlKey){
                                    // Undo
                                    IntelliForm.historyBack(e.target.id);
                                    return false;
                                } else {
                                    und.addHistoryBack(e.target.id, e.target.value);
                                }
                            });

                            items[i].addEventListener("change", function(e){
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
                var st = iform._startAt == -1 ? (iform._startAt = new Date().getTime()) : iform._startAt;
                var ts = new Date().getTime() - st;
                var val = typeof trg.value != "undefined" ? trg.value : trg.innerHTML;
                val = val == "" ? '""' : (!isNaN(val) ? parseFloat(val) : ('"' + val + '"'));

                // Get IDs
                var dID = '';
                if(evt != "scroll"){
                    try{
                        dID = typeof trg.dataset.id != "undefined" ? trg.dataset.id : '';
                        dID = dID.replace("#", '');
                    } catch (e){}
                } else {
                    id = document;
                }

                // Trigger change event id data-id is set
                if(dID != ""){
                    var EV = new Event('change',{ 'bubbles': true, 'cancelable': true });
                    document.getElementById(dID).dispatchEvent(EV);
                }

                // If id is empty dont make anything
                if(id == "" || (evt == "click" && tagName == 'input')) return;

                // If input is checkbox or radio, the value is checked
                if(id != document && tagName == "input" && (trg.getAttribute("type") == "radio" || trg.getAttribute("type") == "checkbox")){
                    val = trg.checked;
                } else if(id == document){ id = "document"; }

                // Find the old element
                var json = {}, found = false, lst = iform.sequence.length != 0 ? iform.sequence[iform.sequence.length - 1] :{};
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
                    this.sequence = [{ ts: 0, id: "document", event: "scroll", top: window.pageYOffset, left: window.pageXOffset, on: window.navigator.userAgent }];
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
                events.split(' ').forEach(function(event){
                    var items = document.querySelectorAll(elmnts);
                    for(var its = 0; its < items.length; its++){
                        var elm = items[its];

                        // Ignore combinations of element and event
                        if(elm.tagName.toLowerCase() == "select" && event != "change") continue;
                        else if(elm.tagName.toLowerCase() == "input" && (elm.type != "radio" || elm.type == "checkbox") && event == "click") continue;
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
                events.split(' ').forEach(function(event){
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
                        this._updateSequence({ sequence: s[i] });
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

                function timer(){
                    if(count <= 0){ clearInterval(counter); return; }
                    count--;
                    displayCount(count);
                }

                function displayCount(count){
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
                        if(aux != null){
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
                        if(aux != null){
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
                            } else if(item.keyCode == 8){
                                el.value = el.value.substr(0, el.value.length - 1);
                            }
                            if(!ignore){
                                var evt = new KeyboardEvent('keydown',{ 'keyCode': item.keyCode, 'which': item.keyCode });
                                el.dispatchEvent(evt);
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
                            var EV = new Event(item.event,{ 'bubbles': true, 'cancelable': true });
                            el.dispatchEvent(EV);

                            // If item have data-id
                            try{
                                dID = typeof trg.dataset.id != "undefined" ? trg.dataset.id : '';
                                dID = dID.replace("#", '');

                                var EV = new Event('change',{ 'bubbles': true, 'cancelable': true });
                                document.getElementById(dID).dispatchEvent(EV);
                            } catch (e){}
                        }

                        if(x == cfg.seq.length - 1){
                            document.getElementById("ov3rl4y").remove();
                            _blur(el);
                            console.log("sequence ended!");
                        }
                    }.bind(null, item, x), item.ts / cfg.velocity);
                }
            },
            send: function(cfg){
                // If configuration object is invalid
                if(!cfg.hasOwnProperty('url')){ alert("The 'url' parameter has not been supplied!.\nPlease, see the help with the IntelliForm.help({help: 'send'});"); return; }
                if(!cfg.hasOwnProperty('params')){ alert("The 'params' parameter has not been supplied!.\nPlease, see the help with the IntelliForm.help({help: 'send'});"); return; }

                // Create form
                var f = document.createElement("form");
                f.setAttribute('method', "post");
                f.setAttribute('action', cfg.url);
                f.style.display = "none";

                for(var i = 0; i < cfg.params.length; i++){
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
            addHistoryBack: function(id, value){
                var path = this.sha1(window.location.pathname);

                if(typeof this.undo[path] == 'undefined'){ this.undo[path] = {}; }
                try{
                    if(this.undo[path][id][this.undo[path][id].length - 1] != value) this.undo[path][id][this.undo[path][id].length] = value;
                } catch (e){
                    this.undo[path][id] = new Array();
                    this.undo[path][id][0] = value;
                }
                sessionStorage.setItem('iFormUndo', JSON.stringify(this.undo));
            },
            historyBack: function(id){
                try{
                    var path = this.sha1(window.location.pathname);
                    var value = this.undo[path][id].pop();

                    if(document.getElementById(id).value == value) var value = this.undo[path][id].pop();

                    if(typeof value !== 'undefined' && value != null && value != ""){
                        if(this.undo[path][id].length == 0) delete this.undo[path][id];
                        sessionStorage.setItem('iFormUndo', JSON.stringify(this.undo));
                        this.addHistoryForward(id, document.getElementById(id).value);
                        document.getElementById(id).value = value;

                        var event = new Event('change',{ 'bubbles': true, 'cancelable': true });
                        e.target.dispatchEvent(event);

                        return value;
                    }

                    return null;
                } catch (e){}
            },
            addHistoryForward: function(id, value){
                var path = this.sha1(window.location.pathname);

                if(typeof this.redo[path] == 'undefined'){ this.redo[path] = {}; }
                try{
                    if(this.redo[path][id][this.redo[path][id].length - 1] != value) this.redo[path][id][this.redo[path][id].length] = value;
                } catch (e){
                    this.redo[path][id] = new Array();
                    this.redo[path][id][0] = value;
                }
                sessionStorage.setItem('iFormUndo', JSON.stringify(this.redo));
            },
            historyForward: function(id){
                try{
                    var path = this.sha1(window.location.pathname);
                    var value = this.redo[path][id].pop();
                    if(document.getElementById(id).value == value) var value = this.undo[path][id].pop();

                    if(typeof value != 'undefined' && value != null && value != ""){
                        if(this.redo[path][id].length == 0) delete this.redo[path][id];
                        sessionStorage.setItem('iFormUndo', JSON.stringify(this.redo));
                        this.addHistoryBack(id, document.getElementById(id).value);
                        document.getElementById(id).value = value;

                        var event = new Event('change',{ 'bubbles': true, 'cancelable': true });
                        e.target.dispatchEvent(event);

                        return value;
                    }

                    return null;
                } catch (e){}
            },
            sha1: function(str){
                var rotate_left = function(e, t){ var n = e << t | e >>> 32 - t; return n };
                var cvt_hex = function(e){
                    var t = "";
                    var n;
                    var r;
                    for(n = 7; n >= 0; n--){
                        r = e >>> n * 4 & 15;
                        t += r.toString(16)
                    }
                    return t
                };
                var blockstart, i, j, W = new Array(80),
                    H0 = 1732584193,
                    H1 = 4023233417,
                    H2 = 2562383102,
                    H3 = 271733878,
                    H4 = 3285377520,
                    A, B, C, D, E, temp, str_len = str.length,
                    word_array = [];
                for(i = 0; i < str_len - 3; i += 4){
                    j = str.charCodeAt(i) << 24 | str.charCodeAt(i + 1) << 16 | str.charCodeAt(i + 2) << 8 | str.charCodeAt(i + 3);
                    word_array.push(j)
                }
                switch (str_len % 4){
                    case 0:
                        i = 2147483648;
                        break;
                    case 1:
                        i = str.charCodeAt(str_len - 1) << 24 | 8388608;
                        break;
                    case 2:
                        i = str.charCodeAt(str_len - 2) << 24 | str.charCodeAt(str_len - 1) << 16 | 32768;
                        break;
                    case 3:
                        i = str.charCodeAt(str_len - 3) << 24 | str.charCodeAt(str_len - 2) << 16 | str.charCodeAt(str_len - 1) << 8 | 128;
                        break
                }
                word_array.push(i);
                while (word_array.length % 16 != 14){ word_array.push(0) }
                word_array.push(str_len >>> 29);
                word_array.push(str_len << 3 & 4294967295);
                for(blockstart = 0; blockstart < word_array.length; blockstart += 16){
                    for(i = 0; i < 16; i++){ W[i] = word_array[blockstart + i] }
                    for(i = 16; i <= 79; i++){ W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1) }
                    A = H0;
                    B = H1;
                    C = H2;
                    D = H3;
                    E = H4;
                    for(i = 0; i <= 19; i++){
                        temp = rotate_left(A, 5) + (B & C | ~B & D) + E + W[i] + 1518500249 & 4294967295;
                        E = D;
                        D = C;
                        C = rotate_left(B, 30);
                        B = A;
                        A = temp
                    }
                    for(i = 20; i <= 39; i++){
                        temp = rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 1859775393 & 4294967295;
                        E = D;
                        D = C;
                        C = rotate_left(B, 30);
                        B = A;
                        A = temp
                    }
                    for(i = 40; i <= 59; i++){
                        temp = rotate_left(A, 5) + (B & C | B & D | C & D) + E + W[i] + 2400959708 & 4294967295;
                        E = D;
                        D = C;
                        C = rotate_left(B, 30);
                        B = A;
                        A = temp
                    }
                    for(i = 60; i <= 79; i++){
                        temp = rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 3395469782 & 4294967295;
                        E = D;
                        D = C;
                        C = rotate_left(B, 30);
                        B = A;
                        A = temp
                    }
                    H0 = H0 + A & 4294967295;
                    H1 = H1 + B & 4294967295;
                    H2 = H2 + C & 4294967295;
                    H3 = H3 + D & 4294967295;
                    H4 = H4 + E & 4294967295
                }
                temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
                return temp.toLowerCase();
            },
        }
    }

    /**
    	 Function to detect if a device is mobile or tablet.
    	@version: 1.00
    	@author: Pablo E. Fernández (islavisual@gmail.com).
    	@Copyright 2017-2022 Islavisual.
    	@Last update: 30/07/2019
    **/
    if(json.IsMobile){
        this.IsMobile = it.isMobile = function(cfg){
            if(typeof cfg == "undefined") cfg = {};

            if((typeof cfg == "string" && cfg == "help") || cfg.hasOwnProperty("help")){
                if(typeof showHelper != "undefined") showHelper("IsMobile", cfg);
                else alert("Helper not available!")
                return;
            }

            // Test touch event
            var te;
            try{
                te = document.createEvent("TouchEvent");
                if(typeof te != "undefined") return true;
            } catch (e){}

            // Test the operative system
            var devices = ["webOS", "iPhone", "iPad", "iPod", "BlackBerry", "IEMobile", "Opera Mini"];
            devices = new RegExp(devices.join("|"), 'i');
            if(devices.test(navigator.userAgent)) return true;

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
    	@Copyright 2017-2022 Islavisual.
    	@Last update: 31/03/2019
    **/

    if(json.Language){
        this.Language = it.language = {
            version: '1.0',
            translations:{},
            selectedLang: '',
            availableLangs: [],
            help: function(cfg){
                if(typeof cfg == "undefined") cfg = { help: '' };
                if(!cfg.hasOwnProperty("help")) cfg.help = '';

                if(typeof showHelper != "undefined") showHelper("Language", cfg);
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
    	@version: 1.1.2																					
    	@author: Pablo E. Fernández (islavisual@gmail.com).
    	@Copyright 2017-2022 Islavisual.
    	@Last update: 21/06/2020
    **/
    if(json.Mask){
        this.Mask = it.mask = function(cfg){
            if(!cfg || cfg == ""){ alert("Mask not defined!"); return false; }

            this.targets = it.checkTargets(this);

            Array.prototype.slice.call(this.targets).forEach(function(target){
                it.mask.config[target.id] = { target: target, mask: cfg }
            });

            if(arguments.length == 0){
                alert("No se ha definido la máscara")
                return;
            }

            for(var x = 0; x < this.targets.length; x++){
                key = this.targets[x].id;

                // Set attributes
                cfg = it.mask.config[key];

                cfg.target.setAttribute("placeholder", cfg.mask);
                cfg.target.setAttribute("maxlength", cfg.mask.length);
                cfg.target.setAttribute("minlength", cfg.mask.length);

                cfg.target.type = "text";

                // Set paste event
                cfg.target.addEventListener('paste', function(e){
                    var EV = e;
                    setTimeout(function(){ it.mask.fullFormat(EV) }, 150);
                });

                // Set keyborad events
                cfg.target.addEventListener('keydown', function(e){
                    return it.mask._customEvent(e, it.mask.config[e.target.id]);
                });
            }

            this.so = "mask";

            return this.targets[0];
        }

        it.mask.version = '1.1';
        it.mask.config = [];
        it.mask.help = function(cfg){
            if(typeof cfg == "undefined") cfg = { help: '' };
            if(!cfg.hasOwnProperty("help")) cfg.help = '';

            if(typeof showHelper != "undefined") showHelper("Mask", cfg);
            else alert("Helper not available!")
            return;
        }

        it.mask.getPositionCursor = function(e){
            var p = 0, trg = e.target;

            if(document.selection){
                trg.focus();

                var s = document.selection.createRange();
                s.moveStart('character', -trg.value.length);

                p = s.text.length;

            } else if(trg.selectionStart || trg.selectionStart == '0'){
                p = trg.selectionDirection == 'backward' ? trg.selectionStart : trg.selectionEnd;
            }

            return p;
        }

        it.mask._customEvent = function(e, config){
            var kc = e.keyCode, k = e.key[0], aok;

            // Check if ignore keys
            var _ignoreKeys = [8, 9, 13, 16, 17, 18, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123];
            if(_ignoreKeys.indexOf(kc) != -1){ return false; }
            if(e.ctrlKey) return true;

            // Check if char coincidence with mask
            var m = config.mask.charAt(this.getPositionCursor(e));
            if(config.target.selectionEnd - config.target.selectionStart == 0 &&
                !/[9ADMYHIS#]/g.test(m) &&
                config.target.value.substr(config.target.selectionStart, 1) != m){
                e.target.value += m;
                m = config.mask.charAt(this.getPositionCursor(e));
            }

            var isSep = config.mask.replace(/[9ADMYHIS#]/mg, '').indexOf(k) != -1;
            if(isSep){

            }

            aok = ('9DMYHIS'.indexOf(m) != -1 ? /\d/ : (m == 'A' ? /[a-zA-Z]/ : /./)).test(k);

            var reg, tmp = m, mg = true;
            switch (m){
                case "D":
                    reg = it.mask.reDay;
                    break;
                case "M":
                    reg = it.mask.reMonth;
                    break;
                case "Y":
                    reg = it.mask.reYear;
                    break;
                case "H":
                    reg = it.mask.reHour;
                    break;
                case "I":
                    reg = it.mask.minute;
                    break;
                case "S":
                    reg = it.mask.reSecond;
                    break;
                case "#":
                    reg = it.mask.reAny;
                    break;
                default:
                    mg = false;
            }

            if(mg){
                if('DMYHIS'.indexOf(m) != -1) tmp = m + m;
                if(config.mask.substr(config.mask.indexOf(m) + 2, 1) == "Y") tmp = "YYYY";

                aok = aok ? this._check(tmp, reg, e) : false;
            }

            if(aok){
                if(e.type == "paste"){ e.target.value += k; }
            } else {
                return this._rollbackEvent(e);
            }

            return aok;
        }

        it.mask.fullFormat = function(e){
            var cfg = this.config[e.target.id];
            var v = e.target.value;
            e.target.value = "";

            for(var x = 0; x < v.length; x++){
                if(cfg.mask.replace(/[9ADMYHIS]/g, '').indexOf(v[x]) != -1) continue;

                // Modify event
                var e1 = e;
                e1.keyCode = v[x].charCodeAt(0);
                e1.which = v[x].charCodeAt(0);
                e1.key = v[x];
                e1.ctrlKey = false;
                e1.altKey = false;
                e1.shiftKey = false;

                // Trigger custom event
                var st = this._customEvent(e1, cfg);
                if(!st) break;
            }
        }

        it.mask._check = function(f, reg, e){
            var cfg = this.config[e.target.id];
            var p = cfg.mask.indexOf(f)
            var pmax = cfg.mask.indexOf(f) + cfg.mask.substr(cfg.mask.indexOf(f), 4).length;
            var b = true;
            var v = e.target.value, k = e.key[0];
            var ss = e.target.selectionStart, se = e.target.selectionEnd;

            if(f == 'YYYY' && ss == pmax - 1){
                var yy = v.substr(p, 4) + k
                var dd = (v + k).substr(cfg.mask.indexOf('DD'), 2);
                var mm = (v + k).substr(cfg.mask.indexOf('MM'), 2);

                var isleap = (yy % 100 === 0) ? (yy % 400 === 0) : (yy % 4 === 0);
                if((mm == 2 && dd > 29) || (mm == 2 && dd == 29 && !isleap)) b = false;

            } else if(f == 'YY' && ss == pmax - 1){
                var yy = 20 + v.substr(p, 2) + k
                var dd = (v + k).substr(cfg.mask.indexOf('DD'), 2);
                var mm = (v + k).substr(cfg.mask.indexOf('MM'), 2);

                var isleap = (yy % 100 === 0) ? (yy % 400 === 0) : (yy % 4 === 0);
                if((mm == 2 && dd > 29) || (mm == 2 && dd == 29 && !isleap)) b = false;

            } else if(f == 'MM' && ss == p + 1){
                var dd = (v + k).substr(cfg.mask.indexOf('DD'), 2);
                var mm = (v + k).substr(cfg.mask.indexOf('MM'), 2);
                var monthdays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
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

                var aux = e.target.value.substring(0, 4) + k;
                if(f == "II" && aux.length == e.target.maxLength){
                    var msk = cfg.mask.replace("HH", it.mask.reHour).replace("II", it.mask.reMinute).replace("SS", it.mask.reSecond).replace(/\//g, '');
                    b = new RegExp("^" + msk + "$").test(aux);
                }
            }

            return b;
        }

        it.mask.reDay = /(0[1-9]|1[0-9]|2[0-9]|3[0-1])/;
        it.mask.reMonth = /(0[1-9]|1[0-2])/
        it.mask.reYear = /\d{4}/
        it.mask.reHour = /(0[0-9]|1[0-9]|2[0-3])/;
        it.mask.reMinute = /(0[0-9]|[1-5][0-9])/;
        it.mask.reSecond = it.mask.Minute;
        it.mask.reAny = /./;

        it.mask._rollbackEvent = function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
    }

    /**
    	N-State
    	@version: 2.0.3
    	@author: Pablo E. Fernández (islavisual@gmail.com).
    	@Copyright 2017-2022 Islavisual.
    	@Last update: 12/01/2022
    **/
    if(json.Slider){
        this.Slider = it.slider = function(cfg){
            for(var xTrg = 0; xTrg < this.targets.length; xTrg++){
                cfg.target = this.targets[xTrg].id;

                // If it.target has value, set to cfg object
                if(!cfg.hasOwnProperty('target') && this.targets) cfg.target = this.targets[0].id;
                if(!cfg.hasOwnProperty('stylesheet')) cfg.stylesheet = false;

                if(document.getElementById(cfg.target) == null){ alert("The element with ID '" + cfg.target + "' not exists!"); return false; }

                // Configure execution
                this.target = document.getElementById(cfg.target);
                this.slider.config.id = cfg.target;
                this.slider.config.type = cfg.hasOwnProperty('type') ? cfg.type : 'switch';
                this.slider.config.style = cfg.hasOwnProperty('style') ? cfg.style.trim() : '';
                this.slider.config.colors = (cfg.hasOwnProperty('colors') && Object.keys(cfg.colors).length !== 0 && cfg.colors.constructor === Object) ? cfg.colors :{ background: '#02a5a5', textColor: '#000000', trackColor: '#f0f0f0' };

                var colors = this.slider.config.colors;

                // If colors has three-digit
                if(colors.background.indexOf('#') == 0 && colors.background.length == 4){
                    colors.background = "#" + colors.background.replace("#", '').split('').map(function(hex){ return hex + hex; }).join('');
                }
                if(colors.trackColor.indexOf('#') == 0 && colors.trackColor.length == 4){
                    colors.trackColor = "#" + colors.trackColor.replace("#", '').split('').map(function(hex){ return hex + hex; }).join('');
                }

                // Calculate background color to gradient
                var bg2 = '', alfa;
                if(colors.background.indexOf("#") != -1){
                    var aux = it.hexToRGBA(colors.background, 0.4).replace(/[^0-9,\.]/ig, '').split(",")
                    for(var i = 0; i < aux.length - 1; i++){
                        bg2 += ((parseInt(aux[i]) - 32) + ",").trim(",")
                    }
                    colors.background2 = "rgb(" + bg2.substr(0, bg2.length - 1) + ")";

                } else {
                    bg2 = colors.background.replace(/[^0-9,\.]/ig, '').split(",").map(function(el){ return parseInt(el) - 32; }).filter(function(el){ return parseFloat(el) > 1.0 }).join(",");
                    alfa = colors.background.replace(/[^0-9,\.]/ig, '').split(",");
                    alfa = parseFloat(alfa[alfa.length - 1]);

                    colors.background2 = "rgba(" + bg2 + ')';
                }

                // Calculate track color to gradient and border
                if(colors.trackColor.indexOf("#") != -1){
                    var aux = it.hexToRGBA(colors.trackColor, 0.4).replace(/[^0-9,\.]/ig, '').split(",")
                    for(var i = 0; i < aux.length - 1; i++){
                        bg2 += ((parseInt(aux[i]) - 32) + ",").trim(",")
                    }
                    colors.trackColor2 = "rgb(" + bg2.substr(0, bg2.length - 1) + ")";

                } else {
                    bg2 = colors.trackColor.replace(/[^0-9,\.]/ig, '').split(",").map(function(el){ return parseInt(el) - 32; }).filter(function(el){ return parseFloat(el) > 1.0 }).join(",");
                    alfa = colors.trackColor.replace(/[^0-9,\.]/ig, '').split(",");
                    alfa = parseFloat(alfa[alfa.length - 1]);

                    colors.trackColor2 = "rgba(" + bg2 + ')';
                }

                // Create main element container
                var cont = document.createElement('it-slider');
                cont.setAttribute("type", this.slider.config.type);
                cont.id = "slider-" + this.target.id;

                // Add styles
                if(cfg.hasOwnProperty('style')) cont.setAttribute('style', cfg.style);

                ["onblur", "onfocus", "onfocusin", "onfocusout",
                    "onmousedown", "onmouseup", "onmouseover", "onmouseout",
                    "oninput", "onclick", "onchange",
                    "ontouchcancel", "ontouchend", "ontouchmove", "ontouchstart"
                ].forEach(function(event){
                    if(cfg.hasOwnProperty(event)) cont.setAttribute(event, cfg[event]);
                });

                // Add rule styles
                if(this.slider.config.type == "switch"){
                    // If not selected parameter
                    cfg.checked = !cfg.hasOwnProperty("checked") ? false : cfg.checked;

                    var input = document.createElement("input");
                    input.id = this.target.id;
                    input.name = this.target.id;
                    input.checked = cfg.selected == "0" || cfg.checked == "true" || cfg.checked == true ? true : false;
                    input.type = "checkbox";
                    if(cfg.hasOwnProperty("disabled") && (cfg.disabled == "true" || cfg.disabled === true)){
                        input.setAttribute("disabled", "disabled");
                    }

                    var label = document.createElement("span");
                    label.setAttribute("data-on", cfg.labelOn);
                    label.setAttribute("data-off", cfg.labelOff);

                    var handle = document.createElement("handle");

                    cont.appendChild(input);
                    cont.appendChild(label);
                    cont.appendChild(handle);

                    var ariaLbl = document.querySelector('[for="' + input.id + '"]') || this.target.parentElement.querySelector("label");
                    ariaLbl = !ariaLbl ? (input.id + ' sin label asociado') : ariaLbl.innerText;
                    cont.setAttribute("aria-label", ariaLbl);
                    cont.setAttribute("role", "switch");
                    cont.setAttribute("aria-checked", input.checked);
                    cont.classList.add("rendered");

                    input.setAttribute("aria-label", ariaLbl);

                    this.target.parentNode.insertBefore(cont, this.target.nextElementSibling);
                    this.target.parentNode.removeChild(this.target);

                    this.target = cont;

                    input.addEventListener("change", function(e){
                        e.target.parentElement.setAttribute("aria-checked", e.target.checked)
                    });

                } else if(this.slider.config.type == "range"){
                    // If not selected parameter
                    this.slider.config.values = cfg.values;
                    cfg.selected = !cfg.selected ? 0 : cfg.selected;

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

                    var ariaLbl = document.querySelector('[for="' + input.id + '"]') || this.target.parentElement.querySelector("label");
                    ariaLbl = !ariaLbl ? (input.id + ' sin label asociado') : ariaLbl.innerText;

                    cont.setAttribute("role", 'slider');
                    cont.setAttribute("aria-label", ariaLbl);
                    cont.setAttribute("aria-valuemin", 0);
                    cont.setAttribute("aria-valuemax", cfg.values.length - 1);
                    cont.setAttribute("aria-valuenow", cfg.selected);
                    cont.setAttribute("aria-valuetext", cfg.values[cfg.selected].label);

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

                        e.target.parentElement.setAttribute("aria-valuenow", e.target.value)
                        e.target.parentElement.setAttribute("aria-valuetext", e.target.parentElement.querySelector('values [data-value="' + e.target.value + '"]').innerText)
                    });

                    var items = labels.querySelectorAll("span");
                    for(var x = 0; x < items.length; x++){
                        var item = items[x];
                        item.addEventListener("click", function(e){
                            e.target.parentElement.previousElementSibling.value = e.target.dataset.value;

                            var EV = new Event('change',{ 'bubbles': true, 'cancelable': true });
                            e.target.parentElement.previousElementSibling.dispatchEvent(EV);
                        });
                    }
                }

                // Add rules
                if(!cfg.stylesheet){
                    this.slider._addCSSRules(this.slider.config.type, this.slider.config);
                }

                if(this.slider.config.style != "") this.target.style = this.slider.config.style;
            } // end for
        }

        it.slider.version = 2.0;
        it.slider.config = { type: 'switch', style: '', id: '' };
        it.slider.help = function(cfg){
            if(typeof cfg == "undefined") cfg = { help: '' };
            if(!cfg.hasOwnProperty("help")) cfg.help = '';

            if(typeof showHelper != "undefined") showHelper("Slider", cfg);
            else alert("Helper not available!")
            return;
        };
        it.slider._addCSSRules = function(type, cfg){
            if(typeof type == "undefined") type = "switch";

            this.config.colors = cfg.hasOwnProperty('colors') ? cfg.colors :{ background: '#02a5a5', textColor: '#000000', trackColor: '#f0f0f0' };

            it.addCSSRule('', "#slider-" + cfg.id, 'display: block; width: 100%;');

            if(type == "switch"){
                it.addCSSRule('', "#slider-" + cfg.id, "background: linear-gradient(to bottom, rgba(0,0,0,0.06) 0%,rgba(0,0,0,0) 100%); border-radius: 0; display: inline-block; height: 24px; padding: 3px; position: relative; vertical-align: top; width: 200px; max-width: none; margin: 0; top: 0;");
                it.addCSSRule('', "#slider-" + cfg.id + " input", "cursor: pointer; width: calc(100% - 6px); left: 3px; opacity: 0; position: absolute; top: 3px; height: 100% !important; z-index: 1; ");
                it.addCSSRule('', "#slider-" + cfg.id + " span", "color: #000; font-weight: 600; background: " + this.config.colors.background2 + " none repeat scroll 0 0; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12) inset, 0 0 2px rgba(0, 0, 0, 0.50) inset; display: block; height: inherit; position: relative; text-transform: uppercase; transition: all 0.15s ease-out 0s;");
                it.addCSSRule('', "#slider-" + cfg.id + " span::before, #slider-" + cfg.id + " span::after", "font-size: 12px; line-height: 110%; margin-top: -0.5em; position: absolute; top: 50%; transition: inherit;");
                it.addCSSRule('', "#slider-" + cfg.id + " span::before", "color: " + this.config.colors.textColor + "; content: attr(data-off); right: 7px; ");
                it.addCSSRule('', "#slider-" + cfg.id + " span::after", "color: " + this.config.colors.textColor + "; content: attr(data-on); left: 7px; opacity: 0; ");
                it.addCSSRule('', "#slider-" + cfg.id + " input ~ span", "background: linear-gradient(to bottom, " + this.config.colors.trackColor2 + " 0%, " + this.config.colors.trackColor + " 100%); box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15) inset, 0 0 3px rgba(0, 0, 0, 0.2) inset; border-radius: 0px; margin: 0; padding:0; ");
                it.addCSSRule('', "#slider-" + cfg.id + " input:checked ~ span::before", "opacity: 0;");
                it.addCSSRule('', "#slider-" + cfg.id + " input:checked ~ span::after", "opacity: 1;");
                it.addCSSRule('', "#slider-" + cfg.id + " handle", "background: linear-gradient(to bottom, " + this.config.colors.background + " 0%, " + this.config.colors.background2 + " 100%); /*box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);*/ border: 1px solid rgba(0, 0, 0, 0.2); height: 100%; left: 3px; position: absolute; top: 1px; transition: left 0.15s ease-out 0s; width: 50%; border-radius: 0;");
                it.addCSSRule('', "#slider-" + cfg.id + " handle::before", "background: linear-gradient(to bottom, " + this.config.colors.background2 + " 0%, " + this.config.colors.background + " 100%); border-radius: 6px; box-shadow: 0 1px rgba(0, 0, 0, 0.02) inset; content: ''; height: 12px; left: 50%; margin: -6px 0 0 -6px; position: absolute; top: 50%; width: 12px;");
                it.addCSSRule('', "#slider-" + cfg.id + " input:checked ~ handle", "/*box-shadow: -1px 1px 3px rgba(0, 0, 0, 0.2);*/ left: calc(50% - 3px);");

            } else if(type == "range"){
                it.addCSSRule('', "#slider-" + cfg.id + " values", "width: 100%; display: table; height: auto;");
                it.addCSSRule('', "#slider-" + cfg.id + " values span", "color: " + this.config.colors.textColor + "; width: calc(100% / " + this.config.values.length + "); text-align: center; float: left; margin-top: 5px; cursor: pointer;");
                it.addCSSRule('', "#slider-" + cfg.id + " values span:first-child", "text-align: left;");
                it.addCSSRule('', "#slider-" + cfg.id + " values span:last-child", "text-align: right;");
                it.addCSSRule('', "#slider-" + cfg.id + " values span.selected", "font-weight: 600;");
                it.addCSSRule('', "#slider-" + cfg.id + " input[type=range]", 'position:relative; -o-appearance: none; -ms-appearance: none; -moz-appearance: none; -webkit-appearance: none; appearance: none; margin: 18px 0; width: 100%; outline: none;');
                it.addCSSRule('', "#slider-" + cfg.id + " input[type=range]:focus", 'border: 0 none !important; outline: none; background: transparent !important;');
                it.addCSSRule('', "#slider-" + cfg.id + " input[type=range]::-webkit-slider-runnable-track", 'width: 100%; height: 8.4px; cursor: pointer; background: ' + this.config.colors.trackColor + '; border: 0.2px solid ' + this.config.colors.trackColor2 + '; border-radius: 0;');
                it.addCSSRule('', "#slider-" + cfg.id + " input[type=range]::-webkit-slider-thumb", 'border: 1px solid ' + this.config.colors.background2 + '; height: 24px; width: 24px; background: ' + this.config.colors.background + '; cursor: pointer; -webkit-appearance: none; margin-top: -8px; border-radius: 0;');
                it.addCSSRule('', "#slider-" + cfg.id + " input[type=range]:focus::-webkit-slider-runnable-track", 'background: ' + this.config.colors.background + '; border: 0 none !important;');
                it.addCSSRule('', "#slider-" + cfg.id + " input[type=range]::-moz-range-track", 'width: 100%; height: 8.4px; cursor: pointer; background: ' + this.config.colors.trackColor + '; border: 0.2px solid ' + this.config.colors.trackColor2 + '; border-radius: 0;');
                it.addCSSRule('', "#slider-" + cfg.id + " input[type=range]::-moz-range-thumb", 'border: 1px solid ' + this.config.colors.background2 + '; height: 24px; width: 24px; background: ' + this.config.colors.background + '; cursor: pointer; border-radius: 0;');
                it.addCSSRule('', "#slider-" + cfg.id + " input[type=range]::-ms-track", 'width: 100%; height: 8.4px; cursor: pointer; background: rgba(0,0,0,0); border-color: ' + this.config.colors.trackColor + '; border-width: 0; color: transparent; border-radius: 0;');
                it.addCSSRule('', "#slider-" + cfg.id + " input[type=range]::-ms-fill-lower", 'background: ' + this.config.colors.trackColor + '; border: 0.2px solid ' + this.config.colors.trackColor2 + ';');
                it.addCSSRule('', "#slider-" + cfg.id + " input[type=range]::-ms-fill-upper", 'background: ' + this.config.colors.trackColor + '; border: 0.2px solid ' + this.config.colors.trackColor2 + ';');
                it.addCSSRule('', "#slider-" + cfg.id + " input[type=range]::-ms-thumb", 'border: 1px solid ' + this.config.colors.background2 + '; height: 24px; width: 24px; background: ' + this.config.colors.background + '; cursor: pointer; border-radius: 0;');
                it.addCSSRule('', "#slider-" + cfg.id + " input[type=range]:focus::-ms-fill-lower", 'background: ' + this.config.colors.background + '; border: 0 none !important;');
                it.addCSSRule('', "#slider-" + cfg.id + " input[type=range]:focus::-ms-fill-upper", 'background: ' + this.config.colors.background + '; border: 0 none !important;');
                it.addCSSRule('', "#slider-" + cfg.id + " input[type=range]::-ms-tooltip", 'display: none;');
                it.addCSSRule('', "@media all and (-ms-high-contrast:none)", "#slider-" + cfg.id + '{ position:relative; top: 6px; } #slider-' + cfg.id + ' input[type=range]{ margin: 0 0 10px 0; padding: 0; height: 24px; } #slider-' + cfg.id + ' input[type=range]:focus{ background: rgba(0,0,0,0) !important; }');
            }
        };
        it.slider.autoDraw = function(){
            var items = document.querySelectorAll("it-slider");
            for(var x = 0; x < items.length; x++){
                var item = items[x], arr = {}, colors = {};

                if(item.classList.contains("rendered")) continue;

                for(var i = 0, atts = item.attributes, n = atts.length, arr = {}; i < n; i++){
                    var key = atts[i].nodeName, value = atts[i].value;
                    key = key.replace(/\-[a-z]/, function(v){ return v.toUpperCase(); }).replace("-", '');

                    if(key == "id"){
                        key = 'target';

                    } else if(key == "values"){
                        var aux = [], values = value.split(",");
                        for(var y = 0; y < values.length; y++){
                            var v = values[y].split(":");
                            aux.push({ label: v[0].trim(), value: v[1].trim() });
                        }
                        value = aux;

                    } else if(key == "background" || key.toLowerCase().indexOf("color") != -1){
                        colors[key] = value;
                        continue;
                    }

                    arr[key] = value;
                }
                arr.colors = colors;

                // Generate new component
                it('#' + arr.target).slider(arr);
            }
        }
    }

    /**
    	Password tools
    	@version: 2.0
    	@author: Pablo E. Fernández (islavisual@gmail.com).
    	@Copyright 2017-2022 Islavisual.
    	@Last update: 10/03/2021
    **/
    if(json.Password){
        this.Password = it.password = function(cfg){
            if(this.targets.length == 0) console.log("Password: Nada que tratar")

            if(!cfg.hasOwnProperty('stylesheet')) cfg.stylesheet = false;

            // Recuperamos la configuración para el elemento
            for(var attr in it.password.config){
                if(cfg.hasOwnProperty(attr)) it.password.config[attr] = cfg[attr];
            }

            cfg = it.password.config;

            for(var xTrg = 0; xTrg < this.targets.length; xTrg++){
                cfg.target = this.targets[xTrg].cloneNode(false), id = cfg.target.id;

                // Creamos el contenedor para la password
                var div = document.createElement("div");
                div.id = 'it-password-' + id;
                div.classList.add("it-password-layer");

                var pwdmeter = document.createElement("span");
                pwdmeter.id = 'it-password-' + id + '-meter';
                pwdmeter.classList.add("it-password-meters", !cfg.autodraw ? 'not-draw' : 'draw');

                var pwdmsg = document.createElement("span");
                pwdmsg.id = 'it-password-' + id + '-message';
                pwdmsg.classList.add("it-password-messages");
                pwdmsg.setAttribute("aria-live", "polite");

                cfg.target.setAttribute("aria-label", cfg.text);
                cfg.target.setAttribute("placeholder", cfg.placeholder);
                cfg.target.type = "password";

                div.appendChild(cfg.target);
                div.appendChild(pwdmeter);
                div.appendChild(pwdmsg);

                if(cfg.showbutton){
                    var sbtn = document.createElement("button");
                    sbtn.id = 'it-password-' + cfg.target.id + '-show';
                    sbtn.type = "button";
                    sbtn.classList.add('it-password-show-button');
                    sbtn.setAttribute("onclick", 'it.password.changeMode(this)');
                    sbtn.setAttribute("aria-labelledby", cfg.target.id);
                    sbtn.innerHTML = '<i class="' + cfg.showicon + '"></i>';

                    div.appendChild(sbtn);
                }

                it.password._setEvents(cfg.target, cfg);

                this.targets[xTrg].insertAdjacentElement("beforebegin", div);

                // Creamos el contenedor para la confirmación de password, si procede
                if(cfg.confirmby){
                    var divC = document.createElement("div");
                    divC.id = 'it-password-' + cfg.confirmby;
                    divC.classList.add("it-password-layer");

                    var pwdmsgC = document.createElement("span");
                    pwdmsgC.id = 'it-password-' + cfg.confirmby + '-message';
                    pwdmsgC.classList.add("it-password-messages");
                    pwdmsgC.setAttribute("aria-live", "polite");

                    var trgConfirm = this.targets[xTrg].cloneNode(false);
                    for(var i = 0; i < cfg.target.attributes.length; i++){
                        trgConfirm[cfg.target.attributes[i].name] = cfg.target.attributes[i].value
                    }

                    trgConfirm.setAttribute("aria-label", cfg.textconfirm);
                    trgConfirm.setAttribute("placeholder", cfg.placeholderconfirm);
                    trgConfirm.id = cfg.confirmby;
                    trgConfirm.name = cfg.confirmby;
                    trgConfirm.type = "password";

                    divC.appendChild(trgConfirm);
                    divC.appendChild(pwdmsgC);

                    if(cfg.showbutton){
                        var sbtnC = document.createElement("button");
                        sbtnC.id = 'it-password-' + cfg.confirmby + '-show';
                        sbtnC.type = "button";
                        sbtnC.classList.add('it-password-show-button');
                        sbtnC.setAttribute("onclick", 'it.password.changeMode(this)');
                        sbtnC.setAttribute("aria-labelledby", cfg.confirmby);
                        sbtnC.innerHTML = innerHTML = '<i class="' + cfg.showicon + '"></i>';

                        divC.appendChild(sbtnC);
                    }

                    div.insertAdjacentElement("afterend", divC);

                    it.password._setEvents(trgConfirm, cfg);
                }

                this.targets[xTrg].remove();


                // Llamamos al evento check por si vienen rellenos y, así, comprobar los posibles errores.
                it.password.check(cfg.target);

                // Añadimos las reglas CSS necesarias
                if(!cfg.stylesheet){
                    it.addCSSRule('', "#it-password-" + cfg.target.id + (cfg.confirmby ? (", #it-password-" + cfg.confirmby) : ''), "position: relative");
                    it.addCSSRule('', "#" + pwdmeter.id, "width: calc(100% - 3px); height: 6px; position: absolute; top: 3px; left: 2px; z-index: 99; padding: 0; border: 0 none; margin: 0 0 5px 0; display: none");
                    it.addCSSRule('', "#" + pwdmeter.id + " > div", "background: " + it.hexToRGBA(cfg.colorok, 0.1) + "; width: calc(16.667% - 1px); float: left; height: 5px; padding: 0; margin: 0px 1px 0 0; position: relative;");
                    it.addCSSRule('', "#" + pwdmeter.id + ".not-draw", "display: none !important");
                    it.addCSSRule('', "#" + pwdmeter.id + " > div.spotlight", "background: " + cfg.colorok + ";");
                    it.addCSSRule('', "input:focus ~ #" + pwdmeter.id, "background: " + cfg.colornok + "; display: block;");
                    it.addCSSRule('', '.it-password-messages', 'padding: 5px; display: block; background: #ffecec; border: 1px solid rgba(0,0,0,0.1); margin: 5px 0; font-size: 1em; font-weight: 600;');
                    it.addCSSRule('', '.it-password-messages:empty', 'height: 0; padding: 0; border: 0 none; width: 100%;');
                    it.addCSSRule('', '.it-password-show-button', 'position: absolute; top: 0; right: 0; background: transparent; border: 0 none; color: #000; width: 32px; height: ' + cfg.target.offsetHeight + 'px; z-index: 2;');
                    it.addCSSRule('', '.it-password-show-button i', 'pointer-events: none;');
                }

                it.password.assigned = true;
            }
        }
        it.password.version = 2.0;
        it.password.config = {
            autocheck: false,
            autodraw: true,
            colorok: 'rgba(255,255,255,0.75)',
            colornok: '#e0e0e0',
            confirmby: null,
            features:{ allowed: false, complexity: 0, extra: 0, length: 0, lowers: 0, numbers: 0, special: 0, uppers: 0 },
            minfeatures:{ length: 6, uppers: 1, lowers: 1, numbers: 1, special: 1, extra: 10 },
            minfeaturesLang:{
                minfeatures: 'Debe tener al menos',
                length: 'Longitud',
                uppers: 'Mayúsculas',
                lowers: 'Minúsculas',
                numbers: 'Números',
                special: 'Especiales'
            },
            onerror: null,
            messages:{
                confirm_empty: "El campo de contraseña de confirmación no puede estar vacío",
                empty: "La contraseña está vacía",
                not_allowed: "Contraseña no permitida.",
                not_length: "Contraseña no tiene la longitud requerida",
                not_match: "Las contraseñas no coinciden"
            },
            text: 'Introducción de la contraseña',
            textconfirm: 'Confirmación de la contraseña',
            placeholder: 'Contraseña',
            placeholderconfirm: 'Confirmar contraseña',
            showbutton: false,
            showicon: 'la la-eye',
        }

        it.password._setEvents = function(trg, cfg){
            trg.setAttribute("oninput", "it.password.check(" + (trg.id == cfg.target.id ? 'this' : 'document.getElementById("' + cfg.target.id + '")') + ")");
        }

        it.password.check = function(el){
            // Get target
            var val = el.value, cfg = it.password.config;
            cfg.errorType = '';

            // If length lower than three, update values and return false
            if(it.password.isEmpty(val)){
                cfg.features.complexity = 0;
                cfg.features.allowed = false;
                cfg.errorType = 'empty';

            } else if(val.length < cfg.minfeatures.length){
                cfg.features.complexity = 0;
                cfg.features.allowed = false;
                cfg.errorType = 'not_length';

            } else {
                it.password._checkComplexity(cfg, val);

                if(cfg.features.allowed && cfg.confirmby){
                    if(it.password.isEmpty(document.getElementById(cfg.confirmby).value)){
                        cfg.features.allowed = false;
                        cfg.errorType = 'confirm_empty';

                    } else if(!it.password.sameLike(cfg.target, document.getElementById(cfg.confirmby))){
                        cfg.features.allowed = false;
                        cfg.errorType = 'not_match';
                    }
                }
            }

            if(cfg.autocheck) it.password.getError();

            if(!cfg.features.allowed){
                if(!cfg.target.form.getAttribute("data-updated")){
                    if(cfg.target.form.getAttribute("onsubmit")){
                        cfg.target.form.setAttribute("data-onsubmit", cfg.target.form.getAttribute("onsubmit"));
                        cfg.target.form.setAttribute("data-updated", "true");
                    }

                    cfg.target.form.setAttribute("onsubmit", 'return it.password.getError(); ');
                    cfg.target.form.setAttribute("data-updated", "true");
                }

            } else {
                if(cfg.target.form.getAttribute("data-updated")){
                    if(cfg.target.form.getAttribute("data-onsubmit")){
                        cfg.target.form.setAttribute("onsubmit", cfg.target.form.getAttribute("data-onsubmit"))
                        cfg.target.form.removeAttribute("data-onsubmit");

                    } else {
                        cfg.target.form.removeAttribute("onsubmit");
                    }
                    cfg.target.form.removeAttribute("data-updated");
                }
            }

            // Auto draw strength chart
            if(cfg.autodraw) it.password.draw();
        }

        it.password.changeMode = function(el){
            el = el.parentElement.querySelector("input");
            if(el.type === "password"){ el.type = "text"; } else { el.type = "password"; }

            el.focus();
        }

        it.password.draw = function(){
            var cfg = it.password.config
                // Define layers
            var cont = cfg.target.nextElementSibling;
            cont.innerHTML = '';

            var str = '';
            for(var x = 0; x < 6; x++){
                if(x <= cfg.features.complexity - 1){
                    str += '<div class="spotlight"></div>';
                } else {
                    str += '<div></div>';
                }
            }

            cont.innerHTML = str;
        }

        it.password._checkComplexity = function(cfg, val){
            // Get features
            cfg.features.length = val ? val.length : 0;
            cfg.features.uppers = val.match(/[A-Z]/g) ? val.match(/[A-Z]/g).length : 0;
            cfg.features.lowers = val.match(/[a-z]/g) ? val.match(/[a-z]/g).length : 0;
            cfg.features.numbers = val.match(/[0-9]/g) ? val.match(/[0-9]/g).length : 0;
            cfg.features.special = cfg.features.length - cfg.features.uppers - cfg.features.lowers - cfg.features.numbers
            cfg.features.extra = cfg.features.length >= cfg.minfeatures.extra ? 1 : 0;

            // Get initial complexity
            cfg.features.complexity = (cfg.features.length >= cfg.minfeatures.length ? 1 : 0) + (cfg.features.numbers >= cfg.minfeatures.numbers ? 1 : 0) + (cfg.features.uppers >= cfg.minfeatures.uppers ? 1 : 0) + (cfg.features.lowers >= cfg.minfeatures.lowers ? 1 : 0) + (cfg.features.special >= cfg.minfeatures.special ? 1 : 0) + cfg.features.extra;

            // Penalties by consecutive types
            var consecutive = it.password._consecutive(val, 'uppers', val.length < cfg.minfeatures.length ? 2 : 4);
            cfg.features.complexity = consecutive ? (cfg.features.complexity - 1) : cfg.features.complexity;

            var consecutive = it.password._consecutive(val, 'lowers', val.length < cfg.minfeatures.length ? 2 : 4);
            cfg.features.complexity = consecutive ? (cfg.features.complexity - 1) : cfg.features.complexity;

            var consecutive = it.password._consecutive(val, 'numbers', val.length < cfg.minfeatures.length ? 2 : 4);
            cfg.features.complexity = consecutive ? (cfg.features.complexity - 1) : cfg.features.complexity;

            // Penalties by repeated characters
            var repeated = it.password._repeated(val, val.length < cfg.minfeatures.length ? 2 : 3);
            cfg.features.complexity = repeated ? (cfg.features.complexity - 1) : cfg.features.complexity;

            // Update allowed flag and form
            cfg.features.allowed = (cfg.features.length >= cfg.minfeatures.length ? true : false) && (cfg.features.numbers >= cfg.minfeatures.numbers ? true : false) && (cfg.features.uppers >= cfg.minfeatures.uppers ? true : false) && (cfg.features.lowers >= cfg.minfeatures.lowers ? true : false) && (cfg.features.special >= cfg.minfeatures.special ? true : false);

            if(cfg.features.allowed < cfg.minfeatures.numbers) cfg.errorType = 'not_allowed';
        }

        it.password.getError = function(){
            var cfg = it.password.config, msgPwd, msgRep;

            msgPwd = cfg.target.parentElement.querySelector('[id$="message"]')
            if(cfg.confirmby) msgRep = document.getElementById(cfg.confirmby).parentElement.querySelector('[id$="message"]')

            // Show messages
            if(cfg.errorType == "not_length"){
                msgPwd.innerHTML = cfg.messages.not_length;

            } else if(cfg.errorType == "empty"){
                msgPwd.innerHTML = cfg.messages.empty;

            } else if(cfg.errorType == "not_allowed"){
                var str = " " + it.password.config.minfeaturesLang.minfeatures + " ";
                str += it.password.config.minfeaturesLang.length.toLowerCase() + ' ' + it.password.config.minfeatures.length + ", ";
                str += it.password.config.minfeatures.uppers + ' ' + it.password.config.minfeaturesLang.uppers.toLowerCase() + ", ";
                str += it.password.config.minfeatures.lowers + ' ' + it.password.config.minfeaturesLang.lowers.toLowerCase() + ", ";
                str += it.password.config.minfeatures.numbers + ' ' + it.password.config.minfeaturesLang.numbers.toLowerCase() + ", ";
                str += it.password.config.minfeatures.special + ' ' + it.password.config.minfeaturesLang.special.toLowerCase() + ". ";

                msgPwd.innerHTML = cfg.messages.not_allowed + str;
            } else {
                msgPwd.innerHTML = '';
            }
            
            if(msgRep != undefined){
                if(cfg.errorType == "confirm_empty"){
                    msgRep.innerHTML = cfg.messages.confirm_empty;

                } else if(cfg.errorType == "not_match"){
                    msgRep.innerHTML = cfg.messages.not_match;
                } else {
                    msgRep.innerHTML = '';
                }
            }

            return false;
        }

        it.password._consecutive = function(value, pattern, len){
            var value = value.split(''), total = 0;

            // If the value length is greater, ignore validation
            if(value.length >= 15) len = (len - 1) * 2;

            // Check consecutive characters
            for(var x = 0; x < value.length; x++){
                var code = value[x].charCodeAt(0);

                if(pattern == "uppers"){
                    if(code >= 65 && code <= 90) total++;
                    else total = 0;
                } else if(pattern == "lowers"){
                    if(code >= 97 && code <= 122) total++;
                    else total = 0;
                } else if(pattern == "numbers"){
                    if(code >= 48 && code <= 57) total++;
                    else total = 0;
                }

                if(total == len) return true;
            }

            return false;
        }

        it.password.sameLike = function(trg, cfrm){
            if(trg.value.trim() != cfrm.value.trim()) return false;
            else return true;
        }

        it.password.isEmpty = function(e){
            if(e.trim() != "") return false;
            else return true;
        }

        it.password._repeated = function(value, len){
            var total = 1, charAnt = '';

            for(var x = 0; x < value.length; x++){
                var char = value[x];

                if(charAnt == char) total++;
                else charAnt = char;
                if(total == len) return true;
            }

            return false;
        }

        it.password.help = function(cfg){
            if(typeof cfg == "undefined") cfg = { help: '' };
            if(!cfg.hasOwnProperty("help")) cfg.help = '';

            if(typeof showHelper != "undefined") showHelper("Password", cfg);
            else alert("Helper not available!")
            return;
        }

        it.password.generate = function(length){
            var cfg = it.password.config;

            if(typeof length == "undefined") length = cfg.minfeatures.length;
            if(length < cfg.minfeatures.length) return false;

            var val, charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!·$%&()*+_-";

            cfg.features.allowed = false;
            while (!cfg.features.allowed){
                cfg.features.complexity = 0;
                cfg.features.length = 0;
                val = '';
                for(var i = 0, n = charset.length; i < length; ++i){
                    val += charset.charAt(Math.floor(Math.random() * n));
                }

                it.password._checkComplexity(cfg, val);
                if(cfg.features.length != length) cfg.features.allowed = false;
            }

            return val;
        }
    }

    /**
    	Dropdown select
    	@version: 1.6
    	@author: Pablo E. Fernández (islavisual@gmail.com).
    	@Copyright 2017-2022 Islavisual.
    	@Last update: 16/04/2021
    **/
        if(json.Selectpicker){
            this.Selectpicker = it.selectpicker = function(cfg){
                if(typeof cfg == "undefined") cfg = {};
                else if(typeof cfg == 'string' && cfg == "destroy") return this.selectpicker.destroy(this.targets)
    
                // If method was called by HTMLSelectElement
                this.targets = this.targets == undefined ? [this] : this.targets
    
                Array.prototype.slice.call(this.targets).forEach(function(target, idx){
                    if(target.id.trim() == '') target.id = 'select' + idx;
                    it.selectpicker.config[target.id] = cfg;
                });
    
                if(!cfg.hasOwnProperty('stylesheet')) cfg.stylesheet = false;
                if(!cfg.hasOwnProperty("callback")) cfg.callback = null;
    
                for(var key in it.selectpicker.config){
                    var trg = document.getElementById(key);
    
                    // Get options
                    if(!cfg) cfg = { livesearch: false, stylesheet: false, callback: null };
    
                    // select needs searcher
                    if((cfg.hasOwnProperty("livesearch") && cfg.livesearch) ||
                        (trg.getAttribute("data-live-search") != null && trg.getAttribute("data-live-search") == "true")) cfg.livesearch = true;
                    else cfg.livesearch = false;
    
                    it.selectpicker._curIndex[trg.id] = -1;
    
                    if(trg.tagName.toLowerCase() != "select"){
                        alert("Error en el elemento #" + trg.id + ". ¡Se necesita establecer un elemento SELECT como objetivo para crear el Selectpicker!. Por favor, consulta la ayuda con it.helper('selectpicker');");
                        return false;
                    }
    
                    // Add layer will contents button and list
                    var div = document.createElement("div");
                    div.setAttribute("class", "it-select-picker");
                    div.setAttribute("role", "combobox");
                    div.setAttribute("aria-autocomplete", "both");
                    div.setAttribute("aria-expanded", "false");
                    div.setAttribute("aria-haspopup", "true");
                    div.setAttribute("aria-owns", "it-sp-options-" + trg.id);
                    div.setAttribute("aria-activedescendant", "");
    
                    // Add button will contents the selected text
                    var btn = document.createElement("button");
                    btn.setAttribute("id", trg.id + "trigger");
                    btn.setAttribute("class", trg.getAttribute('class') + "-trigger");
                    btn.setAttribute("data-id", trg.id);
                    btn.setAttribute("aria-expanded", "false");
                    btn.setAttribute("type", "button");
                    btn.setAttribute("tabindex", "-1");
                    if(parseInt(getComputedStyle(trg, null).minWidth) == 0){
                        btn.style.minWidth = it.getTextWidth(Array.prototype.slice.call(trg.querySelectorAll("option"), 0),
                            getComputedStyle(trg, null).fontFamily,
                            getComputedStyle(trg, null).fontSize) + 'px';
                    }
    
                    // Assign all select properties 
                    for(var i = 0, atts = trg.attributes, n = atts.length; i < n; i++){
                        var att = atts[i];
                        if(att.name == "id" || att.name == "name" || att.name == "class" || att.name.indexOf("on") == 0) continue;
    
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
                        t.setAttribute("aria-expanded", t.getAttribute("aria-expanded") == "false" ? "true" : "false");
                        t.parentElement.setAttribute("aria-expanded", t.getAttribute("aria-expanded"));
    
                        // Set focus into input search
                        var t = t.parentElement;
                        if(t.classList.contains("open") && t.querySelectorAll("input").length != 0)
                            t.querySelector("input").focus();
    
                        // Mark active
                        var items = t.querySelectorAll("li"), btn = t.querySelector("button");
                        for(var i = 0; i < items.length; i++){
                            var item = items[i];
    
                            if(item.innerHTML == btn.innerText){
                                item.classList.add("it-select-picker-active");
                                it.selectpicker._curIndex[t.previousElementSibling.id] = i;
                            } else {
                                item.classList.remove("it-select-picker-active");
                            }
                        }
    
                        // Allocate scroll
                        var active = t.querySelector('.it-select-picker-active');
                        var trg = t.querySelector("ul");
                        if(active) trg.scrollTop = active.offsetTop - trg.offsetHeight + active.offsetHeight + 2;
                    });
    
                    window.addEventListener("click", it.selectpicker._windowListener);
    
                    // Add dropdown-container
                    var diC = document.createElement("div");
                    diC.setAttribute("class", "dropdown-container");
                    diC.setAttribute("style", "display: none");
                    diC.id = "it-sp-options-" + trg.id;
    
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
                        var e = arguments[0], trg = e.target, list;
    
                        function getList(id){
                            var x = document.getElementById(id).nextElementSibling.querySelectorAll("li");
                            return x;
                        }
    
                        function setActive(x, dir){
                            if(x >= 0 && x <= list.length - 1) list[x].classList.remove("it-select-picker-active");
    
                            function getNext(){
                                if(dir == '+') x++;
                                else x--;
                                if(x >= list.length) x = 0;
                                else if(x < 0) x = list.length - 1;
    
                                return x;
                            }
    
                            x = getNext();
                            while (list[x].style.display == "none"){ x = getNext(); }
    
                            list[x].classList.add("it-select-picker-active");
                            return x;
                        }
    
                        function setScrollTop(dir, trg){
                            try{
                                trg = trg.parentElement.nextElementSibling;
    
                                // Move scroll to current position
                                var active = trg.querySelector('.it-select-picker-active');
                                if(dir == "down"){
                                    trg.scrollTop = active.offsetTop - trg.offsetHeight + active.offsetHeight + 2;
                                } else if(active.offsetTop < trg.scrollTop || document.querySelector('.it-select-picker-active:last-child').offsetTop == active.offsetTop){
                                    trg.scrollTop = active.offsetTop - trg.offsetHeight + trg.offsetHeight + 2;
                                }
                            } catch (e){}
                        }
    
                        if(e.keyCode == 27){
                            it.selectpicker.close(trg.parentElement.parentElement.parentElement)
    
                        } else if(e.keyCode == 38){ // up
                            list = getList(trg.dataset.id);
    
                            it.selectpicker._curIndex[trg.dataset.id] = setActive(it.selectpicker._curIndex[trg.dataset.id], '-');
                            setScrollTop('up', trg);
    
                        } else if(e.keyCode == 40){ // down
                            list = getList(trg.dataset.id);
                            it.selectpicker._curIndex[trg.dataset.id] = setActive(it.selectpicker._curIndex[trg.dataset.id], '+');
                            setScrollTop('down', trg);
    
                        } else if(e.keyCode == 13 || e.keyCode == 9){
                            if(e.keyCode == 13){
                                e.preventDefault();
                                e.stopPropagation();
                            }
    
                            list = getList(trg.dataset.id);
                            document.getElementById(trg.dataset.id).selectedIndex = it.selectpicker._curIndex[trg.dataset.id];
                            it.selectpicker._update(trg.dataset.id, it.selectpicker._curIndex[trg.dataset.id]);
                            return false;
                        }
                    }.bind(it.selectpicker));
    
                    // Create and add input picker
                    var src = document.createElement("div");
                    src.setAttribute("class", "searcher");
                    src.appendChild(inp);
    
                    // If search is disabled, hide searcher
                    if(!cfg.livesearch) src.style = 'opacity: 0; height: 0; overflow: hidden; min-height: inherit;';
    
                    // Add icon search
                    var ic = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    ic.setAttribute("version", "1.1");
                    ic.setAttribute("x", "0px");
                    ic.setAttribute("y", "0px");
                    ic.setAttribute("viewBox", "0 0 128 128");
    
                    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    path.setAttribute("d", "M 126.351562 118.78125 L 94.644531 87.050781 C 102.144531 77.851562 106.667969 66.140625 106.667969 53.359375 C 106.667969 23.953125 82.753906 0.0117188 53.320312 0.0117188 C 23.890625 0.0117188 0 23.953125 0 53.359375 C 0 82.761719 23.917969 106.679688 53.347656 106.679688 C 66.101562 106.679688 77.839844 102.15625 87.039062 94.65625 L 118.742188 126.363281 C 120.914062 128.53125 124.207031 128.53125 126.375 126.363281 C 128.546875 124.191406 128.546875 120.949219 126.351562 118.78125 Z M 10.636719 53.359375 C 10.636719 29.808594 29.769531 10.675781 53.320312 10.675781 C 76.871094 10.675781 96.03125 29.835938 96.03125 53.386719 C 96.03125 76.933594 76.871094 96.09375 53.320312 96.09375 C 29.769531 96.09375 10.636719 76.910156 10.636719 53.359375 Z M 10.636719 53.359375");
    
                    ic.appendChild(path);
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
                        li.id = trg.id + '_option_' + i;
                        li.setAttribute("data-value", item.value);
    
                        if(trg.multiple){
                            var chkLI = document.createElement("input");
                            chkLI.id = "chk-" + trg.id + li.getAttribute('rel') + i;
                            chkLI.type = "checkbox";
                            chkLI.setAttribute("onchange", 'it.selectpicker._update("' + trg.id + '", ' + i + ')');
    
                            var lbl = document.createElement("label");
                                lbl.setAttribute("for", chkLI.id)
                                lbl.append(chkLI)
                                lbl.append(document.createTextNode(item.innerText))
                            
                            li.append(lbl);
    
                        } else {
                            li.innerHTML = item.innerText;
                            li.setAttribute("onclick", 'it.selectpicker._update("' + trg.id + '", ' + i + ')');
                        }
    
                        if(item.getAttribute("selected") != null && item.getAttribute("disabled") == null){
                            li.setAttribute("class", "selected");
                            btn.innerText = trg.options[trg.selectedIndex].innerText;
    
                            div.setAttribute("aria-activedescendant", item.value)
                        }
    
                        lst.appendChild(li);
                    }
    
                    // Add components to layer
                    diC.appendChild(lst);
                    div.appendChild(btn);
                    div.appendChild(diC);
    
                    // Hide select and append new dropdown
                    trg.parentNode.insertBefore(div, trg.nextSibling);
    
                    if(trg.style.length != 0){
                        var s = trg.style, str = '';
                        for(var i = 0; i < s.length; i++){
                            btn.style[s[0]] = s[s[0]];
                            str = s[0] + ': ' + s[s[0]] + ';';
                        }
                        trg.dataset.style = str;
                    }
                    // Add styles to select element
                    //trg.style.display = "none";
                    trg.style = 'border: 0 none; width: 0; height: 0; overflow: hidden !important; opacity: 0; padding: 0; margin: 0; position: absolute;';
    
                    trg.addEventListener("change", function(e){
                        var cfg = it.selectpicker.config[e.target.id]
    
                        if(cfg.callback) cfg.callback(e);
                    });
    
                    it.selectpicker.config[trg.id] = cfg;
                }
    
                // Add default Styles
                if(!cfg.stylesheet){
                    AddCSSRule('', ".it-select-picker", 'position: relative; width: 100%;');
                    AddCSSRule('', ".it-select-picker .dropdown-container", 'list-style: none; background: #fff; border: 1px solid rgba(0,0,0,0.1); padding: 0; position: absolute; top: 30px; width: 100%; z-index: 99999;');
                    AddCSSRule('', ".it-select-picker ul", 'overflow: auto; max-height: 164px; padding: 0; list-style: none; margin: 0;');
                    AddCSSRule('', ".it-select-picker button", 'background: #fff; border: 1px solid rgba(0,0,0,0.1); width: 100%; height: 28px; text-align: left; line-height: 28px; font-weight: 500; padding: 0 32px 0 5px; position: relative; padding: 0 0px;');
                    AddCSSRule('', ".it-select-picker button::before", 'content: ""; display: inline-block; width: 0; height: 0; margin-left: 2px; vertical-align: middle; border-top: 4px dashed; border-right: 4px solid transparent; border-left: 4px solid transparent; position: absolute; right: 10px; top: 12px;');
                    AddCSSRule('', ".it-select-picker button:hover", 'border-color: #adadad;');
                    AddCSSRule('', ".it-select-picker.open button", ' background: #000; color: #fff;');
                    AddCSSRule('', ".it-select-picker li", 'border-bottom: 1px solid rgba(0,0,0,0.1); color: rgba(0,0,0,1); padding: 4px 5px; line-height: normal; margin: 0;');
                    AddCSSRule('', ".it-select-picker li:not(.searcher):hover", 'background: #000; color: #fff; cursor:pointer; ');
                    AddCSSRule('', ".it-select-picker .searcher", 'border-bottom: 1px solid rgba(0,0,0,0.1); height: auto; min-height: 28px; padding: 0px; position: relative; width: 100%;');
                    AddCSSRule('', ".it-select-picker .searcher .input-search", 'border: 0 none; border-radius: 0; line-height: normal; height: auto; min-height: 26px; padding: 0 20px 0 5px; color: #000; width: 100%; z-index: 0;');
                    AddCSSRule('', ".it-select-picker .searcher svg", 'position: absolute; right: 5px; width: 16px; top: 5px; fill: #aaa; width: 15px');
                    AddCSSRule('', ".it-select-picker-active", 'background: #000; color: #fff !important;');
                    AddCSSRule('', ".it-select-picker > button:focus, select:focus + .it-select-picker > button", 'border: 1px solid red;');
                    AddCSSRule('', '.it-select-picker input[type="search"]::-webkit-search-cancel-button', '-webkit-appearance: none; appearance: none;');
                    AddCSSRule('', '.it-select-picker input[type=search]::-ms-clear, .it-select-picker input[type=search]::-ms-reveal', 'display: none; width: 0; height: 0;');
                    AddCSSRule('', '.it-select-picker button .tag', 'background: #000; color: #fff; margin: 0 0 0 5px; padding: 2px 32px 2px 5px; box-shadow: 0 0 0 1px rgba(0,0,0,0.4) inset; position: relative;');
                    AddCSSRule('', '.it-select-picker button .tag::after', 'content: "\\2713"; position: absolute; top: -2px; right: 8px;');
                    AddCSSRule('', '.it-select-picker label', 'width: 100%; display: inline-block; padding-left: 25px;');
                    AddCSSRule('', '.it-select-picker label input', 'position: relative; top: 0px; left: -25px;');
                }
    
                return div
            }
    
            it.selectpicker.version = '1.5';
            it.selectpicker._curIndex = {};
            it.selectpicker.config = [];
    
            it.selectpicker.help = function(cfg){
                if(typeof cfg == "undefined") cfg = { help: '' };
                if(!cfg.hasOwnProperty("help")) cfg.help = '';
    
                if(typeof showHelper != "undefined") showHelper("Selectpicker", cfg);
                else alert("Helper not available!");
                return;
            }
    
            it.selectpicker._update = function(e, i){
                // update HTML select
                e = document.getElementById(e);
                var sp = e.nextElementSibling;
    
                if(!e.multiple){
                    e.selectedIndex = i;
                    
                    // Update text in button
                    sp.children[0].innerText = e[i].innerText;
    
                    // Close selectpicker list
                    sp.classList.remove("open");
                    sp.children[1].style.display = "none";
                    sp.children[0].setAttribute("aria-expanded", "false");
                    sp.children[0].innerHTML = e.options[e.selectedIndex].text;
                    sp.setAttribute("aria-activedescendant", e[i].value);
    
                } else {
                    e.options[i].selected = !e.options[i].selected;
    
                    // Update text in button
                    sp.children[0]. innerHTML = "";
                    for(var j = 0; j < e.options.length; j++){
                        if(e.options[j].selected){
                            sp.children[0].insertAdjacentHTML("beforeend", '<span class="tag">' + e.options[j].innerText + '</span>');
                        }
                    }
    
                }
    
                e.dispatchEvent(new Event('change'));
                e.focus();
            };
    
            it.selectpicker._windowListener = function(e){
                if(document.querySelectorAll("div.it-select-picker.open").length != 0){
                    var p = e.target;
    
                    try{
                        while (p != document && !p.classList.contains('it-select-picker')){
                            p = p.parentNode;
                        }
                    } catch (e){ p == e.target; }
    
                    if(p == document){
                        var items = document.querySelectorAll("div.it-select-picker.open");
                        for(var i = 0; i < items.length; i++){
                            it.selectpicker.close(items[i])
                        }
                    }
                }
            }
    
            it.selectpicker.close = function(item){
                item.classList.remove("open");
                item.querySelector(".dropdown-container").style.display = 'none';
                item.querySelector("button").setAttribute("aria-expanded", "false");
            }
    
            it.selectpicker.destroy = function(targets){
                for(var i = 0; i < targets.length; i++){
                    var item = targets[i];
    
                    item.nextElementSibling.remove()
                    item.style = item.dataset.style
                }
            }
        }

    /**
    	Create and send forms in real time.
    	@version: 1.0
    	@author: Pablo E. Fernández (islavisual@gmail.com).
    	@Copyright 2017-2022 Islavisual.
    	@Last update: 11/03/2019
    	@status PENDING to UPDATE
    **/
    if(json.SendForm){
        this.SendForm = it.sendForm = function(cfg){
            if((typeof cfg == "string" && cfg == "help") || cfg.hasOwnProperty("help")){
                if(typeof showHelper != "undefined") showHelper("SendForm", cfg);
                else alert("Helper not available!")
                return;
            }

            // If configuration object is invalid
            if(!cfg.hasOwnProperty('url')){ alert("The 'url' parameter has not been supplied!.\nPlease, see the help with the SendForm('help');"); return; }
            if(!cfg.hasOwnProperty('params')){ alert("The 'params' parameter has not been supplied!.\nPlease, see the help with the SendForm('help');"); return; }

            // Create form
            var f = document.createElement("form");
            f.setAttribute('method', "post");
            f.setAttribute('action', cfg.url);
            f.style.display = "none";

            for(var i = 0; i < cfg.params.length; i++){
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
    SlideShow functionality
    @version: 1.3
    @author: Pablo E. Fernández (islavisual@gmail.com).
    @Copyright 2017-2022 Islavisual.
    @Last update: 21/04/2021
**/
if(json.SlideShow){
    this.SlideShow = it.slideShow = function (cfg) {
        if(typeof cfg == "undefined") cfg = {};
        
        // If method was called by HTMLSelectElement
        this.targets = this.tagName != undefined ? [this] : (this.entries == undefined ? this.targets : this);

        var opt;
        Array.prototype.slice.call(this.targets).forEach(function(target){
            var id = target.id, i;

            if(target.tagName == "IT-SLIDESHOW"){
                target = it.slideShow.build(target, opt);
            }

            // Recuperamos la configuración actual
            if(!it.slideShow._init[target.id]){
                opt = it.slideShow.config[id] || cfg;
                opt.autoplay = cfg.hasOwnProperty("autoplay") ? cfg.autoplay : false;
                opt.currentSlide = cfg.hasOwnProperty("currentSlide") ? cfg.currentSlide : (typeof cfg == "number" ? cfg : 1);
                opt.dots = target.querySelectorAll(".dot");
                opt.effect = cfg.hasOwnProperty("effect") ? cfg.height : 'fade';
                opt.fullscreen = cfg.hasOwnProperty("fullscreen") ? cfg.fullscreen : false;
                opt.interval = cfg.hasOwnProperty("interval") ? cfg.interval : 5;
                opt.player = cfg.hasOwnProperty("player") ? cfg.player : false;
                opt.showNumbers = cfg.hasOwnProperty("showNumbers") ? cfg.showNumbers : false;
                opt.slides = target.querySelectorAll(".slide");
                opt.stylesheet = cfg.hasOwnProperty("stylesheet") ? cfg.stylesheet : false;
                opt.title = cfg.hasOwnProperty("title") ? cfg.title : it.slideShow.language.title;
                opt.width = cfg.hasOwnProperty("width") ? cfg.width : '100%';
                opt.height = cfg.hasOwnProperty("height") ? cfg.height : '360px';

                // Si el target no tiene ID, se lo asignamos
                if(!id){
                    if(!id) id = 'it-slider-' + Math.random().toString(36).substr(2, 9);
                    target.id = id;
                }

                // Si se solicitó a pantalla completa establecemos los valores calculados
                if(opt.fullscreen){
                    opt.height = '100vh';
                    opt.width = '100%';
                    target.classList.add("fullscreen");
                }

                // Si se solicitó el botón de reproducción
                if(opt.player){
                    var aux = document.createElement("button");
                    aux.classList.add("player");
                    aux.setAttribute("role", "button")
                    target.appendChild(aux);

                    it.slideShow.pause(target);
                }
            } else {
                opt = it.slideShow.config[id];
                opt.currentSlide = (typeof cfg == "number" || typeof cfg == "string") ? cfg : 1;
            }
            
            // Establecemos valores por defecto si el número de slide está fuera de los límites
            if (opt.currentSlide > opt.slides.length) {opt.currentSlide = 1}
            if (opt.currentSlide < 1) {opt.currentSlide = opt.slides.length}

            // Reestablecemos todos los slides y dots activos
            for (i = 0; i < opt.slides.length; i++) { opt.slides[i].classList.add("hide"); }
            if(opt.dots.length != 0){
                for (i = 0; i < opt.dots.length; i++) { opt.dots[i].classList.remove("active"); }
            }

            // Asignamos el slide y dot actual
            opt.slides[opt.currentSlide-1].classList.remove("hide");
            if(opt.dots.length != 0){
                opt.dots[opt.currentSlide-1].classList.add("active");
            }

            // Asignamos tamaño si el target no lo tiene todavía
            if(!it.slideShow._init[target.id]){
                // Asignamos la clase CSS
                target.classList.add("it-slideshow");

                // Asignamos los atributos de accesibilidad 
                target.setAttribute("aria-roledescription", "carousel");
                target.setAttribute("aria-label", opt.title);

                // Creamos el contenedor de dots
                var dots = document.createElement("div");
                    dots.classList.add("dots");

                // Recorremos los slides
                for(var i = 0; i < opt.slides.length; i++){
                    // Asignamos los atributos de accesibilidad a cada slide,
                    opt.slides[i].setAttribute("aria-roledescription", "slide");
                    opt.slides[i].setAttribute("aria-label", (i + 1) + it.slideShow.language.slideOf +  opt.slides.length);

                    // Añadimos los enlaces/dots para cada slide con sus
                    // respectivos atributos de accesibilidad
                    if(opt.dots.length == 0){
                        var dot = document.createElement("a");
                            dot.classList.add("dot")
                            dot.setAttribute("onclick", "it.slideShow.toSlide(this, " + (i + 1) + ")");
                            dot.setAttribute("role", "button");
                            dot.setAttribute("aria-controls", target.id);
                            dot.setAttribute("aria-label", it.slideShow.language.goto + (i + 1));
                            dot.setAttribute("tabindex", "0");

                        // Asingamos el dot activo
                        if(i == opt.currentSlide-1) dot.classList.add("active");

                        dots.appendChild(dot);
                    }

                    // Añadimos el número de diapositiva, si procede
                    if(opt.showNumbers){
                        var sn = document.createElement("span");
                            sn.classList.add("slide-id")
                            sn.innerHTML = (i + 1) + " / " + opt.slides.length;

                        opt.slides[i].insertAdjacentElement("afterbegin", sn);
                    }

                    // Asignamos a cada slide el efecto de transición solicitado,
                    // fade, por defecto
                    opt.slides[i].classList.add(opt.effect);
                }
                // Añadimos el elemento contenedor de dots
                target.appendChild(dots);

                opt.dots = dots.querySelectorAll(".dot");

                // Añadimos los botones y dots a cada target
                var prev = document.createElement("a");
                    prev.classList.add("prev")
                    prev.setAttribute("onclick", "it.slideShow.toggle(this, -1)");
                    prev.setAttribute("role", "button");
                    prev.setAttribute("aria-controls", target.id);
                    prev.setAttribute("aria-label", it.slideShow.language.prev);
                    prev.setAttribute("tabindex", "0");
                    prev.innerHTML = "&#10094;"

                    target.appendChild(prev);

                var next = document.createElement("a");
                    next.classList.add("next")
                    next.setAttribute("onclick", "it.slideShow.toggle(this, 1)");
                    next.setAttribute("role", "button");
                    next.setAttribute("aria-controls", target.id);
                    next.setAttribute("aria-label", it.slideShow.language.next);
                    next.setAttribute("tabindex", "0");
                    next.innerHTML = "&#10095;"

                    target.appendChild(next);

                // Guardamos la actual configuración
                it.slideShow.config[id] = opt;

                // Si se solicitó la reprocucción automática, la activamos
                if(opt.autoplay){
                    it.slideShow.play(target);
                }

                target.addEventListener('touchstart', handleTouchStart, {passive: true});        
                target.addEventListener('touchmove', handleTouchMove, {passive: true});
                var xDown = null, yDown = null;
                
                function getTouches(evt) { return evt.touches || evt.originalEvent.touches; }                                                     

                function handleTouchStart(evt) { const firstTouch = getTouches(evt)[0]; xDown = firstTouch.clientX; yDown = firstTouch.clientY; };                                                
                function handleTouchMove(evt)  { 
                    if ( ! xDown || ! yDown ) { return; }

                    var xUp = evt.touches[0].clientX, yUp = evt.touches[0].clientY;
                    var xDiff = xDown - xUp, yDiff = yDown - yUp;

                    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
                        if ( xDiff > 0 ) {
                            target.querySelector(".next").click();
                        } else {
                            target.querySelector(".prev").click();
                        }
                    } 
                    xDown = yDown = null;
                };

                it.slideShow._init[target.id] = target.id
            }

            it.slideShow.config[id].currentSlide = opt.currentSlide;
        });

        if(!opt.stylesheet && !it.slideShow._stylesAdded){
            AddCSSRule('', '.it-slideshow', 'max-width: none; position: relative; margin: 0; padding: 0;');
            AddCSSRule('', '.it-slideshow .prev, .it-slideshow .next', 'cursor: pointer; position: absolute; top: 50%; width: auto; margin-top: -22px; padding: 16px; color: white; font-weight: bold; font-size: 18px; transition: 0.6s ease; border-radius: 0 3px 3px 0; user-select: none;');
            AddCSSRule('', '.it-slideshow .next', 'right: 0; border-radius: 3px 0 0 3px;');
            AddCSSRule('', '.it-slideshow .prev:hover, .it-slideshow .next:hover, .it-slideshow .prev:focus, .it-slideshow .next:focus', 'background-color: rgba(0,0,0,0.8);');
            AddCSSRule('', '.it-slideshow .title', 'color: #ffffff; font-size: 2rem; padding: 8px 12px; position: absolute; bottom: 50%; width: 100%; text-align: center;');
            AddCSSRule('', '.it-slideshow .text', 'background: rgba(0,0,0,0.5); color: #f2f2f2; font-size: 1rem; padding: 8px 12px 22px; position: absolute; bottom: 0; width: 100%; text-align: center;');
            AddCSSRule('', '.it-slideshow .slide-id', 'background-color: rgba(0,0,0,0.8); color: #f2f2f2; font-size: 0.8rem; padding: 5px 10px; position: absolute; top: 0;');
            AddCSSRule('', '.it-slideshow .dots', 'text-align: center; position: absolute; width: 100%; bottom: 0; left: 0;');
            AddCSSRule('', '.it-slideshow .dot ', 'cursor: pointer; height: 15px; width: 15px; margin: 0 2px; background-color: #bbb; border-radius: 50%; display: inline-block; transition: background-color 0.6s ease;');
            AddCSSRule('', '.it-slideshow .slide', 'position: absolute; top: 0; left: 0; transition: opacity 1s ease-in-out; height: 100%; width: 100%; margin: 0; padding: 0;');
            AddCSSRule('', '.it-slideshow .slide img, .it-slideshow .slide svg', 'max-width: 100%; display: block; object-fit: cover; height: 100%; width: 100%; display: block;');
            AddCSSRule('', '.it-slideshow .active, .it-slideshow .dot:hover, .it-slideshow .dot:focus', 'background-color: #000;');
            AddCSSRule('', '.it-slideshow .fade', 'opacity: 1;');
            AddCSSRule('', '.it-slideshow .hide', 'opacity: 0;');
            AddCSSRule('', '@keyframes it-slideshow-fade', '0% { display: block; opacity: 0 } 1% { opacity: 0 } 100% { opacity: 1 }');
            AddCSSRule('', '@keyframes it-slideshow-hide', ' 0% { opacity: 1 } 99% { opacity: 0; } 100% { opacity: 0; display: none; }');

            AddCSSRule('', '.it-slideshow.fullscreen', 'height: 100vh; width: 100%;');

            AddCSSRule('', '.it-slideshow .player', 'position: absolute; top: 5px; right: 5px; font-size: 21px; background: rgba(0, 0, 0, 0.8); border: 1px solid rgba(0, 0 , 0, 0.5); color: #fff; width: 32px; height: 32px; line-height: 30px; text-align: center; padding: 0; margin: 0;');
            AddCSSRule('', '.it-slideshow.playing .player::before', 'content: "\\2590\\a0\\258c"; ');
            AddCSSRule('', '.it-slideshow.playing .player', 'font-size: 12px;');
            AddCSSRule('', '.it-slideshow.paused .player::before', 'content: "\\25b6"; ');
            AddCSSRule('', '.it-slideshow.paused .player', 'font-size: 19px;');
            
            AddCSSRule('', '.it-slideshow progress', 'position: absolute; top: 45px; left: 0; height: 4px; width: 100%; -webkit-appearance: none; -moz-appearance: none; appearance: none; border: none; background-color: rgba(var(--fc1), 0.1); color: rgba(var(--borderColor), 1);');
            AddCSSRule('', '.it-slideshow progress::-webkit-progress-bar', 'background-color: rgba(var(--fc1), 0.1); border-radius: 20px;');
            AddCSSRule('', '.it-slideshow progress::-webkit-progress-value', 'background-color: rgba(var(--fc1), 1);  transition: 0.2s width ;');
            AddCSSRule('', '.it-slideshow progress::-moz-progress-bar', 'background-color: rgba(var(--fc1), 1);');
            AddCSSRule('', '.it-slideshow progress::-ms-fill', 'background-color: rgba(var(--fc1), 1);');

            it.slideShow._stylesAdded = true;
        }
    }

    it.slideShow.build = function(trg, cfg){
        var cont, slide, img, tlt, txt;

        // Creamos el DIV contenedor
        cont = document.createElement("div");
        cont.classList.add("slideshow");

        // Creamos los elementos de diapositiva
        for(var i = 0; i < trg.children.length; i++){
            var item = trg.children[i];

            slide = document.createElement("div");
            slide.classList.add("slide", "fade");
            if(i > 0){ slide.classList.add("hide"); }

            img = document.createElement("img");
            img.src = item.getAttribute("img");
            img.setAttribute("width", "100%");
            img.setAttribute("height", "100%");

            tlt = document.createElement("div");
            tlt.classList.add("title");
            tlt.innerHTML = item.getAttribute("title");

            txt = document.createElement("div");
            txt.classList.add("text");
            txt.innerHTML = item.getAttribute("text");

            slide.append(img);
            slide.append(tlt);
            slide.append(txt);

            cont.append(slide);
        }
        
        trg.insertAdjacentElement("beforebegin", cont);
        trg.remove();

        return cont;
    }

    it.slideShow.config = {}
    it.slideShow.language = {
        prev: "Mostrar diapositiva anterior",
        next: "Mostrar diapositiva siguiente",
        goto: "Mostrar diapositiva ",
        start: "Iniciar presentación automática de diapositivas",
        stop: "Detener presentación automática de diapositivas",
        title: "Presentación de diapositivas de imágenes",
        slideOf: " de "
    }
    
    it.slideShow.play = function(el){
        var cfg = it.slideShow.config[el.id] || {};

        // Añadimos la barra de progreso
        var trg = cfg.slides[0].parentElement, prg;
        if(!trg.querySelector("progress")){
            prg = document.createElement("progress");
                prg.max = "101";
                prg.value = "0";
            trg.insertAdjacentElement("afterbegin", prg);
        } else {
            prg = trg.querySelector("progress");
        }

        cfg.progress = setInterval(function(interval, el){
            if(prg.value > 100){
                prg.value = 0;
                it.slideShow.toggle(el, 1);
            }
            prg.value += prg.max / interval / 10;

        }.bind(prg, cfg.interval, el.querySelector(".next")), 100);

        // Cambiamos el evento click
        el.querySelector(".player").onclick = function(e){
            it.slideShow.pause(e.target.parentElement)
        }

        el.querySelector(".player").setAttribute("aria-label", it.slideShow.language.stop)

        el.classList.add("playing");
        el.classList.remove("paused");
    }

    it.slideShow.pause = function(el){
        var cfg = it.slideShow.config[el.id] || {};

        // Paramos el intervalo y barra de progreso
        clearInterval(cfg.progress);

        // Cambiamos el evento click
        el.querySelector(".player").onclick = function(e){
            it.slideShow.play(e.target.parentElement)
        }

        el.querySelector(".player").setAttribute("aria-label", it.slideShow.language.start)

        el.classList.remove("playing");
        el.classList.add("paused");
    }
    
    it.slideShow.toggle = function(el, n){
        el = el.parentElement;
        it(el).slideShow(parseInt(el.querySelector(".active").getAttribute("onclick").replace(/[^0-9]/g, '')) + n);
    }

    it.slideShow.toSlide = function(el, n){
        el = el.parentElement.parentElement;
        it(el).slideShow(n);
    }

    it.slideShow._stylesAdded = false;
    it.slideShow._init = [];
}

    /**
    	Sort tables functionality
    	@version: 1.3.0
    	@author: Pablo E. Fernández (islavisual@gmail.com).
    	@Copyright 2017-2022 Islavisual.
    	@Last update: 13/07/2022
    **/
    if(json.Sorter){
        this.sorter = it.sorter = function(cfg){
            if(cfg == undefined) cfg = {};
        
            // Recorremos todos los resultados que devuelve la función constructora
            Array.prototype.slice.call(this.targets).forEach(function(target, idx){
                // Rescumeramos el ID de la tabla
                var id = target.id;
        
                // Si el atributo id no está configurado, por defecto, lo asignamos
                if(id == ""){
                    id = 'Sorter_' + idx;
                    target.id = id;
                }
                target.classList.add("it-sortable");
        
                // Si no se definido una función de renderizado avisamos.
                if(cfg.hasOwnProperty("render") && typeof cfg.render != "function"){
                    alert("No se ha asignado la función de renderizado. Añade el parámetro render con la función que renderiza la tabla...\n\nEj: it('#results').sorter({ render: loadedJSON });")
                    return;
                }
        
                // Si no hay datos avisamos con un mensaje emergente.
                if(!cfg.hasOwnProperty("data") || cfg.data == undefined || cfg.data.length == 0){
                    alert("No se han asignado los datos de la tabla. Añade el parámetro data con el array de datos...\n\nEj: it('#results').sorter({ data: [{id: 1, n: 'Paul'}, {id: 2, n: 'Michael'}] });")
                    return;
                } 
        
                // Establecemos la configuración requerida para la tabla
                var opt = {
                    cols: 0,
                    columns: !cfg.hasOwnProperty('columns') ? Array(target.querySelectorAll("thead tr:last-child th").length).fill('') : cfg.columns,
                    data: cfg.data,
                    fields: !cfg.hasOwnProperty('fields') ? [] : cfg.fields,
                    icons:{
                        sort: !cfg.hasOwnProperty('icons') || !cfg.icons.hasOwnProperty('sort') ? 'fa fa-sort' : cfg.icons.sort,
                        asc: !cfg.hasOwnProperty('icons') || !cfg.icons.hasOwnProperty('asc') ? 'fa fa-sort-alpha-asc' : cfg.icons.asc,
                        desc: !cfg.hasOwnProperty('icons') || !cfg.icons.hasOwnProperty('desc') ? 'fa fa-sort-alpha-desc' : cfg.icons.desc,
                    },
                    multiple: !cfg.hasOwnProperty('multiple') ? false : cfg.multiple,
                    render: !cfg.hasOwnProperty('render') ? null : cfg.render,
                    rows: 0,
                    selector: !cfg.hasOwnProperty('selector') ? false : cfg.selector,
                    table: target,
                    stylesheet: !cfg.hasOwnProperty('stylesheet') ? false : cfg.stylesheet
                }
                if(!it.sorter.config) it.sorter.config = [];
                it.sorter.config[id] = opt;
        
                // Actualizamos el JSON de datos
                for (var index = 0; index < cfg.data.length; index++) {
                    cfg.data[index]._index = index;
        
                    var keys = Object.keys(cfg.data[index]);
                    for(var i = 0; i < keys.length; i++){
                        if(cfg.columns[i] && cfg.columns[i].hasOwnProperty("enum")){
                            cfg.data[index][keys[i] + 'Enum'] = cfg.columns[i].enum.indexOf(cfg.data[index][keys[i]]);
                        }
                    }
                }
        
                // Primero renderizamos los datos
                if(typeof cfg.render == "function"){
                    opt.render(opt.data);
                } else {
                    it.sorter.render(target, opt);
                }
                opt.cols = target.querySelectorAll("tbody tr:first-child td").length;
                opt.rows = target.rows.length;
                
                // Añadimos la funcionalidad de ordenar
                try{ it.sorter._remove(opt); } catch (e){}
                it.sorter._addIndexes(opt);
                it.sorter._setOrder(opt);
                it.sorter._addIcons(opt);
        
                if(opt.selector) it.sorter._addSelector(opt);
        
                if(!opt.stylesheet){
                    it.sorter._addCSSRules(opt);
                }
        
                it.sorter.sort(it.sorter._getFirstOrderableColumn(opt), target);
            });
        }
        
        it.sorter._addIcons = function(opt){
            var ths = opt.table.querySelectorAll('table tr:last-child th')
            for(var i = 0; i < opt.sorting.length; i++){
                var item = opt.sorting[i], th = ths[i];
        
                if(item.orderable){
                    th.innerHTML += '<i class="' + opt.icons[item.setto == '' ? 'sort' : item.setto] + '"></i>';
                    th.setAttribute("onclick", "it.sorter.sort(" + i + ", this, 'toggle')");
        
                    if(th.style.width) th.style.width = "calc(" + th.style.width + " + 12px)";
                }
            }
        }
        
        it.sorter._addIndexes = function(opt){
            // Establecemos el orden inicial
            var rows = opt.table.querySelectorAll("tbody tr");
            for(var i = 0; i < rows.length; i++){
                rows[i].dataset.index = i;
            }
        }
        
        it.sorter._addSelector = function(opt){
            // Añadimos una capa envolvente para meter todos los elementos
            var div = document.createElement("div");
            div.classList.add("it-sortable-layer");
            div.innerHTML = opt.table.outerHTML;
        
            opt.table.parentElement.append(div)
            opt.table.remove();
            opt.table = div.querySelector("table");
        
            // Añadimos el selector para ordenación múltiple
            var tbl = document.createElement("table");
            tbl.classList.add("it-sortable-selector");
            tbl.style.display = 'none';
        
            // Creamos la cabecera de la tabla
            var thead = document.createElement("thead");
            var tr = document.createElement("tr");
            var th1 = document.createElement("th");
            var th2 = document.createElement("th");
            var th3 = document.createElement("th");
            var th4 = document.createElement("th");
        
            th1.innerHTML = "Columna"
            th2.innerHTML = 'Asc';
            th3.innerHTML = 'Desc';
            th4.innerHTML = 'No';
        
            tr.append(th1);
            tr.append(th2);
            tr.append(th3);
            tr.append(th4);
        
            thead.append(tr);
            tbl.append(thead);
        
            // Creamos la cabecera de la tabla
            var tbody = document.createElement("tbody");
        
            var ths = opt.table.querySelectorAll("thead tr:last-child th");
            for(var i = 0; i < ths.length; i++){
                if(ths[i].innerText.trim() != ""){
                    var tr = document.createElement("tr");
        
                    var td1 = document.createElement("td");
                    var td2 = document.createElement("td");
                    var td3 = document.createElement("td");
                    var td4 = document.createElement("td");
        
                    td1.innerHTML = ths[i].innerText;
                    td2.innerHTML = '<input type="radio" name="sorter_ri' + i + '" data-index="' + i + '" data-order="asc" onchange="it.sorter.selectorClick(this, 1)" />';
                    td3.innerHTML = '<input type="radio" name="sorter_ri' + i + '" data-index="' + i + '" data-order="desc" onchange="it.sorter.selectorClick(this, -1)" />';
                    td4.innerHTML = '<input type="radio" name="sorter_ri' + i + '" checked data-index="' + i + '" data-order="none" onchange="it.sorter.selectorClick(this, 0)" />';
        
                    tr.append(td1);
                    tr.append(td2);
                    tr.append(td3);
                    tr.append(td4);
        
                    tbody.append(tr);
                }
            }
        
            tbl.append(tbody);
        
            opt.table.insertAdjacentElement('beforebegin', tbl);
        
            // Añadimos el label para desplegar la lista de ordenación múltiple
            var lbl = document.createElement("label");
            lbl.classList.add("it-sortable-label");
            lbl.onclick = function(e){
                e.target.nextElementSibling.classList.toggle("open");
                e.target.classList.toggle("open");
            }
            lbl.innerHTML = "Ordenación";
        
            tbl.insertAdjacentElement('beforebegin', lbl);
        }
        
        it.sorter._getColSpan = function(opt, col){
            var offset = 0
            for(var i = 0; i < col; i++){
                offset += opt.columns[i].colspan > 1 ? (opt.columns[i].colspan - 1) : 0
            }
            return offset;
        }
        
        it.sorter._getFirstOrderableColumn = function(opt){
            for(var i = 0; i < opt.columns.length; i++){
                if(opt.columns[i].orderable) return i;
            }
        }
        
        it.sorter.selectorClick = function(el, ord){
            ord = ord == 0 ? '' : (ord == 1 ? 'asc' : 'desc');
            it.sorter.sort(el.dataset.index, el.parentElement.parentElement.parentElement.parentElement.nextElementSibling, ord)
        }
        
        it.sorter._remove = function(opt){
            var trg = opt.table;
        
            // Eliminamos los iconos y eventos de las celdas de cabecera
            var ics = trg.querySelectorAll("thead th i, th");
            for(var i = 0; i < ics.length; i++){
                if(ics[i].tagName == "I"){
                    ics[i].remove();
                } else {
                    ics[i].removeAttribute('onclick');
                }
            }
        
            // Eliminamos la lista
            if(trg.previousElementSibling) trg.previousElementSibling.remove();
        
            // Eliminamos el label
            if(trg.previousElementSibling) trg.previousElementSibling.remove();
        
            // Ordenamos por la columna indicada por el parámetro "data-index"
            // en orden ascendente
            var i, x, y, switching = true;
            while (switching){
                switching = false;
        
                var rows = opt.table.rows;
                for(i = 1; i < (rows.length - 1); i++){
                    exchange = false;
        
                    x = rows[i].dataset.index;
                    y = rows[i + 1].dataset.index;
        
                    if(x > y){
                        exchange = true;
                        break;
                    }
                }
        
                if(exchange){
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                }
            }
        
            // Eliminamos los índices añadidos por el componente
            var els = opt.table.rows;
            for(var i = 0; i < els.length; i++){
                delete els[i].dataset.index;
            }
        }
        
        it.sorter._setOrder = function(opt){
            if(opt.columns.length == 0) return;
        
            opt.sorting = [];
        
            for(var i = 0; i < opt.columns.length; i++){
                var ord = opt.columns[i];
        
                if(typeof ord == "string"){
                    if(ord != "none"){
                        opt.sorting.push({ id: 'sorterCol' + i, orderable: true, setto: ord, type: 'string' })
                        opt.columns[i] = { id: 'sorterCol' + i, orderable: true, type: 'string' }
        
                    } else {
                        opt.sorting.push({ id: 'sorterCol' + i, orderable: false })
                        opt.columns[i] = { id: 'sorterCol' + i, orderable: false }
                    }
        
                } else if(typeof ord == "object"){
                    var id, orderable, setto, type;
                    id = ord.hasOwnProperty("id") ? ord.id : 'sorterCol' + i;
                    orderable = ord.hasOwnProperty("orderable") ? ord.orderable : true;
                    setto = ord.hasOwnProperty("setto") ? ord.setto : '';
                    type = ord.hasOwnProperty("type") ? ord.type : 'string';
                    if(orderable){
                        opt.sorting.push({ id: id, orderable: orderable, setto: setto, type: type })
                    } else {
                        opt.sorting.push({ id: id, orderable: orderable })
                    }
                }
        
                try{ opt.columns[i].colspan = opt.table.querySelector("thead tr:last-child th:nth-child(" + (i + 1) + ")").colSpan; } catch(e){ }
                try{ opt.sorting[i].field = opt.table.querySelector("tbody tr td:nth-child(" + (i + 1) + ")").dataset.field; } catch(e){ }
                
            }
        }
        
        it.sorter._addCSSRules = function(opt){
            setTimeout(function(){
                it.addCSSRule('', '.it-sortable th', 'cursor: pointer; position: relative; ');
                it.addCSSRule('', '.it-sortable th ' + "." + opt.icons.sort.split(' ').join('.'), 'line-height: 24px; position: absolute; top: 3px; right: 5px; font-size: 1em; color: #aaa; width: auto;');
                it.addCSSRule('', '.it-sortable th ' + "." + opt.icons.asc.split(' ').join('.'), 'line-height: 24px; position: absolute; top: 4px; right: 5px; font-size: 1em; color: #000; width: auto;');
                it.addCSSRule('', '.it-sortable th ' + "." + opt.icons.desc.split(' ').join('.'), 'line-height: 24px; position: absolute; top: 4px; right: 5px; font-size: 1em; color: #000; width: auto;');
        
                it.addCSSRule('', '.it-sortable-layer', 'position: relative;');
                it.addCSSRule('', '.it-sortable-layer .it-sortable-label', 'border: 1px solid #ccc; cursor: pointer; float: right; min-width: auto; height: 28px; text-align: right; line-height: 26px; padding: 0 25px 0 5px; margin: 5px 0; position: relative; z-index: 2;');
                it.addCSSRule('', '.it-sortable-layer .it-sortable-label::before', 'content: ""; border: 1px solid #000; border-width: 8px; border-color: #000 transparent transparent transparent; position: absolute; top: 10px; right: 6px; ');
                it.addCSSRule('', '.it-sortable-layer .it-sortable-label::after', 'content: ""; border: 1px solid #000; border-width: 6px; border-color: #fff transparent transparent transparent; position: absolute; top: 10px; right: 8px; ');
                it.addCSSRule('', '.it-sortable-layer .it-sortable-label.open::before', 'transform: rotate(180deg); top: 0;');
                it.addCSSRule('', '.it-sortable-layer .it-sortable-label.open::after', 'transform: rotate(180deg); top: 4px;');
        
                if(opt.selector){
                    it.addCSSRule('', '.it-sortable-selector', 'max-height: 0; overflow: hidden; display:block; position: absolute; top: 32px; right: 0; background: #fff; border: 1px solid transparent; padding: 0 5px; z-index: 1; transition: max-height 0.25s ease; ');
                    it.addCSSRule('', '.it-sortable-selector.open', 'max-height: 200px; padding: 5px; border-color: #ccc; overflow-y: scroll; overflow-x: hidden; ');
                    it.addCSSRule('', '.it-sortable-selector td, .it-sortable-selector th', 'border: 1px solid #ccc; padding: 2px 5px; text-align: center; position: relative; min-width: 48px; font-size: 1rem;');
                    it.addCSSRule('', '.it-sortable-selector input[type=radio]', 'position: relative; left: 0; top: 2px; float: none; margin: 0 auto;');
                }
        
                if(opt.selector) opt.table.previousElementSibling.style.display = '';
            }, 150);
        }
        
        it.sorter.render = function(trg, cfg){
            if(!trg) return;
        
            // Recuperamos la tabla a reconstruir
            var table = trg;
            if(trg == undefined) table = it.targets[0];
            else if(trg.tagName == "TH") table = trg.closest("table");
        
            // Vaciamos la tabla
            table.querySelector("tbody").innerHTML = "";
            
            // Recuperamos la configuración de la tabla
            var opt = typeof cfg != "undefined" ? cfg : this.config[table.id];
        
            // Si no tiene la etiqueta TBODY, la añadimos
            if(!table.querySelector("tbody")){
                table.insertAdjacentHTML("beforeend", '<tbody></tbody>');
            }
            var tbody = table.querySelector("tbody");
        
            for(var i = 0; i < opt.data.length; i++){
                var item = opt.data[i];
        
                var tr = document.createElement("tr");
                for(var key in opt.fields){
                    var td = document.createElement("td");
                
                    // Establecemos el atributo CLASS si lo tiene
                    if(opt.columns[key].hasOwnProperty("class")){
                        var clss = opt.columns[key].class.split(" ");
        
                        for(var j = 0; j < clss.length; j++){
                            td.classList.add(clss[j])
                        }
                    }
                    td.classList.add(opt.fields[key])
        
                    // Establecemos el contenido del campo
                    var aux = item[opt.fields[key]];
                                                                                                 //opt.columns[key].value(opt.data[i][opt.fields[key]])
                    td.innerHTML = aux == undefined ? '' : ( opt.columns[key].value != undefined ? opt.columns[key].value(opt.data[i]) : aux);
        
                    // Establecemos el dataset con el nombre del campo
                    td.dataset.field = opt.fields[key];
                    try{ td.dataset.header = opt.table.querySelector("thead tr:last-child th:nth-child(" + (parseInt(key) + 1) + ")").innerText; } catch(e) {}
        
                    tr.append(td);
                }
        
                tbody.append(tr)
            }
        }
        
        it.sorter.sort = function(col, trg, ord){
            function sortby(col, ord, table, opt){
                col = col == undefined ? '0': col.toString();
                ord = ord == undefined ? ord = 'asc': (ord == 'none' ? '': ord);
              
                // Recuperamos la ordenación actual de la tabla, tipo y formato
                var sorting = opt.sorting;
        
                // Reseteamos la ordenación si la ordenación por múltiples columnas está desactivado
                if(!opt.multiple){
                    for(var i = 0; i < sorting.length; i++){
                        if(i != col) sorting[i].setto = "";
                    }
                }
        
                // Actualizamos la ordenación de la columna solicitada
                if(ord == 'toggle'){
                    ord = sorting[col].setto == '' ? 'asc' : (sorting[col].setto == 'asc' ? 'desc' : '')
                }
                sorting[col].setto = ord;
        
                // Creamos la condición de ordenación
                var str = [];
                for(var k = 0; k < opt.sorting.length; k++){
                    var field = opt.sorting[k].field;
        
                    if(opt.sorting[k].setto == "asc" && opt.sorting[k].type == "string"){
                        str.push('a.name == ".." || b.name == ".." || a.' + field + '.localeCompare(b.' + field + ')');
        
                    } else if(opt.sorting[k].setto == "desc" && opt.sorting[k].type == "string"){
                        str.push('a.name == ".." || b.name == ".." || b.' + field + '.localeCompare(a.' + field + ')');
                        
                    } else if(opt.sorting[k].setto == "asc" && opt.sorting[k].type == "number"){
                        str.push('a.' + field + ' - b.' + field);
        
                    } else if(opt.sorting[k].setto == "desc" && opt.sorting[k].type == "number"){
                        str.push('b.' + field + ' - a.' + field);
        
                    } else if(opt.sorting[k].setto == "asc" && opt.sorting[k].type == "enum"){
                        field = field + "Enum";
                        str.push('a.' + field + ' - b.' + field);
        
                    } else if(opt.sorting[k].setto == "desc" && opt.sorting[k].type == "enum"){
                        field = field + "Enum";
                        str.push('b.' + field + ' - a.' + field);
        
                    } else if(opt.sorting[k].setto == "asc" && opt.sorting[k].type == "date"){
                        str.push('new Date(a.' + field + ') - new Date(b.' + field + ')');
        
                    } else if(opt.sorting[k].setto == "desc" && opt.sorting[k].type == "date"){
                        str.push('new Date(b.' + field + ') - new Date(a.' + field + ')');
        
                    }
                }
        
                // Si la condición está vacía, ordenamos por posición de llegada (_index)
                if(str.length == 0){
                    field = '_index';
                    str.push('a.' + field + ' - b.' + field);
                }
                str = str.join(" || ");
                console.log(str)
        
                // Creamos y ejecutamos la función de ordenación
                var fn = new Function('opt', `opt.data.sort(function(a,b){ return ${str} });`);
                fn(opt);
        
                // Renderizamos la tabla
                if(typeof opt.render == "function"){
                    opt.render(opt.data);
                } else {
                    it.sorter.render(table, opt);
                }
        
                // Recuperamos todos los iconos de cada celda
                var ic = table.querySelectorAll("thead tr:last-child th");
                if(ic){
                    // Eliminamos todas las clases que hacen referencia los iconos de ordenación
                    var icc = opt.icons.sort.split(' ').concat(opt.icons.asc.split(' ')).concat(opt.icons.desc.split(' '));
                    for(var i = 0; i < ic.length; i++){
                        if(!sorting[i].orderable || !ic[i].querySelector("i")) continue;
        
                        for(var j = 0; j < icc.length; j++){
                            ic[i].querySelector('i').classList.remove(icc[j]);
                        }
                    }
        
                    // Asignamos los iconos correspondientes en cada celda de la cabecera
                    for(var i = 0; i < sorting.length; i++){
                        if(!sorting[i].orderable || !ic[i].querySelector("i")) continue;
        
                        icc = sorting[i].setto == '' ? opt.icons.sort.split(' ') : (sorting[i].setto == 'asc' ? opt.icons.asc.split(' ') : opt.icons.desc.split(' '));
                        for(var j = 0; j < icc.length; j++){
                            ic[i].querySelector('i').classList.add(icc[j]);
                        }
        
                        if(opt.selector){
                            var item = opt.table.previousElementSibling.querySelector('input[name="sorter_ri' + i + '"][data-order="' + (sorting[i].setto == "" ? 'none' : sorting[i].setto) + '"]');
                            if(item) item.checked = true;
                        }
                    }
                }
            }
        
            // Recuperamos la tabla a reordenar
            var table = trg;
            if(trg == undefined) table = it.targets[0];
            else if(trg.tagName == "TH") table = trg.closest("table");
            
            // Recuperamos la configuración de la tabla
            var opt = this.config[table.id];
        
            // Si ord no viene establecido lo recuperamos por la columna
            if(!ord) ord = opt.columns[col].setto;
        
            // Llamamos a la función de ordenación
            sortby(col, ord, table, opt);
        }
        
        it.sorter.help = function(cfg){
            if(typeof cfg == "undefined") cfg = { help: '' };
            if(!cfg.hasOwnProperty("help")) cfg.help = '';
        
            if(typeof showHelper != "undefined") showHelper("Sorter", cfg);
            else alert("Helper not available!");
            return;
        }
    }

    /**
    	 StripTags functionality
    	@version: 1.0
    	@author: Pablo E. Fernández (islavisual@gmail.com).
    	@Copyright 2017-2022 Islavisual.
    	@Last update: 09/02/2019
    **/
    if(json.StripTags){
        this.StripTags = it.stripTags = function(inp, allowed){
            if((typeof inp == "string" && inp == "help") || inp.hasOwnProperty("help")){
                if(typeof showHelper != "undefined") showHelper("StripTags", inp);
                else alert("Helper not available!")
                return;
            }

            allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
            var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
            return inp.replace(commentsAndPhpTags, '').replace(tags, function($0, $1){
                return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
            });
        }
    }


    /**
    	 Tabs functionality
    	@version: 1.0
    	@author: Pablo E. Fernández (islavisual@gmail.com).
    	@Copyright 2017-2022 Islavisual.
    	@Last update: 25/03/2021
    **/
    if(json.Tabs){
        this.Tabs = it.tabs = function(cfg){
            if(typeof cfg == "undefined") cfg = {};

            // If method was called by HTMLSelectElement
            this.targets = this.tagName != undefined ? [this] : (this.entries == undefined ? this.targets : this);

            Array.prototype.slice.call(this.targets).forEach(function(target, x){
                cfg.target = target.cloneNode(true), id = cfg.target.id;

                // Si no tiene ID, se lo asignamos
                if(!id) id = Math.random().toString(36).substr(2, 9);

                // Creamos la configuración por defecto
                cfg.images = !cfg.hasOwnProperty("images") ? null : cfg.images;
                cfg.overflow = !cfg.hasOwnProperty("overflow") ? false : cfg.overflow;
                cfg.label = !cfg.hasOwnProperty("label") ? 'Opciones del tabs' : cfg.label;
                cfg.stylesheet = !cfg.hasOwnProperty("stylesheet") ? false : cfg.stylesheet;

                // Verificamos que el número de tabs es igual al de contenedores
                if(cfg.target.querySelectorAll('button, a').length != cfg.content.length){
                    var msg = "El número de tabs no se corresponde con el número de contenedores";
                    try{ Alert(msg.replace(/\n/g, '<br/>').replace(/\"(.*?)\"/ig, "<b>$1</b>")); } catch (e){ alert(msg); }

                    return;
                }

                // Asignamos algunos atributos al bloque de navegación (dónde están los botones o enlaces)
                cfg.target.setAttribute("class", "it-tab-links");
                cfg.target.setAttribute("role", 'tablist');
                cfg.target.setAttribute("aria-label", cfg.label);

                // Recorremos los disparadores o botones y asignamos atributos necesarios
                var items = cfg.target.querySelectorAll('button, a');
                for(var i = 0; i < items.length; i++){
                    items[i].setAttribute("role", "tab");
                    items[i].setAttribute("aria-selected", i == 0 ? 'true' : "false");
                    items[i].setAttribute("aria-controls", cfg.content[i]);
                    items[i].setAttribute("tabindex", '0');
                    items[i].setAttribute("type", 'button');
                    items[i].setAttribute("onclick", 'it.tabs.toggle(event, "' + cfg.content[i] + '")');

                    // Si es el primer tab, lo activamos
                    if(i == 0){
                        items[i].classList.add("active");
                    }

                    // Si no tiene ID, se lo asignamos
                    if(!items[i].id){
                        items[i].id = "it-tab-link" + id + '-' + i
                    }

                    // Si se han sollicitado imágenes, las añadimos
                    if(cfg.images && cfg.images.length != 0){
                        var img = document.createElement("img");
                        img.classList.add("it-tab-link-image");
                        img.src = cfg.images[i];

                        items[i].insertAdjacentElement("afterbegin", img);
                    }

                    document.getElementById(cfg.content[i]).setAttribute("aria-labelledby", items[i].id);
                }

                // Añadimos la funcionalidad de overflow, si procede
                if(cfg.overflow){
                    it.tabs.initOverflowMode(cfg);

                    // Establecemos el ancho del contenedor de botones o enlaces si la funcionalidad de overflow está habilitada
                    setTimeout(function(xTrg){
                        var trg = document.querySelector('#it-tabs-' + this + xTrg + ' .it-tab-links');
                        var prev = trg.previousElementSibling;
                        var next = trg.nextElementSibling;

                        var items2 = trg.querySelectorAll("button, a"), navCurrentWidth = 0;

                        for(var x = 0; x < items2.length; x++){
                            var item2 = items2[x], style = window.getComputedStyle(item2);

                            navCurrentWidth += item2.offsetWidth + parseInt(style.marginRight) + parseInt(style.marginLeft);
                        }

                        trg.style.width = (navCurrentWidth + prev.offsetWidth) + 'px';

                    }.bind(id, x), 0)
                }

                // Detectamos si es mobile
                var mobile = 'no-touch';
                try{
                    if(typeof document.createEvent("TouchEvent") != "undefined"){
                        mobile = 'touch';
                    }
                } catch (e){}

                // Envolvemos los disparadores de los tabs en una capa superior
                var div = document.createElement("section");
                div.id = 'it-tabs-' + id + x;

                if(!cfg.hasOwnProperty("label")){
                    cfg.target.setAttribute("aria-labelledby", div.id);
                }

                div.classList.add("it-tabs-container", mobile);
                div.innerHTML = cfg.target.outerHTML;

                target.insertAdjacentElement("beforebegin", div);

                // Insertamos los contenedores de los tabs
                var divTabs = document.getElementById(cfg.content[0]).parentElement;
                if(cfg.content.length != divTabs.children.length){
                    divTabs = document.createElement("div");
                }

                divTabs.classList.add("it-tab-contents")

                for(var i = 0; i < items.length; i++){
                    var itmS = document.getElementById(cfg.content[i]);
                    var itmT = itmS.cloneNode(true);

                    itmT.setAttribute("role", 'tabpanel');
                    itmT.setAttribute("tabindex", '0')
                    itmT.style.display = i == 0 ? "block" : '';
                    divTabs.appendChild(itmT)

                    itmS.remove();
                }

                div.appendChild(divTabs);

                window.addEventListener("resize", function(e){
                    it.tabs.resize();
                })

                setTimeout(function(){ it.tabs.resize(); }, 150);

                // Eliminamos el target original
                target.remove();
            });

            if(!cfg.stylesheet){
                AddCSSRule('', '.it-tab-links', 'overflow: hidden; z-index: 1; display: block; margin: 12px 0 0 0; padding: 0; position: relative; top: 1px; list-style: none;');
                AddCSSRule('', '.it-tab-links [role="tab"]', 'background-color: transparent; color: #888; float: left; outline: none; cursor: pointer; padding: 5px 10px; transition: 0.3s; border: 1px solid #fff; border-bottom-color: rgba(0, 0, 0, 0); margin: 0 5px; border-radius: 5px 5px 0 0; position: relative; top: auto; left: auto; right: auto; bottom: auto; display: block; height: auto;');
                AddCSSRule('', '.it-tab-links [role="tab"] img', 'width: auto; height: 48px; object-fit: cover; object-position: center center; display: block; max-width: none; max-height: none; image-rendering: -webkit-optimize-contrast; pointer-events: none; margin: 0 auto; opacity: 1;');
                AddCSSRule('', '.it-tab-links [role="tab"]:not(.active) img', 'filter: grayscale(1); opacity: 0.5;');
                AddCSSRule('', '.it-tab-links [role="tab"]:hover', 'background-color: #484848;');
                AddCSSRule('', '.it-tab-links [role="tab"].active', 'background-color: #ffffff; color: #000000; border-color: rgba(0, 0, 0, 0.2); border-bottom-color: #fff;');

                AddCSSRule('', '.it-tabs-container', 'margin-top: 15px;');
                AddCSSRule('', '.it-tabs-container [role="button"]', 'background-color: #fff; border: 0 none; color: #000; float: left; outline: none; cursor: pointer; padding: 5px 0; margin: 0; transition: 0.3s; border-radius: 5px 5px 0 0; position: absolute; left: 0; top: 0; min-width: 32px; z-index: 2;');
                AddCSSRule('', '.it-tabs-container [role="button"]:last-child', 'left: auto; right: 0;');
                AddCSSRule('', '.it-tabs-container [role="button"].large', 'height: 80px; font-size: 32px');

                AddCSSRule('', '.it-tab-contents', 'border: 1px solid rgba(0,0,0,0.2); border-radius: 5px 5px 0px 0;');
                AddCSSRule('', '.it-tab-contents [role=tabpanel]', 'display: none; padding: 6px 12px; border: 0 none;');

                AddCSSRule('', '.it-tabs-overflow', 'overflow: hidden; position: relative; padding-left: 20px;');
                AddCSSRule('', '.it-tabs-overflow .it-tab-links', 'margin: 0; top: 0; margin-left: 8px; ');
                AddCSSRule('', '.it-tabs-overflow [role="button"]', 'top: -1px;');
                AddCSSRule('', '.it-tabs-overflow + .it-tab-contents', 'margin-top: -1px;');

                AddCSSRule('', '.it-tabs-overflow.hide-buttons [role="button"]', 'display: none');
                AddCSSRule('', '.it-tabs-overflow.hide-buttons .it-tab-links', 'margin-left: 0');

                AddCSSRule('', '.it-tabs-container.touch', 'position: relative;');
                AddCSSRule('', '.it-tabs-container.touch .it-tabs-overflow', 'position: initial; overflow: auto;');
                AddCSSRule('', '.it-tabs-container.touch [role="button"]', 'color: #999;');
            }
        }

        it.tabs.version = '1.0';
        it.tabs._navMousedownID = -1;
        it.tabs._navMouseStep = 10;

        it.tabs.toggle = function(e, id){
            // Declare all variables
            var i, tabcontent, tablinks;

            // Get all elements with class="tabcontent" and hide them
            tabcontent = it(e.target).parents(".it-tabs-container").querySelectorAll("[role=tabpanel]");
            for(i = 0; i < tabcontent.length; i++){
                tabcontent[i].style.display = "none";
            }

            // Get all elements with class="tablinks" and remove the class "active"
            tablinks = it(e.target).parents('.it-tab-links').querySelectorAll("[role=tab]")
            for(i = 0; i < tablinks.length; i++){
                tablinks[i].classList.remove('active')
            }

            // Show the current tab, and add an "active" class to the button that opened the tab
            document.getElementById(id).style.display = "block";
            e.target.classList.add("active");
        }

        it.tabs.resize = function(){
            var otabs = document.querySelectorAll(".it-tabs-overflow");
            for(var i = 0; i < otabs.length; i++){
                var tab = otabs[i];

                if(tab.offsetWidth > tab.querySelector(".it-tab-links").offsetWidth - 10){
                    tab.classList.add("hide-buttons");
                    tab.querySelector(".it-tab-links").style.left = '0';

                } else {
                    tab.classList.remove("hide-buttons")
                }
            }
        }

        it.tabs.initOverflowMode = function(cfg){
            var large = 'normal';
            if(cfg.images && cfg.images.length != 0) large = "large";

            var nto = document.createElement("div");
            nto.classList.add("it-tabs-overflow");
            nto.appendChild(cfg.target)

            cfg.target = nto;

            // Añadimos botón a la izquierda
            var prev = document.createElement("button");
            prev.setAttribute("role", 'button');
            prev.setAttribute("tabindex", '0');
            prev.type = 'button';
            prev.classList.add("it-tab-prev", large);
            prev.innerHTML = '&#11207;';

            // Añadimos botón a la derecha
            var next = document.createElement("button");
            next.setAttribute("role", 'button');
            next.setAttribute("tabindex", '0');
            next.type = 'button';
            next.classList.add("it-tab-next", large);
            next.innerHTML = '&#11208;';

            cfg.target.insertAdjacentElement("afterbegin", prev);
            cfg.target.insertAdjacentElement("beforeend", next);

            prev.setAttribute("onmousedown", "it.tabs.navMousedown(event)");
            prev.setAttribute("onmouseup", "it.tabs.navmouseup(event)");
            next.setAttribute("onmousedown", "it.tabs.navMousedown(event)");
            next.setAttribute("onmouseup", "it.tabs.navmouseup(event)");
        }

        it.tabs.navMousedown = function(event){
            if(it.tabs._navMousedownID == -1){
                it.tabs._navMousedownID = setInterval(function(){
                    it.tabs.whileNavMousedown(event);
                }, 20);
            }
        };

        it.tabs.navmouseup = function(event){
            if(it.tabs._navMousedownID != -1){
                clearInterval(it.tabs._navMousedownID);
                it.tabs._navMousedownID = -1;
            }
        };

        it.tabs.whileNavMousedown = function(e){
            var trg = e.target;
            var px = null;
            var width = trg.offsetWidth;

            if(trg.classList.contains("it-tab-next")){
                trg = trg.previousElementSibling;
                px = trg.offsetLeft - width;

                if(Math.abs(trg.offsetLeft) + trg.parentElement.offsetWidth < trg.offsetWidth){
                    px -= it.tabs._navMouseStep;
                    trg.style.left = px + 'px';
                }

            } else {
                trg = trg.nextElementSibling;
                px = trg.offsetLeft - width;

                px += it.tabs._navMouseStep;
                if(Math.abs(px) < it.tabs._navMouseStep) px = 0;

                trg.style.left = px + 'px';
            }
        }
    }

    /**
    	 TreeView plugin
    	@version: 1.3
    	@author: Pablo E. Fernández (islavisual@gmail.com).
    	@Copyright 2017-2022 Islavisual.
    	@Last update: 12/01/2022
    **/
    if(json.Treeview){
        this.Treeview = it.treeview = function(cfg){
            if(cfg == undefined) cfg = {};

            if((typeof cfg == "string" && cfg == "help") || cfg.hasOwnProperty("help")){
                if(typeof showHelper != "undefined") showHelper("Treeview", cfg);
                else alert("Helper not available!")
                return;
            }

            // Checking data
            if(typeof cfg.hasOwnProperty('id') && cfg.hasOwnProperty('checked')){
                var opt = it[it.targets[0]].options;
                checkID();
                return;
            }

            // Creamos el JSON con la configuración por defecto
            var opt = {};
            if(it.targets[0].classList.contains("it-treeview")){
                it.targets[0].innerHTML = "";
                it.targets[0].classList.remove("it-treeview");
                opt = it[it.targets[0].id].options;
            } else {
                opt = {
                    classLeaf: !cfg.hasOwnProperty('classLeaf') ? 'leaf-node' : cfg.classLeaf,
                    callback: !cfg.hasOwnProperty('callback') ? null : cfg.callback,
                    collapsedIcon: !cfg.hasOwnProperty('collapsedIcon') ? '\u25BA' : cfg.collapsedIcon,
                    customCheck: !cfg.hasOwnProperty('customCheck') ? '' : cfg.customCheck,
                    customSearch: !cfg.hasOwnProperty('customSearch') ? null : cfg.customSearch,
                    customSearchWhen: !cfg.hasOwnProperty('customSearchWhen') ? 'auto' : cfg.customSearchWhen,
                    data: null,
                    expandedIcon: !cfg.hasOwnProperty('expandedIcon') ? '\u25BC' : cfg.expandedIcon,
                    leafIcon: !cfg.hasOwnProperty('leafIcon') ? '' : cfg.leafIcon,
                    label: !cfg.hasOwnProperty('label') ? 'label' : cfg.label,
                    branchIcon: !cfg.hasOwnProperty('branchIcon') ? '' : cfg.branchIcon,
                    onSelectNode: !cfg.hasOwnProperty('onSelectNode') ? null : cfg.onSelectNode,
                    onCheckNode: !cfg.hasOwnProperty('onCheckNode') ? null : cfg.onCheckNode,
                    selectable: !cfg.hasOwnProperty('selectable') ? false : cfg.selectable,
                    searchable: !cfg.hasOwnProperty('searchable') ? false : cfg.searchable,
                    placeholderText: !cfg.hasOwnProperty('placeholderText') ? 'Filter...' : cfg.placeholderText,
                    updateOnExpandNode: !cfg.hasOwnProperty('updateOnExpandNode') ? false : cfg.updateOnExpandNode, 
                    styles: !cfg.hasOwnProperty('styles') ?{ bgTree: "rgba(0,0,0,0)", borderTree: "rgba(0,0,0,0.15)", textColor: "#000", searchColor: "#000", searchBg: "#fff", activeColor: "#ffffff", activeBg: "#000000", linkColor: "#069", linkBg: "rgba(0,0,0,0)" } : cfg.styles,
                    stylesheet: !cfg.hasOwnProperty('stylesheet') ? false : cfg.stylesheet,
                    target: it.targets[0],
                }
            }

            // Actualizamos los valores pasados por parámetro
            for(var key in cfg){ opt[key] = cfg[key]; }

            // If configuration object is invalid
            if(!opt.data){ alert("Se necesita establecer un conjunto de datos. Por favor, consulta la ayuda. Helper('Treeview');"); return false; }
            if(!opt.customSearch && opt.updateOnExpandNode && opt.searchable){ alert("Se necesita establecer una función de búsqueda personalizada a través de la propiedad 'customSearch'. Por favor, consulta la ayuda. Helper('Treeview');"); return false; }

            // function to check one item
            function checkID(){
                opt.target.querySelector("input[data-id='" + cfg.id + "']").checked = cfg.checked;
            }

            function _addCSSRules(){
                AddCSSRule('', "ul.it-treeview", "background: " + opt.styles.bgTree + "; width: 100%; border: 1px solid " + opt.styles.borderTree + "; padding: 5px;");
                AddCSSRule('', "ul.it-treeview, ul.it-treeview ul", "list-style: none;", 0);
                AddCSSRule('', "ul.it-treeview li", "color: " + opt.styles.textColor + ";");
                AddCSSRule('', "ul.it-treeview li i", "cursor: pointer;");
                AddCSSRule('', "ul.it-treeview li i.toggler *", "pointer-events: none;");
                AddCSSRule('', "ul.it-treeview li ul", "transition: 0.3s; max-height: 10000px; overflow: hidden;");
                AddCSSRule('', "ul.it-treeview li ul li", "padding-left: 15px;");
                AddCSSRule('', "ul.it-treeview li.collapsed ul", "max-height: 0;");
                AddCSSRule('', "ul.it-treeview li a", "color: " + opt.styles.linkColor + "; background: " + opt.styles.linkBg + ";");
                AddCSSRule('', "ul.it-treeview li label", "padding: 2px 5px; display: inline-block;");
                AddCSSRule('', "ul.it-treeview li i.icon", "margin-right: 8px;");
                AddCSSRule('', "ul.it-treeview li.search-box input", "width: 100%; background: " + opt.styles.searchBg + "; color: " + opt.styles.searchColor + "; border: 1px solid rgba(0,0,0,0.1)");
                AddCSSRule('', "ul.it-treeview li .active", "background: " + opt.styles.activeBg + "; color: " + opt.styles.activeColor + ";");
                AddCSSRule('', 'ul.it-treeview input[type="checkbox"]:focus, ul.it-treeview input[type="checkbox"]:focus::before', 'border-color: #000;');
                AddCSSRule('', 'ul.it-treeview input[type="checkbox"]:focus + label', 'background: #000;color: #fff;');
            }

            function init(){
                // Add rules
                if(!opt.stylesheet){
                    _addCSSRules();
                }

                if(typeof opt.data == "string" && opt.data.indexOf("url(") == 0){
                    if(it.httpRequest){
                        HttpRequest({
                            url: opt.data.substr(3).replace(/^(\(|\))+|(\(|\))+$/g, ''),
                            contentType: "application/json; charset=utf-8",
                            ajax: true,
                            callback: function(e){
                                if(typeof e == "string") e = JSON.parse(e);
                                this.data = e;

                                // Render tree
                                it.treeview.render(e.items, this.target, 0, this);

                                // Assign events to element
                                it.treeview.assignEvents(this);

                                if(this.callback){ this.callback(e) }
                            }.bind(opt)
                        });
                    } else {
                        alert("HttpRequest must be enabled. Please, reviewed your IsiTools library!!")
                    }
                } else {
                    // Render tree
                    it.treeview.render(opt.data.items, opt.target, 0, opt);

                    // Assign events to element
                    it.treeview.assignEvents(opt);
                }

                
            }

            init();

            it.treeview[opt.target.id] = {};
            it.treeview[opt.target.id].options = opt;

            return it.treeview;
        }

        it.treeview.assignEvents = function(opt){
            // Event to set active node when this is focused
            if (opt.selectable) {
                var items = opt.target.querySelectorAll("label");
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];

                    if (item.classList.contains("no-select")) continue;

                    item.onclick = function (e) {
                        var lbl = e.target;

                        // Reset active items
                        var items = opt.target.querySelectorAll("label");
                        for (var i = 0; i < items.length; i++) {
                            items[i].classList.remove("active");
                        }

                        lbl.classList.toggle("active");

                        if (opt.onSelectNode) opt.onSelectNode(lbl);
                    };
                }
            } else {
                var items = opt.target.querySelectorAll("label");
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];

                    try { item.setAttribute("for", item.previousElementSibling.id); } catch (e) { }
                }
            }

            // Event to set active node when this is focused
            var items = opt.target.querySelectorAll("input");
            for (var i = 0; i < items.length; i++) {
                var item = items[i];

                item.onchange = function (e) {
                    if (opt.onCheckNode) opt.onCheckNode(e.target);
                };
            }

            // Filter elements from Treeview
            if (opt.searchable) {
                var typeSearch = opt.customSearchWhen == 'auto' ? "input" : (opt.customSearchWhen == "enter" ? "keydown" : opt.customSearchWhen);
                if (!opt.updateOnExpandNode) {
                    
                    opt.target.querySelector('[type=search]')['on' + typeSearch] = function (e) {
                        var items = e.target.parentElement.parentElement.parentElement.querySelectorAll("li:not(.search-box)"), str = e.target.value.trim();
                        
                        if(this.customSearchWhen == "enter"){
                            var key = e.key || e.which || e.keyCode;
                            if(key != "Enter" && key != "NumpadEnter" && key != 13){
                                return;
                            }
                        }
                    
                        for (var x = 0; x < items.length; x++) {
                            var item = items[x];

                            item.style.display = "";
                            if (str.length > 0 && item.querySelector("label").innerHTML.toLowerCase().indexOf(str.toLowerCase()) != -1) {

                                var aux = item.parentElement;
                                while (!aux.classList.contains("it-treeview")) {
                                    if (item.tagName.toLowerCase() == "li") {
                                        aux.style.display = "";
                                        if (aux.classList.contains("collapsed")) {
                                            aux.classList.remove("collapsed");
                                            aux.classList.add("expanded");
                                            aux.setAttribute("aria-expanded", 'true');
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
                                    item.setAttribute("aria-expanded", 'false');
                                    if (!item.classList.contains("leaf-node")) item.querySelector(".toggler").innerHTML = opt.collapsedIcon;
                                }
                            } else {
                                item.style.display = "";
                                if (item.classList.contains("collapsed")) {
                                    item.classList.remove("collapsed");
                                    item.classList.add("expanded");
                                    item.setAttribute("aria-expanded", 'true');
                                    if (!item.classList.contains("leaf-node")) item.querySelector(".toggler").innerHTML = opt.expandedIcon;
                                }
                            }
                        }
                    }.bind(opt);
                } else {
                    opt.target.querySelector('[type=search]')['on' + typeSearch] = function (e) {
                        if(this.customSearchWhen == "enter"){
                            var key = e.key || e.which || e.keyCode;
                            if(key != "Enter" && key != "NumpadEnter" && key != 13){
                                return;
                            }
                        }

                        opt.customSearch(e.target);
                    }.bind(opt);
                }
            }
        }

        it.treeview.render = function(items, target, level, opt){
            if(level == 0){
                target.classList.add("it-treeview");
                target.setAttribute("role", "tree");

                if(opt.searchable){
                    var form = document.createElement("form");
                    form.setAttribute("role", "search");
                    form.setAttribute("onsubmit", "return false")

                    var input = document.createElement("input");
                    input.setAttribute("type", "search");
                    input.setAttribute("placeholder", opt.placeholderText);
                    input.setAttribute("name", "twSearch");
                    input.setAttribute("autocomplete", "off");
                    input.setAttribute("aria-label", opt.placeholderText);

                    form.appendChild(input);

                    var li = document.createElement("li");
                    li.classList.add('search-box');
                    li.appendChild(form);

                    target.appendChild(li);
                }
            }

            for(var i = 0; i < items.length; i++){
                var item = items[i];

                // Set values by default
                item.expanded = item.hasOwnProperty('expanded') ? item.expanded : false;
                item.checkable = item.hasOwnProperty('checkable') ? item.checkable : false;
                item.checked = item.hasOwnProperty('checked') ? item.checked : false;

                // Create li item 
                var li = document.createElement("li");
                li.classList.add(item.expanded ? 'expanded' : 'collapsed');
                li.setAttribute("aria-expanded", item.expanded ? 'true' : 'false')
                li.setAttribute("role", "treeitem")
                li.classList.add('level-' + (level + 1));

                target.appendChild(li);

                // Insert toggler
                if(item.hasOwnProperty('children')){
                    var toggler = document.createElement("i");
                    toggler.setAttribute("class", "toggler");
                    toggler.innerHTML = item.expanded ? opt.expandedIcon : opt.collapsedIcon;
                    toggler.setAttribute("onclick", "it.treeview.handleClick(this)");

                    li.appendChild(toggler);
                }

                // Insert checkbox
                if(item.hasOwnProperty('checkable') && item.checkable && opt.customCheck.trim() == ''){
                    var chk = document.createElement("input");
                    chk.setAttribute("type", "checkbox");
                    chk.setAttribute("name", opt.target.id + "_twNode" + (level + "" + i));
                    chk.setAttribute("id", "tw_" + Math.random().toString(36).substr(2, 9));
                    if(item.hasOwnProperty("id")) chk.setAttribute("data-id", item.id);
                    chk.setAttribute("aria-label", item.label);

                    li.appendChild(chk);
                    if(item.checked) chk.setAttribute("checked", item.checked);

                } else if(item.hasOwnProperty('checkable') && item.checkable && opt.customCheck.trim() != ""){
                    li.innerHTML += opt.customCheck;
                }

                // Insert checkbox
                if(item.hasOwnProperty('href')){
                    var a = document.createElement("a");
                    a.setAttribute("href", item.href);
                    a.innerHTML = '<label ' + (item.hasOwnProperty("id") ? ('data-id="' + item.id + '"') : '') + '>' + item.label + '</label>';

                    li.appendChild(a);
                } else {
                    var s = document.createElement("label");
                    s.setAttribute("for", "tw" + item.id);
                    s.innerHTML = item[opt.label];

                    if(item.hasOwnProperty("selectable") && !item.selectable) s.classList.add("no-select");
                    if(item.hasOwnProperty("id")) s.setAttribute("data-id", item.id);

                    li.appendChild(s);
                }

                if(item.hasOwnProperty('children')){
                    var ul = document.createElement("ul");
                    ul.setAttribute("role", "group");
                    if(opt.hasOwnProperty('branchIcon')){
                        li.innerHTML = '<i class="icon">' + opt.branchIcon + "</i>" + li.innerHTML;
                    }

                    li.appendChild(ul);

                    it.treeview.render(item.children, ul, level + 1, opt);
                } else {
                    if(opt.classLeaf.trim() != "") li.classList.add(opt.classLeaf);
                    if(opt.hasOwnProperty('leafIcon')){
                        li.innerHTML = '<i class="icon">' + opt.leafIcon + "</i>" + li.innerHTML;
                    }
                }
            }
        }

        it.treeview.handleClick = function(trg){
            var options = it.treeview[it(trg).parents(".it-treeview").id].options;

            if(options.updateOnExpandNode && trg.parentElement.querySelector("ul") && trg.parentElement.querySelector("ul").querySelectorAll("li").length == 0){
                options.updateOnExpandNode(trg.nextElementSibling)

            } else {
                it.treeview.updateToggler(trg)
            }
        }

        it.treeview.updateToggler = function(trg){
            var options = it.treeview[it(trg).parents(".it-treeview").id].options;

            trg.parentElement.classList.toggle("collapsed");
            if(trg.parentElement.classList.contains("collapsed")){
                trg.parentElement.setAttribute("aria-expanded", 'false');
            } else {
                trg.parentElement.setAttribute("aria-expanded", 'true');
            }
            trg.innerHTML = trg.parentElement.classList.contains("collapsed") ? options.collapsedIcon : options.expandedIcon;
        }
    }

    /**
    	 Validator functionality
    	@version: 2.0
    	@author: Pablo E. Fernández (islavisual@gmail.com).
    	@Copyright 2017-2022 Islavisual.
    	@Last update: 22/03/2021
    **/
    if(json.Validator){
        this.Validator = it.validator = function(cfg){
            if(cfg == undefined) cfg = {};

            if(cfg.hasOwnProperty("stylesheet")) cfg.stylesheet = false;

            // Recorremos todos los resultados que devuelve la función constructora
            Array.prototype.slice.call(this.targets).forEach(function(target, idx){
                // Assign options and mandatories
                var msg = it.validator._assignOptions(cfg);
                if(msg != "") return it.validator._showErrorMessage(msg);

                if(cfg.type != 'universal') target.type = cfg.type;

                // Set required attribute
                if(cfg.hasOwnProperty("required") && cfg.required) target.setAttribute("required", "required");

                // Set pattern attribute
                if(cfg.hasOwnProperty("pattern")) target.setAttribute("pattern", cfg.pattern);

                // Set options object
                cfg.target = target;
                it.validator.opt = cfg;

                if(cfg.type == "file"){
                    it.validator._fileset(cfg, msg);

                } else if(cfg.custom){
                    it.validator._newValidation('input', cfg.custom);

                } else {
                    var aux, auxi, auxv;
                    if(cfg.hasOwnProperty("oninvalid")){
                        it.validator.onInvalid(cfg.oninvalid);

                    } else {
                        // Get constraints and values
                        if(cfg.hasOwnProperty("constraint")){
                            var p = '!=|==|===|<|>|<=|>=';
                            var c = cfg.constraint.match(new RegExp('[' + p + ']', 'g'))
                            c = c != null ? c.join('') : '';
                            var v = cfg.constraint.match(new RegExp('[^' + p + ']', 'g')).join('');
                        }

                        try{
                            eval("var auxTmp = " + cfg.constraint + ';')
                            if(auxTmp != cfg.constraint){
                                aux = '	if(' + cfg.constraint.replace(/this/ig, 'e.target') + '){\n __AUXV__ } else {\n __AUXI__ }';
                            }

                        } catch (e){
                            try{
                                p.split("|").forEach(function(el){
                                    if(cfg.constraint.indexOf(el) != -1 && cfg.constraint.indexOf("this") == -1){
                                        aux = 'if(' + cfg.constraint.replace(new RegExp(el, 'ig'), 'e.target.value' + el) + '){\n __AUXV__ } else {\n __AUXI__ }';

                                    } else if(cfg.constraint.indexOf("this") != -1){
                                        aux = 'if(' + cfg.constraint + '){\n __AUXV__ } else {\n __AUXI__ }';
                                    }
                                });
                            } catch (e){
                                it.validator._showErrorMessage('La restricción o condición no tiene un formato válido.\n\nSi se desea usar el valor actual del elemento de formulario tratado puede usarse la palabra reservada "this" (pe: this.value), en vez de "event" o cualquiera de sus equivalencias (pe: event.target.value ó e.target.value).\n\nPor favor, utiliza el atributo "onInvalid" para definir la restricción o consulta Helper(\'validator\');')
                                return;
                            }
                        }

                        // If display is enable, the message is added and displayed
                        var fa = it.validator._display(cfg) ? '	Validator.addMessage(e.target);\n' : '';
                        var fr = it.validator._display(cfg) ? '	if(e.target.nextElementSibling != null && e.target.nextElementSibling.classList.contains("it-validator-error-msg")) e.target.nextElementSibling.remove();\n' : '';

                        auxv = '	e.target.setCustomValidity("");\n';
                        auxv += '	e.target.classList.remove("it-validator-error");\n';
                        auxv += fr;
                        auxi = '	e.target.setCustomValidity("' + cfg.message + '");\n';
                        auxi += '	e.target.classList.add("it-validator-error")\n';
                        auxi += fa;

                        it.validator._newValidation('invalid', auxi);
                        it.validator._newValidation('input', aux.replace(/__AUXV__/ig, auxv).replace(/__AUXI__/ig, auxi));
                    }
                }
            });

            if(!cfg.stylesheet){
                AddCSSRule('', '.validator-error', 'background: rgba(255, 0, 0, 0.2); box-shadow: 0 0 0 2px #f00 inset');
                AddCSSRule('', '.it-validator-error-msg', 'background: rgba(255, 0, 0, 0.2); color: rgba(255, 255, 255, 1); width: 100%; display: block; padding: 5px; border: 1px solid rgba(0, 0, 0, 0.2);');
            }
        }

        it.validator.opt = {};

        it.validator.addMessage = function(trg){
            var ns = trg.nextElementSibling;
            var exists = !ns ? false : ns.classList.contains("it-validator-error-msg");

            if(!exists){
                var aux = document.createElement("span");
                aux.setAttribute("class", "it-validator-error-msg");
                aux.innerHTML = trg.validationMessage;

                trg.parentNode.insertBefore(aux, trg.nextSibling);
            } else {
                ns.innerHTML = trg.validationMessage;
            }
        }

        it.validator.onInvalid = function(msg){
            // Not soported IE9- and Safari
            if(msg == null || msg == ""){ return this._showErrorMessage('Mensaje no válido.\n\nPor favor, consulta Helper(\'validator\');'); }

            this.opt.target.setAttribute("oninvalid", "this.setCustomValidity('" + this.opt.oninvalid + "'); this.classList.add('it-validator-error'); Validator.addMessage(this);");
            this.opt.target.setAttribute("oninput", "this.setCustomValidity(''); this.classList.remove('it-validator-error'); try{ this.nextElementSibling.remove(); } catch(e){}");
        }

        it.validator._assignOptions = function(cfg){
            var msg = "";

            // If it.target has value, set to cfg object
            if(!cfg.hasOwnProperty('target') && this.targets) cfg.target = this.targets[0].id;

            cfg.target = document.getElementById(cfg.target);
            this.opt = cfg;

            if(!cfg.hasOwnProperty('type')) this.opt.type = "universal";
            if(!cfg.hasOwnProperty('custom')) this.opt.custom = null;

            if((!cfg.hasOwnProperty('message') || cfg.message == "") && !cfg.hasOwnProperty('messages') && !cfg.hasOwnProperty("oninvalid") && !cfg.hasOwnProperty("custom")){
                msg = '¡Necesita configurar el parámetro "message" o "messages"!.\nPor favor, consulte la ayuda con el Helper(\'validator\')';
            }

            if(!cfg.hasOwnProperty('messages')){
                this.opt.display = !cfg.hasOwnProperty('display') ? true : cfg.display;
            }

            if(cfg.hasOwnProperty('messages')){
                if(!cfg.hasOwnProperty('maxsize')) this.opt.messages.maxsize = "";
                if(!cfg.hasOwnProperty('accept')) this.opt.messages.accept = "";
                if(!cfg.hasOwnProperty('display')) this.opt.messages.display = true;
            }
            return msg;
        }

        it.validator._display = function(cfg){
            var f = false;
            if((cfg.hasOwnProperty("display") && cfg.display) || (cfg.hasOwnProperty("messages") && cfg.messages.hasOwnProperty("display") & cfg.messages.display)) f = true;

            return f;
        }

        it.validator._fileset = function(cfg){
            var fa = this._display(cfg) ? '		Validator.addMessage(e.target);\n' : '';
            var fr = this._display(cfg) ? '		try{ e.target.nextElementSibling.remove(); } catch(e){}\n' : '';

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
                aux += '		el.classList.add("it-validator-error");\n';
                aux += '		e.value = ""\n';
                aux += fa;
                aux += '		return false;\n';
                aux += '	} else {\n';
                aux += '		e.target.setCustomValidity("");\n';
                aux += '		e.target.classList.remove("it-validator-error");\n';
                aux += fr;
                aux += '		return false;\n';
                aux += '	}\n';
                aux += '}\n';
                this._newValidation('change', aux);
                this._newValidation('invalid', aux);
            }

            // Enabling preview
            if(cfg.hasOwnProperty("preview")){
                cfg.target.addEventListener("change", function(e){
                    var el = e.target;
                    if(el.files && el.files[0]){
                        var reader = new FileReader();
                        reader.onload = function(e){
                            cfg.thumbnail.innerHTML = '<img src="' + e.target.result + '"/>';
                        };
                        reader.readAsDataURL(el.files[0]);
                    }
                });
            }
        }

        it.validator._newValidation = function(type, fn){
            if(type == null || type == ""){ return this._showErrorMessage('El tipo de validación no es válida.\n\nPor favor, consulta Helper(\'validator\');'); }
            if(fn == null || fn == ""){ return this._showErrorMessage('El código de la función está vacío.\n\nPor favor, consulta Helper(\'validator\');'); }

            if(typeof fn == 'function'){
                fn = 'document.getElementById("' + this.opt.target.id + '").addEventListener("' + type + '", ' + fn.toLocaleString() + '\n);';
                eval(fn);

            } else {
                var prefix = '';
                if(this.opt.display) prefix = 'e.preventDefault();\n';

                fn = 'document.getElementById("' + this.opt.target.id + '").addEventListener("' + type + '", function(e){\n' + prefix + fn + '\n});';
                eval(fn);
            }


        }

        it.validator._showErrorMessage = function(msg){
            try{ Alert(msg.replace(/\n/g, '<br/>').replace(/\"(.*?)\"/ig, "<b>$1</b>")); } catch (e){ alert(msg); }
            return false;
        }

        it.validator.help = function(cfg){
            if(typeof cfg == "undefined") cfg = { help: '' };
            if(!cfg.hasOwnProperty("help")) cfg.help = '';

            if(typeof showHelper != "undefined") showHelper("Validator", cfg);
            else alert("Helper not available!")
            return;
        }
    }
}

// Enrichment of HTMLElements
HTMLInputElement.prototype.mask = it.mask;
HTMLSelectElement.prototype.picker = it.selectpicker;
HTMLInputElement.prototype.autoComplete = it.autocomplete;
NodeList.prototype.autoComplete = it.autocomplete;

// If ie, override some functions and methods
var e, r = navigator.userAgent;
it.browser = r.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
/trident/i.test(it.browser[1]) && (e = /\brv[ :]+(\d+)/g.exec(r) || [], it.browser[1] = "Internet Explorer", it.browser[2] = e[1])
it.browser = it.browser[1] == "Internet Explorer" ? "IE" : "W3C";
if(it.browser == "IE"){
    // Redefine Event Object
    function Event(type, json){
        if(!json) json = { bubbles: true, cancelable: true };
        var EV = document.createEvent('Event');
        EV.initEvent(type, json.hasOwnProperty("bubbles") ? json.bubbles : true, json.hasOwnProperty("cancelable") ? json.cancelable : true);
        return EV;
    }

    // Override KeyborarEvent
    function KeyboardEvent(type, json){
        // Creamos el evento de teclado
        var keyboardEvent = document.createEvent("KeyboardEvent");

        // Comprobamos el método de inicialización
        var initMethod = typeof keyboardEvent.initKeyboardEvent !==
            'undefined' ?
            "initKeyboardEvent" :
            "initKeyEvent";

        // Establecemos los valores por defecto
        if(!json.hasOwnProperty("bubbles")) json.bubbles = true;
        if(!json.hasOwnProperty("cancelable")) json.cancelable = true;
        if(!json.hasOwnProperty("ctrlKey")) json.ctrlKey = false;
        if(!json.hasOwnProperty("altKey")) json.altKey = false;
        if(!json.hasOwnProperty("shiftKey")) json.shiftKey = false;
        if(!json.hasOwnProperty("metaKey")) json.metaKey = false;
        if(!json.hasOwnProperty("location")) json.location = 0;

        if(initMethod == 'initKeyEvent'){
            keyboardEvent[initMethod](
                type,
                json.bubbles,
                json.cancelable,
                window,
                json.ctrlKey,
                json.altKey,
                json.shiftKey,
                json.metaKey,
                json.key.charCodeAt(), 0
            );

        } else {
            keyboardEvent[initMethod](
                type,
                json.bubbles,
                json.cancelable,
                window,
                json.key,
                json.location,
                (json.ctrlKey ? "Control" : " ") +
                (json.altKey ? "Alt" : " ") +
                (json.shiftKey ? "Shift" : " ") +
                (json.metaKey ? "Meta" : " ") +
                (json.metaKey ? "NumLock" : " "),
                false,
                window.navigator.language
            );
        }
        return keyboardEvent;
    }

    // Redefine remove method
    HTMLElement.prototype.remove = function(){
        try{
            this.parentElement.removeChild(this);
        } catch (e){}
    }
}

window.addEventListener("load", function(){
    if(it.slider) it('it-slider').slider.autoDraw();

    if(it.include){
        if(!this.Include.includedFiles){
            this.Include.includedFiles = true;
            (function(){ Include({ attribute: "auto-include", callback: typeof onPageReady == "function" ? onPageReady : null }); })()
        }
    }
    it.loading = false;    
}, false);
