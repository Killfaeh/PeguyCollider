
///////////////////////
// Appel des modules //
///////////////////////

const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const os = require("os");
const fs = require('fs');
const MidiWriter = require('midi-writer-js');

/*
// Start with a new track
const track = new MidiWriter.Track();

// Define an instrument (optional):
//track.addEvent(new MidiWriter.ProgramChangeEvent({instrument: 1}));

// Add some notes:
// notes = ["G2",  [null, "G2"],  null,  "Bb2",  "C3",  "G2",  [null, "G2"],  null,  "F2",  "F#2"];
var note = new MidiWriter.NoteEvent({pitch: ['G2'], duration: '4'});
track.addEvent(note);
note = new MidiWriter.NoteEvent({wait: '8'});
track.addEvent(note);
note = new MidiWriter.NoteEvent({pitch: ['G2'], duration: '8'});
track.addEvent(note);
note = new MidiWriter.NoteEvent({wait: '4'});
track.addEvent(note);
note = new MidiWriter.NoteEvent({pitch: ['Bb2'], duration: '4'});
track.addEvent(note);
note = new MidiWriter.NoteEvent({pitch: ['C3'], duration: '4'});
track.addEvent(note);
note = new MidiWriter.NoteEvent({pitch: ['G2'], duration: '4'});
track.addEvent(note);
note = new MidiWriter.NoteEvent({wait: '8'});
track.addEvent(note);
note = new MidiWriter.NoteEvent({pitch: ['G2'], duration: '8'});
track.addEvent(note);
note = new MidiWriter.NoteEvent({wait: '4'});
track.addEvent(note);
note = new MidiWriter.NoteEvent({pitch: ['F2'], duration: '4'});
track.addEvent(note);
note = new MidiWriter.NoteEvent({pitch: ['F#2'], duration: '4'});
track.addEvent(note);

// Generate a data URI
const write = new MidiWriter.Writer(track);
console.log(write.dataUri());
//*/

/*
const track = new MidiWriter.Track();

track.addEvent([
		new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4'}),
		new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'}),
		new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4'}),
		new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'}),
		new MidiWriter.NoteEvent({pitch: ['C4', 'C4', 'C4', 'C4', 'D4', 'D4', 'D4', 'D4'], duration: '8'}),
		new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4'}),
		new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'})
	], function(event, index) {
    return {sequential: false};
  }
);

const write = new MidiWriter.Writer(track);
console.log(write.dataUri());
//*/

var mainWindow = null;

////////////////////////
// Options par défaut //
////////////////////////

const userHomeDir = os.homedir();

//fs.writeFileSync(userHomeDir + '/Documents/Peguy/Collider/testMissionImpossible.mid', write.dataUri().replace(/^data:audio\/midi;base64,/, ""), 'base64');
//fs.writeFileSync(userHomeDir + '/Documents/Peguy/Collider/hotCrossBuns.mid', write.dataUri().replace(/^data:audio\/midi;base64,/, ""), 'base64');

var isNotSavedFiles = false;
var recentFiles = { recentFiles: [] };
var vectorialAssets = { assets: [] };
var threeDAssets = { assets: [] };
var plugIns = [];

///////////////
// Fonctions //
///////////////

//// Utilitaires ////

function updateRecentFiles($filePath)
{
	var index = recentFiles.recentFiles.indexOf($filePath);

	if (index >= 0)
		recentFiles.recentFiles.splice(index, 1);

	recentFiles.recentFiles.push($filePath);

	if (recentFiles.recentFiles.length > 15)
		recentFiles.recentFiles.shift();

	fs.writeFileSync(userHomeDir + '/Documents/Peguy/Collider/recentFiles.json', JSON.stringify(recentFiles));

	mainWindow.webContents.executeJavaScript("viewManager.updateRecentFiles(" + JSON.stringify(recentFiles) + ");");
}

//// Appelée par l'interface graphique ////

function handleSetNotSavedFiles($event, $isNotSavedFiles)
{
	isNotSavedFiles = $isNotSavedFiles;
}

