import { deepOrange } from '@material-ui/core/colors';
import { Theme, createStyles } from '@material-ui/core/styles';
export default (theme: Theme) =>
	createStyles({
		content: {
			padding: 33,
			width: '100%',
			maxWidth: 250,
		},
		//   gutterBottom: { paddingBottom: 8 },

		right: { 'text-align': 'right' },
		btnLogin: {
			borderRadius: 25,
			width: 184,
			fontWeight: 900,
			fontSize: 16,
			letterSpacing: '0.05em',
			textTransform: 'uppercase',
			marginBottom: 16,
		},
		PersonIcon: {
			marginTop: 24,
			marginRight: 5,
		},
		PasswordIcon: {
			marginTop: 14,
			marginRight: 5,
		},
		PasswordText: {
			width: 215,
		},
		signupText: {
			fontStyle: 'normal',
			'font-weight': '600',
			fontSize: 13,
			textTransform: 'capitalize',
			color: '#000000',
		},
		signupLink: {
			color: deepOrange[400],
			fontStyle: 'normal',
			'font-weight': '600',
			fontSize: 14,
			textDecorationLine: 'underline',
			textTransform: 'capitalize',
			// color: '#FB991C',
			marginLeft: 5,
		},
		textError: {
			marginLeft: 32,
		},
	});
