var WikiHelper = {}

/**
   AddCSSRule Helper																		
   @version: 1.00																					
   @author: Pablo E. Fernández (islavisual@gmail.com).												
   @Copyright 2017-2019 Islavisual. 																	
   @Last update: 13/03/2019																			
 **/

WikiHelper.AddCSSRule = {
	general: {
		version: 1.0,
		name: 'AddCSSRule',
		description: "Functionality to create add rules to style sheets. This function is feed four parameters: sheet, selector, styles and index.",
	},
	sheet: {
		type: 'string',
		description: 'Style sheet where the rule will be inserted. This parameter can take 3 values:\n\t● <b>""</b>: Indicates that a new style sheet must be created (created at the beginning of the head of page).\n\t● <b>Integer</b>: Indicates the number of index or position inside head of page where the stylesheet was inserted.\n\t● <b>Object</b>: Indicates a CSSStyleSheet Object of JavaScript.',
		example: '// Insert new stylesheet with the new rule\nAddCSSRule("", ".input", "background-color: lightgray; color: #333");\n\n// Insert a new rule into stylesheet ID equal to 0\nAddCSSRule(0, "#name", "background-color: lightgray; color: #333");\n\n// Insert a new rule into CSSStyleSheet identifies by 0\nAddCSSRule(document.styleSheets[0], "input", "background-color: lightgray; color: #333");',
	},
	selector: {
		type: 'string',
		description: 'This parameter is used to define the rule name. Can to use any selector valid by CSS3.',
		example: 'AddCSSRule("", ".buttonIcon", "background-color: lightgray; color: #333");'
	},
	styles: {
		type: 'string',
		description: 'This parameter is used to define the content the styles of the rule.',
		example: 'AddCSSRule("", "#name", "background-color: lightgray; color: #333");'
	},
	index: {
		type: 'string',
		description: 'This parameter indicates the position where will be insert. If this value is 0, the rule will be inserted at first of stylesheet, otherwise, will be inserted to the end of stylesheet.\nThis parameter is not mandatory.',
		example: 'AddCSSRule("", ".buttonIcon::after", "content:\'\'; background-color: lightgray; color: #333", 0);'
	},
}

/**
   Alert Helper																		
   @version: 1.00																					
   @author: Pablo E. Fernández (islavisual@gmail.com).												
   @Copyright 2017-2019 Islavisual. 																	
   @Last update: 11/03/2019																			
 **/

WikiHelper.Alert = {
	general: {
		version: 1.0,
		name: 'Alert',
		description: "Script to create alerts similar to javaScript in a simple way with multiple customizations.",
	},
	additional: [
		{
			description: 'You can customize the styles through CSS rules. For example:',
			example: '// styles.css (from your site)\n.Alert .btn-cancel { padding: 5px; border-radius: 0px; background-color: rgba(0, 0, 0, 0); border: 1px solid rgba(0, 0, 0, 0.1); color: rgb(0, 0, 0); }\n.Alert .btn-accept { padding: 5px; border-radius: 0px; background-color: rgb(224, 224, 224); border: 1px solid rgba(0, 0, 0, 0.1); color: rgb(0, 0, 0); }\n.Alert footer { position: relative; top: 5px; padding: 10px 10px 8px; height: auto; display: inline-block; width: 100%; margin: 0px; }\n.Alert .Alert-body { background-color: rgb(240, 0, 32); color: rgb(255, 255, 255); display: inline-block; width: 100%; padding: 10px; min-height: 100px; font-weight: 600; }\n.Alert header i { float: right; color: rgb(240, 240, 240); cursor: pointer; padding: 0px 2px; }\n.Alert header h3 { font-size: 14px; margin: 0px; color: rgb(240, 240, 240); display: inline-block; }\n.Alert header { padding: 10px 8px; background-color: rgb(208, 0, 16); border-bottom: 1px solid rgba(0, 0, 0, 0.1); color: rgb(240, 240, 240); }\n.Alert { width: 400px; margin: 100px auto 0px; background-color: rgb(240, 0, 32); overflow: hidden; color: rgb(255, 255, 255); }\n.Alert-overlay { position: fixed; background: rgba(0, 0, 0, 0.4); width: 100%; height: 100%; left: 0px; top: 0px; display: block; z-index: 999999; }\nbody.fixed { position: fixed; width: 100%; }\nbody.fixedOY { position: fixed; width: 100%; overflow-y: scroll; }'
		}
	],
	theme: {
		type: 'string',
		description: 'Theme by default.',
		example: 'new Alert({title: "Warning!", body:"The field is empty.", theme: "dark"});'
	},
	class: {
		type: 'string',
		description: 'Add a class rule to alert. This is useful if you want to define customized alerts through CSS rules, for example.',
		example: 'new Alert({title: "Warning!", body:"The field is empty.", class: "danger"});'
	},
	title: {
		type: 'string',
		description: 'Title of alert.',
		example: 'new Alert({title: "Warning!", body:"The field is empty."});'
	},
	body: {
		type: 'string',
		description: 'Message body of alert.',
		example: '// Simply Alert\nAlert("The field is empty.");\n// Custom Alert\nnew Alert({title: "Warning!", body:"The field is empty."});\n// HTML Alert\nnew Alert({title: "Warning!", body:"&lt;span>This is a probe&lt;/span> of &lt;b style=\'color: red\'>Alert!&lt;/b>."});'
	},
	actions: {
		type: 'object',
		description: 'Customize the actions of alert. This parameter must contains a structure with two fields, "accept" and "cancel".\nBoth fields can be composed by the attributes "enabled", "class", "alignment" and "callback".',
		example: 'new Alert({\n\ttitle: "Warning!",\n\tbody:"The field is empty.",\n\tactions:{\n\t\taccept: {\n\t\t\tenabled: true,\n\t\t\ttext: "Accept",\n\t\t\tclass: "btn btn-primary",\n\t\t\talignment: "right",\n\t\t\tcallback: function(e){\n\t\t\t\tconsole.log(e)\n\t\t\t}\n\t\t},\n\t\tcancel: {\n\t\t\tenabled: true,\n\t\t\ttext: "Cancel",\n\t\t\tclass: "btn btn-secondary",\n\t\t\talignment: "left",\n\t\t\tcallback: function(e){\n\t\t\t\tconsole.log(e)\n\t\t\t}\n\t\t}\n\t}\n});'
	},
	styles: {
		type: 'object',
		description: 'Customize the styles of alert through JavaScript. This parameter must contains a structure with the fields "title", "body" and "actions".\nAll fields can be composed by the attributes "background", "color" and "extra".',
		example: 'new Alert({\n\ttitle: "Warning!",\n\tbody: "The field is empty.",\n\tstyles:{\n\t\ttitle: {\n\t\t\tbackground: "#f0f0f0",\n\t\t\tcolor: "#2f2f2f",\n\t\t\textra: ""\n\t\t},\n\t\tbody: {\n\t\t\tbackground: "#fff",\n\t\t\tcolor: "#000",\n\t\t\textra: ""\n\t\t},\n\t\tactions: {\n\t\t\taccept: {\n\t\t\t\tbackground: "#e0e0e0",\n\t\t\t\tcolor: "#000",\n\t\t\t\textra: ""\n\t\t\t},\n\t\t\tcancel: {\n\t\t\t\tbackground: "rgba(0,0,0,0)",\n\t\t\t\tcolor: "#000",\n\t\t\t\textra: ""\n\t\t\t}\n\t\t}\n\t}\n});'
	},
}

