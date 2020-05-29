import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { green, red, blue } from '@material-ui/core/colors';
export default makeStyles((theme: Theme) =>
	createStyles({
		root: {
			maxWidth: 180,
			minHeight: 215,
			maxHeight: 230,
		},
		CardContent: { padding: 12 },
		eventTitle: {
			fontWeight: 700,
			fontSize: 14,
			color: theme.palette.primary.main,
		},
		hostBy: {
			fontFamily: 'Roboto',
			'font-style': 'italic',
			fontSize: 14,
		},
		eventDate: {
			fontSize: 10,
			fontWeight: 800,
		},
		eventLink: {
			textDecoration: 'none',
		},
		statusEvent: { display: 'flex', alignItems: 'center' },
		small: { width: 18, height: 18, margin: 5 },
		open: { backgroundColor: blue[500], color: blue[500] },
		Finised: { backgroundColor: green[500], color: green[500] },
		canceled: { backgroundColor: red[500], color: red[500] },
		hideen: { display: 'none' },
	}),
);
