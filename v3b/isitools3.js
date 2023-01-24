// Under construction
/** 
    @description Componente que permite realizar consultas al DOM como querySelectorAll, pero mejorado.
    @version 1.0
    @author Pablo E. Fernández Casado (pefc72@gmail.com)
    @Copyright 2017-2023 Islavisual.
    @param {void || string || object} selector - Es el selector CSS o elemento padre desde donde empezar a buscar.
    @param {object || string} parent - Es el selector CSS que se desea buscar, al igual que hace el método querySelectorAll.
    @returns {NodeList}
 **/
$ = function (selector, parent = document) {
    parent = typeof parent == "string" ? document.querySelector(parent) : parent;
    let aux = parent.querySelectorAll(selector);

    return aux.length == 1 ? aux[0] : aux;
}

/** 
    @description Propiedad que establece la longitud a 1 en cualquier elemento HTML. Esto nos sirve también para controlar si está vacío o es nulo.
    @version 1.0
    @author Pablo E. Fernández Casado (pefc72@gmail.com)
    @Copyright 2017-2023 Islavisual.
    @param {string} sel - Es el selector CSS que se desea coincida con los ancestros.
    @returns {NodeList}
 **/
HTMLElement.prototype.length = 1;

/** 
    @description Componente que permite recuperar todos los ancestros de un elemento en orden ascendente.
    @version 1.0
    @author Pablo E. Fernández Casado (pefc72@gmail.com)
    @Copyright 2017-2023 Islavisual.
    @param {string} sel - Es el selector CSS que se desea coincida con los ancestros.
    @returns {NodeList}
 **/
HTMLElement.prototype.parents = NodeList.prototype.parents = function (sel = '*') {
    let trg = document.createElement("div");
    let aux = this instanceof NodeList ? this[0] : this;

    for (let el = aux.parentElement; el && el !== document; el = el.parentNode) {
        if (el.matches(sel)) trg.insertAdjacentElement("afterbegin", el.cloneNode());
    }

    return trg.children.length == 1 ? trg.children[0] : trg.childNodes;
}

/**
    @description Devolver el primer elemento de los elementos de un NodeList
    @version 1.0
    @author Pablo E. Fernández (pefc72@gmail.com).
    @param {void} void No requiere de ningún parámetro o argumento.
    @Copyright 2017-2023 Islavisual.
    @Last update: 10/06/2020
**/
NodeList.prototype.first = function () { return this[0] }

/**
    @description Devolver el último elemento de los elementos de un NodeList
    @version 1.0
    @author Pablo E. Fernández (pefc72@gmail.com).
    @param {void} void No requiere de ningún parámetro o argumento.
    @Copyright 2017-2023 Islavisual.
    @Last update: 10/06/2020
**/
NodeList.prototype.last = function () { return this[this.length - 1] }

/** 
    @description Averiguar si el elemento solicitado está visible o no en pantalla.
    @version 1.0
    @author Pablo E. Fernández (islavisual@gmail.com)
    @Copyright 2017-2023 Islavisual.
    @param {void} void No requiere de ningún parámetro o argumento.
    @returns {boolean} Verdadero o falso en de si está o no visible.
 **/
HTMLElement.prototype.isVisible = function () {
    if (!(this instanceof Element)) { console.info('Element not found!', this); return false; }
    let style = getComputedStyle(this);
    if (style.display === 'none') return false;
    if (style.visibility !== 'visible') return false;
    if (style.opacity < 0.1) return false;
    if (this.offsetWidth + this.offsetHeight + this.getBoundingClientRect().height +
        this.getBoundingClientRect().width === 0) {
        return false;
    }

    let itemProps = { x: this.getBoundingClientRect().left + this.offsetWidth / 2, y: this.getBoundingClientRect().top + this.offsetHeight / 2 };

    let pointContainer = document.elementFromPoint(itemProps.x, itemProps.y);
    if (!pointContainer &&
        this.closest("ul") &&
        !this.closest("ul").classList.contains("intellimenu") &&
        this.closest("ul").previousElementSibling &&
        !this.closest("ul").previousElementSibling.classList.contains("collapsed")) {
        pointContainer = this
    }

    if (pointContainer) {
        do {
            if (pointContainer === this) return true;
        } while (pointContainer = pointContainer.parentElement);
    }

    return false;
}

/**
    @description Oculta un elemento
    @version 1.0
    @author Pablo E. Fernández (islavisual@gmail.com)
    @Copyright 2017-2023 Islavisual.
    @param {Number} speed Es el valor con la que se oculta en milisegundos. Si es 0, sólo establece la propiedad 'display' a 'none' en su estilo en línea.
    @example document.querySelector("ul.subSecc").hide()
    @example document.querySelector("ul.subSecc").hide(300)
    @returns {void}
 **/
HTMLElement.prototype.hide = function (speed) {
    if (this) {
        if (typeof speed == undefined || speed == 0) {
            this.style.display = "none"

        } else {
            this.style.transition = "";
            this.style.display = "block";
            this.style.maxHeight = this.offsetHeight + "px";
            this.style.transition = "max-height " + speed + "ms ease";
            this.style.overflow = "hidden";

            setTimeout(function () { this.style.maxHeight = "0px"; }.bind(this), 0);
            setTimeout(function () { this.style.maxHeight = ""; this.style.transition = ""; this.style.overflow = ""; this.style.display = "none"; }.bind(this), speed);
        }
    }
}

