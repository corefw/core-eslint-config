
"use strict";

const CLIEngine	= require( "eslint" ).CLIEngine;
const assert	= require( "assert" );
const glob		= require( "glob" );
const _			= require( "lodash" );

let cli = new CLIEngine( {
	cwd: __dirname,
} );

describe( "ESLint Validation", function () {

	describe( "Pass Tests (Results should have no warnings or errors)", function () {

		let files = glob.sync(
			"./test-data/pass/*.js",
			{
				cwd: __dirname,
			}
		);

		_.each( files, function ( file ) {

			it( file, function ( done ) {

				let report = cli.executeOnFiles( [ file ] );

				// console.log( report );

				assert.strictEqual( report.errorCount, 0 );
				assert.strictEqual( report.warningCount, 0 );

				done();
			} );
		} );
	} );

	describe( "Fail Checks (Results should match defined failure messages)", function () {

		let files = glob.sync(
			"./test-data/fail/*.js",
			{
				cwd: __dirname,
			}
		);

		_.each( files, function ( file ) {

			it( file, function ( done ) {

				let report = cli.executeOnFiles( [ file ] );

				let resultMessages		= report.results[ 0 ].messages;
				let expectedMessages	= require( file + ".messages.json" );

				// console.log(JSON.stringify(resultMessages,null,"  "));
				// console.log(expectedMessages);
				// console.log(resultMessages);

				assert.deepStrictEqual( resultMessages, expectedMessages );

				done();
			} );
		} );
	} );
} );
