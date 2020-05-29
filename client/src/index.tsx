import React from 'react';
import ReactDOM from 'react-dom';

import { Grid } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';

import theme from './Theme/MaterialTheme';
import './Theme/Css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<MuiThemeProvider theme={theme()}>
		<React.StrictMode>
			<Grid container direction="column">
				<App />
			</Grid>
		</React.StrictMode>
	</MuiThemeProvider>,
	document.getElementById('root'),
);
serviceWorker.unregister();