/**
    @description Muestra un elemento
    @version 1.0
    @author Pablo E. Fernández Casado (islavisual@gmail.com)
    @Copyright 2017-2023 Islavisual.
    @param {Number} speed Es el valor con la que se muestra en milisegundos. Si es 0, sólo se elimina la propiedad 'display' del estilo en línea.
    @example document.querySelector("button + ul").show()
    @example document.querySelector("button + ul").show(300)
    @returns {HTMLElement} El propio elemento para continuar trabajando con él. 
  **/
HTMLElement.prototype.show = function (speed) {
    if (this) {
        if (typeof speed == undefined || speed == 0) {
            this.style.display = ""

        } else {
            this.style.transition = "";
            this.style.display = "block";
            const height = this.offsetHeight + "px";
            this.style.transition = "max-height " + speed + "ms ease";
            this.style.maxHeight = "0px";
            this.style.overflow = "hidden";

            setTimeout(function () { this.style.maxHeight = height; }.bind(this), 0);
            setTimeout(function () { this.style.maxHeight = ""; this.style.transition = ""; this.style.overflow = ""; this.style.display = ""; }.bind(this), speed);
        }
    }

    return this
}

/**
    @description Componente que ejecuta las funciones contenidas cuando la página no tenga ningún subproceso ni petición pendiente. Es un ONLOAD mejorado. Extraido de la librería isiTools 2.4.0
    @version 1.0
    @author Pablo E. Fernández (islavisual@gmail.com)
    @Copyright 2017-2023 Islavisual.
    @param fnWhenReady - Una función con lo que se desea ejecutar cuamdo se cumplan las condiciones.
        · Esta función puede ser anónima como es el caso del ejemplo que se muestra a continuación o una ya definida con nombre
    @external check - Es un objeto que se puede configurar para añadir comprobaciones externas durante el proceso de carga.
        · Este es el caso, por ejemplo, de si deseamos controlar que lo que hay dentro de "isReady" se ejecute, además, cuándo la función "IsAllLoaded" devuelva "true".
        · O también cuándo, por ejemplo, lo que hay dentro de "isReady" se ejecute, además, cuándo la variable "docIsLoaded" sea "true".
    @example 
        document.isReady.check = { 'pageReady': true }
        document.isReady(function(){
            // Intrucciones
        });
    @returns {void}
  **/
Document.prototype.isReady = function (fnWhenReady) {
    let myTimeout;
    let fireCallbacks = function (e) {
        if (document.isReady.IS_READY === true && document.isReady.LIST.length == 0) {
            // Ejecutamos las instrucciones solicitadas
            document.addEventListener('isReady', function () { fnWhenReady(); }, false);
            document.dispatchEvent(document.isReady.event);

            // Limpiamos el DOM
            document.removeEventListener('DOMContentLoaded', fireCallbacks.bind(this, 'DOM'), false);
            window.removeEventListener('load', fireCallbacks.bind(this, 'LOAD'), false);
            if (typeof jQuery == "function") { jQuery(document).unbind('ajaxComplete'); }

            fnWhenReady = function () { return false }

            // Regresamos al contexto normal
            clearTimeout(myTimeout);
            return;
        } else {
            myTimeout = setTimeout(function () {
                fireCallbacks(e);
            }, 50)
        }

        document.isReady.COUNTER--;
        document.isReady.LIST.splice(document.isReady.LIST.indexOf(e), 1)

        document.isReady.IS_READY = true;
    };

    let init = function () {
        document.isReady.addControl("READY");
        let intervalDocIsReady = setInterval(function () {
            if (document.readyState === 'complete') {
                fireCallbacks("READY");
                clearInterval(intervalDocIsReady)
            }
        }, 50);

        document.isReady.addControl("DOM");
        document.addEventListener('DOMContentLoaded', fireCallbacks.bind(this, 'DOM'), false);

        document.isReady.addControl("LOAD");
        window.addEventListener('load', fireCallbacks.bind(this, 'LOAD'), false);

        if (typeof jQuery == "function") {
            document.isReady.addControl("AJAX");
            jQuery(document).ajaxComplete(function (e) {
                fireCallbacks("AJAX");
            });

            document.isReady.addControl("ACTIVE");
            let intervaljQueryActive = setInterval(function () {
                if (jQuery.active === 0) {
                    fireCallbacks("ACTIVE");
                    clearInterval(intervaljQueryActive)
                }
            }, 50);
        }

        if (typeof document.isReady.check == "object") {
            let intervalsCheck = [];
            for (let key in document.isReady.check) {
                document.isReady.addControl("CHECK" + key);

                for (let b in window) { if (b == key) vKey = b; }

                intervalsCheck[key] = setInterval(function (key, vKey) {
                    if (typeof window[key] != "function" && vKey == key && window[vKey] == document.isReady.check[key]) {
                        fireCallbacks("CHECK" + key);
                        clearInterval(intervalsCheck[key])
                    }
                    if (typeof window[key] == "function" && window[vKey]() == document.isReady.check[key]) {
                        fireCallbacks("CHECK" + key);
                        clearInterval(intervalsCheck[key])
                    }

                }.bind(this, key, vKey), 50);
            }
        }
    };

    init();
}

Document.prototype.isReady.addControl = function (p) {
    document.isReady.COUNTER++;
    document.isReady.LIST.push(p);
}

Document.prototype.isReady.event = new Event("isReady");

