const path = require('path');

const vscode = require('vscode');
const ccashTestConfig = "ccashTestConfig.json";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	
	console.log('CcashUnit is started');
	var configFilePath = await findCcashConfigFile();
	configFilePath = vscode.Uri.parse(configFilePath).fsPath;
	
	//vscode.window.createTreeView("tests-explorer");
	//vscode.window.registerTreeDataProvider();
	

	let modifyConfigFile = vscode.commands.registerCommand('extension.modifyConfigFile', function () {
		if(configFilePath != undefined){
			openFile(configFilePath);
		}
		else{
			vscode.window.showErrorMessage('File ccashTestConfig.json does not exist.');
		}

	});
	
	let runTests = vscode.commands.registerCommand('extension.runTests', function () {
		// TODO: compiler les fichiers de tests puis les rouler un à la suite de l'autre. doit etre fichier ccash
		// TODO: regarder les différences entre l'exécution windows et linux
		// TODO: logger les outputs des tests
		// TODO: donner le nombre de tests réussi. pour l'instant réussir veut dire retourne pas d'erreur ou 0?
		// TODO: donner le temps d'execution pour chaque test
		vscode.window.showInformationMessage('Tests successful!');
	});

	context.subscriptions.push(runTests, modifyConfigFile/*, createConfigFile*/);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

async function openFile(filePath){
	var fileURI = vscode.Uri.file(filePath);
	const file = await vscode.workspace.openTextDocument(fileURI);
	await vscode.window.showTextDocument(file);
	
	return true;
}

async function findCcashConfigFile(){
	var configFile = await searchFile(vscode.workspace.workspaceFolders[0].uri)
	return configFile;
}

async function searchFile(currentDir){
	var folderURI = vscode.Uri.parse(currentDir);
	var currentDirfiles = await vscode.workspace.fs.readDirectory(folderURI);
	
	for(var i = 0; i < currentDirfiles.length; ++i){
		// If it's a file
		if(currentDirfiles[i][1] == 1 && currentDirfiles[i][0] == ccashTestConfig){	
			return currentDir + "/" + ccashTestConfig;
		} 
		// if it's a folder
		else if (currentDirfiles[i][1] == 2){
			var nextDir = vscode.Uri.parse(folderURI.fsPath + "/" + currentDirfiles[i][0]);
			var result = await searchFile(nextDir);
			if(result != undefined){
				return result;
			} 
		}	
	}

	return undefined;
}
