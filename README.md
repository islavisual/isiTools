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
	● "": indica que se debe crear una nueva hoja de estilo (creada al principio del encabezado de la página).
	● Integer: indica el número de índice o posición dentro del encabezado de página donde se insertó la hoja de estilo.
	● Object: indica un objeto CSSStyleSheet de JavaScript.

**Ejemplos**
```javascript
// Insertar una regla en una nueva hoja de estilo
AddCSSRule("", ".input", "background-color: lightgray; color: #333");

// Insertar una regla nueva en la primera hoja de estilo.
AddCSSRule(0, "#name", "background-color: lightgray; color: #333");

// Insertar una nueva regla en la hoja de estilo extraida del objeto CSSStyleSheet e identificada por el índice 0
AddCSSRule(document.styleSheets[0], "input", "background-color: lightgray; color: #333");
```
#### PROPIEDAD