async function handleLoadSettingsInGUI()
{
	mainWindow.webContents.executeJavaScript("viewManager.updateRecentFiles(" + JSON.stringify(recentFiles) + ");");
	mainWindow.webContents.executeJavaScript("viewManager.updatePlugIns(" + JSON.stringify({ plugIns: plugIns }) + ");");
	//mainWindow.webContents.executeJavaScript("viewManager.updateVectorialAssetManager(" + JSON.stringify(vectorialAssets) + ");");
	//mainWindow.webContents.executeJavaScript("viewManager.update3dAssetManager(" + JSON.stringify(threeDAssets) + ");");
}

function loadPlugIns()
{
	var tmpPluginsPath = userHomeDir + '/Documents/Peguy/Collider/PlugIns/tmp'; 

	if (fs.existsSync(tmpPluginsPath))
		fs.rmSync(tmpPluginsPath, { recursive: true, force: true });
		
	fs.mkdirSync(tmpPluginsPath, { recursive: true });

	var index = 1;
	var timestamp = (new Date()).getTime();

	plugIns = [];

	var files = fs.readdirSync('PlugIns');

	for (var file of files)
	{
		if (fs.lstatSync('PlugIns/' + file).isDirectory())
		{
			var subFiles = fs.readdirSync('PlugIns/' + file);

			for (var subFile of subFiles)
			{
				if (subFile !== 'main.js')
				{
					var tmpFilePath = tmpPluginsPath + '/plugin-' + timestamp + '-' + index + '.js';
					var filepath = __dirname + '/PlugIns/' + file + '/' + subFile;
					var fileContent = fs.readFileSync(filepath, "utf8");
					fs.writeFileSync(tmpFilePath, fileContent + '\n\nif (Loader !== null && Loader !== undefined)\n\tLoader.hasLoaded("' + tmpFilePath + '");');
					plugIns.push(tmpFilePath.replace('C:/', ''));
				}
			}
		}
		else if (/\.js$/.test(file))
		{
			var tmpFilePath = tmpPluginsPath + '/plugin-' + timestamp + '-' + index + '.js';
			var filepath = __dirname + '/' + path.join('PlugIns', file);
			var fileContent = fs.readFileSync(filepath, "utf8");
			fs.writeFileSync(tmpFilePath, fileContent + '\n\nif (Loader !== null && Loader !== undefined)\n\tLoader.hasLoaded("' + tmpFilePath + '");');
			plugIns.push(tmpFilePath.replace('C:/', ''));
		}

		index++;
	}

	files = fs.readdirSync(userHomeDir + '/Documents/Peguy/Collider/PlugIns');

	for (var file of files)
	{
		if (fs.lstatSync(userHomeDir + '/Documents/Peguy/Collider/PlugIns/' + file).isDirectory())
		{
			var subFiles = fs.readdirSync(userHomeDir + '/Documents/Peguy/Collider/PlugIns/' + file);

			for (var subFile of subFiles)
			{
				if (subFile !== 'main.js')
				{
					var tmpFilePath = tmpPluginsPath + '/plugin-' + timestamp + '-' + index + '.js';
					var filepath = userHomeDir + '/Documents/Peguy/Collider/PlugIns/' + file + '/' + subFile;
					var fileContent = fs.readFileSync(filepath, "utf8");
					fs.writeFileSync(tmpFilePath, fileContent + '\n\nif (Loader !== null && Loader !== undefined)\n\tLoader.hasLoaded("' + tmpFilePath + '");');
					plugIns.push(tmpFilePath.replace('C:/', ''));
				}
			}
		}
		else if (/\.js$/.test(file))
		{
			var tmpFilePath = tmpPluginsPath + '/plugin-' + timestamp + '-' + index + '.js';
			var filepath = path.join(userHomeDir + '/Documents/Peguy/Collider/PlugIns', file);
			var fileContent = fs.readFileSync(filepath, "utf8");
			fs.writeFileSync(tmpFilePath, fileContent + '\n\nif (Loader !== null && Loader !== undefined)\n\tLoader.hasLoaded("' + tmpFilePath + '");');
			plugIns.push(tmpFilePath.replace('C:/', ''));
		}

		index++;
	}
}

async function handleRefreshPlugIns()
{
	loadPlugIns();
	await mainWindow.webContents.executeJavaScript("viewManager.updatePlugIns(" + JSON.stringify({ plugIns: plugIns }) + ");");
	return plugIns;
}

