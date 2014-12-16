interface iHandlersObject {
	successHandler(data: any, textStatus?: string, jqXHR?: JQueryXHR): void;
	errorHandler?(jqXHR?: JQueryXHR, textStatus?: string, errorThrown?: string): void;
	beforeSendHandler?(jqXHR?: JQueryXHR, settings?: any): void;
	progressHandler?(status?: any): void;
	contentType?: any;
	processData?: any;
}