Document.prototype.isReady.IS_READY = false;
Document.prototype.isReady.COUNTER = 0;
Document.prototype.isReady.LIST = [];
Document.prototype.isReady.check = null;

Document.prototype.addRule = function (selector, styles, index, sheet) {
    let s, r, itS = document.getElementById("isiToolsStyles");

    // Get style sheet
    if (sheet == null || sheet == "") {
        if (itS == null) {
            let style = document.createElement("style");
            style.setAttribute("id", "isiToolsStyles");
            style.setAttribute("media", "screen");

            // Add style tag to head
            document.head.insertBefore(style, document.head.firstChild);
            s = style.sheet;
        } else {
            s = itS.sheet;
        }
    } else {
        if (typeof sheet == "number") s = document.styleSheets[sheet];
        else if (typeof sheet == "object") s = sheet;
        else console.log("sheet not avilable!")
    }


    // Get rules
    let rText = s.cssRules || s.rules;
    index = typeof index == "undefined" ? rText.length : index;

    for (let i = 0; i < index; i++) {
        r = rText[i];

        if (typeof r.selectorText != "undefined" && r.selectorText.trim() == selector.trim()) {
            s.deleteRule(i);
            index--;
            break;
        }
    }

    // Insert rule
    if (styles == undefined) {
        try { s.insertRule(selector); } catch (e) { }

    } else {
        try { s.insertRule(selector + "{ " + styles + " } ", index); } catch (e) { }
    }
}

Document.prototype.addRule.help = function (cfg) {
    if (typeof cfg == "undefined") cfg = { help: '' };
    if (!cfg.hasOwnProperty("help")) cfg.help = '';

    if (typeof showHelper != "undefined") showHelper("addRule", cfg);
    else alert("Helper no disponible!")
    return;
}

/**
    @description Funcionalidad para crear desplegables personalizados. Extraída de isiTools 3.0b 
    @version 1.0
    @author Pablo E. Fernández (islavisual@gmail.com)
    @param {Object} cfg Es la configuración del desplegable personalizado. Entre las propiedades permitidas tenemos:
        - placeholder: Establece una descripción como título interno. Por defecto es vacío
        - filter: Establece si se debe mostrar una caja de texto para encontrar elementos. Por defecto está a false
        - multiple: Establece si el desplegable permite la selección de varios elementos o sólo uno. Por defecto no está definido
        - summarized: Permite establecer la forma de mostrar los elementos seleccionados. Si está a true, aparecerá el primer elemento seleccionado o el número de opciones seleccionadas de modo textual (p.e., 3 opciones seleccionadas). Por defecto está a false
        - lang: Permite establecer una traducción para las acciones internas. Por defecto está en español y debe establecerse a través de la llamada al componente, desde JavaScript
        - callback: Esta funcionalidad sólo está disponible a través de JavaScript, pero su objetivo es el mismo que onchange. Por defecto está a null, es decir, está desactivado
        - stylesheet: Establece si se deben cargar los estilos predeterminados del componente o se definirán a través de un método o archivo externo CSS. Por defecto se produce la carga de las reglas básicas de estilo para el componente
        - style: Establece los estilos que se deben aplicar al elemento raíz del desplegable personalizado. Por defecto no se aplica nada que no esté ya aplicado por el parámetro stylesheet.
    @example 
        document.querySelectorAll("select.customize").each(function(item){
            item.customize({style: {height: 'auto'}});
        });
    @returns {void}
  **/
