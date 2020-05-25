import { createMuiTheme } from '@material-ui/core/styles';

export default function createTheme() {
	return createMuiTheme({
		palette: {
			primary: { main: '#022539' },
			secondary: {
				main: '#1C7690',
			},
			third: { main: '#676363' },
		},
	});
}
