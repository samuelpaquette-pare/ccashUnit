const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	
	console.log('CcashUnit is started');

	let disposable = vscode.commands.registerCommand('extension.runTest', function () {
		//cherche les dossiers pour trouver le fichier CcashTest


		vscode.window.showInformationMessage('Test successful!');
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
