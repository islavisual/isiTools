IsiTools es un conjunto de herramientas para ayudar a los desarrolladores durante el proceso de creación del proyecto. Las herramientas proporcionadas están diseñadas para obtener una mejor experiencia de usuario y un desarrollo más utilizable y reutilizable. Además, permite que cada funcionalidad se cargue de forma independiente a través de JSON proporcionado a través del archivo config.json o mediante el parámetro "modules" establecido en el attributo SRC.	

 # Instalación
 Descargar / copiar las librerías en tu carpeta javascript de tu proyecto. Después, inserta el código necesario para activar isiTools. Por ejemplo:
```javascript
// Cargar todas las funciones
<script src="isitools.js" />
<script src="isitoolsHerlper.js" />
// Cargar selectivamente algunas características
<script src="isitools.js?modules=AddCSSRule+Alert+Autocomplete+DOM" />
<script src="isitoolsHerlper.js" />
```

## AddCSSRule


Funcionalidad para crear y/o modificar reglas en las hojas de estilo. Esta función se alimenta de cuatro parámetros: sheet, selector, styles and index.
#### PROPIEDAD SHEET
**Tipo**

string
**Descripción**

Este parámetro indica la hoja de estilo donde se insertará la regla. Puede tomar 3 valores:
* "": indica que se debe crear una nueva hoja de estilo (creada al principio del encabezado de la página).
* Integer: indica el número de índice o posición dentro del encabezado de página donde se insertó la hoja de estilo.
* Object: indica un objeto CSSStyleSheet de JavaScript.
**Ejemplos**
```javascript
// Insertar una regla en una nueva hoja de estilo
AddCSSRule("", ".input", "background-color: lightgray; color: #333");

// Insertar una regla nueva en la primera hoja de estilo.
AddCSSRule(0, "#name", "background-color: lightgray; color: #333");

// Insertar una nueva regla en la hoja de estilo extraida del objeto CSSStyleSheet e identificada por el índice 0
AddCSSRule(document.styleSheets[0], "input", "background-color: lightgray; color: #333");
```
#### PROPIEDAD SELECTOR
**Tipo**

string
**Descripción**

Este parámetro se utiliza para definir el nombre de la regla. Se puede usar cualquier selector válido por CSS3.
**Ejemplos**
```javascript
AddCSSRule("", ".buttonIcon", "background-color: lightgray; color: #333");
```
#### PROPIEDAD STYLES
**Tipo**

string
**Descripción**

Este parámetro se utiliza para definir el contenido / estilos de la regla.
**Ejemplos**
```javascript
AddCSSRule("", "#name", "background-color: lightgray; color: #333");
```
#### PROPIEDAD INDEX
**Tipo**

string
**Descripción**

Este parámetro indica la posición donde se insertará. Si este valor es 0, la regla se insertará al principio de la hoja de estilo, de lo contrario, se insertará al final de la hoja de estilo.
Este parámetro es opcional.
**Ejemplos**
```javascript
AddCSSRule("", ".buttonIcon::after", "content:''; background-color: lightgray; color: #333", 0);
```
## Alert


Script para crear alertas con múltiples personalizaciones similares a las de javaScript de forma sencilla.
#### PROPIEDAD THEME
**Tipo**

string
**Descripción**

Tema por defecto a utilizar.
**Ejemplos**
```javascript
new Alert({title: "Precaución!", body:"El campo se encuentra vacío.", theme: "dark"});
```
#### PROPIEDAD CLASS
**Tipo**

string
**Descripción**

Agregar una regla de CSS a la alerta. Esto es útil si se desean definir alertas personalizadas a través de selectores CSS, por ejemplo.
**Ejemplos**
```javascript
new Alert({title: "Precaución!", body:"El campo se encuentra vacío.", class: "warning"});
```
#### PROPIEDAD TITLE
**Tipo**

string
**Descripción**

Título de la alerta.
**Ejemplos**
```javascript
new Alert({title: "Precaución!", body:"El campo se encuentra vacío."});
```
#### PROPIEDAD BODY
**Tipo**

string
**Descripción**

Mensaje de la alerta.
**Ejemplos**
```javascript
// Simply Alert
Alert("El campo se encuentra vacío.");
// Custom Alert
new Alert({title: "Precaución!", body:"El campo se encuentra vacío."});
// HTML Alert
new Alert({title: "Precaución!", body:"<span>Esto es una prueba</span> of <b style='color: red'>Alerta!</b>."});
```
#### PROPIEDAD ACTIONS
**Tipo**

object
**Descripción**

Personaliza las acciones de una alerta. Este parámetro debe contener una estructura tipo objeto con dos campos, "accept" y "cancel".
Los campos pueden estar compuestos por los atributos "enabled", "class", "align" y "callback".
**Ejemplos**
```javascript
new Alert({
	title: "Precaución!",
	body:"El campo se encuentra vacío.",
	actions:{
		accept: {
			enabled: true,
			text: "Accept",
			class: "btn btn-primary",
			alignment: "right",
			callback: function(e){
				console.log(e)
			}
		},
		cancel: {
			enabled: true,
			text: "Cancel",
			class: "btn btn-secondary",
			alignment: "left",
			callback: function(e){
				console.log(e)
			}
		}
	}
});
```
#### PROPIEDAD STYLES
**Tipo**

object
**Descripción**

Personaliza los estilos de las alertas a través de JavaScript. Este parámetro debe contener una estructura tipo objeto con los campos "title", "body" y "actions".
Todos los campos pueden estar compuestos por los atributos "background", "color" y "extra".
**Ejemplos**
```javascript
new Alert({
	title: "Precaución!",
	body: "El campo se encuentra vacío.",
	styles:{
		title: {
			background: "#f0f0f0",
			color: "#2f2f2f",
			extra: ""
		},
		body: {
			background: "#fff",
			color: "#000",
			extra: ""
		},
		actions: {
			accept: {
				background: "#e0e0e0",
				color: "#000",
				extra: ""
			},
			cancel: {
				background: "rgba(0,0,0,0)",
				color: "#000",
				extra: ""
			}
		}
	}
});
```
#### INFORMACIÓN ADICIONAL
**Descripción**

Personalizar los estilos a través de las reglas CSS. Por ejemplo:
**Ejemplos**
```javascript
// styles.css (de tu sitio web)
.Alert .btn-cancel  { 
	padding: 5px; 
	border-radius: 0px; 
	background-color: rgba(0, 0, 0, 0); 
	border: 1px solid rgba(0, 0, 0, 0.1); 
	color: rgb(0, 0, 0); 
}

.Alert .btn-accept  { 
	padding: 5px; 
	border-radius: 0px; 
	background-color: rgb(224, 224, 224); 
	border: 1px solid rgba(0, 0, 0, 0.1); 
	color: rgb(0, 0, 0); 
}

.Alert footer  { 
	position: relative; 
	top: 5px; 
	padding: 10px 10px 8px; 
	height: auto; 
	display: inline-block; 
	width: 100%; 
	margin: 0px; 
}

.Alert .Alert-body  { 
	background-color: rgb(240, 0, 32); 
	color: rgb(255, 255, 255); 
	display: inline-block; 
	width: 100%; 
	padding: 10px; 
	min-height: 100px; 
	font-weight: 600; 
}

.Alert header i  { 
	float: right; 
	color: rgb(240, 240, 240); 
	cursor: pointer; 
	padding: 0px 2px; 
}

.Alert header h3  { 
	font-size: 14px; 
	margin: 0px; 
	color: rgb(240, 240, 240); 
	display: inline-block; 
}

.Alert header  { 
	padding: 10px 8px; 
	background-color: rgb(208, 0, 16); 
	border-bottom: 1px solid rgba(0, 0, 0, 0.1); 
	color: rgb(240, 240, 240); 
}

.Alert  { 
	width: 400px; 
	margin: 100px auto 0px; 
	background-color: rgb(240, 0, 32); 
	overflow: hidden; 
	color: rgb(255, 255, 255); 
}

.Alert-overlay  { 
	position: fixed; 
	background: rgba(0, 0, 0, 0.4); 
	width: 100%; 
	height: 100%; 
	left: 0px; 
	top: 0px; 
	display: block; 
	z-index: 999999; 
}

body.fixed  { 
	position: fixed; 
	width: 100%; 
}

body.fixedOY  { 
	position: fixed; 
	width: 100%; 
	overflow-y: scroll; 
}
```
## Autocomplete


Permite buscar y seleccionar de una lista de valores previamente rellenada a medida que se escribe, aprovechando la búsqueda y el filtrado. Este componente podría considerarse una mejora del componente "select" que proporciona HTML. Es simple, fácil de personalizar y hace que el rendimiento de la página se vea poco afectado.
#### PROPIEDAD AUTOFOCUS
**Tipo**

boolean
**Descripción**

Cuando el elemento toma el control, se dispara automáticamente un evento de autofoco. Por defecto es false.
**Ejemplos**
```javascript
new Autocomplete({target: "productID", data: arrayList, format: "list"})
```
#### MÉTODO CALLBACK
**Tipo**

function
#### PROPIEDAD CALLBACK
**Descripción**

Función que se llamará cuando se seleccione un elemento de la lista de autocompletado.
**Ejemplos**
```javascript
new Autocomplete({target: "productID", data: arrayList, format: "list", callback: callback});
function callback(event){
	console.log("Some action!", event);
}
```
#### PROPIEDAD CLASSNAME
**Tipo**

string
**Descripción**

Clase CSS que se agregará a los elementos del complemento Autocompletar. Por defecto, el nombre de la clase de control es "autocomplete".
**Ejemplos**
```javascript
new Autocomplete({target: "catalogBox", data: arrayList, className: "auto-complete"});
```
#### PROPIEDAD DATA
**Tipo**

object
**Descripción**

Objeto con los elementos para manejar o tratar. Este objeto puede estar en formato "JSON" o estar en formato "Array".
**Ejemplos**
```javascript
new Autocomplete({target: "transportBox", data: arrayList});
var arrayList = ["Car", "Motorcycle", "Airplane", "Train", "Bicicle"];
```
#### PROPIEDAD FORMAT
**Tipo**

string
**Descripción**

Es el formato en el que se presentarán los datos. Según el formato en el que se presentan los datos, el objeto "data" debe definirse de una forma u otra. Este parámetro tiene como valor por defecto es "layer".
Los posibles valores son:
* "layer". 
* "table" (alimentado a partir de un JSON proporcionado por el parámetro "tableFields".)
* "cluster"
**Ejemplos**
```javascript
// Example with list format
var arrayList = ["Car", "Motorcycle", "Airplane", "Train", "Bicicle"];
new Autocomplete({target: "transportBox", format: "list", data: arrayList});

// Example with table format
var countriesJSON = [
	{ id: 1, country: "Afghanistan", code: "AFG", capital: "Kabul" },
	{ id: 2, country: "Albania", code: "ALB", capital: "Tirane" },
	{...}
];
new Autocomplete({target: "transportBox", format: "table", data: countriesJSON,
	tableFields: {
		"return_value": "id",
		"fields": ["country", "code", "capital"], "headers": ["Country", "Code", "Capital"]
	}
});

// Example with cluster format
var brandsList = [
	{ group: "Cars", items: ["Ford", "Seat", "Jaguar"] },
	{ group: "Motorcycles", items: ["Suzuki", "Ducati", "Hayley-Davidson"] },
	{ ... }
];
new Autocomplete({target: "transportBox", format: "cluster", data: brandsList});
```
#### PROPIEDAD HIGHLIGHTS
**Tipo**

