function Document()
{
	///////////////
	// Attributs //
	///////////////

	var filePath = "";
	var saved = true;

	var html = '<div class="document" ></div>';

    var component = new Component(html);

    var grid = new DocGrid();
    component.appendChild(grid);

	var iconsMenuParam = 
	[
		{ name: "run-script", iconFile: "icons", iconName: "play-icon", toolTip: "Run script", action: function() { execProgram(); } },
		{ name: "stop-script", iconFile: "icons", iconName: "stop-icon", toolTip: "Stop script", action: function() { stopProgram(); } },
		{ name: "refresh-script", iconFile: "icons", iconName: "refresh-icon", toolTip: "Stop script", action: function() { refreshProgram(); } },
		{ name: "add-script", iconFile: "icons", iconName: "add-element-icon", toolTip: "Add script", action: function() { addScript(); } },
	];

	var iconsMenu = new IconsMenu(iconsMenuParam, 20);

	iconsMenu.hide("stop-script");
	iconsMenu.hide("refresh-script");

	grid.getById('toolsPanel').appendChild(iconsMenu);

	var tabManager = new TabManager();
	tabManager.setEditMode(true);

	var mainScriptEditor = new CodeEditor('javascript');

	var mainTab = new Tab('<span>' + "main.js" + '</span>', mainScriptEditor);
	tabManager.addTab(mainTab);

	var script = new Component('<script type="text/javascript" ></script>');
	var errorConsoleHTML = '<pre><code id="errorConsole" ></code></pre>';
	var errorConsole = new Component(errorConsoleHTML);
	var midiConsoleHTML = '<pre><code id="midiConsole" ></code></pre>';
	var midiConsole = new Component(midiConsoleHTML);

	grid.getById('topPanel').appendChild(tabManager);
	grid.getById('leftPanel').appendChild(errorConsole);
	grid.getById('rightPanel').appendChild(midiConsole);

	// Ajouter un bouton pour accéder à une bibliothèque d'assets

	//////////////
	// Méthodes //
	//////////////

	var scriptNameIsOk = function($scriptName)
	{
		var scriptNameOk = false;
		var scriptName = $scriptName.replace(/\.js$/, "");

		if (/^[a-zA-Z0-9]+$/.test(scriptName))
			scriptNameOk = true;

		return scriptNameOk;
	};

	var scriptNameDoesntExist = function($scriptName)
	{
		var scriptNameOk = true;
		var scriptName = $scriptName.replace(/\.js$/, "");

		var tabList = tabManager.getTabList();

		for (var i = 0; i < tabList.length; i++)
		{
			var label = tabList[i].getLabel();
			label = label.replace(/<span>/ig, "").replace(/<\/span>$/ig, "").replace(/\.js$/, "");

			if (label === scriptName)
				scriptNameOk = false;
		}

		return scriptNameOk;
	};

	var addScript = function()
	{
		var addScriptPopup = new ConfirmPopup('<h3>Add script</h3><p><input id="script-name" type="text" placeholder="Script name" /></p>');

		addScriptPopup.onOk = function()
		{
			var ok = false;

			var scriptName = this.getById('script-name').value;

			if (utils.isset(scriptName) && scriptName !== "" && scriptNameIsOk(scriptName) === true && scriptNameDoesntExist(scriptName) === true)
			{
				var newCodeEditor = new CodeEditor('javascript');
				scriptName = scriptName.replace(/\.js$/, "");
				var newTab = new Tab('<span>' + scriptName + '.js</span>', newCodeEditor);
				tabManager.addTab(newTab);

				newTab.onClose = function()
				{
					var close = false;
					var label = this.getLabel();
					label = label.replace(/<span>/ig, "").replace(/<\/span>$/ig, "").replace(/\.js$/, "");
					var removePopup = new ConfirmPopup('<p>Are you sure you want to remove the script "' + label + '" ? </p>');
					document.getElementById('main').appendChild(removePopup);
					removePopup.tabToRemove = this;

					removePopup.onOk = function()
					{
						var removeOk = true;
						this.tabToRemove.onClose = function() { return true; };
						tabManager.removeTab(this.tabToRemove);
						return removeOk;
					};

					return close;
				};

				newTab.onSelect = function($tab) { $tab.getContent().restoreScroll(); };

				newCodeEditor.onChange = function($code) { onChange($code); };

				$this.setSaved(false);
				ok = true;
			}
			else if (scriptNameIsOk(scriptName) !== true)
			{
				ok = false;
				var infoPopup = new InfoPopup('<p>The script name is incorrect (only ASCII characters).</p>');
				document.getElementById('main').appendChild(infoPopup);
			}
			else if (scriptNameDoesntExist(scriptName) !== true)
			{
				ok = false;
				var infoPopup = new InfoPopup('<p>A script with this name already exists.</p>');
				document.getElementById('main').appendChild(infoPopup);
			}
			else
			{
				ok = false;
				var infoPopup = new InfoPopup('<p>The script name can\'t be empty.</p>');
				document.getElementById('main').appendChild(infoPopup);
			}

			return ok;
		};

		document.getElementById('main').appendChild(addScriptPopup);
	};

	this.focusCodeEditor = function()
	{

	};

	this.play = function()
	{
		Sequence.playLive();
	};

	this.stop = function()
	{
		Sequence.stopLive();
	};

	/*
	var execCode = function($code)
	{
		console.log($code);

		var code = $code.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

		var scriptParent = script.parentNode;

		if (utils.isset(scriptParent))
			scriptParent.removeChild(script);
		
		Sequence.empty();
		viewManager.refresh();

		script = new Component('<script type="text/javascript" >var scriptToExec = function() { ' + code + '\n};\n try { scriptToExec();\nviewManager.emptyError();\nviewManager.emptyMIDI();\nviewManager.play(); }\ncatch($error) { viewManager.displayError($error); } </script>');
		document.getElementById('main').appendChild(script);
	};
	//*/

	var onChange = function($code)
	{
		$this.setSaved(false);
	};

	var execProgram = async function()
	{
		iconsMenu.hide("run-script");
		iconsMenu.display("stop-script");
		iconsMenu.display("refresh-script");

		viewManager.emptyError();
		Sequence.empty();
		viewManager.refresh();

		if (utils.isset(execConfig))
		{
			for (var i = 0; i < execConfig.scripts.length; i++)
				Loader.removeScript(execConfig.scripts[i].tmpFile);
		}

		var plugins = viewManager.getPlugins();

		for (var i = 0; i < plugins.length; i++)
			Loader.removeScript(plugins[i]);

		plugins = window.electronAPI.refreshPlugIns();

		for (var i = 0; i < plugins.length; i++)
			Loader.addScript(plugins[i], plugins[i]);
		
		var tmpCode = $this.getCode();

		execConfig = await window.electronAPI.execProgram(filePath, tmpCode);

		if (utils.isset(execConfig))
		{
			for (var i = 0; i < execConfig.scripts.length; i++)
			{
				if (execConfig.scripts[i].name !== 'main' && execConfig.scripts[i].name !== 'main.js')
					Loader.addScript('file://' + execConfig.scripts[i].tmpFile, execConfig.scripts[i].tmpFile);
					//Loader.addScript('file://' + filePath + '/run/' + execConfig.scripts[i].tmpFile, execConfig.scripts[i].tmpFile);
			}

			Loader.onload = function()
			{
				for (var i = 0; i < execConfig.scripts.length; i++)
				{
					if (execConfig.scripts[i].name === 'main' || execConfig.scripts[i].name === 'main.js')
						Loader.addScript('file://' + execConfig.scripts[i].tmpFile, execConfig.scripts[i].tmpFile);
						//Loader.addScript('file://' + filePath + '/run/' + execConfig.scripts[i].tmpFile, execConfig.scripts[i].tmpFile);
				}

				Loader.onload = function()
				{
					viewManager.emptyMIDI();
					viewManager.play();
				};

				Loader.load();
			};

			Loader.load();
		}

		//viewManager.save();

		/*
		var codeToExec = mainScriptEditor.getCode();

		var tabList = tabManager.getTabList();

		for (var i = 0; i < tabList.length; i++)
		{
			var label = tabList[i].getLabel();
			label = label.replace(/<span>/ig, "").replace(/<\/span>$/ig, "").replace(/\.js$/, "");
			
			if (label !== 'main')
			{
				var scriptCode = tabList[i].getContent().getCode();
				codeToExec = codeToExec.replace("loadScript('" + label + "')", scriptCode);
				codeToExec = codeToExec.replace("loadScript('" + label + ".js')", scriptCode);
				codeToExec = codeToExec.replace('loadScript("' + label + '")', scriptCode);
				codeToExec = codeToExec.replace('loadScript("' + label + '.js")', scriptCode);
				codeToExec = codeToExec.replaceAll("loadScript('" + label + "')", '');
				codeToExec = codeToExec.replaceAll("loadScript('" + label + ".js')", '');
				codeToExec = codeToExec.replaceAll('loadScript("' + label + '")', '');
				codeToExec = codeToExec.replaceAll('loadScript("' + label + '.js")', '');
			}
			else
			{
				codeToExec = codeToExec.replaceAll("loadScript('main')", '');
				codeToExec = codeToExec.replaceAll("loadScript('main.js')", '');
				codeToExec = codeToExec.replaceAll('loadScript("main")', '');
				codeToExec = codeToExec.replaceAll('loadScript("main.js")', '');
			}
		}

		execCode(codeToExec);
		//*/
	};

	var stopProgram = function()
	{
		viewManager.stop();
		iconsMenu.display("run-script");
		iconsMenu.hide("stop-script");
		iconsMenu.hide("refresh-script");
	};

	/*
	var refreshCode = function($code)
	{
		console.log($code);

		var code = $code.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

		var scriptParent = script.parentNode;

		if (utils.isset(scriptParent))
			scriptParent.removeChild(script);
		
		Sequence.empty();
		viewManager.refresh();

		script = new Component('<script type="text/javascript" >var scriptToExec = function() { ' + code + '\n};\n try { scriptToExec();\nviewManager.emptyError(); }\ncatch($error) { viewManager.displayError($error); } </script>');
		document.getElementById('main').appendChild(script);
	};
	//*/

	var refreshProgram = async function()
	{
		viewManager.emptyError();
		Sequence.empty();
		viewManager.refresh();

		if (utils.isset(execConfig))
		{
			for (var i = 0; i < execConfig.scripts.length; i++)
				Loader.removeScript(execConfig.scripts[i].tmpFile);
		}

		var plugins = window.electronAPI.refreshPlugIns();

		for (var i = 0; i < plugins.length; i++)
		{
			Loader.removeScript(plugins[i]);
			Loader.addScript(plugins[i], plugins[i]);
		}

		var tmpCode = $this.getCode();

		execConfig = await window.electronAPI.execProgram(filePath, tmpCode);

		if (utils.isset(execConfig))
		{
			for (var i = 0; i < execConfig.scripts.length; i++)
			{
				if (execConfig.scripts[i].name !== 'main' && execConfig.scripts[i].name !== 'main.js')
					Loader.addScript('file://' + execConfig.scripts[i].tmpFile, execConfig.scripts[i].tmpFile);
					//Loader.addScript('file://' + filePath + '/run/' + execConfig.scripts[i].tmpFile, execConfig.scripts[i].tmpFile);
			}

			Loader.onload = function()
			{
				for (var i = 0; i < execConfig.scripts.length; i++)
				{
					if (execConfig.scripts[i].name === 'main' || execConfig.scripts[i].name === 'main.js')
						Loader.addScript('file://' + execConfig.scripts[i].tmpFile, execConfig.scripts[i].tmpFile);
						//Loader.addScript('file://' + filePath + '/run/' + execConfig.scripts[i].tmpFile, execConfig.scripts[i].tmpFile);
				}

				Loader.onload = function() {};
				Loader.load();
			};

			Loader.load();
		}

		/*
		var codeToExec = mainScriptEditor.getCode();

		var tabList = tabManager.getTabList();

		for (var i = 0; i < tabList.length; i++)
		{
			var label = tabList[i].getLabel();
			label = label.replace(/<span>/ig, "").replace(/<\/span>$/ig, "").replace(/\.js$/, "");
			
			if (label !== 'main')
			{
				var scriptCode = tabList[i].getContent().getCode();
				codeToExec = codeToExec.replace("loadScript('" + label + "')", scriptCode);
				codeToExec = codeToExec.replace("loadScript('" + label + ".js')", scriptCode);
				codeToExec = codeToExec.replace('loadScript("' + label + '")', scriptCode);
				codeToExec = codeToExec.replace('loadScript("' + label + '.js")', scriptCode);
				codeToExec = codeToExec.replaceAll("loadScript('" + label + "')", '');
				codeToExec = codeToExec.replaceAll("loadScript('" + label + ".js')", '');
				codeToExec = codeToExec.replaceAll('loadScript("' + label + '")', '');
				codeToExec = codeToExec.replaceAll('loadScript("' + label + '.js")', '');
			}
			else
			{
				codeToExec = codeToExec.replaceAll("loadScript('main')", '');
				codeToExec = codeToExec.replaceAll("loadScript('main.js')", '');
				codeToExec = codeToExec.replaceAll('loadScript("main")', '');
				codeToExec = codeToExec.replaceAll('loadScript("main.js")', '');
			}
		}

		refreshCode(codeToExec);
		//*/
	};

	/*
	this.insertAsset = function($data)
	{
		var selectedTab = tabManager.getSelected();

		if (utils.isset(selectedTab))
		{
			var selectedScriptEditor = selectedTab.getContent();
			//selectedScriptEditor.getById('editor').appendChild(document.createTextNode('\n\rvar asset = new Asset("' + $data + '");'));
			//selectedScriptEditor.getById('editor').appendChild(new Component('<p style="padding: 0px; margin: 0px; height: 0px;" ></p>'));
			//selectedScriptEditor.getById('editor').appendChild(document.createTextNode('\n\r'));
			//selectedScriptEditor.refresh();
			var codeToInsert = '\n\rvar asset = new Asset("' + $data + '");\n\r';
			selectedScriptEditor.insertCode(codeToInsert);
			$this.setSaved(false);
		}
	};
	//*/

	this.insertCode = function($code)
	{
		var selectedTab = tabManager.getSelected();

		if (utils.isset(selectedTab))
		{
			var selectedScriptEditor = selectedTab.getContent();
			//selectedScriptEditor.insertCode('\n\r' + $code + '\n\r');
			selectedScriptEditor.insertCode('\n\r' + $code.replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>') + '\n\r');
			$this.setSaved(false);
		}
	};

	this.restoreScroll = function()
	{
		var selectedTab = tabManager.getSelected();

		if (utils.isset(selectedTab))
		{
			var selectedScriptEditor = selectedTab.getContent();
			selectedScriptEditor.restoreScroll();
		}
	};

	this.displayError = function($message, $source, $lineno, $colno, $error)
	{
		var source = $source;

		if (utils.isset(execConfig))
		{
			for (var i = 0; i < execConfig.scripts.length; i++)
			{
				if ($source.indexOf(execConfig.scripts[i].tmpFile) >= 0)
					source = execConfig.scripts[i].name;
			}
		}

		var stack = (new Error()).stack;
		errorConsole.getById('errorConsole').innerHTML = errorConsole.getById('errorConsole').innerHTML + $message + ' (at ' + source + '.js:' + $lineno + ':' + $colno + ')<br />';
	};

	this.emptyError = function()
	{
		errorConsole.getById('errorConsole').innerHTML = "";

		var scriptParent = script.parentNode;

		if (utils.isset(scriptParent))
			scriptParent.removeChild(script);
	};

	this.displayMIDI = function($midiData)
	{
		console.log($midiData);
		midiConsole.getById('midiConsole').appendChild(document.createTextNode($midiData));
		midiConsole.getById('midiConsole').appendChild(document.createElement('br'));
	};

	this.emptyMIDI = function()
	{
		midiConsole.getById('midiConsole').innerHTML = "";
	};

	////////////////////////////
	// Gestion des événements //
	////////////////////////////

	mainTab.onClose = function()
	{
		var close = false;
		var infoPopup = new InfoPopup('<p>Main script can\'t be removed.</p>');
		document.getElementById('main').appendChild(infoPopup);
		return close;
	};

	//this.onKeyDown = function($event) { mainScriptEditor.onKeyDown($event); };
	mainScriptEditor.onChange = function($code) { onChange($code); };

	////////////////
	// Accesseurs //
	////////////////

	// GET
	
	this.getFilePath = function() { return filePath; };
	this.isSaved = function() { return saved; };

	this.getCode = function()
	{
		var code = {};

		var tabList = tabManager.getTabList();

		for (var i = 0; i < tabList.length; i++)
		{
			var label = tabList[i].getLabel();
			label = label.replace(/<span>/ig, "").replace(/<\/span>$/ig, "").replace(/\.js$/, "");
			var scriptCode = tabList[i].getContent().getCode();
			code[label] = scriptCode;
		}

		return code;
	};
	
	// SET
	
	this.setFilePath = function($filePath) { filePath = $filePath; };

	this.setSaved = function($saved)
	{
		saved = $saved;
		viewManager.updateSavedStatus(saved);

		if (saved === false)
			window.electronAPI.setNotSavedFiles(true);
	};

	this.setCode = function($code)
	{
		console.log($code);

		for (var key in $code)
		{
			if (key === 'main')
				mainScriptEditor.setCode($code['main']);
			else
			{
				var newCodeEditor = new CodeEditor('javascript');
				var newTab = new Tab('<span>' + key + '.js</span>', newCodeEditor);
				tabManager.addTab(newTab);

				newTab.onClose = function()
				{
					var close = false;
					var label = this.getLabel();
					label = label.replace(/<span>/ig, "").replace(/<\/span>$/ig, "").replace(/\.js$/, "");
					var removePopup = new ConfirmPopup('<p>Are you sure you want to remove the script "' + label + '" ? </p>');
					document.getElementById('main').appendChild(removePopup);
					removePopup.tabToRemove = this;

					removePopup.onOk = function()
					{
						var removeOk = true;
						this.tabToRemove.onClose = function() { return true; };
						tabManager.removeTab(this.tabToRemove);
						return removeOk;
					};

					return close;
				};

				newCodeEditor.setCode($code[key]);
				newCodeEditor.onChange = function($code) { onChange($code); };
			}
		}

		tabManager.getTabList()[0].select();
	};
	
	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(component, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("document");
