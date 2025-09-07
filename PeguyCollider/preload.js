const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI',
{
	setNotSavedFiles: ($isNotSavedFiles) => ipcRenderer.send('setNotSavedFiles', $isNotSavedFiles), 
	loadSettingsInGUI: () => ipcRenderer.invoke('loadSettingsInGUI'),
	refreshPlugIns: () => ipcRenderer.invoke('refreshPlugIns'),
	openFile: () => ipcRenderer.invoke('openFile'),
	openRecentFile: ($filePath) => ipcRenderer.invoke('openRecentFile', $filePath),
	saveFileAs: ($content) => ipcRenderer.invoke('saveFileAs', $content),
	saveFile: ($filePath, $content) => ipcRenderer.invoke('saveFile', $filePath, $content),
	execProgram: ($filePath, $content) => ipcRenderer.invoke('execProgram', $filePath, $content),
	saveAsMIDI: ($projectPath, $filePath, $data) => ipcRenderer.invoke('saveAsMIDI', $projectPath, $filePath, $data),
	quit: () => ipcRenderer.send('quit'), 
})