/**
   Autocomplete Helper
   @version: 1.00
   @author: Pablo E. Fernández (islavisual@gmail.com).
   @Copyright 2017-2019 Islavisual.
   @Last update: 26/02/2019
 **/
WikiHelper.Autocomplete = {
	general: {
		version: 1.0,
		name: 'Autocomplete',
		description: 'It allows searching and selecting from a list of values ​​previously filled in as they are written, taking advantage of the search and filtering. This component could be an improvement to the "select" component that HTML provides. It is simple, easy to customize and the page\'s performance is little affected.',
	},
	additional: [
		{
			description: 'You can get all information of selected item from callback function. For example:',
			example: '// Example\nnew Autocomplete({target: "catalogBox", data: arrayList, callback: callback});\nfunction callback(input){\n\tvar idx = inp.dataset.index.split(",");\n\tvar idxGroup  = idx[0];\n\tvar idxItem   = idx[1];\n\tvar itemGroup = clusterList[idxGroup].group;\n\tvar itemName  = clusterList[idxGroup].items[idxItem];\n}'
		}
	],
	autofocus: {
		type: 'boolean',
		description: 'When element take the control, is selected all automatically. By default is false.',
		example: 'new Autocomplete({target: "productID", data: arrayList, format: "list"})'
	},
	callback: {
		type: 'function',
		description: 'Function to be called when an item is selected.',
		example: 'new Autocomplete({target: "productID", data: arrayList, format: "list", callback: callback});\nfunction callback(event){\n\tconsole.log("Some action!", event);\n}'
	},
	className: {
		type: 'string',
		description: 'CSS class that will be add to elements of the Autocomplete plugin. By default the class name of control is "autocomplete".',
		example: 'new Autocomplete({target: "catalogBox", data: arrayList, className: "auto-complete"});'
	},
	data: {
		type: 'object',
		description: 'Object with the elements to manage or treat. This object can be in format JSON or Array.',
		example: 'new Autocomplete({target: "transportBox", data: arrayList});\nvar arrayList = ["Car", "Motorcycle", "Airplane", "Train", "Bicicle"];'
	},
	format: {
		type: 'string',
		description: 'It is the format in which you want to present the data. Depending on the format in which the data is presented, the "data" object must be defined in one way or another. This parameter is "layer" by default.\nYour possibles values are:\n\t● "layer".\n\t● "table" (It is feeded by the JSON provided by the "tableFields" parameter.)\n\t● "cluster"',
		example: '// Example with list format\nvar arrayList = ["Car", "Motorcycle", "Airplane", "Train", "Bicicle"];\nnew Autocomplete({target: "transportBox", format: "list", data: arrayList});\n\n// Example with table format\nvar countriesJSON = [\n\t{ id: 1, country: "Afghanistan", code: "AFG", capital: "Kabul" },\n\t{ id: 2, country: "Albania", code: "ALB", capital: "Tirane" },\n\t{...}\n];\nnew Autocomplete({target: "transportBox", format: "table", data: countriesJSON,\n\ttableFields: {\n\t\t"return_value": "id",\n\t\t"fields": ["country", "code", "capital"], "headers": ["Country", "Code", "Capital"]\n\t}\n});\n\n// Example with cluster format\nvar brandsList = [\n\t{ group: "Cars", items: ["Ford", "Seat", "Jaguar"] },\n\t{ group: "Motorcycles", items: ["Suzuki", "Ducati", "Hayley-Davidson"] },\n\t{ ... }\n];\nnew Autocomplete({target: "transportBox", format: "cluster", data: brandsList});'
	},
	target: {
		type: 'string',
		description: 'ID from Input where Autocomplete will be implemented.',
		example: 'new Autocomplete({target: "inputTextID", data: arrayList});\nvar arrayList = ["Car", "Motorcycle", "Airplane", "Train", "Bicicle"];'
	},
	minLength: {
		type: 'integer',
		description: 'Minimal length to start to search	inside "data" object. By default is 3.',
		example: 'new Autocomplete({target: "inputTextID", data: arrayList, minLength: 4});\nvar arrayList = ["Car", "Motorcycle", "Airplane", "Train", "Bicicle"];'
	},
	showHeaders: {
		type: 'boolean',
		description: 'This parameter is only valid for "table" format. Indicates to Autocomplete plugin that the table headers must be shown. By default is false.',
		example: 'var countriesJSON = [\n\t{ id: 1, country: "Afghanistan", code: "AFG", capital: "Kabul" },\n\t{ id: 2, country: "Albania", code: "ALB", capital: "Tirane" },\n\t{...}\n];\nnew Autocomplete({target: "transportBox", format: "table", showHeaders: true, data: countriesJSON,\n\ttableFields: {\n\t\t"return_value": "id",\n\t\t"fields": ["country", "code", "capital"], "headers": ["Country", "Code", "Capital"]\n\t}\n});'
	},
	tableFields: {
		type: 'integer',
		description: 'Array of JSON with the next format:\n\t● "return_value" indicates that field will be returned.\n\t● "fields" indicates the fields that composed the object "data".\n\t● "headers" indicates the translate fields to show into table headers.',
		example: 'var countriesJSON = [\n\t{ id: 1, country: "Afghanistan", code: "AFG", capital: "Kabul" },\n\t{ id: 2, country: "Albania", code: "ALB", capital: "Tirane" },\n\t{...}\n];\nnew Autocomplete({target: "transportBox", format: "table", data: countriesJSON,\n\ttableFields: {\n\t\t"return_value": "id",\n\t\t"fields": ["country", "code", "capital"], "headers": ["Country", "Code", "Capital"]\n\t}\n});'
	}
};