object
**Descripción**

Este parámetro es un JSON que indica qué campo se utilizará como flag para destacar campos y su estilo.
**Ejemplos**
```javascript
new Autocomplete({
	target: "transportBox",
	format: "table",
	data: countriesJSON,
	// Tooltip es un array de JSON que puede definir tantos tooltips como columnas se muestran
	tooltip: [{
		//Nombre del campo donde se establecerá el tooltip
		field: "country"
		//Nombre del campo que contiene el texto utilizado por el tooltip
		text: "status"
	}],
	tableFields: {
		return_value: "id",
		highlights: {
			// Nombre del campo con el flag que indica si destacado o no
			field: "disabled",
			// Background del destacado
			bg: "red",
			// Color del texto del destacado
			fg: "white"
		},
		fields: ["country", "code", "capital"],
		headers: ["Country", "Code", "Capital"]
	}
});

new Autocomplete({
	input: "inputclustered",
	data: clusterListJSON,
	minLength: 1,
	startsWith: true,
	tooltips: {
		// Nombre del campo donde se encuentra el texto del tooltip
		field: "tooltip"
	},
	highlights: {
		// Nombre del campo que servirá como flag para marcar como destacado.
		// Sólo se activará cuando distinto de 0
		field: "flag",
		// Color de fondo del destacado
		bg: "#fff",
		// Color del texto del destacado
		fg: "#ccc"
	},
	format: "cluster",
	callback: callback
});
```
#### PROPIEDAD MESSAGE
**Tipo**

string
**Descripción**

Mensaje a mostrar únicamente cuando la propiedad minLength es -1.
**Ejemplos**
```javascript
new Autocomplete({target: "inputTextID", data: {}, minLength: -1, message: "Loading..."});
```
#### PROPIEDAD MINLENGTH
**Tipo**

integer
**Descripción**

Longitud mínima para comenzar a buscar dentro del objeto "data". Por defecto es 3.
**Ejemplos**
```javascript
new Autocomplete({target: "inputTextID", data: arrayList, minLength: 4});
var arrayList = ["Car", "Motorcycle", "Airplane", "Train", "Bicicle"];
```
#### PROPIEDAD SHOWHEADERS
**Tipo**

boolean
**Descripción**

Este parámetro solo es válido para el formato de "table". Indica al complemento Autocompletar que se deben mostrar los encabezados de la tabla. Por defecto es false.
**Ejemplos**
```javascript
var countriesJSON = [
	{ id: 1, country: "Afghanistan", code: "AFG", capital: "Kabul" },
	{ id: 2, country: "Albania", code: "ALB", capital: "Tirane" },
	{...}
];
new Autocomplete({
	target: "transportBox",
	format: "table",
	showHeaders: true,
	data: countriesJSON,
	tableFields: {
		"return_value": "id",
		"fields": ["country", "code", "capital"], "headers": ["Country", "Code", "Capital"]
	}
});
```
#### PROPIEDAD STARTSWITH
**Tipo**

boolean
**Descripción**

Este parámetro indica si la coincidencia de búsqueda debe comenzar con la cadena ingresada o puede estar contenida en cualquier posición. Por defecto es false.
**Ejemplos**
```javascript
var countriesJSON = [
	{ id: 1, country: "Afghanistan", code: "AFG", capital: "Kabul" },
	{ id: 2, country: "Albania", code: "ALB", capital: "Tirane" },
	{...}
];
new Autocomplete({
	target: "transportBox",
	startsWith: true,
	format: "table",
	showHeaders: true,
	data: countriesJSON,
	tableFields: {
		"return_value": "id",
		"fields": ["country", "code", "capital"], "headers": ["Country", "Code", "Capital"]
	}
});
```
#### PROPIEDAD TARGET
**Tipo**

string
**Descripción**

ID del input (campo de entrada de texto) dónde el Autocomplete será implementado.
**Ejemplos**
```javascript
new Autocomplete({target: "inputTextID", data: arrayList});
var arrayList = ["Car", "Motorcycle", "Airplane", "Train", "Bicicle"];
```
#### PROPIEDAD TABLEFIELDS
**Tipo**

integer
**Descripción**

Un objeto JSON con el siguiente formato: 
* "return_value": Que indica qué campo se devolverá.
* "highlights": Que indica el campo que activará o desactivará el registro como destacado.
* "fields": Que indica los campos que compondrán el objeto "data".
* "headers": Que indica la traducción para mostrar en los encabezados del autocomplete en formato "table".
**Ejemplos**
```javascript
var countriesJSON = [
	{ id: 1, country: "Afghanistan", code: "AFG", capital: "Kabul" },
	{ id: 2, country: "Albania", code: "ALB", capital: "Tirane" },
	{...}
];
new Autocomplete({target: "transportBox", format: "table", data: countriesJSON,
	tableFields: {
		return_value: "id",
		highlights: {
			// Nombre del campo con el flag que indica si destacado o no
			field: "disabled",
			// Background del destacado
			bg: "red",
			// Color del texto del destacado
			fg: "white"
		},
		fields: ["country", "code", "capital"],
		headers: ["Country", "Code", "Capital"]
	}
});
```
#### PROPIEDAD TOOLTIPS
**Tipo**

object
**Descripción**

Este parámetro es un JSON que indica qué campos se utilizarán como fuente del tooltip. Si se utiliza el modo "cluster", sólo se debe indicar el campo dónde está el texto del tooltip. Si se utiliza el modo "table", se debe indicar el nombre del campo dónde se insertará el tooltip y el campo del tooltip.
**Ejemplos**
```javascript
new Autocomplete({
	target: "transportBox",
	format: "table",
	data: countriesJSON,
	// Tooltip es un array de JSON que puede definir tantos tooltips como columnas se muestran
	tooltip: [{
		//Nombre del campo donde se establecerá el tooltip
		field: "country"
		//Nombre del campo que contiene el texto utilizado por el tooltip
		text: "status"
	}],
	tableFields: {
		return_value: "id",
		highlights: {
			// Nombre del campo con el flag que indica si destacado o no
			field: "disabled",
			// Background del destacado
			bg: "red",
			// Color del texto del destacado
			fg: "white"
		},
		fields: ["country", "code", "capital"],
		headers: ["Country", "Code", "Capital"]
	}
});

new Autocomplete({
	input: "inputclustered",
	data: clusterListJSON,
	minLength: 1,
	startsWith: true,
	tooltips: {
		// Nombre del campo donde se encuentra el texto del tooltip
		field: "tooltip"
	},
	highlights: {
		// Nombre del campo que servirá como flag para marcar como destacado.
		// Sólo se activará cuando distinto de 0
		field: "flag",
		// Color de fondo del destacado
		bg: "#fff",
		// Color del texto del destacado
		fg: "#ccc"
	},
	format: "cluster",
	callback: callback
});
```
#### INFORMACIÓN ADICIONAL
**Descripción**

Puedes obtener toda la información del elemento seleccionado desde una función de devolución de llamada (callback). Por ejemplo:
**Ejemplos**
```javascript
// Ejemplo
new Autocomplete({target: "catalogBox", data: arrayList, callback: callback});

// La función "callback" devolverá una entrada similar a:
// <input type="hidden" data-id="catalogBox" data-index="2,3" value="nombre producto">
function callback(input){
	// El elemento dónde se produjo el evento de autocompletado podría extraerse de:
	var target = document.getElementById(inp.dataset.id);
	// Para el formato "cluster", además, podemos extraer el grupo y nombre del elemento
	// seleccionado a través del atributo "data-index":
	var idx = inp.dataset.index.split(",");
	var idxGroup  = idx[0];
	var idxItem   = idx[1];
	var itemGroup = clusterList[idxGroup].group;
	var itemName  = clusterList[idxGroup].items[idxItem];
}
```
## Benchmark


Este plugin permite comprobar la calidad y el rendimiento de un código pasado a través de una función.
#### MÉTODO TEST
**Tipo**

function
#### PROPIEDAD TEST
**Descripción**

Realiza y muestra un informe con el resultado del análisis.
**Ejemplos**
```javascript
// Diferencia entre for y forEach
var bigArray = new Array(1000);
Benchmark.test({name: "for", fn: function () {
	var result = [];
	for (var x = 0; x < bigArray.length; x++) {
		result.push(bigArray[x]);
	}
	return result;
}});


Benchmark.test({name: "forEach", fn: function () {
	var result = [];
	bigArray.forEach(function(element) {
		result.push(element);
	});
	return result;
}});


// Resultados del ejemplo ejecutado en Chrome: 
[
	{
		checks: 2
		diff: "0%"
		elapsed: 3254
		name: "forEach"
		perSecondIterations: 456395
		totalIterations: 1485112
		},
	{
	checks: 2
		diff:"87.1%"
		elapsed: 3284
		name: "for"
		perSecondIterations: 58865
		totalIterations: 193313
	}
]
```
#### PROPIEDAD TESTTIME
**Tipo**

Integer
**Descripción**

Establece la duración máxima del test en milisegundos. Por defecto es 3000.
**Ejemplos**
```javascript
Benchmark.testTime = 10000;
```
#### PROPIEDAD MAXITERATIONS
**Tipo**

Integer
**Descripción**

Establecer el número máximo operaciones por test. Por defecto es "0x3FFFFFFF" (1 Tera)
**Ejemplos**
```javascript
Benchmark.maxIterations = 2500000;
```
#### PROPIEDAD SHOWLOG
**Tipo**

boolean
**Descripción**

Muestra un mensaje de resumen en la consola cada vez que finaliza una operación. Por defecto es false.
**Ejemplos**
```javascript
Benchmark.showLog = true;
```
#### PROPIEDAD RESULTS
**Tipo**

Object
**Descripción**

Mostrar los resultados de todos los test realizados anteriormente.
**Ejemplos**
```javascript
console.log(Benchmark.results);
```
#### INFORMACIÓN ADICIONAL
**Descripción**

Puedes obtener toda la información del elemento seleccionado desde una función de devolución de llamada (callback). Por ejemplo:
**Ejemplos**
```javascript
// Ejemplo
new Autocomplete({target: "catalogBox", data: arrayList, callback: callback});

// La función "callback" devolverá una entrada similar a:
// <input type="hidden" data-id="catalogBox" data-index="2,3" value="nombre producto">
function callback(input){
	// El elemento dónde se produjo el evento de autocompletado podría extraerse de:
	var target = document.getElementById(inp.dataset.id);
	// Para el formato "cluster", además, podemos extraer el grupo y nombre del elemento
	// seleccionado a través del atributo "data-index":
	var idx = inp.dataset.index.split(",");
	var idxGroup  = idx[0];
	var idxItem   = idx[1];
	var itemGroup = clusterList[idxGroup].group;
	var itemName  = clusterList[idxGroup].items[idxItem];
}
```
## Constraint


