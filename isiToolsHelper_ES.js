var WikiHelper = {}

/**
   AddCSSRule Helper																		
   @version: 1.00																					
   @author: Pablo E. Fernández (islavisual@gmail.com).												
   @Copyright 2017-2019 Islavisual. 																	
   @Last update: 05/04/2019																			
 **/

if(it.enabledModules.AddCSSRule){
	WikiHelper.AddCSSRule = {
		general: {
			version: 1.0,
			name: 'AddCSSRule',
			description: "Funcionalidad para crear y/o modificar reglas en las hojas de estilo. Esta función se alimenta de cuatro parámetros: sheet, selector, styles and index.",
		},
		sheet: {
			type: 'string',
			description: 'Este parámetro indica la hoja de estilo donde se insertará la regla. Puede tomar 3 valores:\n\t● <b>""</b>: indica que se debe crear una nueva hoja de estilo (creada al principio del encabezado de la página).\n\t● <b>Integer</b>: indica el número de índice o posición dentro del encabezado de página donde se insertó la hoja de estilo.\n\t● <b>Object</b>: indica un objeto CSSStyleSheet de JavaScript.',
			example: '// Insertar una regla en una nueva hoja de estilo\nAddCSSRule("", ".input", "background-color: lightgray; color: #333");\n\n// Insertar una regla nueva en la primera hoja de estilo.\nAddCSSRule(0, "#name", "background-color: lightgray; color: #333");\n\n// Insertar una nueva regla en la hoja de estilo extraida del objeto CSSStyleSheet e identificada por el índice 0\nAddCSSRule(document.styleSheets[0], "input", "background-color: lightgray; color: #333");',
		},
		selector: {
			type: 'string',
			description: 'Este parámetro se utiliza para definir el nombre de la regla. Se puede usar cualquier selector válido por CSS3.',
			example: 'AddCSSRule("", ".buttonIcon", "background-color: lightgray; color: #333");'
		},
		styles: {
			type: 'string',
			description: 'Este parámetro se utiliza para definir el contenido / estilos de la regla.',
			example: 'AddCSSRule("", "#name", "background-color: lightgray; color: #333");'
		},
		index: {
			type: 'string',
			description: 'Este parámetro indica la posición donde se insertará. Si este valor es 0, la regla se insertará al principio de la hoja de estilo, de lo contrario, se insertará al final de la hoja de estilo.\nEste parámetro es opcional.',
			example: 'AddCSSRule("", ".buttonIcon::after", "content:\'\'; background-color: lightgray; color: #333", 0);'
		},
	}
}

/**
   Alert Helper																		
   @version: 1.00																					
   @author: Pablo E. Fernández (islavisual@gmail.com).												
   @Copyright 2017-2019 Islavisual. 																	
   @Last update: 04/04/2019																			
 **/
if(it.enabledModules.Alert){
	WikiHelper.Alert = {
		general: {
			version: 1.0,
			name: 'Alert',
			description: "Script para crear alertas con múltiples personalizaciones similares a las de javaScript de forma sencilla.",
		},
		additional: [
			{
				description: 'Personalizar los estilos a través de las reglas CSS. Por ejemplo:',
				example: '_CSS_// styles.css (de tu sitio web)\n.Alert .btn-cancel { padding: 5px; border-radius: 0px; background-color: rgba(0, 0, 0, 0); border: 1px solid rgba(0, 0, 0, 0.1); color: rgb(0, 0, 0); }\n.Alert .btn-accept { padding: 5px; border-radius: 0px; background-color: rgb(224, 224, 224); border: 1px solid rgba(0, 0, 0, 0.1); color: rgb(0, 0, 0); }\n.Alert footer { position: relative; top: 5px; padding: 10px 10px 8px; height: auto; display: inline-block; width: 100%; margin: 0px; }\n.Alert .Alert-body { background-color: rgb(240, 0, 32); color: rgb(255, 255, 255); display: inline-block; width: 100%; padding: 10px; min-height: 100px; font-weight: 600; }\n.Alert header i { float: right; color: rgb(240, 240, 240); cursor: pointer; padding: 0px 2px; }\n.Alert header h3 { font-size: 14px; margin: 0px; color: rgb(240, 240, 240); display: inline-block; }\n.Alert header { padding: 10px 8px; background-color: rgb(208, 0, 16); border-bottom: 1px solid rgba(0, 0, 0, 0.1); color: rgb(240, 240, 240); }\n.Alert { width: 400px; margin: 100px auto 0px; background-color: rgb(240, 0, 32); overflow: hidden; color: rgb(255, 255, 255); }\n.Alert-overlay { position: fixed; background: rgba(0, 0, 0, 0.4); width: 100%; height: 100%; left: 0px; top: 0px; display: block; z-index: 999999; }\nbody.fixed { position: fixed; width: 100%; }\nbody.fixedOY { position: fixed; width: 100%; overflow-y: scroll; }_CSS_'
			}
		],
		theme: {
			type: 'string',
			description: 'Tema por defecto a utilizar.',
			example: 'new Alert({title: "Precaución!", body:"El campo se encuentra vacío.", theme: "dark"});'
		},
		class: {
			type: 'string',
			description: 'Agregar una regla de CSS a la alerta. Esto es útil si se desean definir alertas personalizadas a través de selectores CSS, por ejemplo.',
			example: 'new Alert({title: "Precaución!", body:"El campo se encuentra vacío.", class: "warning"});'
		},
		title: {
			type: 'string',
			description: 'Título de la alerta.',
			example: 'new Alert({title: "Precaución!", body:"El campo se encuentra vacío."});'
		},
		body: {
			type: 'string',
			description: 'Mensaje de la alerta.',
			example: '// Simply Alert\nAlert("El campo se encuentra vacío.");\n// Custom Alert\nnew Alert({title: "Precaución!", body:"El campo se encuentra vacío."});\n// HTML Alert\nnew Alert({title: "Precaución!", body:"&lt;span>Esto es una prueba&lt;/span> of &lt;b style=\'color: red\'>Alerta!&lt;/b>."});'
		},
		actions: {
			type: 'object',
			description: 'Personaliza las acciones de una alerta. Este parámetro debe contener una estructura tipo objeto con dos campos, "accept" y "cancel".\nLos campos pueden estar compuestos por los atributos "enabled", "class", "align" y "callback".',
			example: 'new Alert({\n\ttitle: "Precaución!",\n\tbody:"El campo se encuentra vacío.",\n\tactions:{\n\t\taccept: {\n\t\t\tenabled: true,\n\t\t\ttext: "Accept",\n\t\t\tclass: "btn btn-primary",\n\t\t\talignment: "right",\n\t\t\tcallback: function(e){\n\t\t\t\tconsole.log(e)\n\t\t\t}\n\t\t},\n\t\tcancel: {\n\t\t\tenabled: true,\n\t\t\ttext: "Cancel",\n\t\t\tclass: "btn btn-secondary",\n\t\t\talignment: "left",\n\t\t\tcallback: function(e){\n\t\t\t\tconsole.log(e)\n\t\t\t}\n\t\t}\n\t}\n});'
		},
		styles: {
			type: 'object',
			description: 'Personaliza los estilos de las alertas a través de JavaScript. Este parámetro debe contener una estructura tipo objeto con los campos "title", "body" y "actions".\nTodos los campos pueden estar compuestos por los atributos "background", "color" y "extra".',
			example: 'new Alert({\n\ttitle: "Precaución!",\n\tbody: "El campo se encuentra vacío.",\n\tstyles:{\n\t\ttitle: {\n\t\t\tbackground: "#f0f0f0",\n\t\t\tcolor: "#2f2f2f",\n\t\t\textra: ""\n\t\t},\n\t\tbody: {\n\t\t\tbackground: "#fff",\n\t\t\tcolor: "#000",\n\t\t\textra: ""\n\t\t},\n\t\tactions: {\n\t\t\taccept: {\n\t\t\t\tbackground: "#e0e0e0",\n\t\t\t\tcolor: "#000",\n\t\t\t\textra: ""\n\t\t\t},\n\t\t\tcancel: {\n\t\t\t\tbackground: "rgba(0,0,0,0)",\n\t\t\t\tcolor: "#000",\n\t\t\t\textra: ""\n\t\t\t}\n\t\t}\n\t}\n});'
		},
	}
}

/**
   Autocomplete Helper
   @version: 1.00
   @author: Pablo E. Fernández (islavisual@gmail.com).
   @Copyright 2017-2019 Islavisual.
   @Last update: 26/02/2019
 **/
if(it.enabledModules.Autocomplete){
	WikiHelper.Autocomplete = {
		general: {
			version: 1.0,
			name: 'Autocomplete',
			description: 'Permite buscar y seleccionar de una lista de valores previamente rellenada a medida que se escribe, aprovechando la búsqueda y el filtrado. Este componente podría considerarse una mejora del componente "select" que proporciona HTML. Es simple, fácil de personalizar y hace que el rendimiento de la página se vea poco afectado.',
		},
		additional: [
			{
				description: 'Puedes obtener toda la información del elemento seleccionado desde una función de devolución de llamada (callback). Por ejemplo:',
				example: '// Ejemplo\nnew Autocomplete({target: "catalogBox", data: arrayList, callback: callback});\n\n// La función "callback" devolverá una entrada similar a:\n// &lt;input type="hidden" data-id="catalogBox" data-index="2,3" value="nombre producto"&gt;\nfunction callback(input){\n\t// El elemento dónde se produjo el evento de autocompletado podría extraerse de:\n\tvar target = document.getElementById(inp.dataset.id);\n\t// Para el formato "cluster", además, podemos extraer el grupo y nombre del elemento\n\t// seleccionado a través del atributo "data-index":\n\tvar idx = inp.dataset.index.split(",");\n\tvar idxGroup  = idx[0];\n\tvar idxItem   = idx[1];\n\tvar itemGroup = clusterList[idxGroup].group;\n\tvar itemName  = clusterList[idxGroup].items[idxItem];\n}'
			}
		],
		autofocus: {
			type: 'boolean',
			description: 'Cuando el elemento toma el control, se dispara automáticamente un evento de autofoco. Por defecto es false.',
			example: 'new Autocomplete({target: "productID", data: arrayList, format: "list"})'
		},
		callback: {
			type: 'function',
			description: 'Función que se llamará cuando se seleccione un elemento de la lista de autocompletado.',
			example: 'new Autocomplete({target: "productID", data: arrayList, format: "list", callback: callback});\nfunction callback(event){\n\tconsole.log("Some action!", event);\n}'
		},
		className: {
			type: 'string',
			description: 'Clase CSS que se agregará a los elementos del complemento Autocompletar. Por defecto, el nombre de la clase de control es "autocomplete".',
			example: 'new Autocomplete({target: "catalogBox", data: arrayList, className: "auto-complete"});'
		},
		data: {
			type: 'object',
			description: 'Objeto con los elementos para manejar o tratar. Este objeto puede estar en formato "JSON" o estar en formato "Array".',
			example: 'new Autocomplete({target: "transportBox", data: arrayList});\nvar arrayList = ["Car", "Motorcycle", "Airplane", "Train", "Bicicle"];'
		},
		format: {
			type: 'string',
			description: 'Es el formato en el que se presentarán los datos. Según el formato en el que se presentan los datos, el objeto "data" debe definirse de una forma u otra. Este parámetro tiene como valor por defecto es "layer".\nLos posibles valores son:\n\t● "layer". \n\t● "table" (alimentado a partir de un JSON proporcionado por el parámetro "tableFields".)\n\t● "cluster"',
			example: '// Example with list format\nvar arrayList = ["Car", "Motorcycle", "Airplane", "Train", "Bicicle"];\nnew Autocomplete({target: "transportBox", format: "list", data: arrayList});\n\n// Example with table format\nvar countriesJSON = [\n\t{ id: 1, country: "Afghanistan", code: "AFG", capital: "Kabul" },\n\t{ id: 2, country: "Albania", code: "ALB", capital: "Tirane" },\n\t{...}\n];\nnew Autocomplete({target: "transportBox", format: "table", data: countriesJSON,\n\ttableFields: {\n\t\t"return_value": "id",\n\t\t"fields": ["country", "code", "capital"], "headers": ["Country", "Code", "Capital"]\n\t}\n});\n\n// Example with cluster format\nvar brandsList = [\n\t{ group: "Cars", items: ["Ford", "Seat", "Jaguar"] },\n\t{ group: "Motorcycles", items: ["Suzuki", "Ducati", "Hayley-Davidson"] },\n\t{ ... }\n];\nnew Autocomplete({target: "transportBox", format: "cluster", data: brandsList});'
		},
		target: {
			type: 'string',
			description: 'ID del input (campo de entrada de texto) dónde el Autocomplete será implementado.',
			example: 'new Autocomplete({target: "inputTextID", data: arrayList});\nvar arrayList = ["Car", "Motorcycle", "Airplane", "Train", "Bicicle"];'
		},
		minLength: {
			type: 'integer',
			description: 'Longitud mínima para comenzar a buscar dentro del objeto "data". Por defecto es 3.',
			example: 'new Autocomplete({target: "inputTextID", data: arrayList, minLength: 4});\nvar arrayList = ["Car", "Motorcycle", "Airplane", "Train", "Bicicle"];'
		},
		showHeaders: {
			type: 'boolean',
			description: 'Este parámetro solo es válido para el formato de "table". Indica al complemento Autocompletar que se deben mostrar los encabezados de la tabla. Por defecto es false.',
			example: 'var countriesJSON = [\n\t{ id: 1, country: "Afghanistan", code: "AFG", capital: "Kabul" },\n\t{ id: 2, country: "Albania", code: "ALB", capital: "Tirane" },\n\t{...}\n];\nnew Autocomplete({target: "transportBox", format: "table", showHeaders: true, data: countriesJSON,\n\ttableFields: {\n\t\t"return_value": "id",\n\t\t"fields": ["country", "code", "capital"], "headers": ["Country", "Code", "Capital"]\n\t}\n});'
		},
		tableFields: {
			type: 'integer',
			description: 'Un objeto JSON con el siguiente formato: \n\t● "return_value": Que indica qué campo se devolverá.\n\t● "fields": Que indica los campos que compondrán el objeto "data".\n\t● "headers": Que indica la traducción para mostrar en los encabezados del autocomplete en formato "table".',
			example: 'var countriesJSON = [\n\t{ id: 1, country: "Afghanistan", code: "AFG", capital: "Kabul" },\n\t{ id: 2, country: "Albania", code: "ALB", capital: "Tirane" },\n\t{...}\n];\nnew Autocomplete({target: "transportBox", format: "table", data: countriesJSON,\n\ttableFields: {\n\t\t"return_value": "id",\n\t\t"fields": ["country", "code", "capital"], "headers": ["Country", "Code", "Capital"]\n\t}\n});'
		}
	};
}

