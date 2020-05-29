import { orange } from '@material-ui/core/colors';
import { Theme, createStyles } from '@material-ui/core/styles';
export default (theme: Theme) =>
	createStyles({
		list: {
			width: 270,
		},
		iconStyle: {
			width: 40,
		},
		root: { fontSize: 38 },
		link: {
			color: orange[500],
			width: '100%',
			'text-decoration': 'none',
			'&:hover': { color: theme.palette.primary.main },
		},
	});