/**
	 Benchmark functionality
	 @version: 1.00
	 @author: Pablo E. Fernández (islavisual@gmail.com).
	 @Last update: 15/03/2019
 **/

WikiHelper.Benchmark = {
	general: {
		version: 1.0,
		name: 'Benchmark',
		help: 1,
		description: "Script to check the quality and performance of a code.",
	},
	test: {
		type: 'function',
		description: 'Shows a report with the result of the analysis.',
		example: '// Difference between for and forEach\nvar bigArray = new Array(1000);\nBenchmark.test({name: "for", fn: function () {\n\tvar result = [];\n\tfor (var x = 0; x < bigArray.length; x++) {\n\t\tresult.push(bigArray[x]);\n\t}\n\treturn result;\n}});\r\n\nBenchmark.test({name: "forEach", fn: function () {\n\tvar result = [];\n\tbigArray.forEach(function(element) {\n\t\tresult.push(element);\n\t});\n\treturn result;\n}});\n\r\n// Results in Chrome: \n[\n\t{\n\t\tchecks: 2\n\t\tdiff: "0%"\n\t\telapsed: 3254\n\t\tname: "forEach"\n\t\tperSecondIterations: 456395\n\t\ttotalIterations: 1485112\n\t\t},\n\t{\n\tchecks: 2\n\t\tdiff:"87.1%"\n\t\telapsed: 3284\n\t\tname: "for"\n\t\tperSecondIterations: 58865\n\t\ttotalIterations: 193313\n\t}\n]'
	},
	testTime:{
		type: 'Integer',
		description: 'Set the duration of test in miliseconds. By default is 3000.',
		example: 'Benchmark.testTime = 10000;'
	},
	maxIterations:{
		type: 'Integer',
		description: 'Set the maximum operation by test. By default is "0x3FFFFFFF" (1 TB)',
		example: 'Benchmark.maxIterations = 2500000;'
	},
	showLog:{
		type: 'boolean',
		description: 'Shows a summary message on the console each time an operation ends. By default is false.',
		example: 'Benchmark.showLog = true;'
	},
	results: {
		type: 'Object',
		description: 'Show the results of the all previous tests.',
		example: 'console.log(Benchmark.results);'
	},
}

/**
   Constraint to input Helper
   @version: 1.00
   @author: Pablo E. Fernández (islavisual@gmail.com).
   @Copyright 2017-2019 Islavisual.
   @Last update: 04/03/2019
 **/
WikiHelper.Constraint = {
	general: {
		version: 1.0,
		name: 'Constraint',
		description: "Constraint is a client script that provides a simple way to avoid introducing values ​​that are known, in advance, to be invalid. Its operation is based on regular expressions and is easily integrated with other JavaScript or HTML5 components.\nOnce the control is defined, its methods can be accessed through document.inputTextID.Constraint.",
	},
	base: {
		type: 'integer',
		description: 'The "base" parameter establishes a numerical base different to 10, the one established by default. The binary type automatically sets the base to 2. The hexadecimal type automatically sets the base to 16.',
		example: 'new Constraint({target: "inputTextID", type: "decimal", base: 2});'
	},
	decimalpoint: {
		type: 'string',
		description: 'The "decimalpoint" parameter indicates the character that will separate the entire part of the decimal part. It will only be valid in the types of float numbers. By default the value is "." (point).',
		example: 'new Constraint({target: "inputTextID", type: "decimal", decimalpoint: ","});'
	},
	function: {
		type: 'function',
		description: 'The "function" parameter defines the validation function that will control the input format and the supported values. The validation performed by this function can be defined through regular expressions (in the case of the subtype "binary", the function could be "return /^(0|1)*$/.test(value);") although it\'s not mandatory. If the "function" parameter is defined, the "type" parameter must also be set to "custom".',
		example: '// Example of Custom subtype (Number in octal format). The custom subtype needs \nnew Constraint({\n\ttarget: "inputTextID",\n\ttype: "custom",\n\tfunction: function(value) {\n\t\treturn /^[0-7]*$/i.test(value);\n\t},\n\tbase: 8,\n});'
	},
	indicators: {
		type: 'object',
		description: 'The "indicators" parameter indicates whether the arrow up and arrow down icons should be displayed and color style. These icons are often associated with the number-type controls in HTML5, so it\'s usually a good idea to show them. By default the value is set to true.\nThe "indicators" parameter is composed of enabled and color values.',
		example: 'new Constraint({target: "inputTextID", type: "decimal", indicators: {enabled: true, color: "rgba(0,0,0,0.25)"}});\nnew Constraint({target: "inputTextID", type: "decimal", indicators: {color: "red"}});'
	},
	target: {
		type: 'string',
		description: 'ID from Input where the control will be implemented.',
		example: 'new Constraint({target: "inputTextID", type: "integer"});'
	},
	step: {
		type: 'float',
		description: 'The "step" parameter indicates the interval of increment or decrement when the user press the up cursor or down cursor. By default the value is 1.',
		example: 'new Constraint({target: "inputTextID", type: "decimal", step: 0.01});'
	},
	type: {
		type: 'string',
		description: 'The "type" parameter defines the format or type of data that control will allow. The accepted values are:\n\t● <b>int</b>: The allowed values are positive and negative integers.\n\t● <b>uint</b>: The allowed values are only positive integers.\n\t● <b>float</b>: The allowed values are integers and real numbers with infinite decimals.\n\t● <b>decimal</b>: The allowed values are integers and real numbers with two decimals.\n\t● <b>percent</b>: The allowed values are between 0 and 100.\n\t● <b>binary</b>: The allowed values are those defined by their base, in this case 0 and 1.\n\t● <b>hexadecimal</b>: The allowed values are those defined by their base, in this case from 0 to 9 and from A to F.\n\t● <b>hour</b>: The allowed values are from 00:00 to 23:59.\n\t● <b>custom</b>: Allows you to define a custom function/type. The subtype "custom" is fed from the function parameter, so if the control is defined as "custom", the function parameter will be mandatory.',
		example: '// Example of Integer subtype\nnew Constraint({target: "inputTextID", type: "int"});\n\n// Example of Hour subtype\nnew Constraint({target: "inputTextID", type: "hour"});\n\n// Example of Custom subtype (Number in octal format). The custom subtype needs \nnew Constraint({\n\ttarget: "inputTextID",\n\ttype: "custom",\n\tfunction: function(value) {\n\t\treturn /^[0-7]*$/i.test(value);\n\t},\n\tbase: 8,\n});'
	},
	increment: {
		type: 'string',
		description: 'Increases the value of the associated input the value set by "step". By default "step" is 1.',
		example: 'document.inputTextID.Constraint("increment");'
	},
	decrement: {
		type: 'string',
		description: 'Decrements the value of the associated input the value set by "step". By default "step" is 1.',
		example: 'document.inputTextID.Constraint("decrement");'
	},
};