HTMLSelectElement.prototype.customize = function (cfg) {
    if (typeof cfg == "undefined") cfg = { searcher: false, stylesheet: false, style: {}, callback: null, multiple: false, summarized: false };

    cfg.version = '1.0';

    this.customize.id = this.id;
    this.curIndex = -1;
    this.config = cfg;

    if (!cfg.hasOwnProperty('stylesheet')) cfg.stylesheet = false;
    if (!cfg.hasOwnProperty('style')) cfg.style = {};
    if (!cfg.hasOwnProperty("callback")) cfg.callback = null;

    let aux = this.multiple;
    if (cfg.hasOwnProperty("multiple")) aux = cfg.multiple;
    cfg.multiple = aux;

    aux = this.classList.contains("summarized");
    if (cfg.hasOwnProperty("summarized")) aux = cfg.summarized;
    cfg.summarized = aux;

    aux = this.getAttribute("placeholder") || "";
    if (cfg.hasOwnProperty("placeholder")) aux = cfg.placeholder;
    cfg.placeholder = aux;

    if (!cfg.hasOwnProperty("lang")) {
        cfg.lang = {
            optionsSelectedText: 'opciones seleccionadas',
            noResults: 'Sin resultados',
            searchText: 'Buscar...',
            selectText: 'Borrar'
        }
    } else {
        if (!cfg.lang.hasOwnProperty("noResults")) cfg.lang.noResults = "Sin resultados";
        if (!cfg.lang.hasOwnProperty("searchText")) cfg.lang.searchText = "Buscar...";
        if (!cfg.lang.hasOwnProperty("optionsSelectedText")) cfg.lang.optionsSelectedText = "opciones seleccionadas";
        if (!cfg.lang.hasOwnProperty("selectText")) cfg.lang.selectText = "Seleccione opción/es";
    }

    // Select needs a searcher?
    if ((cfg.hasOwnProperty("searcher") && cfg.searcher) || (this.getAttribute("filter") != null && this.getAttribute("filter") == "true")) cfg.searcher = true;
    else cfg.searcher = false;

    // Priorize json configuration
    if (!cfg.multiple) this.removeAttribute("multiple");
    if (!cfg.searcher) this.removeAttribute("filter");
    if (!cfg.summarized) this.classList.remove("summarized");

    this.setAttribute("tabindex", "-1");

    if (this.tagName.toLowerCase() != "select") {
        alert("Error en el elemento #" + this.id + ". ¡Se necesita establecer un elemento SELECT como objetivo para crear el customize!. Por favor, consulta la ayuda con it.helper('customize');");
        return false;
    }

    // Start. Add layer will contents button and list
    var div = document.createElement("div");
    div.setAttribute("class", "custom-dropdown" + (this.classList.contains("summarized") || cfg.summarized ? " summarized" : ""));
    div.setAttribute("role", "combobox");
    div.setAttribute("aria-autocomplete", "both");
    div.setAttribute("aria-expanded", "false");
    div.setAttribute("aria-haspopup", "true");
    div.setAttribute("aria-owns", "it-sp-options-" + this.id);
    div.setAttribute("aria-activedescendant", "");

    // Add button will contents the selected text
    var btn = document.createElement("button");
    btn.setAttribute("id", this.id + "trigger");
    btn.setAttribute("class", "custom-dropdown-trigger");
    btn.setAttribute("data-id", this.id);
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("type", "button");
    btn.setAttribute("tabindex", "0");

    // Management placeholder button select
    if (cfg.placeholder.trim() != "") {
        this.setAttribute("placeholder", cfg.placeholder.trim());
    } else {
        this.setAttribute("placeholder", cfg.lang.selectText.trim());
    }

    // Assign all select properties 
    for (var i = 0, atts = this.attributes, n = atts.length; i < n; i++) {
        var att = atts[i];
        if (att.name == "id" || att.name == "name" || att.name == "class" || att.name == "tabindex" || att.name.indexOf("on") == 0) continue;

        btn.setAttribute(att.name, att.value);
    }

    // If select was hidden, remove style
    btn.style.display = "";

    // Add events to button trigger
    btn.addEventListener("click", function (e) {
        var t = e.target, div = t.nextElementSibling;

        t.parentElement.classList.toggle("open");
        div.style.display = div.style.display === 'none' ? '' : 'none';

        // Set aria attributes
        t.setAttribute("aria-expanded", t.getAttribute("aria-expanded") == "false" ? "true" : "false");
        t.parentElement.setAttribute("aria-expanded", t.getAttribute("aria-expanded"));

        // Set focus into input search
        var t = t.parentElement;
        if (t.classList.contains("open") && t.querySelectorAll("input").length != 0)
            t.querySelector("input").focus();

        // Mark active
        var items = t.querySelectorAll("li"), btn = t.querySelector("button");
        for (var i = 0; i < items.length; i++) {
            var item = items[i];

            if (item.innerHTML == btn.innerText) {
                item.classList.add("custom-dropdown-active");
                this.parentElement.previousElementSibling.selectedIndex = i;
            } else {
                item.classList.remove("custom-dropdown-active");
            }
        }

        // Allocate scroll
        var active = t.querySelector('.custom-dropdown-active');
        var trg = t.querySelector("ul");
        if (active) trg.scrollTop = active.offsetTop - trg.offsetHeight + active.offsetHeight + 2;
    });

    let lblExist = document.querySelector("[for=" + this.id + "]");
    if (lblExist) {
        lblExist.setAttribute("for", btn.id);
    }

    window.addEventListener("click", this.customWindowListener);

    // Add dropdown-container
    var diC = document.createElement("div");
    diC.setAttribute("class", "dropdown-container");
    diC.setAttribute("style", "display: none");
    diC.id = "it-sp-options-" + this.id;

    // Add list with possibles values
    var lst = document.createElement("ul");
    lst.setAttribute("class", "dropdown options");
    lst.setAttribute("role", "listbox");

    // If autocomplete is requested
    var inp = document.createElement("input");
    inp.setAttribute("class", "input-search");
    inp.setAttribute("type", "search");
    inp.setAttribute("data-id", this.id);
    inp.setAttribute("placeholder", cfg.lang.searchText);
    inp.setAttribute("aria-label", cfg.lang.searchText);

    inp.addEventListener("input", function (e) {
        var trg = e.target, val = trg.value.trim(),
            ul = lis = trg.parentElement.nextElementSibling,
            lis = ul.querySelectorAll("li"), liCount = 0;

        if (ul.querySelector(".no-results")) ul.querySelector(".no-results").remove();

        for (var i = 0; i < lis.length; i++) {
            var li = lis[i];
            if (val != "" && li.innerText.toLowerCase().indexOf(val.toLowerCase()) == -1) {
                li.style.display = "none";
            } else {
                li.style.display = "";
                liCount++;
            }
        }

        if (liCount == 0) {
            let sel = trg.closest(".custom-dropdown").previousElementSibling;

            ul.insertAdjacentHTML("beforeend", '<li class="no-results" style="pointer-events:none">' + sel.config.lang.noResults + '</li>')
        }
    });

    // Keyboard management
    inp.addEventListener("keydown", function () {
        var e = arguments[0], trg = e.target, list;
        var select = trg.closest(".custom-dropdown").previousElementSibling;

        function getList(id) {
            var x = document.getElementById(id).nextElementSibling.querySelectorAll("li");
            return x;
        }

        function setActive(x, dir) {
            if (x >= 0 && x <= list.length - 1) list[x].classList.remove("custom-dropdown-active");

            function getNext() {
                if (dir == '+') x++;
                else x--;
                if (x >= list.length) x = 0;
                else if (x < 0) x = list.length - 1;

                return x;
            }

            x = getNext();
            while (list[x].style.display == "none") { x = getNext(); }

            list[x].classList.add("custom-dropdown-active");
            return x;
        }

        function setScrollTop(dir, trg) {
            try {
                trg = trg.parentElement.nextElementSibling;

                // Move scroll to current position
                let active = trg.querySelector('.custom-dropdown-active');
                if (dir == "down") {
                    trg.scrollTop = active.offsetTop - trg.offsetHeight + active.offsetHeight + 2;
                } else if (active.offsetTop < trg.scrollTop || document.querySelector('.custom-dropdown-active:last-child').offsetTop == active.offsetTop) {
                    trg.scrollTop = active.offsetTop - trg.offsetHeight + trg.offsetHeight + 2;
                }
            } catch (e) { }
        }

        if (select.config.searcher == false && [27, 38, 40, 13, 9, 116].indexOf(e.keyCode) == -1) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }

        if (e.keyCode == 27) {
            select.close(trg.parentElement.parentElement.parentElement)

        } else if (e.keyCode == 38) { // up
            list = getList(trg.dataset.id);

            select.curIndex = setActive(select.curIndex, '-');
            setScrollTop('up', trg);

        } else if (e.keyCode == 40) { // down
            list = getList(trg.dataset.id);
            select.curIndex = setActive(select.curIndex, '+');
            setScrollTop('down', trg);

        } else if (e.keyCode == 13 || e.keyCode == 9) {
            if (e.keyCode == 13) {
                e.preventDefault();
                e.stopImmediatePropagation();

                let sel = document.getElementById(trg.dataset.id);
                if (sel.multiple) {
                    let item = trg.parentElement.nextElementSibling.querySelector('.custom-dropdown-active');
                    item.querySelector("input").checked = !item.querySelector("input").checked;
                }

                list = getList(trg.dataset.id);
                document.getElementById(trg.dataset.id).curIndex = select.curIndex;

                select.update(select.curIndex);

                select.dispatchEvent(new Event('change'));
                if (sel.multiple) {
                    e.target.focus();

                } else {
                    select.close(select.nextElementSibling)
                    e.target.closest("[id]").previousElementSibling.focus();
                }

            } else {
                select.close(select.nextElementSibling)
            }

            return false;
        }
    }.bind(this.customize));

    // Create and add input picker
    var src = document.createElement("div");
    src.setAttribute("class", "search-box");
    src.appendChild(inp);

    // If search is disabled, hide searcher
    if (!cfg.searcher) src.style = 'opacity: 0; height: 0; overflow: hidden; min-height: inherit;';

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

    // Set aria multiple to DIV
    if (this.multiple) {
        div.setAttribute("aria-multiselectable", "true");
    } else {
        div.setAttribute("aria-multiselectable", "false");
    }

    // Create LIs from options select
    var items = this.querySelectorAll("option");
    for (var i = 0; i < items.length; i++) {
        var item = items[i];

        var li = document.createElement("li");
        li.setAttribute("rel", i);
        li.id = this.id + '_option_' + i;
        li.setAttribute("data-value", item.value);
        li.setAttribute("role", "option");

        if (this.config.multiple) {
            var chkLI = document.createElement("input");
            chkLI.id = "chk-" + this.id + li.getAttribute('rel') + i;
            chkLI.type = "checkbox";
            chkLI.checked = item.selected ? true : false;
            chkLI.setAttribute("onchange", 'this.closest(\'.custom-dropdown\').previousElementSibling.update(' + i + ')');

            var lbl = document.createElement("label");
            //lbl.setAttribute("for", chkLI.id)
            lbl.append(chkLI)
            lbl.append(document.createTextNode(item.innerText))

            li.append(lbl);

        } else {
            li.innerHTML = item.innerText;
            li.setAttribute("onclick", 'this.closest(\'.custom-dropdown\').previousElementSibling.update(' + i + ')');
        }

        if (item.getAttribute("selected") != null && item.getAttribute("disabled") == null) {
            li.setAttribute("class", "selected");

            div.setAttribute("aria-activedescendant", item.value)
        }

        lst.appendChild(li);
    }

    // Add components to layer
    diC.appendChild(lst);
    div.appendChild(btn);
    div.appendChild(diC);

    // Hide select and append new dropdown
    this.insertAdjacentElement("afterend", div);

    // Update custom select 
    Array.prototype.slice.call(this.selectedOptions).forEach(function (opt) {
        if (opt.getAttribute("selected") != null) this.update(opt.index, opt.selected, true)
    }.bind(this));

    // If original select has styles, inherit all
    if (this.style.length != 0) {
        var s = this.style, str = '';

        for (var i = 0; i < s.length; i++) {
            div.style[s[i]] = s[s[i]];
            btn.style[s[i]] = "";

            str = s[i] + ': ' + s[s[i]] + ';';
        }
        this.dataset.style = str;
    }

    // If caller function has presets styles
    if (Object.keys(this.config.style).length != 0) {
        var sKeys = Object.keys(this.config.style)
        sVals = Object.values(this.config.style), str = '';

        for (var i = 0; i < sKeys.length; i++) {
            div.style[sKeys[i]] = sVals[i];

            str = sKeys[i] + ': ' + sVals[i] + ';';
        }
    }

    // Add styles to select element
    this.style = 'border: 0 none; width: 0; height: 0; overflow: hidden !important; opacity: 0; padding: 0; margin: 0; position: absolute;';

    this.addEventListener("change", function (e) {
        var cfg = this.config

        if (cfg.callback) cfg.callback(e);
    });

    // Add default Styles
    if (!cfg.stylesheet) {
        document.addRule(".custom-dropdown", 'display: inline-block; width: auto; background: rgb(255, 255, 255); margin: 0px; padding: 0px; position: relative; min-width: 100px; min-height: 24px;');
        document.addRule(".custom-dropdown .dropdown-container", 'list-style: none; background: #fff; border: 1px solid rgba(0,0,0,0.1); padding: 5px; position: absolute; top: 100%; width: 100%; z-index: 99999;');
        document.addRule(".custom-dropdown ul", 'overflow: auto; max-height: 164px; padding: 0; list-style: none; margin: 0;');
        document.addRule(".custom-dropdown button", 'background: #fff; border: 1px solid rgba(0,0,0,1); font-size: 0.9rem; width: 100%; height: 100%; min-height: 24px; text-align: left; font-weight: 500; padding: 0 40px 0 5px; position: relative; margin: 0; line-height: 1.15rem; display: flex; flex-flow: row wrap;');
        document.addRule(".custom-dropdown button::before", 'content: ""; display: inline-block; width: 0; height: 0; margin-left: 2px; vertical-align: middle; border-top: 7px dashed; border-right: 7px solid transparent; border-left: 7px solid transparent; position: absolute; right: 8px; top: 8px; border-radius: 50px;');
        document.addRule(".custom-dropdown button:empty::after", 'content: attr(placeholder);');
        document.addRule(".custom-dropdown button:hover", 'border-color: #adadad;');
        document.addRule(".custom-dropdown.open button", ' background: #000; color: #fff;');
        document.addRule(".custom-dropdown li", 'border-bottom: 1px solid rgba(0,0,0,0.1); color: rgba(0,0,0,1); padding: 0 5px; line-height: 28px; margin: 0;');
        document.addRule(".custom-dropdown li:not(.search-box):hover", 'background: #000; color: #fff; cursor:pointer; ');
        document.addRule(".custom-dropdown .search-box", 'border-bottom: 1px solid rgba(0,0,0,0.1); height: auto; min-height: 28px; padding: 0px; position: relative; width: 100%;');
        document.addRule(".custom-dropdown .search-box .input-search", 'border: 0 none; border-radius: 0; font-size: 0.9rem; line-height: normal; height: auto; min-height: 32px; padding: 0 32px 0 5px; color: #000; width: 100%; z-index: 0;');
        document.addRule(".custom-dropdown .search-box svg", 'position: absolute; right: 8px; top: 8px; fill: #aaa; width: 15px');
        document.addRule(".custom-dropdown-active", 'background: #000; color: #fff !important;');
        document.addRule(".custom-dropdown > button:focus, select:focus + .custom-dropdown > button", 'outline: black auto 1px;;');
        document.addRule('.custom-dropdown input[type="search"]::-webkit-search-cancel-button', '-webkit-appearance: none; appearance: none;');
        document.addRule('.custom-dropdown input[type=search]::-ms-clear, .custom-dropdown input[type=search]::-ms-reveal', 'display: none; width: 0; height: 0;');
        document.addRule('.custom-dropdown label', 'user-select: none; width: 100%; display: inline-block; padding-left: 25px;');
        document.addRule('.custom-dropdown label input', 'position: relative; top: 0px; left: -25px;');
        document.addRule("[multiple] + .custom-dropdown:not(.summarized):not(.open) button", 'overflow: hidden');
        document.addRule("select:not([multiple]) + .custom-dropdown button", 'padding-top: 2px;');
        document.addRule(".custom-dropdown:not(.summarized).open button", 'overflow: inherit');
        document.addRule('.custom-dropdown button .tag', 'pointer-events: none; margin: 0 0 0 5px; padding: 2px 32px 2px 0; height: 100%; position: relative; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;');
        document.addRule('.custom-dropdown:not(.summarized) button .tag::after', 'content: "\\2713"; position: absolute; top: 1px; right: 5px;');
        document.addRule('.custom-dropdown.summarized button .tag', 'width: 100%;');
    }

    return div
}