Constraint es un plugin que proporciona una forma sencilla de evitar la introducción de valores que, de antemano, se sabe que no son válidos. Su funcionamiento se basa en expresiones regulares y se integra fácilmente con otros componentes de JavaScript o HTML5.
Una vez que se define el control, se puede acceder a sus métodos a través de document.inputTextID.Constraint.
#### PROPIEDAD BASE
**Tipo**

integer
**Descripción**

El parámetro "base" establece una base numérica diferente a 10, la establecida por defecto. El tipo binario establece automáticamente la base a 2. El tipo hexadecimal establece automáticamente la base a 16.
**Ejemplos**
```javascript
new Constraint.set({target: "inputTextID", type: "decimal", base: 2});
// A través del tipo binario
new Constraint.set({target: "inputTextID", type: "binary"});
```
#### PROPIEDAD DECIMALPOINT
**Tipo**

string
**Descripción**

El parámetro "decimalpoint" indica el carácter que separará la parte entera de la parte decimal. Sólo será válido en los tipos numéricos con decimales. Por defecto el valor es "." (punto).
**Ejemplos**
```javascript
new Constraint.set({target: "inputTextID", type: "decimal", decimalpoint: ","});
```
#### MÉTODO FUNCTION
**Tipo**

function
#### PROPIEDAD FUNCTION
**Descripción**

El parámetro "function" define la función de validación que controlará el formato de entrada y los valores admitidos. La validación realizada por esta función se puede definir a través de expresiones regulares (en el caso del subtipo "binario", la función podría ser "return /^(0|1)*$/.test(value);") aunque no es obligatorio. Si se define este parámetro a través de una función, el parámetro "type" debe establecerse a "custom".
**Ejemplos**
```javascript
// Ejemplo de subtipo personalizado (Número en formato octal).
new Constraint.set({
	target: "inputTextID",
	type: "custom",
	function: function(value) {
		return /^[0-7]*$/i.test(value);
	},
	base: 8,
});
```
#### PROPIEDAD INDICATORS
**Tipo**

object
**Descripción**

El parámetro "indicators" indica si se deben mostrar los iconos de flecha hacia arriba, flecha hacia abajo y el color. Estos iconos a menudo se asocian con los controles de tipo numérico en HTML5, por lo que generalmente es una buena idea mostrarlos. Por defecto, el valor está establecido a true.
El parámetro "indicators" se compone de atributos "enabled" y "color".
**Ejemplos**
```javascript
new Constraint.set({target: "inputTextID", type: "decimal", indicators: {enabled: true, color: "rgba(0,0,0,0.25)"}});
new Constraint.set({target: "inputTextID", type: "decimal", indicators: {color: "red"}});
```
#### PROPIEDAD TARGET
**Tipo**

string
**Descripción**

ID del control dónde será implementado el constraint
**Ejemplos**
```javascript
new Constraint.set({target: "inputTextID", type: "int"});
```
#### PROPIEDAD STEP
**Tipo**

float
**Descripción**

El parámetro "step" indica el incremento o decremento cuando el usuario presiona las teclas de cursor o uno de los botones asignados como "indicadores". Por defecto es 1.
**Ejemplos**
```javascript
new Constraint.set({target: "inputTextID", type: "decimal", step: 0.01});
```
#### PROPIEDAD TYPE
**Tipo**

string
**Descripción**

El parámetro "type" define el formato o el tipo de datos que permitirá el control. Los valores aceptados son:
* int: Los valores permitidos son únicamente enteros positivos y negativos.
* uint: Los valores permitidos son únicamente enteros positivos.
* float: Los valores permitidos son enteros y números reales con decimales infinitos.
* decimal: Los valores permitidos son enteros y números reales con dos decimales.
* percent: Los valores permitidos son entre 0 y 100.
* binary: Los valores permitidos son números enteros escritos y definidos a través de su base, en este caso 0 y 1.
* hexadecimal: Los valores permitidos son números enteros escritos y definidos a través de su base, en este caso de 0 a 9 y de A a F.
* hour: Los valores permitidos son de 00:00 a 23:59.
* custom: Permite definir una función de tipo personalizado. El subtipo "custom" se alimenta del parámetro "function", por lo que si el control se define como "custom", será obligatorio (el parámetro "function").
**Ejemplos**
```javascript
// Example of Integer subtype
new Constraint.set({target: "inputTextID", type: "int"});

// Example of Hour subtype
new Constraint.set({target: "inputTextID", type: "hour"});

// Example of Custom subtype (Number in octal format). The custom subtype needs 
new Constraint.set({
	target: "inputTextID",
	type: "custom",
	function: function(value) {
		return /^[0-7]*$/i.test(value);
	},
	base: 8,
});
```
#### PROPIEDAD INCREMENT
**Tipo**

string
**Descripción**

Aumenta el valor de la entrada asociada al valor establecido en "step". Por defecto, "step" es 1.
**Ejemplos**
```javascript
Constraint.increment("inputTextID");
```
#### PROPIEDAD DECREMENT
**Tipo**

string
**Descripción**

Disminuye el valor de la entrada asociada al valor establecido en "step". Por defecto, "step" es 1.
**Ejemplos**
```javascript
Constraint.decrement("inputTextID");
```
#### INFORMACIÓN ADICIONAL
**Descripción**

Puedes obtener toda la información del elemento seleccionado desde una función de devolución de llamada (callback). Por ejemplo:
**Ejemplos**
```javascript
// Ejemplo
new Autocomplete({target: "catalogBox", data: arrayList, callback: callback});

// La función "callback" devolverá una entrada similar a:
// <input type="hidden" data-id="catalogBox" data-index="2,3" value="nombre producto">
function callback(input){
	// El elemento dónde se produjo el evento de autocompletado podría extraerse de:
	var target = document.getElementById(inp.dataset.id);
	// Para el formato "cluster", además, podemos extraer el grupo y nombre del elemento
	// seleccionado a través del atributo "data-index":
	var idx = inp.dataset.index.split(",");
	var idxGroup  = idx[0];
	var idxItem   = idx[1];
	var itemGroup = clusterList[idxGroup].group;
	var itemName  = clusterList[idxGroup].items[idxItem];
}
```
## Debugger


Depurador automático para ayudarte a saber todo lo que sucede en tu página. Desde cuando un usuario hace un clic hasta conocer qué llamadas ajax se ejecutan en segundo plano.
#### MÉTODO INIT
**Tipo**

function
#### PROPIEDAD INIT
**Descripción**

Fácil de inicializar. Se puede inicializar en modo consola o en una ventana a parte (screen).
**Ejemplos**
```javascript
// Depurar a través de la consola
Debugger.init("console");
// Depurar a través de una ventana externa
Debugger.init("window");
```
#### PROPIEDAD ATTRIBUTESFILTER
**Tipo**

Object
**Descripción**

Debugger permite depurar selectivamente los atributos de forma independiente o de forma combinada. La forma de especificar qué observar es a través de una matriz de valores que indica qué es lo que se debe depurar. Por defecto, attributesFilter está definido a vacío.
**Ejemplos**
```javascript
// Depurar todos los atributos
Debugger.attributesFilter = [];
Debugger.init();

// Depurar únicamente los atributos cellspacing y cellspadding
Debugger.attributesFilter = ["cellspacing", "cellspadding"];
Debugger.init();
```
#### PROPIEDAD EXCLUDEDATTRIBUTESFILTER
**Tipo**

Object
**Descripción**

Debugger también permite deshabilitar selectivamente los atributos que no se desean depurar. La manera de especificar lo que no se debe observar es a través de una matriz de valores que indica lo que no se debe depurar. Por defecto, excludedAttributesFilter tiene establecido únicamente el atributo "style".
**Ejemplos**
```javascript
// No depurar las propiedades de style, class, id y src. Lo demás sí
Debugger.excludedAttributesFilter = ["style", "class", "id", "src"];
Debugger.init();
```
#### PROPIEDAD SELECTORSFILTER
**Tipo**

Object
**Descripción**

Debugger permite depurar selectivamente las etiquetas de forma independiente o de forma combinada. La forma de especificar qué etiquetas se deben observar es a través de una matriz de valores que indica qué se debe depurar. Por defecto, selectorsFilter está definido a vacío.
**Ejemplos**
```javascript
// Depurar todas las etiquetas
Debugger.selectorsFilter = [];
Debugger.init();

// Depurar sólo los cuadros de texto, desplegables y los botones
Debugger.selectorsFilter = ["INPUT", "SELECT", "BUTTON"];
Debugger.init();
```
#### PROPIEDAD EXCLUDEDSELECTORSFILTER
**Tipo**

Object
**Descripción**

Debugger también permite desactivar selectivamente las etiquetas que no se desean depurar. La manera de especificar qué no se debe observar es a través de una matriz de valores que indica lo que no se debe depurar. Por defecto, excludedSelectorsFilter está definindo a vacío.
**Ejemplos**
```javascript
// No depurar los DIV, SPAN, NAV y LEGEND. Los demás sí
Debugger.excludedSelectorsFilter = ["DIV", "SPAN", "NAV", "LEGEND"];
Debugger.init();
```
#### PROPIEDAD EVENTSFILTER
**Tipo**

Object
**Descripción**

Debugger permite depurar eventos de forma selectiva de forma independiente o de forma combinada. La forma de especificar qué eventos observar es a través de una matriz de valores que indica qué se debe depurar.

La lista de eventos permitidos son todos los de JavaScript, véase clic, mouseover, mouseout, mouseenter, mouseleave, keydown, keyup, Presionar teclas, cambiar, enfocar, enfocar, enfocar, difuminar,...

Por defecto, si el parámetro eventFilter se deja vacío, se observarán los eventos básicos de interacción, es decir, change, clic, focusin (tomar el foco), focusout (perder el foco) y keydown ya que, este, permite controlar las teclas Ctrl, Alt y Shift (mayúsculas).

De forma predeterminada, eventsFilter se define como vacío.
**Ejemplos**
```javascript
// Depurar los predefinidos
Debugger.eventsFilter = [];
Debugger.init();

// Depurar sólo el evento change.
Debugger.eventsFilter = ["change"];
Debugger.init();
```
#### PROPIEDAD ENABLEHISTORY
**Tipo**

boolean
**Descripción**

Debugger permite exportar el historial de cambios a un archivo. Por defecto, enableHistory es false.
**Ejemplos**
```javascript
// Activar el historial
Debugger.enableHistory = true;
Debugger.init();
// ...
// ... Actions ...
// ...
// Recuperar el historial.
Debugger.getHistory();
```
#### MÉTODO GETHISTORY
**Tipo**

function
#### PROPIEDAD GETHISTORY
**Descripción**

