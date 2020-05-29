import { Theme, createStyles } from '@material-ui/core/styles';
export default (theme: Theme) =>
	createStyles({
		eventTitle: {
			width: 150,
			height: 40,
			background: '#1C7690',
			borderRadius: '0px 55px 55px 0px;',
			position: 'absolute',
			left: 0,
			top: 145,
			textAlign: 'center',

			color: '#fff',
			[theme.breakpoints.up('lg')]: {
				position: 'relative',
				left: '-152px !important',
				top: 0,
			},
			[theme.breakpoints.up('md')]: {
				position: 'relative',
				left: '-120px ',
				top: 0,
			},
			[theme.breakpoints.between(0, 1049)]: {
				position: 'relative',
				left: -110,
				top: 0,
			},

			[theme.breakpoints.down('sm')]: {
				position: 'absolute',
				left: 0,
				top: 145,
			},
		},

		eventDateGrid: {
			flexBasis: 0,
		},

		dateRoot: {
			display: 'flex',
			backgroundColor: theme.palette.secondary.main,
			color: '#fff',
			width: 85,
			height: 85,
			position: 'relative',
			top: -22,
		},
		details: {
			display: 'flex',
			flexDirection: 'column',
			width: '100%',
			alignContent: 'center',
		},

		cardContent: {
			padding: 0,
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			alignContent: 'center',
			height: 55,
		},

		cardIcon: {
			// flex: '1 0 auto',
			color: '#fff',
			width: 35,
			height: 35,
		},
		cover: {
			width: 151,
		},
		dateDiv: {
			borderTop: '1px  solid #FFFFFF',
			textAlign: 'center',
		},
		dateText: {
			fontStyle: 'normal',
			fontWeight: 900,
			fontSize: 14,
		},
	});