HTMLSelectElement.prototype.selectedIndexes = function () {
    return Array.prototype.slice.call(this.selectedOptions).map(function (v) {
        return v.value;
    });
}

HTMLSelectElement.prototype.update = function (i, val, loading) {
    if (typeof loading == undefined) loading = false;

    // update HTML select
    var btn = this.nextElementSibling.children[0];
    var cfg = this.config;

    if (!this.multiple) {
        if (this[i] == undefined) return;

        this.selectedIndex = i;
        this.curIndex = i;

        // Update text in button
        btn.innerText = this[i].innerText;

        // Close customize list
        btn.nextElementSibling.style.display = "none"; // UL list options
        btn.setAttribute("aria-expanded", "false");
        btn.classList.remove("open");
        btn.setAttribute("aria-activedescendant", this[i].value);

    } else {
        if (this.options[i] == undefined) return;

        this.options[i].selected = val == undefined ? !this.options[i].selected : val;

        this.curIndex = this.selectedOptions.item(this.selectedOptions.length - 1).index;

        // Update text in button
        btn.innerHTML = "";

        if (cfg.summarized) {
            if (this.selectedOptions.length == 1) {
                btn.insertAdjacentHTML("beforeend", '<span class="tag">' + this.options[this.selectedIndex].innerText + '</span>');
            } else {
                btn.insertAdjacentHTML("beforeend", '<span class="tag">' + this.selectedOptions.length + " " + cfg.lang.optionsSelectedText + '</span>');
            }

        } else {
            Array.prototype.slice.call(this.selectedOptions).forEach(function (opt) {
                btn.insertAdjacentHTML("beforeend", '<span class="tag">' + opt.text + '</span>');
                //this.curIndex = opt.index;
            });
        }
    }

    if (!loading) {
        this.dispatchEvent(new Event('change'));
        btn.focus();
    }

};

