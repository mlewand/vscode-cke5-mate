const vscode = require( 'vscode' );
const common = require( './src/common' );

/**
 * @param {vscode.ExtensionContext} context
 */
function activate( context ) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log( 'Congratulations, your extension "cke5-mate" is now active!' );

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand( 'cke5-mate.jsdocSignature', function() {
		const editor = vscode.window.activeTextEditor;

		if ( !editor || editor.document.isUntitled ) {
			return;
		}

		const jsdocSignature = common.getJsdocSignature( editor.document.uri.path );

		vscode.window.showInputBox( {
			prompt: 'JSDoc signature',
			value: jsdocSignature
		} );
	} );

	context.subscriptions.push( disposable );
}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}