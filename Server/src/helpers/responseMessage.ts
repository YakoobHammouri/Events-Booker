// this messages using as reaponse of fetch , xhr  request

const successMessage = (result: string | number | boolean | object, message: string): object => ({
	status: 200,
	message,
	result,
});

const FaildLoginMessage = (
	result: string | number | boolean | object,
	message: string,
): object => ({
	status: 403,
	message,
	result,
});
const FailedMessage = (result: string | number | boolean | object, message: string): object => ({
	status: 400,
	message,
	result,
});

const UnauthorizedMessage = (
	result: string | number | boolean | object,
	message: string,
): object => ({
	status: 403,
	message,
	result,
});
const NotFoundMessage = (result: string | number | boolean | object, message: string): object => ({
	status: 404,
	message,
	result,
});

const InternalErrorMessage = (
	result: string | number | boolean | object,
	message: string,
): object => ({
	status: 501,
	message,
	result,
});

export {
	successMessage,
	FaildLoginMessage,
	FailedMessage,
	UnauthorizedMessage,
	NotFoundMessage,
	InternalErrorMessage,
};
