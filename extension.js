const vscode = require( 'vscode' );

/**
 * @param {vscode.ExtensionContext} context
 */
function activate( context ) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log( 'The extension is up!' );
}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}