/**
	 Benchmark functionality
	 @version: 1.00
	 @author: Pablo E. Fernández (islavisual@gmail.com).
	 @Last update: 15/03/2019
 **/
if(it.enabledModules.Benchmark){
	WikiHelper.Benchmark = {
		general: {
			version: 1.0,
			name: 'Benchmark',
			help: 1,
			description: "Este plugin permite comprobar la calidad y el rendimiento de un código pasado a través de una función.",
		},
		test: {
			type: 'function',
			description: 'Realiza y muestra un informe con el resultado del análisis.',
			example: '// Diferencia entre for y forEach\nvar bigArray = new Array(1000);\nBenchmark.test({name: "for", fn: function () {\n\tvar result = [];\n\tfor (var x = 0; x < bigArray.length; x++) {\n\t\tresult.push(bigArray[x]);\n\t}\n\treturn result;\n}});\r\n\nBenchmark.test({name: "forEach", fn: function () {\n\tvar result = [];\n\tbigArray.forEach(function(element) {\n\t\tresult.push(element);\n\t});\n\treturn result;\n}});\n\r\n// Resultados del ejemplo ejecutado en Chrome: \n[\n\t{\n\t\tchecks: 2\n\t\tdiff: "0%"\n\t\telapsed: 3254\n\t\tname: "forEach"\n\t\tperSecondIterations: 456395\n\t\ttotalIterations: 1485112\n\t\t},\n\t{\n\tchecks: 2\n\t\tdiff:"87.1%"\n\t\telapsed: 3284\n\t\tname: "for"\n\t\tperSecondIterations: 58865\n\t\ttotalIterations: 193313\n\t}\n]'
		},
		testTime:{
			type: 'Integer',
			description: 'Establece la duración máxima del test en milisegundos. Por defecto es 3000.',
			example: 'Benchmark.testTime = 10000;'
		},
		maxIterations:{
			type: 'Integer',
			description: 'Establecer el número máximo operaciones por test. Por defecto es "0x3FFFFFFF" (1 Tera)',
			example: 'Benchmark.maxIterations = 2500000;'
		},
		showLog:{
			type: 'boolean',
			description: 'Muestra un mensaje de resumen en la consola cada vez que finaliza una operación. Por defecto es false.',
			example: 'Benchmark.showLog = true;'
		},
		results: {
			type: 'Object',
			description: 'Mostrar los resultados de todos los test realizados anteriormente.',
			example: 'console.log(Benchmark.results);'
		},
	}
}

/**
   Constraint to input Helper
   @version: 1.00
   @author: Pablo E. Fernández (islavisual@gmail.com).
   @Copyright 2017-2019 Islavisual.
   @Last update: 04/03/2019
 **/
