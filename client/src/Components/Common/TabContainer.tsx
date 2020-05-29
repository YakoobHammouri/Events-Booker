import React from 'react';
import { Box, Typography } from '@material-ui/core';

export interface IProps {
	children?: React.ReactNode;
	value: any;
	index: any;
}

export default function TabContainer(props: IProps) {
	const { children, value, index, ...other } = props;

	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</Typography>
	);
}