/**
	 IntelliForm functionality
	 @version: 1.00
	 @author: Pablo E. Fernández (islavisual@gmail.com).
	 @Copyright 2017-2019 Islavisual.
	 @Last update: 19/03/2019
 **/
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
};

/**
	 Debugger functionality
	 @version: 1.00
	 @author: Pablo E. Fernández (islavisual@gmail.com).
	 @Copyright 2017-2019 Islavisual.
	 @Last update: 15/03/2019
 **/

WikiHelper.Debugger = {
	general: {
		version: 1.0,
		name: 'Debugger',
		help: 1,
		description: 'Automatic Debugger to develop with simpaty!.'  
	},
	init: {
	  type: "function",
	  description: "It is very easy to install and configure. It is enough to include the library in the HEAD of the page and a single instruction.",
	  example: '<script src="js/buglow/buglow-min.js"></script>\n// To debug through console\nbugLow.init("console");\n// To debug in an external window\nbugLow.init("window");'
	},
	attributesFilter: {
		type: "Object",
		description: 'Debugger allows you to selectively debug attributes independently or in combination. The way to specify what to observe is through an array of values that indicates what should be debugged. By default, attributesFilter is defined to empty.',
		example: '// Debug all attributes\nDebugger.attributesFilter = [];\nDebugger.init();\n\n// Debug only cellspacing and cellspadding attributes\nDebugger.attributesFilter = ["cellspacing", "cellspadding"];\nDebugger.init();'
	},
	excludedAttributesFilter: {
		type: "Object",
		description: 'Debugger allows you to selectively disable attributes to debug. The way to specify what not to observe is through an array of values that indicates what should not be debugged. By default, excludedAttributesFilter is defined to only the "style" attribute.',
		example: '// Do not debug style, class, id and src properties... others yes.\nDebugger.excludedAttributesFilter = ["style", "class", "id", "src"];\nDebugger.init();'
	},
	selectorsFilter: {
		type: "Object",
		description: 'Debugger allows you to selectively debug tags independently or in combination. The way to specify what to observe is through an array of values that indicates what should be debugged. By default, selectorsFilter is defined to empty.',
		example: '// Debug all tags\nDebugger.selectorsFilter = [];\nDebugger.init();\n\n// Debug only text box, dropdowns select and buttons\nDebugger.selectorsFilter = ["INPUT", "SELECT", "BUTTON"];\nDebugger.init();'
	},
	excludedSelectorsFilter: {
		type: "Object",
		description: 'Debugger allows you to selectively disable tags to debug. The way to specify what not to observe is through an array of values that indicates what should not be debugged. By default, excludedSelectorsFilter is defined to empty.',
		example: '// Do not debug DIV, SPAN, NAV and LEGENDS ... others yes.\nDebugger.excludedSelectorsFilter = ["DIV", "SPAN", "NAV", "LEGEND"];\nDebugger.init();'
	},
	eventsFilter: {
		type: "Object",
		description: 'Debugger allows you to selectively debug events independently or in combination. The way to specify what to observe is through an array of values that indicates what should be debugged.\n\r\nThe list of allowed events are all JavaScript, such as click, mouseover, mouseout, mouseenter, mouseleave, keydown, keyup, keypress, change, focusin, focusout, focus, blur, ...\n\r\nBy default, if the eventFilter parameter is left empty, the basic events will be observed, that is, change, click, focusin (focus), focusout (blur) and keydown since, this one, allows controlling the Ctrl, Alt and Shift keys ( capital letters).\n\r\nBy default, eventsFilter is defined to empty.',
		example: '// Debug predefined ones\nDebugger.eventsFilter = [];\nDebugger.init();\n\n// Debug only the change event.\nDebugger.eventsFilter = ["change"];\nDebugger.init();'
	},
	enableHistory:{
		type: "boolean",
		description: "It is possible to export the event history to a log file. To activate this feature, first, the enableHistory flag must be activated.",
		example: '// Activate the history (normally, established with the init () method)\nDebugger.enableHistory = true;\nDebugger,init();\n// ...\n// ... Actions ...\n// ...\n// Retrieve the history so far in a thread.\nDebugger.getHistory();',
	},
	getHistory:{
		type: "function",
		description: "To export the event history to a file, you can use the browser's save functionality. However, Debugger has one more way to achieve this requirement. To extract the event history you can execute the getHistory function that returns the history in string format (String).",
		example: '// Activate the history (normally, established with the init () method)\nDebugger.enableHistory = true;\nDebugger,init();\n// ...\n// ... Actions ...\n// ...\n// Retrieve the history so far in a thread.\nDebugger.getHistory();',
	},
	messages: {
		type: "Object",
		description: 'You can define personalized messages for each type of event or mutation.',
		example: "messages:{\n\tajaxBeforeSend:'Processing request. Method: &lt;method>. Type: &lt;type>. CrossDomain: &lt;crossDomain>.  File: &lt;url>. Content Type: &lt;contentType>',\n\tajaxComplete:'The Ajax processing request FINISHED for the &lt;url> file.',\n\tajaxSuccess:'The Ajax request was completed SUCCESSFULLY for the &lt;url> file.',\n\tajaxError:'An error occurred into Ajax processing request into &lt;url> file.',\n\tbeforeUnloadPage:'Page request unload',\n\tunloadPage:'Unloaded page',\n\terrorPage:'An error occurred into file',\n\tparsedPage:'Page loaded and parsed.',\n\tpageChangedStatus:'Page changed status:',\n\tvalueChanged: 'The &lt;selector> changed the value property to &lt;value>.',\n\tgetsFocus: '&lt;selector> gets focus.',\n\tlosesFocus: '&lt;selector> loses focus.',\n\tclick: 'User clicks into &lt;selector>.',\n\tattributeMutation: 'The &lt;attributeName> attribute has mutated from \"&lt;oldValue>\" to \"&lt;value>\" into &lt;selector> element.',\n\taddedChildren: 'Added children into &lt;selector> element. Total children: &lt;totalChildren>',\n\tremovedChildren: 'Removed children into &lt;selector> element. Total children: &lt;totalChildren>',\n\tmouseOver: 'The mouse pointer is over the &lt;selector> element.',\n\tmouseOut: 'The mouse pointer leaves the &lt;selector> element.',\n\tkeyPress: 'Keyboard event received into &lt;selector> element. Keys Combination: \"&lt;keys>\". Keys Combination Code: \"&lt;keysCode>\".',\n\tseparator: '&lt;div style=\"border: 1px solid #333; border-width: 0px 0px 1px 0px; height:5px; width:100%;margin-bottom: 5px;\">&nbsp;&lt;/div>'\n}"
	},
	colors: {
		type: "Object",
		description: '',
		example: "colors: {\n\t// For elements added in the DOM\n\tadded:\"#709050\",\n\t// For changes in attributes in the DOM\n\tattributeChanged: '#ff00ff',\n\t// Background of the BUGLOW window\n\tbackground:\"#000000\",\n\t// For events Blur\n\tblur:\"#907080\",\n\t// For Focus events\n\tfocus:\"#9070a0\",\n\t// For events Click\n\tclick:\"#909090\",\n\t// For Mouse Over events\n\tmouseOver:\"#a07090\",\n\t// For Mouse Out events\n\tmouseOut:\"#807090\",\n\t// For Keypress events\n\tkeyPress:\"#80a090\",\n\t// For detected errors\n\terror: '#a02020',\n\t// Header Text\n\theaderForeground:\"#ffffff\",\n\t// Header Background\n\theaderBackground:\"#333\",\n\t// For standard and unregistered changes\n\tnormal:\"#606060\",\n\t// For Ajax in mode Processing\n\tproccessing:\"#8AC007\",\n\t// For state changes of Ajax\n\treadyState:\"#8AC007\",\n\t// For deleted items in the DOM\n\tremoved:\"#a01010\",\n\t// For Ajax in Sending\n\tsending mode:\"#8AC007\",\n\t// For Ajax in Updating mode\n\tupdated:\"#80a0e0\",\n\t// For changes to the value attributes\n\tvalueChanged:\"#FE2466\"\n}"
	}
  }

