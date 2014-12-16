/// <reference path='../../interfaces/jquery.d.ts'/>
/// <reference path='../../interfaces/iApplicationInterfaces.d.ts'/>

import mConfig = require('./config');

export function srvRequest(data: any, handlersOject: iHandlersObject): void {
	var requestObject;

	requestObject = {};
	requestObject.url = './';
	requestObject.type = 'POST';
	requestObject.data = data;
	requestObject.success = handlersOject.successHandler;
	requestObject.cache = false;
	if (handlersOject.contentType) {
		requestObject.contentType = handlersOject.contentType;
	}
	if (handlersOject.contentType === false) {
		requestObject.contentType = false;
	}
	if (handlersOject.processData  === false) {
		requestObject.processData  = false;
	}
	requestObject.xhr = () => {
		var myXhr: any;

		myXhr = $.ajaxSettings.xhr();
		if (myXhr.upload && handlersOject.progressHandler) {
			myXhr.upload.addEventListener('progress', handlersOject.progressHandler, false);
		}
		return myXhr;
	}
	if (handlersOject.beforeSendHandler) {
		requestObject.beforeSend = handlersOject.beforeSendHandler;
	}
	if (handlersOject.errorHandler) {
		requestObject.error = handlersOject.errorHandler;
	}
	
	$.ajax(requestObject);
}

export function simpleObjectCompare(o1: any, o2: any): boolean {
	for ( var p in o1) {
		if (o1[p] !== o2[p]) {
			return false;
		}
	}
	for ( var p in o2) {
		if (o1[p] !== o2[p]) {
			return false;
		}
	}
	return true;
}