Para exportar el historial de eventos a un archivo, se puede usar la función de guardar del navegador si está en una ventana a parte (modo screen). Sin embargo, el depurador tiene una manera más sencilla de lograr este requisito. Para extraer el historial de cambios, se puede ejecutar la función getHistory() que devuelve el historial en formato de texto plano.
**Ejemplos**
```javascript
// Activar el historial
Debugger.enableHistory = true;
Debugger.init();
// ...
// ... Actions ...
// ...
// Recuperar el historial.
Debugger.getHistory();
```
#### PROPIEDAD MESSAGES
**Tipo**

Object
**Descripción**

Debugger permite definir mensajes personalizados para cada tipo de cambio o mutación.
**Ejemplos**
```javascript
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
	separator: '<div style="border: 1px solid #333; border-width: 0px 0px 1px 0px; height:5px; width:100%;margin-bottom: 5px;"> </div>'
}
```
#### PROPIEDAD COLORS
**Tipo**

Object
**Descripción**

Debugger permite definir los colores personalizados para cada tipo de cambio o mutación.
**Ejemplos**
```javascript
colors: {
	// For elements added in the DOM
	added:"#709050",
	// For changes in attributes in the DOM
	attributeChanged: '#ff00ff',
	// Background of the Debugger window
	background:"#000000",
	// For events Blur
	blur:"#907080",
	// For Focus events
	focus:"#9070a0",
	// For events Click
	click:"#909090",
	// For Mouse Over events
	mouseOver:"#a07090",
	// For Mouse Out events
	mouseOut:"#807090",
	// For Keypress events
	keyPress:"#80a090",
	// For detected errors
	error: '#a02020',
	// Header Text
	headerForeground:"#ffffff",
	// Header Background
	headerBackground:"#333",
	// For standard and unregistered changes
	normal:"#606060",
	// For Ajax in mode Processing
	proccessing:"#8AC007",
	// For state changes of Ajax
	readyState:"#8AC007",
	// For deleted items in the DOM
	removed:"#a01010",
	// For Ajax in Sending
	sending mode:"#8AC007",
	// For Ajax in Updating mode
	updated:"#80a0e0",
	// For changes to the value attributes
	valueChanged:"#FE2466"
}
```
#### INFORMACIÓN ADICIONAL
**Descripción**

Puedes obtener toda la información del elemento seleccionado desde una función de devolución de llamada (callback). Por ejemplo:
**Ejemplos**
```javascript
// Ejemplo
new Autocomplete({target: "catalogBox", data: arrayList, callback: callback});

// La función "callback" devolverá una entrada similar a:
// <input type="hidden" data-id="catalogBox" data-index="2,3" value="nombre producto">
function callback(input){
	// El elemento dónde se produjo el evento de autocompletado podría extraerse de:
	var target = document.getElementById(inp.dataset.id);
	// Para el formato "cluster", además, podemos extraer el grupo y nombre del elemento
	// seleccionado a través del atributo "data-index":
	var idx = inp.dataset.index.split(",");
	var idxGroup  = idx[0];
	var idxItem   = idx[1];
	var itemGroup = clusterList[idxGroup].group;
	var itemName  = clusterList[idxGroup].items[idxItem];
}
```
## DOM
#### INFORMACIÓN ADICIONAL
**Descripción**

Puedes obtener toda la información del elemento seleccionado desde una función de devolución de llamada (callback). Por ejemplo:
**Ejemplos**
```javascript
// Ejemplo
new Autocomplete({target: "catalogBox", data: arrayList, callback: callback});

// La función "callback" devolverá una entrada similar a:
// <input type="hidden" data-id="catalogBox" data-index="2,3" value="nombre producto">
function callback(input){
	// El elemento dónde se produjo el evento de autocompletado podría extraerse de:
	var target = document.getElementById(inp.dataset.id);
	// Para el formato "cluster", además, podemos extraer el grupo y nombre del elemento
	// seleccionado a través del atributo "data-index":
	var idx = inp.dataset.index.split(",");
	var idxGroup  = idx[0];
	var idxItem   = idx[1];
	var itemGroup = clusterList[idxGroup].group;
	var itemName  = clusterList[idxGroup].items[idxItem];
}
```
## GetBrowser


Attempts to determine the capabilities of the user's browser through  the browser's information contains in the navigator object of JavaScript.
#### INFORMACIÓN ADICIONAL
**Descripción**

Para recuperar el nombre del navegador::
**Ejemplos**
```javascript
var browser = new GetBrowser(), browserName = browser.name;
```
**Descripción**

Para saber si el navegador es Chrome:
**Ejemplos**
```javascript
var browser = new GetBrowser(), if(browser.chrome){ console.log("Tu navegador es is Chrome!")}
```
**Descripción**

Para saber si el navegador es Firefox:
**Ejemplos**
```javascript
var browser = new GetBrowser(), if(browser.firefox){ console.log("Tu navegador es is Firefox!")}
```
**Descripción**

Para saber si el navegador es Internet Explorer:
**Ejemplos**
```javascript
var browser = new GetBrowser(), if(browser.msie){ console.log("Tu navegador es Internet Explorer!")}
```
**Descripción**

Para saber si el navegador es Opera:
**Ejemplos**
```javascript
var browser = new GetBrowser(), if(browser.opera){ console.log("Tu navegador es Opera!")}
```
**Descripción**

Obtener la versión del navegador:
**Ejemplos**
```javascript
var browser = new GetBrowser(), console.log(browser.version);
```
**Descripción**

Obtener el prefijo de CSS utilizado por el navegador:
**Ejemplos**
```javascript
var browser = new GetBrowser(), console.log(browser.prefix);
```
## GetParam


Función para obtener todos los valores de los parámetros recibidos en la URL.
#### INFORMACIÓN ADICIONAL
**Descripción**

Para obtener el valor del parámetro "h":
**Ejemplos**
```javascript
var h = GetParam()["h"];
```
## HttpRequest


HttpRequest es un plugin que proporciona una forma sencilla de realizar solicitudes remotas o transferir datos entre un cliente y un servidor. Este complemento está creado completamente en JavaScript y está diseñado para mejorar el rendimiento de la aplicación, incluso en llamadas síncronas.
#### PROPIEDAD AJAX
**Tipo**

boolean
**Descripción**

Booleano que indica si la solicitud o petición debe ejecutarse de forma síncrona (false) o asíncrina (true).
**Ejemplos**
```javascript
new HttpRequest({url: "index.html", ajax: true})
```
#### MÉTODO CALLBACK
**Tipo**

function
#### PROPIEDAD CALLBACK
**Descripción**

Función que se debe llamar cuando se reciba la respuesta..
**Ejemplos**
```javascript
new HttpRequest({callback: callback});
function callback(e){
	console.log(e);
}
```
#### MÉTODO CONTENTTYPE
**Tipo**

function
#### PROPIEDAD CONTENTTYPE
**Descripción**

Tipo de contenido de los datos recibidos. Por defecto, este attributo es application/x-www-form-urlencoded.
Los valores más comunes son:
* application/x-www-form-urlencoded (responsiveType debe ser "text")
* text/html; charset=utf-8 (responsiveType debe ser "text")
* application/json; charset=utf-8 (responsiveType debe ser "json")
* application/octet-stream (responsiveType debe ser "blob")
* application/pdf (responsiveType debería ser "blob")
**Ejemplos**
```javascript
new HttpRequest({url: "getData.json", contentType: "application/json; charset=utf-8"})
```
#### MÉTODO ONABORT
**Tipo**

function
#### PROPIEDAD ONABORT
**Descripción**

Función de llamada cuando la solicitud es abortada.
**Ejemplos**
```javascript
new HttpRequest({url: "index.html", onAbort: HttpRequestOnAbort});
function HttpRequestOnAbort(event){
	console.log("The request was aborted", event);
}
```
#### MÉTODO ONERROR
**Tipo**

function
#### PROPIEDAD ONERROR
**Descripción**

Función de llamada cuando la solicitud ha tenido algún tipo de error.
**Ejemplos**
```javascript
new HttpRequest({url: "http://remoteaddress.com/data.php", onError: HttpRequestOnError});
function HttpRequestOnError(event){
	console.log("An error occurred during the request", event);
}
```
#### MÉTODO ONLOAD
**Tipo**

function
#### PROPIEDAD ONLOAD
**Descripción**

Función de llamada cuando la solicitud ha sido ejecutada de forma satisfactoria.
**Ejemplos**
```javascript
new HttpRequest({url: "document.pdf", onLoad: HttpRequestOnLoad});
function HttpRequestOnLoad(event){
	console.log("Request completes successfully", event);
}
```
#### MÉTODO ONLOADEND
**Tipo**

function
#### PROPIEDAD ONLOADEND
**Descripción**

Es la función llamada cuando la solicitud se completa por cualquier motivo, sea satisfactoriamente o no.
**Ejemplos**
```javascript
new HttpRequest({url: "document.pdf", onLoadEnd: HttpRequestOnLoadEnd});
function HttpRequestOnLoadEnd(event){
	console.log("Request was completed but it may not have been successful", event);
}
```
#### MÉTODO ONLOADSTART
**Tipo**

function
#### PROPIEDAD ONLOADSTART
**Descripción**

Es la función llamada cuando la solicitud comienza a transferir datos.
**Ejemplos**
```javascript
new HttpRequest({url: "document.pdf", onLoadStart: HttpRequestOnLoadStart});
function HttpRequestOnLoadStart(event){
	console.log("Starting to download", event);
}
```
#### MÉTODO ONPROGRESS
**Tipo**

function
#### PROPIEDAD ONPROGRESS
**Descripción**

Se llama a la función mientras la solicitud se ejecuta.
**Ejemplos**
```javascript
new HttpRequest({url: "document.pdf", onProgress: HttpRequestOnProgress});
function HttpRequestOnProgress(event){
	console.log("Download underway", event);
}
```
#### MÉTODO ONTIMEOUT
**Tipo**

function
#### PROPIEDAD ONTIMEOUT
**Descripción**

Es la función llamada cuando se supera el tiempo de máximo de espera. Mira también la propiedad "timeout".
**Ejemplos**
```javascript
new HttpRequest({url: "index.html", onTimeout: HttpRequestOnTimeout});
function HttpRequestOnTimeout(event){
	console.log("Request exceeded the waiting time allowed", event);
}
```
#### PROPIEDAD METHOD
**Tipo**

string
**Descripción**

Sus valores posibles son POST, GET, HEAD, PUT o DELETE. Por defecto el atributo "method" es POST. Dependiendo del método y la configuración del servidor, podrían suceder errores 404 ó 405.
**Ejemplos**
```javascript
new HttpRequest({url: "index.html", method: "GET"});
```
#### PROPIEDAD PARAMETERS
**Tipo**

string
**Descripción**

JSON con los parámetros en formato:
{
	parameterName1: parametersValue1,
	parameterName2: parametersValue2,
	...
}
**Ejemplos**
```javascript
new HttpRequest({url: "getDataFromServer.asp", method: "POST", parameters: { idProduct: 3 }});
```
#### PROPIEDAD RESPONSETYPE
**Tipo**

