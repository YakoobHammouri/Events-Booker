import React from 'react';
import {
	List,
	ListItem,
	Divider,
	ListItemText,
	ListItemAvatar,
	Grid,
	Typography,
	Avatar,
	Paper,
	Box,
} from '@material-ui/core';
import { EventNote } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import eventStyle from './ProfileStyles';

import UserInfoEventInfoType from '../../../../../Server/src/Class/UserInfoEventInfoType';

export interface IProps {
	events: UserInfoEventInfoType[];
}

export default ({ events }: IProps) => {
	const classes = eventStyle();
	const userEvents =
		events.length === 0 ? (
			<Paper elevation={6}>
				<Box p={3}>
					<Typography variant="h6" gutterBottom align="center">
						You Are not Enrolled in Any Event
					</Typography>
				</Box>
			</Paper>
		) : (
			events.map((event, index) => {
				const statusColor =
					event.event_status === 'open'
						? classes.open
						: event.event_status === 'finised'
						? classes.Finised
						: event.event_status === 'canceled'
						? classes.canceled
						: classes.hideen;
				return (
					<div>
						<Link key={index} to={`/event/${event.gid}`} className={classes.eventLink}>
							<ListItem alignItems="flex-start">
								<ListItemAvatar>
									<EventNote color="disabled" fontSize="large" />
								</ListItemAvatar>
								<ListItemText
									primary={event.title}
									secondary={
										<React.Fragment>
											<Typography
												component="div"
												variant="body2"
												className={classes.inline}
												color="textPrimary"
											>
												DateTime
												{' — '} {new Date(event.event_date).toLocaleDateString()} {event.event_time}
											</Typography>
											<Typography component="div" variant="body2" color="textPrimary">
												Event Code {' — '} {event.code}
											</Typography>
											<Typography
												component="div"
												variant="body2"
												color="textPrimary"
												className={classes.statusEvent}
											>
												Event Status {' — '}
												<Avatar component="span" className={clsx(classes.small, statusColor)}>
													s
												</Avatar>
												{event.event_status}
											</Typography>
										</React.Fragment>
									}
								/>
							</ListItem>
							<Divider variant="fullWidth" component="li" />
						</Link>
					</div>
				);
			})
		);

	return (
		<Grid container>
			<List className={classes.eventRoot}>{userEvents}</List>
		</Grid>
	);
};
