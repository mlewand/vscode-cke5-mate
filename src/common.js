module.exports =  {
	/**
	 * Returns our custom JSDoc signature for current file, e.g. `{module:core/command~Command}`.
	 *
	 * @param {String} filePath File path in unix format, e.g. `'/foo/bar/baz.js'`.
	 * @returns {String|null}
	 */
	getJsdocSignature( filePath ) {
		const parsedPath = this._parseCKE5Path( filePath );

		if ( !parsedPath || !parsedPath.path.startsWith( 'src/' ) ) {
			return null;
		}

		const baseFileName = parsedPath.fileName.replace( /\.js$/, '' );

		const jsdocPath = Array.from( parsedPath.path.split( '/' ) ).slice( 1 );
		jsdocPath.pop();
		jsdocPath.push( baseFileName );
		// Add package name to the beginning.
		jsdocPath.splice( 0, 0, parsedPath.package );

		const assumedClassName = baseFileName[ 0 ].toUpperCase() + baseFileName.substr( 1 );

		return `{module:${ jsdocPath.join( '/' ) }~${ assumedClassName }}`;
	},

	/**
	 * @param {String} filePath File path in unix format, e.g. `'/foo/bar/baz.js'`.
	 */
	_parseCKE5Path( filePath ) {
		const pathParts = filePath.split( '/' );

		for ( var i = pathParts.length - 1; i >= 0; i-- ) {
			if ( pathParts[ i ] === 'packages' ) {
				return {
					package: pathParts[ i + 1 ].replace( /^ckeditor5?\-/, '' ),
					packageFull: pathParts[ i + 1 ],
					path: Array.from( pathParts ).slice( i + 2 ).join( '/' ),
					fileName: pathParts[ pathParts.length - 1 ]
				};
				break;
			}
		}

		return null;
	}
};