string
**Descripción**

Los valores permitidos pueden ser:
* json,
*  texto ,
* blob
* arrayBuffer.
Nota: para HTML y JSON, no es obligatorio definir este parámetro.
**Ejemplos**
```javascript
new HttpRequest({url: "getListProducts.json", responseType: "json", parameters: { idCategory: 3 }});
```
#### PROPIEDAD RETURNFULLRESPONSE
**Tipo**

boolean
**Descripción**

Indica si sólo deben devolverse los datos o el objeto completo que devolvió la llamada.
**Ejemplos**
```javascript
new HttpRequest({url: "getDataFromServer.asp", returnFullResponse: true});
```
#### PROPIEDAD TIMEOUT
**Tipo**

integer
**Descripción**

Es la cantidad de milisegundos que puede tomar una solicitud antes de que se finalice automáticamente. Por defecto es 0.
**Ejemplos**
```javascript
new HttpRequest({url: "http://stack.overflow.com/data", timeout: 300 });
```
#### PROPIEDAD URL
**Tipo**

string
**Descripción**

URL de la solicitud.
**Ejemplos**
```javascript
new HttpRequest({url: "getDataFromServer.xml",});
```
#### PROPIEDAD WITHCREDENTIALS
**Tipo**

boolean
**Descripción**

Indica si las solicitudes de "Access-Control" entre sitios deben realizarse utilizando credenciales como cookies, encabezados de autorización o certificados de cliente TLS. La configuración con las credenciales no tiene ningún efecto en las solicitudes del mismo sitio.
**Ejemplos**
```javascript
new HttpRequest({url: "getDataFromServer.asp", withCredentials: true});
```
#### INFORMACIÓN ADICIONAL
**Descripción**

Para obtener el valor del parámetro "h":
**Ejemplos**
```javascript
var h = GetParam()["h"];
```
## Include


Plugin para insertar código HTML dentro de un contenedor. La carga de archivos se realiza a través de Ajax en modo asíncrono y con método POST.
#### PROPIEDAD DATA
**Tipo**

string
**Descripción**

El código HTML/texto a insertar.
**Ejemplos**
```javascript
Include({
	target: "targetID",
	data: '<section class="container">\
		<article id="art_01">\
			...\
		</article>\
	</section>'
});
```
#### PROPIEDAD FILE
**Tipo**

string
**Descripción**

URL del archivo a insertar en el elemento contenedor.
**Ejemplos**
```javascript
Include({target: "targetID", file: "./customers/profile.html"});
```
#### PROPIEDAD ATTRIBUTE
**Tipo**

string
**Descripción**

Indica qué atributo de datos personalizado HTML se utilizará para recuperar la URL que incluirá datos dentro de capas de contenedor (generalmente DIV, SECCIÓN, ARTÍCULO,...).
**Ejemplos**
```javascript
// Supongamos que el siguiente código fuente con "data-include"
<div>
	<div class="container" data-include="./profileCard.html"></div>
	<div class="container" data-include="./historical.html"></div>
</div>

 Include({attribute: "data-include"});
```
#### PROPIEDAD TARGET
**Tipo**

string
**Descripción**

ID del elemento contenedor donde se insertará el código.
**Ejemplos**
```javascript
Include({target: "targetID", file: "./customers/profile.html"});
```
#### INFORMACIÓN ADICIONAL
**Descripción**

Para obtener el valor del parámetro "h":
**Ejemplos**
```javascript
var h = GetParam()["h"];
```
## IntelliForm


IntelliForm es una herramienta para realizar operaciones con formularios. Permite agregar elementos de formulario en tiempo real, realizar solicitudes de publicación a través de JSON, automatizar secuencias de navegación, manejar operaciones de deshacer/rehacer y mucho más.
#### PROPIEDAD ADDELEMENT
**Tipo**

object
**Descripción**

Esta funcionalidad permite agregar elementos a un formulario a través del objeto JSON en tiempo de ejecución. Las propiedades JSON válidas son las típicas de HTML excepto "dataset" y "validate" que tienen un formato específico.
* dataset: Es un JSON con atributos de nombre y valor.
* validate: Es igual al formato Validator sin parámetro de destino. Para obtener más información, se puede consultar la ayuda del Validador de isiTools ejecutando "Validator.help()".
**Ejemplos**
```javascript
IntelliForm.addElements({
	target: "formID",
	data:[
		{
			tag: "input",
			id: "age",
			class: "form-item",
			type: "number",
			min: 18,
			max: 100,
			validate: {
				fixed: true,
				constraint: "!this.validity.rangeOverflow && !this.validity.rangeUnderflow",
				message: "Los posibles valores son entre 18 y 100"
			}
		},
		{
			tag: "input",
			id: "username",
			class: "form-item",
			type: "text",
			dataset: [
				{name: "id", value: "0"},
				{name: "logged", value: "true"}
			],
			focus: function(){
				this.classList.add("focused");
				},
			blur: function(){
				this.classList.remove("focused");
			}
		},
		{
			tag: "input",
			id: "pwd",
			class: "form-item",
			type: "password",
			validate: {
				fixed: true,
				required: true,
				constraint: "!this.validity.patternMismatch",
				message: "Debe contener al menos un número y una letra mayúscula y minúscula, y al menos 8 o más caracteres",
				pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
			},
			focus: function(){
				this.classList.add("focused");
			},
			blur: function(){
				this.classList.remove("focused");
			}
		}
	]
});
```
#### MÉTODO AUTOFILL
**Tipo**

function
#### PROPIEDAD AUTOFILL
**Descripción**

Permite rellenar todos los campos con los valores que se capturaron a través de la funcionalidad "enableUndo".
**Ejemplos**
```javascript
IntelliForm.autofill();
```
#### MÉTODO SETUNDO
**Tipo**

function
#### PROPIEDAD SETUNDO
**Descripción**

Proporciona la lógica necesaria para administrar todos los cambios que se realizan dentro de los input y select, incluso si la página se vuelve a cargar.
**Ejemplos**
```javascript
// Habilitar Deshacer para todo tipo de inputs.
IntelliForm.setUndo({target: ["input[type=text]"]});

// Otra forma es:
IntelliForm.target = ["name", "surname", "street", "phone", "email"];
IntelliForm.setUndo();
```
#### MÉTODO STARTSEQUENCE
**Tipo**

function
#### PROPIEDAD STARTSEQUENCE
**Descripción**

Proporciona una forma de crear una secuencia de cambios en "tiempo real" sobre la página actual para su reproducción posterior, incluso cuando la página se vuelve a cargar.
**Ejemplos**
```javascript
IntelliForm.startSequence();
// Para detener la secuencia se debe ejecutar la función de "stopSequence".
```
#### MÉTODO STOPSEQUENCE
**Tipo**

function
#### PROPIEDAD STOPSEQUENCE
**Descripción**

Detiene y guarda el registro de eventos. Esta funcionalidad solo funciona si "startSequence" se habilitó antes, de lo contrario, esta acción no tendrá ningún efecto.
**Ejemplos**
```javascript
IntelliForm.stopSequence();
```
#### MÉTODO GETSEQUENCE
**Tipo**

function
#### PROPIEDAD GETSEQUENCE
**Descripción**

Devuelve la secuencia guardada para la página actual.
**Ejemplos**
```javascript
IntelliForm.getSequence();
// This will return something similar to:
"[
	{"ts":0,"id":"_bodyItem58","event":"focusin"},
	{"ts":35,"id":"_bodyItem58","event":"click"},
	{"ts":37,"id":"_bodyItem58","event":"change","value":""}
	...
]
```
#### MÉTODO SETSEQUENCE
**Tipo**

function
#### PROPIEDAD SETSEQUENCE
**Descripción**

Permite establecer una nueva secuencia para interactuar con la página actual. Esta funcionalidad recibe un parámetro de tipo cadena con los pasos que se desean ejecutar. Las posibles propiedades dentro de la secuencia son:
* ts: indica el tiempo, en milisegundos, que debe transcurrir entre el cambio anterior y actual.
* id: Indica el nombre (de identificación válido) al que se aplicará el cambio. Puede ejecutar la funcionalidad "setIDs()" antes de asignar la propiedad "id" automáticamente.
* event: indica el tipo de cambio. Los eventos posibles son: click, focusin, focusout, scroll, change y keydown.
* left: indican la posición izquierda en eventos de desplazamiento (scroll).
* key: indica el carácter que se presiona en los eventos keydown.
* keyCode: indica el código de la tecla JavaScript presionado en los eventos keydown.
* top: Indica la posición superior en los eventos de desplazamiento (scroll).
* value: indica el valor del elemento en los eventos de tipo change.

Nota: la mejor manera de crear una secuencia es usar la funcionalidad "startSequence".
**Ejemplos**
```javascript
IntelliForm.setSequence('[{"ts":0,"id":"_bodyItem58","event":"focusin"},{"ts":35,"id":"_bodyItem58","event":"click"},{"ts":37,"id":"_bodyItem58","event":"focusout"},...]');
```
#### MÉTODO REMOVESEQUENCE
**Tipo**

function
#### PROPIEDAD REMOVESEQUENCE
**Descripción**

Eliminar la secuencia de la página actual.
**Ejemplos**
```javascript
IntelliForm.removeSequence();
```
#### MÉTODO PLAYSEQUENCE
**Tipo**

function
#### PROPIEDAD PLAYSEQUENCE
**Descripción**

Permite reproducir una secuencia ya almacenada. Si el parámetro de la función está vacío, se recupera la secuencia a la página actual.
**Ejemplos**
```javascript
IntelliForm.playSequence();
```
#### MÉTODO SETIDS
**Tipo**

function
#### PROPIEDAD SETIDS
**Descripción**

Asigna un atributo "id" secuencial a todos los elementos que no lo tengan establecido.
**Ejemplos**
```javascript
IntelliForm.setIDs();
```
#### MÉTODO SEND
**Tipo**

function
#### PROPIEDAD SEND
**Descripción**

Permite crear y enviar formularios en tiempo real a través de Ajax con método post. Los parámetros recibidos son: URL (para realizar la solicitud) y JSON con los inputs/elementos a enviar.
**Ejemplos**
```javascript
IntelliForm.send({
	url: "../pages/setProduct",
	params: [{
		"type": "text",
		"id": "idProduct",
		"value": "1"
	}]
});
```
#### PROPIEDAD TARGET
**Tipo**

object
**Descripción**

Array de selectores con los elementos donde se habilitarán las funcionalidades de IntelliForm.
**Ejemplos**
```javascript
IntelliForm.setUndo({target: ["#email", "#zipcode"]});
```
#### INFORMACIÓN ADICIONAL
**Descripción**

Para obtener el valor del parámetro "h":
**Ejemplos**
```javascript
var h = GetParam()["h"];
```
## IsMobile


Este método indica si el dispositivo actual es "mobile" o no.
#### INFORMACIÓN ADICIONAL
**Descripción**

