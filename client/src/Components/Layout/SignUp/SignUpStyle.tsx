import { orange } from '@material-ui/core/colors/';
import { Theme } from '@material-ui/core/styles';
export default (theme: Theme) => ({
	loginLink: {
		color: orange[500],
		'text-decoration': 'none',
		'&:hover': { color: theme.palette.primary.main },
	},
	signUpBtn: {
		'border-radius': '25px',
		width: '184px',
		height: '37px',
	},
	content: {
		padding: '33px 0 33px 20px;',
		width: '100%',
		minWidth: 290,
		maxWidth: 390,
	},
	textError: {
		marginLeft: 66,
	},
	errorTitle: {
		width: '100%',
	},
	gutterBottom: {
		paddingTop: 12,
	},
	PasswordText: {
		width: 215,
	},
	textFieldGrid: {
		width: '75%',
	},
});
