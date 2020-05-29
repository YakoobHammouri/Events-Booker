import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { orange, grey } from '@material-ui/core/colors';
export default withStyles({
	root: {
		'& .MuiOutlinedInput-root': {
			borderRadius: 35,
			height: 30,
			width: '100%',
			minWidth: 70,
			maxWidth: 140,
			textAlinet: 'center',
			backgroundColor: '#ffffff',
			'&.Mui-focused fieldset': {
				borderColor: orange[200],
			},
		},
		'& .MuiInputBase-input': { textAlign: 'center' },
		'& .MuiInputBase-root': {
			'&.Mui-disabled': {
				backgroundColor: grey[400],
			},
		},
	},
})(TextField);