if(it.enabledModules.Constraint){
	WikiHelper.Constraint = {
		general: {
			version: 1.0,
			name: 'Constraint',
			help: 1,
			description: "Constraint es un plugin que proporciona una forma sencilla de evitar la introducción de valores que, de antemano, se sabe que no son válidos. Su funcionamiento se basa en expresiones regulares y se integra fácilmente con otros componentes de JavaScript o HTML5.\nUna vez que se define el control, se puede acceder a sus métodos a través de document.inputTextID.Constraint.",
		},
		base: {
			type: 'integer',
			description: 'El parámetro "base" establece una base numérica diferente a 10, la establecida por defecto. El tipo binario establece automáticamente la base a 2. El tipo hexadecimal establece automáticamente la base a 16.',
			example: 'new Constraint.set({target: "inputTextID", type: "decimal", base: 2});\n// A través del tipo binario\nnew Constraint.set({target: "inputTextID", type: "binary"});'
		},
		decimalpoint: {
			type: 'string',
			description: 'El parámetro "decimalpoint" indica el carácter que separará la parte entera de la parte decimal. Sólo será válido en los tipos numéricos con decimales. Por defecto el valor es "." (punto).',
			example: 'new Constraint.set({target: "inputTextID", type: "decimal", decimalpoint: ","});'
		},
		function: {
			type: 'function',
			description: 'El parámetro "function" define la función de validación que controlará el formato de entrada y los valores admitidos. La validación realizada por esta función se puede definir a través de expresiones regulares (en el caso del subtipo "binario", la función podría ser "return /^(0|1)*$/.test(value);") aunque no es obligatorio. Si se define este parámetro a través de una función, el parámetro "type" debe establecerse a "custom".',
			example: '// Ejemplo de subtipo personalizado (Número en formato octal).\nnew Constraint.set({\n\ttarget: "inputTextID",\n\ttype: "custom",\n\tfunction: function(value) {\n\t\treturn /^[0-7]*$/i.test(value);\n\t},\n\tbase: 8,\n});'
		},
		indicators: {
			type: 'object',
			description: 'El parámetro "indicators" indica si se deben mostrar los iconos de flecha hacia arriba, flecha hacia abajo y el color. Estos iconos a menudo se asocian con los controles de tipo numérico en HTML5, por lo que generalmente es una buena idea mostrarlos. Por defecto, el valor está establecido a true.\nEl parámetro "indicators" se compone de atributos "enabled" y "color".',
			example: 'new Constraint.set({target: "inputTextID", type: "decimal", indicators: {enabled: true, color: "rgba(0,0,0,0.25)"}});\nnew Constraint.set({target: "inputTextID", type: "decimal", indicators: {color: "red"}});'
		},
		target: {
			type: 'string',
			description: 'ID del control dónde será implementado el constraint',
			example: 'new Constraint.set({target: "inputTextID", type: "int"});'
		},
		step: {
			type: 'float',
			description: 'El parámetro "step" indica el incremento o decremento cuando el usuario presiona las teclas de cursor o uno de los botones asignados como "indicadores". Por defecto es 1.',
			example: 'new Constraint.set({target: "inputTextID", type: "decimal", step: 0.01});'
		},
		type: {
			type: 'string',
			description: 'El parámetro "type" define el formato o el tipo de datos que permitirá el control. Los valores aceptados son:\n\t● <b>int</b>: Los valores permitidos son únicamente enteros positivos y negativos.\n\t● <b>uint</b>: Los valores permitidos son únicamente enteros positivos.\n\t● <b>float</b>: Los valores permitidos son enteros y números reales con decimales infinitos.\n\t● <b>decimal</b>: Los valores permitidos son enteros y números reales con dos decimales.\n\t● <b>percent</b>: Los valores permitidos son entre 0 y 100.\n\t● <b>binary</b>: Los valores permitidos son números enteros escritos y definidos a través de su base, en este caso 0 y 1.\n\t● <b>hexadecimal</b>: Los valores permitidos son números enteros escritos y definidos a través de su base, en este caso de 0 a 9 y de A a F.\n\t● <b >hour</b>: Los valores permitidos son de 00:00 a 23:59.\n\t● <b>custom</b>: Permite definir una función de tipo personalizado. El subtipo "custom" se alimenta del parámetro "function", por lo que si el control se define como "custom", será obligatorio (el parámetro "function").',
			example: '// Example of Integer subtype\nnew Constraint.set({target: "inputTextID", type: "int"});\n\n// Example of Hour subtype\nnew Constraint.set({target: "inputTextID", type: "hour"});\n\n// Example of Custom subtype (Number in octal format). The custom subtype needs \nnew Constraint.set({\n\ttarget: "inputTextID",\n\ttype: "custom",\n\tfunction: function(value) {\n\t\treturn /^[0-7]*$/i.test(value);\n\t},\n\tbase: 8,\n});'
		},
		increment: {
			type: 'string',
			description: 'Aumenta el valor de la entrada asociada al valor establecido en "step". Por defecto, "step" es 1.',
			example: 'Constraint.increment("inputTextID");'
		},
		decrement: {
			type: 'string',
			description: 'Disminuye el valor de la entrada asociada al valor establecido en "step". Por defecto, "step" es 1.',
			example: 'Constraint.decrement("inputTextID");'
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
if(it.enabledModules.Debugger){
	WikiHelper.Debugger = {
		general: {
			version: 1.0,
			name: 'Debugger',
			help: 1,
			description: 'Depurador automático para ayudarte a saber todo lo que sucede en tu página. Desde cuando un usuario hace un clic hasta conocer qué llamadas ajax se ejecutan en segundo plano.'
		},
		init: {
			type: "function",
			description: "Fácil de inicializar. Se puede inicializar en modo consola o en una ventana a parte (screen).",
			example: '// Depurar a través de la consola\nDebugger.init("console");\n// Depurar a través de una ventana externa\nDebugger.init("window");'
		},
		attributesFilter: {
			type: "Object",
			description: 'Debugger permite depurar selectivamente los atributos de forma independiente o de forma combinada. La forma de especificar qué observar es a través de una matriz de valores que indica qué es lo que se debe depurar. Por defecto, attributesFilter está definido a vacío.',
			example: '// Depurar todos los atributos\nDebugger.attributesFilter = [];\nDebugger.init();\n\n// Depurar únicamente los atributos cellspacing y cellspadding\nDebugger.attributesFilter = ["cellspacing", "cellspadding"];\nDebugger.init();'
		},
		excludedAttributesFilter: {
			type: "Object",
			description: 'Debugger también permite deshabilitar selectivamente los atributos que no se desean depurar. La manera de especificar lo que no se debe observar es a través de una matriz de valores que indica lo que no se debe depurar. Por defecto, excludedAttributesFilter tiene establecido únicamente el atributo "style".',
			example: '// No depurar las propiedades de style, class, id y src. Lo demás sí\nDebugger.excludedAttributesFilter = ["style", "class", "id", "src"];\nDebugger.init();'
		},
		selectorsFilter: {
			type: "Object",
			description: 'Debugger permite depurar selectivamente las etiquetas de forma independiente o de forma combinada. La forma de especificar qué etiquetas se deben observar es a través de una matriz de valores que indica qué se debe depurar. Por defecto, selectorsFilter está definido a vacío.',
			example: '// Depurar todas las etiquetas\nDebugger.selectorsFilter = [];\nDebugger.init();\n\n// Depurar sólo los cuadros de texto, desplegables y los botones\nDebugger.selectorsFilter = ["INPUT", "SELECT", "BUTTON"];\nDebugger.init();'
		},
		excludedSelectorsFilter: {
			type: "Object",
			description: 'Debugger también permite desactivar selectivamente las etiquetas que no se desean depurar. La manera de especificar qué no se debe observar es a través de una matriz de valores que indica lo que no se debe depurar. Por defecto, excludedSelectorsFilter está definindo a vacío.',
			example: '// No depurar los DIV, SPAN, NAV y LEGEND. Los demás sí\nDebugger.excludedSelectorsFilter = ["DIV", "SPAN", "NAV", "LEGEND"];\nDebugger.init();'
		},
		eventsFilter: {
			type: "Object",
			description: 'Debugger permite depurar eventos de forma selectiva de forma independiente o de forma combinada. La forma de especificar qué eventos observar es a través de una matriz de valores que indica qué se debe depurar.\n\r\nLa lista de eventos permitidos son todos los de JavaScript, véase clic, mouseover, mouseout, mouseenter, mouseleave, keydown, keyup, Presionar teclas, cambiar, enfocar, enfocar, enfocar, difuminar,...\n\r\nPor defecto, si el parámetro eventFilter se deja vacío, se observarán los eventos básicos de interacción, es decir, change, clic, focusin (tomar el foco), focusout (perder el foco) y keydown ya que, este, permite controlar las teclas Ctrl, Alt y Shift (mayúsculas).\n\r\nDe forma predeterminada, eventsFilter se define como vacío.',
			example: '// Depurar los predefinidos\nDebugger.eventsFilter = [];\nDebugger.init();\n\n// Depurar sólo el evento change.\nDebugger.eventsFilter = ["change"];\nDebugger.init();'
		},
		enableHistory:{
			type: "boolean",
			description: "Debugger permite exportar el historial de cambios a un archivo. Por defecto, enableHistory es false.",
			example: '// Activar el historial\nDebugger.enableHistory = true;\nDebugger.init();\n// ...\n// ... Actions ...\n// ...\n// Recuperar el historial.\nDebugger.getHistory();',
		},
		getHistory:{
			type: "function",
			description: "Para exportar el historial de eventos a un archivo, se puede usar la función de guardar del navegador si está en una ventana a parte (modo screen). Sin embargo, el depurador tiene una manera más sencilla de lograr este requisito. Para extraer el historial de cambios, se puede ejecutar la función getHistory() que devuelve el historial en formato de texto plano.",
			example: '// Activar el historial\nDebugger.enableHistory = true;\nDebugger.init();\n// ...\n// ... Actions ...\n// ...\n// Recuperar el historial.\nDebugger.getHistory();',
		},
		messages: {
			type: "Object",
			description: 'Debugger permite definir mensajes personalizados para cada tipo de cambio o mutación.',
			example: "messages:{\n\tajaxBeforeSend:'Processing request. Method: &lt;method>. Type: &lt;type>. CrossDomain: &lt;crossDomain>.  File: &lt;url>. Content Type: &lt;contentType>',\n\tajaxComplete:'The Ajax processing request FINISHED for the &lt;url> file.',\n\tajaxSuccess:'The Ajax request was completed SUCCESSFULLY for the &lt;url> file.',\n\tajaxError:'An error occurred into Ajax processing request into &lt;url> file.',\n\tbeforeUnloadPage:'Page request unload',\n\tunloadPage:'Unloaded page',\n\terrorPage:'An error occurred into file',\n\tparsedPage:'Page loaded and parsed.',\n\tpageChangedStatus:'Page changed status:',\n\tvalueChanged: 'The &lt;selector> changed the value property to &lt;value>.',\n\tgetsFocus: '&lt;selector> gets focus.',\n\tlosesFocus: '&lt;selector> loses focus.',\n\tclick: 'User clicks into &lt;selector>.',\n\tattributeMutation: 'The &lt;attributeName> attribute has mutated from \"&lt;oldValue>\" to \"&lt;value>\" into &lt;selector> element.',\n\taddedChildren: 'Added children into &lt;selector> element. Total children: &lt;totalChildren>',\n\tremovedChildren: 'Removed children into &lt;selector> element. Total children: &lt;totalChildren>',\n\tmouseOver: 'The mouse pointer is over the &lt;selector> element.',\n\tmouseOut: 'The mouse pointer leaves the &lt;selector> element.',\n\tkeyPress: 'Keyboard event received into &lt;selector> element. Keys Combination: \"&lt;keys>\". Keys Combination Code: \"&lt;keysCode>\".',\n\tseparator: '&lt;div style=\"border: 1px solid #333; border-width: 0px 0px 1px 0px; height:5px; width:100%;margin-bottom: 5px;\">&nbsp;&lt;/div>'\n}"
		},
		colors: {
			type: "Object",
			description: 'Debugger permite definir los colores personalizados para cada tipo de cambio o mutación.',
			example: "colors: {\n\t// For elements added in the DOM\n\tadded:\"#709050\",\n\t// For changes in attributes in the DOM\n\tattributeChanged: '#ff00ff',\n\t// Background of the Debugger window\n\tbackground:\"#000000\",\n\t// For events Blur\n\tblur:\"#907080\",\n\t// For Focus events\n\tfocus:\"#9070a0\",\n\t// For events Click\n\tclick:\"#909090\",\n\t// For Mouse Over events\n\tmouseOver:\"#a07090\",\n\t// For Mouse Out events\n\tmouseOut:\"#807090\",\n\t// For Keypress events\n\tkeyPress:\"#80a090\",\n\t// For detected errors\n\terror: '#a02020',\n\t// Header Text\n\theaderForeground:\"#ffffff\",\n\t// Header Background\n\theaderBackground:\"#333\",\n\t// For standard and unregistered changes\n\tnormal:\"#606060\",\n\t// For Ajax in mode Processing\n\tproccessing:\"#8AC007\",\n\t// For state changes of Ajax\n\treadyState:\"#8AC007\",\n\t// For deleted items in the DOM\n\tremoved:\"#a01010\",\n\t// For Ajax in Sending\n\tsending mode:\"#8AC007\",\n\t// For Ajax in Updating mode\n\tupdated:\"#80a0e0\",\n\t// For changes to the value attributes\n\tvalueChanged:\"#FE2466\"\n}"
		}
	}
}

/**
   DOM Helper																		
   @version: 1.00																					
   @author: Pablo E. Fernández (islavisual@gmail.com).												
   @Copyright 2017-2019 Islavisual. 																	
   @Last update: 27/02/2019																			
 **/
if(it.enabledModules.DOM){
	WikiHelper.DOM = {
		general: {
			version: 1.0,
			name: 'DOM.ready',
			description: "Funcionalidad para la gestión de eventos, acciones,... una vez que la página esté completamente cargada.",
		},
		noparams:{
			type: "void",
			description: "",
			example: "n// Ejemplo de caso de uso\nDOM.ready(function () {\n\t// Ocultar loader\n\tsetTimeout(function () { document.querySelector('.loader').style.display = 'none'; }, 250);\n});"
		}
	}
}

/**
   GetBrowser Helper																		
   @version: 1.00																					
   @author: Pablo E. Fernández (islavisual@gmail.com).												
   @Copyright 2017-2019 Islavisual. 																	
   @Last update: 27/01/2019																			
 **/
if(it.enabledModules.GetBrowser){
	WikiHelper.GetBrowser = {
		general: {
			version: 1.0,
			name: 'GetBrowser',
			description: "Attempts to determine the capabilities of the user's browser through  the browser's information contains in the navigator object of JavaScript.",
		},
		additional: [
			{
				description: 'Para recuperar el nombre del navegador::',
				example: 'var browser = new GetBrowser(), browserName = browser.name;'
			},
			{
				description: 'Para saber si el navegador es Chrome:',
				example: 'var browser = new GetBrowser(), if(browser.chrome){ console.log("Tu navegador es is Chrome!")}'
			},
			{
				description: 'Para saber si el navegador es Firefox:',
				example: 'var browser = new GetBrowser(), if(browser.firefox){ console.log("Tu navegador es is Firefox!")}'
			},
			{
				description: 'Para saber si el navegador es Internet Explorer:',
				example: 'var browser = new GetBrowser(), if(browser.msie){ console.log("Tu navegador es Internet Explorer!")}'
			},
			{
				description: 'Para saber si el navegador es Opera:',
				example: 'var browser = new GetBrowser(), if(browser.opera){ console.log("Tu navegador es Opera!")}'
			},
			{
				description: 'Obtener la versión del navegador:',
				example: 'var browser = new GetBrowser(), console.log(browser.version);'
			},
			{
				description: 'Obtener el prefijo de CSS utilizado por el navegador:',
				example: 'var browser = new GetBrowser(), console.log(browser.prefix);'
			},
		],
	}
}

/**
   GetParam Helper																		
   @version: 1.00																					
   @author: Pablo E. Fernández (islavisual@gmail.com).												
   @Copyright 2017-2019 Islavisual. 																	
   @Last update: 13/03/2019																			
 **/
if(it.enabledModules.GetParam){
	WikiHelper.GetParam = {
		general: {
			version: 1.0,
			name: 'GetParam',
			description: "Función para obtener todos los valores de los parámetros recibidos en la URL.",
		},
		additional: [
			{
				description: 'Para obtener el valor del parámetro "h":',
				example: 'var h = GetParam()["h"];'
			},
		]
	}
}

/**
   HttpRequest Helper																		
   @version: 1.00																					
   @author: Pablo E. Fernández (islavisual@gmail.com).												
   @Copyright 2017-2019 Islavisual. 																	
   @Last update: 27/02/2019																			
 **/
if(it.enabledModules.HttpRequest){
	WikiHelper.HttpRequest = {
		general: {
			version: 1.0,
			name: 'HttpRequest',
			description: "HttpRequest es un plugin que proporciona una forma sencilla de realizar solicitudes remotas o transferir datos entre un cliente y un servidor. Este complemento está creado completamente en JavaScript y está diseñado para mejorar el rendimiento de la aplicación, incluso en llamadas síncronas.",
		},
		ajax: {
			type: 'boolean',
			description: 'Booleano que indica si la solicitud o petición debe ejecutarse de forma síncrona (false) o asíncrina (true).',
			example: 'new HttpRequest({url: "index.html", ajax: true})'
		},
		callback: {
			type: 'function',
			description: 'Función que se debe llamar cuando se reciba la respuesta..',
			example: 'new HttpRequest({callback: callback});\nfunction callback(e){\n\tconsole.log(e);\n}'
		},
		contentType: {
			type: 'function',
			description: 'Tipo de contenido de los datos recibidos. Por defecto, este attributo es <b>application/x-www-form-urlencoded</b>.\nLos valores más comunes son:\n\t● <b>application/x-www-form-urlencoded</b> (responsiveType debe ser "text")\n\t● <b>text/html; charset=utf-8</b> (responsiveType debe ser "text")\n\t● <b>application/json; charset=utf-8</b> (responsiveType debe ser "json")\n\t● <b>application/octet-stream</b> (responsiveType debe ser "blob")\n\t● <b>application/pdf</b> (responsiveType debería ser "blob")',
			example: 'new HttpRequest({url: "getData.json", contentType: "application/json; charset=utf-8"})'
		},
		onAbort: {
			type: 'function',
			description: 'Función de llamada cuando la solicitud es abortada.',
			example: 'new HttpRequest({url: "index.html", onAbort: HttpRequestOnAbort});\nfunction HttpRequestOnAbort(event){\n\tconsole.log("The request was aborted", event);\n}'
		},
		onError: {
			type: 'function',
			description: 'Función de llamada cuando la solicitud ha tenido algún tipo de error.',
			example: 'new HttpRequest({url: "http://remoteaddress.com/data.php", onError: HttpRequestOnError});\nfunction HttpRequestOnError(event){\n\tconsole.log("An error occurred during the request", event);\n}'
		},
		onLoad: {
			type: 'function',
			description: 'Función de llamada cuando la solicitud ha sido ejecutada de forma satisfactoria.',
			example: 'new HttpRequest({url: "document.pdf", onLoad: HttpRequestOnLoad});\nfunction HttpRequestOnLoad(event){\n\tconsole.log("Request completes successfully", event);\n}'
		},
		onloadEnd: {
			type: 'function',
			description: 'Es la función llamada cuando la solicitud se completa por cualquier motivo, sea satisfactoriamente o no.',
			example: 'new HttpRequest({url: "document.pdf", onLoadEnd: HttpRequestOnLoadEnd});\nfunction HttpRequestOnLoadEnd(event){\n\tconsole.log("Request was completed but it may not have been successful", event);\n}'
		},
		onloadStart: {
			type: 'function',
			description: 'Es la función llamada cuando la solicitud comienza a transferir datos.',
			example: 'new HttpRequest({url: "document.pdf", onLoadStart: HttpRequestOnLoadStart});\nfunction HttpRequestOnLoadStart(event){\n\tconsole.log("Starting to download", event);\n}'
		},
		onProgress: {
			type: 'function',
			description: 'Se llama a la función mientras la solicitud se ejecuta.',
			example: 'new HttpRequest({url: "document.pdf", onProgress: HttpRequestOnProgress});\nfunction HttpRequestOnProgress(event){\n\tconsole.log("Download underway", event);\n}'
		},
		onTimeout: {
			type: 'function',
			description: 'Es la función llamada cuando se supera el tiempo de máximo de espera. Mira también la propiedad "timeout".',
			example: 'new HttpRequest({url: "index.html", onTimeout: HttpRequestOnTimeout});\nfunction HttpRequestOnTimeout(event){\n\tconsole.log("Request exceeded the waiting time allowed", event);\n}'
		},
		method: {
			type: 'string',
			description: 'Sus valores posibles son <b>POST</b>, <b>GET</b>, <b>HEAD</b>, <b>PUT</b> o <b>DELETE</b>. Por defecto el atributo "method" es POST. Dependiendo del método y la configuración del servidor, podrían suceder errores 404 ó 405.',
			example: 'new HttpRequest({url: "index.html", method: "GET"});'
		},
		parameters: {
			type: 'string',
			description: 'JSON con los parámetros en formato:\n{\n\tparameterName1: parametersValue1,\n\tparameterName2: parametersValue2,\n\t...\n}',
			example: 'new HttpRequest({url: "getDataFromServer.asp", method: "POST", parameters: { idProduct: 3 }});'
		},
		responseType: {
			type: 'string',
			description: 'Los valores permitidos pueden ser:\n\t● <b>json</b>,\n\t● <b> texto </b>,\n\t● <b>blob</b>\n\t● <b>arrayBuffer</b>.\nNota: para HTML y JSON, no es obligatorio definir este parámetro.',
			example: 'new HttpRequest({url: "getListProducts.json", responseType: "json", parameters: { idCategory: 3 }});'
		},
		returnFullResponse: {
			type: 'boolean',
			description: 'Indica si sólo deben devolverse los datos o el objeto completo que devolvió la llamada.',
			example: 'new HttpRequest({url: "getDataFromServer.asp", returnFullResponse: true});'
		},
		timeout: {
			type: 'integer',
			description: 'Es la cantidad de milisegundos que puede tomar una solicitud antes de que se finalice automáticamente. Por defecto es 0.',
			example: 'new HttpRequest({url: "http://stack.overflow.com/data", timeout: 300 });'
		},
		url: {
			type: 'string',
			description: 'URL de la solicitud.',
			example: 'new HttpRequest({url: "getDataFromServer.xml",});'
		},
		withCredentials: {
			type: 'boolean',
			description: 'Indica si las solicitudes de "Access-Control" entre sitios deben realizarse utilizando credenciales como cookies, encabezados de autorización o certificados de cliente TLS. La configuración con las credenciales no tiene ningún efecto en las solicitudes del mismo sitio.',
			example: 'new HttpRequest({url: "getDataFromServer.asp", withCredentials: true});'
		},
	}
}

/**
   Include Helper																		
   @version: 1.00																					
   @author: Pablo E. Fernández (islavisual@gmail.com).												
   @Copyright 2017-2019 Islavisual. 																	
   @Last update: 11/03/2019																			
 **/
if(it.enabledModules.Include){
	WikiHelper.Include = {
		general: {
			version: 1.0,
			name: 'Include',
			description: "Plugin para insertar código HTML dentro de un contenedor. La carga de archivos se realiza a través de Ajax en modo asíncrono y con método POST.",
		},
		data: {
			type: 'string',
			description: 'El código HTML/texto a insertar.',
			example: 'Include({\n\ttarget: "targetID",\n\tdata: \'&lt;section class="container">\\\n\t\t&lt;article id="art_01">\\\n\t\t\t...\\\n\t\t&lt;/article>\\\n\t&lt;/section>\'\n});'
		},
		file: {
			type: 'string',
			description: 'URL del archivo a insertar en el elemento contenedor.',
			example: 'Include({target: "targetID", file: "./customers/profile.html"});'
		},
		attribute: {
			type: 'string',
			description: 'Indica qué atributo de datos personalizado HTML se utilizará para recuperar la URL que incluirá datos dentro de capas de contenedor (generalmente DIV, SECCIÓN, ARTÍCULO,...).',
			example: '// Supongamos que el siguiente código fuente con "data-include"\n&lt;div>\n\t&lt;div class="container" data-include="./profileCard.html">&lt;/div>\n\t&lt;div class="container" data-include="./historical.html">&lt;/div>\n&lt;/div>\n\n Include({attribute: "data-include"});'
		},
		target: {
			type: 'string',
			description: 'ID del elemento contenedor donde se insertará el código.',
			example: 'Include({target: "targetID", file: "./customers/profile.html"});'
		},
	}
}

/**
	 IntelliForm functionality
	 @version: 1.00
	 @author: Pablo E. Fernández (islavisual@gmail.com).
	 @Copyright 2017-2019 Islavisual.
	 @Last update: 19/03/2019
 **/
if(it.enabledModules.IntelliForm){
	WikiHelper.IntelliForm = {
		general: {
			version: 1.0,
			name: 'IntelliForm',
			help: 1,
			description: 'IntelliForm is a tool make operations with your forms. You can add form elements, make post request through JSON, automate browser sequences, handle undo/redo actions and so much.'  
		},
		addElement: {
			type: "object",
			description: 'It allows adding elements to a form through JSON object. The valid JSON properties are the typical of HTML except "dataset" and "validate" that have specific format.\n\t● <b>dataset</b>:" is a JSON with name and value attributes.\n\t● <b>validate</b>:" is equal to Validator format without target parameter. For more information see Validator.help().',
			example: 'IntelliForm.addElements({\n\ttarget: "formID",\n\tdata:[\n\t\t{\n\t\t\ttag: "input",\n\t\t\tid: "age",\n\t\t\tclass: "form-item",\n\t\t\ttype: "number",\n\t\t\tmin: 18,\n\t\t\tmax: 100,\n\t\t\tvalidate: {\n\t\t\t\tfixed: true,\n\t\t\t\tconstraint: "!this.validity.rangeOverflow && !this.validity.rangeUnderflow",\n\t\t\t\tmessage: "The possibles values are from 18 to 100"\n\t\t\t}\n\t\t},\n\t\t{\n\t\t\ttag: "input",\n\t\t\tid: "username",\n\t\t\tclass: "form-item",\n\t\t\ttype: "text",\n\t\t\tdataset: [\n\t\t\t\t{name: "id", value: "0"},\n\t\t\t\t{name: "logged", value: "true"}\n\t\t\t],\n\t\t\tfocus: function(){\n\t\t\t\tthis.classList.add("focused");\n\t\t\t\t},\n\t\t\tblur: function(){\n\t\t\t\tthis.classList.remove("focused");\n\t\t\t}\n\t\t},\n\t\t{\n\t\t\ttag: "input",\n\t\t\tid: "pwd",\n\t\t\tclass: "form-item",\n\t\t\ttype: "password",\n\t\t\tvalidate: {\n\t\t\t\tfixed: true,\n\t\t\t\trequired: true,\n\t\t\t\tconstraint: "!this.validity.patternMismatch",\n\t\t\t\tmessage: "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",\n\t\t\t\tpattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"\n\t\t\t},\n\t\t\tfocus: function(){\n\t\t\t\tthis.classList.add("focused");\n\t\t\t},\n\t\t\tblur: function(){\n\t\t\t\tthis.classList.remove("focused");\n\t\t\t}\n\t\t}\n\t]\n});'
		},
		autofill: {
			type: "function",
			description: 'It allows refilling all the fields with the values than was ​​captured through the functionality "enableUndo".',
			example: 'IntelliForm.autofill();'
		},
		setUndo: {
			type: "function",
			description: 'Provides the necessary logic to manage all the changes that are made inside input and select fields, even if the page is reloaded.',
			example: '// Enable Undo for all input text type\nIntelliForm.setUndo({target: ["input[type=text]"]});\n\n// Another way is\nIntelliForm.target = ["name", "surname", "street", "phone", "email"];\nIntelliForm.setUndo();'
		},
		startSequence: {
			type: "function",
			description: 'Provides a way to create one sequence of changes in "real time" about the current page to be played after, even when the page is reload.',
			example: 'IntelliForm.startSequence();\n// To stop sequence you can reload the page.',
		},
		stopSequence: {
			type: "function",
			description: 'Stops and saves the event log. This functionality only work if "startSequence" was enabled before, otherwise, this action it will have no effect any.',
			example: 'IntelliForm.stopSequence();',
		},
		getSequence: {
			type: "function",
			description: 'Return the sequence about the current page.',
			example: 'IntelliForm.getSequence();\n// This will return something similar to:\n"[\n\t{"ts":0,"id":"_bodyItem58","event":"focusin"},\n\t{"ts":35,"id":"_bodyItem58","event":"click"},\n\t{"ts":37,"id":"_bodyItem58","event":"change","value":""}\n\t...\n]',
		},
		setSequence: {
			type: "function",
			description: 'Allow to set a new sequence to interact with the current page. This functionality receives a string type parameter with the steps to executing. The posibles properties inside sequence are:\n\t● <b>ts</b>: Indicates the time, in milliseconds, that must be elapsed between before and current change.\n\t● <b>id</b>: Indicates a valid ID name. You can execute the "setIDs" functionality before to assign the "id" property automaticaly.\n\t● <b>event</b>: Indicates the change type. The possibles events are: click, focusin, focusout, scroll, change and keydown.\n\t● <b>left</b>: Indicates the left position target into scroll events.\n\t● <b>key</b>: Indicates the character pressed into keydown events.\n\t● <b>keyCode</b>: Indicates the JavaScript key code pressed into keydown events.\n\t● <b>top</b>: Indicates the top position target into scroll events.\n\t● <b>value</b>: Indicates the value in change events.\n\r\nNote: The best way to create a sequence is use "startSequence" functionality.',
			example: 'IntelliForm.setSequence(\'[{"ts":0,"id":"_bodyItem58","event":"focusin"},{"ts":35,"id":"_bodyItem58","event":"click"},{"ts":37,"id":"_bodyItem58","event":"focusout"},...]\');',
		},
		removeSequence: {
			type: "function",
			description: 'Remove the sequence for current page.',
			example: 'IntelliForm.removeSequence();',
		},
		playSequence: {
			type: "function",
			description: 'Allow playing a sequence. If the function parameter  is empty, its recover the sequence to current page.',
			example: 'IntelliForm.playSequence();',
		},
		setIDs: {
			type: "function",
			description: 'Assign the attribute "id" to all the elements that do not have it set.',
			example: 'IntelliForm.setIDs();',
		},
		send: {
			type: "function",
			description: 'Allows create and send forms in real time through Ajax with post method. The received parameters are: URL (to make the request) and JSON with list of inputs/elements to send.',
			example: 'IntelliForm.send({\n\turl: "../pages/setProduct",\n\tparams: [{\n\t\t"type": "text",\n\t\t"id": "idProduct",\n\t\t"value": "1"\n\t}]\n});',
		},
		target:{
			type: "object",
			description: "Array of selectors of the elements where the the IntelliForm undo will be enabled.",
			example: 'IntelliForm.setUndo({target: ["#email", "#zipcode"]});',
		}
	}
}

/**
   IsMobile Helper																		
   @version: 1.00																					
   @author: Pablo E. Fernández (islavisual@gmail.com).												
   @Copyright 2017-2019 Islavisual. 																	
   @Last update: 11/03/2019																			
 **/
if(it.enabledModules.IsMobile){
	WikiHelper.IsMobile = {
		general: {
			version: 1.0,
			name: 'IsMobile',
			description: "This method indicates if the current device is \"mobile\" or not.",
		},
		additional: [
			{
				description: 'To know if the device is mobile:',
				example: 'var mobile = new IsMobile();'
			},
		]
	}
}

/**
   Language Helper																		
   @version: 1.00																					
   @author: Pablo E. Fernández (islavisual@gmail.com).												
   @Copyright 2017-2019 Islavisual. 																	
   @Last update: 31/03/2019																			
 **/
if(it.enabledModules.Language){
	WikiHelper.Language = {
		general: {
			version: 1.0,
			name: 'Language',
			help: 1,
			description: "This script allows you to activate and manage the multilanguage feature on your website.",
		},
		init: {
			type: 'function',
			description: 'Assign and initialize the multilanguage feature.',
			example: 'var availableLangs = [\n\t{id: "en-US", name: "English"},\n\t{id: "es-ES", name: "Spanish"},\n];\nvar translations = {\n\t"es-ES": [\n\t\t{ id: "Loading...", text: "Cargando..." },\n\t\t{ id: "Loaded!", text: "Cargado!" },\n\t\t{ id: "Comments", text: "Observaciones" }\n\t],\n\t"en-US": [\n\t\t{ id: "Loading...", text: "<i class="fa fa-spin"></i>" },\n\t\t{ id: "Loaded!", text: "OK!" }\n\t]\n};\nLanguage.init(availableLangs, translations);'
		},
		render: {
			type: 'function',
			description: 'Analyzes all the document and replace all pattern matches. This functionality is feeds of "data-tkey", "data-placeholder-tkey" and "data-title-tkey" attributes.',
			example: '// The availableLangs and translations objects are defined before.\n// For example, supposed the next HTML code:\n//\t&lt;label for="notes" data-tkey="Comments">&lt;/label>\n//\t&lt;input id="notes" name="notes" placeholder="Comments" type="text" maxlength="255" />\nLanguage.init(availableLangs, translations);\nLanguage.render();\n\n// Note that the placeholder is translated and assugn the source text to "data-placeholder-tkey" attribute.'
		},
		set: {
			type: 'function',
			description: 'Set the current language. By default, the language is the one provided by the browser.\nPrecaución: For support the browser compatibility, is the language code sent would be coded into ISO-639-1.',
			example: '// Supposed that language by default in Chrome is "es-ES" (ISO 639-1 code to Spain)\nLanguage.set("en-US");'
		},
		get: {
			type: 'function',
			description: 'Returns the translation for received string. If match is not found, it is assumed that don\'t have traduction and returns the same string.',
			example: 'var tkey = Language.get("Loading...");\n// If you want recover the translation for another language, you can send the language like second parameter:\nvar tkey_ES = Language.get("Loading...", "es-ES");'
		}
	}
}

/**
	 Create and send forms in real time.
	 @version: 1.00
	 @author: Pablo E. Fernández (islavisual@gmail.com).
	 @Copyright 2017-2019 Islavisual.
	 @Last update: 03/04/2019
 **/
if(it.enabledModules.Selectpicker){
	WikiHelper.Selectpicker = {
		general: {
			version: 1.0,
			help: 1,
			name: 'Selectpicker',
			description: "Selectpicker is a form control that allows you to manage a selection as a drop-down list that can be easily customized.",
		},
		additional: [
			{
				description: 'Enable search into dropdown:',
				example: '// Supposed the next code:\n&lt;select id="months" name="months" class="select-picker" data-live-search="true">\n\t&lt;option value="01">January&lt;/option>\n\t...\n&lt;/select>\n\n// Once set data-live-search to true into select, initialize\nSelectpicker.init(".select-picker");'
			},
			{
				description: 'To custom Selectpicker through CSS:',
				example: '.select-picker{position: relative;width: 100%;}.select-picker .dropdown-container{list-style: none;background: #fff;border: 1px solid rgba(0,0,0,0.1);padding: 0;position: absolute;top: 53px;width: 100%;z-index: 99999;}.select-picker ul{overflow: auto;max-height: 164px;padding: 0;list-style: none;margin: 0;}.select-picker button{background: #f4f4f4;border: 1px solid rgba(0,0,0,0.1);width: 100%;height: 54px;text-align: left;line-height: 70px;font-weight: 500;}.select-picker button::before{content: "";display: inline-block;width: 0;height: 0;margin-left: 2px;vertical-align: middle;border-top: 4px dashed;border-right: 4px solid transparent;border-left: 4px solid transparent;position: absolute;right: 15px;top: 26px;}.select-picker button:hover{border-color: #adadad;}.select-picker.open button{background: #02a5a5;color: #ffffff;}.select-picker li{min-height: 36px;border-bottom: 1px solid rgba(0,0,0,0.1);padding: 4px 10px 0px 10px;line-height: 36px;}.select-picker li:not(.searcher):hover{background: #02A5A5;color: #fff;width: 100%;}.select-picker .searcher{position: relative;padding: 3px 40px 0 4px;min-height: 39px;border-bottom: 1px solid rgba(0,0,0,0.1);}.select-picker .searcher .input-search{line-height: 36px;height: 32px;padding-right: 26px;color: #fff;}.select-picker .search-icon::before{content: "";background: #ccc;width: 10px;height: 3px;position: absolute;border-radius: 100px;top: 21px;right: 6px;transform: rotate(40deg);}.select-picker .search-icon:after{content: "";width: 16px;height: 16px;border: 3px solid #ccc;border-radius: 100px;display: block;position: absolute;top: 8px;right: 12px;}.select-picker-active{background: #02a5a5;color: #fff;}'
			},
		],
		init: {
			type: 'function',
			description: 'Set the configure the requested select\'s.',
			example: 'Selectpicker.init(".select-picker");'
		},
		target: {
			type: 'string',
			description: 'If init method receives a string, this string will takes as target pattern. If init method receives an object, the target parameter will be the pattern to initialize the dropdowns.',
			example: '//Through simple way:\nSelectpicker.init(target: ".select-picker");\n\n// Through target parameter:\nSelectpicker.init({ target: ".select-picker" });'
		},
		liveSearch: {
			type: 'boolean',
			description: 'Enable search into dropdown.',
			example: 'Selectpicker.init({ target: ".select-picker", liveSearch: true });'
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
if(it.enabledModules.SendForm){
	WikiHelper.SendForm = {
		general: {
			version: 1.0,
			name: 'SendForm',
			description: "SendForm is a script to create and send forms in real time through Ajax with post method.",
		},
		url: {
			type: 'string',
			description: 'URL to make the request.',
			example: 'new SendForm({\n\turl: "../pages/setProduct",\n\tparams: [{\n\t\t"type": "text",\n\t\t"id": "idProduct",\n\t\t"value": "1"\n\t}]\n});'
		},
		params: {
			type: 'string',
			description: 'Parameter to send to the remote URI.',
			example: 'new SendForm({\n\turl: "../pages/setProduct",\n\tparams: [{\n\t\t"type": "text",\n\t\t"id": "idProduct",\n\t\t"value": "1"\n\t}]\n});'
		},
	}
}

/**
   StripTags Helper																		
   @version: 1.00																					
   @author: Pablo E. Fernández (islavisual@gmail.com).												
   @Copyright 2017-2019 Islavisual. 																	
   @Last update: 13/03/2019																			
 **/
if(it.enabledModules.StripTags){
	WikiHelper.StripTags = {
		general: {
			version: 1.0,
			name: 'StripTags',
			description: "Function to clean of HTML a string provided by parameter. The second parameter can be used to specify tags which should not be stripped.",
		},
		additional: [
			{
				description: 'Clean of HTML a string',
				example: 'StripTags("&lt;span>example of text&lt;/span>", "");\n// Result: example of text\n\nStripTags("&lt;span>example &lt;b>of&lt;/b> text&lt;/span>", "&lt;b>");\n// Result: example &lt;b>of&lt;/b> text'
			},
		]
	}
}

/**
   TreeView Helper
   @version: 1.00																					
   @author: Pablo E. Fernández (islavisual@gmail.com).
   @Copyright 2019 Islavisual.
   @Last update: 09/03/2019
 **/
if(it.enabledModules.Treeview){
	WikiHelper.Treeview = {
		general: {
			version: 1.0,
			name: 'Treeview',
			description: "Treeview is a graphical user interface component that displays a hierarchical view of information. Each element can have zero, one or more sub-elements or children. Normally it is usually visualized as a tabulated list and each element reveals its sub-elements through a change of state (from expanded to collapsed or vice versa).",
		},
		additional: [
			{
				description: 'You can customize the styles through CSS rules. For example:',
				example: '_CSS_// styles.css (from your site)\nul.treeview li .active { background: lightgray; color: rgb(51, 51, 51); }\nul.treeview li.search-box input { width: 100%; background: rgb(255, 255, 255); color: rgb(0, 0, 0); border: 1px solid rgba(0, 0, 0, 0.1); }\nul.treeview li i.icon { margin-right: 8px; }\nul.treeview li span { padding: 2px 5px; display: inline-block; }\nul.treeview li a { color: rgb(0, 153, 102); background: rgba(0, 0, 0, 0); }\nul.treeview li.collapsed ul { max-height: 0px; }\nul.treeview li ul { transition: all 0.3s ease 0s; max-height: 10000px; overflow: hidden; }\nul.treeview li i { cursor: pointer; }\nul.treeview li { color: rgb(0, 0, 0); }\nul.treeview, ul.treeview ul { list-style: none; }\nul.treeview { background: rgb(255, 255, 255); width: 100%; border: 1px solid rgba(0, 0, 0, 0.15); padding: 5px; }_CSS_'
			}
		],
		classLeaf: {
			type: 'string',
			description: 'The "classLeaf" parameter indicates the class name to leaf nodes. This class, for example, can be used to provide different styling this nodes type. By default is empty.',
			example: 'new Treeview({data: treeviewJSON, target: "treeview", classLeaf: "leaf-node"});'
		},
		collapsedIcon: {
			type: 'string',
			description: 'The "collapsedIcon" parameter indicates the character, the vectorial icon or html code that will be displayed instead of "collapse icon" by default and than reflects that the branch is closed. By default is \u25BA.',
			example: '// Example with Vectorial icons\nnew Treeview({data: treeviewJSON, target: \'treeview\', collapsedIcon: \'&lt;i class=\"plus\">&lt;/i>\'});\n// Example with Unicode icons\nnew Treeview({data: treeviewJSON, target: "treeview", collapsedIcon: "+"});'
		},
		expandedIcon: {
			type: 'string',
			description: 'The "expandedIcon" parameter indicates the character, the vectorial icon or html code that will be displayed instead of "expand icon" by default and than reflects that the branch is opened. By default is \u25BC.',
			example: '// Example with Vectorial icons\nnew Treeview({data: treeviewJSON, target: \'treeview\', expandedIcon: \'&lt;i class=\"less\">&lt;/i>\'});\n// Example with Unicode icons\nnew Treeview({data: treeviewJSON, target: "treeview", expandedIcon: "-"});'
		},
		leafIcon: {
			type: 'string',
			description: 'The "leafIcon" parameter indicates the character, the vectorial icon or html code that will be displayed instead of "leaf icon" by default and than reflects that, this node, don\'t has children. By default is empty.',
			example: '// Example with Vectorial icons\nnew Treeview({data: treeviewJSON, target: \'treeview\', leafIcon: \'&lt;i class=\"leaf\">&lt;/i>\'});\n// Example with Unicode icons\nnew Treeview({data: treeviewJSON, target: "treeview", leafIcon: "\\uD83D\\uDE54"});'
		},
		branchIcon: {
			type: 'string',
			description: 'The "branchIcon" parameter indicates the character, the vectorial icon or html code that will be displayed instead of "branch icon" by default and than reflects that this node has at least one child. By default is empty.',
			example: '// Example with Vectorial icons\nnew Treeview({data: treeviewJSON, target: \'treeview\', branchIcon: \'&lt;i class=\"folder\">&lt;/i>\'});\n// Example with Unicode icons\nnew Treeview({data: treeviewJSON, target: "treeview", branchIcon: "\\uD83D\\uDCC2"});'
		},
		customCheck: {
			type: 'string',
			description: 'HTML string with the new definition of checkbox. By default is empty (disabled).',
			example: 'new Treeview({\n\tdata: treeviewJSON,\n\ttarget: "treeview",\n\tcustomCheck: "&lt;label>Two&lt;input type=\'checkbox\'>&lt;span class=\'checkmark\'>&lt;/span>&lt;/label>"\n});'
		},
		data: {
			type: 'object',
			description: 'Object with the elements to manage or treat. This object must be in format JSON.',
			example: '//Example JSON to send to Treeview component.\nvar treeviewJSON = {\n\titems: [{\n\t\tid: 1,\n\t\tlabel: "Parent 1",\n\t\texpanded: true,\n\t\tchildren: [{\n\t\t\tid: 2,\n\t\t\tlabel : "Element 1",\n\t\t\tchildren : [\n\t\t\t\t{ id: 3, label: "Child 1 of Element 1", href: "#"},\n\t\t\t\t{ id: 4, label: "Child 2 of Element 1", href: "#"},\n\t\t\t]\n\t\t},\n\t\t{\n\t\t\tid: 5,\n\t\t\tlabel : "Element 2",\n\t\t\tchildren : [\n\t\t\t\t{ id: 6, label: "Child 1 of Element 2", href: "#"},\n\t\t\t\t{ id: 7, label: "Child 2 of Element 2", href: "#"},\n\t\t\t]\n\t\t}]\n\t}]\n}\nnew Treeview({data: treeviewJSON, target: "treeview"});'
		},
		onSelectNode: {
			type: 'function',
			description: 'The "onSelectNode" parameter indicates the function of callback when one node is selected. By default, this functionality is disabled.',
			example: 'new Treeview({data: treeviewJSON, target: "treeview", onSelectNode: callback});\nfunction callback(e){\n\tconsole.log(e);\n}'
		},
		onCheckNode: {
			type: 'function',
			description: 'The "onCheckNode" parameter indicates the function of callback when one node is checked. By default, this functionality is disabled.',
			example: 'new Treeview({data: treeviewJSON, target: "treeview", onCheckNode: callback});\nfunction callback(e){\n\tconsole.log(e);\n}'
		},
		selectable: {
			type: 'boolean',
			description: 'The "selectable" parameter indicates if the nodes will be selectables. By default is false.',
			example: 'new Treeview({data: treeviewJSON, target: "treeview", selectable: false});'
		},
		searchable: {
			type: 'boolean',
			description: 'The "searchable" parameter indicates if the nodes will be searchable. By default is false.',
			example: 'new Treeview({data: treeviewJSON, target: "treeview", searchable: false});'
		},
		placeholderText: {
			type: 'string',
			description: 'The "placeholderText" parameter indicates the text to display inside of input search when searchable is enabled. By default is "Filter...".',
			example: 'new Treeview({data: treeviewJSON, target: "treeview", placeholderText: "Writing to filter inside the tree"});'
		},
		styles: {
			type: 'object',
			description: 'The "styles" parameter indicates the basic colors that should be displayed in treeview component. This object will allow the next sub-parmeters:\n\t● <b>bgTree</b>: Background of tree. By default is transparent.\n\t● <b>borderTree</b>: Border of tree. By default is rgba(0,0,0,0.15).\n\t● <b>textColor</b>: Text color to nodes. By default is #000000.\n\t● <b>searchColor</b>: Text color to input of search. By default is #000.\n\t● <b>searchBg</b>: Background color to input of search. By default is #f0f0f0.\n\t● <b>activeColor</b>: Text color to selected node. By default is #ffffff.\n\t● <b>activeBg</b>: Background color of selected node. By default is #000000.\n\t● <b>linkColor</b>: Text color to nodes with link. By default is #006699.\n\t● <b>linkBg</b>: Background color to nodes with link. By default is transparent.',
			example: 'new Treeview({\n\tdata: treeviewJSON,\n\ttarget: "treeview",\n\tselectable: true,\n\tstyles: {\n\t\tbgTree: "#ffffff",\n\t\tborderTree: "rgba(0,0,0,0.15)",\n\t\ttextColor: "#000",\n\t\tsearchColor: "#000",\n\t\tsearchBg: "#fff",\n\t\tactiveColor: "#333",\n\t\tactiveBg: "lightgray",\n\t\tlinkColor: "#009966",\n\t\tlinkBg: "rgba(0,0,0,0)"\n\t}\n});'

		},
		target: {
			type: 'string',
			description: 'ID of the element where the treeview will be implemented. This ID must be UL tag of HTML.',
			example: 'new Treeview({data: treeviewJSON, target: "treeview"});'
		},
		checked: {
			type: 'boolean',
			description: 'The "verified" parameter indicates to the Treeview component that a node should change its state. This functionality needs an ID code to select the element to verify.',
			example: '// ULItem is the ID from HTML element where treeview is implemented\nfor(var i = 0; i < 20; i++){\n\tdocument.ULItem.Treeview({id; i, checked: true});\n}'
		},
		refresh: {
			type: 'function',
			description: 'The "refresh" parameter indicates to the treeview component should be reloaded.',
			example: 'var treeviewJSON = {\n\titems: [{\n\t\tid: 1,\n\t\tlabel: "Parent 1",\n\t\tchildren: [{\n\t\t\tid: 2,\n\t\t\tlabel : "Element 1",\n\t\t\tchildren : [\n\t\t\t\t{ id: 3, label: "Child 1 of Element 1", href: "#"},\n\t\t\t\t{ id: 4, label: "Child 2 of Element 1", href: "#"},\n\t\t\t]\n\t\t},\n\t\t{\n\t\t\tid: 5,\n\t\t\tlabel : "Element 2",\n\t\t\tchildren : [\n\t\t\t\t{ id: 6, label: "Child 1 of Element 2", href: "#"},\n\t\t\t\t{ id: 7, label: "Child 2 of Element 2", href: "#"},\n\t\t\t]\n\t\t}]\n\t}]\n};\n// ULItem is the ID from HTML element where Treeview is implemented\ndocument.ULItem.Treeview({data: treeviewJSON, refresh: true})'
		},
	}
}

/**
	 Validator functionality
	 @version: 1.00
	 @author: Pablo E. Fernández (islavisual@gmail.com).
	 @Copyright 2017-2019 Islavisual.
	 @Last update: 17/03/2019
 **/
if(it.enabledModules.Validator){
	WikiHelper.Validator = {
		general: {
			version: 1.0,
			name: 'Validator',
			help: 1,
			description: "This script sets custom validity messages for one form data input element . Remember that, for HTML5 , a validation message empty means that data input is right.",
		},
		additional: [
			{
				description: 'You can customize de validator-error and validator-error-msg class through CSS styles.',
				example: '_CSS_// Custom style to input field\n.validator-error{ box-shadow: 0 0 0 2px #f00 inset }\n//Custom color validation message\n.validator-error-msg{ background: rgba(255,0,0,0.1); width: 100%; display: block; padding: 5px; border: 1px solid rgba(255,0,0,0.2); }_CSS_'
			}
		],
		set: {
			type: 'function',
			description: 'The "set" method indicates to the Validator component that you want to apply a predefined constraint to a data input field. Usually this constraints are patternMismatch, rangeOverflow, rangeUnderflow, stepMismatch, "=", "!=", "<", ">", ">=" and "<=".',
			example: '// Allow only numbers and lower or equal to 100\nValidator.set({\n\ttarget: "percent",\n\tconstraint: "<=100",\n\tmessage: "Please, number must be lower or equal than 100",\n\trequired: true\n});\n\n// Allow only "Spain"\nValidator.set({\n\ttarget: "country",\n\tconstraint: "==\'Spain\'",\n\tmessage: "The right word is Spain",\n\tfixed: true,\n\trequired: true\n});\n\n// Allow only a list of values\nvar arraySex = ["man", "woman", "other"];\nValidator.set({\n\ttarget: "sex",\n\tconstraint: "arraySex.indexOf(this.value) != -1",\n\tmessage: "The posibles values are: man, woman, other"\n});\n\n// Allow only a range of values\ndocument.getElementById("range").setAttribute("type", "number");\ndocument.getElementById("range").setAttribute("min", 50);\ndocument.getElementById("range").setAttribute("max", 100);\nValidator.set({\n\ttarget: "range",\n\tfixed: true,\n\tconstraint: "!this.validity.rangeOverflow && !this.validity.rangeUnderflow",\n\tmessage: "The possibles values are from 50 to 100"\n});\n\n// Validating of password:At least one upper case letter, at least one lower case letter,\n// at least one digit, at least one special character and with minimum of eight in length.\nValidator.set({\n\ttarget: "pwd",\n\tfixed: true,\n\trequired: true,\n\tconstraint: "!this.validity.patternMismatch",\n\tmessage: "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",\n\tpattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"\n});'
		},
		fileset: {
			type: 'function',
			description: 'Define the constraints that the file inputs must have. This functionality is fed of a JSON object that supports:\n\t● <b>accept</b>: Is a string that defines, separated by commas, the file types the file input should accept. By default is empty.\n\t● <b>preview</b>: Enable the preview of the file. By default is false.\n\t● <b>size</b>:Limits (in KB) the file size to upload. By default is 0.\n\t● <b>message</b>:Message to show when the file input is invalid.',
			example: '// Allow only Word file types\nValidator.fileset({\n\ttarget: "file",\n\taccept: ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",\n\tmessage: "The files allowed are all Word formats!"\n});\n\n// Enable preview inside of thumbnail container\nValidator.fileset({target: "file", preview: true});\n\n// Limit the image files size to 100KB\nValidator.fileset({target: "file", maxsize: 100, accept: "image/*", message: "The file size should be less at 100 KB"});'
		},
		fixed: {
			type: "boolean",
			description: 'This property indicates to Validator that messages must be shown below input field.',
			example: '// Limit the jpeg files size to 250KB and show message under input file\nValidator.fileset({\n\ttarget: "file",\n\tfixed: true,\n\tmaxsize: 250,\n\taccept: ".jpg,.jpeg",\n\tmessage: "The file size should be less at 250 KB"\n});'
		},
		newValidation: {
			type: 'function',
			description: 'Defines custom validations through JavaScript code.',
			example: 'Validator.target = document.getElementById("checkbox");\nValidator.newValidation("input", "\\\n\tif (!this.checked) {\\\n\t\te.target.setCustomValidity("Must be checked!");\\\n\t\te.target.classList.add("validator-error")\\\n\t\tValidator.addMessage(e.target);\\\n\t} else {\\\n\t\te.target.setCustomValidity("");\\\n\t\te.target.classList.remove("validator-error");\\\n\t\te.target.nextElementSibling.remove();\\\n\t}\\\n");'
		},
		onInvalid: {
			type: "function",
			description: 'Add the oninvalid event that execute a JavaScript when an input field is invalid.',
			example: 'Validator.target = document.getElementById("inputRequired");\nValidator.onInvalid("this.classList.add(\'validator-error\')")'
		},
	}
}

/**
   Helper functionality
   @version: 1.00																					
   @author: Pablo E. Fernández (islavisual@gmail.com).
   @Copyright 2019 Islavisual.
   @Last update: 01/03/2019
 **/

this.Helper = it.Helper = function (func, cfg) {
	// if func is "index" or empty, build the object
	if(typeof func == "undefined") func = "index";
	
	// if configuration is undefined, set by default
	if(typeof cfg == "undefined" || cfg == null) cfg = { theme: 'DARK', printOnScreen: true };

	// If index helper not exists, build it!
	if (typeof WikiHelper.index == "undefined") {
		var idx = "index";
		WikiHelper[idx] = {
			general: {
				name: 'Index',
				version: 1.00,
				description: "Index of scripts into isiTools"
			}
		}
		for (var key in WikiHelper) {
			if (key.toLowerCase() == 'index') continue;

			if (typeof WikiHelper[idx][WikiHelper[key].general.name] == "undefined") {
				WikiHelper[idx][WikiHelper[key].general.name] = {};
			}

			var aux = {};
				aux = Object.assign({}, WikiHelper[key]);
			if(typeof aux.general != "undefined") delete aux.general;
			if(typeof aux.additional != "undefined") delete aux.additional;

			if(typeof WikiHelper[key].general.help != "undefined" && WikiHelper[key].general.help == 1){
				WikiHelper[key].general.help = '<comm>// Para obtener ayuda general sobre el script/plugin</comm>\n' + WikiHelper[key].general.name + '.help();\n';
				WikiHelper[key].general.help += WikiHelper[key].general.name + ".help({theme: '" + (!cfg.hasOwnProperty('theme') ? 'DARK' : cfg.theme.toLowerCase()) + "'});\n";
				if(typeof Object.keys(aux)[0] != "undefined"){
					WikiHelper[key].general.help += '\n<comm>// Para obtener ayuda sobre un método o propiedad específica</comm>\n' + WikiHelper[key].general.name + ".help({help: '" + Object.keys(aux)[0] + "', theme: '" + (!cfg.hasOwnProperty('theme') ? 'DARK' : cfg.theme.toLowerCase()) + "'});\n";
				}
			} else {
				WikiHelper[key].general.help = '<comm>// Para obtener ayuda general sobre el script/plugin</comm>\n' + WikiHelper[key].general.name + "('help');\n";
				WikiHelper[key].general.help += WikiHelper[key].general.name + "({help: '', theme: '" + (!cfg.hasOwnProperty('theme') ? 'DARK' : cfg.theme.toLowerCase()) + "'});\n";
				if(typeof Object.keys(aux)[0] != "undefined"){
					WikiHelper[key].general.help += '\n<comm>// Para obtener ayuda sobre un método o propiedad específica</comm>\n' + WikiHelper[key].general.name + "({help: '" + Object.keys(aux)[0] + "', theme: '" + (!cfg.hasOwnProperty('theme') ? 'DARK' : cfg.theme.toLowerCase()) + "'});\n";
				}
			}

			WikiHelper[idx][WikiHelper[key].general.name].description = WikiHelper[key].general.description + '\n<a onclick="' + WikiHelper[key].general.help.split("\n")[1] + "\"><b>Click here for obtein help about " + WikiHelper[key].general.name + "</b>.</a>";
			WikiHelper[idx][WikiHelper[key].general.name].example =  WikiHelper[key].general.help;
			WikiHelper[idx][WikiHelper[key].general.name].example = WikiHelper[idx][WikiHelper[key].general.name].example.replace(new RegExp (WikiHelper[key].general.name, 'ig'), function($0){ return "<name>" + $0 + "</name>"; })
		}
	}

	// Get object with the info
	var sourceHelper = WikiHelper[func];

	// Extract general data
	var help = Object.assign({}, sourceHelper);
	var general = sourceHelper.general;
	delete help.general;

	// if exists another Helper, is removed
	if (document.querySelector("#h31p3r")) {
		document.querySelector("#h31p3r").remove();
		document.body.style.position = '';
	}

	// Set themes
	var darkTheme = { fieldColor: '#999', stringColor: '#fff', exampleColor: '#ff6694', keyColor: '#467bfe', commentColor: '#828282', funcNameColor: '#0fbf88', boolColor: '#36e05c', strColor: '#c8c9ba', funcColor: '#f1c33d', intColor: '#ffabab', nullColor: '#b1b2b3' };
	var lightTheme = { fieldColor: '#777', stringColor: '#222', exampleColor: '#0059af', keyColor: '#e91235', commentColor: '#656667', funcNameColor: '#07845d', boolColor: '#159460', strColor: '#ea6c10', funcColor: '#6e009a', intColor: '#12009a', nullColor: '#ff0000' };
	var theme = !cfg.hasOwnProperty('theme') ? 'DARK' : cfg.theme.toUpperCase();

	// Set Options
	var opt = {};
	opt = theme == "DARK" ? darkTheme : lightTheme;
	if (theme == 'DARK') {
		opt.background = '#101010';
		opt.color = '#fff';
		opt.highlight = 'rgba(0,0,0,0.1)';

	} else if (theme == 'LIGHT') {
		opt.background = '#f0f0f0';
		opt.color = '#333';
		opt.highlight = 'rgba(255,255,255,0.1)';

	}
	opt.method = !cfg.hasOwnProperty('method') ? null : cfg.method;
	opt.property = !cfg.hasOwnProperty('property') ? null : cfg.property;
	opt.printOnScreen = !cfg.hasOwnProperty('printOnScreen') ? true : cfg.printOnScreen;

	// If method or property is set, print only your help
	var spec = false, aux = {};
	if (opt.method || opt.property) {
		aux[opt.method] = help[opt.method];
		help = aux;
		spec = true;
	}

	// Set HTML template
	var template = '<i class="btn-times" onclick="this.parentElement.remove(); document.body.style.position=\'\';"></i>\
	<a href="#" onclick="Helper(\'index\', {theme: \'' + theme + '\'});">Ir al índice</a>\
	<h2>Pantalla de ayuda para ' + general.name + " " + general.version.toFixed(2) + '</h2>\
	<p style="margin-top: 64px">'+ general.description + '</p>\
	<p>Parámetros y opciones:</p>\
	__TEXT__\
<div id="additionalH31p3r" style="display:none; margin-top: 32px">\
	<h3>Información adicional</h3>\
	__ADDITIONAL__\
</div>\
	<div id="h31p3rOptions">\
		<p>Opciones del Helper:</p>\
		<p style="padding-left: 32px;">\
			● <key>printOnScreen</key>: Booleano que indica si se debe mostrar la ayuda en pantalla o, de lo contrario, por consola. Por defecto es true.<br/>\
			● <key>method</key>: Mostrar la ayuda del método solicitado.<br/>\
			● <key>property</key>: Mostrar la ayuda de la propiedad solicitada.<br/>\
			● <key>theme</key>: Sus posibles valores son "dark" para el tema utilizar oscuro y "light" para el tema claro. Por defecto es "dark".\
		</p>\
		<p>\
			<field>Ejemplos</field>\
			__HELPEROPTIONS__\
		</p>\
	</div>';

	if (general.name.toLowerCase() == "index") {
		template = '<i class="btn-times" onclick="this.parentElement.remove(); document.body.style.position=\'\';"></i>\
		<h2>Tabla de contenidos de isiTools ' +  general.version.toFixed(2) + '</h2>\
		<div style="margin-top: 64px">\
		IsiTools es un conjunto de herramientas para ayudar a los desarrolladores durante el proceso de creación del proyecto. Las herramientas proporcionadas están diseñadas para obtener una mejor experiencia de usuario y un desarrollo más utilizable y reutilizable. Además, permite que cada funcionalidad se cargue de forma independiente a través de JSON proporcionado a través del archivo config.json o mediante el parámetro "modules" establecido en el attributo SRC.\
		<br/>\
		<br/>\
		Instalación<br/>\
		Descargar / copiar las librerías en tu carpeta javascript de tu proyecto. Después, inserta el código necesario para activar isiTools. Por ejemplo:\
		<code><comm>// Cargar todas las funciones</comm><br/>\
&lt;script src="isitools.js" /><br/>\
&lt;script src="isitoolsHerlper.js" /><br/>\
<comm>// Cargar selectivamente algunas características</comm><br/>\
&lt;script src="isitools.js<int>?modules=AddCSSRule+Alert+Autocomplete+DOM</int>" /><br/>\
&lt;script src="isitoolsHerlper.js" /><br/></code>\
			__TEXT__\
		</div>\
		';
	}

	if (opt.printOnScreen) {
		AddCSSRule('', "#h31p3rOptions p:first-of-type", 'text-transform: uppercase; padding-left: 0; margin-top: 50px; color: ' + opt.stringColor + '; border-bottom: 2px solid ' + opt.highlight + ';');
		AddCSSRule('', "#h31p3r", 'font-family: arial; position:fixed;top: 0;left: 0;width: 100%;height: 100%; white-space: pre-line; padding: 15px;margin: 0;border: 0 none; border-radius:0;background-color: ' + opt.background + '; color: ' + opt.color + ';z-index: 99999999;');
		AddCSSRule('', "#h31p3r h2", 'color: ' + opt.background + ';text-align: center;background: ' + opt.color + ';padding: 15px;font-size: 20px;font-variant: small-caps;position: fixed;width: 100%;left: 0;top: -10px;border-bottom: 1px solid rgba(255,255,255,.1);')
		AddCSSRule('', "#h31p3r h3", 'text-transform: uppercase; margin: 32px 0 10px; font-size:1.0rem; padding:5px; border-bottom: 2px solid ' + opt.highlight + '; color: ' + opt.keyColor + ';');
		AddCSSRule('', "#h31p3r h3[onclick]", 'cursor:pointer');
		AddCSSRule('', "#h31p3r field", 'text-transform: capitalize; padding: 15px 0 5px 32px; display: inline-block; color: ' + opt.fieldColor + ';');
		AddCSSRule('', "#h31p3r field.des, #h31p3r field.exa", "display: block; width: 100%;");
		AddCSSRule('', '#h31p3r type', 'padding-left: 8px;');
		AddCSSRule('', '#h31p3r text', 'padding-left: 32px; color: ' + opt.stringColor + '; display: block; width: 100%; white-space: pre-wrap;');
		AddCSSRule('', '#h31p3r text a', 'color: ' + opt.stringColor + '; cursor: pointer; ');
		AddCSSRule('', '#h31p3r > a', 'position: fixed;left: 10px;top: 10px; border: 1px solid ' + opt.highlight + '; padding: 3px 10px; line-height:26px;z-index:9; color: ' + opt.background + ';');
		AddCSSRule('', '#h31p3r > a:hover', 'background: ' + opt.background + '; color: ' + opt.color + ';');
		AddCSSRule('', '#h31p3r int', 'color: ' + opt.intColor + ';');
		AddCSSRule('', '#h31p3r str, #h31p3r str int', 'color: ' + opt.strColor + ';');
		AddCSSRule('', '#h31p3r bool', 'color: ' + opt.boolColor + ';');
		AddCSSRule('', '#h31p3r func', 'color: ' + opt.funcColor + ';');
		AddCSSRule('', '#h31p3r name', 'color: ' + opt.funcNameColor + ';');
		AddCSSRule('', '#h31p3r null', 'color: ' + opt.nullColor + ';');
		AddCSSRule('', '#h31p3r comm, #h31p3r comm int, #h31p3r comm str, #h31p3r comm bool, #h31p3r comm > name', 'color: ' + opt.commentColor + ';');
		AddCSSRule('', '#h31p3r code, #h31p3r pre code', 'color: ' + opt.exampleColor + '; padding-left: 32px; display: block; ');
		AddCSSRule('', '#h31p3r key', 'color: ' + opt.keyColor + ';');
		AddCSSRule('', '#h31p3r .btn-times', 'position: fixed; right: 32px; top: 15px; width: 24px; height: 24px; opacity: 0.3; z-index:9; cursor: pointer;');
		AddCSSRule('', '#h31p3r .btn-times:hover', 'opacity: 1;');
		AddCSSRule('', '#h31p3r .btn-times::before, #h31p3r .btn-times::after', 'position: absolute; left: 15px; content: " "; height: 24px; width: 2px; background-color: ' + opt.background + ';');
		AddCSSRule('', '#h31p3r .btn-times::before', 'transform: rotate(45deg);');
		AddCSSRule('', '#h31p3r .btn-times::after', 'transform: rotate(-45deg);');

		var text = '', additional = '';
		var idx = 0;
		for (var prop in help) {
			if (prop != "additional" && general.name.toLowerCase() != "index") {
				var type = help[prop].hasOwnProperty("type") ? help[prop].type : '';
				text += '<h3>' + ((type == "function" ? 'Método ' : 'Propiedad ') + prop) + '</h3>';
			} else if (general.name.toLowerCase() == "index") {
				var wprop = prop.indexOf(".") ? prop.split(".")[0] : prop;
				
				text += '<h3 onclick="' + WikiHelper[wprop].general.help.split("\n")[1] + '">' + wprop + '</h3>';
			}

			if (typeof help[prop] == "undefined") {
				text += '<span style="padding-left: 32px; color: ' + opt.stringColor + '">El método o propiedad solicitada no está definida. Para revisar la ayuda manualmente intenta:</p>';
				text += '<span style="padding-left: 32px; color: ' + opt.stringColor + '"><code>' + (func) + '("help");</code></span></p>';
			}

			for (var key in help[prop]) {
				if (help[prop].hasOwnProperty("type") || general.name.toLowerCase() == "index") {
					var keyTranslated = key.replace(/type/ig, 'Tipo').replace(/example/ig, 'Ejemplos').replace(/description/ig, 'Descripción');
					text += '<field class="' + key.substr(0, 3) + '">' + keyTranslated + '</field>' + (key == "type" ? '' : '');
					items = help[prop][key].split("\n");
					text += key == 'example' ? ('<code>' + styleItems(key, items) + '</code>') : styleItems(key, items);

				} 
			}

			for (var k = 0; k < help[prop].length; k++) {
				for (var subkey in help[prop][k]) {
					items = help[prop][k][subkey].split("\n");
					var subkeyTranslated = subkey.replace(/example/ig, 'Ejemplos').replace(/description/ig, 'Descripción');
					additional += '<field class="' + key.substr(0, 3) + '">' + subkeyTranslated + '</field>' + (subkey == "type" ? '' : '');
					additional += subkey == 'example' ? ('<code>' + styleItems(subkey, items) + '</code>') : styleItems(subkey, items);
				}
			}
			idx++;
		}

		// Add to body the help requested
		var aux = template.replace(/__BACKGROUND__/ig, opt.background)
			.replace(/__COLOR__/ig, opt.color)
			.replace(/__TEXT__/ig, text)
			.replace(/__ADDITIONAL__/ig, additional)
			.replace(/__HELPEROPTIONS__/ig, typeof WikiHelper['index'][func] != "undefined" ? ("<code>" + WikiHelper['index'][func].example + '</code>') : '')
			.replace(/\\"/ig, '"')
			.replace(/\\n/ig, '<br/>');

		var a = document.createElement("pre");
			a.setAttribute("id", "h31p3r");
			a.innerHTML = aux;

		document.body.appendChild(a);

		if (additional.trim() != "") document.getElementById("additionalH31p3r").style.display = '';
		document.body.style.position = "fixed";
	} else {
		printIntoConsole(help);
	}

	function styleItems(key, items) {
		var text = '';

		var isCSS = items.join('|').match(/_CSS_(.*?)_CSS_/g);
		if(isCSS){
			items = highlightCSS(isCSS);
			items = items.join().replace(/_CSS_/ig, '').split("|");
		}

		for (var i = 0; i < items.length; i++) {
			var aux = items[i];

			var color = opt.stringColor, tag = "text";
			if (key == "type") {
				color = aux == "string" ? opt.strColor : (aux == "function" ? opt.funcColor : (aux == "boolean" ? opt.boolColor : (aux == "integer" ? opt.intColor : (opt.nullColor))));
				tag = aux == "object" ? 'key' : (aux == "function" ? "func" : (aux == "boolean" ? 'bool' : (aux == "integer" ? 'int' : ('null'))));
			}

			// Set color and content to example lines
			if (key == "example" && !isCSS) {
				aux = aux.replace(/[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+|px|em|rem|%|s)?/ig, function (s) { return '<int>' + s + '</int>' });
				aux = aux.replace(/"(.*?)"/g, function (s) { return '<str>' + s + '</str>' });
				aux = aux.replace(/'(.*?)'/g, function (s) { return '<str>' + s + '</str>' });
				aux = aux.replace(/true/ig, '<bool>true</bool>').replace(/false/ig, '<bool>false</bool>');
				aux = aux.replace(/function/ig, '<func>function</func>');
				aux = aux.replace(/null/ig, '<null>null</null>');
				aux = aux.indexOf("//") != -1 ? ('<comm>' + aux + '</comm>') : aux;
				aux = aux.replace(new RegExp(func + "(\\.|\\()", "ig"), function($0, $1){ return "<name>" + $0.substr(0, $0.length-1) + "</name>" + $1})
				aux += '<br/>';

				text += key == "type" ? ('<type style="color: ' + color + '">' + aux + '</type>') : (key == 'example' ? aux : ('<' + tag + '>' + aux + '</' + tag + '>'));

			} else if (key == "example" && isCSS) {
				text += aux;
			} else {
				text += key == "type" ? ('<type style="color: ' + color + '">' + aux + '</type>') : (key == 'example' ? aux : ('<' + tag + '>' + aux + '</' + tag + '>'));
			}
		}

		return text;
	}

	function highlightCSS(txt){
		for(var c = 0; c < txt.length; c++){
			var item = txt[c];
			
			if(typeof it.StripTags == "function") item = it.StripTags(item, '');
			
			var props = item.match(/\{.*?\}/g), rulesNew = '';
			var sltrs = item.split("}");
	
			for(var i = 0; i < props.length; i++){
				var feats = props[i].split(";");
				var key = (sltrs[i]+"}").replace(props[i], '');
				var str = '';
			
				for(var j = 0; j < feats.length; j++){
					var feat = feats[j].trim().replace("{", '').replace("}", '').trim();
					if(feat != "") 
						str += "\n\t<null>" + feat.substr(0, feat.indexOf(":")) + "</null>:" + feat.substr(feat.indexOf(":") + 1) + "; ";
				}
				str += "\n}";
				
				rulesNew += "<name>" + key + "</name> { " + str + "<br/>";
			}
			txt[c] = txt[c].replace(item, rulesNew);

			var aux = txt[c].split("|");
			for(var x = 0; x < aux.length; x++){
				if(aux[x].indexOf("//") != -1 && aux[x].indexOf("<name>") != -1){
					aux[x] = '<comm>' + aux[x] + '</name></comm><name>';
				} else if(aux[x].indexOf("//") != -1 && aux[x].indexOf("<name>") == -1){
					aux[x] = '<comm>' + aux[x] + '</comm>';
				} 

				aux[x] += '|';
			}
			txt[c] = aux.join("\n");
		}

		return txt;
	}

	function printIntoConsole(json) {
		if (typeof json != 'string') {
			json = JSON.stringify(json, undefined, '\t');
		}

		var
			arr = [],
			_string = 'color:' + opt.stringColor,
			_number = 'color:' + opt.numberColor,
			_boolean = 'color:' + opt.booleanColor,
			_null = 'color:' + opt.nullColor,
			_key = 'color:' + opt.keyColor;
		_bold = 'font-weight:bold';
		_normal = 'font-weight:normal';

		json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
			var style = _number;
			if (/^"/.test(match)) {
				if (/:$/.test(match)) {
					style = _key;
				} else {
					style = _string;
				}
			} else if (/true|false/.test(match)) {
				style = _boolean;
			} else if (/null/.test(match)) {
				style = _null;
			}

			arr.push(style);
			arr.push('');

			if (style == _string) match = match.replace(/<b>/gm, "«").replace(/<\/b>/gm, "»");

			match = match.replace(/\\t/ig, "\t")
				.replace(/\\n/ig, "\n")
				.replace(/\\r/ig, "\r")
				.replace(/\\"/ig, "'");

			return '%c' + match + '%c';
		});

		if (arr.length == 0) {
			console.log("El método o propiedad solicitada no está definida. Para revisar la ayuda manualmente intenta:");
			console.log(func + '("help");');
		} else {
			arr.unshift(json);
			console.log.apply(console, arr);
		}
	}
}

this.showHelper = it.showHelper = function(cs, cfg){
	// If Helper is defined and user request help
	if (typeof window.Helper != "undefined") {
		if (cfg == "help") { Helper(cs); return false; }

		if (cfg.hasOwnProperty('help')) {
			var help = {};
			for (var prop in cfg) {
				if (prop == 'help') help.method = cfg[prop];
				else help[prop] = cfg[prop];
			}
			Helper(cs, help);
			return false;
		}
	} else if( cfg == "help") {
		if(typeof window.Alert != "undefined")
			Alert({title: cs + ' Helper', body: 'Helper no disponible!', styles: { body: { color: '#c01012' } } })
		else 
			alert('Helper no disponible!');
		return;
	}
}