/**
   DOM Helper																		
   @version: 1.00																					
   @author: Pablo E. Fernández (islavisual@gmail.com).												
   @Copyright 2017-2019 Islavisual. 																	
   @Last update: 27/02/2019																			
 **/

WikiHelper.DOM = {
	general: {
		version: 1.0,
		name: 'DOM.ready',
		description: "Functionality to management events, actions,... when the page is fully ready.",
	},
	noparams:{
		type: "void",
		description: "",
		example: "n// EXAMPLE of use case\nDOM.ready(function () {\n\t// Hide Loader\n\tsetTimeout(function () { document.querySelector('.loader').style.display = 'none'; }, 250);\n});"
	}
}

/**
   GetBrowser Helper																		
   @version: 1.00																					
   @author: Pablo E. Fernández (islavisual@gmail.com).												
   @Copyright 2017-2019 Islavisual. 																	
   @Last update: 27/01/2019																			
 **/

WikiHelper.GetBrowser = {
	general: {
		version: 1.0,
		name: 'GetBrowser',
		description: "Attempts to determine the capabilities of the user's browser through  the browser's information contains in the navigator object of JavaScript.",
	},
	additional: [
		{
			description: 'To recover the browser name:',
			example: 'var browser = new GetBrowser(), browserName = browser.name;'
		},
		{
			description: 'For know if the browser is Chrome:',
			example: 'var browser = new GetBrowser(), if(browser.chrome){ console.log("Your browser is Chrome!")}'
		},
		{
			description: 'For know if the browser is Firefox:',
			example: 'var browser = new GetBrowser(), if(browser.firefox){ console.log("Your browser is Firefox!")}'
		},
		{
			description: 'For know if the browser is Internet Explorer:',
			example: 'var browser = new GetBrowser(), if(browser.msie){ console.log("Your browser is Internet Explorer!")}'
		},
		{
			description: 'For know if the browser is Opera:',
			example: 'var browser = new GetBrowser(), if(browser.opera){ console.log("Your browser is Opera!")}'
		},
		{
			description: 'Get browser version:',
			example: 'var browser = new GetBrowser(), console.log(browser.version);'
		},
		{
			description: 'Get browser prefix:',
			example: 'var browser = new GetBrowser(), console.log(browser.prefix);'
		},
	],
}