Para saber si el dispositivo es un dispositivo móvil:
**Ejemplos**
```javascript
var mobile = new IsMobile();
```
## Language


Este script le permite activar y administrar la función de multilenguaje en su sitio web.
#### MÉTODO INIT
**Tipo**

function
#### PROPIEDAD INIT
**Descripción**

Asignar e inicializar la funcionalidad de multilenguaje.
**Ejemplos**
```javascript
var availableLangs = [
	{id: "en-US", name: "English"},
	{id: "es-ES", name: "Spanish"},
];
var translations = {
	"es-ES": [
		{ id: "Loading...", text: "Cargando..." },
		{ id: "Loaded!", text: "Cargado!" },
		{ id: "Comments", text: "Observaciones" }
	],
	"en-US": [
		{ id: "Loading...", text: "" },
		{ id: "Loaded!", text: "OK!" }
	]
};
Language.init(availableLangs, translations);
```
#### MÉTODO RENDER
**Tipo**

function
#### PROPIEDAD RENDER
**Descripción**

Analiza todo el documento y reemplaza todas las coincidencias de patrones. Esta funcionalidad se alimenta de los atributos "data-tkey", "data-placeholder-tkey" y "data-title-tkey".
**Ejemplos**
```javascript
// The availableLangs and translations objects are defined before.
// For example, supposed the next HTML code:
//	<label for="notes" data-tkey="Comments"></label>
//	<input id="notes" name="notes" placeholder="Comments" type="text" maxlength="255" />
Language.init(availableLangs, translations);
Language.render();

// Note that the placeholder is translated and assugn the source text to "data-placeholder-tkey" attribute.
```
#### MÉTODO SET
**Tipo**

function
#### PROPIEDAD SET
**Descripción**

Establece el idioma actual. De forma predeterminada, el idioma es el que se proporciona a través del navegador.
Advertencia: Para admitir la compatibilidad del navegador, el código de idioma enviado se codificaría en ISO-639-1.
**Ejemplos**
```javascript
// Supposed that language by default in Chrome is "es-ES" (ISO 639-1 code to Spain)
Language.set("en-US");
```
#### MÉTODO GET
**Tipo**

function
#### PROPIEDAD GET
**Descripción**

Devuelve la traducción para la cadena recibida. Si no se encuentra la coincidencia, se supone que no tiene traducción y devuelve la misma cadena.
**Ejemplos**
```javascript
var tkey = Language.get("Loading...");
// Si se desea recuperar la traducción para un idioma especificado, se puede enviar el identificador de idioma como segundo parámetro:
var tkey_ES = Language.get("Loading...", "es-ES");
```
#### INFORMACIÓN ADICIONAL
**Descripción**

Para saber si el dispositivo es un dispositivo móvil:
**Ejemplos**
```javascript
var mobile = new IsMobile();
```
## Password


El script de contraseña es una herramienta que le permite administrar la creación de contraseñas y sus fortalezas. Permite definir la longitud y el número mínimo de mayúsculas, minúsculas, números y caracteres especiales para enviar / guardar la contraseña. Además, el script de contraseña penaliza las acciones como insertar varias minúsculas consecutivas, insertar varias mayúsculas consecutivas, insertar varios dígitos consecutivos o repetir tres o más veces el mismo carácter.
#### MÉTODO CHECK
**Tipo**

function
#### PROPIEDAD CHECK
**Descripción**

Permite comprobar la seguridad de la contraseña. Puede definir la longitud mínima y el número mínimo de mayúsculas, minúsculas, números y caracteres especiales para enviar / guardar la contraseña. Además, puede definir los colores utilizados para indicar cuándo la contraseña es correcta y cuándo no.
**Ejemplos**
```javascript
<script>
	function check(){
		Password.check({
			target: this.id,
			colorok: 'rgba(255,255,255,0.75)',
			colornok: '#A12123'
		});
	}
</script>

<input	id="pwd"
	name="pwd"
	type="password"
	value=""
	placeholder="Contraseña"
	onkeyup="check();" />
```
#### MÉTODO DRAW
**Tipo**

function
#### PROPIEDAD DRAW
**Descripción**

Permite llamar a la función de dibujar el gráfico de fortaleza para mostrarlo en un momento determinado.
**Ejemplos**
```javascript
Password.draw(Password.features.complexity);
```
#### MÉTODO GENERATE
**Tipo**

function
#### PROPIEDAD GENERATE
**Descripción**

Permite crear una contraseña aleatoria de una longitud concreta que cumpla los requisitos mínimos.
**Ejemplos**
```javascript
Password.generate(8);
```
#### MÉTODO GETERROR
**Tipo**

function
#### PROPIEDAD GETERROR
**Descripción**

Permite comprobar si se ha producido algún error de validación en el campo de texto asociado a la contraseña. Si la función setError está establecida, se enviará el resultado de la evaluación a la función asociada.
**Ejemplos**
```javascript
// Establecemos la configuración básica
Password.setError(showMessage);
Password.setTarget("pwd");
Password.setAutocheck();

// Definimos la función de callback para el Password
// Cada vez que pulsemos una tecla o se pulse el botón de "submit" se evaluará
function showMessage(e){
	if(e == "not_allowed"){
		console.log("La contraseña no es válida!");
	} else if(e == "empty"){
		console.log("El campo password está vacío!");
	} else if(!Password.sameLike(document.getElementById("confirm_password").value)){
		console.log("Las contraseñas son distintas!");
	}
});
```
#### MÉTODO ISEMPTY
**Tipo**

function
#### PROPIEDAD ISEMPTY
**Descripción**

Permite verificar si el valor introducido es una cadena vacía.
**Ejemplos**
```javascript
if(Password.isEmpty(document.getElementById("password").value)){
	console.log("La contraseña está vacía!");
}
```
#### MÉTODO SAMELIKE
**Tipo**

function
#### PROPIEDAD SAMELIKE
**Descripción**

Permite verificar si la contraseña es igual que el valor enviado por parámetro.
**Ejemplos**
```javascript
if(Password.sameLike(document.getElementById("confirm_password").value)){
	console.log("Contraseñas identicas!");
}
```
#### MÉTODO SETAUTOCHECK
**Tipo**

function
#### PROPIEDAD SETAUTOCHECK
**Descripción**

Permite establecer el control de los eventos de teclado y submit para poder gestionar la contraseña. Este método añade el evento keyup para el campo de texto asociado a la contraseña y el evento submit al formulario.
**Ejemplos**
```javascript
Password.setAutocheck();
```
#### MÉTODO SETAUTODRAW
**Tipo**

function
#### PROPIEDAD SETAUTODRAW
**Descripción**

Permite definir si se debe pintar el gráfico de fortaleza de la contraseña o no.
**Ejemplos**
```javascript
Password.setAutoDraw(false);
```
#### MÉTODO SETCOLORS
**Tipo**

function
#### PROPIEDAD SETCOLORS
**Descripción**

Permite definir los colores para personalizar el CSS asociado a la fortaleza de la contraseña.
**Ejemplos**
```javascript
Password.setColors("rgba(255,255,255,0.51)", "#00a55a");
```
#### MÉTODO SETERROR
**Tipo**

function
#### PROPIEDAD SETERROR
**Descripción**

Permite añadir una función de error personalizada.
**Ejemplos**
```javascript
Password.setError(showMessage);

function showMessage(e){
	if(e == "not_allowed"){
		console.log("La contraseña no es válida!");
	} else if(e == "empty"){
		console.log("El campo password está vacío!");
	} else if(!Password.sameLike(document.getElementById("confirm_password").value)){
		console.log("Las contraseñas son distintas!");
	}
});
```
#### MÉTODO SETMINIMALS
**Tipo**

function
#### PROPIEDAD SETMINIMALS
**Descripción**

Permite establecer los requerimientos mínimos de seguridad de las contraseñas. Es resultado de esta evaluación se devolverá en Password.allowed. Sólo si esta variable es igual a "true", el formulario se podrá enviar/guardar.
**Ejemplos**
```javascript
Password.setMinimals({
	length: 8,
	uppers:1,
	lowers: 1,
	numbers: 0,
	special: 0
});
```
#### MÉTODO SETTARGET
**Tipo**

function
#### PROPIEDAD SETTARGET
**Descripción**

Permite establecer elemento dónde inicializar la funcionalidad "Password" a través de su ID.
**Ejemplos**
```javascript
Password.setTarget("INPUT_ID");
```
#### INFORMACIÓN ADICIONAL
**Descripción**

Conocer la complejidad de la contraseña introducida:
**Ejemplos**
```javascript
Password.features.complexity;
```
**Descripción**

Saber si se cumplen los requisitos mínimos para poder enviar/guardar la contraseña:
**Ejemplos**
```javascript
Password.allowed;
```
**Descripción**

Conguración de estilos por defecto:
**Ejemplos**
```javascript
// Password crea estos estilos de manera automática, pero, se puede añadir a la hoja de estilos principal y modificarlos como se quieran.
.strength{
	width: 100%;
	height: 10px;
	position: absolute;
	bottom: -2px;
	left: 0;
	z-index: 99;
	padding: 2px 1px 1px 1px;
	border: 0 none;
	margin: 0 0 5px 0;
	display: none;
}
.strength::after{
	content: attr(data-label);
	display: block;
	position: absolute;
	left: 0;
	top: -5px;
	width: 100%;
	padding: 3px 5px 2px;
	font-size: 12px;
	line-height: 12px;
}
.strength > div{
	background: rgba(0,0,0,0.1);
	width: calc(16.667% - 4px);
	float: left;
	height: 6px;
	padding: 0;
	margin: 0px 2px;
	position: relative;
}
.strength[data-label] > div{
	display: none;
}
.strength > div.spotlight{
	background: lightblue;
}
input:focus ~ .strength{
	background: blue;
	display: block;
}
```
## Selectpicker


Selectpicker es un control de formulario que le permite gestionar una selección como un desplegable propio de HTRML5 y que proporciona una capa personalización sencilla de modificar.
#### MÉTODO INIT
**Tipo**

function
#### PROPIEDAD INIT
**Descripción**

Crea y establece los componentes de configuración y presentación para los desplegables solicitados.
**Ejemplos**
```javascript
Selectpicker.init(".select-picker");
```
#### PROPIEDAD TARGET
**Tipo**

string
**Descripción**

Si el método "init" recibe una cadena, esta cadena se tomará como patrón de destino. Si el método "init" recibe un objeto, el parámetro objetivo será el patrón para inicializar los desplegables.
**Ejemplos**
```javascript
//Forma sencilla :
Selectpicker.init(".select-picker");

// A través del parámetro target:
Selectpicker.init({ target: ".select-picker" });
```
#### PROPIEDAD LIVESEARCH
**Tipo**

boolean
**Descripción**

Enable search into dropdown.
**Ejemplos**
```javascript
Selectpicker.init({ target: ".select-picker", liveSearch: true });
```
#### INFORMACIÓN ADICIONAL
**Descripción**

