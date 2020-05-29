import { Theme, createStyles } from '@material-ui/core/styles';
export default (theme: Theme) =>
	createStyles({
		eventTitle: {
			color: '#686666',
			paddingBottom: 10,
		},
		atteCount: {
			fontFamily: 'Lato',
			fontWeight: 600,
			fontSize: 16,
			color: '#1C7690',
		},
		eventDate: {
			fontFamily: 'Lato',
			fontWeight: 600,
			fontSize: 14,
			color: '#1C7690',
		},
		memberRoot: {
			width: '100%',
		},
	});