/**
   GetParam Helper																		
   @version: 1.00																					
   @author: Pablo E. Fernández (islavisual@gmail.com).												
   @Copyright 2017-2019 Islavisual. 																	
   @Last update: 13/03/2019																			
 **/

WikiHelper.GetParam = {
	general: {
		version: 1.0,
		name: 'GetParam',
		description: "Function to get all the parameters values received from URL.",
	},
	additional: [
		{
			description: 'To get value of h:',
			example: 'var h = GetParam()["h"];'
		},
	]
}


/**
   HttpRequest Helper																		
   @version: 1.00																					
   @author: Pablo E. Fernández (islavisual@gmail.com).												
   @Copyright 2017-2019 Islavisual. 																	
   @Last update: 27/02/2019																			
 **/

WikiHelper.HttpRequest = {
	general: {
		version: 1.0,
		name: 'HttpRequest',
		description: "HttpRequest is a client script that provides a simple way to make remote requests or transfer data between a client and a server. This plugin is created entirely in JavaScript and designed to improve the performance of the application.",
	},
	ajax: {
		type: 'string',
		description: 'Boolean that indicates whether the request should be executed synchronously or not.',
		example: 'new HttpRequest({url: "index.html", ajax: true})'
	},
	callback: {
		type: 'function',
		description: 'Function to be called when the response is received.',
		example: 'new HttpRequest({callback: callback});\nfunction callback(e){\n\tconsole.log(e);\n}'
	},
	contentType: {
		type: 'function',
		description: 'Content type of recieved data. By default is <b>application/x-www-form-urlencoded</b>.\nThe most common values are:\n\t● <b>application/x-www-form-urlencoded</b> (responsiveType should be "text")\n\t● <b>text/html; charset=utf-8</b> (responsiveType should be "text")\n\t● <b>application/json; charset=utf-8</b> (responsiveType should be "json")\n\t● <b>application/octet-stream</b> (responsiveType should be "blob")\n\t● <b>application/pdf</b> (responsiveType should be "blob")',
		example: 'new HttpRequest({url: "getData.json", contentType: "application/json; charset=utf-8"})'
	},
	onAbort: {
		type: 'function',
		description: 'Is the function called when the request is aborted.',
		example: 'new HttpRequest({url: "index.html", onAbort: HttpRequestOnAbort});\nfunction HttpRequestOnAbort(event){\n\tconsole.log("The request was aborted", event);\n}'
	},
	onError: {
		type: 'function',
		description: 'Is the function called when the request fails due to an error.',
		example: 'new HttpRequest({url: "http://remoteaddress.com/data.php", onError: HttpRequestOnError});\nfunction HttpRequestOnError(event){\n\tconsole.log("An error occurred during the request", event);\n}'
	},
	onLoad: {
		type: 'function',
		description: 'Is the function called when the request completes successfully.',
		example: 'new HttpRequest({url: "document.pdf", onLoad: HttpRequestOnLoad});\nfunction HttpRequestOnLoad(event){\n\tconsole.log("Request completes successfully", event);\n}'
	},
	onloadEnd: {
		type: 'function',
		description: 'Is the function called when the request is completed for any reason.',
		example: 'new HttpRequest({url: "document.pdf", onLoadEnd: HttpRequestOnLoadEnd});\nfunction HttpRequestOnLoadEnd(event){\n\tconsole.log("Request was completed but it may not have been successful", event);\n}'
	},
	onloadStart: {
		type: 'function',
		description: 'Is the function called when the request starts transferring data.',
		example: 'new HttpRequest({url: "document.pdf", onLoadStart: HttpRequestOnLoadStart});\nfunction HttpRequestOnLoadStart(event){\n\tconsole.log("Starting to download", event);\n}'
	},
	onProgress: {
		type: 'function',
		description: 'Is the function called while the request be executing before success completely.',
		example: 'new HttpRequest({url: "document.pdf", onProgress: HttpRequestOnProgress});\nfunction HttpRequestOnProgress(event){\n\tconsole.log("Download underway", event);\n}'
	},
	onTimeout: {
		type: 'function',
		description: 'Is the function called when timeout is overcomed. Please, also look at the "timeout" property',
		example: 'new HttpRequest({url: "index.html", onTimeout: HttpRequestOnTimeout});\nfunction HttpRequestOnTimeout(event){\n\tconsole.log("Request exceeded the waiting time allowed", event);\n}'
	},
	method: {
		type: 'string',
		description: 'Your possibles values are <b>POST</b>, <b>GET</b>, <b>HEAD</b>, <b>PUT</b> or <b>DELETE</b>. By default the method is POST. Depending on the method and configuration of the server, an error 405 could happens.',
		example: 'new HttpRequest({url: "index.html", method: "GET"});'
	},
	parameters: {
		type: 'string',
		description: 'JSON with the parameters in format:\n{\n\tparameterName1: parameterValue1,\n\tparameterName2: parameterValue2,\n\t...\n}',
		example: 'new HttpRequest({url: "getDataFromServer.asp", method: "POST", parameters: { idProduct: 3 }});'
	},
	responseType: {
		type: 'string',
		description: 'The allowed values are can be:\n\t● <b>json</b>,\n\t● <b>text</b>,\n\t● <b>blob</b>\n\t● <b>arrayBuffer</b>.\nRemark: For HTML and JSON requests is not necessary define this parameter.',
		example: 'new HttpRequest({url: "getListProducts.json", responseType: "json", parameters: { idCategory: 3 }});'
	},
	returnFullResponse: {
		type: 'boolean',
		description: 'Indicates whether only the data or the object of the call should be returned.',
		example: 'new HttpRequest({url: "getDataFromServer.asp", returnFullResponse: true});'
	},
	timeout: {
		type: 'integer',
		description: 'Is the number of milliseconds the request can take before automatically being finished. By default is 0.',
		example: 'new HttpRequest({url: "http://stack.overflow.com/data", timeout: 300 });'
	},
	url: {
		type: 'string',
		description: 'URL of the request.',
		example: 'new HttpRequest({url: "getDataFromServer.xml",});'
	},
	withCredentials: {
		type: 'boolean',
		description: 'Indicates whether or not cross-site "Access-Control" requests should be made using credentials such as cookies, authorization headers or TLS client certificates. Setting withCredentials has no effect on same-site requests.',
		example: 'new HttpRequest({url: "getDataFromServer.asp", withCredentials: true});'
	},
}