HTMLSelectElement.prototype.customWindowListener = function (e) {
    if (document.querySelectorAll("div.custom-dropdown.open").length != 0) {
        var p = e.target;

        try {
            while (p != document && !p.classList.contains('custom-dropdown')) {
                p = p.parentNode;
            }
        } catch (e) { p == e.target; }

        if (p == document) {
            var items = document.querySelectorAll("div.custom-dropdown.open");
            for (var i = 0; i < items.length; i++) {
                let item = items[i];
                item.previousElementSibling.close(item)
            }
        }
    }
}

HTMLSelectElement.prototype.close = function (item) {
    item.classList.remove("open");
    item.querySelector(".dropdown-container").style.display = 'none';
    item.querySelector("button").setAttribute("aria-expanded", "false");
}

HTMLSelectElement.prototype.destroyCustomization = function () {
    let sel = document.getElementById(this.id);
    this.nextElementSibling.remove();
    this.style = sel.dataset.style;
    this.dataset.style = null;
    this.config = null;
    this.removeEventListener("click", this.customWindowListener);
}

/**
    @description Funcionalidad para crear máscaras de entrada en cajas de texto o elementos input
    @version 1.0
    @author Pablo E. Fernández (islavisual@gmail.com)
    @Copyright 2017-2023 Islavisual.
    @param {String} Cadena con la descripción del formato de entrada.
    @example it("#date").mask("DD-MM-YYYY");
    @returns {void}
  **/
