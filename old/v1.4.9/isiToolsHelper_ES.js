var WikiHelper = {}

/**
   AddCSSRule Helper																		
   @version: 1.10																					
   @author: Pablo E. Fernández (islavisual@gmail.com).												
   @Copyright 2017-2019 Islavisual. 																	
   @Last update: 04/04/2019																			
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
   @version: 1.1
   @author: Pablo E. Fernández (islavisual@gmail.com).
   @Copyright 2017-2019 Islavisual.
   @Last update: 30/04/2019
 **/
if(it.enabledModules.Autocomplete){
	WikiHelper.Autocomplete = {
		general: {
			version: 1.0,
			name: 'Autocomplete',
			description: 'Este componente podría considerarse una mejora del componente "select" que proporciona HTML. Permite buscar y seleccionar de una lista de valores previamente rellenada a medida que se escribe, aprovechando la búsqueda y el filtrado.\n\n\
Tambien permite realizar búsquedas mediante caracteres comodin como son las comillas dobles, el símbolo más o el símbolo asterisco.\n\n\
Para entender mejor el significado de los caracteres comodín, supóngase que se tiene un array con los siguientes datos <code style="display: inline; padding: 0;">[<str>"Fat Bob"</str>, <str>"Street Bob"</str>, <str>"Scout Bobber"</str>, <str>"Sportster Iron"</str>, <str>"Rockster Flat"</str>, <str>"Street Rod"</str>]</code>\
<ul>\
<li><str>""</str>: Busca los resultados que coincidan exactamente con la cadena entrecomillada. Por ejemplo, si buscamos <str>"bobber"</str> no devolverá nada, pero si buscamos <str>"scout bobber"</str>, nos devolverá el registro que contenga el campo marca establecido a ese valor.</li>\n\
<li><str>+</str>: Permite establecer búsquedas que tengan coincidencias parciales o totales de ambas expresiones. Por ejemplo, si buscamos <str>fat+b</str>, nos devolverá Fat Bob.</li>\n\
<li><str>*</str>: El símbolo asterisco equivale a decir "cualquier cosa", pero dependiendo de dónde se encuentre y cuántos haya, significará una cosa u otra.\n\
Si se establece delante de una expresión buscará todas las coincidencias que terminen con la expresión. Así, si buscamos <str>*bob</str>, nos devolverá "Fat Bob", "Street Bob".\n\
Si se establece detrás de una expresión buscará todas las coincidencias que empiecen con la expresión. Así, si buscamos <str>str*</str>, nos devolverá "Street Bob" y "Street Rod".\n\
Si se establece delante y detrás de una expresión buscará todas las coincidencias que contengan la expresión. Así, si buscamos <str>*ster*</str>, nos devolverá "Sportster Iron", "Rockster Flat".</li>\
</ul>\n\
Es simple, fácil de personalizar y de utilizar y hace que el rendimiento de la página se vea poco afectado.',
		}, 
		additional: [
			{
				description: 'Personalizar los estilos del componente:',
				example: '_CSS_// styles.css (from your site)\n.autocomplete-items { position: absolute; background: #ffffff; border: 1px solid #e0e0e0; z-index: 99; top: 100%; left: 15px; right: 0; width: -moz-calc(100% - 30px); width: -webkit-calc(100% - 30px); width: calc(100% - 30px); max-height: 210px; overflow-y: auto; overflow-x: hidden; }\n.autocomplete-items div.value { line-height: normal; padding: 10px; cursor: pointer; background-color: #fff;  border-bottom: 0px solid #d4d4d4;  text-transform: capitalize; }\n.autocomplete-items div.value:hover, \n.autocomplete-active { background-color: #006699 !important;  color: #ffffff; }\n.autocomplete-items .header,\n.autocomplete-items .error { background: #fff; border-bottom: 1px solid #bfbfbf; width: 100%; line-height: 28px; padding: 0 10px; pointer-events: none; }\n.autocomplete-items .header span, \n.autocomplete-items .value span { width: 100%; display: inline-block; vertical-align: top; }\n.autocomplete-items .header span,\n.autocomplete-items .error span { display: table-cell; height: auto; min-height: 32px; padding: 5px 0; line-height: normal; color: #000; font-size: 13px; font-weight: 600; text-transform: uppercase; }\n.autocomplete-items .error span { color: #f01223; }\n.autocomplete-items .error.not-found span { color: #a0a0a0; text-transform: none; }\n.autocomplete-items .error + .value { color: #000; font-weight: bold; }\n.autocomplete-items.table .header { display: table; }\n.autocomplete-items.cluster .header,\n.autocomplete-items .error { border-bottom: 0 none; margin-top: 15px; text-transform: uppercase; font-size: 0.85rem; font-weight: 600; }\n.autocomplete-items.cluster .header span { color: #bbb; }\n.autocomplete-items .value.highlighted { font-weight: bold; background: transparent; color: #008bb2; }\n.autocomplete-items .value.disabled { font-weight: 100;  background: #eee; color: #aaa; }_CSS_'
			}
		],
		ajax: {
			type: 'boolean',
			description: 'Indica que se van a utilizar llamadas al servidor para recuperar los datos del autocomplete. Por defecto es <str>false</str>.',
			example: 'var arrayList = ["Coche", "Motorcicleta", "Avión", "Tren", "Bicicleta"];\n\
new Autocomplete({\n\
	target: "inputTextID",\n\
	data: arrayList,\n\
	format: "list",\n\
	ajax: true\n\
})'
		},
		autofocus: {
			type: 'boolean',
			description: 'Indica que se establezca el foco después de que finalice la creación del autocomeplete. Por defecto es <str>false</str>.',
			example: 'var arrayList = ["Coche", "Motorcicleta", "Avión", "Tren", "Bicicleta"];\n\
new Autocomplete({\n\
	target: "inputTextID",\n\
	data: arrayList,\n\
	format: "list",\n\
	autofocus: true\n\
})'
		},
		callback: {
			type: 'function',
			description: 'Función que se llamará cuando se seleccione un elemento de la lista de autocompletado.<br><br>\
Lo que recibirá esta función de retorno será un elemento de formulario input de tipo text con el valor solicitado en la propiedad <str>return_value</str> y la posición del item seleccionado dentro del diccionario de datos referenciado por la propiedad <str>data</str>. Por esta razón, dependiendo del tipo de auto complete utilizado, se podrá recuperar la de formas distintas.<br><br>\
Como información adicional, si se desea acceder desde esta función de retorno a la configurción o a los datos declarados en el objeto data del autocomplete, se puede hacer a través de la expresión <name>Autocomplete</name>.<str>target.XXX</str>, donde <str>XXX</str> es el ID del input asignado al autocomplete.',
			example: '// Ejemplo de función callback para un autocomplete de tipo list (lista)\n\
function callback(input){\n\
	var index = input.dataset.index;\n\
	var id = input.dataset.id;\n\
	var value = input.value;\n\
	console.log("Nº Registro:", index, "Extraído del elemento con ID", id, "Valor seleccionado:", value);\n\
}\n\n\
// Ejemplo de función callback para un autocomplete de tipo table (tabla)\n\
function callback(input){\n\
	var index = input.dataset.index;\n\
	var config = Autocomplete.targets[input.dataset.id].opt;\n\
	var item = config.data[index];\n\
\n\
	// Desde item ya se puede acceder a cualquiera de los datos del registro original\n\
	console.log("Nº Registro:", index, "Datos seleccionados", item);\n\
}\n\n\
// Ejemplo de función callback para un autocomplete de tipo cluster (agrupado)\n\
function callback(input){\n\
    var indexes = input.dataset.index.split(",");\n\
    var config = Autocomplete.targets[input.dataset.id].opt;\n\
    var group = config.data[indexes[0]][config.clusterFields.groupby];\n\
    var item = config.data[indexes[0]][config.clusterFields.items][indexes[1]];\n\
	console.log("Elemento Seleccionado:", group, item);\n\
}'
		},
		className: {
			type: 'string',
			description: 'Clase CSS que se agregará a los elementos del complemento autocomplete. Esta clase es la que se utilizará para definir los estilos del componente.<br><br>\
Por defecto, el nombre de la clase de control es <str>autocomplete</str>.<br></br>\
<b style="display: inline-block;">NOTA:</b> Mirar la información adicional para personalizar los estilos del componente.',
			example: 'var arrayList = ["Coche", "Motorcicleta", "Avión", "Tren", "Bicicleta"];\n\
new Autocomplete({\n\
	target: "catalogBox",\n\
	data: arrayList,\n\
	className: "auto-complete"\n\
});'
		},
		row: {
			type: 'object',
			description: 'Objeto que permite personalizar la estructura del diccionario de datos a gestionar asignado a la propiedad <str>data</str>".<br><br>\
Si el formato del autocomplete es de tipo "table", los parámetros que puede recibir son:\n\
<ul>\
<li><name>columns</name>: Es un array que indica el nombre de los campos que se desea que muestren cuando se realiza una búsqueda. Por defecto, si no se establece este parámetro, devolverá el primer campo o propiedad del registro.</li>\
<li><name>headers</name>: Es un array que indica el nombre de los campos que se establecerán como cabecera de la tabla. Por defecto, si no se establece este parámetro, devolverá los mismos nombres que estén indicados en la propiedad <str>columns</str>.</li>\
<li><name>return_value</name>: Indica el nombre del campo que se devolverá a la función de declarada en la propiedad <str>callback</str>. Por defecto, esta propiedad tiene asignado el valor <str>group</str>.</li>\
<li><name>showHEaders</name>: Indica si se debe o no mostrar la cabecera de la tabla. Por defecto, esta propiedad está asignada a <str>false</str>.</li>\
</ul>\
Si el formato del autocomplete es de tipo "cluster", los parámetros que puede recibir son:\n\
<ul>\
<li><name>group</name>: Indica el nombre de la clave de agrupación. Por defecto, esta propiedad tiene asignado el valor <str>group</str>.</li>\
<li><name>items</name>: Indica el nombre de la clave dónde estarán almacenados la información a buscar. Por defecto, esta propiedad tiene asignado el valor <str>items</str>.</li>\
<li><name>columns</name>: Es un array que indica el nombre de los campos que se desea que muestren cuando se realiza una búsqueda. Por defecto, si no se establece este parámetro, devolverá el primer campo o propiedad del registro.</li>\
<li><name>return_value</name>: Indica el nombre del campo que se devolverá a la función de declarada en la propiedad <str>callback</str>. Por defecto, esta propiedad tiene asignado el valor <str>group</str>.</li>\
</ul>',
			example: '// Ejemplo de autocomplete de tipo table (tabla)\n\
var countriesJSON = [\n\
	{ id: 1, country: "Afganistán", capital: "Kabul", location: "Se encuentra dentro de Asia del Sur y Asia Central.", disabled: 1 },\n\
	{ id: 2, country: "Albania", capital: "Tirane", location: "Se encuentra en el sureste de Europa.",  disabled: 0 },\n\
	{ id: 3, country: "España", capital: "Madrid", location: "Se encuentra al al noreste con Francia y Andorra.",  disabled: 0 },\n\
];\n\
new Autocomplete({\n\
	target: "inputTextID",\n\
	format: "table",\n\
	data: countriesJSON,\n\
	row: {\n\
		return_value: "id",\n\
		columns: ["country", "code", "capital"],\n\
		headers: ["País", "Código", "Capital"],\n\
		showHeaders: false\n\
	}\n\
});\n\n\
// Ejemplo de autocomplete de tipo cluster (agrupado)\n\
var vehiclesList = [\n\
	{ marca: "Seat", modelos: [{id: 101, modelo: "Arona", coste: 1}, {id: 102, modelo: "Ibiza", coste: 2}, {id: 103, modelo: "León", coste: 3}] },\n\
	{ marca: "Ford", modelos: [{id: 201, modelo: "Fiesta", coste: 4}, {id: 202, modelo: "Mondeo", coste: 5}, {id: 203, modelo: "Focus", coste: 6}] },\n\
	{ marca: "Renault", modelos: [{id: 301, modelo: "Captur", coste: 7}, {id: 302, modelo: "Clio", coste: 8}, {id: 303, modelo: "Espace", coste: 9}] },\n\
];\n\
new Autocomplete({\n\
	target: "inputTextID",\n\
	data: vehiclesList,\n\
	format: "cluster",\n\
	row: {\n\
		return_value: "modelo",\n\
		columns: ["modelo", "coste"],\n\
		groupby: "marca",\n\
		items: "modelos"\n\
	}\n\
});'
		},
		data: {
			type: 'object',
			description: 'Objeto con los elementos para manejar o tratar. Este objeto puede estar en formato <str>JSON</str> o estar en formato <str>Array</str>.',
			example: 'var arrayList = ["Coche", "Motorcicleta", "Avión", "Tren", "Bicicleta"];\n\
new Autocomplete({\n\
	target: "inputTextID",\n\
	data: arrayList\n\
});'
		},
		delay: {
			type: 'integer',
			description: 'Es el valor en milisegundos que personaliza el tiempo de espera entre que el usuario deja de escribir y se realiza la búsqueda. Por defecto está establecido a <str>300</str> milisegundos.',
			example: 'var arrayList = ["Coche", "Motorcicleta", "Avión", "Tren", "Bicicleta"];\n\
new Autocomplete({\n\
	target: "inputTextID",\n\
	data: arrayList,\n\
	delay: 1000\n\
});'
		},
		format: {
			type: 'string',
			description: 'Es el formato en el que se presentarán los datos. Según el formato en el que se presentan los datos, el objeto <str>data</str> debe definirse de una forma u otra.\n\
Este parámetro tiene como valor por defecto es "list".\nLos posibles valores son:\n\
<ul>\n\
<li><name>list</name>: El objeto de datos del autocomplete está configurado como un array de cadenas.</li>\n\
<li><name>table</name>: El objeto de datos del autocomplete está configurado como un array de objetos JSON. Para que el autocomplete pueda manjar este objeto debe seguir las normas establecidas por la propiedad <str>row</str>.</li>\n\
<li><name>cluster</name>: El objeto de datos del autocomplete está configurado como un array de objetos JSON que dentro tiene otro array de objetos JSON. Para que el autocomplete pueda manjar este objeto debe seguir las normas establecidas por la propiedad <str>row</str>.</li>\n\
</ul>',
			example: '// Ejemplo de autocomplete en formato list (lista)\n\
var arrayList = ["Coche", "Motorcicleta", "Avión", "Tren", "Bicicleta"];\n\
new Autocomplete({\n\
	target: "inputTextID",\n\
	format: "list",\n\
	data: arrayList\n\
});\n\n\
// Ejemplo de autocomplete en formato table (tabla) \n\
var countriesJSON = [\n\
	{ id: 1, country: "Afganistán", capital: "Kabul", location: "Se encuentra dentro de Asia del Sur y Asia Central.", disabled: 1 },\n\
	{ id: 2, country: "Albania", capital: "Tirane", location: "Se encuentra en el sureste de Europa.",  disabled: 0 },\n\
	{ id: 3, country: "España", capital: "Madrid", location: "Se encuentra al al noreste con Francia y Andorra.",  disabled: 0 },\n\
];\n\
new Autocomplete({\n\
	target: "inputTextID",\n\
	format: "table",\n\
	data: countriesJSON,\n\
	row: {\n\
		return_value: "id",\n\
		columns: ["country", "code", "capital"],\n\
		headers: ["Country", "Code", "Capital"],\n\
		showHeaders: true\n\
	}\n\
});\n\n\
// Ejemplo en formato cluster (agrupado)\n\
var brandsList = [\n\
	{ group: "Coches", items: [\n\
            { id: 1, text: "Ford", tooltip: "Estadounidense", unavailable: false},\n\
            { id: 2, text: "Jaguar", tooltip: "Inglesa", unavailable: false},\n\
            { id: 3, text: "Seat", tooltip: "Española", unavailable: true}\n\
        ]},\n\
	{ group: "Motocicletas", items: [\n\
            { id: 1, text: "Suzuki", tooltip: "Japonesa", unavailable: true},\n\
            { id: 2, text: "Ducati", tooltip: "Italiana", unavailable: false},\n\
            { id: 3, text: "Hayley-Davidson", tooltip: "Estadounidense", unavailable: false}\n\
        ]},\n\
];\n\
new Autocomplete({\n\
	target: "inputTextID",\n\
	format: "cluster",\n\
	data: brandsList\n\
});'
		},
		disable: {
			type: 'object',
			description: 'Indica qué campo se utilizará como selector para indicar si está deshabilitado el elemento producto de la búsqueda. Si el resultado de la evaluación se considera verdadera, se añadirá la clase proporcionada por la propiedad <str>class</str>.<br><br>\
Los valores permitidos para este campo pueden ser booleanos (<str>true</str> o <str>false</str>) o de tipo binario (<str>0</str> ó <str>1</str>), donde 0 se interpreta como <str>false</str> y 1 se interpreta como <str>true</str>.',
			example: '// Ejemplo de autocomplete en formato table (tabla) \n\
var countriesJSON = [\n\
	{ id: 1, country: "Afganistán", capital: "Kabul", location: "Se encuentra dentro de Asia del Sur y Asia Central.", disabled: 1 },\n\
	{ id: 2, country: "Albania", capital: "Tirane", location: "Se encuentra en el sureste de Europa.",  disabled: 0 },\n\
	{ id: 3, country: "España", capital: "Madrid", location: "Se encuentra al al noreste con Francia y Andorra.",  disabled: 0 },\n\
];\n\
new Autocomplete({\n\
	target: "inputTextID",\n\
	format: "table",\n\
	data: countriesJSON,\n\
	disable: {\n\
		// Nombre del campo con el flag que indica si destacado o no\n\
		field: "disabled",\n\
		// Clase CSS a asignar cuando el selector tenga un valor establecido a verdadero\n\
		class: "disabled",\n\
	},\n\
	row: {\n\
		return_value: "id",\n\
		columns: ["country", "capital"],\n\
		headers: ["País", "Capital"]\n\
	}\n\
});\n\n\
// Ejemplo en formato cluster (agrupado)\n\
var brandsList = [\n\
	{ group: "Coches", items: [\n\
		{ id: 1, text: "Ford", tooltip: "Estadounidense", unavailable: false},\n\
		{ id: 2, text: "Jaguar", tooltip: "Inglesa", unavailable: false},\n\
		{ id: 3, text: "Seat", tooltip: "Española", unavailable: true}\n\
	]},\n\
	{ group: "Motocicletas", items: [\n\
		{ id: 1, text: "Suzuki", tooltip: "Japonesa", unavailable: true},\n\
		{ id: 2, text: "Ducati", tooltip: "Italiana", unavailable: false},\n\
		{ id: 3, text: "Hayley-Davidson", tooltip: "Estadounidense", unavailable: false}\n\
	]},\n\
];\n\
new Autocomplete({\n\
	target: "inputTextID",\n\
	data: clusterList,\n\
	minLength: 1,\n\
	disable: {\n\
		// Nombre del campo con el flag que indica si destacado o no\n\
		field: "unavailable",\n\
		// Clase CSS a asignar cuando el selector tenga un valor establecido a verdadero\n\
		class: "disabled",\n\
	},\n\
	format: "cluster",\n\
});'
		},
		highlight: {
			type: 'object',
			description: 'Indica qué campo se utilizará como selector para indicar si está destacado el elemento producto de la búsqueda. Si el resultado de la evaluación se considera verdadera, se añadirá la clase proporcionada por la propiedad <str>class</str>.<br><br>\
Los valores permitidos para este campo pueden ser booleanos (<str>true</str> o <str>false</str>) o de tipo binario (<str>0</str> ó <str>1</str>), donde 0 se interpreta como <str>false</str> y 1 se interpreta como <str>true</str>.',
			example: '// Ejemplo de autocomplete en formato table (tabla) \n\
var countriesJSON = [\n\
	{ id: 1, country: "Afganistán", capital: "Kabul", location: "Se encuentra dentro de Asia del Sur y Asia Central.", EU: 0 },\n\
	{ id: 2, country: "Albania", capital: "Tirane", location: "Se encuentra en el sureste de Europa.",  EU: 1 },\n\
	{ id: 3, country: "España", capital: "Madrid", location: "Se encuentra al al noreste con Francia y Andorra.",  EU: 1 },\n\
];\n\
new Autocomplete({\n\
	target: "inputTextID",\n\
	format: "table",\n\
	data: countriesJSON,\n\
	highlight: {\n\
		// Nombre del campo con el flag que indica si destacado o no\n\
		field: "EU",\n\
		// Clase CSS a asignar cuando el selector tenga un valor establecido a verdadero\n\
		class: "highlighted",\n\
	},\n\
	row: {\n\
		return_value: "id",\n\
		columns: ["country", "capital"],\n\
		headers: ["País", "Capital"]\n\
	}\n\
});\n\n\
// Ejemplo en formato cluster (agrupado)\n\
var brandsList = [\n\
	{ group: "Coches", items: [\n\
		{ id: 1, text: "Ford", tooltip: "Estadounidense", unavailable: false},\n\
		{ id: 2, text: "Jaguar", tooltip: "Inglesa", unavailable: false},\n\
		{ id: 3, text: "Seat", tooltip: "Española", unavailable: true}\n\
	]},\n\
	{ group: "Motocicletas", items: [\n\
		{ id: 1, text: "Suzuki", tooltip: "Japonesa", unavailable: true},\n\
		{ id: 2, text: "Ducati", tooltip: "Italiana", unavailable: false},\n\
		{ id: 3, text: "Hayley-Davidson", tooltip: "Estadounidense", unavailable: false}\n\
	]},\n\
];\n\
new Autocomplete({\n\
	target: "inputTextID",\n\
	data: clusterList,\n\
	minLength: 1,\n\
	highlight: {\n\
		// Nombre del campo con el flag que indica si destacado o no\n\
		field: "unavailable",\n\
		// Clase CSS a asignar cuando el selector tenga un valor establecido a verdadero\n\
		class: "highlighted",\n\
	},\n\
	format: "cluster",\n\
});'
		},
		minLengthMessage: {
			type: 'string',
			description: 'Es un mensaje que se muestra únicamente cuando la propiedad minLength es -1. Se puede utilizar, por ejemplo, para sacar un mensaje mientras se carga y configura el componente o para indicar el estado del autocomplete.',
			example: 'var arrayList = ["Coche", "Motorcicleta", "Avión", "Tren", "Bicicleta"];\n\n\
new Autocomplete({target: "inputTextID", data: {}, ajax: true, url: "https:\u002F<n/>\u002Fwsdeejemplo.com/get", minLength: -1, minLengthMessage: "Cargando..."});\n\n\
new Autocomplete({target: "inputTextID", data: arrayList, minLength: -1, minLengthMessage: "Elemento desactivado..."});'
		},
		voidMessage: {
			type: 'string',
			description: 'Indica el mensaje a mostrar cuando no hay resultados.',
			example: 'new Autocomplete({target: "inputTextID", data: {}, minLength: -1, voidMessage: "No se han encontrado coincidencias"});'
		},
		minLength: {
			type: 'integer',
			description: 'Indica la longitud mínima para comenzar a buscar dentro del diccionario de datos asignado por la propiedad <str>data</str>. Por defecto es <str>3</str>.',
			example: 'var arrayList = ["Coche", "Motorcicleta", "Avión", "Tren", "Bicicleta"];\nnew Autocomplete({target: "inputTextID", data: arrayList, minLength: 4});'
		},
		target: {
			type: 'string',
			description: 'ID del input de tipo texto dónde el se implementará el autocomplete.',
			example: 'var arrayList = ["Coche", "Motorcicleta", "Avión", "Tren", "Bicicleta"];\nnew Autocomplete({target: "inputTextID", data: arrayList});'
		},
		tooltips: {
			type: 'object',
			description: 'Este parámetro es un JSON que indica qué campos se utilizarán como fuente de los tooltip.<br><br>\
Si se utiliza el modo <name>cluster</name>, sólo se debe indicar el campo dónde está el texto del tooltip. Si se utiliza el modo <name>table</name>, se debe indicar el nombre del campo dónde se insertará el tooltip y el campo del tooltip.',
			example: '// Ejemplo de autocomplete en formato table (tabla) \n\
var countriesJSON = [\n\
	{ id: 1, country: "Afganistán", capital: "Kabul", location: "Se encuentra dentro de Asia del Sur y Asia Central.", disabled: 1 },\n\
	{ id: 2, country: "Albania", capital: "Tirane", location: "Se encuentra en el sureste de Europa.",  disabled: 0 },\n\
	{ id: 3, country: "España", capital: "Madrid", location: "Se encuentra al al noreste con Francia y Andorra.",  disabled: 0 },\n\
];\n\
new Autocomplete({\n\
	target: "inputTextID",\n\
	format: "table",\n\
	data: countriesJSON,\n\
	// Tooltip es un array de JSON que puede definir tantos tooltips como columnas se muestran\n\
	tooltip: [{\n\
		//Nombre del campo donde se establecerá el tooltip\n\
		field: "country"\n\
		//Nombre del campo que contiene el texto utilizado por el tooltip\n\
		text: "location"\n\
	}],\n\
	row: {\n\
		return_value: "id",\n\
		columns: ["country", "capital"],\n\
		headers: ["País", "Capital"]\n\
	}\n\
});\n\n\
// Ejemplo en formato cluster (agrupado)\n\
var brandsList = [\n\
	{ group: "Coches", items: [\n\
		{ id: 1, text: "Ford", tooltip: "Estadounidense", unavailable: false},\n\
		{ id: 2, text: "Jaguar", tooltip: "Inglesa", unavailable: false},\n\
		{ id: 3, text: "Seat", tooltip: "Española", unavailable: true}\n\
	]},\n\
	{ group: "Motocicletas", items: [\n\
		{ id: 1, text: "Suzuki", tooltip: "Japonesa", unavailable: true},\n\
		{ id: 2, text: "Ducati", tooltip: "Italiana", unavailable: false},\n\
		{ id: 3, text: "Hayley-Davidson", tooltip: "Estadounidense", unavailable: false}\n\
	]},\n\
];\n\
new Autocomplete({\n\
	target: "inputTextID",\n\
	data: clusterList,\n\
	minLength: 1,\n\
	tooltips: {\n\
		// Nombre del campo donde se encuentra el texto del tooltip\n\
		field: "tooltip"\n\
	},\n\
	format: "cluster",\n\
});'
		},
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
   @version: 1.1
   @author: Pablo E. Fernández (islavisual@gmail.com).
   @Copyright 2017-2019 Islavisual.
   @Last update: 04/03/2019
 **/
if(it.enabledModules.Constraint){
	WikiHelper.Constraint = {
		general: {
			version: 1.1,
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
			description: 'El parámetro "type" define el formato o el tipo de datos que permitirá el control. Los valores aceptados son:\n\t● <b>int</b>: Los valores permitidos son únicamente enteros positivos y negativos.\n\t● <b>uint</b>: Los valores permitidos son únicamente enteros positivos.\n\t● <b>float</b>: Los valores permitidos son enteros y números reales con decimales infinitos.\n\t● <b>decimal</b>: Los valores permitidos son enteros y números reales con dos decimales.\n\t● <b>percent</b>: Los valores permitidos son entre 0 y 100.\n\t● <b>binary</b>: Los valores permitidos son números enteros escritos y definidos a través de su base, en este caso 0 y 1.\n\t● <b>hexadecimal</b>: Los valores permitidos son números enteros escritos y definidos a través de su base, en este caso de 0 a 9 y de A a F.\n\t● <b>hour</b>: Los valores permitidos son de 00:00 a 23:59.\n\t● <b>custom</b>: Permite definir una función de tipo personalizado. El subtipo "custom" se alimenta del parámetro "function", por lo que si el control se define como "custom", será obligatorio (el parámetro "function").',
			example: '// Example of Integer subtype\nnew Constraint.set({target: "inputTextID", type: "int"});\n\n// Example of Hour subtype\nnew Constraint.set({target: "inputTextID", type: "hour"});\n\n// Example of Custom subtype (Number in octal format). The custom subtype needs \nnew Constraint.set({\n\ttarget: "inputTextID",\n\ttype: "custom",\n\tfunction: function(value) {\n\t\treturn /^[0-7]*$/i.test(value);\n\t},\n\tbase: 8,\n});\n\n// Sólo letras con  acentos a través del bloque unicode Latin1\n// \\u00C0-\\u00FF Suplemento Latin-1\n// \\u0100-\\u017F Latín Extendido-A\n// \\u0180-\\u024F Latín Extendido-b\n// \\u1E00-\\u1EFF Latín Extendido Adicional\nnew Constraint.set({\n\ttarget: "name",\n\ttype: "custom",\n\tfunction: function(value) {\n\t\treturn /^[a-zA-Z\s\\u00C0-\\u024F\\u1E00-\\u1EFF]*$/.test(value);\n\t}\n});'
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
	 Datepicker functionality
	 @version: 1.00
	 @author: Pablo E. Fernández (islavisual@gmail.com).
	 @Copyright 2017-2019 Islavisual.
	 @Last update: 11/07/2019
 **/
if(it.enabledModules.Datepicker){
	WikiHelper.Datepicker = {
		general: {
			version: 1.0,
			name: 'Datepicker',
			help: 1,
			description: 'Datepicker es un control que permite al usuario seleccionar una fecha concreta de una lista con unos pocos clicks.'
		},
		shortdays: {
			type: 'Object',
			description: 'El attributo "shortdays" establece la abreviatura de los días de la semana. Se puede utilizar para cambiar el idioma.',
			example: 'it("#birth-date").Datepicker({shortdays: ["L", "M", "X", "J", "V", "S", "D"]});'
		},
		longdays: {
			type: 'Object',
			description: 'El attributo "longdays" establece los identificadores completos de los días de la semana. Se puede utilizar para cambiar el idioma.',
			example: 'it("#birth-date").Datepicker({shortdays: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]});'
		},
		shortmonths: {
			type: 'Object',
			description: 'El attributo "shortmonths" establece la abreviatura de los meses del año. Se puede utilizar para cambiar el idioma.',
			example: 'it("#birth-date").Datepicker({shortmonths: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]});'
		},
		longmonths: {
			type: 'Object',
			description: 'El attributo "longmonths" establece los identificadores completos de los meses del año. Se puede utilizar para cambiar el idioma.',
			example: 'it("#birth-date").Datepicker({longmonths: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]});'
		},
		weekstart: {
			type: 'Integer',
			description: 'El attributo "weekstart" establece si la semana debe empezar en 0 (Domingo) o 1 (Lunes). Por defecto es 1.',
			example: 'it("#birth-date").Datepicker({weekstart: 0});'
		},
		textToday: {
			type: 'String',
			description: 'Indica el texto del botón que establece la fecha de hoy.',
			example: 'it("#birth-date").Datepicker({textToday: "Today"});'
		},
		textRemove: {
			type: 'Integer',
			description: 'Indica el texto del botón que borra la fecha del campo de texto destino.',
			example: 'it("#birth-date").Datepicker({textToday: "Remove"});'
		},
		format: {
			type: 'String',
			description: 'Indica el formato para la introducción de la fecha. En general se utilizan los formatos DD-MM-YYYY (Little Endian), MM-DD-YYYY (Meddium Endian) y YYYY-MM-DD (Big Endian)',
			example: 'it("#birth-date").Datepicker({format: "DD-MM-YYYY", background: "#0066a8", foreground: "#fff"});'
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
			description: 'IntelliForm es una herramienta para realizar operaciones con formularios. Permite agregar elementos de formulario en tiempo real, realizar solicitudes de publicación a través de JSON, automatizar secuencias de navegación, manejar operaciones de deshacer/rehacer y mucho más.'
		},
		addElement: {
			type: "object",
			description: 'Esta funcionalidad permite agregar elementos a un formulario a través del objeto JSON en tiempo de ejecución. Las propiedades JSON válidas son las típicas de HTML excepto "dataset" y "validate" que tienen un formato específico.\n\t● <b>dataset</b>: Es un JSON con atributos de nombre y valor.\n\t● <b>validate</b>: Es igual al formato Validator sin parámetro de destino. Para obtener más información, se puede consultar la ayuda del Validador de isiTools ejecutando "Validator.help()".',
			example: 'IntelliForm.addElements({\n\ttarget: "formID",\n\tdata:[\n\t\t{\n\t\t\ttag: "input",\n\t\t\tid: "age",\n\t\t\tclass: "form-item",\n\t\t\ttype: "number",\n\t\t\tmin: 18,\n\t\t\tmax: 100,\n\t\t\tvalidate: {\n\t\t\t\tfixed: true,\n\t\t\t\tconstraint: "!this.validity.rangeOverflow && !this.validity.rangeUnderflow",\n\t\t\t\tmessage: "Los posibles valores son entre 18 y 100"\n\t\t\t}\n\t\t},\n\t\t{\n\t\t\ttag: "input",\n\t\t\tid: "username",\n\t\t\tclass: "form-item",\n\t\t\ttype: "text",\n\t\t\tdataset: [\n\t\t\t\t{name: "id", value: "0"},\n\t\t\t\t{name: "logged", value: "true"}\n\t\t\t],\n\t\t\tfocus: function(){\n\t\t\t\tthis.classList.add("focused");\n\t\t\t\t},\n\t\t\tblur: function(){\n\t\t\t\tthis.classList.remove("focused");\n\t\t\t}\n\t\t},\n\t\t{\n\t\t\ttag: "input",\n\t\t\tid: "pwd",\n\t\t\tclass: "form-item",\n\t\t\ttype: "password",\n\t\t\tvalidate: {\n\t\t\t\tfixed: true,\n\t\t\t\trequired: true,\n\t\t\t\tconstraint: "!this.validity.patternMismatch",\n\t\t\t\tmessage: "Debe contener al menos un número y una letra mayúscula y minúscula, y al menos 8 o más caracteres",\n\t\t\t\tpattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"\n\t\t\t},\n\t\t\tfocus: function(){\n\t\t\t\tthis.classList.add("focused");\n\t\t\t},\n\t\t\tblur: function(){\n\t\t\t\tthis.classList.remove("focused");\n\t\t\t}\n\t\t}\n\t]\n});'
		},
		autofill: {
			type: "function",
			description: 'Permite rellenar todos los campos con los valores que se capturaron a través de la funcionalidad "enableUndo".',
			example: 'IntelliForm.autofill();'
		},
		setUndo: {
			type: "function",
			description: 'Proporciona la lógica necesaria para administrar todos los cambios que se realizan dentro de los input y select, incluso si la página se vuelve a cargar.',
			example: '// Habilitar Deshacer para todo tipo de inputs.\nIntelliForm.setUndo({target: ["input[type=text]"]});\n\n// Otra forma es:\nIntelliForm.target = ["name", "surname", "street", "phone", "email"];\nIntelliForm.setUndo();'
		},
		startSequence: {
			type: "function",
			description: 'Proporciona una forma de crear una secuencia de cambios en "tiempo real" sobre la página actual para su reproducción posterior, incluso cuando la página se vuelve a cargar.',
			example: 'IntelliForm.startSequence();\n// Para detener la secuencia se debe ejecutar la función de "stopSequence".',
		},
		stopSequence: {
			type: "function",
			description: 'Detiene y guarda el registro de eventos. Esta funcionalidad solo funciona si "startSequence" se habilitó antes, de lo contrario, esta acción no tendrá ningún efecto.',
			example: 'IntelliForm.stopSequence();',
		},
		getSequence: {
			type: "function",
			description: 'Devuelve la secuencia guardada para la página actual.',
			example: 'IntelliForm.getSequence();\n// This will return something similar to:\n"[\n\t{"ts":0,"id":"_bodyItem58","event":"focusin"},\n\t{"ts":35,"id":"_bodyItem58","event":"click"},\n\t{"ts":37,"id":"_bodyItem58","event":"change","value":""}\n\t...\n]',
		},
		setSequence: {
			type: "function",
			description: 'Permite establecer una nueva secuencia para interactuar con la página actual. Esta funcionalidad recibe un parámetro de tipo cadena con los pasos que se desean ejecutar. Las posibles propiedades dentro de la secuencia son:\n\t● <b>ts</b>: indica el tiempo, en milisegundos, que debe transcurrir entre el cambio anterior y actual.\n\t● <b>id</b>: Indica el nombre (de identificación válido) al que se aplicará el cambio. Puede ejecutar la funcionalidad "setIDs()" antes de asignar la propiedad "id" automáticamente.\n\t● <b>event</b>: indica el tipo de cambio. Los eventos posibles son: click, focusin, focusout, scroll, change y keydown.\n\t● <b>left</b>: indican la posición izquierda en eventos de desplazamiento (scroll).\n\t● <b>key</b>: indica el carácter que se presiona en los eventos keydown.\n\t● <b>keyCode</b>: indica el código de la tecla JavaScript presionado en los eventos keydown.\n\t● <b>top</b>: Indica la posición superior en los eventos de desplazamiento (scroll).\n\t● <b>value</b>: indica el valor del elemento en los eventos de tipo change.\n\r\nNota: la mejor manera de crear una secuencia es usar la funcionalidad "startSequence".',
			example: 'IntelliForm.setSequence(\'[{"ts":0,"id":"_bodyItem58","event":"focusin"},{"ts":35,"id":"_bodyItem58","event":"click"},{"ts":37,"id":"_bodyItem58","event":"focusout"},...]\');',
		},
		removeSequence: {
			type: "function",
			description: 'Eliminar la secuencia de la página actual.',
			example: 'IntelliForm.removeSequence();',
		},
		playSequence: {
			type: "function",
			description: 'Permite reproducir una secuencia ya almacenada. Si el parámetro de la función está vacío, se recupera la secuencia a la página actual.',
			example: 'IntelliForm.playSequence();',
		},
		setIDs: {
			type: "function",
			description: 'Asigna un atributo "id" secuencial a todos los elementos que no lo tengan establecido.',
			example: 'IntelliForm.setIDs();',
		},
		send: {
			type: "function",
			description: 'Permite crear y enviar formularios en tiempo real a través de Ajax con método post. Los parámetros recibidos son: URL (para realizar la solicitud) y JSON con los inputs/elementos a enviar.',
			example: 'IntelliForm.send({\n\turl: "../pages/setProduct",\n\tparams: [{\n\t\t"type": "text",\n\t\t"id": "idProduct",\n\t\t"value": "1"\n\t}]\n});',
		},
		target:{
			type: "object",
			description: "Array de selectores con los elementos donde se habilitarán las funcionalidades de IntelliForm.",
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
			description: "Este método indica si el dispositivo actual es \"mobile\" o no.",
		},
		additional: [
			{
				description: 'Para saber si el dispositivo es un dispositivo móvil:',
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
			description: "Este script le permite activar y administrar la función de multilenguaje en su sitio web.",
		},
		init: {
			type: 'function',
			description: 'Asignar e inicializar la funcionalidad de multilenguaje.',
			example: 'var availableLangs = [\n\t{id: "en-US", name: "English"},\n\t{id: "es-ES", name: "Spanish"},\n];\nvar translations = {\n\t"es-ES": [\n\t\t{ id: "Loading...", text: "Cargando..." },\n\t\t{ id: "Loaded!", text: "Cargado!" },\n\t\t{ id: "Comments", text: "Observaciones" }\n\t],\n\t"en-US": [\n\t\t{ id: "Loading...", text: "<i class="fa fa-spin"></i>" },\n\t\t{ id: "Loaded!", text: "OK!" }\n\t]\n};\nLanguage.init(availableLangs, translations);'
		},
		render: {
			type: 'function',
			description: 'Analiza todo el documento y reemplaza todas las coincidencias de patrones. Esta funcionalidad se alimenta de los atributos "data-tkey", "data-placeholder-tkey" y "data-title-tkey".',
			example: '// The availableLangs and translations objects are defined before.\n// For example, supposed the next HTML code:\n//\t&lt;label for="notes" data-tkey="Comments">&lt;/label>\n//\t&lt;input id="notes" name="notes" placeholder="Comments" type="text" maxlength="255" />\nLanguage.init(availableLangs, translations);\nLanguage.render();\n\n// Note that the placeholder is translated and assugn the source text to "data-placeholder-tkey" attribute.'
		},
		set: {
			type: 'function',
			description: 'Establece el idioma actual. De forma predeterminada, el idioma es el que se proporciona a través del navegador.\nAdvertencia: Para admitir la compatibilidad del navegador, el código de idioma enviado se codificaría en ISO-639-1.',
			example: '// Supposed that language by default in Chrome is "es-ES" (ISO 639-1 code to Spain)\nLanguage.set("en-US");'
		},
		get: {
			type: 'function',
			description: 'Devuelve la traducción para la cadena recibida. Si no se encuentra la coincidencia, se supone que no tiene traducción y devuelve la misma cadena.',
			example: 'var tkey = Language.get("Loading...");\n// Si se desea recuperar la traducción para un idioma especificado, se puede enviar el identificador de idioma como segundo parámetro:\nvar tkey_ES = Language.get("Loading...", "es-ES");'
		}
	}
}

/**
	 Masking functionality
	 @version: 1.00
	 @author: Pablo E. Fernández (islavisual@gmail.com).
	 @Copyright 2017-2019 Islavisual.
	 @Last update: 12/07/2019
 **/
if(it.enabledModules.Mask){
	WikiHelper.Mask = {
		general: {
			version: 1.0,
			name: 'Mask',
			help: 1,
			description: 'Herramienta para generar máscaras de entrada en campos de texto que ayuda a los usuarios a introducir valores correctos.'
		},
		Mask: {
			type: 'Object',
			description: 'Indica el formato para la introducción del campo. Las posibles máscaras son:\n\t● <b>9</b>: Para indicar que sólo se aceptarán números del 0-9.\n\t● <b>A</b>: Para indicar que sólo se aceptarán caracteres alfanuméricos de la A-Z.\n\t● <b>#</b>: Para indicar que sólo se aceptará cualquier caracter.\n\t● <b>DD, MM e YYYY</b>: Para indicar formatos de tipo fecha. En general se utilizan los formatos DD-MM-YYYY (Little Endian), MM-DD-YYYY (Meddium Endian) y YYYY-MM-DD (Big Endian)\n\t● <b>HH, II e SS</b>: Para indicar formatos de tipo hora.',
			example: 'Mask.set({target: "date", mask: "YYYY-MM-DD"});\nMask.set({target: "time", mask: "HH:II"});\nMask.set({target: "phone", mask: "(+99)-999-999-999"});\nMask.set({target: "code", mask: "99A-99#A-####-999A"});'
		},
	}
}

/**
   Nstate Helper																		
   @version: 1.00																					
   @author: Pablo E. Fernández (islavisual@gmail.com).												
   @Copyright 2017-2019 Islavisual. 																	
   @Last update: 14/06/2019																			
 **/
if(it.enabledModules.Nstate){
	WikiHelper.Nstate = {
		general: {
			version: 1.0,
			name: 'Nstate',
			help: 1,
			description: "Este script le permite crear componentes de tipo Switch para selección de valores binarios y/o de tipo multi selección de más de dos valores.",
		},
		set: {
			type: 'function',
			description: 'Permite crear nuevos componentes de Nstate a través de un ID en el HTML y una llamada JavaScript. Los tipos admitidos son "switch" que se comporta como un checkbox de HTML y "multiple" que se comporta como un range de HTML.',
			exampleSwitch: '// Definición básica de un switch\nNstate.set({\n\ttarget: "sw1",\n\tlabelOn: "On",\n\tlabelOff: "Off"});\n\n// Definición de un switch con estilos y colores personalizados\nNstate.set({\n\ttarget: "sw2",\n\tlabelOn: "On",\n\tlabelOff: "Off",\n\tcolors: {\n\t\tbackground: "#ff0000",\n\t\ttextColor: "#ffff00",\n\t\ttrackColor: "#0000ff"\n\t},\n\tstyle:"margin-top: 15px"\n});',
			exampleMultple: '// Definición básica de un selector múltiple\nNstate.set({\n\ttype: "multiple",\n\ttarget: "sw1",\n\tvalues:[\n\t\t{label: "Bajo", value: 0},\n\t\t{label: "Medio", value: 1},\n\t\t{label: "Alto", value: 2}\n\t],\n\tselected: 1\n});\n\n// Definición con estilos y colores personalizados\nNstate.set({\n\ttype: "multiple",\n\ttarget: "sw1",\n\tvalues:[\n\t\t{label: "Bajo", value: 0},\n\t\t{label: "Medio", value: 1},\n\t\t{label: "Alto", value: 2}\n\t],\n\tselected: 1,\n\tcolors: {\n\t\tbackground: "#ff0000",\n\t\ttextColor: "#ffff00",\n\t\ttrackColor: "#0000ff"\n\t},\n\tstyle:"margin-top: 15px"\n});'
		},
		autoDraw: {
			type: 'function',
			description: 'Permite que los componentes se definan a través de HTML5 y, más tarde, con este método generarlos.',
			exampleSwitch: '// HTML Code\n&lt;nstate\tid="switch1"\n\ttype="switch"\n\tlabel-on="On"\n\tlabel-off="Off"\n\tselected="0"\n\tbackground="#ffffff" text-color="#000000" track-color="#f0f0f0"\n\tstyle="width: 200px;"\n\tonclick="console.log(\'cambiado!\')">\n&lt;/nstate>\n\n// Javascript to generate the components\n&lt;script>\n\tNstate.autoDraw();\n&lt;/script>',
			exampleMultiple: '// HTML Code\n&lt;nstate\tid="subtype"\n\ttype="multiple"\n\tvalues="Moto:0, Coche:1, Quad:2"\n\tselected="2"\n\tbackground="#226699" text-color="#000000" track-color="#f0f0f0"\n\tstyle="display: inline-block; width: calc(100% - 128px);">\n&lt;/nstate>\n\n// Javascript to generate the components\n&lt;script>\n\tNstate.autoDraw();\n&lt;/script>'
		},
	}
}

/**
	Bootstrap Overflow Tabs
	@version: 1.0
	@author: Pablo E. Fernández (islavisual@gmail.com).
	@Copyright 2017-2019 Islavisual.
	@Last update: 23/09/2019																		
 **/
if(it.enabledModules.BootstrapOverflowTabs){
	WikiHelper.BootstrapOverflowTabs = {
		general: {
			version: 1.0,
			name: 'BootstrapOverflowTabs',
			help: 1,
			description: "Este comopnente redefine los tabs de Bootstrap para que no se produzca ningún desbordamiento ni solapamiento.",
		},
		bootstrapOverflowTabs: {
			type: 'function',
			description: 'Función constructora que establece la configuración necesaria para que no se produzca ningún desbordamiento ni solapamiento.',
			example: '&lt;ul class="nav nav-tabs nav-tabs-overflow">\n\
	&lt;li class="active">\n\
		&lt;a data-toggle="tab" href="#tab1">\n\
			Programación Imperativa\n\
		&lt;/a>\n\
	&lt;/li>\n\
	&lt;li>\n\
		&lt;a data-toggle="tab" href="#tab2">\n\
			Programación orientada a objetos\n\
		&lt;/a>\n\
	&lt;/li>\n\
	&lt;li>\n\
		&lt;a data-toggle="tab" href="#tab3">\n\
			Programación dirigida por eventos\n\
		&lt;/a>\n\
	&lt;/li>\n\
	&lt;li>\n\
		&lt;a data-toggle="tab" href="#tab4">\n\
			Programación funcional\n\
		&lt;/a>\n\
	&lt;/li>\n\
	&lt;li>\n\
		&lt;a data-toggle="tab" href="#tab5">\n\
			Programación lógica\n\
		&lt;/a>\n\
	&lt;/li>\n\
	&lt;li>\n\
		&lt;a data-toggle="tab" href="#tab6">\n\
			Programación reactiva\n\
		&lt;/a>\n\
	&lt;/li>\n\
	&lt;li>\n\
		&lt;a data-toggle="tab" href="#tab7">\n\
			Programación multiparadigma\n\
		&lt;/a>\n\
	&lt;/li>\n\
&lt;/ul>\n\
&lt;div class="tab-content">\n\
	&lt;div id="tab1" class="tab-pane fade in active">\n\Algoritmos. Ejemplos: C, BASIC o Pascal.&lt;/div>\n\
	&lt;div id="tab2" class="tab-pane fade">\n\Encapsulación. Ejemplos:  JavaScript, C#, Java, Python y SmallTalk&lt;/div>\n\
	&lt;div id="tab3" class="tab-pane fade">\n\Estructura y ejecución por sucesos: Ejemplos: NodeJS&lt;/div>\n\
	&lt;div id="tab4" class="tab-pane fade">\n\Definición de Predicados. Ejemplos: Scheme, Lisp y Haskell&lt;/div>\n\
	&lt;div id="tab5" class="tab-pane fade">\n\Relaciones lógicas. Ejemplos: Prolog&lt;/div>\n\
	&lt;div id="tab6" class="tab-pane fade">\n\Eventos y suscripción. Ejemplos: Microsoft Rx&lt;/div>\n\
	&lt;div id="tab7" class="tab-pane fade">\n\Combinación de paradigmas. Ejemplos: Lisp, Python, C++, Genie, Delphi, Visual Basic, PHP o D5&lt;/div>\n\
&lt;/div>\n\
&lt;script>\n\
	it(".nav-tabs-overflow").bootstrapOverflowTabs();\n\
&lt;/script>'
		},
		_navMouseStep: {
			type: 'integer',
			description: 'Propiedada que indica el tamaño del paso mientras se mantiene pulsado el ratón. Por defecto, el paso es 10 píxeles, lo que significa que en cada pulso del ratón la cabecera de los tabs se desplazará 10 píxeles a la izquierda o a la derecha.\n\nSi se desea más rápido se puede aumentar este valor. Si se desea más lento, se puede decrementar este valo.',
			example: '',
		},
	}
}

/**
	Password tools
	@version: 1.00
	@author: Pablo E. Fernández (islavisual@gmail.com).
	@Copyright 2017-2019 Islavisual.
	@Last update: 22/05/2019
**/
if(it.enabledModules.Password){
	WikiHelper.Password = {
		general: {
			version: 1.0,
			help: 1,
			name: 'Password',
			description: "El script de contraseña es una herramienta que le permite administrar la creación de contraseñas y sus fortalezas. Permite definir la longitud y el número mínimo de mayúsculas, minúsculas, números y caracteres especiales para enviar / guardar la contraseña. Además, el script de contraseña penaliza las acciones como insertar varias minúsculas consecutivas, insertar varias mayúsculas consecutivas, insertar varios dígitos consecutivos o repetir tres o más veces el mismo carácter.",
		},
		additional: [
			{
				description: 'Conocer la complejidad de la contraseña introducida:',
				example: 'Password.features.complexity;'
			},
			{
				description: 'Saber si se cumplen los requisitos mínimos para poder enviar/guardar la contraseña:',
				example: 'Password.allowed;'
			},
			{
				description: 'Conguración de estilos por defecto:',
				example: '// Password crea estos estilos de manera automática, pero, se puede añadir a la hoja de estilos principal y modificarlos como se quieran.\n.strength{\n\twidth: 100%;\n\theight: 10px;\n\tposition: absolute;\n\tbottom: -2px;\n\tleft: 0;\n\tz-index: 99;\n\tpadding: 2px 1px 1px 1px;\n\tborder: 0 none;\n\tmargin: 0 0 5px 0;\n\tdisplay: none;\n}\n.strength::after{\n\tcontent: attr(data-label);\n\tdisplay: block;\n\tposition: absolute;\n\tleft: 0;\n\ttop: -5px;\n\twidth: 100%;\n\tpadding: 3px 5px 2px;\n\tfont-size: 12px;\n\tline-height: 12px;\n}\n.strength > div{\n\tbackground: rgba(0,0,0,0.1);\n\twidth: calc(16.667% - 4px);\n\tfloat: left;\n\theight: 6px;\n\tpadding: 0;\n\tmargin: 0px 2px;\n\tposition: relative;\n}\n.strength[data-label] > div{\n\tdisplay: none;\n}\n.strength > div.spotlight{\n\tbackground: lightblue;\n}\ninput:focus ~ .strength{\n\tbackground: blue;\n\tdisplay: block;\n}'
			}
		],
		check: {
			type: 'function',
			description: 'Permite comprobar la seguridad de la contraseña. Puede definir la longitud mínima y el número mínimo de mayúsculas, minúsculas, números y caracteres especiales para enviar / guardar la contraseña. Además, puede definir los colores utilizados para indicar cuándo la contraseña es correcta y cuándo no.',
			example: '&lt;script>\n\tfunction check(){\n\t\tPassword.check({\n\t\t\ttarget: this.id,\n\t\t\tcolorok: \'rgba(255,255,255,0.75)\',\n\t\t\tcolornok: \'#A12123\'\n\t\t});\n\t}\n&lt;/script>\n\n&lt;input\tid="pwd"\n\tname="pwd"\n\ttype="password"\n\tvalue=""\n\tplaceholder="Contraseña"\n\tonkeyup="check();" />'
		},
		draw: {
			type: 'function',
			description: 'Permite llamar a la función de dibujar el gráfico de fortaleza para mostrarlo en un momento determinado.',
			example: 'Password.draw(Password.features.complexity);'
		},
		generate: {
			type: 'function',
			description: 'Permite crear una contraseña aleatoria de una longitud concreta que cumpla los requisitos mínimos.',
			example: 'Password.generate(8);'
		},
		getError: {
			type: 'function',
			description: 'Permite comprobar si se ha producido algún error de validación en el campo de texto asociado a la contraseña. Si la función setError está establecida, se enviará el resultado de la evaluación a la función asociada.',
			example: '// Establecemos la configuración básica\nPassword.setError(showMessage);\nPassword.setTarget("pwd");\nPassword.setAutocheck();\n\n// Definimos la función de callback para el Password\n// Cada vez que pulsemos una tecla o se pulse el botón de "submit" se evaluará\nfunction showMessage(e){\n\tif(e == "not_allowed"){\n\t\tconsole.log("La contraseña no es válida!");\n\t} else if(e == "empty"){\n\t\tconsole.log("El campo password está vacío!");\n\t} else if(!Password.sameLike(document.getElementById("confirm_password").value)){\n\t\tconsole.log("Las contraseñas son distintas!");\n\t}\n});'
		},
		isEmpty: {
			type: 'function',
			description: 'Permite verificar si el valor introducido es una cadena vacía.',
			example: 'if(Password.isEmpty(document.getElementById("password").value)){\n\tconsole.log("La contraseña está vacía!");\n}'
		},
		sameLike: {
			type: 'function',
			description: 'Permite verificar si la contraseña es igual que el valor enviado por parámetro.',
			example: 'if(Password.sameLike(document.getElementById("confirm_password").value)){\n\tconsole.log("Contraseñas identicas!");\n}'
		},
		setAutocheck: {
			type: 'function',
			description: 'Permite establecer el control de los eventos de teclado y submit para poder gestionar la contraseña. Este método añade el evento keyup para el campo de texto asociado a la contraseña y el evento submit al formulario.',
			example: 'Password.setAutocheck();'
		},
		setAutoDraw: {
			type: 'function',
			description: 'Permite definir si se debe pintar el gráfico de fortaleza de la contraseña o no.',
			example: 'Password.setAutoDraw(false);'
		},
		setColors: {
			type: 'function',
			description: 'Permite definir los colores para personalizar el CSS asociado a la fortaleza de la contraseña.',
			example: 'Password.setColors("rgba(255,255,255,0.51)", "#00a55a");'
		},
		setError: {
			type: 'function',
			description: 'Permite añadir una función de error personalizada.',
			example: 'Password.setError(showMessage);\n\nfunction showMessage(e){\n\tif(e == "not_allowed"){\n\t\tconsole.log("La contraseña no es válida!");\n\t} else if(e == "empty"){\n\t\tconsole.log("El campo password está vacío!");\n\t} else if(!Password.sameLike(document.getElementById("confirm_password").value)){\n\t\tconsole.log("Las contraseñas son distintas!");\n\t}\n});'
		},
		setMinimals: {
			type: 'function',
			description: 'Permite establecer los requerimientos mínimos de seguridad de las contraseñas. Es resultado de esta evaluación se devolverá en Password.allowed. Sólo si esta variable es igual a "true", el formulario se podrá enviar/guardar.',
			example: 'Password.setMinimals({\n\tlength: 8,\n\tuppers:1,\n\tlowers: 1,\n\tnumbers: 0,\n\tspecial: 0\n});'
		},
		setTarget: {
			type: 'function',
			description: 'Permite establecer elemento dónde inicializar la funcionalidad "Password" a través de su ID.',
			example: 'Password.setTarget("INPUT_ID");'
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
			description: "Selectpicker es un control de formulario que le permite gestionar una selección como un desplegable propio de HTRML5 y que proporciona una capa personalización sencilla de modificar.",
		},
		additional: [
			{
				description: 'Habilita la búsqueda dentro del desplegable:',
				example: '// Supposed the next code:\n&lt;select id="months" name="months" class="select-picker" data-live-search="true">\n\t&lt;option value="01">January&lt;/option>\n\t...\n&lt;/select>\n\n// Once set data-live-search to true into select, initialize\nSelectpicker.init(".select-picker");'
			},
			{
				description: 'Personaliza el aspecto del Selectpicker a través de CSS:',
				example: '.select-picker{position: relative;width: 100%;}.select-picker .dropdown-container{list-style: none;background: #fff;border: 1px solid rgba(0,0,0,0.1);padding: 0;position: absolute;top: 53px;width: 100%;z-index: 99999;}.select-picker ul{overflow: auto;max-height: 164px;padding: 0;list-style: none;margin: 0;}.select-picker button{background: #f4f4f4;border: 1px solid rgba(0,0,0,0.1);width: 100%;height: 54px;text-align: left;line-height: 70px;font-weight: 500;}.select-picker button::before{content: "";display: inline-block;width: 0;height: 0;margin-left: 2px;vertical-align: middle;border-top: 4px dashed;border-right: 4px solid transparent;border-left: 4px solid transparent;position: absolute;right: 15px;top: 26px;}.select-picker button:hover{border-color: #adadad;}.select-picker.open button{background: #02a5a5;color: #ffffff;}.select-picker li{min-height: 36px;border-bottom: 1px solid rgba(0,0,0,0.1);padding: 4px 10px 0px 10px;line-height: 36px;}.select-picker li:not(.searcher):hover{background: #02A5A5;color: #fff;width: 100%;}.select-picker .searcher{position: relative;padding: 3px 40px 0 4px;min-height: 39px;border-bottom: 1px solid rgba(0,0,0,0.1);}.select-picker .searcher .input-search{line-height: 36px;height: 32px;padding-right: 26px;color: #fff;}.select-picker .search-icon::before{content: "";background: #ccc;width: 10px;height: 3px;position: absolute;border-radius: 100px;top: 21px;right: 6px;transform: rotate(40deg);}.select-picker .search-icon:after{content: "";width: 16px;height: 16px;border: 3px solid #ccc;border-radius: 100px;display: block;position: absolute;top: 8px;right: 12px;}.select-picker-active{background: #02a5a5;color: #fff;}'
			},
		],
		init: {
			type: 'function',
			description: 'Crea y establece los componentes de configuración y presentación para los desplegables solicitados.',
			example: 'Selectpicker.init(".select-picker");'
		},
		target: {
			type: 'string',
			description: 'Si el método "init" recibe una cadena, esta cadena se tomará como patrón de destino. Si el método "init" recibe un objeto, el parámetro objetivo será el patrón para inicializar los desplegables.',
			example: '//Forma sencilla :\nSelectpicker.init(".select-picker");\n\n// A través del parámetro target:\nSelectpicker.init({ target: ".select-picker" });'
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
			description: "SendForm es un script para crear y enviar formularios en tiempo real a través de Ajax en modo POST. Es como si el formulario estuviese físicamente ya de antes y el usuario pulsase el botón de enviar.",
		},
		url: {
			type: 'string',
			description: 'URL para realizar la petición.',
			example: 'new SendForm({\n\turl: "../pages/setProduct",\n\tparams: [{\n\t\t"type": "text",\n\t\t"id": "idProduct",\n\t\t"value": "1"\n\t}]\n});'
		},
		params: {
			type: 'string',
			description: 'Parámetros que se enviarán como parte del formulario.',
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
			description: "Función para limpiar de HTML una cadena proporcionada por parámetro. El segundo parámetro se puede usar para especificar las etiquetas que no deben ser eliminadas.",
		},
		additional: [
			{
				description: 'Limpiar de HTML un String',
				example: 'StripTags("&lt;span>ejemplo de texto&lt;/span>", "");\n// Resultado: ejemplo de texto\n\nStripTags("&lt;span>ejemplo &lt;b>de&lt;/b> texto&lt;/span>", "&lt;b>");\n// Resultado: ejemplo &lt;b>de&lt;/b> texto'
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
			description: "Treeview es un componente de la interfaz gráfica de usuario que muestra una vista jerárquica de la información. Cada elemento puede tener cero, uno o más subelementos o hijos. Normalmente, se visualiza como una lista tabulada y cada elemento revela sus subelementos a través de un cambio de estado (de expandido a colapsado o viceversa).",
		},
		additional: [
			{
				description: 'Personalizar los estilos a través de las reglas CSS. Por ejemplo:',
				example: '_CSS_// styles.css (from your site)\nul.treeview li .active { background: lightgray; color: rgb(51, 51, 51); }\nul.treeview li.search-box input { width: 100%; background: rgb(255, 255, 255); color: rgb(0, 0, 0); border: 1px solid rgba(0, 0, 0, 0.1); }\nul.treeview li i.icon { margin-right: 8px; }\nul.treeview li span { padding: 2px 5px; display: inline-block; }\nul.treeview li a { color: rgb(0, 153, 102); background: rgba(0, 0, 0, 0); }\nul.treeview li.collapsed ul { max-height: 0px; }\nul.treeview li ul { transition: all 0.3s ease 0s; max-height: 10000px; overflow: hidden; }\nul.treeview li i { cursor: pointer; }\nul.treeview li { color: rgb(0, 0, 0); }\nul.treeview, ul.treeview ul { list-style: none; }\nul.treeview { background: rgb(255, 255, 255); width: 100%; border: 1px solid rgba(0, 0, 0, 0.15); padding: 5px; }_CSS_'
			}
		],
		classLeaf: {
			type: 'string',
			description: 'El parámetro "classLeaf" indica el nombre de clase que se aplicará a los nodos hoja (los de último nivel). Esta clase, por ejemplo, puede utilizarse para proporcionar un estilo diferente a este tipo de nodos. Por defecto está vacío.',
			example: 'new Treeview({data: treeviewJSON, target: "treeview", classLeaf: "leaf-node"});'
		},
		collapsedIcon: {
			type: 'string',
			description: 'El parámetro "collapsedIcon" indica el carácter, el icono vectorial o el código html que se mostrará en lugar del "icono de colapsado" que refleja que la rama está cerrada de manera predeterminada. Si no se establece, por defecto es contendrá \u25BA.',
			example: '// Example with Vectorial icons\nnew Treeview({data: treeviewJSON, target: \'treeview\', collapsedIcon: \'&lt;i class=\"plus\">&lt;/i>\'});\n// Example with Unicode icons\nnew Treeview({data: treeviewJSON, target: "treeview", collapsedIcon: "+"});'
		},
		expandedIcon: {
			type: 'string',
			description: 'El parámetro "expandedIcon" indica el carácter, el icono vectorial o el código html que se mostrará en lugar del "icono de expandido" que refleja que la rama está abierta de forma predeterminada. Si no se establece, Por defecto es \u25BC.',
			example: '// Example with Vectorial icons\nnew Treeview({data: treeviewJSON, target: \'treeview\', expandedIcon: \'&lt;i class=\"less\">&lt;/i>\'});\n// Example with Unicode icons\nnew Treeview({data: treeviewJSON, target: "treeview", expandedIcon: "-"});'
		},
		leafIcon: {
			type: 'string',
			description: 'El parámetro "leafIcon" indica el carácter, el icono vectorial o el código html que se mostrará en lugar del "icono de hoja" que refleja que, este nodo, no tiene más hijos. Si no se establece, por defecto está vacío.',
			example: '// Example with Vectorial icons\nnew Treeview({data: treeviewJSON, target: \'treeview\', leafIcon: \'&lt;i class=\"leaf\">&lt;/i>\'});\n// Example with Unicode icons\nnew Treeview({data: treeviewJSON, target: "treeview", leafIcon: "\\uD83D\\uDE54"});'
		},
		branchIcon: {
			type: 'string',
			description: 'El parámetro "branchIcon" indica el carácter, el icono vectorial o el código html que se mostrará en lugar del "icono de rama" que refleja que este nodo tiene, al menos, un hijo. Si no se establece, por defecto está vacío.',
			example: '// Example with Vectorial icons\nnew Treeview({data: treeviewJSON, target: \'treeview\', branchIcon: \'&lt;i class=\"folder\">&lt;/i>\'});\n// Example with Unicode icons\nnew Treeview({data: treeviewJSON, target: "treeview", branchIcon: "\\uD83D\\uDCC2"});'
		},
		customCheck: {
			type: 'string',
			description: 'Cadena HTML con la nueva definición del checkbox. Por defecto está vacío (deshabilitado).',
			example: 'new Treeview({\n\tdata: treeviewJSON,\n\ttarget: "treeview",\n\tcustomCheck: "&lt;label>Two&lt;input type=\'checkbox\'>&lt;span class=\'checkmark\'>&lt;/span>&lt;/label>"\n});'
		},
		data: {
			type: 'object',
			description: 'Es un objeto con los elementos a tratar. Este objeto debe estar en formato JSON.',
			example: '//Example JSON to send to Treeview component.\nvar treeviewJSON = {\n\titems: [{\n\t\tid: 1,\n\t\tlabel: "Parent 1",\n\t\texpanded: true,\n\t\tchildren: [{\n\t\t\tid: 2,\n\t\t\tlabel : "Element 1",\n\t\t\tchildren : [\n\t\t\t\t{ id: 3, label: "Child 1 of Element 1", href: "#"},\n\t\t\t\t{ id: 4, label: "Child 2 of Element 1", href: "#"},\n\t\t\t]\n\t\t},\n\t\t{\n\t\t\tid: 5,\n\t\t\tlabel : "Element 2",\n\t\t\tchildren : [\n\t\t\t\t{ id: 6, label: "Child 1 of Element 2", href: "#"},\n\t\t\t\t{ id: 7, label: "Child 2 of Element 2", href: "#"},\n\t\t\t]\n\t\t}]\n\t}]\n}\nnew Treeview({data: treeviewJSON, target: "treeview"});'
		},
		onSelectNode: {
			type: 'function',
			description: 'El parámetro "onSelectNode" indica la función de devolución de llamada cuando se selecciona un nodo. Por defecto, esta funcionalidad está deshabilitada.',
			example: 'new Treeview({data: treeviewJSON, target: "treeview", onSelectNode: callback});\nfunction callback(e){\n\tconsole.log(e);\n}'
		},
		onCheckNode: {
			type: 'function',
			description: 'El parámetro "onCheckNode" indica la función de devolución de llamada cuando se chequea un nodo. Por defecto, esta funcionalidad está deshabilitada.',
			example: 'new Treeview({data: treeviewJSON, target: "treeview", onCheckNode: callback});\nfunction callback(e){\n\tconsole.log(e);\n}'
		},
		selectable: {
			type: 'boolean',
			description: 'El parámetro "selectable" indica si los nodos serán seleccionables. Por defecto es false.',
			example: 'new Treeview({data: treeviewJSON, target: "treeview", selectable: false});'
		},
		searchable: {
			type: 'boolean',
			description: 'El parámetro "searchable" indica si el árbol permitirá la búsqueda de nodos. Por defecto es false.',
			example: 'new Treeview({data: treeviewJSON, target: "treeview", searchable: false});'
		},
		placeholderText: {
			type: 'string',
			description: 'El parámetro "placeholderText" indica el texto que se muestra dentro de la caja de texto cuando la búsqueda está habilitada (searchable es true). Por defecto es "Filter...".',
			example: 'new Treeview({data: treeviewJSON, target: "treeview", placeholderText: "Writing to filter inside the tree"});'
		},
		styles: {
			type: 'object',
			description: 'El parámetro "styles" indica los estilos básicos que deben mostrarse en el componente de vista de árbol. Este objeto permitirá los siguientes subparámetros:\n\t● <b>bgTree</b>: fondo del árbol. Por defecto es transparent.\n\t● <b>borderTree </b>: Borde del árbol. Por defecto es rgba (0,0,0,0.15).\n\t● <b>textColor</b>: color del texto de los nodos. Por defecto es #000000.\n\t● <b>searchColor</b>: color de texto para la entrada de la búsqueda. Por defecto es #000000.\n\t● <b>searchBg</b>: color de fondo para la entrada de la búsqueda. Por defecto es #f0f0f0.\n\t● <b>activeColor</b>: color del texto del nodo seleccionado. De forma predeterminada es #ffffff.\n\t● <b>activeBg</b>: color de fondo del nodo seleccionado. Por defecto es #000000.\n\t● <b>linkColor</b>: color de texto para nodos con enlace. Por defecto es #006699.\n\t● <b>linkBg</b>: color de fondo para los nodos con enlace. Por defecto es transparent.',
			example: 'new Treeview({\n\tdata: treeviewJSON,\n\ttarget: "treeview",\n\tselectable: true,\n\tstyles: {\n\t\tbgTree: "#ffffff",\n\t\tborderTree: "rgba(0,0,0,0.15)",\n\t\ttextColor: "#000",\n\t\tsearchColor: "#000",\n\t\tsearchBg: "#fff",\n\t\tactiveColor: "#333",\n\t\tactiveBg: "lightgray",\n\t\tlinkColor: "#009966",\n\t\tlinkBg: "rgba(0,0,0,0)"\n\t}\n});'

		},
		target: {
			type: 'string',
			description: 'ID del elemento donde se implementará el componente Treeview. Este ID debe pertenecer a una etiqueta UL de HTML.',
			example: 'new Treeview({data: treeviewJSON, target: "treeview"});'
		},
		checked: {
			type: 'boolean',
			description: 'El parámetro "verified" indica al componente Treeview que el nodo debería cambiar su estado. Esta funcionalidad necesita un ID para seleccionar el elemento a verificar.',
			example: '// ULItem is the ID from HTML element where treeview is implemented\nfor(var i = 0; i < 20; i++){\n\tdocument.ULItem.Treeview({id; i, checked: true});\n}'
		},
		refresh: {
			type: 'function',
			description: 'El parámetro "refresh" indica que el componente de vista de árbol debe volver a cargarse.',
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
			description: "Este script establece mensajes de validez personalizados para un elemento de entrada de datos de formulario. Recordar que, para HTML5, un mensaje de validación vacío significa que la entrada de datos es correcta.",
		},
		additional: [
			{
				description: 'Personalizar la clase de validator-error y validator-error-msg a través de estilos CSS.',
				example: '_CSS_// Personalizar el estilo del input\n.validator-error{ box-shadow: 0 0 0 2px #f00 inset }\n//Personalizar el color del mensaje de validación\n.validator-error-msg{ background: rgba(255,0,0,0.1); width: 100%; display: block; padding: 5px; border: 1px solid rgba(255,0,0,0.2); }_CSS_'
			}
		],
		set: {
			type: 'function',
			description: 'El método "set" indica a Validator que se desea aplicar una restricción predefinida a un input o campo de entrada de datos. Por lo general, estas restricciones son: patternMismatch, rangeOverflow, rangeUnderflow, stepMismatch, "=", "!=", "<", ">", ">=" and "<=".',
			example: '// Permitir sólo números igual o menores a 100\nValidator.set({\n\ttarget: "percent",\n\tconstraint: "<=100",\n\tmessage: "Por favor, el número debe ser igual o menor a 100",\n\trequired: true\n});\n\n// Permitir sólo "Spain"\nValidator.set({\n\ttarget: "country",\n\tconstraint: "==\'Spain\'",\n\tmessage: "La palabra correcta es Spain",\n\tfixed: true,\n\trequired: true\n});\n\n// Permitir sólo una lista de valores\nvar arraySex = ["man", "woman", "other"];\nValidator.set({\n\ttarget: "sex",\n\tconstraint: "arraySex.indexOf(this.value) != -1",\n\tmessage: "Los posibles valores son: man, woman, other"\n});\n\n// Permitir sólo un rango de valores\ndocument.getElementById("range").setAttribute("type", "number");\ndocument.getElementById("range").setAttribute("min", 50);\ndocument.getElementById("range").setAttribute("max", 100);\nValidator.set({\n\ttarget: "range",\n\tfixed: true,\n\tconstraint: "!this.validity.rangeOverflow && !this.validity.rangeUnderflow",\n\tmessage: "Los posibles valores son entre 50 y 100"\n});\n\n// Validación de la contraseña con, al menos, una letra mayúscula, una letra minúscula,\n// un dígito, un carácter especial y con un mínimo de ocho en longitud.\nValidator.set({\n\ttarget: "pwd",\n\tfixed: true,\n\trequired: true,\n\tconstraint: "!this.validity.patternMismatch",\n\tmessage: "La contraseña no coincide con el formato especificado",\n\tpattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"\n});'
		},
		fileset: {
			type: 'function',
			description: 'Define las restricciones que deben tener las entradas del archivo. Esta funcionalidad se alimenta de un objeto JSON que admite:\n\t ● <b>accept</b>: es una cadena que define, separados por comas, los tipos de archivos que debe aceptar la entrada del archivo. De forma predeterminada, está vacío.\n\t ● <b>preview</b>: Habilita la vista previa del archivo. Por defecto, es false.\n\t ● <b>size</b>: Limitar (en KB) el tamaño del archivo que se va a cargar. De forma predeterminada, es 0, que indica que no tiene límite.\n\t ● <b>message</b>: mensaje que se muestra cuando la entrada del archivo no es válida.',
			example: '// Permitir solo tipos de archivos de Word\nValidator.fileset({\n\ttarget: "file",\n\taccept: ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",\n\tmessage: "Los archivos permitidos son todos los formatos de Word!"\n});\n\n// Habilitar la vista previa dentro del contenedor de miniaturas\nValidator.fileset({target: "file", preview: true});\n\n// Limitar el tamaño de los archivos de imagen a 100KB.\nValidator.fileset({target: "file", maxsize: 100, accept: "image/*", message: "El tamaño de la imagen debe ser menor a 100 KB"});'
		},
		fixed: {
			type: "boolean",
			description: 'Esta propiedad le indica al Validador que los mensajes deben mostrarse debajo del campo de entrada.',
			example: '// Limitar el tamaño de los archivos jpeg a 250 KB y mostrar el mensaje bajo el input\nValidator.fileset({\n\ttarget: "file",\n\tfixed: true,\n\tmaxsize: 250,\n\taccept: ".jpg,.jpeg",\n\tmessage: "El tamaño del archivo debería ser menor a 250 KB"\n});'
		},
		newValidation: {
			type: 'function',
			description: 'Definir validaciones personalizadas a través de código JavaScript.',
			example: 'Validator.target = document.getElementById("checkbox");\nValidator.newValidation("input", "\\\n\tif (!this.checked) {\\\n\t\te.target.setCustomValidity("Must be checked!");\\\n\t\te.target.classList.add("validator-error")\\\n\t\tValidator.addMessage(e.target);\\\n\t} else {\\\n\t\te.target.setCustomValidity("");\\\n\t\te.target.classList.remove("validator-error");\\\n\t\te.target.nextElementSibling.remove();\\\n\t}\\\n");'
		},
		onInvalid: {
			type: "function",
			description: 'Función de devolución de llamada cuando cuando se produzca un error de validación.',
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

	if(WikiHelper[func] == undefined) {
		console.log("Helper no disponible");
		return;
	}

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
		<nav>\
			<a href="#"><i class="btn-bars" onclick="this.parentElement.classList.toggle(\'on\')"></i></a>\
			<ul>\
				__ITEMS_HELP__\
			</ul>\
		</nav>\
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
		AddCSSRule('', "#h31p3r", 'font-family: arial; position:fixed;top: 0;left: 0; width: 100%; height: 100%; white-space: pre-line; padding: 15px;margin: 0;border: 0 none; border-radius:0;background-color: ' + opt.background + '; color: ' + opt.color + ';z-index: 99999999; overflow-y: scroll; overflow-x: hidden;');
		AddCSSRule('', "#h31p3r h2", 'color: ' + opt.background + ';text-align: center;background: ' + opt.color + ';padding: 15px;font-size: 20px;font-variant: small-caps;position: fixed;width: calc(100% - 16px);left: 0;top: -10px;border-bottom: 1px solid rgba(255,255,255,.1);')
		AddCSSRule('', "#h31p3r h2 + p", 'word-break: break-word; text-align: justify;');
		AddCSSRule('', "#h31p3r h3", 'z-index: -1; text-transform: uppercase; margin: 0px 0 10px; font-size:1.0rem; padding: 64px 5px 5px 5px; border-bottom: 2px solid ' + opt.highlight + '; color: ' + opt.keyColor + ';');
		AddCSSRule('', "#h31p3r h3[onclick]", 'cursor:pointer');
		AddCSSRule('', "#h31p3r field", 'text-transform: capitalize; padding: 15px 0 5px 32px; display: inline-block; color: ' + opt.fieldColor + ';');
		AddCSSRule('', "#h31p3r field.des, #h31p3r field.exa", "display: block; width: 100%;");
		AddCSSRule('', '#h31p3r text', 'padding-left: 32px; color: ' + opt.stringColor + '; display: block; width: 100%; white-space: pre-wrap; word-break: break-word; text-align: justify;');
		AddCSSRule('', '#h31p3r text a', 'color: ' + opt.stringColor + '; cursor: pointer; ');
		AddCSSRule('', '#h31p3r > a', 'position: fixed;left: 10px;top: 10px; border: 1px solid ' + opt.highlight + '; padding: 3px 10px; line-height:26px;z-index:9; color: ' + opt.background + ';');
		AddCSSRule('', '#h31p3r > a:hover', 'background: ' + opt.background + '; color: ' + opt.color + ';');
		AddCSSRule('', '#h31p3r int', 'font-family: monospace; color: ' + opt.intColor + ';');
		AddCSSRule('', '#h31p3r str, #h31p3r str int', 'font-family: monospace; color: ' + opt.strColor + ';');
		AddCSSRule('', '#h31p3r bool', 'font-family: monospace; color: ' + opt.boolColor + ';');
		AddCSSRule('', '#h31p3r func', 'font-family: monospace; color: ' + opt.funcColor + ';');
		AddCSSRule('', '#h31p3r name', 'font-family: monospace; color: ' + opt.funcNameColor + ';');
		AddCSSRule('', '#h31p3r null', 'font-family: monospace; color: ' + opt.nullColor + ';');
		AddCSSRule('', '#h31p3r comm, #h31p3r comm int, #h31p3r comm str, #h31p3r comm bool, #h31p3r comm > name', 'color: ' + opt.commentColor + ';');
		AddCSSRule('', '#h31p3r code, #h31p3r pre code', 'color: ' + opt.exampleColor + '; padding-left: 32px; display: block; ');
		AddCSSRule('', '#h31p3r key', 'color: ' + opt.keyColor + ';');
		AddCSSRule('', '#h31p3r .btn-times', 'position: fixed; right: 32px; top: 11px; width: 32px; height: 32px;  background: ' + opt.buttons + '; z-index:9; cursor: pointer;');
		AddCSSRule('', '#h31p3r .btn-times:hover', 'opacity: 1;');
		AddCSSRule('', '#h31p3r .btn-times::before, #h31p3r .btn-times::after', 'position: absolute; left: 15px; top: 5px; content: " "; height: 24px; width: 2px; background-color: ' + opt.background + ';');
		AddCSSRule('', '#h31p3r .btn-times::before', 'transform: rotate(45deg);');
		AddCSSRule('', '#h31p3r .btn-times::after', 'transform: rotate(-45deg);');
		AddCSSRule('', '#h31p3r nav', 'position: fixed; right: 70px; top: 15px; width: 22px; height: 24px; z-index: 9; cursor: pointer; text-align: center;');
		AddCSSRule('', '#h31p3r nav .btn-bars', 'display: block; width: 24px; height: 20px; font-size: 25px; visibility: initial; float: right; border-bottom: 1px solid ' + opt.background + ';');
		AddCSSRule('', '#h31p3r nav .btn-bars:before', 'content: ""; border-bottom: 1px solid ' + opt.background + '; width: 100%; display: block; position: relative; top: 4px');
		AddCSSRule('', '#h31p3r nav .btn-bars:after', 'content: ""; border-bottom: 1px solid ' + opt.background + '; width: 100%; display: block; height: 12px;');
		AddCSSRule('', '#h31p3r nav > a', 'display: block; background: ' + opt.buttons + '; height: 32px; width: 32px; position: relative; padding: 4px; top: -4px; left: -6px;');
		AddCSSRule('', '#h31p3r nav > a + ul', 'display: none; background: ' + opt.color + '; width: 150px; height: 150px; color: ' + opt.background + '; position: absolute; top: 38px; right: -15px; list-style: none; padding: 0; text-align: left;');
		AddCSSRule('', '#h31p3r nav > a.on + ul', 'display:block; overflow-x: hidden; overflow-y: auto');
		AddCSSRule('', '#h31p3r nav > a + ul li', 'padding: 5px 10px;');
		AddCSSRule('', '#h31p3r nav > a + ul li:hover', 'background: ' + opt.highlight + '; padding: 5px 10px;');
		AddCSSRule('', '#h31p3r nav > a + ul li a', ' color: ' + opt.background + '; ');

		if(GetParam("f") == '.me'){
			AddCSSRule('', '#h31p3r type', 'display: block; padding: 0 0px 0px 32px;');
		} else {
			AddCSSRule('', '#h31p3r type', 'padding-left: 8px;');
		}

		var text = '', additional = '', items_help = '';
		var idx = 0;
		for (var prop in help) {
			if (prop != "additional" && general.name.toLowerCase() != "index") {
				var type = help[prop].hasOwnProperty("type") ? help[prop].type : '';
				text += '<h3>' + ((type == "function" ? 'Método ' : 'Propiedad ') + prop) + '</h3>';
			} else if (general.name.toLowerCase() == "index") {
				var wprop = prop.indexOf(".") ? prop.split(".")[0] : prop;
				
				text += '<h3 id="' + wprop + '" onclick="' + WikiHelper[wprop].general.help.split("\n")[1] + '">' + wprop + '</h3>';
				items_help += '<li onclick="this.querySelector(\'a\').click()"><a href="#' + wprop + '">' + wprop + '</a></li>';
			}

			if (typeof help[prop] == "undefined") {
				text += '<span style="padding-left: 32px; color: ' + opt.stringColor + '">El método o propiedad solicitada no está definida. Para revisar la ayuda manualmente intenta:</p>';
				text += '<span style="padding-left: 32px; color: ' + opt.stringColor + '"><code>' + (func) + '("help");</code></span></p>';
			}

			for (var key in help[prop]) {
				if (help[prop].hasOwnProperty("type") || general.name.toLowerCase() == "index") {
					var keyTranslated = key.replace(/type/ig, 'Tipo').replace(/example/ig, 'Ejemplos ').replace(/description/ig, 'Descripción');
					text += '<field class="' + key.substr(0, 3) + '">' + keyTranslated + '</field>' + (key == "type" ? '' : '');
					items = help[prop][key].split("\n");
					text += key.indexOf('example') == 0 ? ('<code>' + styleItems(key, items) + '</code>') : styleItems(key, items);

				} 
			}

			for (var k = 0; k < help[prop].length; k++) {
				for (var subkey in help[prop][k]) {
					items = help[prop][k][subkey].split("\n");
					var subkeyTranslated = subkey.replace(/example/ig, 'Ejemplos ').replace(/description/ig, 'Descripción');
					additional += '<field class="' + key.substr(0, 3) + '">' + subkeyTranslated + '</field>' + (subkey == "type" ? '' : '');
					additional += subkey.indexOf('example') == 0 ? ('<code>' + styleItems(subkey, items) + '</code>') : styleItems(subkey, items);
				}
			}
			idx++;
		}

		// Add to body the help requested
		var aux = template.replace(/__BACKGROUND__/ig, opt.background)
			.replace(/__COLOR__/ig, opt.color)
			.replace(/__TEXT__/ig, text)
			.replace(/__ADDITIONAL__/ig, additional)
			.replace(/__ITEMS_HELP__/ig, items_help)
			.replace(/__HELPEROPTIONS__/ig, typeof WikiHelper['index'][func] != "undefined" ? ("<code>" + WikiHelper['index'][func].example + '</code>') : '')
			.replace(/\\"/ig, '"')
			.replace(/\\n/ig, '<br/>');

		var a = document.createElement("pre");
			a.setAttribute("id", "h31p3r");
			a.innerHTML = aux;

		document.body.appendChild(a);

		if (additional.trim() != "") document.getElementById("additionalH31p3r").style.display = '';
		document.body.style.position = "fixed";

		document.getElementById("h31p3r").onclick = function(e){
			var aux = e.target.parentElement.tagName.toLowerCase()
			var auxp = e.target.parentElement.parentElement ? e.target.parentElement.parentElement.tagName.toLowerCase() : '';

			if(aux == "pre" || auxp == "pre" || aux == "code" || auxp == "code"){
				
				try { document.getElementById("h31p3r").querySelector("nav > a").classList.remove("on"); } catch(e) {}
			}
		};

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
			if (key.indexOf('example') == 0 && !isCSS) {
				aux = aux.replace(/[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+|px|em|rem|%|s)?/ig, function (s) { return '<int>' + s + '</int>' });
				aux = aux.replace(/"(.*?)"/g, function (s) { return '<str>' + s + '</str>' });
				aux = aux.replace(/'(.*?)'/g, function (s) { return '<str>' + s + '</str>' });
				aux = aux.replace(/true/ig, '<bool>true</bool>').replace(/false/ig, '<bool>false</bool>');
				aux = aux.replace(/function/ig, '<func>function</func>');
				aux = aux.replace(/null/ig, '<null>null</null>');
				aux = aux.indexOf("//") != -1 ? ('<comm>' + aux + '</comm>') : aux;
				aux = aux.replace(new RegExp(func + "(\\.|\\()", "ig"), function($0, $1){ return "<name>" + $0.substr(0, $0.length-1) + "</name>" + $1})
				aux += '<br/>';

				text += key == "type" ? ('<type style="color: ' + color + '">' + aux + '</type>') : (key.indexOf('example') == 0 ? aux : ('<' + tag + '>' + aux + '</' + tag + '>'));

			} else if (key.indexOf('example') == 0 && isCSS) {
				text += aux;
			} else {
				text += key == "type" ? ('<type style="color: ' + color + '">' + aux + '</type>') : (key.indexOf('example') == 0 ? aux : ('<' + tag + '>' + aux + '</' + tag + '>'));
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