/**
   Include Helper																		
   @version: 1.00																					
   @author: Pablo E. Fernández (islavisual@gmail.com).												
   @Copyright 2017-2019 Islavisual. 																	
   @Last update: 11/03/2019																			
 **/

WikiHelper.Include = {
	general: {
		version: 1.0,
		name: 'Include',
		description: "Script to insert HTML code inside a container. The file loading is done through Ajax in asynchronous mode and with POST method.",
	},
	additional: [
		{
			description: 'Exists a  For more information see DataInclude helper.',
			example: 'DataInclude()'
		}
	],
	data: {
		type: 'string',
		description: 'The HTML code / text to insert.',
		example: 'Include({\n\ttarget: "targetID",\n\tdata: \'&lt;section class="container">\\\n\t\t&lt;article id="art_01">\\\n\t\t\t...\\\n\t\t&lt;/article>\\\n\t&lt;/section>\'\n});'
	},
	file: {
		type: 'string',
		description: 'URL of file to insert in the container element.',
		example: 'Include({target: "targetID", file: "./customers/profile.html"});'
	},
	attribute: {
		type: 'string',
		description: 'The "attribute" parameter indicates what HTML custom data attribute will be used to recovery URL that will include data inside container layers (usually DIV, SECTION, ARTICLE,...).',
		example: '// Suppose the next source code with data-includes\n&lt;div>\n\t&lt;div class="container" data-include="./profileCard.html">&lt;/div>\n\t&lt;div class="container" data-include="./historical.html">&lt;/div>\n&lt;/div>\n\n Include({attribute: "data-include"});'
	},
	target: {
		type: 'string',
		description: 'ID of the container element where the the code will be inserted.',
		example: 'Include({target: "targetID", file: "./customers/profile.html"});'
	},
}

/**
   IsMobile Helper																		
   @version: 1.00																					
   @author: Pablo E. Fernández (islavisual@gmail.com).												
   @Copyright 2017-2019 Islavisual. 																	
   @Last update: 11/03/2019																			
 **/

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

/**
	 Create and send forms in real time.
	 @version: 1.00
	 @author: Pablo E. Fernández (islavisual@gmail.com).
	 @Copyright 2017-2019 Islavisual.
	 @Last update: 11/03/2019
	 @status PENDING to UPDATE
 **/
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

/**
   StripTags Helper																		
   @version: 1.00																					
   @author: Pablo E. Fernández (islavisual@gmail.com).												
   @Copyright 2017-2019 Islavisual. 																	
   @Last update: 13/03/2019																			
 **/

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

/**
   TreeView Helper
   @version: 1.00																					
   @author: Pablo E. Fernández (islavisual@gmail.com).
   @Copyright 2019 Islavisual.
   @Last update: 09/03/2019
 **/
