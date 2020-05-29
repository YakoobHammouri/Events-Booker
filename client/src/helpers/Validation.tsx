import XRegExp from 'xregexp';
const validateEmail = (email: string) => {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

const stringValidation = (string: string) => {
	//http://xregexp.com/plugins/
	// https://stackoverflow.com/questions/27310535/xregexp-regular-expression-to-allow-single-space-between-characters
	// var regex = new XRegExp('^\\p{L}*$'); // multi Language
	const regex = XRegExp('^[\\p{L}\\d]+(?:\\s[\\p{L}\\d]+)*$');

	return regex.test(string);
};

const phoneValidation = (phone: string) => {
	const re = /^\d{10}$/;
	return re.test(phone);
};
export { validateEmail, stringValidation, phoneValidation };
