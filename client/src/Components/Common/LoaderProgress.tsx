import * as React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyle = makeStyles((theme: Theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

interface Props {
	isLoading: boolean;
}

export default ({ isLoading }: Props) => {
	const classes = useStyle();
	return (
		<Backdrop className={classes.backdrop} open={isLoading}>
			<CircularProgress color="inherit" size={60} thickness={2} />
		</Backdrop>
	);
};