async function handleOpenFile()
{
	var output = [];

	const { canceled, filePaths } = await dialog.showOpenDialog();
	
	if (!canceled)
	{
		for (var i = 0; i < filePaths.length; i++)
		{
			var filePath = filePaths[i];
			filePath = filePath.replace(/\/project.json$/, '').replace(/\\project.json$/, '');

			if (fs.existsSync(filePath) && fs.existsSync(filePath + '/project.json'))
			{
				var tmp = filePath.split('/');
				var fileName = tmp[tmp.length-1];
				var configContent = fs.readFileSync(filePath + '/project.json', "utf8");
				var config = JSON.parse(configContent);
				var filesContent = {};

				for (var i = 0; i < config.scripts.length; i++)
				{
					if (fs.existsSync(filePath + '/' + config.scripts[i] + '.js'))
						filesContent[config.scripts[i]] = fs.readFileSync(filePath + '/' + config.scripts[i] + '.js', "utf8");
				}

				output.push({ name: fileName, path: filePath, content: filesContent});
				updateRecentFiles(filePath);
			}
		}
	}

	return output;
}

async function handleOpenRecentFile($event, $filePath)
{
	var output = null;

	if (fs.existsSync($filePath))
	{
		var tmp = $filePath.split('/');
		var fileName = tmp[tmp.length-1];
		var configContent = fs.readFileSync($filePath + '/project.json', "utf8");
		var config = JSON.parse(configContent);
		var filesContent = {};

		for (var i = 0; i < config.scripts.length; i++)
		{
			if (fs.existsSync($filePath + '/' + config.scripts[i] + '.js'))
				filesContent[config.scripts[i]] = fs.readFileSync($filePath + '/' + config.scripts[i] + '.js', "utf8");
		}

		output = { name: fileName, path: $filePath, content: filesContent};
		updateRecentFiles($filePath);
	}

	return output;
}

async function handleSaveFileAs($event, $content)
{
	var output = null;

	const { canceled, filePath } = await dialog.showSaveDialog(BrowserWindow);

	if (!canceled && filePath)
	{
		var tmp = filePath.split('/');
		var fileName = tmp[tmp.length-1];
		fs.mkdirSync(filePath);

		var projectConfig = { projectName: fileName, scripts: [] };

		for (key in $content)
		{
			projectConfig.scripts.push(key);
			fs.writeFileSync(filePath + '/' + key + '.js', $content[key]);
		}

		fs.writeFileSync(filePath + '/project.json', JSON.stringify(projectConfig));

		output = { name: fileName, path: filePath, content: $content};
		updateRecentFiles(filePath);
	}

	return output;
}

async function handleSaveFile($event, $filePath, $content)
{
	var output = null;

	var tmp = $filePath.split('/');
	var fileName = tmp[tmp.length-1];

	var projectConfig = { projectName: fileName, scripts: [] };

	for (key in $content)
	{
		projectConfig.scripts.push(key);
		fs.writeFileSync($filePath + '/' + key + '.js', $content[key]);
	}

	fs.writeFileSync($filePath + '/project.json', JSON.stringify(projectConfig));

	output = { name: fileName, path: $filePath, content: $content};
	updateRecentFiles($filePath);

	return output;
}

async function handleExecProgram($event, $filePath, $content)
{
	var tmp = $filePath.split('/');
	var fileName = tmp[tmp.length-1];

	if ($filePath === null || $filePath === '')
		$filePath = userHomeDir + '/Documents/Peguy/Collider';

	if (fs.existsSync($filePath + '/run'))
		fs.rmSync($filePath + '/run', { recursive: true, force: true });
		
	fs.mkdirSync($filePath + '/run');

	var index = 1;
	var timestamp = (new Date()).getTime();

	if (fileName === null || fileName === '')
		fileName = 'tmp';

	var projectConfig = { projectName: fileName, scripts: [] };

	for (key in $content)
	{
		var tmpFileName = key + '-' + timestamp + '-' + index + '.js';
		var tmpFilePath = $filePath + '/run/' + tmpFileName;
		var codeToSave = $content[key] + '\n\nif (Loader !== null && Loader !== undefined)\n\tLoader.hasLoaded("' + tmpFilePath + '");';
		projectConfig.scripts.push({ name: key, tmpFile: tmpFilePath.replace('C:/', '') });
		fs.writeFileSync(tmpFilePath, codeToSave);
		index++;
	}

	return projectConfig;
}

