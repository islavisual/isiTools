IsiTools 2.0 es un conjunto de herramientas para ayudar a los desarrolladores durante el proceso de creación de proyectos. Los componentes proporcionados están diseñados para obtener un mejor rendimiento, una mejor experiencia de usuario y un reutilizable.

Los componentes que ofrece son:
## Globales
* Now: Funcionalidad para recuperar la fecha actual.
* First: Devuelve el primer elemento de los elementos recuperados por la función constructora
* Get: Recuperar el enésimo elemento devuelto por la función constructora it().
* GetTextWidth: Función para calcular el ancho de un elemento en base a un texto dado.
* Last: Devuelve el último elemento de los elementos recuperados por la función constructora.
* LeftPad: Añadir ceros por la izquierda a valores numéricos.\nSe alimenta de un único parámetro que indica el número de ceros a añadir si el número no tiene la longitud indicada.
* ScrollTo: Mover el scroll vertical de un determinado elemento hasta una posición determinada.
* SimulateEvent: Simular eventos como si fuesen lanzados por el usuario.
* StripTags: Funcionalidad para limpiar de HTML una cadena proporcionada por parámetro.
* Ucwords: Convertir el primer carácter de un texto o palabra a mayúscula y, el resto, minúsculas.

## Habilitados por parámetro
* AddCSSRule: Funcionalidad para crear y/o modificar reglas en las hojas de estilo.
* Alert: Funcionalidad para crear alertas y diálogos de forma rápida y eficiente. 
* Autocomplete: Funciuonalidad para seleccionar valores de una lista de previamente rellenada a medida que se escribe.
* Benchmark: Funcionalidad para comprobar la calidad y el rendimiento de un código pasado a través de una función,
* Constraint: Funcionalidad para proporcionar una forma sencilla de evitar la introducción de valores que, de antemano, se sabe que no son válidos.
* Counter: Funcionalidad para crear contadores ascendentes y descendentes y proveerlos de algunas opciones de personalización.
* Datepicker : Funcionalidad de calendario universal que permite al usuario seleccionar una fecha concreta de una lista con unos pocos clicks. 
* Debugger: Depurador automático que permite conocer todo lo que sucede en las páginas.
* DOM: Funcionalidad para la gestión de eventos, acciones,... una vez que la página esté completamente cargada.
* GetBrowser: Funcionalidad para determinar las capacidades del navegador del usuario.
* GetParam: Funcionalidad para obtener todos los valores de los parámetros recibidos en la URL.
* HttpRequest: Funcionalidad para realizar solicitudes remotas de una forma sencilla.
* Include: Funcionalidad para insertar código HTML dentro de las páginas de manera dinámica.
* IntelliForm: Funcionalidad para realizar operaciones con formularios.',
* IsMobile: Funcionalidad para saber si el dispositivo actual es o no móvil.
* Language: Funcionalidad para activar y administrar la opción de multilenguaje en las páginas.
* Mask: Funcionalidad para generar máscaras de entrada en campos de texto que ayuda a los usuarios a introducir valores correctos.
* Nstate: Funcionalidad para crear componentes de tipo Switch (para selección de valores binarios) y/o de tipo multi selección de más de dos valores.
* Password: Funcionalidad para administrar la creación de contraseñas y sus fortalezas.
* Selectpicker: Funcionalidad para gestionar una selección como un desplegable propio de HTML5 y que proporciona una capa personalización sencilla de modificar.
* SendForm: Funcionalidad para crear y enviar formularios en tiempo real a través de Ajax en modo POST.
* Sorter: Funcionalidad para ordenar tablas por múltiples columnas.
* Treeview: Funcionalidad para mostrar vistas jerárquizadas de información.
* Validator: Funcionalidad para establecer mensajes de validez personalizados en los elementos de entrada de datos de los formularios. 

 # Instalación
 Primero Descarga / copia las librerías en tu carpeta javascript de tu proyecto. Después, inserta el código necesario para activar isiTools de alguna de las siguientes formas: 
 ```javascript
// Carga selectiva a través del objeto itEnabledModules
<script src="isitools.js" />
<script src="isitoolsHerlper.js" />
// Cargar selectiva por parámetro en URL
<script src="isitools.js?modules=AddCSSRule+Alert+Autocomplete+DOM" />
<script src="isitoolsHerlper_ES.js" />
```

# Información adicional
Para más indicaciones sobre como utiliar cada uno de los componentes de isiTools, ejecutar Helper() desde la consola del navegador.