WikiHelper.Treeview = {
	general: {
		version: 1.0,
		name: 'Treeview',
		description: "Treeview is a graphical user interface component that displays a hierarchical view of information. Each element can have zero, one or more sub-elements or children. Normally it is usually visualized as a tabulated list and each element reveals its sub-elements through a change of state (from expanded to collapsed or vice versa).",
	},
	additional: [
		{
			description: 'You can customize the styles through CSS rules. For example:',
			example: '// styles.css (from your site)\nul.treeview li .active { background: lightgray; color: rgb(51, 51, 51); }\nul.treeview li.search-box input { width: 100%; background: rgb(255, 255, 255); color: rgb(0, 0, 0); border: 1px solid rgba(0, 0, 0, 0.1); }\nul.treeview li i.icon { margin-right: 8px; }\nul.treeview li span { padding: 2px 5px; display: inline-block; }\nul.treeview li a { color: rgb(0, 153, 102); background: rgba(0, 0, 0, 0); }\nul.treeview li.collapsed ul { max-height: 0px; }\nul.treeview li ul { transition: all 0.3s ease 0s; max-height: 10000px; overflow: hidden; }\nul.treeview li i { cursor: pointer; }\nul.treeview li { color: rgb(0, 0, 0); }\nul.treeview, ul.treeview ul { list-style: none; }\nul.treeview { background: rgb(255, 255, 255); width: 100%; border: 1px solid rgba(0, 0, 0, 0.15); padding: 5px; }'
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
};

/**
	 Validator functionality
	 @version: 1.00
	 @author: Pablo E. Fernández (islavisual@gmail.com).
	 @Copyright 2017-2019 Islavisual.
	 @Last update: 17/03/2019
 **/

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
			example: '// Custom style to input field\n.validator-error\t{ box-shadow: 0 0 0 2px #f00 inset }\n//Custom color validation message\n.validator-error-msg\t{ background: rgba(255,0,0,0.1); width: 100%; display: block; padding: 5px; border: 1px solid rgba(255,0,0,0.2); }'
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
				WikiHelper[key].general.help = '<comm>// For general help about script/plugin</comm>\n' + WikiHelper[key].general.name + '.help();\n';
				WikiHelper[key].general.help += WikiHelper[key].general.name + ".help({theme: '" + (!cfg.hasOwnProperty('theme') ? 'DARK' : cfg.theme.toLowerCase()) + "'});\n";
				if(typeof Object.keys(aux)[0] != "undefined"){
					WikiHelper[key].general.help += '\n<comm>// For specific method or property</comm>\n' + WikiHelper[key].general.name + ".help({help: '" + Object.keys(aux)[0] + "', theme: '" + (!cfg.hasOwnProperty('theme') ? 'DARK' : cfg.theme.toLowerCase()) + "'});\n";
				}
			} else {
				WikiHelper[key].general.help = '<comm>// For general help about script/plugin</comm>\n' + WikiHelper[key].general.name + "('help');\n";
				WikiHelper[key].general.help += WikiHelper[key].general.name + "({help: '', theme: '" + (!cfg.hasOwnProperty('theme') ? 'DARK' : cfg.theme.toLowerCase()) + "'});\n";
				if(typeof Object.keys(aux)[0] != "undefined"){
					WikiHelper[key].general.help += '\n<comm>// For specific method or property</comm>\n' + WikiHelper[key].general.name + "({help: '" + Object.keys(aux)[0] + "', theme: '" + (!cfg.hasOwnProperty('theme') ? 'DARK' : cfg.theme.toLowerCase()) + "'});\n";
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
	<a href="#" onclick="Helper(\'index\', {theme: \'' + theme + '\'});">Go to Index</a>\
	<h2>Help screen to ' + general.name + " " + general.version.toFixed(2) + '</h2>\
	<p style="margin-top: 64px">'+ general.description + '</p>\
	<p>Script options:</p>\
	__TEXT__\
<div id="additionalH31p3r" style="display:none; margin-top: 32px">\
	<h3>Additional Information</h3>\
	__ADDITIONAL__\
</div>\
	<div id="h31p3rOptions">\
		<p>Helper options:</p>\
		<p style="padding-left: 32px;">\
			● <key>printOnScreen</key>: Boolean to indicates if show help into screen or into console. By default is true.<br/>\
			● <key>method</key>: Shows the help of the requested method.<br/>\
			● <key>property</key>: Shows the help of the requested property.<br/>\
			● <key>theme</key>: Your possibles values are "dark" or "dark". By default is dark.\
		</p>\
		<p>\
			<field>Examples</field>\
			__HELPEROPTIONS__\
		</p>\
	</div>';

	if (general.name.toLowerCase() == "index") {
		template = '<i class="btn-times" onclick="this.parentElement.remove(); document.body.style.position=\'\';"></i>\
		<h2>Table of Contents of isiTools ' +  general.version.toFixed(2) + '</h2>\
		<div style="margin-top: 64px">\
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
		AddCSSRule('', '#h31p3r comm, #h31p3r comm int, #h31p3r comm str, #h31p3r comm bool', 'color: ' + opt.commentColor + ';');
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
				text += '<h3>' + (prop + (type == "function" ? ' Method' : ' Property')) + '</h3>';
			} else if (general.name.toLowerCase() == "index") {
				var wprop = prop.indexOf(".") ? prop.split(".")[0] : prop;
				
				text += '<h3 onclick="' + WikiHelper[wprop].general.help.split("\n")[1] + '">' + wprop + '</h3>';
			}

			if (typeof help[prop] == "undefined") {
				text += '<span style="padding-left: 32px; color: ' + opt.stringColor + '">The Method / property requested is not defined. To review the help manual try command:</p>';
				text += '<span style="padding-left: 32px; color: ' + opt.stringColor + '"><code>' + (func) + '("help");</code></span></p>';
			}

			for (var key in help[prop]) {
				if (help[prop].hasOwnProperty("type") || general.name.toLowerCase() == "index") {
					text += '<field class="' + key.substr(0, 3) + '">' + key + '</field>' + (key == "type" ? '' : '');
					items = help[prop][key].split("\n");
					text += key == 'example' ? ('<code>' + styleItems(key, items) + '</code>') : styleItems(key, items);

				} 
			}

			for (var k = 0; k < help[prop].length; k++) {
				for (var subkey in help[prop][k]) {
					items = help[prop][k][subkey].split("\n");
					additional += '<field class="' + key.substr(0, 3) + '">' + subkey + '</field>' + (subkey == "type" ? '' : '');
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
		for (var i = 0; i < items.length; i++) {
			var aux = items[i];

			var color = opt.stringColor, tag = "text";
			if (key == "type") {
				color = aux == "string" ? opt.strColor : (aux == "function" ? opt.funcColor : (aux == "boolean" ? opt.boolColor : (aux == "integer" ? opt.intColor : (opt.nullColor))));
				tag = aux == "object" ? 'key' : (aux == "function" ? "func" : (aux == "boolean" ? 'bool' : (aux == "integer" ? 'int' : ('null'))));
			}

			// Set color and content to example lines
			if (key == "example") {
				aux = aux.replace(/[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+|px|em|rem|%|s)?/ig, function (s) { return '<int>' + s + '</int>' });
				aux = aux.replace(/"(.*?)"/g, function (s) { return '<str>' + s + '</str>' });
				aux = aux.replace(/'(.*?)'/g, function (s) { return '<str>' + s + '</str>' });
				aux = aux.replace(/true/ig, '<bool>true</bool>').replace(/false/ig, '<bool>false</bool>');
				aux = aux.replace(/function/ig, '<func>function</func>');
				aux = aux.replace(/null/ig, '<null>null</null>');
				aux = aux.indexOf("//") != -1 ? ('<comm>' + aux + '</comm>') : aux;
				aux = aux.replace(new RegExp(func + "(\\.|\\()", "ig"), function($0, $1){ return "<name>" + $0.substr(0, $0.length-1) + "</name>" + $1})
				aux += '<br/>';
			}

			text += key == "type" ? ('<type style="color: ' + color + '">' + aux + '</type>') : (key == 'example' ? aux : ('<' + tag + '>' + aux + '</' + tag + '>'));
		}
		return text;
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

			if (style == _string) {
				//if(/<b>/.test(match)){ arr.push(_bold); arr.push(''); }
				//if(/<\/b>/.test(match)){ arr.push(_normal); arr.push(''); }

				match = match.replace(/<b>/gm, "«").replace(/<\/b>/gm, "»");
			}

			match = match.replace(/\\t/ig, "\t")
				.replace(/\\n/ig, "\n")
				.replace(/\\r/ig, "\r")
				.replace(/\\"/ig, "'");

			return '%c' + match + '%c';
		});

		if (arr.length == 0) {
			console.log("The Method / property requested is not defined. To review the help manual try command:");
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
			Alert({title: cs + ' Helper', body: 'Helper not available!', styles: { body: { color: '#c01012' } } })
		else 
			alert('Helper not available!');
		return;
	}
}