HTMLInputElement.prototype.mask = function (cfg) {
    if (!cfg || cfg == "") { alert("Máscara no definida!!"); return false; }

    cfg.version = '1.0';

    this.mask.id = this.id;
    this.config = cfg;

    if (arguments.length == 0) {
        alert("No se ha definido la máscara")
        return;
    }

    // Set attributes
    cfg = this.config;

    this.setAttribute("placeholder", cfg);
    this.setAttribute("maxlength", cfg.length);
    this.setAttribute("minlength", cfg.length);

    this.type = "text";

    // Set paste event
    this.addEventListener('paste', function (e) {
        var EV = e;
        setTimeout(function () { this.mask.fullFormat(EV) }, 150);
    });

    // Set keyborad events
    this.addEventListener('keydown', function (e) {
        return this.mask._customEvent(e, this.mask.config);
    });

    return this;
}

HTMLInputElement.prototype.mask.getPositionCursor = function (e) {
    var p = 0, trg = e.target;

    if (document.selection) {
        trg.focus();

        var s = document.selection.createRange();
        s.moveStart('character', -trg.value.length);

        p = s.text.length;

    } else if (trg.selectionStart || trg.selectionStart == '0') {
        p = trg.selectionDirection == 'backward' ? trg.selectionStart : trg.selectionEnd;
    }

    return p;
}

