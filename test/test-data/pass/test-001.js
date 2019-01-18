/* eslint-disable no-console */

"use strict";

const _ = require( "lodash" );

var obj = _.assign(
	{},
	{
		foo : "bar",
		biz : "bam",
	}
);

console.log( obj );
