var WikiHelper = {}

WikiHelper.Each = {
	general: {
		version: '1.0',
		intern: true,
		name: 'each',
		help: 1,
		description: 'Permite recorrer todos los elementos devueltos por isiTools y asignarle propiedades, comportamientos o eventos.',
		example: '// Mostrar el índice/posición de los elementos selecciondos y añadirles la clase "focused"\n\
it("input, textarea, select").each(function(index){\n\
	console.log("índice", index)\n\
	this.classList.toggle("focused")\n\
});\n\
\n\
// Añadirles, a los elementos selecciondos, un evento click que muestre un mensaje por consola y les establezca un estilo en línea con una opacidad del 50%\n\
it("input").each({\n\
	style: "opacity: 0.5",\n\
	onclick: function(e){\n\
		console.log(e, "recibió el foco")\n\
	}\n\
});',
	},
}

WikiHelper.First = {
	general: {
		version: '1.0',
		intern: true,
		name: 'first',
		help: 1,
		description: 'Devuelve el primer elemento de los elementos recuperados por la función constructora.',
		example: 'it("input").first();',
	},
}

WikiHelper.Formateddate = {
	general: {
		version: '1.0',
		intern: true,
		name: 'formatedDate',
		help: 1,
		description: 'Devuelve la fecha formateada en base al formato y valor enviados. El primer parámtero se corresponde con el formato, que puede ser un código BCP-47 como (en-US, en-GB ó es-PA) y el segundo es el valor de fecha a formatear. Ambos parámetros son opcionales.\n\
\t\u2022 Si el primer parámetro es omitido o es vacío, se devolverá en formato Little Endian (DD-MM-YYYY).\n\
\t\u2022 Si el segundo parámetro es omitido, se tomará como valor la fecha actual.',
		example: '// Fecha actual en Big Endian\n\
it.formatedDate("yyyy-mm-dd")\n\
// Devolverá 2021-03-06\n\
\n\
// Fecha actual en Medium Endian\n\
it.formatedDate("mm-dd-yyyy")\n\
// Devolverá 03-06-2021\n\
\n\
// Fecha actual en Little Endian\n\
it.formatedDate("dd-mm-yyyy")\n\
// Devolverá 03-06-2021\n\
\n\
// Fecha actual BCP 47\n\
it.formatedDate("ru-RU")\n\
// Devolverá 06.03.2021',
	},
}

WikiHelper.Get = {
	general: {
		version: '1.0',
		intern: true,
		name: 'get',
		help: 1,
		description: 'Recuperar el enésimo elemento devuelto por la función constructora it().\n\
	Si el valor del parámetro no está establecido, o es 0, se devolverá el primer elemento.\n\
	Si el valor del parámetro es mayor que 0, se devolverá el elemento referenciado por la posición indicada.',
		example: '// El siguiente ejemplo devuelve el elemento body de la página. Equivalente a hacer un document.querySelector("body");\n\
it("body").get();\n\
\n\
// Recuperar el primer elemento que tenga la clase "hasDatePicker"\n\
it(".hasDatePicker").get(0);\n\
\n\
// Recuperar ele elemento referenciado por $0"\n\
it($0).get(0);\n\
\n\
// Recuperar el primer TD que descienda de TABLE"\n\
it("td", "table").get(0);\n\
\n\
// Recuperar el primer elemento que descienda de otro elemento referenciado por una variable previa\n\
var aux = document.body;\n\
it(".hasDatePicker", aux).get(0);\n\
\n\
// Recuperar el tercer elemento que tenga la clase "form-input"\n\
it(".form-input").get(2);',
	},
}

WikiHelper.Gettextwidth = {
	general: {
		version: '1.0',
		intern: true,
		name: 'getTextWidth',
		help: 1,
		description: 'Función para calcular el ancho de un elemento en base a un texto dado.\n\
	Se alimenta de los parámetros "obj", "fontFamily" y "fontSize". No obstante, los dos últimos son opcionales.\n\
	Si los parámetros "fontFamily" y "fontSize" se omiten, se recuperará del elemento referenciado por el parámetro "obj".\n\
	Si el valor del parámetro es mayor que 0, se devolverá el elemento referenciado por la posición indicada.',
		example: '// Longitud en pixels de la cadena "Contenido textual" cen Arial a 13 píxeles de tamaño y con un padding de 10 píxeles\n\
it.getTextWidth("Contenido textual", "Arial", "13px", 10);\n\
\n\
// Longitud en píxeles del texto contenido en el elemento con ID establecido a "name". En el siguiente ejemplo, se supone que el elemento "name" es un elemento de formulario o contiene un texto\n\
it.getTextWidth(document.getElementById("name"));\n\
\n\
// Longitud en píxeles del texto contenido en el elemento previamente seleccionado desde la consola del navegador\n\
it.getTextWidth($0, "Open Sans", "13px");\n\
\n\
// Longitud en píxeles del texto más largo contenido en el elemento SELECT previamente seleccionado desde la consola del navegador\n\
it.getTextWidth(Array.prototype.slice.call($0.querySelectorAll("option"), 0));',
	},
}


WikiHelper.Hextorgba = {
	general: {
		version: '1.0',
		intern: true,
		name: 'hexToRGBA',
		help: 1,
		description: 'Convierte un color en formato hexadecimal en un valor RGB con canal alfa personalizable.\n\
	Si el valor del segundo parámetro no está establecido se devolverá con un valor de alfa igual a 1, es decir, totalmente opaco. \n\
	En cualquier otro caso el valor de la opacidad será establecida a partir de un valor comprendido entre 0 y 1, donde 0 es totalmente transparente y 1 es totalmente opaco.',
		example: '// Convertir el color correspondiente a #000 en formato RGBA sin transparencia alguna\n\
it.hexToRGBA("#000");\n\
\n\
// Convertir el color correspondiente a #FF0000 en formato RGBA con una transparecia al 50%\n\
it.hexToRGBA("#FF0000", 0.5);\n\
\n\
// Devolver el valor correspondiente al negro totalmente transparente\n\
it.hexToRGBA("#000", 0);',
	},
}

WikiHelper.Last = {
	general: {
		version: '1.0',
		intern: true,
		name: 'last',
		help: 1,
		description: 'Devuelve el último elemento de los elementos recuperados por la función constructora.',
		example: 'it("input").last();',
	},
}

WikiHelper.Leftpad = {
	general: {
		version: '1.0',
		intern: true,
		name: 'leftPad',
		help: 1,
		description: 'Permite añadir ceros por la izquierda a valores numéricos.\nSe alimenta de un único parámetro que indica el número de ceros a añadir si el número no tiene la longitud indicada.\n\
<name><bool>NOTA</bool>: Aunque este pequeño componente lo define isiTools, está disponible desde el objeto String o Number para mayor facilidad de uso y aprendizaje.',
		example: '// Devolver 0012 desde un valor de tipo cadena.\n\
"12".leftPad(4);\n\
// Devolver 0012 desde un valor de tipo número.\n\
(12).leftPad(4);',
	},
}

WikiHelper.Parents = {
	general: {
		version: '1.0',
		intern: true,
		name: 'parents',
		help: 1,
		description: 'Devuelve el elemento padre establecido por su nombre de etiqueta o, en su defecto, todos los padres del elemento recuperado por la función constructora.',
		example: '// Devolver el elemento TABLE de un TD previamente seleccionado por la variable $0.\n\
it($0).parents("table");\n\
// Su resultado podría ser algo como:\n\
<name>&lt;table <field>class=</field><str>"cebrada"</str>></name><name>&lt;/table></name>\n\
\n\
// Devolver el elemento padre con clase "container" del elemento de formulario con ID "municipio".\n\
it("#municipio").parents(".container");\n\
\n\
// Devolver el elemento padre con clase ".dialog.displayed" del primer input de la página.\n\
it("input").parents(".dialog.displayed");\n\
\n\
// Devolver todos los padres de un elemento dado en un array.\n\
it($0).parents();\n\
// Su resultado podría ser algo como:\n\
<func>[<name>tr</name>, <name>thead</name>, <name>table</name>, <name>section</name>, <name>main</name>, <name>body</name>, <name>html</name>]</func>',
	},
}

WikiHelper.Scrollto = {
	general: {
		version: '1.0',
		intern: true,
		name: 'scrollTo',
		help: 1,
		description: 'Función para mover el scroll vertical de un determinado elemento hasta una posición determinada.',
		example: '// Mover la barra de desplazamiento de la página hasta la posición 100\n\
it("body").scrollTo(100);\n\
\n\
// Mover la barra de desplazamiento un elemento FIELDSET ubicado en el BODY\n\
iit(document.querySelector("fieldset")).scrollTo(56);',
	},
}

WikiHelper.Simulateevent = {
	general: {
		version: '1.1',
		intern: true,
		name: 'simulateEvent',
		help: 1,
		description: 'Simula un evento como si fuese lanzado por el usuario.\nSe alimenta de dos parámetros. El primero es el evento a simular. El segundo, el elemento dónde disparar dicho evento',
		example: '// Lanzar el evento CHANGE en el primer elemento INPUT que se encuentre en la página.\n\
it.simulateEvent("change", it("input").get());\n\
\n\
// Lanzar el evento INPUT en el segundo elemento INPUT de tipo texto que se encuentre en la página.\n\
it.simulateEvent("input", it("input[type=text]").get(1));\n\
\n\
// Lanzar el evento CLICK en el elemento con ID switch1.\n\
it.simulateEvent("click", document.getElementId("#switch1"));\n\
\n\
// Lanzar la pulsación de la tecla "1" bajo el evento KEYUP para el elemento con ID elemento1.\n\
// <b>NOTA</b>: Para los eventos de tipo KEYPRESS, KEYDOWN y KEYUP el número de parámetros solicitados son 3, en vez de dos\n\
it.simulateEvent("keyup", "1", it("#elemento1").get());\n\
\n\
// Lanzar la pulsación de la tecla "a" bajo el evento KEYDOWN para todos los elementos con clase text.\n\
// <b>NOTA</b>: Para los eventos de tipo KEYPRESS, KEYDOWN y KEYUP el número de parámetros solicitados son 3, en vez de dos\n\
var items = it(".text").targets;\n\
for(var i = 0; i < items.length; i++){\n\
	it.simulateEvent("keydown", "a", items[i]);\n\
}',
	},
}

WikiHelper.Ucwords = {
	general: {
		version: '1.0',
		intern: true,
		name: 'ucwords',
		help: 1,
		description: 'Convierte el primer carácter de un texto a mayúscula y, el resto, minúsculas.',
		example: '// Convertir todas las palabras a Upper Camel Case, es decir, la primera a mayúscula y, el resto, minúsculas.\n\
it.ucwords("framework de isiTools");\n\
// Convertir el texto como si fuese una frase.\n\
it.ucwords("framework de isiTools", false);',
	},
}

/**
   AddCSSRule Helper						
   @version: 1.10
   @author: Pablo E. Fernández (islavisual@gmail.com).
   @Copyright 2017-2021 Islavisual.
   @Last update: 08/04/2021
 **/
