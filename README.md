IsiTools es un conjunto de herramientas para ayudar a los desarrolladores durante el proceso de creación del proyecto. Las herramientas proporcionadas están diseñadas para obtener una mejor experiencia de usuario y un desarrollo más utilizable y reutilizable. Además, permite que cada funcionalidad se cargue de forma independiente a través de JSON proporcionado a través del archivo config.json o mediante el parámetro "modules" establecido en el attributo SRC.	

 # Instalación
 Descargar / copiar las librerías en tu carpeta javascript de tu proyecto. Después, inserta el código necesario para activar isiTools. Por ejemplo:
```javascript
// Cargar todas las funciones
<script src="isitools.js" />
<script src="isitoolsHerlper.js" />
// Cargar selectivamente algunas características
<script src="isitools.js?modules=AddCSSRule+Alert+Autocomplete+DOM" />
<script src="isitoolsHerlper_ES.js" />
```
# Notas adicionales
Para más indicaciones sobre como utiliar isiTools, ejecutar Helper() desde la consola del navegador.