async function handleSaveAsMIDI($event, $projectPath, $filePath, $data)
{
	console.log("SAVE DATA AS MIDI : ");
	console.log($data);

	var output = null;

	var track = new MidiWriter.Track();
	track.setTempo($data.bpm);

	for (var i = 0; i < $data.sequence.length; i++)
		track.addEvent(new MidiWriter.NoteEvent($data.sequence[i]));

	var write = new MidiWriter.Writer(track);

	var filePath = $filePath;

	if (!/^\/.*/.test($filePath))
		filePath = $projectPath + '/' + $filePath;

	fs.writeFileSync(filePath, write.dataUri().replace(/^data:audio\/midi;base64,/, ""), 'base64');

	output = { path: $filePath, content: $data};
	return output;
}

/*
async function handleSaveVectorialAssets($event, $assets)
{
	vectorialAssets.assets = JSON.parse($assets);
	fs.writeFileSync(userHomeDir + '/Documents/Peguy/3D/vectorialAssets.json', $assets);
};
//*/

function handleQuit()
{
	app.quit();
};

////////////////////////////////
// Démarrage de l'application //
////////////////////////////////

// Initialisation des options par défaut

if (!fs.existsSync(userHomeDir + '/Documents/Peguy'))
	fs.mkdirSync(userHomeDir + '/Documents/Peguy');

if (!fs.existsSync(userHomeDir + '/Documents/Peguy/Collider'))
	fs.mkdirSync(userHomeDir + '/Documents/Peguy/Collider');

if (!fs.existsSync(userHomeDir + '/Documents/Peguy/Collider/recentFiles.json'))
	fs.writeFileSync(userHomeDir + '/Documents/Peguy/Collider/recentFiles.json', JSON.stringify(recentFiles));
else
{
	var fileContent = fs.readFileSync(userHomeDir + '/Documents/Peguy/Collider/recentFiles.json', "utf8");
	recentFiles = JSON.parse(fileContent);
}

if (!fs.existsSync(userHomeDir + '/Documents/Peguy/Collider/PlugIns'))
	fs.mkdirSync(userHomeDir + '/Documents/Peguy/Collider/PlugIns');

// A voir si à terme je peux pas proposer un système d'import d'instruments
/*
if (!fs.existsSync(userHomeDir + '/Documents/Peguy/3D/vectorialAssets.json'))
	fs.writeFileSync(userHomeDir + '/Documents/Peguy/3D/vectorialAssets.json', JSON.stringify(vectorialAssets));
else
{
	var fileContent = fs.readFileSync(userHomeDir + '/Documents/Peguy/3D/vectorialAssets.json', "utf8");
	vectorialAssets = JSON.parse(fileContent);
}
//*/

loadPlugIns();

// Fonction de création d'une fenêtre
function createWindow ()
{
	// Création et paramétrage d'une fenêtre
	mainWindow = new BrowserWindow({
		width: 1600,
		height: 1200,
		webPreferences:
		{
			preload: path.join(__dirname, 'preload.js')
		}
	});

	mainWindow.on('close', ($e) => {
		if (isNotSavedFiles === true)
		{
			$e.preventDefault();
			mainWindow.webContents.executeJavaScript("viewManager.confirmCloseApp();");
		}
	});

	// Charger une page HTML dans la fenêtre
	mainWindow.loadFile('index.html');
}

// Déclencher l'ouverture de la fenêtre uniquement lorsqu'électron a fini de se charger.
app.whenReady().then(() =>
{
	ipcMain.on('setNotSavedFiles', handleSetNotSavedFiles);
	ipcMain.handle('loadSettingsInGUI', handleLoadSettingsInGUI);
	ipcMain.handle('refreshPlugIns', handleRefreshPlugIns);
	ipcMain.handle('openFile', handleOpenFile);
	ipcMain.handle('openRecentFile', handleOpenRecentFile);
	ipcMain.handle('saveFileAs', handleSaveFileAs);
	ipcMain.handle('saveFile', handleSaveFile);
	ipcMain.handle('execProgram', handleExecProgram);
	ipcMain.handle('saveAsMIDI', handleSaveAsMIDI);
	ipcMain.on('quit', handleQuit);

	createWindow();
	
	app.on('activate', function ()
	{
		if (BrowserWindow.getAllWindows().length === 0)
			createWindow();
	});
});

app.on('window-all-closed', function () { app.quit(); });