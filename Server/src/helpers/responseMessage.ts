// this messages using as reaponse of fetch , xhr  request
export = {
	successMessage: (result: string | number | boolean | object, message: string): object => ({
		status: 200,
		message,
		result,
	}),
	FaildLoginMessage: (result: string | number | boolean | object, message: string): object => ({
		status: 403,
		message,
		result,
	}),
	FailedMessage: (result: string | number | boolean | object, message: string): object => ({
		status: 400,
		message,
		result,
	}),

	UnauthorizedMessage: (result: string | number | boolean | object, message: string): object => ({
		status: 403,
		message,
		result,
	}),
	NotFoundMessage: (result: string | number | boolean | object, message: string): object => ({
		status: 404,
		message,
		result,
	}),

	InternalErrorMessage: (result: string | number | boolean | object, message: string): object => ({
		status: 501,
		message,
		result,
	}),
};
