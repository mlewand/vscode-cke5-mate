const assert = require( 'assert' );

const common = require( '../../src/common' );
const expect = require( 'chai' ).expect

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require( 'vscode' );
// const myExtension = require('../extension');

describe( 'Extension Test Suite', () => {
	vscode.window.showInformationMessage( 'Start all tests.' );

	describe( 'common', () => {
		describe( 'getJsdocPath()', () => {
			it( 'returns a valid path on Windows', () => {
				const windowsPath = '/f:/Development/ckeditor5/packages/ckeditor5-core/src/plugin.js';
				const ret = common.getJsdocSignature( windowsPath );

				assert.strictEqual( '{module:core/plugin~Plugin}', ret );
			} );

			it( 'returns a valid path on Unix', () => {
				const windowsPath = '/dev/ckeditor5/packages/ckeditor5-core/src/command.js';
				const ret = common.getJsdocSignature( windowsPath );

				assert.strictEqual( '{module:core/command~Command}', ret );
			} );
		} );

		describe( '_parseCKE5Path', () => {
			it( 'works with Windows path', () => {
				const windowsPath = '/f:/Development/ckeditor5/packages/ckeditor5-core/src/plugin.js';
				const ret = common._parseCKE5Path( windowsPath );

				expect( ret ).to.have.property( 'package', 'core' );
				expect( ret ).to.have.property( 'packageFull', 'ckeditor5-core' );
				expect( ret ).to.have.property( 'path', 'src/plugin.js' );
				expect( ret ).to.have.property( 'fileName', 'plugin.js' );
			} );

			it( 'works with Unix path', () => {
				const unixPath = '/dev/ckeditor5/packages/ckeditor5-core/src/command.js';
				const ret = common._parseCKE5Path( unixPath );

				expect( ret ).to.have.property( 'package', 'core' );
				expect( ret ).to.have.property( 'packageFull', 'ckeditor5-core' );
				expect( ret ).to.have.property( 'path', 'src/command.js' );
				expect( ret ).to.have.property( 'fileName', 'command.js' );
			} );

			it( 'returns a proper value in case of bad path', () => {
				const windowsPath = '/Development/foo/plugin.js';
				const ret = common._parseCKE5Path( windowsPath );

				expect( ret ).to.be.null;
			} );
		} );
	} );
} );