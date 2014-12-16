/// <reference path='../interfaces/require.d.ts'/>

requirejs.config({
	waitSeconds: 15,
	paths: {
		'jquery': 'libs/jquery-2.1.1',
		'knockout': 'libs/knockout-3.2.0'
	},
	shim: {
		jquery: {
			exports: '$'
		},
		'application': {
			deps: ['jquery']
		}
	}
});

require([
	'jquery',
	'knockout',
	'application'],
	function (
		jQuery,
		ko,
		application)
	{

		application.Application.start();
});