HTMLInputElement.prototype.mask._customEvent = function (e, config) {
    var kc = e.keyCode, k = e.key[0], aok;

    // Check if ignore keys
    var _ignoreKeys = [8, 9, 13, 16, 17, 18, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123];
    if (_ignoreKeys.indexOf(kc) != -1) { return false; }
    if (e.ctrlKey) return true;

    // Check if char coincidence with mask
    var m = e.target.config.charAt(this.getPositionCursor(e));
    while (e.target.selectionEnd - e.target.selectionStart == 0 &&
        !/[9ADMYHIS#]/g.test(m) &&
        e.target.value.substr(e.target.selectionStart, 1) != m) {
        e.target.value += m;
        m = e.target.config.charAt(this.getPositionCursor(e));
    }

    aok = ('9DMYHIS'.indexOf(m) != -1 ? /\d/ : (m == 'A' ? /[a-zA-Z]/ : /./)).test(k);

    var reg, tmp = m, mg = true;
    switch (m) {
        case "D":
            reg = this.reDay;
            break;
        case "M":
            reg = this.reMonth;
            break;
        case "Y":
            reg = this.reYear;
            break;
        case "H":
            reg = this.reHour;
            break;
        case "I":
            reg = this.minute;
            break;
        case "S":
            reg = this.reSecond;
            break;
        case "#":
            reg = this.reAny;
            break;
        default:
            mg = false;
    }

    if (mg) {
        if ('DMYHIS'.indexOf(m) != -1) tmp = m + m;
        if (e.target.config.substr(e.target.config.indexOf(m) + 2, 1) == "Y") tmp = "YYYY";

        aok = aok ? this._check(tmp, reg, e) : false;
    }

    if (aok) {
        if (e.type == "paste") { e.target.value += k; }
    } else {
        return this._rollbackEvent(e);
    }

    return aok;
}

HTMLInputElement.prototype.mask.fullFormat = function (e) {
    var cfg = this.config;
    var v = e.target.value;
    e.target.value = "";

    for (var x = 0; x < v.length; x++) {
        if (cfg.replace(/[9ADMYHIS]/g, '').indexOf(v[x]) != -1) continue;

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
        if (!st) break;
    }
}

HTMLInputElement.prototype.mask._check = function (f, reg, e) {
    if (f == "#") return true;

    var cfg = e.target.config;

    var p = cfg.indexOf(f)
    var pmax = cfg.indexOf(f) + cfg.substr(cfg.indexOf(f), 4).length;
    var b = true;
    var v = e.target.value, k = e.key[0];
    var ss = e.target.selectionStart, se = e.target.selectionEnd;

    function MM(v, k) {
        var dd = (v + k).substr(cfg.indexOf('DD'), 2);
        var mm = (v + k).substr(cfg.indexOf('MM'), 2);
        var monthdays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var max = monthdays[parseInt(mm) - 1];

        return dd <= max;
    }

    function DD(v, k) { return /[0-9]/.test(k) }

    function YY(v, k) {
        var yy = 20 + v.substr(p, 2) + k
        var dd = (v + k).substr(cfg.indexOf('DD'), 2);
        var mm = (v + k).substr(cfg.indexOf('MM'), 2);

        var isleap = (yy % 100 === 0) ? (yy % 400 === 0) : (yy % 4 === 0);

        if (yy.length == 2 && ((mm != 2) || ((mm == 2 && dd > 29) || (mm == 2 && dd == 29 && !isleap)))) {
            return false
        } else return true;
    }

    function YYYY(v, k) {
        var yy = v.substr(p, 4) + k
        var dd = (v + k).substr(cfg.indexOf('DD'), 2);
        var mm = (v + k).substr(cfg.indexOf('MM'), 2);

        var isleap = (yy % 100 === 0) ? (yy % 400 === 0) : (yy % 4 === 0);

        if (yy.length == 4 && ((mm != 2) || ((mm == 2 && dd > 29) || (mm == 2 && dd == 29 && !isleap)))) {
            return false
        } else return true;
    }

    function HH(v, k) { return /^([0-1]?[0-9]|2[0-3])$/.test(k) }
    function II(v, k) { return /^([0-5]?[0-9]|2[0-3])$/.test(k) }
    function SS(v, k) { return /^([0-5]?[0-9]|2[0-3])$/.test(k) }

    if (f == 'YYYY' && ss == pmax - 1) {
        b = YYYY(v, k)

    } else if (f == 'YY' && ss == pmax - 1) {
        b = YY(v, k)

    } else if (f == 'MM' && ss == p + 1) {
        b = MM(v, k);

    } else {
        if (se - ss > 0) {
            e.target.value = v.substring(0, ss) + v.substring(se, v.length);
            v = e.target.value;
            e.target.selectionStart = ss;
            e.target.selectionEnd = ss;
        }

        eval('var aux = ' + f + '(v,k);');
        if (v != 0 && !aux) return aux;

        // rebuild new input value
        v = v.substr(0, ss) + k + v.substr(ss, v.length);
        v = parseInt(v.substr(cfg.indexOf(f), f.length))

        // Truncate 00 to 01 in day type
        var fb = false;
        if (f == "HH" && ss == p && k != 0) fb = /[0-2]/.test(k);
        else if (f == "II" && ss == p && k != 0) fb = /[0-5]/.test(k);
        else if (f == "SS" && ss == p && k != 0) fb = /[0-5]/.test(k);
        else if (f == "DD" && ss == p && k != 0) fb = /[0-3]/.test(k);
        else if (f == "MM" && ss == p && k != 0) fb = /[0-1]/.test(k);
        else if (f[0] == "Y" && ss < pmax) return /[0-9]/.test(k);

        if (!fb && ss == p && ((f == "DD" || f == "MM") || (k != 0 && (f == "HH" || f == "II" || f == "SS")))) {
            e.target.value = e.target.value.substr(0, ss) + '0' + e.target.value.substr(se);
        }

        // Add zero before if lower than 10
        v = v < 10 ? ("0" + v) : (v + "");

        b = new RegExp(reg).test(v);
        var aux = e.target.value.substring(0, 4) + k;
        if (f == "II" && aux.length == e.target.maxLength) {
            var msk = cfg.replace("HH", this.reHour).replace("II", this.reMinute).replace("SS", this.reSecond).replace(/\//g, '');
            b = new RegExp("^" + msk + "$").test(aux);
        }
    }

    return b;
}

HTMLInputElement.prototype.mask.reDay = /(0[1-9]|1[0-9]|2[0-9]|3[0-1])/;
HTMLInputElement.prototype.mask.reMonth = /(0[1-9]|1[0-2])/
HTMLInputElement.prototype.mask.reYear = /\d{4}/
HTMLInputElement.prototype.mask.reHour = /(0[0-9]|1[0-9]|2[0-3])/;
HTMLInputElement.prototype.mask.reMinute = /(0[0-9]|[1-5][0-9])/;
HTMLInputElement.prototype.mask.reSecond = HTMLInputElement.prototype.mask.Minute;
HTMLInputElement.prototype.mask.reAny = /./;

HTMLInputElement.prototype.mask._rollbackEvent = function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return false;
}