Habilita la búsqueda dentro del desplegable:
**Ejemplos**
```javascript
// Supposed the next code:
<select id="months" name="months" class="select-picker" data-live-search="true">
	<option value="01">January</option>
	...
</select>

// Once set data-live-search to true into select, initialize
Selectpicker.init(".select-picker");
```
**Descripción**

Personaliza el aspecto del Selectpicker a través de CSS:
**Ejemplos**
```javascript
.select-picker{position: relative;width: 100%;}.select-picker .dropdown-container{list-style: none;background: #fff;border: 1px solid rgba(0,0,0,0.1);padding: 0;position: absolute;top: 53px;width: 100%;z-index: 99999;}.select-picker ul{overflow: auto;max-height: 164px;padding: 0;list-style: none;margin: 0;}.select-picker button{background: #f4f4f4;border: 1px solid rgba(0,0,0,0.1);width: 100%;height: 54px;text-align: left;line-height: 70px;font-weight: 500;}.select-picker button::before{content: "";display: inline-block;width: 0;height: 0;margin-left: 2px;vertical-align: middle;border-top: 4px dashed;border-right: 4px solid transparent;border-left: 4px solid transparent;position: absolute;right: 15px;top: 26px;}.select-picker button:hover{border-color: #adadad;}.select-picker.open button{background: #02a5a5;color: #ffffff;}.select-picker li{min-height: 36px;border-bottom: 1px solid rgba(0,0,0,0.1);padding: 4px 10px 0px 10px;line-height: 36px;}.select-picker li:not(.searcher):hover{background: #02A5A5;color: #fff;width: 100%;}.select-picker .searcher{position: relative;padding: 3px 40px 0 4px;min-height: 39px;border-bottom: 1px solid rgba(0,0,0,0.1);}.select-picker .searcher .input-search{line-height: 36px;height: 32px;padding-right: 26px;color: #fff;}.select-picker .search-icon::before{content: "";background: #ccc;width: 10px;height: 3px;position: absolute;border-radius: 100px;top: 21px;right: 6px;transform: rotate(40deg);}.select-picker .search-icon:after{content: "";width: 16px;height: 16px;border: 3px solid #ccc;border-radius: 100px;display: block;position: absolute;top: 8px;right: 12px;}.select-picker-active{background: #02a5a5;color: #fff;}
```
## SendForm


SendForm es un script para crear y enviar formularios en tiempo real a través de Ajax en modo POST. Es como si el formulario estuviese físicamente ya de antes y el usuario pulsase el botón de enviar.
#### PROPIEDAD URL
**Tipo**

string
**Descripción**

URL para realizar la petición.
**Ejemplos**
```javascript
new SendForm({
	url: "../pages/setProduct",
	params: [{
		"type": "text",
		"id": "idProduct",
		"value": "1"
	}]
});
```
#### PROPIEDAD PARAMS
**Tipo**

string
**Descripción**

Parámetros que se enviarán como parte del formulario.
**Ejemplos**
```javascript
new SendForm({
	url: "../pages/setProduct",
	params: [{
		"type": "text",
		"id": "idProduct",
		"value": "1"
	}]
});
```
#### INFORMACIÓN ADICIONAL
**Descripción**

Habilita la búsqueda dentro del desplegable:
**Ejemplos**
```javascript
// Supposed the next code:
<select id="months" name="months" class="select-picker" data-live-search="true">
	<option value="01">January</option>
	...
</select>

// Once set data-live-search to true into select, initialize
Selectpicker.init(".select-picker");
```
**Descripción**

Personaliza el aspecto del Selectpicker a través de CSS:
**Ejemplos**
```javascript
.select-picker{position: relative;width: 100%;}.select-picker .dropdown-container{list-style: none;background: #fff;border: 1px solid rgba(0,0,0,0.1);padding: 0;position: absolute;top: 53px;width: 100%;z-index: 99999;}.select-picker ul{overflow: auto;max-height: 164px;padding: 0;list-style: none;margin: 0;}.select-picker button{background: #f4f4f4;border: 1px solid rgba(0,0,0,0.1);width: 100%;height: 54px;text-align: left;line-height: 70px;font-weight: 500;}.select-picker button::before{content: "";display: inline-block;width: 0;height: 0;margin-left: 2px;vertical-align: middle;border-top: 4px dashed;border-right: 4px solid transparent;border-left: 4px solid transparent;position: absolute;right: 15px;top: 26px;}.select-picker button:hover{border-color: #adadad;}.select-picker.open button{background: #02a5a5;color: #ffffff;}.select-picker li{min-height: 36px;border-bottom: 1px solid rgba(0,0,0,0.1);padding: 4px 10px 0px 10px;line-height: 36px;}.select-picker li:not(.searcher):hover{background: #02A5A5;color: #fff;width: 100%;}.select-picker .searcher{position: relative;padding: 3px 40px 0 4px;min-height: 39px;border-bottom: 1px solid rgba(0,0,0,0.1);}.select-picker .searcher .input-search{line-height: 36px;height: 32px;padding-right: 26px;color: #fff;}.select-picker .search-icon::before{content: "";background: #ccc;width: 10px;height: 3px;position: absolute;border-radius: 100px;top: 21px;right: 6px;transform: rotate(40deg);}.select-picker .search-icon:after{content: "";width: 16px;height: 16px;border: 3px solid #ccc;border-radius: 100px;display: block;position: absolute;top: 8px;right: 12px;}.select-picker-active{background: #02a5a5;color: #fff;}
```
## StripTags


Función para limpiar de HTML una cadena proporcionada por parámetro. El segundo parámetro se puede usar para especificar las etiquetas que no deben ser eliminadas.
#### INFORMACIÓN ADICIONAL
**Descripción**

Limpiar de HTML un String
**Ejemplos**
```javascript
StripTags("<span>ejemplo de texto</span>", "");
// Resultado: ejemplo de texto

StripTags("<span>ejemplo <b>de</b> texto</span>", "<b>");
// Resultado: ejemplo <b>de</b> texto
```
## Treeview


Treeview es un componente de la interfaz gráfica de usuario que muestra una vista jerárquica de la información. Cada elemento puede tener cero, uno o más subelementos o hijos. Normalmente, se visualiza como una lista tabulada y cada elemento revela sus subelementos a través de un cambio de estado (de expandido a colapsado o viceversa).
#### PROPIEDAD CLASSLEAF
**Tipo**

string
**Descripción**

El parámetro "classLeaf" indica el nombre de clase que se aplicará a los nodos hoja (los de último nivel). Esta clase, por ejemplo, puede utilizarse para proporcionar un estilo diferente a este tipo de nodos. Por defecto está vacío.
**Ejemplos**
```javascript
new Treeview({data: treeviewJSON, target: "treeview", classLeaf: "leaf-node"});
```
#### PROPIEDAD COLLAPSEDICON
**Tipo**

string
**Descripción**

El parámetro "collapsedIcon" indica el carácter, el icono vectorial o el código html que se mostrará en lugar del "icono de colapsado" que refleja que la rama está cerrada de manera predeterminada. Si no se establece, por defecto es contendrá ►.
**Ejemplos**
```javascript
// Example with Vectorial icons
new Treeview({data: treeviewJSON, target: 'treeview', collapsedIcon: '<i class="plus"></i>'});
// Example with Unicode icons
new Treeview({data: treeviewJSON, target: "treeview", collapsedIcon: "+"});
```
#### PROPIEDAD EXPANDEDICON
**Tipo**

string
**Descripción**

El parámetro "expandedIcon" indica el carácter, el icono vectorial o el código html que se mostrará en lugar del "icono de expandido" que refleja que la rama está abierta de forma predeterminada. Si no se establece, Por defecto es ▼.
**Ejemplos**
```javascript
// Example with Vectorial icons
new Treeview({data: treeviewJSON, target: 'treeview', expandedIcon: '<i class="less"></i>'});
// Example with Unicode icons
new Treeview({data: treeviewJSON, target: "treeview", expandedIcon: "-"});
```
#### PROPIEDAD LEAFICON
**Tipo**

string
**Descripción**

El parámetro "leafIcon" indica el carácter, el icono vectorial o el código html que se mostrará en lugar del "icono de hoja" que refleja que, este nodo, no tiene más hijos. Si no se establece, por defecto está vacío.
**Ejemplos**
```javascript
// Example with Vectorial icons
new Treeview({data: treeviewJSON, target: 'treeview', leafIcon: '<i class="leaf"></i>'});
// Example with Unicode icons
new Treeview({data: treeviewJSON, target: "treeview", leafIcon: "\uD83D\uDE54"});
```
#### PROPIEDAD BRANCHICON
**Tipo**

string
**Descripción**

El parámetro "branchIcon" indica el carácter, el icono vectorial o el código html que se mostrará en lugar del "icono de rama" que refleja que este nodo tiene, al menos, un hijo. Si no se establece, por defecto está vacío.
**Ejemplos**
```javascript
// Example with Vectorial icons
new Treeview({data: treeviewJSON, target: 'treeview', branchIcon: '<i class="folder"></i>'});
// Example with Unicode icons
new Treeview({data: treeviewJSON, target: "treeview", branchIcon: "\uD83D\uDCC2"});
```
#### PROPIEDAD CUSTOMCHECK
**Tipo**

string
**Descripción**

Cadena HTML con la nueva definición del checkbox. Por defecto está vacío (deshabilitado).
**Ejemplos**
```javascript
new Treeview({
	data: treeviewJSON,
	target: "treeview",
	customCheck: "<label>Two<input type='checkbox'><span class='checkmark'></span></label>"
});
```
#### PROPIEDAD DATA
**Tipo**

object
**Descripción**

Es un objeto con los elementos a tratar. Este objeto debe estar en formato JSON.
**Ejemplos**
```javascript
//Example JSON to send to Treeview component.
var treeviewJSON = {
	items: [{
		id: 1,
		label: "Parent 1",
		expanded: true,
		children: [{
			id: 2,
			label : "Element 1",
			children : [
				{ id: 3, label: "Child 1 of Element 1", href: "#"},
				{ id: 4, label: "Child 2 of Element 1", href: "#"},
			]
		},
		{
			id: 5,
			label : "Element 2",
			children : [
				{ id: 6, label: "Child 1 of Element 2", href: "#"},
				{ id: 7, label: "Child 2 of Element 2", href: "#"},
			]
		}]
	}]
}
new Treeview({data: treeviewJSON, target: "treeview"});
```
#### MÉTODO ONSELECTNODE
**Tipo**

function
#### PROPIEDAD ONSELECTNODE
**Descripción**

El parámetro "onSelectNode" indica la función de devolución de llamada cuando se selecciona un nodo. Por defecto, esta funcionalidad está deshabilitada.
**Ejemplos**
```javascript
new Treeview({data: treeviewJSON, target: "treeview", onSelectNode: callback});
function callback(e){
	console.log(e);
}
```
#### MÉTODO ONCHECKNODE
**Tipo**

function
#### PROPIEDAD ONCHECKNODE
**Descripción**

