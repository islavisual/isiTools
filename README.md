[![isiTools 2|100x30,20%](https://raw.githubusercontent.com/islavisual/isiTools/master/images/logo-isiTools.png)](https://github.com/islavisual/isiTools)

IsiTools 2 es un conjunto de herramientas para ayudar a los desarrolladores durante el proceso de creación de proyectos. Los componentes proporcionados están diseñados para ser reutilizables y obtener un mejor rendimiento, usabilidad web, accesibilidad web, lo que repercuteb en una mejor experiencia de usuario (UX).

![](https://raw.githubusercontent.com/islavisual/isiTools/master/images/release.svg)

## Autor
Hola, mi nombre es Pablo E. Fernández Casado, el autor y mantenedor de este framework. Soy Full Stack Analyst Developer, además de, especialista en Usabilidad Web y Accesibilidad Web. He escrito varios libros sobre Diseño, Usabilidad y Accesibilidad Web, que puedes encontrar en la web de [RA-MA](https://www.ra-ma.es/autor/pablo-enrique-fernandez-casado/) y [Amazon](https://www.amazon.es/s?k=PABLO+E.+FERN%C3%81NDEZ+CASADO&i=stripbooks&__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&ref=nb_sb_noss), entre otras webs.

## Licencia
[La licencia MIT (MIT).](https://choosealicense.com/licenses/mit/)

Copyright (c) Pablo E. Fernández Casado

Por la presente se otorga permiso, sin cargo, a cualquier persona que obtenga una copia de este software y los archivos de documentación asociados (el "Software"), para utilizar el Software sin restricciones, incluidos, entre otros, los derechos de uso, copia, modificación, fusión , publicar, distribuir, sublicenciar y / o vender copias del Software, y permitir que las personas a las que se les proporcione el Software lo hagan, sujeto a las siguientes condiciones:

El aviso de copyright anterior y este aviso de permiso se incluirán en todas las copias o partes sustanciales del Software.

EL SOFTWARE SE PROPORCIONA "TAL CUAL", SIN GARANTÍA DE NINGÚN TIPO, EXPRESA O IMPLÍCITA, INCLUYENDO, PERO NO LIMITADO A, LAS GARANTÍAS DE COMERCIABILIDAD, APTITUD PARA UN PROPÓSITO PARTICULAR Y NO INFRACCIÓN. EN NINGÚN CASO LOS AUTORES O TITULARES DE LOS DERECHOS DE AUTOR SERÁN RESPONSABLES DE CUALQUIER RECLAMO, DAÑOS U OTRA RESPONSABILIDAD, YA SEA EN UNA ACCIÓN DE CONTRATO, AGRAVIO O DE OTRO MODO, QUE SURJA DE, FUERA DE O EN RELACIÓN CON EL SOFTWARE O EL USO U OTRAS NEGOCIACIONES EN EL SOFTWARE.

Los componentes que ofrece son:
## Globales
* **First**: Devuelve el primer elemento de los elementos recuperados por la función constructora
* **FormatedDate**: Devuelve la fecha formateada en base al formato y valor enviados. El primer parámtero se corresponde con el formato, que puede ser un código BCP-47 como (en-US, en-GB ó es-PA), y el segundo es el valor de fecha a formatear. Ambos parámetros son opcionales.
* **Get**: Recuperar el enésimo elemento devuelto por la función constructora it().
* **GetTextWidth**: Función para calcular el ancho de un elemento en base a un texto dado.
* **hexToRGBA**: Convierte un color en formato hexadecimal en un valor RGB con canal alfa personalizable.
* **Last**: Devuelve el último elemento de los elementos recuperados por la función constructora.
* **LeftPad**: Añadir ceros por la izquierda a valores numéricos.\nSe alimenta de un único parámetro que indica el número de ceros a añadir si el número no tiene la longitud indicada.
* **ScrollTo**: Mover el scroll vertical de un determinado elemento hasta una posición determinada.
* **SimulateEvent**: Simular eventos como si fuesen lanzados por el usuario.
* **StripTags**: Funcionalidad para limpiar de HTML una cadena proporcionada por parámetro.
* **Ucwords**: Convertir el primer carácter de un texto o palabra a mayúscula y, el resto, minúsculas.

## Módulos habilitados por parámetro
* **AddCSSRule**: Funcionalidad para crear y/o modificar reglas en las hojas de estilo.
* **Alert**: Funcionalidad para crear alertas y diálogos de forma rápida y eficiente. 
* **Autocomplete**: Funciuonalidad para seleccionar valores de una lista de previamente rellenada a medida que se escribe.
* **Benchmark**: Funcionalidad para comprobar la calidad y el rendimiento de un código pasado a través de una función,
* **Constraint**: Funcionalidad para proporcionar una forma sencilla de evitar la introducción de valores que, de antemano, se sabe que no son válidos.
* **Counter**: Funcionalidad para crear contadores ascendentes y descendentes y proveerlos de algunas opciones de personalización.
* **Datepicker**: Funcionalidad de calendario universal que permite al usuario seleccionar una fecha concreta de una lista con unos pocos clicks. 
* **Debugger**: Depurador automático que permite conocer todo lo que sucede en las páginas.
* **DOM**: Funcionalidad para la gestión de eventos, acciones,... una vez que la página esté completamente cargada.
* **Flexbox**: Funcionalidad pensada para utilizar estructuras de tipo grid basadas en celdas o cajas a través de porcentajes y con carga dinámica de clases para mejorar el rendimiento de las páginas.
* **GetBrowser**: Funcionalidad para determinar las capacidades del navegador del usuario.
* **GetParam**: Funcionalidad para obtener todos los valores de los parámetros recibidos en la URL.
* **HttpRequest**: Funcionalidad para realizar solicitudes remotas de una forma sencilla.
* **Include**: Funcionalidad para insertar código HTML dentro de las páginas de manera dinámica.
* **IntelliForm**: Funcionalidad para realizar operaciones con formularios.',
* **IsMobile**: Funcionalidad para saber si el dispositivo actual es o no móvil.
* **Language**: Funcionalidad para activar y administrar la opción de multilenguaje en las páginas.
* **Mask**: Funcionalidad para generar máscaras de entrada en campos de texto que ayuda a los usuarios a introducir valores correctos.
* **Password**: Funcionalidad para administrar la creación de contraseñas y sus fortalezas.
* **Selectpicker**: Funcionalidad para gestionar una selección como un desplegable propio de HTML5 y que proporciona una capa personalización sencilla de modificar.
* **SendForm**: Funcionalidad para crear y enviar formularios en tiempo real a través de Ajax en modo POST.
* **Slider**: Funcionalidad para crear sliders con múltiples valores. Si se selecciona el tipo "switch", el componente se comportará como un interruptor. Si se selecciona el tipo "range", el componente se comportará como un selector de múltiples valores "range" de HTML5.
* **Slideshow**: Funcionalidad para presentar un conjunto de imágenes, comunmente denominadas diapositivas que se muestran secuencialmente una detrás de otra. Sólo permite visualizar una única diapositiva a la vez, sin embargo, ofrece la posibilidad de cambiar de diapositiva mediante unos botones que llevan a la anterior, la siguiente o a un número concreto, y la reproducción automática.
* **Sorter**: Funcionalidad para ordenar tablas por múltiples columnas.
* **Tabs**: Funcionalidad totalmente usable y accesiblepara mostrar información agrupada por secciones o pestañas.
* **Treeview**: Funcionalidad para mostrar vistas jerárquizadas de información.
* **Validator**: Funcionalidad para establecer mensajes de validez personalizados en los elementos de entrada de datos de los formularios. 

 # Instalación
 Primero Descarga / copia las librerías en tu carpeta javascript de tu proyecto. Después, inserta el código necesario para activar isiTools de alguna de las siguientes formas: 
 ```javascript
// Carga selectiva a través del objeto itEnabledModules
<script src="js/isiTools/isiTools.js"></script>
<script src="js/isiTools/isiToolsHelper_ES.js"></script>

// Cargar selectiva por parámetro en URL
<script src="js/isiTools/isiTools.js?modules=AddCSSRule+Alert+Autocomplete+DOM"></script>
<script src="js/isiTools/isiToolsHelper_ES.js"></script>

// Aunque también es posible insertarlo en las páginas a través de las siguientes intrucciones
<script src="https://cdn.jsdelivr.net/gh/islavisual/isiTools/isiTools.js?modules=AddCSSRule+Alert+Autocomplete+DOM" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/gh/islavisual/isiTools/isiToolsHelper_ES.js" crossorigin="anonymous"></script>
```

# Información adicional
Para más indicaciones sobre como utiliar cada uno de los componentes de isiTools, ejecutar Helper() desde la consola del navegador.
