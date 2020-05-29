import { green, red, blue, orange } from '@material-ui/core/colors';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
export default makeStyles((theme: Theme) =>
	createStyles({
		root: { 'text-align': 'center' },
		large: {
			width: theme.spacing(15),
			height: theme.spacing(15),
			fontSize: 48,
			fontWeight: 800,
		},
		btnCancel: {
			borderRadius: 15,
			width: 230,
			height: 33,
			background: '#FBF3F1',
			border: '1px solid #F6554D',
			fontWeight: 900,
			fontSize: 16,
			letterSpacing: '0.05em',
			textTransform: 'uppercase',
			color: '#F6554D',
		},
		userRoot: {
			width: '100%',
			backgroundColor: theme.palette.background.paper,
			minWidth: 250,
			maxWidth: 320,
		},

		eventRoot: {
			width: '100%',
			minWidth: 250,
			maxWidth: 320,
			backgroundColor: theme.palette.background.paper,
			padding: 14,
		},
		inline: {
			display: 'inline',
		},
		statusEvent: { display: 'flex' },
		small: { width: 18, height: 18, margin: '5px 11px' },
		open: { backgroundColor: blue[500], color: blue[500] },
		Finised: { backgroundColor: green[500], color: green[500] },
		canceled: { backgroundColor: red[500], color: red[500] },
		hideen: { display: 'none' },
		eventLink: {
			color: orange[500],
			'text-decoration': 'none',
			'&:hover': { color: theme.palette.primary.main },
		},
	}),
);