El parámetro "onCheckNode" indica la función de devolución de llamada cuando se chequea un nodo. Por defecto, esta funcionalidad está deshabilitada.
**Ejemplos**
```javascript
new Treeview({data: treeviewJSON, target: "treeview", onCheckNode: callback});
function callback(e){
	console.log(e);
}
```
#### PROPIEDAD SELECTABLE
**Tipo**

boolean
**Descripción**

El parámetro "selectable" indica si los nodos serán seleccionables. Por defecto es false.
**Ejemplos**
```javascript
new Treeview({data: treeviewJSON, target: "treeview", selectable: false});
```
#### PROPIEDAD SEARCHABLE
**Tipo**

boolean
**Descripción**

El parámetro "searchable" indica si el árbol permitirá la búsqueda de nodos. Por defecto es false.
**Ejemplos**
```javascript
new Treeview({data: treeviewJSON, target: "treeview", searchable: false});
```
#### PROPIEDAD PLACEHOLDERTEXT
**Tipo**

string
**Descripción**

El parámetro "placeholderText" indica el texto que se muestra dentro de la caja de texto cuando la búsqueda está habilitada (searchable es true). Por defecto es "Filter...".
**Ejemplos**
```javascript
new Treeview({data: treeviewJSON, target: "treeview", placeholderText: "Writing to filter inside the tree"});
```
#### PROPIEDAD STYLES
**Tipo**

object
**Descripción**

El parámetro "styles" indica los estilos básicos que deben mostrarse en el componente de vista de árbol. Este objeto permitirá los siguientes subparámetros:
* bgTree: fondo del árbol. Por defecto es transparent.
* borderTree : Borde del árbol. Por defecto es rgba (0,0,0,0.15).
* textColor: color del texto de los nodos. Por defecto es #000000.
* searchColor: color de texto para la entrada de la búsqueda. Por defecto es #000000.
* searchBg: color de fondo para la entrada de la búsqueda. Por defecto es #f0f0f0.
* activeColor: color del texto del nodo seleccionado. De forma predeterminada es #ffffff.
* activeBg: color de fondo del nodo seleccionado. Por defecto es #000000.
* linkColor: color de texto para nodos con enlace. Por defecto es #006699.
* linkBg: color de fondo para los nodos con enlace. Por defecto es transparent.
**Ejemplos**
```javascript
new Treeview({
	data: treeviewJSON,
	target: "treeview",
	selectable: true,
	styles: {
		bgTree: "#ffffff",
		borderTree: "rgba(0,0,0,0.15)",
		textColor: "#000",
		searchColor: "#000",
		searchBg: "#fff",
		activeColor: "#333",
		activeBg: "lightgray",
		linkColor: "#009966",
		linkBg: "rgba(0,0,0,0)"
	}
});
```
#### PROPIEDAD TARGET
**Tipo**

string
**Descripción**

ID del elemento donde se implementará el componente Treeview. Este ID debe pertenecer a una etiqueta UL de HTML.
**Ejemplos**
```javascript
new Treeview({data: treeviewJSON, target: "treeview"});
```
#### PROPIEDAD CHECKED
**Tipo**

boolean
**Descripción**

El parámetro "verified" indica al componente Treeview que el nodo debería cambiar su estado. Esta funcionalidad necesita un ID para seleccionar el elemento a verificar.
**Ejemplos**
```javascript
// ULItem is the ID from HTML element where treeview is implemented
for(var i = 0; i < 20; i++){
	document.ULItem.Treeview({id; i, checked: true});
}
```
#### MÉTODO REFRESH
**Tipo**

function
#### PROPIEDAD REFRESH
**Descripción**

El parámetro "refresh" indica que el componente de vista de árbol debe volver a cargarse.
**Ejemplos**
```javascript
var treeviewJSON = {
	items: [{
		id: 1,
		label: "Parent 1",
		children: [{
			id: 2,
			label : "Element 1",
			children : [
				{ id: 3, label: "Child 1 of Element 1", href: "#"},
				{ id: 4, label: "Child 2 of Element 1", href: "#"},
			]
		},
		{
			id: 5,
			label : "Element 2",
			children : [
				{ id: 6, label: "Child 1 of Element 2", href: "#"},
				{ id: 7, label: "Child 2 of Element 2", href: "#"},
			]
		}]
	}]
};
// ULItem is the ID from HTML element where Treeview is implemented
document.ULItem.Treeview({data: treeviewJSON, refresh: true})
```
#### INFORMACIÓN ADICIONAL
**Descripción**

Personalizar los estilos a través de las reglas CSS. Por ejemplo:
**Ejemplos**
```javascript
// styles.css (from your site)
ul.treeview li .active  { 
	background: lightgray; 
	color: rgb(51, 51, 51); 
}

ul.treeview li.search-box input  { 
	width: 100%; 
	background: rgb(255, 255, 255); 
	color: rgb(0, 0, 0); 
	border: 1px solid rgba(0, 0, 0, 0.1); 
}

ul.treeview li i.icon  { 
	margin-right: 8px; 
}

ul.treeview li span  { 
	padding: 2px 5px; 
	display: inline-block; 
}

ul.treeview li a  { 
	color: rgb(0, 153, 102); 
	background: rgba(0, 0, 0, 0); 
}

ul.treeview li.collapsed ul  { 
	max-height: 0px; 
}

ul.treeview li ul  { 
	transition: all 0.3s ease 0s; 
	max-height: 10000px; 
	overflow: hidden; 
}

ul.treeview li i  { 
	cursor: pointer; 
}

ul.treeview li  { 
	color: rgb(0, 0, 0); 
}

ul.treeview, ul.treeview ul  { 
	list-style: none; 
}

ul.treeview  { 
	background: rgb(255, 255, 255); 
	width: 100%; 
	border: 1px solid rgba(0, 0, 0, 0.15); 
	padding: 5px; 
}
```
## Validator


Este script establece mensajes de validez personalizados para un elemento de entrada de datos de formulario. Recordar que, para HTML5, un mensaje de validación vacío significa que la entrada de datos es correcta.
#### MÉTODO SET
**Tipo**

function
#### PROPIEDAD SET
**Descripción**

El método "set" indica a Validator que se desea aplicar una restricción predefinida a un input o campo de entrada de datos. Por lo general, estas restricciones son: patternMismatch, rangeOverflow, rangeUnderflow, stepMismatch, "=", "!=", "<", ">", ">=" and "<=".
**Ejemplos**
```javascript
// Permitir sólo números igual o menores a 100
Validator.set({
	target: "percent",
	constraint: "<=100",
	message: "Por favor, el número debe ser igual o menor a 100",
	required: true
});

// Permitir sólo "Spain"
Validator.set({
	target: "country",
	constraint: "=='Spain'",
	message: "La palabra correcta es Spain",
	fixed: true,
	required: true
});

// Permitir sólo una lista de valores
var arraySex = ["man", "woman", "other"];
Validator.set({
	target: "sex",
	constraint: "arraySex.indexOf(this.value) != -1",
	message: "Los posibles valores son: man, woman, other"
});

// Permitir sólo un rango de valores
document.getElementById("range").setAttribute("type", "number");
document.getElementById("range").setAttribute("min", 50);
document.getElementById("range").setAttribute("max", 100);
Validator.set({
	target: "range",
	fixed: true,
	constraint: "!this.validity.rangeOverflow && !this.validity.rangeUnderflow",
	message: "Los posibles valores son entre 50 y 100"
});

// Validación de la contraseña con, al menos, una letra mayúscula, una letra minúscula,
// un dígito, un carácter especial y con un mínimo de ocho en longitud.
Validator.set({
	target: "pwd",
	fixed: true,
	required: true,
	constraint: "!this.validity.patternMismatch",
	message: "La contraseña no coincide con el formato especificado",
	pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
});
```
#### MÉTODO FILESET
**Tipo**

function
#### PROPIEDAD FILESET
**Descripción**

Define las restricciones que deben tener las entradas del archivo. Esta funcionalidad se alimenta de un objeto JSON que admite:
	 ● accept: es una cadena que define, separados por comas, los tipos de archivos que debe aceptar la entrada del archivo. De forma predeterminada, está vacío.
	 ● preview: Habilita la vista previa del archivo. Por defecto, es false.
	 ● size: Limitar (en KB) el tamaño del archivo que se va a cargar. De forma predeterminada, es 0, que indica que no tiene límite.
	 ● message: mensaje que se muestra cuando la entrada del archivo no es válida.
**Ejemplos**
```javascript
// Permitir solo tipos de archivos de Word
Validator.fileset({
	target: "file",
	accept: ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	message: "Los archivos permitidos son todos los formatos de Word!"
});

// Habilitar la vista previa dentro del contenedor de miniaturas
Validator.fileset({target: "file", preview: true});

// Limitar el tamaño de los archivos de imagen a 100KB.
Validator.fileset({target: "file", maxsize: 100, accept: "image/*", message: "El tamaño de la imagen debe ser menor a 100 KB"});
```
#### PROPIEDAD FIXED
**Tipo**

boolean
**Descripción**

Esta propiedad le indica al Validador que los mensajes deben mostrarse debajo del campo de entrada.
**Ejemplos**
```javascript
// Limitar el tamaño de los archivos jpeg a 250 KB y mostrar el mensaje bajo el input
Validator.fileset({
	target: "file",
	fixed: true,
	maxsize: 250,
	accept: ".jpg,.jpeg",
	message: "El tamaño del archivo debería ser menor a 250 KB"
});
```
#### MÉTODO NEWVALIDATION
**Tipo**

function
#### PROPIEDAD NEWVALIDATION
**Descripción**

Definir validaciones personalizadas a través de código JavaScript.
**Ejemplos**
```javascript
Validator.target = document.getElementById("checkbox");
Validator.newValidation("input", "\
	if (!this.checked) {\
		e.target.setCustomValidity("Must be checked!");\
		e.target.classList.add("validator-error")\
		Validator.addMessage(e.target);\
	} else {\
		e.target.setCustomValidity("");\
		e.target.classList.remove("validator-error");\
		e.target.nextElementSibling.remove();\
	}\
");
```
#### MÉTODO ONINVALID
**Tipo**

function
#### PROPIEDAD ONINVALID
**Descripción**

Función de devolución de llamada cuando cuando se produzca un error de validación.
**Ejemplos**
```javascript
Validator.target = document.getElementById("inputRequired");
Validator.onInvalid("this.classList.add('validator-error')")
```
#### INFORMACIÓN ADICIONAL
**Descripción**

Personalizar la clase de validator-error y validator-error-msg a través de estilos CSS.
**Ejemplos**
```javascript
// Personalizar el estilo del input
.validator-error { 
	box-shadow: 0 0 0 2px #f00 inset; 
}

//Personalizar el color del mensaje de validación
.validator-error-msg { 
	background: rgba(255,0,0,0.1); 
	width: 100%; 
	display: block; 
	padding: 5px; 
	border: 1px solid rgba(255,0,0,0.2); 
}
```
