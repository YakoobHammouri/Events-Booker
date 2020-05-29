import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
export default makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
		},
		memberItem: {
			boxShadow:
				'0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);',
			marginBottom: 12,
			backgroundColor: grey[200],
			width: '100%',
		},

		avatarSmall: {
			width: theme.spacing(4),
			height: theme.spacing(4),
			fontSize: 16,
			fontWeight: 900,
		},
		nameText: {
			margin: '4px 8px',
		},
		memberLink: {
			color: '#000',
			width: '100%',
			'text-decoration': 'none',
			'&:hover': { color: theme.palette.secondary.main },
		},
	}),
);
