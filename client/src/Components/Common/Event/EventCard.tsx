import React from 'react';
import { Link } from 'react-router-dom';
import {
	Box,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
	Grid,
	Avatar,
} from '@material-ui/core';

import clsx from 'clsx';

import { EventNote } from '@material-ui/icons';

import cardStyle from './CardStyle';

export interface IProps {
	id?: string | number;
	title?: string;
	hostBy?: string;
	eventDate?: string;
	eventTime?: string;
	imageurl?: string;
	type?: string;
	status?: string;
	isAdmin?: boolean;
}

export default function EventCard(props: IProps) {
	const classes = cardStyle();

	const { id, title, hostBy, eventDate, eventTime, imageurl, type, status, isAdmin } = props;

	const link =
		type === 'takeAttendance'
			? `/admin/Event/takeAttendance/${id}`
			: isAdmin
			? `/admin/Event/Detail/${id}`
			: `/event/${id}`;

	const hideen = !status ? classes.hideen : '';
	const statusColor = !status
		? ''
		: status === 'open'
		? classes.open
		: status === 'finised'
		? classes.Finised
		: status === 'canceled'
		? classes.canceled
		: classes.hideen;

	return (
		<div>
			<Link className={classes.eventLink} to={link}>
				<Box m={2}>
					<Card className={classes.root}>
						<CardActionArea>
							<CardMedia
								component="img"
								alt={title}
								height="112"
								image={imageurl}
								title={title}
							></CardMedia>
							<CardContent className={classes.CardContent}>
								<Grid container direction="column">
									<Typography variant="subtitle1" component="h1" className={classes.eventTitle}>
										{title}
									</Typography>
									<Typography
										variant="h6"
										component="h4"
										color="textSecondary"
										gutterBottom
										className={classes.hostBy}
									>
										Hosted by: {hostBy}
									</Typography>

									<Grid container alignItems="center">
										<EventNote />
										<Typography
											variant="h6"
											component="h6"
											color="textSecondary"
											className={classes.eventDate}
										>
											{eventDate + ' ' + eventTime}
										</Typography>
									</Grid>
									<Grid container alignItems="center">
										<Typography
											component="div"
											variant="body2"
											color="textPrimary"
											className={clsx(classes.statusEvent, classes.eventDate, hideen)}
										>
											<Avatar component="span" className={clsx(classes.small, statusColor)}>
												s
											</Avatar>
											{status}
										</Typography>
									</Grid>
								</Grid>
							</CardContent>
						</CardActionArea>
						<CardActions></CardActions>
					</Card>
				</Box>
			</Link>
		</div>
	);
}