WikiHelper.Addcssrule = {
	general: {
		version: '1.1',
		name: 'AddCSSRule',
		help: 1,
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


/**
   Alert Helper						
   @version: 1.6.3
   @author: Pablo E. Fernández (islavisual@gmail.com).
   @Copyright 2017-2021 Islavisual.
   @Last update: 08/04/2021
 **/
WikiHelper.Alert = {
	general: {
		version: "1.6.3",
		name: 'Alert',
		description: "Este componente permite crear alertas y diálogos de forma rápida y eficiente. Entre otras cosas permite la creación de alertas o diálogos a partir de un HTML externo, a través de una cadena de texto o a través del contenido de otro elemento HTML dentro del mismo contexto. Además, permite que sean arrastrables y fácilmente personalizables.\n\
<name><bool>NOTA</bool>: Si se desean consultar las recomendaciones sobre la accesibilidad y los diálogos modales, se puede visitar la URL https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html</name>",
	},
	additional: [
		{
			description: 'Personalizar los estilos a través de las reglas CSS. Por ejemplo:',
			example: '_CSS_\n\
// Reglas CSS a incluir en tu hoja de estilos\n\
.it-alert-overlay { position: fixed; background: rgba(0, 0, 0, 0.4); width: 100%; height: 100%; left: 0px; top: 0px; display: block; z-index: 999999; }\n\
.it-alert { display: block; max-width: 360px; margin: 100px auto 0px; background-color: rgba(255, 255, 255, 1); border: 1px solid rgba(0, 0, 0, 0.75); overflow: hidden; color: rgba(36, 84, 156, 1); }\n\
.it-alert header { padding: 10px 8px; background-color: rgba(0, 0, 0, 1); border-bottom: 1px solid rgba(0, 0, 0, 0.1); color: rgba(255, 255, 255, 1); }\n\
.it-alert header h3 { font-size: 14px; margin: 0px; color: rgba(255, 255, 255, 1); display: inline-block; }\n\
.it-alert header .close-btn { float: right; color: rgba(255, 255, 255, 1); cursor: pointer; position: relative; top: -5px; left: 0px; font-size: 21px; padding: 0px; }\n\
.it-alert .it-alert-body { background-color: rgba(255, 255, 255, 1); color: rgba(0, 0, 0, 1); display: inline-block; width: 100%; padding: 10px; min-height: 100px; max-height: 60vh; overflow: auto; font-weight: 600; }\n\
.it-alert footer { position: relative; top: 5px; padding: 10px 10px 8px; height: auto; display: inline-block; width: 100%; margin: 0px; }\n\
.it-alert footer button { background: rgba(255, 255, 255, 1); color: rgba(36, 84, 156, 1); border: 1px solid rgba(0, 0, 0, 1); padding: 3px 5px; }\n\
.it-alert footer button:focus { background: rgba(36, 84, 156, 1); color: rgba(255, 255, 255, 1); border: 1px solid rgba(0, 0, 0, 1); }\n\
_CSS_'
		}
	],
	theme: {
		type: 'string',
		description: 'Tema por defecto a utilizar.',
		example: 'new Alert({title: "Precaución!", body:"El campo se encuentra vacío.", theme: "dark"});'
	},
	class: {
		type: 'string',
		description: 'Agrega una regla de CSS a la alerta. Esto es útil si se desean definir alertas personalizadas a través de selectores CSS, por ejemplo.',
		example: 'new Alert({title: "Precaución!", body:"El campo se encuentra vacío.", class: "warning"});'
	},
	draggable: {
		type: 'boolean',
		description: 'Indica si la alert o diálogo será arrastable dentro de la página. Por defecto, su valor es <str>false</str>.',
		example: 'new Alert({title: "Precaución!", body:"El campo se encuentra vacío.", draggable: true});'
	},
	title: {
		type: 'string',
		description: 'Título de la alerta.',
		example: 'new Alert({title: "Precaución!", body:"El campo se encuentra vacío."});'
	},
	onshow: {
		type: 'function',
		description: 'Título de la alerta.',
		example: 'new Alert({\n\
	title: "Precaución!",\n\
	body:"El campo se encuentra vacío.",\n\
	onshow: function(){\n\
		document.querySelector(".Alert header").style.background="red";\n\
	}\n\
});'
	},
	onhide: {
		type: 'function',
		description: 'Título de la alerta.',
		example: 'new Alert({\n\
	title: "Precaución!",\n\
	body:"El campo se encuentra vacío.",\n\
	onhide: function(){\n\
		console.log("Alerta ocultada!");\n\
	}\n\
})'
	},
	body: {
		type: 'string',
		description: 'Representa el contenido de la alerta o diálogo. Puede contener texto plano, texto HTML o la función url() de CSS.',
		example: '// Alerta sencilla\n\
Alert("El campo se encuentra vacío.");\n\n\
// Alerta personalizada\n\
new Alert({title: "Precaución!", body:"El campo se encuentra vacío."});\n\n\
// Alerta con HTML incrustado\n\
new Alert({title: "Precaución!", body:"&lt;span>Esto es una prueba&lt;/span> of &lt;b style=\'color: red\'>Alerta!&lt;/b>."});\n\n\
// Alerta con contenido a través de otro elemento\n\
new Alert({title: "Precaución!", body: document.querySelector("custom-dialog").innerHTML});\n\n\
// Alerta con contenido cargado a través de URL\n\
new Alert({title: "Precaución!", body:"url(./templates/dialog.html)"});'
	},
	ajaxmethod: {
		type: 'string',
		description: 'Indica el tipo de llamada al servidor cuando el cuerpo de la alerta se recupera a través de una URL.',
		example: 'new Alert({title: "Precaución!", body:"url(./templates/dialog.html)", ajaxmethod: "post"});'
	},
	actions: {
		type: 'object',
		description: 'Personaliza las acciones de una alerta. Este parámetro debe contener una estructura tipo objeto con dos campos, <property>accept</property> y <property>cancel</property>.\nLos campos pueden estar compuestos por los atributos <property>enabled</property>, <property>class</property>, <property>alignment</property>, <property>text</property> y <property>callback</property>.<br/><br/>\n\
El parámetro <property>callback</property> es una función que recibe todos los elementos que tengan establecidos los atributos ID, NAME o CONTENTEDITABLE. Por ejemplo, si el componente Alert solicita un correo electrónico, cuando se pulse cualquiera de los botones se envirá un JSON con los datos y atributos del elemento solicitado. A continuación se muestra un ejemplo que visualiza por consola el contenido de este JSON devuelto.',
		example: 'new Alert({\n\
	title: "Introduzca un código!",\n\
	body:\'&lt;label for="data">Operación de venta&lt;input type="text" id="data" />&lt;/label>&lt;script>(function(){it("#data").mask("99999")})()&lt;/script>\',\n\
	actions:{\n\
		accept: {\n\
			enabled: true,\n\
			text: "Accept",\n\
			class: "btn accept",\n\
			alignment: "right",\n\
			callback: alertAccepted\n\
		},\n\
		cancel: {\n\
			enabled: true,\n\
			text: "Cancel",\n\
			class: "btn cancel",\n\
			alignment: "left",\n\
			callback: function(e){\n\
				console.log(e)\n\
			}\n\
		}\n\
	}\n\
});\n\
\n\
function alertAccepted(data){\n\
	console.log(data)\n\
}\n\
// Cuando el usuario pulse en el botón de aceptar, se mostrará por la consola algo similar a la siguiente estructura:\n\
// {\n\
// 	general:{\n\
// 		accepted: true\n\
// 		title: "Introduzca un código!"\n\
// 	}\n\
// 	elements: [\n\
// 		{\n\
// 			id: "data"\n\
// 			maxlength: "18"\n\
// 			minlength: "18"\n\
// 			placeholder: "99999"\n\
// 			type: "text"\n\
// 			value: "28012"\n\
// 		}\n\
// 	]\n\
// }\n\
\n\
<field>Como caso especial, es posible asignar la acción del botón aceptar con el atributo <property>callback</property> en el mismo nivel que <property>title</property> o <property>body</property>:</field>\n\
new Alert({\n\
	title: "Atención",\n\
	body:"Fichero " + files[0].name + " cargado!!",\n\
	callback: function(e){\n\
		console.log(e)\n\
	}\n\
});'
	},
	addtocallback: {
		type: 'object',
		description: 'Permite agregar elementos y/o valores a la devolución de llamada asociada a la acción de aceptar o de cancelar.',
		example: 'new Alert({\n\
	title: "Precaución!",\n\
	body: "El campo se encuentra vacío.",\n\
	title: {\n\
		background: "#f0f0f0",\n\
		color: "#2f2f2f",\n\
		extra: ""\n\
	},\n\
	body: {\n\
		background: "#fff",\n\
		color: "#000",\n\
		extra: ""\n\
	},\n\
	actions:{\n\
		accept: {\n\
			enabled: true,\n\
			text: "Accept",\n\
			class: "btn btn-primary",\n\
			alignment: "right",\n\
			callback: function(e){\n\
				console.log(e)\n\
			},\n\
			addtocallback: {\n\
				el0: "Botón pulsado!!",\n\
				el1: document.querySelector("#inputID")\n\
			}\n\
		},\n\
		cancel: {\n\
			enabled: true,\n\
			text: "Cancel",\n\
			class: "btn btn-secondary",\n\
			alignment: "left",\n\
			callback: function(e){\n\
				console.log(e)\n\
			}\n\
		}\n\
	}\n\
});\n\
\n\
function alertAccepted(data){\n\
	console.log(data)\n\
}\n\
// Cuando el usuario pulse en el botón de aceptar, por consola algo similar a:\n\
// {\n\
// 	general:{\n\
// 		accepted: true\n\
// 		title: "Precaución!"\n\
// 	}\n\
// 	elements: [\n\
// 		{\n\
// 			arg: "Botón pulsado!!"\n\
// 		},\n\
// 		{\n\
// 			_id: "el"\n\
// 			id: "el"\n\
// 			node: input#inputID\n\
// 		}\n\
// 	]\n\
// }'
	},
	styles: {
		type: 'object',
		description: 'Personaliza los estilos de las alertas a través de JavaScript. Este parámetro debe contener una estructura tipo objeto con los campos "title", "body" y "actions".\nTodos los campos pueden estar compuestos por los atributos "background", "color" y "extra".\n<ul><li><b>background</b>: Establece el color del fondo</li><li><b>color</b>: Establece el color del texto</li><li><b>extra</b>: Establece otras propiedades CSS.</li></ul>',
		example: '// Ejemplo de mensaje de alerta sin botón cancelar\n\
new Alert({\n\
	title: "Precaución!",\n\
	body: "El campo se encuentra vacío.",\n\
	styles:{\n\
		title: {\n\
			background: "#f0f0f0",\n\
			color: "#2f2f2f",\n\
			extra: ""\n\
		},\n\
		body: {\n\
			background: "#fff",\n\
			color: "#000",\n\
			extra: ""\n\
		},\n\
		actions: {\n\
			accept: {\n\
				background: "#e0e0e0",\n\
				color: "#000",\n\
				extra: "padding:15px"\n\
			}\n\
		}\n\
	}\n\
});'
	},
	stylesheet:{
		type: 'boolean',
		description: 'Indica al componente si las reglas CSS necesarias para su utilización están en una hoja de estilos aparte. Por defecto, su valor es <property>false</property>, lo que significa que el componente añadirá todas las reglas CSS necesarias durante el proceso de carga, pero, que podrán ser sobreescritas por otras reglas CSS con igual selector dentro de las hojas de estilo definidas en la actual página web.',
		example: 'new Alert({\n\
	title: "Precaución!",\n\
	body:"El campo se encuentra vacío.",\n\
	onshow: function(){\n\
		document.querySelector(".Alert header").style.background="red";\n\
	},\n\
	stylesheet: true\n\
});'
	}
}

/**
   Autocomplete Helper
   @version: 1.5.1
   @author: Pablo E. Fernández (islavisual@gmail.com).
   @Copyright 2017-2021 Islavisual.
   @Last update: 08/04/2021
 **/

WikiHelper.Autocomplete = {
	general: {
		version: '1.6',
		name: 'Autocomplete',
		help: 1,
		description: 'Este componente podría considerarse una mejora del componente "select" que proporciona HTML. Permite buscar y seleccionar de una lista de valores previamente rellenada a medida que se escribe, aprovechando la búsqueda y el filtrado.\n\n\
Tambien permite realizar búsquedas mediante caracteres comodin como son las comillas dobles, el símbolo más o el símbolo asterisco.\n\
\n\
Para entender mejor el significado de los caracteres comodín, supóngase que se tiene un array con los siguientes datos <code style="display: inline; padding: 0;">[<property>"Humanes de Madrid"</property>, <property>"Madrid"</property>, <property>"Rivas-Vaciamadrid"</property>, <property>"Rozas de Madrid, Las"</property>, <property>"Madridejos"</property>, <property>"Madridanos"</property>, <property>"Valmadrid"</property>]</code>\
<ul>\
<li><name>""</name>: Busca los resultados que coincidan exactamente con la cadena entrecomillada. Por ejemplo, si buscamos <property>"Humanes de Madrid-"</property> no devolverá nada, pero si buscamos <property>"Humanes de Madrid"</property>, nos devolverá el registro que tenga como texto, exáctamente ese valor. En este caso, <property>Humanes de Madrid</property>.</li>\n\
<li><name>+</name>: Permite establecer búsquedas que tengan coincidencias parciales o totales de ambas expresiones. Por ejemplo, si buscamos <property>h+u</property> devolverá, entre otros, <property>Humanes de Madrid</property>.</li>\n\
<li style="white-space: pre-wrap"><name>*</name>: El símbolo asterisco equivale a decir "cualquier cosa", pero, dependiendo de dónde se encuentre y cuántos haya, significará una cosa u otra.Por ejemplo:\n\
	● Si se establece delante de una expresión buscará todas las coincidencias que terminen con la expresión, por lo que si buscamos <property>*va</property> no devolverá nada.\n\
	● Si se establece detrás de una expresión buscará todas las coincidencias que empiecen con la expresión, por lo que si buscamos <property>va*</property> devolverá, únicamente, <property>Valmadrid</property>.\n\
	● Si se establece delante y detrás de una expresión buscará todas las coincidencias que contengan la expresión, por lo que si buscamos <property>*va*</property>, devolvera <property>Rivas-Vaciamadrid</property> y <property>Valmadrid</property>. Nótese que, este comportamiento es equivalente a no poner ningún asterisco.\n\
</ul>\n\
Es simple, fácil de personalizar y de utilizar y hace que el rendimiento de la página se vea poco afectado.\n\
<name><bool>NOTA</bool>: Si se desean consultar las recomendaciones sobre la accesibilidad y los combobox o selectpickers, se puede visitar la URL https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.0pattern/combobox-autocomplete-both.html</name>',
	}, 
	additional: [
		{
			description: 'Personalizar los estilos del componente:',
			example: '_CSS_// Reglas CSS a incluir en tu hoja de estilos\n\
.it-autocomplete-items { position: fixed; background: rgba(255, 255, 255, 1); border: 1px solid rgb(224, 224, 224); z-index: 99; top: 100%; left: 15px; right: 0px; width: calc(100% - 30px); max-height: 210px; overflow: hidden auto; }\n\
.it-autocomplete-items div.value { color: rgba(0, 0, 0, 1); line-height: normal; padding: 4px 10px; cursor: pointer; background-color: rgba(255, 255, 255, 1); border-bottom: 0px solid rgba(0, 0, 0, 0.2); text-transform: capitalize; }\n\
.it-autocomplete-items div.value b { color: rgba(0, 0, 0, 1); }\n\
.it-autocomplete-items div.value:hover,\
.it-autocomplete-items div.value:hover b,\
.it-autocomplete-active,\
.it-autocomplete-active b { color: rgba(255, 255, 255, 1) i !important; background-color: rgba(56, 104, 176, 1) !important; }\n\
.it-autocomplete-items .header,\
.it-autocomplete-items .error { position: initial; background: rgba(255, 255, 255, 1); border-bottom: 1px solid rgba(0, 0, 0, 0.4); box-shadow: none; width: 100%; line-height: 28px; padding: 0px 10px; pointer-events: none; }\n\
.it-autocomplete-items .header span,\
.it-autocomplete-items .value span { width: 100%; display: inline-block; vertical-align: top; }\n\
.it-autocomplete-items .header span,\
.it-autocomplete-items .error span { display: table-cell; height: auto; min-height: 32px; padding: 5px 0px; line-height: normal; color: rgba(0, 0, 0, 1); font-size: 13px; font-weight: 600; text-transform: uppercase; }\n\
.it-autocomplete-items .error span { color: rgb(240, 18, 35); }\n\
.it-autocomplete-items .error.not-found span { color: rgba(0, 0, 0, 0.45); text-transform: none; }\n\
.it-autocomplete-items .error + .value { color: rgba(0, 0, 0, 1); font-weight: bold; }\n\
.it-autocomplete-items.table .header { display: table; }\n\
.it-autocomplete-items.cluster .header,\
.it-autocomplete-items .error { border-bottom: 0px none; margin-top: 0px; text-transform: uppercase; font-size: 0.85rem; font-weight: 600; }\n\
.it-autocomplete-items.cluster .error { margin-top: 15px; }\n\
.it-autocomplete-items.cluster .values .value { padding-left: 25px; }\n\
.it-autocomplete-items.cluster .header span { color: rgba(0, 0, 0, 0.4); }\n\
.it-autocomplete-items .value.highlighted { font-weight: bold; background: transparent; color: rgba(36, 84, 156, 1); }\n\
.it-autocomplete-items .value.disabled { font-weight: 100; background: rgba(0, 0, 0, 0.1); color: rgba(0, 0, 0, 0.5); pointer-events: none; }\n\
\n\
input[data-helper] { padding-right: 28px; }\n\
.it-autocomplete-helper-icon { cursor: pointer; background: rgba(0, 0, 0, 1); color: rgba(0, 0, 0, 1); height: 28px; width: 28px; line-height: 28px; position: absolute; right: 5px; bottom: 5px; text-align: center; z-index: 9; }\n\
.it-autocomplete-helper { background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(0, 0, 0, 0.15); padding: 10px; position: fixed; top: 25vh; left: 10vw; display: block; width: 80vw; max-height: 550px; overflow: auto; z-index: 99; }\n\
.it-autocomplete-helper::after { content: ""; position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); z-index: -1; }\n\
.it-autocomplete-helper ul { background: rgba(255, 255, 255, 1); border: 1px solid rgba(0, 0, 0, 0.15); padding: 10px; list-style: none; }\n\
.it-autocomplete-helper ul b { font-weight: bold; }\n\
.it-autocomplete-helper code { padding: 2px 4px; font-size: 90%; color: rgba(233, 30, 99, 1); background-color: rgba(0, 0, 0, 0.04); border-radius: 4px; }\n\
.it-autocomplete-helper button { cursor: pointer; background: rgba(0, 0, 0, 1); color: rgba(255, 255, 255, 1); border: 0 none; height: 32px; line-height: 28px; float: right; padding: 0px 10px; }\n\
.it-autocomplete-helper h3 { background: linear-gradient(90deg, rgba(0, 0, 0, 0.06), transparent); font-size: 20px; color: rgba(0, 0, 0, 1); padding: 5px; }\n\
.it-autocomplete-helper .hidden { display: none !important; }\n\
@media (max-width: 640px) {\
    .it-autocomplete-helper { width: 100%; left: 0px; top: 0px; }\
}\n\
_CSS_'
		}
	],
	ajax: {
		type: 'boolean',
		description: 'Indica que se van a utilizar llamadas al servidor para recuperar los datos del autocomplete. Cuándo ese parámetro está a <strong>true</strong>, supone que el filtrado de elementos lo realizará el servidor (a no ser que sea un archivo JSON), es decir, por más que escribamos en el campo de texto, no se reducirá el número de resultados.Por defecto es <str>false</str>.',
		example: '// Autocomplete con AJAX y filtrado por el componente.\n\
// Cuando la petición es un archivo con extensión <property>json</property>, el componente realizará una única llamada en la primera búsqueda. En las siguientes ya no realizará ninguna llamada al servidor y buscará sólo dentro del parámetro <property>data</property>.\n\
it("#municipio").autocomplete({\n\
	url: "./json/municipios.json",\n\
	ajax: true,\n\
	row: {\n\
		return_value: "nombre",\n\
		columns: ["nombre"],\n\
	},\n\
});\n\
\n\
// Autocomplete con filtrado previo por servidor.\n\
// Cuando la petición tenga una extensión diferente a <property>json</property>, el servidor realizará cadavez una petición POST con un parámetro llamado <property>q</property> que contendrá el texto introducido por el usuario.\n\
it("#municipio").autocomplete({\n\
	format: "table",\n\
	ajax: true,\n\
	url: "https://www.islavisual.com/data/getMunicipio.php",\n\
	minLength: 3,\n\
	row: {\n\
		return_value: "municipio_id",\n\
		columns: ["provincia_id", "nombre"],\n\
	},\n\
});'
	},
	autoFocus: {
		type: 'boolean',
		description: 'Indica que se establezca el foco después de que finalice la creación del autocomeplete. Por defecto es <str>false</str>.',
		example: 'var arrayList = ["Coche", "Motorcicleta", "Avión", "Tren", "Bicicleta"];\n\
it("#vehiculo").autocomplete({\n\
	data: arrayList,\n\
	format: "list",\n\
	autoFocus: true\n\
})'
	},
	autoExpand: {
		type: 'boolean',
		description: 'Indica que se despliegue el autocomplete de forma automática. Por defecto es <str>false</str>.',
		example: 'var arrayList = ["Coche", "Motorcicleta", "Avión", "Tren", "Bicicleta"];\n\
it("#vehiculo").autocomplete({\n\
	data: arrayList,\n\
	format: "list",\n\
	autoExpand: true\n\
})'
	},
	autoSelect: {
		type: 'boolean',
		description: 'Indica que el valor del elemento de formulario (o input) seleccione todo el texto contenido de forma automática. Por defecto es <str>false</str>.',
		example: 'var arrayList = ["Coche", "Motorcicleta", "Avión", "Tren", "Bicicleta"];\n\
it("#vehiculo").autocomplete({\n\
	data: arrayList,\n\
	format: "list",\n\
	autoSelect: true\n\
})'
	},
	callback: {
		type: 'function',
		description: 'Función que se llamará cuando se seleccione un elemento de la lista de autocompletado.<br><br>\
Lo que recibirá esta función de retorno será un elemento de formulario input de tipo text con el valor solicitado en la propiedad <str>return_value</str> y la posición del item seleccionado dentro del diccionario de datos referenciado por la propiedad <str>data</str>. Por esta razón, dependiendo del tipo de auto complete utilizado, se podrá recuperar la de formas distintas.<br><br>\
Como información adicional, si se desea acceder desde esta función de retorno a la configurción o a los datos declarados en el objeto data del autocomplete, se puede hacer a través de la expresión <name>Autocomplete</name>.<str>target.XXX</str>, donde <str>XXX</str> es el ID del input asignado al autocomplete.',
		example: '// Ejemplo de función callback para un autocomplete de tipo list (lista)\n\
it("#municipio").autocomplete({\n\
	url: "./json/municipios.json",\n\
	format: "list",\n\
	ajax: true,\n\
	row: {\n\
		return_value: "nombre",\n\
		columns: ["nombre"],\n\
	}\n\
});\n\
\n\
function callback(input){\n\
	var index = input.dataset.index;\n\
	var id = input.dataset.id;\n\
	var value = input.value;\n\
	console.log("Nº Registro:", index, "Extraído del elemento con ID", id, "Valor seleccionado:", value);\n\
}\n\
\n\
// Ejemplo de función callback para un autocomplete de tipo table (tabla)\n\
it("#municipio").autocomplete({\n\
    format: "table",\n\
    ajax: true,\n\
    url: "./json/municipios.json",\n\
    minLength: 3,\n\
    row: {\n\
        return_value: "municipio_id",\n\
        columns: ["provincia_id", "nombre"],\n\
    },\n\
    callback: callback\n\
});\n\
function callback(input){\n\
	var index = input.dataset.index;\n\
	var config = Autocomplete.targets[input.dataset.id].opt;\n\
	var item = config.data[index];\n\
	\n\
	// Desde item ya se puede acceder a cualquiera de los datos del registro original\n\
	console.log("Nº Registro:", index, "Datos seleccionados", item);\n\
}\n\
// Cada vez que se seleccione un registro, se mostrará por consola algo como:\n\
<code><comm>Nº Registro: 1325 Datos seleccionados</comm>\n\
{municipio_id: "09196", provincia_id: "09", cmun: "196", dc: "3", nombre: "Madrigal del Monte"}\n\
	cmun: "196"\n\
	dc: "3"\n\
	municipio_id: "09196"\n\
	nombre: "Madrigal del Monte"\n\
	provincia_id: "09"\n\
	&blacktriangleright; __proto__: <inline>Object</inline>\n\
</code>\n\
\n\
// Ejemplo de función callback para un autocomplete de tipo cluster (agrupado)\n\
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
it("#marca").autocomplete({\n\
	format: "cluster",\n\
	data: brandsList\n\
});\n\
\n\
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
it("#vehiculo").autocomplete({\n\
	data: arrayList,\n\
	className: "auto-complete"\n\
});'
	},
	data: {
		type: 'object',
		description: 'Objeto con los elementos para manejar o tratar. Este objeto puede estar en formato <str>JSON</str> o estar en formato <str>Array</str>.',
		example: 'var arrayList = ["Coche", "Motorcicleta", "Avión", "Tren", "Bicicleta"];\n\
it("#vehiculo").autocomplete({\n\
	data: arrayList\n\
});'
	},
	delay: {
		type: 'integer',
		description: 'Es el valor en milisegundos que personaliza el tiempo de espera entre que el usuario deja de escribir y se realiza la búsqueda. Por defecto está establecido a <str>300</str> milisegundos.',
		example: 'var arrayList = ["Coche", "Motorcicleta", "Avión", "Tren", "Bicicleta"];\n\
it("#vehiculo").autocomplete({\n\
	data: arrayList,\n\
	delay: 1000\n\
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
it("#pais").autocomplete({\n\
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
});\n\
\n\
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
it("#marca").autocomplete({\n\
	data: brandsList,\n\
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
	format: {
		type: 'string',
		description: 'Es el formato en el que se presentarán los datos. Según el formato en el que se presentan los datos, el objeto <str>data</str> debe definirse de una forma u otra.\n\
Este parámetro tiene como valor por defecto es "list".\n<p style="margin: 10px 0">Los posibles valores son:\n\
<ul>\n\
<li><name>list</name>: El objeto de datos del autocomplete está configurado como un array de cadenas.</li>\n\
<li><name>table</name>: El objeto de datos del autocomplete está configurado como un array de objetos JSON. Para que el autocomplete pueda manjar este objeto debe seguir las normas establecidas por la propiedad <str>row</str>.</li>\n\
<li><name>cluster</name>: El objeto de datos del autocomplete está configurado como un array de objetos JSON que dentro tiene otro array de objetos JSON. Para que el autocomplete pueda manjar este objeto debe seguir las normas establecidas por la propiedad <str>row</str>.</li>\n\
</ul>',
		example: '// Ejemplo de autocomplete en formato list (lista)\n\
it("#municipio").autocomplete({\n\
	url: "./json/municipios.json",\n\
	format: "list",\n\
	ajax: true,\n\
	row: {\n\
		return_value: "nombre",\n\
		columns: ["nombre"],\n\
	}\n\
});\n\
\n\
// Ejemplo de autocomplete en formato table (tabla)\n\
it("#municipio").autocomplete({\n\
	format: "table",\n\
	ajax: true,\n\
	url: "./json/municipios.json",\n\
	minLength: 3,\n\
	row: {\n\
		return_value: "municipio_id",\n\
		columns: ["provincia_id", "nombre"],\n\
	},\n\
	callback: callback\n\
});\n\
\n\
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
it("#marca").autocomplete({\n\
	format: "cluster",\n\
	data: brandsList\n\
});'
	},
	helper: {
		type: 'boolean',
		description: 'Indica si se debe mostrar el botón de ayuda del autocomplete. Por defecto, este botón se insertará a la derecha del input que posee la funcionalidad de autocomplete. Por defecto es <bool>false</bool>.',
		example: 'var arrayList = ["Coche", "Motorcicleta", "Avión", "Tren", "Bicicleta"];\nnew Autocomplete({target: "inputTextID", data: arrayList, helper: false});'
	},
	highlight: {
		type: 'object',
		description: 'Indica qué campo o propiedad se utilizará como selector para indicar si está destacado el elemento producto de la búsqueda. Si el resultado de la evaluación se considera verdadera, se añadirá la clase proporcionada por la propiedad <property>class</property>.<br><br>\
Para que el elemento obtenga esta clase y, por tanto, se vuelva destacable, el valor de la propiedad suministrada por la propiedad <property>field</property> deberá contener el valor de la propiedad <property>value</property>. Si la propiedad <property>value</property> tiene un valor vacío o no está declarada, se tomará como condición para destacar que el registro tenga definida la propiedad, sea el valor que sea.',
		example: '// Ejemplo de autocomplete en formato table (tabla) \n\
var countriesJSON = [\n\
	{ id: 1, country: "Afganistán", capital: "Kabul", location: "Se encuentra dentro de Asia del Sur y Asia Central.", EU: 0 },\n\
	{ id: 2, country: "Albania", capital: "Tirane", location: "Se encuentra en el sureste de Europa.",  EU: 1 },\n\
	{ id: 3, country: "España", capital: "Madrid", location: "Se encuentra al al noreste con Francia y Andorra.",  EU: 1 },\n\
];\n\
it("#pais").autocomplete({\n\
	format: "table",\n\
	data: countriesJSON,\n\
	highlight: {\n\
		// Nombre del campo con el flag que indica si destacado o no\n\
		field: "EU",\n\
		value: 1,\n\
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
	{\n\
		group: "Coches", items: [\n\
			{ id: 1, text: "Ford", tooltip: "Estadounidense", unavailable: "no"},\n\
			{ id: 2, text: "Jaguar", tooltip: "Inglesa", unavailable: "no"},\n\
			{ id: 3, text: "Seat", tooltip: "Española", unavailable: "sí"}\n\
		]\n\
	}, {\n\
		group: "Motocicletas", items: [\n\
			{ id: 1, text: "Suzuki", tooltip: "Japonesa", unavailable: "sí"},\n\
			{ id: 2, text: "Ducati", tooltip: "Italiana", unavailable: "no"},\n\
			{ id: 3, text: "Hayley-Davidson", tooltip: "Estadounidense", unavailable: "no"}\n\
		]\n\
	},\n\
];\n\
it("#marca").autocomplete({\n\
	data: clusterList,\n\
	minLength: 1,\n\
	highlight: {\n\
		// Nombre del campo con el flag que indica si destacado o no\n\
		field: "unavailable",\n\
			value: "no",\n\
		// Clase CSS a asignar cuando el selector tenga un valor establecido a verdadero\n\
		class: "highlighted",\n\
	},\n\
	format: "cluster",\n\
});'
	},
	minLength: {
		type: 'integer',
		description: 'Indica la longitud mínima para comenzar a buscar dentro del diccionario de datos asignado por la propiedad <str>data</str>. Por defecto es <str>3</str>.',
		example: 'var arrayList = ["Coche", "Motorcicleta", "Avión", "Tren", "Bicicleta"];\nnew Autocomplete({target: "inputTextID", data: arrayList, minLength: 4});'
	},
	statusMessage: {
		type: 'string',
		description: 'Es un mensaje que se muestra únicamente cuando la propiedad minLength es -1. Se puede utilizar, por ejemplo, para sacar un mensaje mientras se carga y configura el componente o para indicar el estado del autocomplete.',
		example: 'var arrayList = ["Coche", "Motorcicleta", "Avión", "Tren", "Bicicleta"];\n\n\
it("#vehiculo").autocomplete({ data: {}, ajax: true, url: "https:\u002F<n/>\u002Fwsdeejemplo.com/get", minLength: -1, statusMessage: "Cargando..."} );\n\n\
it("#vehiculo").autocomplete({ data: arrayList, minLength: -1, statusMessage: "Elemento desactivado..."} );'
	},
	row: {
		type: 'object',
		description: 'Objeto que permite personalizar la estructura del diccionario de datos a gestionar asignado a la propiedad <str>data</str>".<br><br>\
Si el formato del autocomplete es de tipo <property>"table"</property>, los parámetros que puede recibir son:\n\
<ul>\n\
<li><name>columns</name>: Es un array que indica el nombre de los campos que se desea que muestren cuando se realiza una búsqueda. Por defecto, si no se establece este parámetro, devolverá el primer campo o propiedad del registro.</li>\n\
<li><name>headers</name>: Es un array que indica el nombre de los campos que se establecerán como cabecera de la tabla. Por defecto, si no se establece este parámetro, devolverá los mismos nombres que estén indicados en la propiedad <str>columns</str>.</li>\n\
<li><name>return_value</name>: Indica el nombre del campo que se devolverá a la función de declarada en la propiedad <str>callback</str>. Por defecto, esta propiedad tiene asignado el valor <str>text</str>.</li>\n\
<li><name>showHeaders</name>: Indica si se debe o no mostrar la cabecera de la tabla. Por defecto, esta propiedad está asignada a <str>false</str>.</li>\n\
</ul>\n\
<p style="margin: 10px 0">Si el formato del autocomplete es de tipo <property>"cluster"</property>, los parámetros que puede recibir son:</p>\n\
<ul>\n\
<li><name>group</name>: Indica el nombre de la clave de agrupación. Por defecto, esta propiedad tiene asignado el valor <str>group</str>.</li>\n\
<li><name>items</name>: Indica el nombre de la clave dónde estarán almacenados la información a buscar. Por defecto, esta propiedad tiene asignado el valor <str>items</str>.</li>\n\
<li><name>columns</name>: Es un array que indica el nombre de los campos que se desea que muestren cuando se realiza una búsqueda. Por defecto, si no se establece este parámetro, devolverá el primer campo o propiedad del registro.</li>\n\
<li><name>return_value</name>: Indica el nombre del campo que se devolverá a la función de declarada en la propiedad <str>callback</str>. Por defecto, esta propiedad tiene asignado el valor <str>group</str>.</li>\n\
</ul>',
		example: '// Ejemplo de autocomplete de tipo lista\n\
it("#pais").autocomplete({\n\
	url: "./json/paises-idioma.json",\n\
	format: "list",\n\
	ajax: true,\n\
	minLength: 2,\n\
	className: "AutoComplete",\n\
	row: {\n\
		return_value: "name",\n\
		columns: ["alpha2Code", "name", "region"],\n\
	},\n\
});\n\
// Ejemplo de autocomplete de tipo table (tabla)\n\
it("#pais").autocomplete({\n\
	url: "./json/paises-idioma.json",\n\
	format: "table",\n\
	ajax: true,\n\
	minLength: 2,\n\
	className: "AutoComplete",\n\
	row: {\n\
		return_value: "name",\n\
		columns: ["alpha2Code", "name", "region"],\n\
		headers: ["Código", "Nombre", "Continente"],\n\
		showHeaders: true,\n\
	},\n\
});\n\
\n\
// Ejemplo de autocomplete de tipo cluster (agrupado)\n\
var vehiclesList = [\n\
	{\n\
		marca: "Seat",\n\
		modelos: [\n\
			{ id: 101, modelo: "Arona", coste: 1 },\n\
			{ id: 102, modelo: "Ibiza", coste: 2 },\n\
			{ id: 103, modelo: "León", coste: 3 }\n\
		]\n\
	}, {\n\
		marca: "Ford",\n\
		modelos: [\n\
			{ id: 201, modelo: "Fiesta", coste: 4 },\n\
			{ id: 202, modelo: "Mondeo", coste: 5 },\n\
			{ id: 203, modelo: "Focus", coste: 6 }\n\
		]\n\
	}, {\n\
		marca: "Renault",\n\
		modelos: [\n\
			{ id: 301, modelo: "Captur", coste: 7 },\n\
			{ id: 302, modelo: "Clio", coste: 8 },\n\
			{ id: 303, modelo: "Espace", coste: 9 }\n\
		]\n\
	},\n\
];\n\
it("#vehiculo").autocomplete({\n\
	data: vehiclesList,\n\
	format: "cluster",\n\
	minLength: 1,\n\
	row: {\n\
		return_value: "modelo",\n\
		columns: ["modelo", "coste"],\n\
		groupby: "marca",\n\
		items: "modelos"\n\
	}\n\
});'
	},
	stylesheet:{
		type: 'boolean',
		description: 'Indica al componente si las reglas CSS necesarias para su utilización están en una hoja de estilos aparte. Por defecto, su valor es <property>false</property>, lo que significa que el componente añadirá todas las reglas CSS necesarias durante el proceso de carga, pero, que podrán ser sobreescritas por otras reglas CSS con igual selector dentro de las hojas de estilo definidas en la actual página web.',
		example: 'var arrayList = ["Coche", "Motorcicleta", "Avión", "Tren", "Bicicleta"];\n\
it("#vehiculo").autocomplete({\n\
	data: arrayList,\n\
	stylesheet: true\n\
});'
	},
	tooltip: {
		type: 'object',
		description: 'Este parámetro es un JSON que indica qué campos se utilizarán como fuente de los tooltip.<br><br>\
Si se utiliza el modo <name>cluster</name>, sólo se debe indicar el campo dónde está el texto del tooltip. Si se utiliza el modo <name>table</name>, se debe indicar el nombre del campo dónde se insertará el tooltip y el campo del tooltip.',
		example: '// Ejemplo de autocomplete en formato table (tabla) \n\
var countriesJSON = [\n\
	{ id: 1, country: "Afganistán", capital: "Kabul", location: "Se encuentra dentro de Asia del Sur y Asia Central.", disabled: 1 },\n\
	{ id: 2, country: "Albania", capital: "Tirane", location: "Se encuentra en el sureste de Europa.",  disabled: 0 },\n\
	{ id: 3, country: "España", capital: "Madrid", location: "Se encuentra al al noreste con Francia y Andorra.",  disabled: 0 },\n\
];\n\
it("#pais").autocomplete({\n\
	format: "table",\n\
	data: countriesJSON,\n\
	// Tooltip es un array de JSON que puede definir tantos tooltips como columnas se muestran\n\
	row: {\n\
		return_value: "id",\n\
		columns: ["country", "capital"],\n\
		headers: ["País", "Capital"]\n\
	},\n\
	tooltip: [{\n\
		//Nombre del campo donde se establecerá el tooltip\n\
		field: "country",\n\
		//Nombre del campo que contiene el texto utilizado por el tooltip\n\
		text: "location"\n\
	}]\n\
});\n\
\n\
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
it("#vehiculo").autocomplete({\n\
	data: brandsList,\n\
	minLength: 1,\n\
	tooltip: {\n\
		// Nombre del campo donde se encuentra el texto del tooltip\n\
		field: "tooltip"\n\
	},\n\
	format: "cluster",\n\
});'
	},
	voidMessage: {
		type: 'string',
		description: 'Indica el mensaje a mostrar cuando no hay resultados.',
		example: 'it("#inputTextID").autocomplete({ data: {}, minLength: -1, voidMessage: "No se han encontrado coincidencias"} );'
	},
}

/**
	 Benchmark functionality
	 @version: 1.00
	 @author: Pablo E. Fernández (islavisual@gmail.com).
	 @Last update: 15/03/2019
 **/
WikiHelper.Benchmark = {
	general: {
		version: '1.0',
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

/**
   Constraint to input Helper
   @version: 1.2
   @author: Pablo E. Fernández (islavisual@gmail.com).
   @Copyright 2017-2021 Islavisual.
   @Last update: 20/05/2020
 **/
WikiHelper.Constraint = {
	general: {
		version: '1.2',
		name: 'Constraint',
		help: 1,
		description: "Constraint es un plugin que proporciona una forma sencilla de evitar la introducción de valores que, de antemano, se sabe que no son válidos. Su funcionamiento se basa en expresiones regulares y se integra fácilmente con otros componentes de JavaScript o HTML5.\nUna vez que se define el control, se puede acceder a sus métodos a través de document.inputTextID.Constraint.",
	},
	base: {
		type: 'integer',
		description: 'El parámetro "base" establece una base numérica diferente a 10, la establecida por defecto. El tipo binario establece automáticamente la base a 2. El tipo hexadecimal establece automáticamente la base a 16.',
		example: 'it("#inputTextID").constraint({ type: "decimal", base: 2 });\n\
// A través del tipo binario\n\
it("#inputTextID").constraint({type: "binary"});'
	},
	decimalpoint: {
		type: 'string',
		description: 'El parámetro "decimalpoint" indica el carácter que separará la parte entera de la parte decimal. Sólo será válido en los tipos numéricos con decimales. Por defecto el valor es "." (punto).',
		example: 'it("#inputTextID").constraint({ type: "decimal", decimalpoint: "," });'
	},
	function: {
		type: 'function',
		description: 'El parámetro "function" define la función de validación que controlará el formato de entrada y los valores admitidos. La validación realizada por esta función se puede definir a través de expresiones regulares (en el caso del subtipo "binario", la función podría ser "return /^(0|1)*$/.test(value);") aunque no es obligatorio. Si se define este parámetro a través de una función, el parámetro "type" debe establecerse a "custom".',
		example: '// Ejemplo de subtipo personalizado (Número en formato octal).\n\
it("#inputTextID").constraint({\n\
type: "custom",\n\
function: function(value) {\n\
	return /^[0-7]*$/i.test(value);\n\
},\n\
base: 8,\n\
});'
	},
	indicators: {
		type: 'object',
		description: 'El parámetro "indicators" indica si se deben mostrar los iconos de flecha hacia arriba, flecha hacia abajo y el color. Estos iconos a menudo se asocian con los controles de tipo numérico en HTML5, por lo que generalmente es una buena idea mostrarlos. Por defecto, el valor está establecido a true.\nEl parámetro "indicators" se compone de atributos "enabled" y "color".',
		example: '// Restricción sin indicadores\n\
it("#inputTextID").constraint({ type: "decimal", indicators: {enabled: false} });\n\
// Restricción con indicadores en rojo\n\
it("#inputTextID").constraint({ type: "decimal", indicators: {color: "red"} });'
	},
	target: {
		type: 'string',
		description: 'ID del control dónde será implementado el constraint',
		example: 'it("#inputTextID").constraint({ type: "int" });'
	},
	step: {
		type: 'float',
		description: 'El parámetro "step" indica el incremento o decremento cuando el usuario presiona las teclas de cursor o uno de los botones asignados como "indicadores". Por defecto es 1.',
		example: 'it("#inputTextID").constraint({ type: "decimal", step: 0.01 });'
	},
	type: {
		type: 'string',
		description: 'El parámetro "type" define el formato o el tipo de datos que permitirá el control. Los valores aceptados son:\n\t● <b>int</b>: Los valores permitidos son únicamente enteros positivos y negativos.\n\t● <b>uint</b>: Los valores permitidos son únicamente enteros positivos.\n\t● <b>float</b>: Los valores permitidos son enteros y números reales con decimales infinitos.\n\t● <b>decimal</b>: Los valores permitidos son enteros y números reales con dos decimales.\n\t● <b>percent</b>: Los valores permitidos son entre 0 y 100.\n\t● <b>binary</b>: Los valores permitidos son números enteros escritos y definidos a través de su base, en este caso 0 y 1.\n\t● <b>hexadecimal</b>: Los valores permitidos son números enteros escritos y definidos a través de su base, en este caso de 0 a 9 y de A a F.\n\t● <b>hour</b>: Los valores permitidos son de 00:00 a 23:59.\n\t● <b>custom</b>: Permite definir una función de tipo personalizado. El subtipo "custom" se alimenta del parámetro "function", por lo que si el control se define como "custom", será obligatorio (el parámetro "function").',
		example: '// Example of Integer subtype\n\
it("#inputTextID").constraint({ type: "int"});\n\n\
// Example of Hour subtype\n\
it("#inputTextID").constraint({ type: "hour"});\n\n\
// Example of Custom subtype (Number in octal format). The custom subtype needs \n\
it("#inputTextID").constraint({\n\
type: "custom",\n\
function: function(value) {\n\
	return /^[0-7]*$/i.test(value);\n\
},\n\
base: 8,\n\
});\n\n\
// Sólo letras con  acentos a través del bloque unicode Latin1\n\
// \\u00C0-\\u00FF Suplemento Latin-1\n\
// \\u0100-\\u017F Latín Extendido-A\n\
// \\u0180-\\u024F Latín Extendido-b\n\
// \\u1E00-\\u1EFF Latín Extendido Adicional\n\
it("#inputTextID").constraint({\n\
type: "custom",\n\
function: function(value) {\n\
	return /^[a-zA-Z\s\\u00C0-\\u024F\\u1E00-\\u1EFF]*$/.test(value);\n\
}\n});'
	},
	increment: {
		type: 'string',
		description: 'Aumenta el valor de la entrada asociada al valor establecido en "step". El parámetro a enviar debe ser el ID del elemento que tiene la restricción.',
		example: '// Hay dos posibilidades de realizar este incremento.\n\
// Primera forma:\n\
Constraint.increment("inputTextID");\n\
// Segunda forma:\n\
it("#inputTextID").constraint.increment();'
	},
	decrement: {
		type: 'string',
		description: 'Disminuye el valor de la entrada asociada al valor establecido en "step". El parámetro a enviar debe ser el ID del elemento que tiene la restricción.',
		example: '// Hay dos posibilidades de realizar este decremento.\n\
// Primera forma:\n\
Constraint.decrement("inputTextID");\n\
// Segunda forma:\n\
it("#inputTextID").constraint.decrement();'
	},
}

/**
   Counter Helper
   @version: 1.1
   @author: Pablo E. Fernández (islavisual@gmail.com).
   @Copyright 2017-2021 Islavisual.
   @Last update: 08/04/2021
 **/
WikiHelper.Counter = {
	general: {
		version: '1.1',
		name: 'Counter',
		help: 1,
		description: "Este componente permite crear contadores ascendentes y descendentes y proveerlos de algunas opciones de personalización.",
	},
	additional: [
		{
			description: 'Personalizar los estilos a través de las reglas CSS. Por ejemplo:',
			example: '_CSS_// Reglas CSS a incluir en tu hoja de estilos\n\
// Ejemplo de estilo formato batería\n\
.it-counter { position: relative; float: right; width: 64px; height: 27px; margin: 10px 10px 10px 5px; border-radius: 4px; padding: 3px; background: rgba(255, 255, 255, 1); border: 1px solid rgba(255, 255, 255, 0.8); box-shadow: rgba(0, 0, 0, 1) 0px 0px 0px 2px inset; }\n\
.it-counter::before { content: attr(data-value); position: absolute; top: 0px; left: 0px; text-align: center; width: 100%; color: rgba(0, 0, 0, 1); height: 100%; padding: 0px; line-height: 24px; font-size: 0.9rem; z-index: 1; }\n\
.it-counter::after { content: ""; background: rgba(0, 0, 0, 0.8); position: absolute; right: -5px; top: 5px; width: 5px; height: calc(100% - 10px); padding: 0px; }\n\
.it-counter span.progress { width: 100%; height: 19px; min-height: auto; line-height: normal; padding: 0px; float: left; border-radius: 2px; background: rgba(255, 255, 255, 1); position: relative; top: auto; right: auto; z-index: 0; }\n\
_CSS_'
		}
	],
	callback: {
		type: 'function',
		description: 'Función que se debe llamar cuando se termine la cuenta del contador.',
		example: 'it("#counter").counter({\n\
from: 5,\n\
callback: function(){ console.log("Cuenta terminada!") }\n\
});'
	},
	colors: {
		type: 'object',
		description: 'Permite definir los colores que se aplicarán en la barra de progreso asociada al contador. Por defecto son los que se preentan como ejemplo.',
		example: 'it(".counter-div").counter({\n\
colors: {low: "rgb(128,128,128)", half: "rgb(255,255,0)", high: "rgb(255,0,0)"},\n\
to: 30,\n\
interval: 1,\n\
mode: "count"\n\
});'
	},
	format: {
type: 'integer',
description: 'Establece una máscara para la visualización de valores. Sólo es aplicable en modo "timer". Por defecto es "HH:MM:SS".',
example: '// Contador marcha atrás de diez segundos\n\
it("#counter").counter({\n\
from: 10,\n\
format: "SS seg",\n\
});\n\
\n\
// Contador marcha atrás de una hora con formato minutos\n\
it("#counter").counter({\n\
from: 3600,\n\
format: "MM Min",\n\
});\n\
'
	},
	from: {
		type: 'integer',
		description: 'Permite definir una cuenta atrás del valor indicado.',
		example: 'it("#counter").counter({\n\
from: 10,\n\
});'
	},
	interval: {
		type: 'integer',
		description: 'Es el el número de segundos que deben pasar para incrementar o decrementar la cuenta. Por defecto su valor es 1.',
		example: 'it("#counter").counter({\n\
from: 10,\n\
interval: 0.2\n\
mode: "count"\n\
});'
	},
	mode: {
		type: 'string',
		description: 'Indica el modo de visualiación del contador. Si el modo es "timer" (el modo por defecto) se presentará como una marca de tiempo, por lo que aunque el intervalo sea menor que un segundo, la duración será la misma qu para el intervalo por defecto\nEn otras palabras, si el modo es "timer", el parámetro interval no tendrá efecto si es menor que uno. Si el modo es "count", se presentará como un contador normal.',
		example: '// Contador marcha atrás\n\
it(".session").counter({\n\
from: 30,\n\
mode: "timer",\n\
});\n\
\n\
// Contador marcha atrás\n\
it(".session").counter({\n\
from: 30,\n\
mode: "count",\n\
});'
	},
	notify: {
		type: 'object',
		description: 'Muestra un mensaje de alerta cuando se cumpla un valor determinado. Consta de tres propiedades, "in", "message" y "callback". La propiedad "in" indica cuándo se debe mostrar el mensaje declarado por la propiedad "message". La propiedad "callback" es la función a la que se devuelve el control cuando se cumple la condición.',
		example: 'it(".session").counter({\n\
from: 3600,\n\
notify: {\n\
	in: 300,\n\
	message: "La sesión está a punto de caducar. Por favor, renuévela si desea continuar..."\n\
	callback: enviarAlServidor()\n\
},\n\
});'
	},
	renew: {
		type: 'object',
		description: 'Muestra un mensaje en el contenedor que funciona como botón de renovación de tiempo. Consta de tres propiedades, "in", "message" y "callback". La propiedad "in" indica cuándo se debe mostrar el mensaje declarado por la propiedad "message". La propiedad "callback" es la función a la que se devuelve el control cuando se cumple la condición.',
		example: 'it(".session").counter({\n\
from: 3600,\n\
renew: {\n\
	in: 300,\n\
	message: "Renovar"\n\
	callback: enviarAlServidor()\n\
},\n\
});'
	},
	showvalue: {
		type: 'boolean',
		description: 'Indica si se debe mostrar el valor del contador o sólo la barra de progreso. Por defecto es true.',
		example: 'it("#counter").counter({\n\
from: 3600,\n\
showvalue: false\n\
});'
	},
	title: {
		type: 'string',
		description: 'Es la propiedad title que se asignará al elemento que tenga asociado el contador. Por defecto es vacío.',
		example: 'it("#counter").counter({\n\
from: 10,\n\
title: "Cuenta atrás hasta 10"\n\
});'
	},
	to: {
		type: 'integer',
		description: 'Permite definir un contador que cuenta hacia adelante hasta el valor indicado.',
		example: 'it(".profile .session").counter({\n\
to: 10,\n\
interval: 0.2\n\
mode: "count"\n\
});'
	},
	stylesheet:{
		type: 'boolean',
		description: 'Indica al componente si las reglas CSS necesarias para su utilización están en una hoja de estilos aparte. Por defecto, su valor es <property>false</property>, lo que significa que el componente añadirá todas las reglas CSS necesarias durante el proceso de carga, pero, que podrán ser sobreescritas por otras reglas CSS con igual selector dentro de las hojas de estilo definidas en la actual página web.',
		example: 'it("#counter").counter({\n\
	from: 3600,\n\
	stylesheet: true\n\
});'
	}
}


/**
	 Datepicker functionality
	 @version: 1.2.2
	 @author: Pablo E. Fernández (islavisual@gmail.com).
	 @Copyright 2017-2021 Islavisual.
	 @Last update: 08/04/2021
 **/
WikiHelper.Datepicker = {
	general: {
		version: '1.2.2',
		name: 'Datepicker',
		help: 1,
		description: 'Datepicker es un control totalmente usable y accesible que permite al usuario seleccionar una fecha concreta de una lista con unos pocos clicks.\n\
<name><bool>NOTA</bool>: Si se desean consultar las recomendaciones sobre la accesibilidad y los datepickers, se puede visitar la URL https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html</name>',
	},
	additional: [
		{
			description: 'También es posible cambiar el idioma de manera global a través de la propiedad config del componente DatePicker.',
			example: "it.datepicker.config = {\n\
	icon: '<i class=\"icon-calendar\"></i>',\n\
	shortdays: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],\n\
	longdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],\n\
	shortmonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],\n\
	longmonths: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],\n\
	weekstart: 1,\n\
	textTrigger: 'Mostrar el calendario',\n\
	textYear: 'Año',\n\
	textToday: 'Hoy',\n\
	textRemove: 'Eliminar',\n\
	autoClose: true,\n\
	curDate: null,\n\
	selMonth: null,\n\
	selYear: null,\n\
	selDay: null,\n\
	format: 'DD-MM-YYYY',\n\
	md: {},\n\
	custom: []\n\
};"
		},
		{
			description: 'Se pueden personalizar los estilos por defecto a través de reglas CSS. Un posible ejemplo para un elemento con ID <property>"finicio"</property> podría ser:',
			example: '_CSS_\n\
// Reglas CSS a incluir en tu hoja de estilos\n\
.it-datepicker { width: 360px; display: block; border: 1px solid rgba(0,0,0,0.05); padding: 0; height: auto; box-sizing: content-box; position: fixed; z-index: 999999; top: 15%; left: calc(50% - 180px); overflow: hidden; }\n\
.it-datepicker::before{ content: ""; width: 100%; left: 0; top: 0; height: 100%; position: fixed; background: rgba(0,0,0,0.3); z-index: -1; }\n\
.it-datepicker::after { content: ""; width: 100%; left: 0; top: 0; height: 100%; position: absolute; background:#fff; z-index: -1; }\n\
.it-datepicker .datepicker-close{  cursor: pointer; position: absolute; top: 0; left: 25%; font-size: 1rem; width: 25%; color: #0066a8; padding-left: 36px; line-height: 36px; font-style: normal; font-weight: bold; }\n\
.it-datepicker .datepicker-close::before, .it-datepicker .datepicker-close::after{ content: ""; border-top: 2px solid #0066a8; width: 18px; height: 2px; display: block; transform: rotate(45deg); position: absolute; top: 16px; left: 10px; }\n\
.it-datepicker .datepicker-close::after{ transform: rotate(-45deg); }\n\
.it-datepicker .l-cal{ position: absolute; top: 0; left: 0; width: 25%; display: block; height: 100%; background: #0066a8; color: #fff; float: left; text-align: center; padding: 0px 3px 5px 3px; }\n\
.it-datepicker .l-cal span{ opacity: 0.5; }\n\
.it-datepicker .l-cal span:first-child{ font-size: 38px; width: 100%; display: block; margin-top: 5px; }\n\
.it-datepicker .l-cal span:nth-child(2){ font-size: 18px; width: 100%; display: block; margin-bottom: 18px; }\n\
.it-datepicker .l-cal span:nth-child(4){ line-height: 32px; display: block; }\n\
.it-datepicker .r-cal{ background: #fff; width: 75%; display: block; height: 100%; float: left; padding: 5px 0; margin-left: 25%; }\n\
.it-datepicker .datepicker-years{ margin-bottom: 0; padding: 0 5px 5px; position: relative; }\n\
.it-datepicker .datepicker-years input{ font-size: 14px; height: 24px; width: 3.2em; background: #fff; color: #000;     border: 1px solid rgba(0,0,0,0.1); padding: 0; text-align: center; float: right; margin: 0 3px 5px calc(75% - 10px); position: relative; left: -10px; box-shadow: none !important; }\n\
.it-datepicker .datepicker-years input ~ span.dt-down{ display: block; position: absolute; right: 8px; top: 12px; border: 1px solid rgba(0,0,0,0.1); width: 11px; height: 12px; }\n\
.it-datepicker .datepicker-years input ~ span.dt-down::before{ display: block; position: absolute; right: 2px; top: 3px; border-left: 3px solid transparent; border-right: 3px solid transparent; border-top: 6px solid rgba(0,0,0,0.5); width: 0; height: 0; content: ""; }\n\
.it-datepicker .datepicker-years input ~ span.dt-up{ display: block; position: absolute; right: 8px; top: 0; border: 1px solid rgba(0,0,0,0.1); width: 11px; height: 12px; }\n\
.it-datepicker .datepicker-years input ~ span.dt-up::before{ display: block; position: absolute; right: 2px; top: 2px; border-left: 3px solid transparent; border-right: 3px solid transparent; border-bottom: 6px solid rgba(0,0,0,0.5); width: 0; height: 0; content: ""; }\n\
.it-datepicker .datepicker-months{ border-bottom: 1px solid rgba(0,0,0,0.2); padding: 0 4px; }\n\
.it-datepicker .datepicker-months .month{ cursor: pointer; font-size: 14px; width: 40px; display: inline-block; text-align: center; background: #fff; border: 1px solid rgba(0,0,0,0.1); margin: 0 0 5px 3px; padding: 1px 0 0 0; line-height: 21px; box-sizing: border-box; }\n\
.it-datepicker .datepicker-months .month.active, .it-datepicker .datepicker-months .month:hover{  background: #0066a8; color: #fff; border-color: rgba(0,0,0,0.1); font-weight: normal; }\n\
.it-datepicker .datepicker-week{ padding: 0 5px; display: table; }\n\
.it-datepicker .r-cal .datepicker-week-names .datepicker-week{ padding: 5px; background: #0066a8; color: #fff; }\n\
.it-datepicker .datepicker-week .dayname, .it-datepicker .datepicker-week .day{ cursor: pointer; font-size: 14px; width: 40px; display: table-cell; text-align: center; border: 0 none; margin: 0; padding: 2px 6px 0px 6px; margin-bottom: 5px; border-color: rgba(0, 0, 0, 0); }\n\
.it-datepicker .datepicker-week .day.disabled{ opacity: 0.5; }\n\
.it-datepicker .datepicker-week .day.active, .it-datepicker .datepicker-week .day:hover{ font-weight: normal; background: #0066a8; color: #fff; border-color: rgba(0,0,0,0.1); padding: 0 6px; }\n\
.it-datepicker .datepicker-buttons{ position: absolute; bottom: 0; left: 0; width: 100%; background: rgba(0,0,0,0.2); padding: 0; }\n\
.it-datepicker .datepicker-buttons button{ cursor: pointer; color: #fff; background: #0066a8; border: 1px solid #0066a8; height: 30px; font-weight: normal; font-size: 14px; width: 100%; margin: 0; padding-top: 1px; }\n\
.it-datepicker .datepicker-buttons button + button { border-top-color: rgba(255,255,255, 0.2);}\n\
.has-datepicker input{ width: 6.8em !important; float: left; }\n\
.has-datepicker input + button{ cursor:pointer; background: rgba(0,0,0,0); border: 0 none; position: relative; left: 0; top: 0; min-height: 28px; min-width: 28px; }_CSS_'
		},
	],
	icon: {
		type: 'String',
		description: 'El atributo "icon" establece el icono que se desea utilizar como disparador para abrir el selector de fechas.',
		example: 'it("#birth-date").datepicker({icon: <i class="fas fa-calendar-alt"></i>});'
	},
	format: {
		type: 'String',
		description: 'Indica el formato para la introducción de la fecha. En general se utilizan los formatos DD-MM-YYYY (Little Endian), MM-DD-YYYY (Meddium Endian) y YYYY-MM-DD (Big Endian)',
		example: 'it("#birth-date").datepicker({\n\
	format: "YYYY-MM-DD",\n\
	background: "#0066a8",\n\
	foreground: "#fff"\n\
});'
	},
	background: {
		type: 'String',
		description: 'Indica el color de fondo que se desea usar. En general, este color será el color corporativo primario.',
		example: 'it("#birth-date").datepicker({\n\
	format: "DD-MM-YYYY",\n\
	background: "#0a1631",\n\
	foreground: "#ff6694"\n\
});'
	},
	foreground: {
		type: 'String',
		description: 'Indica el color de fondo que se desea usar. En general, este color será blanco o negro, aunque en ocasiones suele ser el color corporativo secundario.',
		example: 'it("#birth-date").datepicker({\n\
	format: "DD-MM-YYYY",\n\
	background: "#0a1631",\n\
	foreground: "#000"\n\
});'
	},
	shortdays: {
		type: 'Object',
		description: 'El atributo "shortdays" establece la abreviatura de los días de la semana. Se puede utilizar para cambiar el idioma.',
		example: 'it("#birth-date").datepicker({shortdays: ["L", "M", "X", "J", "V", "S", "D"]});'
	},
	longdays: {
		type: 'Object',
		description: 'El atributo "longdays" establece los identificadores completos de los días de la semana. Se puede utilizar para cambiar el idioma.',
		example: 'it("#birth-date").datepicker({shortdays: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]});'
	},
	shortmonths: {
		type: 'Object',
		description: 'El atributo "shortmonths" establece la abreviatura de los meses del año. Se puede utilizar para cambiar el idioma.',
		example: 'it("#birth-date").datepicker({shortmonths: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]});'
	},
	longmonths: {
		type: 'Object',
		description: 'El atributo "longmonths" establece los identificadores completos de los meses del año. Se puede utilizar para cambiar el idioma.',
		example: 'it("#birth-date").datepicker({longmonths: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]});'
	},
	weekstart: {
		type: 'Integer',
		description: 'El atributo "weekstart" establece si la semana debe empezar en 0 (Domingo) o 1 (Lunes). Por defecto es 1.',
		example: 'it("#birth-date").datepicker({weekstart: 0});'
	},
	textToday: {
		type: 'String',
		description: 'Indica el texto del botón que establece la fecha de hoy.',
		example: 'it("#birth-date").datepicker({textToday: "Today"});'
	},
	textRemove: {
		type: 'Integer',
		description: 'Indica el texto del botón que borra la fecha del campo de texto destino.',
		example: 'it("#birth-date").datepicker({textToday: "Remove"});'
	},
	stylesheet:{
		type: 'boolean',
		description: 'Indica al componente si las reglas CSS necesarias para su utilización están en una hoja de estilos aparte. Por defecto, su valor es <property>false</property>, lo que significa que el componente añadirá todas las reglas CSS necesarias durante el proceso de carga, pero, que podrán ser sobreescritas por otras reglas CSS con igual selector dentro de las hojas de estilo definidas en la actual página web.',
		example: 'it("#birth-date").datepicker({ stylesheet: true });'
	}
}

/**
	 Debugger functionality
	 @version: 1.00
	 @author: Pablo E. Fernández (islavisual@gmail.com).
	 @Copyright 2017-2021 Islavisual.
	 @Last update: 15/03/2019
 **/
WikiHelper.Debugger = {
	general: {
		version: '1.0',
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

/**
   DOM Helper
   @version: 1.00
   @author: Pablo E. Fernández (islavisual@gmail.com).
   @Copyright 2017-2021 Islavisual.
   @Last update: 27/02/2019
 **/
WikiHelper.Dom = {
	general: {
		version: '1.0',
		name: 'DOM',
		help: 1,
		description: "Funcionalidad para la gestión de eventos, acciones,... una vez que la página esté completamente cargada.",
	},
	noparams:{
		type: "void",
		description: "",
		example: "// Esta funcionalidad no tiene parámetros.\n//Para su uso sólo hay que añadir lo que se desea dentro del método DOM.ready.\n//Ejemplo de caso de uso.\nDOM.ready(function () {\n\t// Ocultar loader\n\tsetTimeout(function () { document.querySelector('.loader').style.display = 'none'; }, 250);\n});"
	}
}

/**
   FlexBox Helper						
   @version: 1.0
   @author: Pablo E. Fernández (islavisual@gmail.com).
   @Copyright 2017-2021 Islavisual.
   @Last update: 1/04/2021
 **/
WikiHelper.Flexbox = {
	general: {
		version: '1.0',
		name: 'Flexbox',
		description: 'Este componente está pensado para utilizar estructuras de tipo grid basadas en celdas o cajas.\n\
\n\
Permite la definición columnas por porcentajes, lo que hace posible crear fácilmente sitios webs complejos y dinámicos. Sin embargo, presenta una gran diferencia, sólo carga las clases CSS utilizadas en cada página, por lo que su peso es mucho más pequeño y el rendmiento a nivel global es mayor. Además, permite el uso múltiples anchos personalizados, definibles a partir de los prefijos predefinidos.\n\
\n\
Cabe destacar que, aunque es posible utilizar todas y cada uno de los prefijos predefinidos de manera independiente, siempre debe haber, al menos, la definición de una clase <property>col</property> en el atributo <property>class</property>. Esto es, si se desea utilizar las unidades de medida predefinidas por el atributo <property>resolutions</property>, se debe añadir adicionalmente la clase <property>col</property>.\n\
\n\
Si no se desea utilizar ninguna de las unidades de medida predefinidas en la propiedad <property>resolutions</property>, se puede definir, únicamente, la clase <property>col-XXX</property>, donde XXX es un valor decimal entre 0 y 100.\n\
<name><bool>NOTA</bool>: Cuando se establecen los prefijos <property style="margin: 0">xs</property>, <property style="margin: 0">sm</property>, <property style="margin: 0">md</property>, <property style="margin: 0">lg</property> y/o <property style="margin: 0">xl</property> referentes a la resolución, el elemento tomará la mayor de las resoluciones definidas aunque la resolución del dispositivo sea más alta. Esto es, si definiesemos una columna como <property style="margin: 0">col xs-100 sm-50</property>, para las resoluciones mayores <property style="margin: 0">md</property>, <property style="margin: 0">lg</property> y <property style="margin: 0">xl</property> debería seguir aplicándose el porcentaje correspondiente al valor <property style="margin: 0">50</property>.</name>',
	},
	additional: [
		{
			description: 'Se pueden personalizar los estilos por defecto a través de reglas CSS. Un posible ejemplo para un elemento con ID <property>"finicio"</property> podría ser:',
			example: '_CSS_\n\
// Reglas CSS a incluir en tu hoja de estilos\n\
// Dado que las reglas de estilo de este componente son muchas, aquí sólo se expondrá el caso genérico\n\
it-flexbox { --gap: 5px; --padding: 5px; display: block; flex-direction: column; margin: calc( -1 * 5px) 0 0 calc( -1 * 5px); padding: 5px; }\n\
.it-flexbox .row { display: flex; flex-flow: row wrap; width: 100%; }\n\
.it-flexbox .col, \n\
.it-flexbox [class*="col-"]{ display: block; align-items: center; flex: 1 1 auto; box-sizing: border-box; margin: 5px 0 0 5px; padding: 5px; }\n\
.it-flexbox .row > .col-1 { flex-basis: calc(8.33% - 5px); max-width: calc(8.33% - 5px); }\n\
.it-flexbox .row > .col-2 { flex-basis: calc(16.66% - 5px); max-width: calc(16.66% - 5px); }\n\
.it-flexbox .row > .col-3 { flex-basis: calc(25% - 5px); max-width: calc(25% - 5px); }\n\
.it-flexbox .row > .col-4 { flex-basis: calc(33.33% - 5px); max-width: calc(33.33% - 5px); }\n\
.it-flexbox .row > .col-5 { flex-basis: calc(41.66% - 5px); max-width: calc(41.66% - 5px); }\n\
.it-flexbox .row > .col-6 { flex-basis: calc(50% - 5px); max-width: calc(50% - 5px); }\n\
.it-flexbox .row > .col-7 { flex-basis: calc(58.33% - 5px); max-width: calc(58.33% - 5px); }\n\
.it-flexbox .row > .col-8 { flex-basis: calc(66.66% - 5px); max-width: calc(66.66% - 5px); }\n\
.it-flexbox .row > .col-9 { flex-basis: calc(75% - 5px); max-width: calc(75% - 5px); }\n\
.it-flexbox .row > .col-10 { flex-basis: calc(83.33% - 5px); max-width: calc(83.33% - 5px); }\n\
.it-flexbox .row > .col-11 { flex-basis: calc(91.66% - 5px); max-width: calc(91.66% - 5px); }\n\
.it-flexbox .row > .col-12 { flex-basis: calc(100% - 5px); max-width: calc(100% - 5px); }\n\
\n\
.it-flexbox .row > .offset-1 { margin-left: calc(8.33% + 5px); }\n\
.it-flexbox .row > .offset-2 { margin-left: calc(16.66% + 5px); }\n\
.it-flexbox .row > .offset-3 { margin-left: calc(25% + 5px); }\n\
.it-flexbox .row > .offset-4 { margin-left: calc(33.33% + 5px); }\n\
.it-flexbox .row > .offset-5 { margin-left: calc(41.66% + 5px); }\n\
.it-flexbox .row > .offset-6 { margin-left: calc(50% + 5px); }\n\
.it-flexbox .row > .offset-7 { margin-left: calc(58.33% + 5px); }\n\
.it-flexbox .row > .offset-8 { margin-left: calc(66.66% + 5px); }\n\
.it-flexbox .row > .offset-9 { margin-left: calc(75% + 5px); }\n\
.it-flexbox .row > .offset-10 { margin-left: calc(83.33% + 5px); }\n\
.it-flexbox .row > .offset-11 { margin-left: calc(91.66% + 5px); }\n\
.it-flexbox .row > .offset-12 { margin-left: calc(100% + 5px); }\n\
\n\
.it-flexbox .row > .order-1 { order: 1; }\n\
.it-flexbox .row > .order-2 { order: 2; }\n\
.it-flexbox .row > .order-3 { order: 3; }\n\
.it-flexbox .row > .order-4 { order: 4; }\n\
.it-flexbox .row > .order-5 { order: 5; }\n\
.it-flexbox .row > .order-6 { order: 6; }\n\
.it-flexbox .row > .order-7 { order: 7; }\n\
.it-flexbox .row > .order-8 { order: 8; }\n\
.it-flexbox .row > .order-9 { order: 9; }\n\
.it-flexbox .row > .order-10 { order: 10; }\n\
.it-flexbox .row > .order-11 { order: 11; }\n\
.it-flexbox .row > .order-12 { order: 12; }\n\
}_CSS_'
		},
	],
	col:{
		type: 'string',
		description: 'Permite definir las clases genéricas en cualquier resolución. Si no lleva guión y tamaño asociados, el porcentage será equitativo para todas las columnas.',
		example: '&lt;div class="flexbox">\n\
	&lt;div class="row">\n\
		&lt;div class="col-33.333"> 1/3 &lt;/div>\n\
		&lt;div class="col-33.333"> 1/3 &lt;/div>\n\
		&lt;div class="col-33.333"> 1/3 &lt;/div>\n\
	&lt;/div>\n\
&lt;/div>\n\
\n\
// El ejemplo anterior debería ser lo mismo que:\n\
&lt;div class="flexbox">\n\
	&lt;div class="row">\n\
		&lt;div class="col"> 1/3 &lt;/div>\n\
		&lt;div class="col"> 1/3 &lt;/div>\n\
		&lt;div class="col"> 1/3 &lt;/div>\n\
	&lt;/div>\n\
&lt;/div>'
	},
	offset:{
		type: 'string',
		description: 'Permite definir márgenes a la izquierda para mover las columnas hasta una posición concreta. Para que las celdas no pierdan la línea diferenciadora, y se caigan debajo, el total del ancho de las columnas y los márgenes deben sumar 100.',
		example: '&lt;div class="flexbox">\n\
	&lt;div class="row">\n\
		&lt;div class="col-25 offset-10"> 1/3 &lt;/div>\n\
		&lt;div class="col-30"> 1/3 &lt;/div>\n\
		&lt;div class="col-25"> 1/3 &lt;/div>\n\
	&lt;/div>\n\
&lt;/div>\n\
\n\
// También es posible definir un margen para una unidad de medida en particular añadiéndole uno de los prefijos:\n\
&lt;div class="flexbox">\n\
	&lt;div class="row">\n\
		&lt;div class="col xs-90 md-25 lg-25 xl-25 xs-offset-10"> A &lt;/div>\n\
		&lt;div class="col xs-100 md-50 lg-50 xl-50"> B &lt;/div>\n\
		&lt;div class="col xs-100 md-25 lg-25 xl-25"> C &lt;/div>\n\
	&lt;/div>\n\
&lt;/div>'
	},
	order:{
		type: 'string',
		description: 'Permite definir el orden de las columnas. Cabe destacar que, esta característica, no es muy recomendable puesto que perjudica la accesibilidad web de las páginas.',
		example: '&lt;div class="flexbox">\n\
	&lt;div class="row">\n\
		&lt;div class="col order-1"> 1 &lt;/div>\n\
		&lt;div class="col order-3"> 2 &lt;/div>\n\
		&lt;div class="col order-2"> 3 &lt;/div>\n\
	&lt;/div>\n\
&lt;/div>\n\
\n\
// También es posible definir un orden para una unidad de medida en particular añadiéndole uno de los prefijos:\n\
&lt;div class="flexbox">\n\
	&lt;div class="row">\n\
		&lt;div class="col xs-order-1"> 1 &lt;/div>\n\
		&lt;div class="col xs-order-3"> 2 &lt;/div>\n\
		&lt;div class="col xs-order-2"> 3 &lt;/div>\n\
	&lt;/div>\n\
&lt;/div>'
	},
	gap:{
		type: 'string',
		description: 'Permite definir el espacio entre las filas y columnas del grid. Esta propiedad sólo admite un único valor establecido en cualquiera de las unidades de medida CSS válidas. Por defecto, esta característica está establecida a 5px.',
		example: 'it.flexbox({ gap: "5px" });'
	},
	padding:{
		type: 'string',
		description: 'Permite definir el espacio de padding dentro de las filas y columnas del grid. Esta propiedad sólo admite un único valor establecido en cualquiera de las unidades de medida CSS válidas. Por defecto, esta característica está establecida a 5px.',
		example: 'it.flexbox({ padding: "5px" });'
	},
	resolutions:{
		type: 'Object',
		description: 'Este objeto permite definir los prefijos utilizados en la especificación de clases que se utilizarán para estructurar el grid. Por defecto, se han definido los prefijos <property>xs</property>, <property>sm</property>, <property>md</property>, <property>lg</property> y <property>xl</property>, lo cuales, permiten definir comportamientos diferentes según la resolución:\n\
\n\
	● <property style="width: 24px;">xs</property>: Desde 0 hasta 480px\n\
	● <property style="width: 24px;">sm</property>: Desde 481px hasta 768px\n\
	● <property style="width: 24px;">md</property>: Desde 769px hasta 1024px\n\
	● <property style="width: 24px;">lg</property>: Desde 1025px hasta 1366px\n\
	● <property style="width: 24px;">xl</property>: Desde 1367px hasta 1920px',
		example: 'it.flexbox({\n\
	resolutions = [\n\
		{ name: "xs", maxWidth: 480 },\n\
		{ name: "sm", maxWidth: 768 },\n\
		{ name: "md", maxWidth: 1024 },\n\
		{ name: "lg", maxWidth: 1366 },\n\
		{ name: "xl", maxWidth: 1920 }\n\
	]\n\
});\n\
\n\
// El siguiente ejemplo define un ancho igual en todas las celdas para las resoluciones que estén dentro de los límites marcados por los prefijos <property>sm</property> y <property>xl</property>, un ancho del 25% para las resoluciones que estén dentro de los límites marcados por los prefijos <property>md</property> y <property>lg</property>, y un ancho del 100% para las resoluciones que estén dentro de los límites marcados por el prefijo <property>xs</property>.\n\
&lt;div class="flexbox">\n\
	&lt;div class="row">\n\
		&lt;div class="col xs-100 md-25 lg-25"> A &lt;/div>\n\
		&lt;div class="col xs-100 md-25 lg-25"> B &lt;/div>\n\
		&lt;div class="col xs-100 md-25 lg-25"> C &lt;/div>\n\
	&lt;/div>\n\
&lt;/div>'
	},
	stylesheet:{
		type: 'boolean',
		description: 'Indica al componente si las reglas CSS necesarias para su utilización están en una hoja de estilos aparte. Por defecto, su valor es <property>false</property>, lo que significa que el componente añadirá todas las reglas CSS necesarias durante el proceso de carga, pero, que podrán ser sobreescritas por otras reglas CSS con igual selector dentro de las hojas de estilo definidas en la actual página web.',
		example: 'it.flexbox({ stylesheet: true });'
	}
}

/**
   GetBrowser Helper						
   @version: 1.1		
   @author: Pablo E. Fernández (islavisual@gmail.com).
   @Copyright 2017-2021 Islavisual.
   @Last update: 27/01/2019
 **/
WikiHelper.Getbrowser = {
	general: {
		version: '1.1',
		name: 'GetBrowser',
		description: "Intenta determinar las capacidades del navegador del usuario a través de la información del navegador que contiene el navegador de objetos de JavaScript.",
	},
	additional: [
		{
			description: 'Para recuperar el nombre del navegador:',
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

/**
   GetParam Helper						
   @version: 1.1		
   @author: Pablo E. Fernández (islavisual@gmail.com).
   @Copyright 2017-2021 Islavisual.
   @Last update: 13/03/2019
 **/
WikiHelper.Getparam = {
	general: {
		version: '1.1',
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

/**
   HttpRequest Helper						
   @version: 2.0		
   @author: Pablo E. Fernández (islavisual@gmail.com).
   @Copyright 2017-2021 Islavisual.
   @Last update: 27/02/2019
 **/
WikiHelper.Httprequest = {
	general: {
		version: '2.0',
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
		description: 'Tipo de contenido de los datos recibidos. Por defecto, este atributo es <b>application/x-www-form-urlencoded</b>.\nLos valores más comunes son:\n\t● <b>application/x-www-form-urlencoded</b> (responsiveType debe ser "text")\n\t● <b>text/html; charset=utf-8</b> (responsiveType debe ser "text")\n\t● <b>application/json; charset=utf-8</b> (responsiveType debe ser "json")\n\t● <b>application/octet-stream</b> (responsiveType debe ser "blob")\n\t● <b>application/pdf</b> (responsiveType debería ser "blob")',
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

/**
   Include Helper						
   @version: 1.3
   @author: Pablo E. Fernández (islavisual@gmail.com).
   @Copyright 2017-2021 Islavisual.
   @Last update: 12/05/2020
 **/
WikiHelper.Include = {
	general: {
		version: '1.3',
		name: 'Include',
		description: 'Plugin para insertar código HTML dentro de un contenedor. La carga de archivos se realiza a través de Ajax en modo asíncrono y con método POST.\n\
<name><b>NOTA</b>: En cuanto se detecte que este componente está cargado, se incluirán automáticamente todos los archivos indicados por la propiedad <property>auto-include</property>. En otras palabras, es como si se llamará automáticamente a la siguiente instrucción:</name>\n\
<code><name>Include(</name>{ attribute: <str>"auto-include"</str> });</code>',

	},
	data: {
		type: 'string',
		description: 'El código HTML/texto a insertar.',
		example: '//Supongamos un elemento de caja <property>DIV</property>, el cual tiene el <property>id</property> igual a <property>target</property>.\n\
// Si deseásemos incluir un HTML a modo de texto plano, podríamos hacer:\n\
it("#target").include({\n\
	data: \'\n\
	&lt;section class="container">\\\n\
		&lt;article id="art_01">\\\n\
			...\\\n\
		&lt;/article>\\\n\
	&lt;/section>\'\n});'
	},
	file: {
		type: 'string',
		description: 'URL del archivo a insertar en el elemento contenedor.',
		example: '//Supongamos un elemento de caja <property>DIV</property>, el cual tiene el <property>id</property> igual a <property>target</property>.\n\
// Si deseásemos incluir el contenido del archivo "profile.html" que está en la carpeta "customers", podríamos hacer:\n\
it("#target").include({ file: "./customers/profile.html" });'
	},
	attribute: {
		type: 'string',
		description: 'Indica qué atributo de datos personalizado HTML se utilizará para recuperar la URL que incluirá datos dentro de capas de contenedor (generalmente DIV, SECCIÓN, ARTÍCULO,...).',
		example: '// Supongamos el siguiente código fuente en el que se establece el atributo <property>data-include<property>\n\
&lt;div>\n\
	&lt;div class="container" data-include="./profileCard.html">&lt;/div>\n\
	&lt;div class="container" data-include="./historical.html">&lt;/div>\n\
&lt;/div>\n\
// Para realizar la acción de incluir el HTML de los archivos indicados ateriormente, bastaría con ejecutar:\n\
Include({ attribute: "data-include" });'
	},
	callback: {
		type: 'function',
		description: 'Devuelve el control a la función indicada tras el proceso de inclusión. Esto es útil cuando se desea insertar dinámicamente un archivo detrás de otro en un orden preestablecido.',
		example: '//Supongamos un elemento de caja <property>DIV</property>, el cual tiene el <property>id</property> igual a <property>target</property>.\n\
// Si deseásemos incluir el contenido del archivo "profile.html" que está en la carpeta "customers" y, cuándo esté cargado e insertado, mostrar un mensaje, podríamos hacer:\n\
it("#target").include({\n\
	file: "./customers/profile.html",\n\
	callback: loadedFile\n\
});\n\
\n\
function loadedFile(){\n\
	console.log("fichero incrustado!");\n\
}'
	},
}

/**
	 IntelliForm functionality
	 @version: 1.00
	 @author: Pablo E. Fernández (islavisual@gmail.com).
	 @Copyright 2017-2021 Islavisual.
	 @Last update: 19/03/2019
 **/
WikiHelper.Intelliform = {
	general: {
		version: '1.0',
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

/**
   IsMobile Helper						
   @version: 1.00		
   @author: Pablo E. Fernández (islavisual@gmail.com).
   @Copyright 2017-2021 Islavisual.
   @Last update: 11/03/2019
 **/
WikiHelper.Ismobile = {
	general: {
		version: '1.0',
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

/**
   Language Helper						
   @version: 1.00		
   @author: Pablo E. Fernández (islavisual@gmail.com).
   @Copyright 2017-2021 Islavisual.
   @Last update: 31/03/2019
 **/
WikiHelper.Language = {
	general: {
		version: '1.0',
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

/**
	 Masking functionality
	 @version: 1.1.2
	 @author: Pablo E. Fernández (islavisual@gmail.com).
	 @Copyright 2017-2021 Islavisual.
	 @Last update: 07/05/2020
 **/
WikiHelper.Mask = {
	general: {
		version: '1.1.2',
		name: 'Mask',
		help: 1,
		description: 'Herramienta para generar máscaras de entrada en campos de texto que ayuda a los usuarios a introducir valores correctos.'
	},
	Mask: {
		type: 'function',
		description: 'Indica el formato para la introducción del campo. Las posibles máscaras son:\n\t● <b>9</b>: Para indicar que sólo se aceptarán números del 0-9.\n\t● <b>A</b>: Para indicar que sólo se aceptarán caracteres alfanuméricos de la A-Z.\n\t● <b>#</b>: Para indicar que sólo se aceptará cualquier caracter.\n\t● <b>DD, MM e YYYY</b>: Para indicar formatos de tipo fecha. En general se utilizan los formatos DD-MM-YYYY (Little Endian), MM-DD-YYYY (Meddium Endian) y YYYY-MM-DD (Big Endian)\n\t● <b>HH, II e SS</b>: Para indicar formatos de tipo hora.',
		example: '// Definir una máscara de tipo fecha\n\
it("#date").mask("YYYY-MM-DD");\n\
\n\
// Definir una máscara de tipo tiempo con horas y minutos únicamente\n\
it(".time").mask("HH:II");\n\
\n\
// Definir una máscara de tipo tiempo con sustitución posterior de uno de sus atributos, en este caso, <property>placeholder</property>\n\
it(hour).mask("HH:II:SS").setAttribute("placeholder", "HH:MM:SS");\n\
\n\
// Definir una máscara de tipo teléfono\n\
it("#phone, #telefono").mask("(+99)-999-999-999");\n\
\n\
// Definir una máscara de tipo especial o compleja\n\
it("#code").mask("99A-99#A-####-999A");'
	},
}

/**
   Slider Helper						
   @version: 2.0		
   @author: Pablo E. Fernández (islavisual@gmail.com).
   @Copyright 2017-2021 Islavisual.
   @Last update: 08/04/2021
 **/
WikiHelper.Slider = {
	general: {
		version: '2.0',
		name: 'Slider',
		help: 1,
		description: 'Este componente permite crear sliders con múltiples valores. Si se selecciona el tipo "switch", el componente se comportará como un interruptor. Si se selecciona el tipo "range", el componente se comportará como un selector de múltiples valores "range" de HTML5.\n\
<name><bool>NOTA</bool>: Si se desean consultar las recomendaciones sobre la accesibilidad y los sliders, se puede visitar la URL https://www.w3.org/TR/wai-aria-practices/examples/slider/multithumb-slider.html</name>',
	},
	additional: [
		{
			description: 'Personalizar los estilos a través de las reglas CSS. Por ejemplo:',
			example: '_CSS_\n\
// Reglas CSS a incluir en tu hoja de estilos\n\
it-slider { display: block; width: 100%;}\n\
\n\
// Estilos para un Slider de tipo SWITCH\n\
it-slider[type="switch"]                               { background: linear-gradient(rgba(0, 0, 0, 0.06) 0%, rgba(0, 0, 0, 0) 100%); border-radius: 0px; display: inline-block; height: 24px; padding: 3px; position: relative; vertical-align: top; width: 200px; max-width: inherit; margin: 0px; top: 0px; }\n\
it-slider[type="switch"] input                         { cursor: pointer; width: calc(100% - 6px); left: 3px; opacity: 0; position: absolute; top: 3px; z-index: 1; height: 100% !important; }\n\
it-slider[type="switch"] label                         { color: rgb(0, 0, 0); background: none 0px 0px repeat scroll rgb(223, 223, 223); box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 2px inset, rgba(0, 0, 0, 0.5) 0px 0px 2px inset; display: block; font-size: 10px; height: inherit; position: relative; text-transform: uppercase; transition: all 0.15s ease-out 0s; }\n\
it-slider[type="switch"] label::before,\n\
it-slider[type="switch"] label::after   { font-size: 12px; line-height: 110%; margin-top: -0.5em; position: absolute; top: 50%; transition: inherit; }\n\
it-slider[type="switch"] label::before                 { color: rgb(0, 0, 0); content: attr(data-off); right: 7px; }\n\
it-slider[type="switch"] label::after                  { color: rgb(0, 0, 0); content: attr(data-on); left: 7px; opacity: 0; }\n\
it-slider[type="switch"] input ~ label                 { box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 2px inset, rgba(0, 0, 0, 0.2) 0px 0px 3px inset; border-radius: 0px; margin: 0px; padding: 0px; }\n\
it-slider[type="switch"] input:checked ~ label::before { opacity: 0; }\n\
it-slider[type="switch"] input:checked ~ label::after  { opacity: 1; }\n\
it-slider[type="switch"] handle                        { background: linear-gradient(rgb(255, 255, 255) 0%, rgb(223, 223, 223) 100%); border: 1px solid rgba(0, 0, 0, 0.2); height: 100%; left: 3px; position: absolute; top: 3px; transition: left 0.15s ease-out 0s; width: 50%; border-radius: 0px; }\n\
it-slider[type="switch"] handle::before                { background: linear-gradient(rgb(223, 223, 223) 0%, rgb(255, 255, 255) 100%); border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.02) 0px 1px inset; content: ""; height: 12px; left: 50%; margin: -6px 0px 0px -6px; position: absolute; top: 50%; width: 12px; }\n\
it-slider[type="switch"] input:checked ~ handle        { left: calc(50% - 3px); }\n\
\n\
// Estilos para un Slider de tipo RANGE\n\
it-slider[type=range] values{ width: 100%; display: table; height: auto; }\n\
it-slider[type=range] values span{ color: " + this.config.colors.textColor + "; width: calc(100% / 3); text-align: center; float: left; margin-top: 5px; cursor: pointer; }\n\
it-slider[type=range] values span:first-child{ text-align: left; }\n\
it-slider[type=range] values span:last-child{ text-align: right; }\n\
it-slider[type=range] values span.selected{ font-weight: 600; }\n\
it-slider[type=range] input[type=range]{ position:relative; -o-appearance: none; -ms-appearance: none; -moz-appearance: none; -webkit-appearance: none; appearance: none; margin: 18px 0; width: 100%; outline: none; }\n\
it-slider[type=range] input[type=range]:focus{ border: 0 none !important; outline: none; background: transparent !important; }\n\
it-slider[type=range] input[type=range]::-webkit-slider-runnable-track{ width: 100%; height: 8.4px; cursor: pointer; background: #F0F0F0; border: 0.2px solid #E8E8E8; border-radius: 0; }\n\
it-slider[type=range] input[type=range]::-webkit-slider-thumb{ border: 1px solid #EAEAEA; height: 24px; width: 24px; background: #FFFFFF; cursor: pointer; -webkit-appearance: none; margin-top: -8px; border-radius: 0; }\n\
it-slider[type=range] input[type=range]:focus::-webkit-slider-runnable-track{ background: #FFFFFF; border: 0 none !important; }\n\
it-slider[type=range] input[type=range]::-moz-range-track{ width: 100%; height: 8.4px; cursor: pointer; background: #F0F0F0; border: 0.2px solid #E8E8E8; border-radius: 0; }\n\
it-slider[type=range] input[type=range]::-moz-range-thumb{ border: 1px solid #EAEAEA; height: 24px; width: 24px; background: #FFFFFF; cursor: pointer; border-radius: 0; }\n\
it-slider[type=range] input[type=range]::-ms-track{ width: 100%; height: 8.4px; cursor: pointer; background: rgba(0,0,0,0); border-color: #F0F0F0; border-width: 0; color: transparent; border-radius: 0; }\n\
it-slider[type=range] input[type=range]::-ms-fill-lower{ background: #F0F0F0; border: 0.2px solid #E8E8E8; }\n\
it-slider[type=range] input[type=range]::-ms-fill-upper{ background: #F0F0F0; border: 0.2px solid #E8E8E8; }\n\
it-slider[type=range] input[type=range]::-ms-thumb{ border: 1px solid #EAEAEA; height: 24px; width: 24px; background: #FFFFFF; cursor: pointer; border-radius: 0; }\n\
it-slider[type=range] input[type=range]:focus::-ms-fill-lower{ background: #FFFFFF; border: 0 none !important; }\n\
it-slider[type=range] input[type=range]:focus::-ms-fill-upper{ background: #FFFFFF; border: 0 none !important; }\n\
it-slider[type=range] input[type=range]::-ms-tooltip{ display: none; }\n\
@media all and (-ms-high-contrast:none){ it-slider[type=range] { position:relative; top: 6px; } it-slider[type=range] input[type=range]{ margin: 0 0 10px 0; padding: 0; height: 24px; } it-slider[type=range] input[type=range]:focus { background: rgba(0,0,0,0) !important; } }\n\_CSS_'
		}
	],
	autoDraw: {
		type: 'function',
		description: 'Permite definir etiquetas NSTATE para generar los componentes de Switch o Slider. Es útil cuando se quieren generar los componentes en tiempo de ejecución.\n\
<name>NOTA: Este método se ejecuta automáticamente al cargar la página si el componenente está precargado. </name>',
		exampleSwitch: '// Definición de un Switch bajo HTML5\n\
&lt;it-slider\n\
	id="switch1"\n\
	type="switch"\n\
	label-on="On"\n\
	label-off="Off"\n\
	checked="true"\n\
	background="#ffffff"\n\
	text-color="#000000"\n\
	track-color="#f0f0f0"\n\
	style="width: 200px;"\n\
	onclick="console.log(\'cambiado!\')">\n\
&lt;/it-slider>',
		exampleRange: '// Definición de un slider bajo HTML5\n\
&lt;it-slider\n\
	id="subtipo"\n\
	type="range"\n\
	values="Moto:0, Coche:1, Quad:2"\n\
	selected="2"\n\
	background="#226699"\n\
	text-color="#000000"\n\
	track-color="#f0f0f0"\n\
	style="display: inline-block; width: calc(100% - 128px);">\n\
&lt;/it-slider>'
	},
	id: {
		type: 'string',
		description: 'Permite asignar y operar con todas las capas necesarias para generar el componente. Sólo si estamos si se está definiendo a través de una etiqueta NSTATE dentro de un documento web.',
		exampleSwitch: '// Definición de un Switch bajo HTML5\n\
&lt;it-slider\n\
	id="switch1"\n\
	type="switch"\n\
	label-on="On"\n\
	label-off="Off"\n\
	checked="true">\n\
&lt;/it-slider>\n',
		exampleRange: '// Definición de un slider bajo HTML5\n\
&lt;it-slider\n\
	id="subtipo"\n\
	type="range"\n\
	values="Moto:0, Coche:1, Quad:2"\n\
	selected="2">\n\
&lt;/it-slider>'
	},
	type: {
		type: 'string',
		description: 'Permite definir el tipo de slider. Sus posibles valores son "switch" o "range"',
		exampleSwitch: '// Definición básica de un switch\n\
it("#activado").slider(({\n\
	type: "switch"\n\
	labelOn: "Sí",\n\
	labelOff: "No"\n\
});',
		exampleRange: '// Definición básica de un selector múltiple\n\
it("#nivel").slider({\n\
	type: "range",\n\
	values:[\n\
		{label: "Bajo", value: 0},\n\
		{label: "Medio", value: 1},\n\
		{label: "Alto", value: 2}\n\
	],\n\
});'
	},
	labelOn: {
		type: 'string',
		description: 'Permite definir el valor de un switch cuando está activado.',
		exampleSwitch: 'it("#mode").slider(({\n\
	type: "switch"\n\
	labelOn: "Lectura",\n\
	labelOff: "Escritura"\n\
});',
	},
	labelOff: {
		type: 'string',
		description: 'Permite definir el valor de un switch cuando está desactivado.',
		exampleSwitch: 'it("#mode").slider(({\n\
	type: "switch"\n\
	labelOn: "Lectura",\n\
	labelOff: "Escritura"\n\
});',
	},
	colors: {
		type: 'object',
		description: 'Permite definir o especificar los colores que se utilizarán para crear el slider, tanto binario o de tipo switch, como múltiple o de tipo rango.',
		exampleSwitch: '// Definición de un slider de tipo switch con colores personallizados mediante JavaScript\n\
it("#activado").slider({\n\
	type: "switch",\n\
	labelOn: "Sí",\n\
	labelOff: "No",\n\
	checked: false,\n\
	colors: {\n\
		background: "#fff",\n\
		extColor: "#000",\n\
		trackColor: "#f0f0f0"\n\
	}\n\
});\n\
\n\
// Definición de un slider de tipo switch con colores personallizados mediante HTML5\n\
&lt;it-slider\n\
	id="activado"\n\
	type="switch"\n\
	label-on="Sí"\n\
	label-off="No"\n\
	checked="false"\n\
	background="#fff"\n\
	text-color="#000"\n\
	track-color="#f0f0f0">\n\
&lt;/it-slider>',
		exampleRange: '// Definición de un slider de tipo rango con colores personallizados mediante JavaScript\n\
it("#nivel").slider.set({\n\
	type: "range",\n\
	values:[\n\
		{label: "Bajo", value: 0},\n\
		{label: "Medio", value: 1},\n\
		{label: "Alto", value: 2}\n\
	],\n\
	selected: 1,\n\
	colors: {\n\
		background: "#fff",\n\
		textColor: "#000",\n\
		trackColor: "#f0f0f0"\n\
	}\n\
});\n\
\n\
// Definición de un slider de tipo switch con colores personallizados mediante HTML5\n\
&lt;it-slider\n\
	id="nivel"\n\
	type="range"\n\
	values="Bajo:0, Medio:1, Alto:2"\n\
	selected="1"\n\
	background="#fff"\n\
	text-color="#000"\n\
	track-color="#f0f0f0">\n\
&lt;/it-slider>'
	},
	checked: {
		type: 'boolean',
		description: 'Permite definir si el switch, o slider binario, está activado o chequeado.',
		exampleSwitch: '// Definición de un slider de tipo switch con la opción de chequeado mediante JavaScript\n\
it("#interruptor").slider({\n\
	type: "switch",\n\
	labelOn: "Encendido",\n\
	labelOff: "Apagado",\n\
	checked: true,\n\
});\n\
\n\
// Definición de un slider de tipo switch con la opción de chequeado mediante HTML5\n\
&lt;it-slider\n\
	id="interruptor"\n\
	type="switch"\n\
	label-on="Encendido"\n\
	label-off="Apagado"\n\
	checked="true"\n\
&lt;/it-slider>',
	},
	selected: {
		type: 'string',
		description: 'Permite definir el valor u opción activada del selector de tipo rango.',
		exampleSwitch: '// Definición de un slider de tipo rango de tres valores con la última opción seleccionada mediante JavaScript\n\
it("#nivel").slider.set({\n\
	type: "range",\n\
	values:[\n\
		{label: "Bajo", value: 0},\n\
		{label: "Medio", value: 1},\n\
		{label: "Alto", value: 2}\n\
	],\n\
	selected: 2,\n\
});\n\
\n\
// Definición de un slider de tipo rango de tres valores con la última opción seleccionada mediante HTML5\n\
&lt;it-slider\n\
	id="nivel"\n\
	type="range"\n\
	values="Bajo:0, Medio:1, Alto:2"\n\
	selected="2"\n\
&lt;/it-slider>',
	},
	values: {
		type: 'object',
		description: 'Permite definir los valores del slider.',
		exampleRange: '// Definición de un slider de tipo rango mediante JavaScript\n\
it("#valoracion").slider({\n\
	type: "range",\n\
	values:[\n\
		{label: "Muy Mala", value: 0}\n\
		{label: "Mala", value: 1},\n\
		{label: "Media", value: 2},\n\
		{label: "Buena", value: 3}\n\
		{label: "Muy Buena", value: 4}\n\
	],\n\
});\n\
\n\
// Definición de un slider de tipo rango mediante HTML5\n\
&lt;it-slider\n\
	id="valoracion"\n\
	type="range"\n\
	values="Muy Mala:0, Mala:1, Media:2, Buena:3, Muy Buena: 4">\n\
&lt;/it-slider>'
	},
	style: {
		type: 'string',
		description: 'Permite asignar al elemento padre del componente (etiqueta NSTATE) unos estilos en línea.',
		exampleSwitch: '// Definición de un Switch bajo HTML5\n\
&lt;it-slider\n\
	id="switch1"\n\
	type="switch"\n\
	label-on="On"\n\
	label-off="Off"\n\
	style="margin-top 30px">\n\
&lt;/it-slider>\n',
		exampleRange: '// Definición de un slider bajo HTML5\n\
&lt;it-slider\n\
	id="subtipo"\n\
	type="range"\n\
	values="Moto:0, Coche:1, Quad:2"\n\
	style="margin-top 30px">\n\
&lt;/it-slider>'
	},
	stylesheet:{
		type: 'boolean',
		description: 'Indica al componente si las reglas CSS necesarias para su utilización están en una hoja de estilos aparte. Por defecto, su valor es <property>false</property>, lo que significa que el componente añadirá todas las reglas CSS necesarias durante el proceso de carga, pero, que podrán ser sobreescritas por otras reglas CSS con igual selector dentro de las hojas de estilo definidas en la actual página web.',
		exampleSwitch: '// Definición de un Switch bajo HTML5\n\
&lt;it-slider\n\
	id="switch1"\n\
	type="switch"\n\
	label-on="On"\n\
	label-off="Off"\n\
	style="margin-top 30px"\n\
	stylesheet="true">\n\
&lt;/it-slider>\n\
\n\
// Definición de un slider de tipo switch con colores personallizados mediante JavaScript\n\
it("#activado").slider({\n\
	type: "switch",\n\
	labelOn: "Sí",\n\
	labelOff: "No",\n\
	checked: false,\n\
	colors: {\n\
		background: "#fff",\n\
		extColor: "#000",\n\
		trackColor: "#f0f0f0"\n\
	},\n\
	stylesheet: true\n\
});\n',
		exampleRange: '// Definición de un slider bajo HTML5\n\
&lt;it-slider\n\
	id="subtipo"\n\
	type="range"\n\
	values="Moto:0, Coche:1, Quad:2"\n\
	style="margin-top 30px"\n\
	stylesheet="true">\n\
&lt;/it-slider>\n\
\n\
// Definición de un slider de tipo rango mediante JavaScript\n\
it("#valoracion").slider({\n\
	type: "range",\n\
	values:[\n\
		{label: "Muy Mala", value: 0}\n\
		{label: "Mala", value: 1},\n\
		{label: "Media", value: 2},\n\
		{label: "Buena", value: 3}\n\
		{label: "Muy Buena", value: 4}\n\
	],\n\
	stylesheet: true\n\
});'
	}
}

/**
	Password tools
	@version: 2.0
	@author: Pablo E. Fernández (islavisual@gmail.com).
	@Copyright 2017-2021 Islavisual.
	@Last update: 08/04/2021
**/
WikiHelper.Password = {
	general: {
		version: '2.0',
		help: 1,
		name: 'Password',
		description: 'Este componente es una herramienta que ofrece la posibilidad de administrar la creación de contraseñas y sus fortalezas. Permite definir la longitud y el número mínimo de mayúsculas, minúsculas, números y caracteres especiales para enviar / guardar la contraseña. Además, posee un sistema de detección y penalización por consecución de minúsculas, mayúsculas y dígitos consecutivos o la repeción de tres o más veces sobre un mismo carácter.\n\
\n\
// En todos los siguientes casos supondremos que tenemos un elemento o código como el siguiente:\n\
<code>\
<name>&lt;input</name> <field>id=<str>"pwd"</str></field> <field>name=<str>"pwd"</str></field> <field>type=<str>"password"</str></field> <field>maxlength=<str>"50"</str></field> <field>autocomplete=<str>"off"</str></field> <name>/></name>\
</code>',
	},
	additional: [
		{
			description: 'Conocer la complejidad de la contraseña introducida:',
			example: 'it.password.config.features.complexity;'
		},
		{
			description: 'Saber si se cumplen los requisitos mínimos para poder enviar/guardar la contraseña:',
			example: 'it.password.config.features.allowed;'
		},
		{
			description: 'Cambiar el idioma y gran cantidad de opciones a través del objeto <name>config</name>:',
			example: 'it.password.config = {\n\
autocheck: false,\n\
autodraw: true,\n\
colorok : "rgba(255,255,255,0.75)",\n\
colornok : "#e0e0e0",\n\
confirmby: null,\n\
features: { allowed: false, complexity: 0, extra: 0, length: 0, lowers: 0, numbers: 0, special: 0, uppers: 0 },\n\
minfeatures: { length: 6, uppers:1, lowers: 1, numbers: 1, special: 1, extra: 10 },\n\
minfeaturesLang: { \n\
	minfeatures: "Debe tener al menos",\n\
	length: "Longitud",\n\
	uppers: "Mayúsculas",\n\
	lowers: "Minúsculas",\n\
	numbers: "Números",\n\
	special: "Especiales"\n\
},\n\
onerror: null,\n\
messages: {\n\
	confirm_empty: "El campo de contraseña de confirmación no puede estar vacío",\n\
	empty: "La contraseña está vacía",\n\
	not_allowed: "Contraseña no permitida.",\n\
	not_length: "Contraseña no tiene la longitud requerida",\n\
	not_match: "Las contraseñas no coinciden"\n\
},\n\
text: "Introducción de la contraseña2,\n\
textconfirm: "Confirmación de la contraseña",\n\
placeholder: "Contraseña",\n\
placeholderconfirm: "Confirmar contraseña",\n\
showbutton: false,\n\
showicon: "la la-eye",\n\
}'
		},
		{
			description: 'Personalización de los estilos a través de las reglas CSS. Por ejemplo:',
			example: '// Password crea los estilos en tiempo de ejecución de manera automática, pero es posible añadirlos a la hoja de estilos principal para modificarlos como se deseen.\n\
_CSS_\n\
.it-password-layer { position: relative; }\n\
.it-password-meters { width: calc(100% - 3px); height: 6px; position: absolute; top: 3px; left: 2px; z-index: 99; padding: 0px; border: 0px none; margin: 0px 0px 5px; display: none; }\n\
.it-password-meters > div { background: rgba(255, 255, 255, 0.1); width: calc(16.667% - 1px); float: left; height: 5px; padding: 0px; margin: 0px 1px 0px 0px; position: relative; }\n\
.it-password-meters.not-draw { display: none !important; }\n\
.it-password-meters > div.spotlight { background: rgba(255, 255, 255, 1); }\n\
.it-password-layer input:focus ~ .it-password-meters { background: rgba(0, 0, 0, 1); display: block; }\n\
.it-password-layer .it-password-messages { padding: 5px; display: block; background: rgba(205, 5, 60, 1); border: 1px solid rgba(0, 0, 0, 0.1); margin: 5px 0px; font-size: 1em; font-weight: 600; }\n\
.it-password-layer .it-password-messages:empty { height: 0px; padding: 0px; border: 0px none; width: 100%; }\n\
.it-password-layer .it-password-show-button { position: absolute; top: 0px; right: 0px; background: transparent; border: 0px none; color: rgba(0, 0, 0, 1); width: 32px; height: 28px; z-index: 2; }\n\
.it-password-layer .it-password-show-button i { pointer-events: none; color: rgba(0, 0, 0, 1) !important; }\n\
_CSS_'
		}
	],
	autocheck: {
		type: 'boolean',
		description: 'Permite activar la comprobación automática de la contraseña en cada pulsación o entrada de datos.',
		example:'it("#pwd").password({\n\
autocheck: false,\n\
})'
	},
	autodraw: {
		type: 'boolean',
		description: 'Permite activar o desactivar la capa que muestra gráficamente la fortaleza de la contraseña',
		example:'it("#pwd").password({\n\
autodraw: false,\n\
})'
	},
	check: {
		type: 'function',
		description: 'Permite comprobar la seguridad de la contraseña. Puede definir la longitud mínima y el número mínimo de mayúsculas, minúsculas, números y caracteres especiales para enviar / guardar la contraseña. Además, puede definir los colores utilizados para indicar cuándo la contraseña es correcta y cuándo no.',
		example: '// Para este ejemplo, primero se debe añadir un evento onkeyup en el INPUT propuesto al principio de este documento de ayuda\n\
<name>&lt;input</name>\n\
<field>id=<str>"pwd"</str></field>\n\
<field>name=<str>"pwd"</str></field>\n\
<field>type=<str>"password"</str></field>\n\
<field>maxlength=<str>"50"</str></field>\n\
<field>autocomplete=<str>"off"</str></field>\n\
<field>onkeyup=<str>"it.password.check(this);"</str></field>'
	},
	confirmby: {
		type: 'string',
		description: 'Permite añadir un segundo elemento de contraseña para poder realizar la accción de confirmación de contraseñas.',
		example: 'it("#pwd").password({\n\
autocheck: false,\n\
autodraw: false,\n\
colorok: "#fff",\n\
colornok: "#000",\n\
confirmby: "pwdc"\n\
showbutton: true,\n\
showicon: "la la-eye",\n\
});'
	},
	colornok: {
		type: 'string',
		description: 'Permite establecer el color de la barra de fortaleza que indica que no cumple el nivel de seguridad. Por defecto, hay seis niveles de complejidad. Cada vez que se cumpla un criterio concreto, se sumará uno al nivel de complejidad, lo que indicará si la contraseña es o no fácil de reconocer o descubrir.',
		example:'it("#pwd").password({\n\
autocheck: false,\n\
autodraw: false,\n\
colorok: "#fff",\n\
colornok: "#000",\n\
showbutton: true,\n\
showicon: "la la-eye",\n\
});'
	},
	colorok: {
		type: 'string',
		description: 'Permite establecer el color de la barra de fortaleza que indica que cumple el nivel de seguridad. Por defecto, hay seis niveles de complejidad. Cada vez que se cumpla un criterio concreto, se sumará uno al nivel de complejidad, lo que indicará si la contraseña es o no fácil de reconocer o descubrir.',
		example:'it("#pwd").password({\n\
autocheck: false,\n\
autodraw: false,\n\
colorok: "#fff",\n\
colornok: "#000",\n\
showbutton: true,\n\
showicon: "la la-eye",\n\
});'
	},
	generate: {
		type: 'function',
		description: 'Permite crear una contraseña aleatoria de una longitud concreta que cumpla los requisitos mínimos.',
		example: 'it.password.generate(8);'
	},
	getError: {
		type: 'function',
		description: 'Permite comprobar si se ha producido algún error de validación en el campo de texto asociado a la contraseña. Si la función setError está establecida, se enviará el resultado de la evaluación a la función asociada.',
		example: 'it.password.getError();\n\
// Esto podría mostrar abajo del campo de contraseña un mensaje como:\n\
// "Contraseña no permitida. Debe tener al menos longitud 6, 1 mayúsculas, 1 minúsculas, 1 números, 1 especiales."'
	},
	showbutton: {
		type: 'boolean',
		description: 'Permite establecer un botón para que se pueda mostrar la contraseña. Por defecto, la contraseña aparecerá como puntos o asteriscos. Si se pulsa este botón el elemento de entrada de datos asociado se tranformará en un elemento de entrada de datos de texto, mostrando así, su contenido.\n\
<name><bool>NOTA</bool>: Este parámetro está asociado al parámetro <property>showicon</property>, el cual indica el icono a utilizar.',
		example:'it("#pwd").password({\n\
colorok: "#fff",\n\
colornok: "#0a3263",\n\
showbutton: true,\n\
showicon: "icon eye",\n\
});'
	},
	showicon: {
		type: 'string',
		description: 'Permite establecer el icono asociado al botón de mostrar la contraseña referenciado por el parámetro <property>showbutton</property>. Por defecto, este icono está establecido a <property>fa fa-eye</property>.',
		example:'it("#pwd").password({\n\
colorok: "#fff",\n\
colornok: "#0a3263",\n\
showbutton: true,\n\
showicon: "la la-eye",\n\
});'
	},
	stylesheet:{
		type: 'boolean',
		description: 'Indica al componente si las reglas CSS necesarias para su utilización están en una hoja de estilos aparte. Por defecto, su valor es <property>false</property>, lo que significa que el componente añadirá todas las reglas CSS necesarias durante el proceso de carga, pero, que podrán ser sobreescritas por otras reglas CSS con igual selector dentro de las hojas de estilo definidas en la actual página web.',
		example: 'it("#pwd").password({\n\
	autocheck: false,\n\
	stylesheet: true\n\
	\n\
});'
	}
}

/**
	 Create and send forms in real time.
	 @version: 1.4.2
	 @author: Pablo E. Fernández (islavisual@gmail.com).
	 @Copyright 2017-2021 Islavisual.
	 @Last update: 08/04/2021
 **/
WikiHelper.Selectpicker = {
	general: {
		version: '1.4.2',
		help: 1,
		name: 'Selectpicker',
		description: "Selectpicker es un control de formulario que le permite gestionar una selección como un desplegable propio de HTML5 y que proporciona una capa personalización sencilla de modificar.\n\
<name><bool>NOTA</bool>: Si se desean consultar las recomendaciones sobre la accesibilidad y los combobox o selectpickers, se puede visitar la URL https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.0pattern/combobox-autocomplete-both.html</name>"
	},
	additional: [
		{
			description: 'Habilita la búsqueda dentro del desplegable:',
			example: '// Supposed the next code:\n\
<name>&lt;select</name> <field>id=<str>"months"</str></field> <field>name=<str>"months"</str></field> <field>class=<str>"select-picker"</str></field> <field>data-live-search=<str>"true"</str></field><name>></name>\n\
	<name>&lt;option <field>value=</field><str>"01"</str></field>><str>Enero</str>&lt;/option></name>\n\
	<name>&lt;option <field>value=</field><str>"02"</str></field>><str>Febrero</str>&lt;/option></name>\n\
	<name>&lt;option <field>value=</field><str>"03"</str></field>><str>Marzo</str>&lt;/option></name>\n\
	<name>&lt;option <field>value=</field><str>"04"</str></field>><str>Abril</str>&lt;/option></name>\n\
	<name>&lt;option <field>value=</field><str>"05"</str></field>><str>Mayo</str>&lt;/option></name>\n\
	<name>&lt;option <field>value=</field><str>"06"</str></field>><str>Junio</str>&lt;/option></name>\n\
	<name>&lt;option <field>value=</field><str>"07"</str></field>><str>Julio</str>&lt;/option></name>\n\
	<name>&lt;option <field>value=</field><str>"08"</str></field>><str>Agosto</str>&lt;/option></name>\n\
	<name>&lt;option <field>value=</field><str>"09"</str></field>><str>Septiembre</str>&lt;/option></name>\n\
	<name>&lt;option <field>value=</field><str>"10"</str></field>><str>Octubre</str>&lt;/option></name>\n\
	<name>&lt;option <field>value=</field><str>"11"</str></field>><str>Noviembre</str>&lt;/option></name>\n\
	<name>&lt;option <field>value=</field><str>"12"</str></field>><str>Diciembre</str>&lt;/option></name>\n\
<name>&lt;/select</name>\n\
\n\
// Once set data-live-search to true into select, initialize\n\
Selectpicker.init(".select-picker");'
		},
		{
			description: 'Personaliza el aspecto del Selectpicker a través de CSS:',
			example: '_CSS_\n\
// Reglas CSS a incluir en tu hoja de estilos\n\
.it-select-picker { position: relative; width: 100%; }\n\
.it-select-picker .dropdown-container { list-style: none; background: rgba(255, 255, 255, 1); border: 1px solid rgba(0, 0, 0, 0.1); padding: 0px; position: absolute; top: 30px; width: 100%; z-index: 99999; }\n\
.it-select-picker ul { overflow: auto; max-height: 164px; padding: 0px; list-style: none; margin: 0px; }\n\
.it-select-picker button { background: rgba(255, 255, 255, 1); border: 1px solid rgba(0, 0, 0, 0.1); width: 100%; height: 28px; text-align: left; line-height: 28px; font-weight: 500; position: relative; padding: 0px 10px; }\n\
.it-select-picker button::before { content: ""; display: inline-block; width: 0px; height: 0px; margin-left: 2px; vertical-align: middle; border-top: 4px dashed; border-right: 4px solid transparent; border-left: 4px solid transparent; position: absolute; right: 10px; top: 12px; }\n\
.it-select-picker button:hover { border-color: rgba(0, 0, 0, 0.66); }\n\
.it-select-picker.open button { background: rgba(0, 0, 0, 1); color: rgba(255, 255, 255, 1) !important; box-shadow: 0 0 0 2px rgba(36, 84, 156, 1) inset; }\n\
.it-select-picker li { border-bottom: 1px solid rgba(0, 0, 0, 0.1); color: rgba(0, 0, 0, 1); padding: 4px 5px; line-height: normal; margin: 0px; }\n\
.it-select-picker li:not(.searcher):hover { background: rgba(36, 84, 156, 1); color: rgba(255, 255, 255, 1); cursor: pointer; }\n\
.it-select-picker .searcher { border-bottom: 1px solid rgba(0, 0, 0, 0.1); height: auto; min-height: 28px; padding: 0px; position: relative; width: 100%; }\n\
.it-select-picker .searcher .input-search { border: 0px none; border-radius: 0px; line-height: normal; height: auto; min-height: 26px; padding: 0px 20px 0px 5px; color: rgba(0, 0, 0, 1); width: 100%; z-index: 0; }\n\
.it-select-picker .searcher svg { position: absolute; right: 5px; top: 5px; fill: rgba(0, 0, 0, 0.65); width: 15px; }\n\
.it-select-picker-active { background: rgba(36, 84, 156, 1); color: rgba(255, 255, 255, 1) !important; }\n\
.it-select-picker > button:focus,\n\
select:focus + .it-select-picker > button { border: 1px solid rgba(205, 5, 60, 1); }\n\
.it-select-picker input[type=search]::-ms-clear,\n\
.it-select-picker input[type=search]::-ms-reveal { display: none; width: 0; height: 0; }\n\
.it-select-picker input[type="search"]::-webkit-search-cancel-button { appearance: none; }\n\
_CSS_'
		},
	],
	selectpicker: {
		type: 'function',
		description: 'Crea y establece los componentes de configuración y presentación para los desplegables solicitados.',
		example: 'it(".select-picker").selectpicker();'
	},
	liveSearch: {
		type: 'boolean',
		description: 'Habilita la búsqueda predictiva a través de un campo de texto.',
		example: 'it(".select-picker").selectpicker({ liveSearch: true });'
	},
	stylesheet:{
		type: 'boolean',
		description: 'Indica al componente si las reglas CSS necesarias para su utilización están en una hoja de estilos aparte. Por defecto, su valor es <property>false</property>, lo que significa que el componente añadirá todas las reglas CSS necesarias durante el proceso de carga, pero, que podrán ser sobreescritas por otras reglas CSS con igual selector dentro de las hojas de estilo definidas en la actual página web.',
		example: 'it(".select-picker").selectpicker({ stylesheet: true });'
	}
}

/**
	 Create and send forms in real time.
	 @version: 1.0
	 @author: Pablo E. Fernández (islavisual@gmail.com).
	 @Copyright 2017-2021 Islavisual.
	 @Last update: 11/03/2019
	 @status PENDING to UPDATE
 **/
 WikiHelper.Sendform = {
	general: {
		version: '1.0',
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

/**
   SlideShow Helper
   @version: 1.0
   @author: Pablo E. Fernández (islavisual@gmail.com).
   @Copyright 2017-2021 Islavisual.
   @Last update: 08/04/2021
 **/
   WikiHelper.Slideshow = {
	general: {
		version: '1.0',
		name: 'SlideShow',
		help: 1,
		description: 'Este componente permite presentar un conjunto de imágenes, comunmente denominadas diapositivas que se muestran secuencialmente una detrás de otra. Sólo permite visualizar una única diapositiva a la vez, sin embargo, ofrece la posibilidad de cambiar de diapositiva mediante unos botones que llevan a la anterior, la siguiente o a un número concreto, y la reproducción automática.\n\
\n\
También permite que la presentación cambie automáticamente de siapositiva pasado un tiempo, junto con la posibilidad de que pueda detenerse o reanudarse a través de unos controles de "play" y "stop".\n\
<name><bool>NOTA</bool>: Si se desean consultar las recomendaciones sobre la accesibilidad y los slideshow o carruseles de imágenes, se puede visitar la URL https://www.w3.org/TR/wai-aria-practices/examples/carousel/carousel-1.html</name>\n\
\n\
Para que sea más sencillo de comprender el componente, a partir de ahora, en todos métodos y propiedades supondremos que tenemos un contenedor <property>div</property> compuesto por varios contenedores hijos <property>div.slide</property> que, a su vez, contienen una imagen, un título y un texto.\n\
\n\
<code style="white-space: pre-wrap;">\
<name>&lt;div <field>class=</field><str>"slideshow"</str>></name>\n\
	<name>&lt;div <field>class=</field><str>"slide fade"</str>></name>\n\
		<name>&lt;img <field>src=</field><str>"https://cdn.pixabay.com/photo/2021/02/24/09/51/magical-6046020_960_720.jpg"</str>></name>\n\
		<name>&lt;div <field>class=</field><str>"title"</str>></name>SLOGAN 1<name>&lt;/div></name>\n\
		<name>&lt;div <field>class=</field><str>"text">Texto adicional 1.<name>&lt;/div></name>\n\
	<name>&lt;/div></name>\n\
	<name>&lt;div <field>class=</field><str>"slide fade"</str>></name>\n\
		<name>&lt;img <field>src=</field><str>"https://cdn.pixabay.com/photo/2019/12/29/13/59/trees-4727156_960_720.jpg"</str>></name>\n\
		<name>&lt;div <field>class=</field><str>"title"</str>></name>SLOGAN 2<name>&lt;/div></name>\n\
		<name>&lt;div <field>class=</field><str>"text">Texto adicional 2.<name>&lt;/div></name>\n\
	<name>&lt;/div></name>\n\
	<name>&lt;div <field>class=</field><str>"slide fade"</str>></name>\n\
		<name>&lt;img <field>src=</field><str>"https://cdn.pixabay.com/photo/2017/06/17/10/55/hot-air-balloon-2411851_960_720.jpg"</str>></name>\n\
		<name>&lt;div <field>class=</field><str>"title"</str>></name>SLOGAN 3<name>&lt;/div></name>\n\
		<name>&lt;div <field>class=</field><str>"text">Otro texto adicional.<name>&lt;/div></name>\n\
	<name>&lt;/div></name>\n\
<name>&lt;/div></name>\n\
</code>',
	},
	additional: [
		{
			description: 'Personalizar el idioma a inglés. Por ejemplo:',
			example: 'it.slideShow.language = {\n\
	prev: "Previous Slide",\n\
	next: "Next Slide",\n\
	goto: "Show Slide ",\n\
	start: "Start automatic slide show",\n\
	stop: "Stop automatic slide show",\n\
	title: "Slide show of images",\n\
	slideOf: " of "\n\
}'
		},
		{
			description: 'Personalizar los estilos a través de las reglas CSS. Por ejemplo:',
			example: '_CSS_// Reglas CSS a incluir en tu hoja de estilos\n\
.it-slideshow { max-width: none; position: relative; margin: 0px; padding: 0px; }\n\
.it-slideshow .prev, .it-slideshow .next { cursor: pointer; position: absolute; top: 50%; width: auto; margin-top: -22px; padding: 16px; color: white; font-weight: bold; font-size: 18px; transition: all 0.6s ease 0s; border-radius: 0px 3px 3px 0px; user-select: none; }\n\
.it-slideshow .next { right: 0px; border-radius: 3px 0px 0px 3px; }\n\
.it-slideshow .prev:hover, .it-slideshow .next:hover { background-color: rgba(0, 0, 0, 0.8); }\n\
.it-slideshow .title { color: rgb(255, 255, 255); font-size: 2rem; padding: 8px 12px; position: absolute; bottom: 50%; width: 100%; text-align: center; }\n\
.it-slideshow .text { background: rgba(0, 0, 0, 0.5); color: rgb(242, 242, 242); font-size: 1rem; padding: 8px 12px 22px; position: absolute; bottom: 0px; width: 100%; text-align: center; }\n\
.it-slideshow .slide-id { background-color: rgba(0, 0, 0, 0.8); color: rgb(242, 242, 242); font-size: 0.8rem; padding: 5px 10px; position: absolute; top: 0px; }\n\
.it-slideshow .dots { text-align: center; position: absolute; width: 100%; bottom: 0px; left: 0px; }\n\
.it-slideshow .dot { cursor: pointer; height: 15px; width: 15px; margin: 0px 2px; background-color: rgb(187, 187, 187); border-radius: 50%; display: inline-block; transition: background-color 0.6s ease 0s; }\n\
.it-slideshow .slide { position: absolute; top: 0px; left: 0px; transition: opacity 1s ease-in-out 0s; height: 100%; width: 100%; margin: 0px; padding: 0px; }\n\
.it-slideshow .slide img { max-width: 100%; display: block; object-fit: cover; height: 100%; width: 100%; }\n\
.it-slideshow .active, .dot:hover { background-color: rgb(0, 0, 0); }\n\
.it-slideshow .fade { opacity: 1; }\n\
.it-slideshow .hide { opacity: 0; }\n\
\n\
@keyframes it-slideshow-fade {\
	0% ╚ display: block; opacity: 0; ╗ 1% ╚ opacity: 0; ╗ 100% ╚ opacity: 1; ╗\
}\n\
@keyframes it-slideshow-hide {\
	0% ╚ opacity: 1; ╗ 99% ╚ opacity: 0; ╗ 100% ╚ opacity: 0; display: none; ╗\
}\n\
\n\
.it-slideshow.fullscreen { height: 100vh; width: 100%; }\n\
.it-slideshow .player { position: absolute; top: 5px; right: 5px; font-size: 21px; background: rgba(0, 0, 0, 0.8); border: 1px solid rgba(0, 0, 0, 0.5); color: rgb(255, 255, 255); width: 32px; height: 32px; line-height: 30px; text-align: center; padding: 0px; margin: 0px; }\n\
.it-slideshow.playing .player::before { content: "\\2590\\a0\\258c"; }\n\
.it-slideshow.playing .player { font-size: 12px; }\n\
.it-slideshow.paused .player::before { content: "\\1f782"; }\n\
.it-slideshow.paused .player { font-size: 19px; }\n\
_CSS_'
		}
	],
	autoplay: {
		type: 'boolean',
		description: 'Indica si el slideshow debe o no reproducir de manera automática el avance de slides pasados un determinado número de segundos. Por defecto, está establecido a <property>false</property>. Cabe destacar que la reproducción automática no es una práctica recomendada cuando se desea que las webs sean accesibles.',
		example: 'it(".it-slideshow").slideShow({autoplay: true);'
	},
	fullscreen: {
		type: 'boolean',
		description: 'Indica si el slideshow debe mostrarse a pantalla completa. Esto puede ser útil cuando se desean añadir una presentación de diapositivas al principio de la página ya que las imágenes se mostrarán al 100% del alto y ancho del dispositivo. Por defecto, está establecido a <property>false</property>.',
		example: 'it(".it-slideshow").slideShow({fullscreen: true);'
	},
	player: {
		type: 'boolean',
		description: 'Indica si el slideshow debe o no mostrar el control de reproducción automática. Por defecto, está establecido a <property>false</property>.',
		example: 'it(".it-slideshow").slideShow({player: true);'
	},
	interval: {
		type: 'number',
		description: 'Indica el tiempo que debe transcurrir entre el cambio de una a otra diapositiva. Por defecto, está establecido a 5 segundos, aunque la recomendación es que sea mayor si se desea que tenga una mejor accesibilidad web.',
		example: 'it(".it-slideshow").slideShow({interval: 10);'
	},
	showNumbers: {
		type: 'boolean',
		description: 'Indica si el slideshow debe o no mostrar el número de diapositiva que se está presentando. Por defecto, está establecido a <property>false</property>.',
		example: 'it(".it-slideshow").slideShow({showNumbers: true);'
	},
	stylesheet:{
		type: 'boolean',
		description: 'Indica al componente si las reglas CSS necesarias para su utilización están en una hoja de estilos aparte. Por defecto, su valor es <property>false</property>, lo que significa que el componente añadirá todas las reglas CSS necesarias durante el proceso de carga, pero, que podrán ser sobreescritas por otras reglas CSS con igual selector dentro de las hojas de estilo definidas en la actual página web.',
		example: 'it(".it-slideshow").slideShow({stylesheet: false);'
	},
	width: {
		type: 'string',
		description: 'Indica el ancho que se desea que tenga el slideshow. Por defecto, está establecido a <property>100%</property>.',
		example: 'it(".it-slideshow").slideShow({width: "50%");'
	},
	height: {
		type: 'string',
		description: 'Indica el alto que se desea que tenga el slideshow. Por defecto, está establecido a <property>360px</property>.',
		example: 'it(".it-slideshow").slideShow({height: "250px");'
	},
	title: {
		type: 'string',
		description: 'Indica el texto que describe el contenido de la presentación. Esto es importante si se desea preservar la accesibilidad web ya que le facilita a las herramientas de asistencia de que va la presentación. Por defecto se asigna un texto genérico, el cual, se extrae de las propiedades de lenguaje de la propiedad slideshow.language, comentada más adelante.',
		example: 'it(".it-slideshow").slideShow({title: "Productos destacados de telefonía");'
	},
}

/**
   Sorter Helper						
   @version: 1.2.1
   @author: Pablo E. Fernández (islavisual@gmail.com).
   @Copyright 2017-2021 Islavisual.
   @Last update: 08/04/2021
 **/
WikiHelper.Sorter = {
	general: {
		version: '1.2.1',
		name: 'Sorter',
		description: "Función que permite ordenar tablas por múltiples columnas.\nLa ordenación se realiza de izquierda a derecha, es decir, en una ordenación múltiple, primero se ordenarán las columnas más de la izquierda y se continuará hacia la derecha respetando el orden de las columnas anteiores.",
	},
	additional: [
		{
			description: 'Es posible acceder a la consiguración de la tabla a partir de su ID.',
			example: '// Si suponemos que la tabla tiene el atributo ID asignado a "table01", podríamos acceder mediante:\n\
console.log(it.sorter.config.table01);\n\n\
// Esta instrucción debería mostrar un objeto JSON similar al siguiente:\n\
{\n\
cols: 5,\n\
icons: {sort: "fa la-sort", asc: "fa la-sort-alpha-up", desc: "fa la-sort-alpha-down"}\n\
rows: 25\n\
selector: true\n\
sorting: ["desc", "asc", "", "", ""]\n\
table: table#table01.it-sortable\n\
}'
		},
		{
			description: 'Personaliza el aspecto del componente a través de CSS.',
			example: '_CSS_\n\
			// Reglas CSS a incluir en tu hoja de estilos\n\
.it-sortable th { cursor: pointer; position: relative; }\n\
.it-sortable th .fa.fa-sort { line-height: 24px; position: absolute; top: 3px; right: 5px; font-size: 1em; color: rgba(0, 0, 0, 0.3); width: auto; }\n\
.it-sortable th .fa.fa-sort-alpha-asc { line-height: 24px; position: absolute; top: 4px; right: 5px; font-size: 1em; color: rgba(0, 0, 0, 1); width: auto; }\n\
.it-sortable th .fa.fa-sort-alpha-desc { line-height: 24px; position: absolute; top: 4px; right: 5px; font-size: 1em; color: rgba(0, 0, 0, 1); width: auto; }\n\
.it-sortable-layer { position: relative; }\n\
.it-sortable-layer .it-sortable-label { border: 1px solid rgba(0, 0, 0, 0.2); cursor: pointer; float: right; min-width: auto; height: 28px; text-align: right; line-height: 26px; padding: 0px 25px 0px 5px; margin: 5px 0px; position: relative; z-index: 2; }\n\
.it-sortable-layer .it-sortable-label::before { content: ""; border-style: solid; border-image: initial; border-width: 8px; border-color: rgba(0, 0, 0, 1) transparent transparent; position: absolute; top: 10px; right: 6px; }\n\
.it-sortable-layer .it-sortable-label::after { content: ""; border-style: solid; border-image: initial; border-width: 6px; border-color: rgba(255, 255, 255, 1) transparent transparent; position: absolute; top: 10px; right: 8px; }\n\
.it-sortable-layer .it-sortable-label.open::before { transform: rotate(180deg); top: 0px; }\n\
.it-sortable-layer .it-sortable-label.open::after { transform: rotate(180deg); top: 4px; }\n\
_CSS_'
		},
	],
	columns: {
		type: 'object',
		description: 'Define la ordenación de las columnas. Los posibles tipos son "string", "number", "date" y "enum". Este parámetro es opcional.\n\
Cosas a tener en cuenta:\n\
\t\u2022 Si orderable es false, las propiedades "setto" y "type" no es necesario establecerlas porque serán ignoradas.\n\
\t\u2022 Si no se establece la propiedad ID, se asignará automáticamente a "sorterColN", donde N es el número de columna\n\
\t\u2022 Si no se especifica tipo de ordenación, se asignará como alfanumérica, es decir, de tipo "string".\n\
\t\u2022 Si se especifica la ordenación de tipo fecha (date), se deberá asignar también el formato a través de la propiedad "format".\n\
\t\u2022 Si se especifica la ordenación de tipo numeral (enum), se deberá asignar también el array de datos numerales a través de la propiedad "enum".',
		example: '// Habilitar el componente de ordención para todas las tablas de la página\n\
it("table").sorter(\n\
{\n\
	columns: [\n\
		{id: "c1", orderable: true, setto: "asc", type: "string"},\n\
		{id: "c2", orderable: true, setto: "",    type: "number"},\n\
		{id: "c3", orderable: true,               type: "date", format: "DD-MM-YYYY"},\n\
		{id: "c4", orderable: true,               type: "enum", enum: ["Alto", "Medio", "Bajo"]},\n\
		"",\n\
		{id: "actions", orderable: false}\n\
	]\n\
}\n\
);'
	},
	icons: {
		type: 'object',
		description: 'Define las clases que representarán los iconos de ordenación. Este parámetro es opcional.',
		example: '// Habilitar el componente de ordención para todas las tablas de la página\n\
it("table").sorter({\n\
icons: {\n\
	sort: "fa fa-sort",\n\
	asc: "fa fa-sort-alpha-asc",\n\
	desc: "fa fa-sort-alpha-desc"\n\
}\n\
});\n\
\n\
// Que es lo mismo que el siguiente ejemplo debido a que, los iconos anteriores, son los por defecto.\n\
it("table").sorter();'
	},
	selector: {
		type: 'boolean',
		description: 'Añade un botón que muestra un diálogo con todas las columnas y su orden actual.',
		example: '// Habilitar el selector de columnas para ordenar\n\
it("table").sorter({selector: true});'
	},
	sort: {
		type: 'boolean',
		description: 'Permite ordenar por una columna específica. Requiere de tres parámetros, el número de columna empezando desde CERO, el tipo de ordenación y la tabla donde aplicar la ordenación.',
		example: '// Ordenar la segunda columna de forma ascendente en la tabla con ID "table01"\n\
it.sorter.sort(1, "asc", document.getElementById("table01"));\n\
// Ordenar la cuarta columna de forma descendente en la tabla con ID "table01"\n\
it.sorter.sort(3, "desc", document.getElementById("table01"));\n\
// Dejar la columna de la tabla con ID "table01" como estaba antes de ser ordenada"\n\
it.sorter.sort(3, "none", it.sorter.config.table01);'
	},
	stylesheet:{
		type: 'boolean',
		description: 'Indica al componente si las reglas CSS necesarias para su utilización están en una hoja de estilos aparte. Por defecto, su valor es <property>false</property>, lo que significa que el componente añadirá todas las reglas CSS necesarias durante el proceso de carga, pero, que podrán ser sobreescritas por otras reglas CSS con igual selector dentro de las hojas de estilo definidas en la actual página web.',
		example: 'it("table").sorter({ stylesheet: true });'
	}
}

/**
   StripTags Helper						
   @version: 1.0
   @author: Pablo E. Fernández (islavisual@gmail.com).
   @Copyright 2017-2021 Islavisual.
   @Last update: 13/03/2019
 **/
WikiHelper.Striptags = {
	general: {
		version: '1.0',
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

/**
   Tabs Helper						
   @version: 1.0
   @author: Pablo E. Fernández (islavisual@gmail.com).
   @Copyright 2017-2021 Islavisual.
   @Last update: 08/04/2021
 **/
WikiHelper.Tabs = {
	general: {
		version: '1.0',
		name: 'Tabs',
		description: 'Tabs es un componente totalmente usable y accesible de la interfaz gráfica de usuario que muestra información agrupada por secciones o pestañas.\n\
		<name><bool>NOTA</bool>: Si se desean consultar las recomendaciones sobre la accesibilidad y los tabs, se puede visitar la URL https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-2/tabs.html</name>\n\
\n\
Para que sea más sencillo de comprender el componente, a partir de ahora, en todos métodos y propiedades supondremos que tenemos un código que se alimenta de una lista con enlaces o botones y unos elementos de caja o secciones que contienen los diferenttes contenidos de cada una de las pestañas.\n\
\n\
La estructura de la cabecera de los TABS puede definirse mediante un elemento de lista <property>ul</property> con enlaces:\n\
<code style="white-space: pre-wrap;">\
<name>&lt;ul <field>class=</field><str>"tabs"</str>></name>\n\
	<name>&lt;li></name><name>&lt;a <field>href=</field><str>"javascript:void(0)"</str>></name><text style="display:inline; padding: 0">Investigación y Desarrollo</text><name>&lt;/button></name><name>&lt;/li></name>\n\
	<name>&lt;li></name><name>&lt;a <field>href=</field><str>"javascript:void(0)"</str>></name><text style="display:inline; padding: 0">Planificación y Organización</text><name>&lt;/button></name><name>&lt;/li></name>\n\
	<name>&lt;li></name><name>&lt;a <field>href=</field><str>"javascript:void(0)"</str>></name><text style="display:inline; padding: 0">Producción</text><name>&lt;/button></name><name>&lt;/li></name>\n\
	<name>&lt;li></name><name>&lt;a <field>href=</field><str>"javascript:void(0)"</str>></name><text style="display:inline; padding: 0">Pruebas y testing</text><name>&lt;/button></name><name>&lt;/li></name>\n\
	<name>&lt;li></name><name>&lt;a <field>href=</field><str>"javascript:void(0)"</str>></name><text style="display:inline; padding: 0">Resultados y Conclusiones</text><name>&lt;/button></name><name>&lt;/li></name>\n\
<name>&lt;/ul></name>\n\
</code>\n\
O mediante un elemento de caja <property>div</property> o de navegación <property>nav</property> con botones:\n\
<code style="white-space: pre-wrap;">\
<name>&lt;nav <field>class=</field><str>"tabs"</str>></name>\n\
	<name>&lt;button></name><text style="display:inline; padding: 0">Investigación y Desarrollo</text><name>&lt;/button></name>\n\
	<name>&lt;button></name><text style="display:inline; padding: 0">Planificación y Organización</text><name>&lt;/button></name>\n\
	<name>&lt;button></name><text style="display:inline; padding: 0">Producción</text><name>&lt;/button></name>\n\
	<name>&lt;button></name><text style="display:inline; padding: 0">Pruebas y testing</text><name>&lt;/button></name>\n\
	<name>&lt;button></name><text style="display:inline; padding: 0">Resultados y Conclusiones</text><name>&lt;/button></name>\n\
<name>&lt;/nav></name>\n\
</code>\n\
Los elementos que representan el cóntenido podrán ser cualquier elemento de caja o sección y sólo deberán ser proporcionados a través de un ID:\n\
<code style="white-space: pre-wrap;">\
<name>&lt;div <field>id=</field><str>"tab1"</str>></name>\n\
	<name>&lt;h3></name><text style="display:inline; padding: 0">Investigación y Desarrollo</text><name>&lt;/h3></name>\n\
	<name>&lt;p></name>Texto 1<name>&lt;/p></name>\n\
<name>&lt;/div></name>\n\
<name>&lt;div <field>id=</field><str>"tab2"</str>></name>\n\
	<name>&lt;h3></name><text style="display:inline; padding: 0">Planificación y Organización</text><name>&lt;/h3></name>\n\
	<name>&lt;p></name>Texto 2<name>&lt;/p></name>\n\
<name>&lt;/div></name>\n\
<name>&lt;div <field>id=</field><str>"tab3"</str>></name>\n\
	<name>&lt;h3></name><text style="display:inline; padding: 0">Producción</text><name>&lt;/h3></name>\n\
	<name>&lt;p></name>Texto 3<name>&lt;/p></name>\n\
<name>&lt;/div></name>\n\
<name>&lt;div <field>id=</field><str>"tab4"</str>></name>\n\
	<name>&lt;h3></name><text style="display:inline; padding: 0">Pruebas y testing</text><name>&lt;/h3></name>\n\
	<name>&lt;p></name>Texto 4<name>&lt;/p></name>\n\
<name>&lt;/div></name>\n\
<name>&lt;div <field>id=</field><str>"tab5"</str>></name>\n\
	<name>&lt;h3></name><text style="display:inline; padding: 0">Resultados y Conclusiones</text><name>&lt;/h3></name>\n\
	<name>&lt;p></name>Texto 5<name>&lt;/p></name>\n\
<name>&lt;/div></name>\n\
</code>'
	},
	additional: [
		{
			description: 'Personalizar los estilos a través de las reglas CSS. Por ejemplo:',
			example: '_CSS_\n\
// Reglas CSS a incluir en tu hoja de estilos\n\
.it-tab-links{ overflow: hidden; z-index: 1; display: block; margin: 12px 0 0 0; padding: 0; position: relative; top: 1px; list-style: none;}\n\
.it-tab-links [role="tab"]{ background-color: transparent; color: #888; float: left; outline: none; cursor: pointer; padding: 5px 10px; transition: 0.3s; border: 1px solid #fff; border-bottom-color: rgba(0, 0, 0, 0); margin: 0 5px; border-radius: 5px 5px 0 0; position: relative; top: auto; left: auto; right: auto; bottom: auto; display: block; height: auto; }\n\
.it-tab-links [role="tab"] img{ width: auto; height: 48px; object-fit: cover; object-position: center center; display: block; max-width: none; max-height: none; image-rendering: -webkit-optimize-contrast; pointer-events: none; margin: 0 auto; opacity: 1;}\n\
.it-tab-links [role="tab"]:not(.active) img{ filter: grayscale(1); opacity: 0.5;}\n\
.it-tab-links [role="tab"]:hover{ background-color: #484848;}\n\
.it-tab-links [role="tab"].active{ background-color: #ffffff; color: #000000; border-color: rgba(0, 0, 0, 0.2); border-bottom-color: #fff;}\n\
.it-tabs-container{ margin-top: 15px;}\n\
.it-tabs-container [role="button"]{ background-color: #fff; border: 0 none; color: #000; float: left; outline: none; cursor: pointer; padding: 5px 0; margin: 0; transition: 0.3s; border-radius: 5px 5px 0 0; position: absolute; left: 0; top: 0; min-width: 32px; z-index: 2;}\n\
.it-tabs-container [role="button"]:last-child{ left: auto; right: 0;}\n\
.it-tabs-container [role="button"].large{ height: 80px; font-size: 32px}\n\
.it-tab-contents{ border: 1px solid rgba(0,0,0,0.2); border-radius: 5px 5px 0px 0;}\n\
.it-tab-contents [role=tabpanel]{ display: none; padding: 6px 12px; border: 0 none;}\n\
.it-tabs-overflow{ overflow: hidden; position: relative; padding-left: 20px;}\n\
.it-tabs-overflow .it-tab-links{ margin: 0; top: 0; margin-left: 8px; }\n\
.it-tabs-overflow [role="button"]{ top: -1px;}\n\
.it-tabs-overflow + .it-tab-contents{ margin-top: -1px;}\n\
.it-tabs-overflow.hide-buttons [role="button"]{ display: none}\n\
.it-tabs-overflow.hide-buttons .it-tab-links{ margin-left: 0}\n\
.it-tabs-container.touch{ position: relative;}\n\
.it-tabs-container.touch .it-tabs-overflow{ position: initial; overflow: auto;}\n\
.it-tabs-container.touch [role="button"]{ color: #999;}\n\
_CSS_'
		}
	],
	content: {
		type: 'object',
		description: 'Permite definir los <property>id</property> de los tabs a definir.',
		example: 'it(".nav-tabs").tabs({\n\
	content: ["tab1", "tab2", "tab3", "tab4", "tab5"]\n\
});'
	},
	images: {
		type: 'object',
		description: 'Permite definir unas imágenes que serán insertadas como parte de la cabecera o título de la pestaña. Este atributo es opcional.',
		example: 'it(".nav-tabs").tabs({\n\
	content: ["tab1", "tab2", "tab3", "tab4", "tab5"],\n\
	images: [\n\
		"https://s3-us-west-2.amazonaws.com/s.cdpn.io/1457119/undraw_research.svg",\n\
		"https://s3-us-west-2.amazonaws.com/s.cdpn.io/1457119/undraw_planning.svg",\n\
		"https://s3-us-west-2.amazonaws.com/s.cdpn.io/1457119/undraw_production.svg",\n\
		"https://s3-us-west-2.amazonaws.com/s.cdpn.io/1457119/undraw_testing.svg",\n\
		"https://s3-us-west-2.amazonaws.com/s.cdpn.io/1457119/undraw_result.svg"\n\
	],\n\
	label: "Ejemplo de tabs"\n\
});'
	},
	label: {
		type: 'object',
		description: 'Permite establecer un aria-label cuando se requiere que el tab sea accesible. Por defecto se asigna un texto genérico, pero es recomrendable cambiarlo a una descripción más específica para cumplir con los requerimientos mínimos de accesibilidad. Este atributo es opcional.',
		example: 'it(".nav-tabs").tabs({\n\
	content: ["tab1", "tab2", "tab3", "tab4", "tab5"],\n\
	label: "Ejemplo de tabs"\n\
});'
	},
	overflow: {
		type: 'boolean',
		description: 'Permite definir el comportamiento del componente. Si su valor es <property>false</property>, se obtendrá un comportamiento estándar de tabs o pestañas, pero, si su valor es <property>true</property> se comportará como un slider de pestañas, que podrán ser manipuladas mediante toques táctiles y los botones adicionales situados en los extremos.',
		example: 'it(".nav-tabs").tabs({\n\
	content: ["tab1", "tab2", "tab3", "tab4", "tab5"],\n\
	label: "Ejemplo de tabs",\n\
	overflow: true\n\
});'
	},
	stylesheet:{
		type: 'boolean',
		description: 'Indica al componente si las reglas CSS necesarias para su utilización están en una hoja de estilos aparte. Por defecto, su valor es <property>false</property>, lo que significa que el componente añadirá todas las reglas CSS necesarias durante el proceso de carga, pero, que podrán ser sobreescritas por otras reglas CSS con igual selector dentro de las hojas de estilo definidas en la actual página web.',
		example: 'it(".nav-tabs").tabs({\n\
	content: ["tab1", "tab2", "tab3", "tab4", "tab5"],\n\
	label: "Ejemplo de tabs",\n\
	stylesheet: true\n\
});'
	}
}

/**
   TreeView Helper
   @version: 1.2
   @author: Pablo E. Fernández (islavisual@gmail.com).
   @Copyright 2017-2021 Islavisual.
   @Last update: 05/03/2021
 **/
WikiHelper.Treeview = {
	general: {
		version: '1.2',
		name: 'Treeview',
		description: "Treeview es un componente de la interfaz gráfica de usuario que muestra una vista jerárquica de la información. Cada elemento puede tener cero, uno o más subelementos o hijos. Normalmente, se visualiza como una lista tabulada y cada elemento revela sus subelementos a través de un cambio de estado (de expandido a colapsado o viceversa).\n\
		<name><bool>NOTA</bool>: Si se desean consultar las recomendaciones sobre la accesibilidad y los diálogos modales, se puede visitar la URL https://www.w3.org/TR/wai-aria-practices/examples/treeview/treeview-2/treeview-2a.html</name>",
	},
	additional: [
		{
			description: 'Personalizar los estilos a través de las reglas CSS. Por ejemplo:',
			example: '_CSS_\n\
// Reglas CSS a incluir en tu hoja de estilos\n\
ul.it-treeview, ul.it-treeview ul { list-style: none; }\n\
ul.it-treeview { background: rgb(255, 255, 255); width: 100%; border: 1px solid rgba(0, 0, 0, 0.15); padding: 5px; }\n\
ul.it-treeview li { color: rgb(0, 0, 0); }\n\
ul.it-treeview li i { cursor: pointer; }\n\
ul.it-treeview li ul { transition: all 0.3s ease 0s; max-height: 10000px; overflow: hidden; }\n\
ul.it-treeview li ul li { padding-left: 15px; }\n\
ul.it-treeview li.collapsed ul { max-height: 0px; }\n\
ul.it-treeview li a { color: rgb(36, 84, 156); background: rgba(0, 0, 0, 0); }\n\
ul.it-treeview li label { padding: 2px 5px; display: inline-block; }\n\
ul.it-treeview li i.icon { margin-right: 8px; }\n\
ul.it-treeview li.search-box input { width: 100%; background: rgb(255, 255, 255); color: rgb(0, 0, 0); border: 1px solid rgba(0, 0, 0, 0.1); }\n\
ul.it-treeview li .active { background: rgb(56, 104, 176); color: rgb(255, 255, 255); }\n\
ul.it-treeview input[type="checkbox"]:focus,\n\
ul.it-treeview input[type="checkbox"]:focus::before { border-color: rgb(0, 0, 0); }\n\
ul.it-treeview input[type="checkbox"]:focus + label { background: rgb(0, 0, 0); color: rgb(255, 255, 255); }\n\
_CSS_'
		}
	],
	classLeaf: {
		type: 'string',
		description: 'El parámetro "classLeaf" indica el nombre de clase que se aplicará a los nodos hoja (los de último nivel). Esta clase, por ejemplo, puede utilizarse para proporcionar un estilo diferente a este tipo de nodos. Por defecto está vacío.',
		example: 'it("#treeview").treeview({data: treeviewJSON, classLeaf: "leaf-node"});'
	},
	collapsedIcon: {
		type: 'string',
		description: 'El parámetro "collapsedIcon" indica el carácter, el icono vectorial o el código html que se mostrará en lugar del "icono de colapsado" que refleja que la rama está cerrada de manera predeterminada. Si no se establece, por defecto es contendrá \u25BA.',
		example: '// Example with Vectorial icons\nit("#treeview").treeview({data: treeviewJSON, collapsedIcon: \'&lt;i class=\"plus\">&lt;/i>\'});\n// Example with Unicode icons\nit("#treeview").treeview({data: treeviewJSON, collapsedIcon: "+"});'
	},
	expandedIcon: {
		type: 'string',
		description: 'El parámetro "expandedIcon" indica el carácter, el icono vectorial o el código html que se mostrará en lugar del "icono de expandido" que refleja que la rama está abierta de forma predeterminada. Si no se establece, Por defecto es \u25BC.',
		example: '// Example with Vectorial icons\nit("#treeview").treeview({data: treeviewJSON, expandedIcon: \'&lt;i class=\"less\">&lt;/i>\'});\n// Example with Unicode icons\nit("#treeview").treeview({data: treeviewJSON, expandedIcon: "-"});'
	},
	leafIcon: {
		type: 'string',
		description: 'El parámetro "leafIcon" indica el carácter, el icono vectorial o el código html que se mostrará en lugar del "icono de hoja" que refleja que, este nodo, no tiene más hijos. Si no se establece, por defecto está vacío.',
		example: '// Example with Vectorial icons\nit("#treeview").treeview({data: treeviewJSON, leafIcon: \'&lt;i class=\"leaf\">&lt;/i>\'});\n// Example with Unicode icons\nit("#treeview").treeview({data: treeviewJSON, leafIcon: "\\uD83D\\uDE54"});'
	},
	branchIcon: {
		type: 'string',
		description: 'El parámetro "branchIcon" indica el carácter, el icono vectorial o el código html que se mostrará en lugar del "icono de rama" que refleja que este nodo tiene, al menos, un hijo. Si no se establece, por defecto está vacío.',
		example: '// Example with Vectorial icons\nit("#treeview").treeview({data: treeviewJSON, branchIcon: \'&lt;i class=\"folder\">&lt;/i>\'});\n// Example with Unicode icons\nit("#treeview").treeview({data: treeviewJSON, branchIcon: "\\uD83D\\uDCC2"});'
	},
	customCheck: {
		type: 'string',
		description: 'Cadena HTML con la nueva definición del checkbox. Por defecto está vacío (deshabilitado).',
		example: 'it("#treeview").treeview({\n\tdata: treeviewJSON,\n\tcustomCheck: "&lt;label>Two&lt;input type=\'checkbox\'>&lt;span class=\'checkmark\'>&lt;/span>&lt;/label>"\n});'
	},
	data: {
		type: 'object',
		description: 'Es un objeto con los elementos a tratar. Este objeto debe estar en formato JSON.',
		example: '//Example JSON to send to Treeview component.\nvar treeviewJSON = {\n\titems: [{\n\t\tid: 1,\n\t\tlabel: "Parent 1",\n\t\texpanded: true,\n\t\tchildren: [{\n\t\t\tid: 2,\n\t\t\tlabel : "Element 1",\n\t\t\tchildren : [\n\t\t\t\t{ id: 3, label: "Child 1 of Element 1", href: "#"},\n\t\t\t\t{ id: 4, label: "Child 2 of Element 1", href: "#"},\n\t\t\t]\n\t\t},\n\t\t{\n\t\t\tid: 5,\n\t\t\tlabel : "Element 2",\n\t\t\tchildren : [\n\t\t\t\t{ id: 6, label: "Child 1 of Element 2", href: "#"},\n\t\t\t\t{ id: 7, label: "Child 2 of Element 2", href: "#"},\n\t\t\t]\n\t\t}]\n\t}]\n}\it("#treeview").treeview({data: treeviewJSON});'
	},
	onSelectNode: {
		type: 'function',
		description: 'El parámetro "onSelectNode" indica la función de devolución de llamada cuando se selecciona un nodo. Por defecto, esta funcionalidad está deshabilitada.',
		example: 'it("#treeview").treeview({data: treeviewJSON, onSelectNode: callback});\nfunction callback(e){\n\tconsole.log(e);\n}'
	},
	onCheckNode: {
		type: 'function',
		description: 'El parámetro "onCheckNode" indica la función de devolución de llamada cuando se chequea un nodo. Por defecto, esta funcionalidad está deshabilitada.',
		example: 'it("#treeview").treeview({data: treeviewJSON, onCheckNode: callback});\nfunction callback(e){\n\tconsole.log(e);\n}'
	},
	selectable: {
		type: 'boolean',
		description: 'El parámetro "selectable" indica si los nodos serán seleccionables. Por defecto es false.',
		example: 'it("#treeview").treeview({data: treeviewJSON, selectable: false});'
	},
	searchable: {
		type: 'boolean',
		description: 'El parámetro "searchable" indica si el árbol permitirá la búsqueda de nodos. Por defecto es false.',
		example: 'it("#treeview").treeview({data: treeviewJSON, searchable: false});'
	},
	placeholderText: {
		type: 'string',
		description: 'El parámetro "placeholderText" indica el texto que se muestra dentro de la caja de texto cuando la búsqueda está habilitada (searchable es true). Por defecto es "Filter...".',
		example: 'it("#treeview").treeview({data: treeviewJSON, placeholderText: "Escribe para filtrar dentro del árbol"});'
	},
	styles: {
		type: 'object',
		description: 'El parámetro "styles" indica los estilos básicos que deben mostrarse en el componente de vista de árbol. Este objeto permitirá los siguientes subparámetros:\n\t● <b>bgTree</b>: fondo del árbol. Por defecto es transparent.\n\t● <b>borderTree </b>: Borde del árbol. Por defecto es rgba (0,0,0,0.15).\n\t● <b>textColor</b>: color del texto de los nodos. Por defecto es #000000.\n\t● <b>searchColor</b>: color de texto para la entrada de la búsqueda. Por defecto es #000000.\n\t● <b>searchBg</b>: color de fondo para la entrada de la búsqueda. Por defecto es #f0f0f0.\n\t● <b>activeColor</b>: color del texto del nodo seleccionado. De forma predeterminada es #ffffff.\n\t● <b>activeBg</b>: color de fondo del nodo seleccionado. Por defecto es #000000.\n\t● <b>linkColor</b>: color de texto para nodos con enlace. Por defecto es #006699.\n\t● <b>linkBg</b>: color de fondo para los nodos con enlace. Por defecto es transparent.',
		example: 'it("#treeview").treeview({\n\tdata: treeviewJSON,\n\tselectable: true,\n\tstyles: {\n\t\tbgTree: "#ffffff",\n\t\tborderTree: "rgba(0,0,0,0.15)",\n\t\ttextColor: "#000",\n\t\tsearchColor: "#000",\n\t\tsearchBg: "#fff",\n\t\tactiveColor: "#333",\n\t\tactiveBg: "lightgray",\n\t\tlinkColor: "#009966",\n\t\tlinkBg: "rgba(0,0,0,0)"\n\t}\n});'

	},
	target: {
		type: 'string',
		description: 'ID del elemento donde se implementará el componente Treeview. Este ID debe pertenecer a una etiqueta UL de HTML.',
		example: 'it("#treeview").treeview({data: treeviewJSON});'
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
	stylesheet:{
		type: 'boolean',
		description: 'Indica al componente si las reglas CSS necesarias para su utilización están en una hoja de estilos aparte. Por defecto, su valor es <property>false</property>, lo que significa que el componente añadirá todas las reglas CSS necesarias durante el proceso de carga, pero, que podrán ser sobreescritas por otras reglas CSS con igual selector dentro de las hojas de estilo definidas en la actual página web.',
		example: 'it("#treeview").treeview({\n\
	data: treeviewJSON,\n\
	stylesheet: true\n\
});'
	}
}

/**
	 Validator functionality
	 @version: 2.0
	 @author: Pablo E. Fernández (islavisual@gmail.com).
	 @Copyright 2017-2021 Islavisual.
	 @Last update: 22/03/2021
 **/
WikiHelper.Validator = {
	general: {
		version: '2.0',
		name: 'Validator',
		help: 1,
		description: 'Este script establece validaciones personalizadas para los elementos de entrada de datos de formulario.\n\
Aunque admite más parámetros o configuraciones, para un correcto funcionamiento sólo se requieren el atributo <property>contraint</property> y <property>message</property>.\n\
<name><b>NOTA</b>:Recordar que, para HTML5, un mensaje de validación vacío significa que la entrada de datos es correcta.</name>',
	},
	additional: [
		{
			description: 'Personalizar la clase de validator-error y validator-error-msg a través de estilos CSS.',
			example: '_CSS_// Personalizar el estilo del input\n\
.it-validator-error{ background: rgba(255, 0, 0, 0.2); color: #fff !important; box-shadow: 0 0 0 2px #f00 inset }\n\
\n\
//Personalizar el color del mensaje de validación\n\
.it-validator-error-msg{ background: rgba(255, 0, 0, 0.2); color: rgba(255, 255, 255, 1); width: 100%; display: block; padding: 5px; border: 1px solid rgba(0, 0, 0, 0.2); }\n\
_CSS_'
		}
	],
	constraint: {
		type: 'function',
		description: 'Indica la validación que se desea aplicar a un elemento de formulario o campo de entrada de datos. Por lo general, estas restricciones son:\n\
	● <b>patternMismatch</b>: Indica si el valor introducido no se ajusta a las restricciones establecidas por el atributo <property>pattern</property> definido en el elemento de formulario.\n\
	● <b>rangeOverflow</b>: Indica si el valor introducido no se ajusta a las restricciones establecidas por el atributo <property>max</property> definido en el elemento de formulario.\n\
	● <b>rangeUnderflow</b>: Indica si el valor introducido no se ajusta a las restricciones establecidas por el atributo <property>min</property> definido en el elemento de formulario.\n\
	● <b>stepMismatch</b>: Indica si el valor introducido no se ajusta a las restricciones establecidas por el atributo <property>step</property> definido en el elemento de formulario.\n\
	● <b>Operadores</b>: Es decir, "=", "!=", "<", ">", ">=" y "<=".',
		example: '// Permitir sólo números igual o menores a 100\n\
it("#percent").validator({\n\
	constraint: "<=100",\n\
	message: "Por favor, el número debe ser igual o menor a 100",\n\
	required: true\n\
});\n\
\n\
// Permitir sólo "Sí" o "No"\n\
it("#respuesta").validator({\n\
	constraint: "==\'S\' || ==\'N\'",\n\
	message: "Los valores correctos son: S o N",\n\
	required: true\n\
});\n\
\n\
// Permitir sólo una lista de valores\n\
var arraySex = ["H", "M", "X"];\n\
it("#sexo").validator({\n\
	constraint: "arraySex.indexOf(this.value) != -1",\n\
	message: "Los posibles valores son: H, M y X"\n\
});\n\
\n\
// Permitir sólo un rango de valores\n\
document.getElementById("range").setAttribute("type", "number");\n\
document.getElementById("range").setAttribute("min", 50);\n\
document.getElementById("range").setAttribute("max", 100);\n\
it("#range").validator({\n\
	constraint: "!this.validity.rangeOverflow && !this.validity.rangeUnderflow",\n\
	message: "Los posibles valores son entre 50 y 100"\n\
});\n\
\n\
// Validación de la contraseña con, al menos, una letra mayúscula, una letra minúscula,\n\
// un dígito, un carácter especial y con un mínimo de ocho en longitud.\n\
it("#pwd").validator({\n\
	required: true,\n\
	constraint: "!this.validity.patternMismatch",\n\
	message: "La contraseña no coincide con el formato especificado",\n\
	pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"\n\
});'
	},
	type: {
		type: 'string',
		description: 'Actualemnte, sólo define que la validación es para elementos de entrada de tipo FILE. Esta funcionalidad se alimenta de un objeto JSON que admite:\n\
	● <b>accept</b>: es una cadena que define, separados por comas, los tipos de archivos que debe aceptar la entrada del archivo. De forma predeterminada, está vacío.\n\
	● <b>preview</b>: Habilita la vista previa del archivo. Por defecto, es false.\n\
	● <b>size</b>: Limitar (en KB) el tamaño del archivo que se va a cargar. De forma predeterminada, es 0, que indica que no tiene límite.\n\
	● <b>message</b>: mensaje que se muestra cuando la entrada del archivo no es válida.',
		example: '// Permitir solo tipos de archivos de Word\n\
it("avatar").validator({\n\
	type: "file",\n\
	accept: ".doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document",\n\
	message: "Los archivos permitidos son todos los formatos de Word."\n\
});\n\
\n\
// Permitir solo tipos de archivos de Excel\n\
it("avatar").validator({\n\
	type: "file",\n\
	accept: ".xls, .xlsx, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",\n\
	message: "Los archivos permitidos son todos los formatos de Excel y CSV."\n\
});\n\
\n\
// Permitir sólo tipos de archivos de PDF\n\
it("avatar").validator({\n\
	type: "file",\n\
	accept: ".pdf, application/pdf",\n\
	message: "Los archivos permitidos son, únicamente, en formato PDF."\n\
});\n\
\n\
// Habilitar la vista previa dentro del contenedor de miniaturas\n\
it("").validator.fileset({\n\
	type: "file",\n\
	preview: true\n\
});\n\
\n\
// Limitar el tamaño de los archivos de imagen a 100KB.\n\
it("").validator.fileset({\n\
	type: "file",\n\
	maxsize: 100,\n\
	accept: "image/*",\n\
	message: "El tamaño de la imagen debe ser menor a 100 KB"\n\
});'
	},
	display: {
		type: "boolean",
		description: 'Esta propiedad le indica si los mensajes resultantes de la validación deben añadirse y mostrarse tras la comprobación. Por defecto es <bool>true</bool>',
		example: '// Limitar el tamaño de los archivos jpeg a 250 KB y no mostrar el mensaje de error aunque falle.\n\
it("#avatar").validator({\n\
	type: "file",\n\
	display:false,\n\
	maxsize: 250,\n\
	accept: ".jpg,.jpeg",\n\
	message: "El tamaño del archivo debería ser menor a 250 KB"\n\
});\n\
// Cuando se implementa este comportamiento, no mostrará ningún mensaje de error, pero sí que añadirá la clase <property>validator-error</property>, la cual puede ser útil para mostrar mensajes a partir de CSS, por ejemplo, podrían mostrarse los mensajes de error a través de:\n\
<property>input + span{ display: none}</property>\n\
<property>input.validator-error + span{ display: block}</property>'
	},
	custom: {
		type: 'function',
		description: 'Permite definir validaciones personalizadas a través de código JavaScript.',
		example: 'it("#switch1").validator({\n\
	custom: function(e){\n\
		if (!this.checked) {\n\
			e.target.setCustomValidity("Debe estar seleccionado!");\n\
			e.target.classList.add("validator-error")\n\
			Validator.addMessage(e.target);\n\
		} else {\n\
			e.target.setCustomValidity("");\n\
			e.target.classList.remove("validator-error");\n\
			e.target.nextElementSibling.remove();\n\
		}\n\
	}\n\
});'
	},
	required: {
		type: 'string',
		description: 'Establece el atributo de requerido.',
		example: '// Permitir sólo números igual o menores a 100\n\
it("#percent").validator({\n\
	constraint: "<=100",\n\
	message: "Por favor, el número debe ser igual o menor a 100",\n\
	required: true\n\
});'
	}, 
	pattern: {
		type: 'string',
		description: 'Permite utilizar una expresión regular para validar la entrada de datos.',
		example: '// Validación de la contraseña con, al menos, una letra mayúscula, una letra minúscula,\n\
// un dígito, un carácter especial y con un mínimo de ocho en longitud.\n\
it("#pwd").validator({\n\
	required: true,\n\
	constraint: "!this.validity.patternMismatch",\n\
	message: "La contraseña no coincide con el formato especificado",\n\
	pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"\n\
});'
	},
	stylesheet:{
		type: 'boolean',
		description: 'Indica al componente si las reglas CSS necesarias para su utilización están en una hoja de estilos aparte. Por defecto, su valor es <property>false</property>, lo que significa que el componente añadirá todas las reglas CSS necesarias durante el proceso de carga, pero, que podrán ser sobreescritas por otras reglas CSS con igual selector dentro de las hojas de estilo definidas en la actual página web.',
		example: '// Permitir sólo números igual o menores a 100\n\
it("#percent").validator({\n\
	constraint: "<=100",\n\
	message: "Por favor, el número debe ser igual o menor a 100",\n\
	required: true,\n\
	stylesheet: true\n\
});'
	}
}

/**
   Helper functionality
   @version: 1.2
   @author: Pablo E. Fernández (islavisual@gmail.com).
   @Copyright 2017-2021 Islavisual.
   @Last update: 08/04/2021
 **/

this.Helper = it.helper = function (func, cfg) {
	// if func is "index" or empty, build the object
	if(typeof func == "undefined" || func.trim() == "") func = "Index";
	
	func = it.ucwords(func.toLowerCase());

	// if configuration is undefined, set by default
	if(typeof cfg == "undefined" || cfg == null) cfg = { theme: 'DARK', printOnScreen: true };
	else if(typeof cfg == "string"){
		cfg = { about: cfg, theme: 'DARK', printOnScreen: true };
	}

	// If index helper not exists, build it!
	WikiHelper.Index = {
		general: {
			name: "Index",
			version: 2.0,
			description: "Index of scripts into isiTools"
		}
	}

	for (var key in WikiHelper) {
		if (typeof WikiHelper.Index[WikiHelper[key].general.name] == "undefined") {
			WikiHelper.Index[WikiHelper[key].general.name] = {};
		}

		if(key == "Index") continue;

		var aux = {};
			aux = Object.assign({}, WikiHelper[key]);
		if(typeof aux.general != "undefined") delete aux.general;
		if(typeof aux.additional != "undefined") delete aux.additional;

		WikiHelper[key].general.helpText = '<comm>// Para llamar al ayudante de isiTools puede utilizarse la sintaxis <property>Helper()</property> o <property>it.helper()</property> indistintamente.</comm>';
		WikiHelper[key].general.helpText += '\n<comm>// Para obtener ayuda general sobre el componente:</comm>\n' + '<func>Helper</func>(<str>"' + WikiHelper[key].general.name + '"</str>);';
		WikiHelper[key].general.helpText += '\n<func>Helper</func>(<str>"' + WikiHelper[key].general.name + '"</str>, <null>{<property>theme</property>:</null> <str>"' + (!cfg.hasOwnProperty('theme') ? 'DARK' : cfg.theme.toLowerCase()) + '"</str>});\n';
		if(typeof Object.keys(aux)[0] != "undefined"){
			WikiHelper[key].general.helpText += '\n<comm>// Para obtener ayuda sobre un método o propiedad específica:</comm>';
			WikiHelper[key].general.helpText += '\n<func>it.helper</func>(<str>"' + WikiHelper[key].general.name + '"</str>, <str>"' + Object.keys(aux)[0] + '"</str>);';
			WikiHelper[key].general.helpText += '\n<func>it.helper</func>(<str>"' + WikiHelper[key].general.name + '"</str>, <null>{<property>about</property>:</null> <str>"' + Object.keys(aux)[0] + '"</str>, <null><func>theme</func>:</null> <str>"' + (!cfg.hasOwnProperty('theme') ? 'DARK' : cfg.theme.toLowerCase()) + '"</str>});\n';
		}
		
		WikiHelper.Index[func] = {};
		WikiHelper.Index[func].description = WikiHelper[key].general.description
		WikiHelper.Index[func].example =  '\n' + WikiHelper[key].general.helpText;
		WikiHelper.Index[func].example = WikiHelper.Index[func].example.replace(new RegExp (WikiHelper[key].general.name, 'ig'), function($0){ return "<name>" + $0 + "</name>"; })

		if(WikiHelper[key].general.name.toLowerCase() == func.toLowerCase()) break;
	}

	// Get object with the info
	var sourceHelper = WikiHelper[func];
	if(!sourceHelper){
		console.error("IsiTools dice: Componente no habilitado o cargado");
		return;
	}

	// Extract general data
	var help = Object.assign({}, sourceHelper);
	var general = sourceHelper.general;
	delete help.general;
	
	// Hack to intern functions
	if(WikiHelper[func].general.hasOwnProperty("intern") && WikiHelper[func].general.intern){
		help[func] = []
		help[func].push({description: 'Método ' + func})
		help[func].push({example: general.example})
		
	}
		
	// if exists another Helper, is removed
	if (document.querySelector("#h31p3r")) {
		document.querySelector("#h31p3r").remove();
		document.body.classList.remove('body-hidden');
	}

	// Set themes
	var darkTheme = { fieldColor: '#ff6a6a', stringColor: '#fff', exampleColor: '#ff6694', keyColor: '#467bfe', commentColor: '#828282', funcNameColor: '#0fbf88', boolColor: '#36e05c', strColor: '#c5c5c5', funcColor: '#f1c33d', intColor: '#ffabab', nullColor: '#b1b2b3' };
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
	opt.about = cfg.hasOwnProperty('method') || cfg.hasOwnProperty('property') || cfg.about || null;
	opt.printOnScreen = !cfg.hasOwnProperty('printOnScreen') ? true : cfg.printOnScreen;
	opt.theme = theme

	// If method or property is set, print only your help
	var spec = false, aux = {};
	if (opt.about) {
		aux[opt.about] = help[opt.about];
		help = aux;
		spec = true;
	}
	
	// Set HTML template
	var template = '<i class="btn-times" onclick="this.parentElement.remove(); document.body.classList.remove(\'body-hidden\');"></i>\
	<a href="javascript:void(0)" onclick="Helper(\'index\', {theme: \'' + theme + '\'});">Ir al índice</a>\
	<h1>\
		<img src="https://raw.githubusercontent.com/islavisual/isiTools/master/images/logo-isiTools.png" />\
		<span>Pantalla de ayuda para </span>' + general.name + " " + general.version + 
	'</h1>\
	<p style="padding-top: 15px">'+ general.description + '</p>\
	<p class="warning">__WARNING__</p>\
	__TEXT__\
<div id="additionalH31p3r" style="display:none; margin-top: 32px">\
	<h3>Información adicional</h3>\
	__ADDITIONAL__\
</div>\
	<div id="h31p3rOptions">\
		<p>Opciones del Helper:</p>\
		<p style="padding-left: 32px;">\
			● <key>printOnScreen</key>: Booleano que indica si se debe mostrar la ayuda en pantalla o, de lo contrario, por consola. Por defecto es true.<br/>\
			● <key>about</key>: Mostrar la ayuda sobre el método o propiedad solicitada.<br/>\
			● <key>theme</key>: Sus posibles valores son "dark" para el tema utilizar oscuro y "light" para el tema claro. Por defecto es "dark".\
		</p>\
		<p>\
			<field>Ejemplos</field>\
			__HELPEROPTIONS__\
		</p>\
	</div>';

	if (general.name.toLowerCase() == "index") {
		template = '<i class="btn-times" onclick="this.parentElement.remove(); document.body.classList.remove(\'body-hidden\');"></i>\
		<nav>\
			<a href="javascript:void(0)"><i class="btn-bars" onclick="it.helper.toggleMenu(this)"></i></a>\
			<ul>\
				<li style="height: 40px; margin: 0; position: relative;">\
					<input type="search" placeholder="Buscar componente..." oninput="it.helper.filterh31p3r(this)" />\
					<i></i>\
				</li>\
				__ITEMS_HELP__\
			</ul>\
		</nav>\
		<h1>\
			<img src="https://raw.githubusercontent.com/islavisual/isiTools/master/images/logo-isiTools.png" />\
			<span>Tabla de contenidos de isiTools</span> ' +  it.version + 
		'</h1>\
		<div style="padding-top: 15px">\
		IsiTools es un conjunto de herramientas pensadas para ayudar a los desarrolladores durante el proceso de creación del proyecto. Todas las funcionalidades incluidas están diseñadas para obtener un mejor rendimiento y una experiencia de usuario, un desarrollo más óptimo y ágil y un uso más sencillo y reutilizable. Además, permite que cada funcionalidad se cargue de forma independiente o modular evitando que el DOM se llene de elementos que no van a ser utilizados.<br/></br/>\
__TEXT__\
<name style="margin: 15px 0 10px 0; display:block;">Información adicional:</name>\
La manera de activar o habilitar cada componente puede realizarse a través del JSON <property>itEnabledModules</property> proporcionado en la propia librería para conseguir que siempre estén disponibles los componentes que se desean utilizar. No obstante, también es posible establecer todos los componentes del JSON a <property>false</property> y seleccionar su carga dinámicamente mediante el parámetro "modules" establecido en el atributo <property>src</property> de la etiqueta <property>script</property> que carga la librería.\n\
<code><comm>// Cargar selectiva por parámetro en URL</comm>\n\
<func>&lt;script</func> <field>src="js/isiTools/isiTools.js?<property>modules=AddCSSRule+Alert+Autocomplete+DOM</property>"</field><func>>&lt;/script></func>\n\
<func>&lt;script</func> <field>src="js/isiTools/isiTools.js<property>?modules=Mask+Treeview</property>"</field><func>>&lt;/script></func>\n\n\
La forma de seleccionar los elementos es mediante selectores CSS, de igual manera que lo hacen otros conocidos frameworks. Pueden encontrase varios ejemplos en el método <property>get</property>.\n\n\
Para llamar al ayudante de isiTools puede utilizarse la sintaxis <property>Helper()</property> o <property>it.helper()</property> indistintamente.\n\
<code style="margin: 10px 0; padding: 0">\
<comm>// Si se desea obtener ayuda general sobre un componente se puede recurrir a la forma reducida de un parámetro:</comm>\n\
<func>Helper</func>(<str>"each"</str>);\n\
\n\
<comm>// Si se desea obtener ayuda sobre un método o propiedad de un componente específico se puede recurrir a la forma reducida de dos parámetros:</comm>\n\
<func>it.helper</func>(<str>"autocomplete"</str>, <str>"callback"</str>);\n\
\n\
<comm>// Si se desea obtener ayuda general sobre un componente usando el tema claro se puede recurrir a la forma con el segundo parámetro como JSON:</comm>\n\
<func>Helper</func>(<str>"alert"</str>, <null>{<property>theme</property>:</null> <str>"light"</str><null>}</null>);\n\
\n\
<comm>// Esta última forma permite también establecer el método o propiedad que se desea consultar</comm>\n\
<func>it.helper</func>(<str>"treeview"</str>, <null>{<property>about</property>:</null> <str>"onCheckNode;"</str>, <null><property>theme</property>:</null> <str>"light"</str><null>}</null>);\
</code>\
		</div>\
		';
	}

	if (opt.printOnScreen) {
		if(!it.helper.loaded){
			AddCSSRule('', "@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap');");

			AddCSSRule('', "body.body-hidden", 'margin: 0; padding: 0; position: fixed; left: 0; top: 0; right: auto; bottom: auto; overflow: hidden !important; height:0 !important; width: 0 !important;')
			AddCSSRule('', "#h31p3rOptions p:first-of-type", 'text-transform: uppercase; padding-left: 0; margin-top: 50px; color: ' + opt.stringColor + '; border-bottom: 2px solid ' + opt.highlight + ';');
			AddCSSRule('', "#h31p3r", 'font-family: "Open Sans"; font-size: 14px; line-height: 1.6; position:fixed;top: 50px;left: 0;width: 100%;height: calc(100% - 50px); white-space: pre-line; padding: 0 15px 15px;margin: 0;border: 0 none; border-radius:0;background-color: ' + opt.background + '; color: ' + opt.color + ';z-index: 99999999; overflow: auto; ');
			AddCSSRule('', "#h31p3r h1", 'color: ' + opt.background + ';text-align: center; font-weight:400; background: ' + opt.color + '; padding: 15px; font-size: 18px; line-height: normal; font-variant: small-caps; position: fixed; width: 100%; left: 0; top: 0; border-bottom: 1px solid rgba(255,255,255,.1); margin: 0;')
			AddCSSRule('', "#h31p3r h2", 'color: ' + opt.funcNameColor + '; text-align: center; font-weight:400; padding: 15px; font-size: 15px; font-variant: small-caps; width: 100%; margin: 15px 0 0 0 !important;')
			AddCSSRule('', "#h31p3r h2::before, #h31p3r h2::after", 'content: inherit;')
			AddCSSRule('', "#h31p3r h3", 'display: table; text-align: left; background: rgba(0,0,0,0); font-weight:400; z-index: -1; margin: 48px 0 10px; font-size:1rem; padding: 5px; border-bottom: 1px solid rgba(255,255,255,.05); border-right: 1px solid rgba(255, 255, 255, .05); color: ' + opt.keyColor + ' !important; width: 100%; box-shadow: 0 0 24px 1px ' + (opt.theme == "DARK" ? "#000" : "#fff") + ' inset;');
			AddCSSRule('', "#h31p3r h3::before, #h31p3r h3::after", 'content: inherit;')
			AddCSSRule('', '#h31p3r h3[onclick]', 'cursor:pointer; transition: all 0.35s ease-in-out; padding: 3px 0 0 0; line-height: 22px;');
			AddCSSRule('', '#h31p3r h3[onclick]:hover::before', 'opacity: 1; position: relative; left: -8px; ');
			AddCSSRule('', '#h31p3r h3[onclick]:hover', 'color: #fff !important; padding-left: 25px;');
			AddCSSRule('', '#h31p3r h3[onclick]::before', 'content: "\\1F517"; opacity: 0; transition: all 0.35s ease-in-out;');
			
			AddCSSRule('', '#h31p3r.index h2', 'margin: 12px 0 15px 0 !important; border-bottom: 1px solid rgba(255, 255, 255, 0.05); border-right: 1px solid rgba(255, 255, 255, 0.05); width: 100%; box-shadow: rgb(0 0 0) 0px 0px 24px 1px inset; padding: 5px 0;');
			AddCSSRule('', '#h31p3r.index h3', ' margin: 0; box-shadow: none; border: 0 none; width: 25%; display: inline-block;');
			AddCSSRule('', '#h31p3r.index h3.no-loaded', 'color: ' + opt.commentColor + ' !important;');
			AddCSSRule('', '#h31p3r.index h3.no-loaded[onclick]::before', 'content: "\\26cc"; padding: 0 0 0 5px;');
			AddCSSRule('', '#h31p3r.index h3 text', 'display: inline; padding: 0;');

			AddCSSRule('', '#h31p3r ul li, #h31p3r p ', 'list-style: none; color: ' + opt.color + '; padding: 0 5px; list-style: none');
			AddCSSRule('', '#h31p3r text, #h31p3r str, #h31p3r ul, #h31p3r ul li, #h31p3r p', '{ font-size: 1rem; }');
			AddCSSRule('', '#h31p3r p.warning', 'background: linear-gradient(45deg, #de1f60, transparent); border-radius: 4px;');
			AddCSSRule('', '#h31p3r field', 'text-transform: capitalize; padding: 15px 0 5px 32px; display: inline-block; color: ' + opt.strColor + ';');
			AddCSSRule('', '#h31p3r field.des, #h31p3r field.exa', 'display: block; width: 100%;');
			AddCSSRule('', '#h31p3r property', 'text-transform: none; padding: 0; display: inline-block; color: ' + opt.fieldColor + ' !important;');
			AddCSSRule('', '#h31p3r text', 'padding-left: 32px; color: ' + opt.stringColor + '; display: block; width: 100%; white-space: pre-wrap;');
			AddCSSRule('', '#h31p3r text a', 'color: ' + opt.stringColor + '; cursor: pointer; ');
			AddCSSRule('', '#h31p3r text a:hover, #h31p3r text a:focus, #h31p3r text a:active, #h31p3r text a:hover b, #h31p3r text a:focus b, #h31p3r text a:active b', 'color: ' + opt.keyColor + ' !important; text-decoration: underline;');
			AddCSSRule('', '#h31p3r > a', 'position: fixed;left: 10px;top: 10px; border: 1px solid ' + opt.highlight + '; padding: 3px 10px; line-height:26px;z-index:9; color: ' + opt.background + ';');
			AddCSSRule('', '#h31p3r > a:hover', 'background: ' + opt.background + '; color: ' + opt.color + ';');
			AddCSSRule('', '#h31p3r int', 'color: ' + opt.intColor + ';');
			AddCSSRule('', '#h31p3r str, #h31p3r str int', 'color: ' + opt.stringColor + ';');
			AddCSSRule('', '#h31p3r bool', 'color: ' + opt.boolColor + ';');
			AddCSSRule('', '#h31p3r func', 'color: ' + opt.funcColor + ';');
			AddCSSRule('', '#h31p3r name', 'color: ' + opt.funcNameColor + ';');
			AddCSSRule('', '#h31p3r null', 'color: ' + opt.nullColor + ';');
			AddCSSRule('', '#h31p3r comm, #h31p3r comm int, #h31p3r comm str, #h31p3r comm bool, #h31p3r comm > name', 'color: ' + opt.commentColor + ';');
			AddCSSRule('', '#h31p3r > code, #h31p3r #additionalH31p3r > code', 'font-size: 14px; color: ' + opt.exampleColor + '; padding: 8px 5px 5px 32px; display: block; width: 100%; white-space: pre-wrap; ');
			AddCSSRule('', '#h31p3r code field', 'padding: 0; text-transform: none;');
			AddCSSRule('', '#h31p3r key', 'color: ' + opt.keyColor + ';');
			AddCSSRule('', '#h31p3r .btn-times', 'position: fixed; right: 10px; top: 11px; width: 32px; height: 32px;  background: ' + opt.buttons + '; z-index:9; cursor: pointer;');
			AddCSSRule('', '#h31p3r .btn-times:hover', 'opacity: 1;');
			AddCSSRule('', '#h31p3r .btn-times::before, #h31p3r .btn-times::after', 'position: absolute; left: 15px; top: 5px; content: " "; height: 24px; width: 2px; background-color: ' + opt.background + ';');
			AddCSSRule('', '#h31p3r .btn-times::before', 'transform: rotate(45deg);');
			AddCSSRule('', '#h31p3r .btn-times::after', 'transform: rotate(-45deg);');
			AddCSSRule('', '#h31p3r nav', 'position: fixed; right: 48px; top: 15px; width: 22px; height: 24px; z-index: 9; cursor: pointer; text-align: center;');
			AddCSSRule('', '#h31p3r nav .btn-bars', 'display: block; width: 24px; height: 22px; font-size: 25px; visibility: initial; float: right; border-bottom: 2px solid ' + opt.background + '; transition: all 0.3s ease 0s;');
			AddCSSRule('', '#h31p3r nav .btn-bars::before', 'content: ""; border-bottom: 2px solid ' + opt.background + '; width: 100%; display: block; position: relative; top: 4px; transition: all 0.3s ease 0s;');
			AddCSSRule('', '#h31p3r nav .btn-bars::after', 'content: ""; border-bottom: 2px solid ' + opt.background + '; width: 100%; display: block; height: 12px; transition: all 0.3s ease 0s;');
			AddCSSRule('', '#h31p3r nav a.on .btn-bars:before', 'width: 50%;');
			AddCSSRule('', '#h31p3r nav a.on .btn-bars:after', 'width: 75%; transition: all 0.3s ease;');
			AddCSSRule('', '#h31p3r nav > a', 'display: block; background: ' + opt.buttons + '; height: 32px; width: 32px; position: relative; padding: 4px; top: -4px; left: -6px;');
			AddCSSRule('', '#h31p3r nav > a + ul', 'display: none; background: ' + opt.color + '; width: 150px; height: 150px; color: ' + opt.background + '; position: absolute; top: 38px; right: -15px; list-style: none; padding: 0; text-align: left;');
			AddCSSRule('', '#h31p3r nav > a.on + ul', 'display:block; overflow-x: hidden; overflow-y: auto');
			AddCSSRule('', '#h31p3r nav > a + ul li', 'padding: 5px 10px;');
			AddCSSRule('', '#h31p3r nav > a + ul li:hover', 'background: ' + opt.highlight + '; padding: 5px 10px;');
			AddCSSRule('', '#h31p3r nav > a + ul li a', ' color: ' + opt.background + '; font-weight: normal;');
			AddCSSRule('', '#h31p3r input[type=search]', 'padding: 0 26px 0 6px;'); 
			AddCSSRule('', '#h31p3r input[type=search] + i ', 'position: absolute; right: 20px; top: 12px; z-index: 2; filter: saturate(0); border: 2px solid #ccc; width: 12px; height: 12px; border-radius: 100%;'); 
			AddCSSRule('', '#h31p3r input[type="search"] + i::after ', ' content: ""; position: absolute; top: 6px; left: 9px; width: 1px; height: 8px; border: 1px solid #ccc; transform: rotate(-45deg);'); 
			AddCSSRule('', 'h3+#additionalH31p3r', 'margin: 0 !important;');
			AddCSSRule('', 'h3+#additionalH31p3r > h3', 'margin: 0 !important; padding: 0; display: none;');
			AddCSSRule('', '#h31p3r inline', 'padding: 0; color: ' + opt.stringColor + '; display: inline; width: auto; white-space: pre-wrap;');
			AddCSSRule('', '#h31p3r code code', 'padding: 0;');

			AddCSSRule('', '#h31p3r p > name, #h31p3r p > name > *', 'color: #999; margin-top: 10px; display: inline-block;');

			AddCSSRule('', '#h31p3rOptions field', 'display: none;');
			AddCSSRule('', '#h31p3rOptions code', 'padding-left: 32px; display: block;');

			AddCSSRule('', '#h31p3r > h1 > img', 'display: inline-block; width: 163px; position: absolute; left: 112px; top: 12px; image-rendering: -webkit-optimize-contrast;');
			AddCSSRule('', '#h31p3r.index > h1 > img', 'left: 10px;');
			AddCSSRule('', '@media all and (max-width: 767px)', '#h31p3r.index > h1 > img { width: 140px; left: 10px; top: 15px; } #h31p3r:not(.index) > h1 > img, #h31p3r > h1 > span{ display: none !important; } #h31p3r.index h3 { width: 50%; }');

			if(Helper.getParameters("f") == '.me'){
				AddCSSRule('', '#h31p3r type', 'display: block; padding: 0 0px 0px 32px;');
			} else {
				AddCSSRule('', '#h31p3r type', 'padding-left: 8px; background: rgba(255,255,255,0.1); padding: 2px 5px; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; margin: 0 5px;');
			}
		}

		var text = '', additional = '', items_help = '', internHeaderGroupAdded = false, headerGroupAdded = false, idx = 0, sortProps = func == "Index" ? Object.keys(help) : Object.keys(help).sort();

		for (var p = 0; p < sortProps.length; p++) {
			var prop = sortProps[p];

			if(prop == "Index") continue;

			var intern = general.hasOwnProperty("intern") && general.intern;
			
			if (prop != "additional" && general.name.toLowerCase() != "index") {
				var type = help[prop].hasOwnProperty("type") ? help[prop].type : '';
				text += '<h3>' + (((type == "function" || intern ) ? 'Método ' : 'Propiedad ') + (intern ? WikiHelper[func].general.name : prop)) + '</h3>';

			} else if (general.name.toLowerCase() == "index") {
				var wprop = prop.indexOf(".") ? prop.split(".")[0] : prop, clk;

				if(WikiHelper[it.ucwords(prop)].general.intern || (!WikiHelper[it.ucwords(prop)].general.intern && itEnabledModules[prop])){
					clk = 'onclick="' + 'it.helper(\'' + wprop + '\')' + '"';
				} else {
					clk = 'onclick="' + 'it.helper(\'' + wprop + '\')' + '" title="Componente no cargado" class="no-loaded"';
				}
				
				if(WikiHelper[it.ucwords(prop)].general.intern && !internHeaderGroupAdded){
					text += '<h2>Componentes internos, siempre disponibles</h2>';
					internHeaderGroupAdded = true;

				} else if(!WikiHelper[it.ucwords(prop)].general.intern && !headerGroupAdded){
					text += '<h2 style="margin-top: 48px !important">Componentes consumibles a petición</h2>';
					headerGroupAdded = true;
				}

				var enabled = '';
				text += '<h3 id="' + wprop + '" ' + clk + '>' + wprop + enabled + '</h3>';
				
				items_help += '<li ' + clk + '><a href="javascript: void(0)">' + wprop + '</a></li>';
			}

			if (typeof help[prop] == "undefined") {
				text += '<span style="padding-left: 32px; color: ' + opt.stringColor + '">El método o propiedad solicitada no está definida. Para revisar la ayuda manualmente intenta:</p>';
				text += '<span style="padding-left: 32px; color: ' + opt.stringColor + '"><code>it.helper("' + func + '");</code></span></p>';
			}

			for (var key2 in help[prop]) {
				if (help[prop].hasOwnProperty("type")) {
					var keyTranslated = key2.replace(/type/ig, 'Tipo').replace(/example/ig, 'Ejemplos ').replace(/description/ig, 'Descripción');
					text += '<field class="' + key2.substr(0, 3) + '">' + keyTranslated + '</field>' + (key2 == "type" ? '' : '');
					items = help[prop][key2].split("\n");
					text += key2.indexOf('example') == 0 ? ('<code>' + styleItems(key2, items) + '</code>') : styleItems(key2, items);

				} 
			}

			if (general.name.toLowerCase() != "index") {
				for (var k = 0; k < help[prop].length; k++) {
					for (var subkey in help[prop][k]) {
						if(!intern || (intern && subkey != "description")){
							items = help[prop][k][subkey].split("\n");
							var subkeyTranslated = subkey.replace(/example/ig, 'Ejemplos ').replace(/description/ig, 'Descripción');
							additional += '<field class="' + key.substr(0, 3) + '">' + subkeyTranslated + '</field>' + (subkey == "type" ? '' : '');
							additional += subkey.indexOf('example') == 0 ? ('<code>' + styleItems(subkey, items) + '</code>') : styleItems(subkey, items);
						}
					}
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
			.replace(/__HELPEROPTIONS__/ig, typeof WikiHelper.Index[func] != "undefined" ? ("<code>" + WikiHelper.Index[func].example + '</code>') : '')
			.replace(/__WARNING__/ig, !WikiHelper[func].general.intern && !itEnabledModules[WikiHelper[func].general.name] ? '<b>ATENCIÓN</b>: El componente no está habilitado' : '')
			.replace(/\\"/ig, '"')
			.replace(/\\n/ig, '<br/>');

		var a = document.createElement("pre");
			a.setAttribute("id", "h31p3r");
			a.setAttribute("class", func.toLowerCase() == 'index' ? 'index' : '')
			a.innerHTML = aux;

		document.body.appendChild(a);

		if (additional.trim() != "") document.getElementById("additionalH31p3r").style.display = '';

		// Hide body content
		document.body.classList.add("body-hidden");


		document.getElementById("h31p3r").onclick = function(e){
			var aux = e.target.parentElement.tagName.toLowerCase()
			var auxp = e.target.parentElement.parentElement ? e.target.parentElement.parentElement.tagName.toLowerCase() : '';

			if(aux == "pre" || auxp == "pre" || aux == "code" || auxp == "code"){
				
				try { document.getElementById("h31p3r").querySelector("nav > a").classList.remove("on"); } catch(e) {}
			}
		};

		it.helper.loaded = true;

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
				aux = aux.replace(new RegExp(func + "(\\.|\\()", "ig"), function($0, $1){ return "<name>" + $0.substr(0, $0.length-1) + "</name>" + $1});
				aux = aux.replace(new RegExp(/(\.|\#){0,1}([a-zA-Z0-9\(\)\:\.\-\s\\\^]+)\{/, "ig"), function($0, $1){	return "<name>" + $0.substr(0, $0.length-1) + "</name>{"});
				aux += '<br/>';

				text += key == "type" ? ('<type>' + aux + '</type>') : (key.indexOf('example') == 0 ? aux : ('<' + tag + '>' + aux + '</' + tag + '>'));

			} else if (key.indexOf('example') == 0 && isCSS) {
				text += aux;
			} else {
				text += key == "type" ? ('<type>' + aux + '</type>') : (key.indexOf('example') == 0 ? aux : ('<' + tag + '>' + aux + '</' + tag + '>'));
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
				if(str.indexOf("╚") != -1){
					str = str.replace(/╚/g, '{').replace(/╗/g, '}').replace(/<null>/g, '').replace(new RegExp("</null>" , 'g'), '').replace(/\};/g, '}').replace(/:}/g, '}').replace(/\n/g, '').replace(/\t/g, '');
				}

				rulesNew += "<name>" + key + "</name> { " + str + "<br/>";
				rulesNew =  rulesNew.replace("╠", '{').replace(":╣;", '}');
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
	
	// Fixed problem of refresh when counter is running
	setTimeout(function(){ it('#h31p3r').get().scrollTop = 1, it('#h31p3r').get().scrollTop = 0; },0)
}

it.helper.loaded = false;

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

this.Helper.getParameters = function (cfg) {
	if (typeof cfg == "undefined") cfg = {};

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

this.Helper.toggleMenu = function(el){
	el.parentElement.classList.toggle('on'); 
	
	if(el.parentElement.classList.contains("on")){
		setTimeout(function(){ el.parentElement.nextElementSibling.children[0].children[0].focus()}, 100);
	}
}

this.Helper.filterh31p3r = function(el){
	var childs = el.parentElement.parentElement.querySelectorAll("a");
	for(var x = 0; x < childs.length; x++){
		var child = childs[x];

		child.parentElement.style.display = "";
		if(child.innerText.toLowerCase().indexOf(el.value.toLowerCase()) == -1){
			child.parentElement.style.display = "none";
		}
	}
}
