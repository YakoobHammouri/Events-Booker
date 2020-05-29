import axios from 'axios';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Grid, Box, Typography, Paper, List, Avatar } from '@material-ui/core';
import clsx from 'clsx';
import { Room as RoomIcon, EventNote as EventNoteIcon, Person } from '@material-ui/icons';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { green, blue, red } from '@material-ui/core/colors';
import { AxiosResponse, AxiosError } from 'axios';
import LoaderProgress from '../../Common/LoaderProgress';
import EventMembers from './EventMembers/EventMembers';

import UserInfoEventInfoType from '../../../Class/UserInfoEventInfoType';
import EventsType from '../../../Class/EventsType';

const useStyles = (theme: Theme) =>
	createStyles({
		root: { 'text-align': 'center' },
		red: {
			color: red[500],
		},
		btnCancel: {
			borderRadius: 15,
			width: 230,
			height: 33,
			background: '#FBF3F1',
			border: '1px solid #F6554D',
			fontWeight: 900,
			fontSize: 16,
			letterSpacing: '0.05em',
			textTransform: 'uppercase',
			color: '#F6554D',
		},
		statusEvent: { display: 'flex', padding: '5px 32px 0px 0px' },
		small: { width: 18, height: 18, margin: '5px 12px' },
		open: { backgroundColor: blue[500], color: blue[500] },
		Finised: { backgroundColor: green[500], color: green[500] },
		canceled: { backgroundColor: red[500], color: red[500] },
		hideen: { display: 'none' },
	});

export interface IState extends RouteComponentProps<any> {
	eventDetail: EventsType;
	eventMember: Array<UserInfoEventInfoType>;
	isEnrolled: boolean;
	userCode: string;
	redirect: boolean;
	isLoading: boolean;
	displayBlock: boolean;
	classes: any;
}

class AdminEventDetails extends Component<IState> {
	state = {
		eventDetail: {} as EventsType,
		eventMember: [{}] as Array<UserInfoEventInfoType>,
		isEnrolled: false,
		userCode: 'null',
		redirect: false,
		isLoading: true,
		displayBlock: false,
	};

	componentDidMount() {
		const id = this.props.match.params.id;
		axios
			.get(`/api/admin/eventDetail/${id}`)
			.then((result: null | AxiosResponse) => {
				const resData = result.data.data;
				this.setState({
					eventDetail: resData.event,
					eventMember: resData.eventMember,
					isLoading: false,
				});
			})
			.catch((err: null | AxiosError) => {
				console.log(err);
				alert(err.response.data.messag);
				this.setState({ isLoading: false });
			});
	}

	buildMember = (eventMember: Array<UserInfoEventInfoType>) => {
		return !eventMember || eventMember.length === 0 ? (
			<Paper elevation={6}>
				<Box p={3}>
					<Typography variant="h6" gutterBottom align="center">
						There is not any member in this event
					</Typography>
				</Box>
			</Paper>
		) : (
			eventMember.map((member, index: number) => {
				const takeCode = member.attendance_status ? member.code : '';
				return (
					<EventMembers
						key={index}
						gid={member.gid}
						user_name={member.user_name}
						code={takeCode}
						attendance_status={member.attendance_status}
						showCodeField={false}
						isAdmin={true}
					/>
				);
			})
		);
	};

	render() {
		const { classes } = this.props;
		const { isLoading, displayBlock, eventDetail, eventMember } = this.state;
		const {
			title,
			description,
			event_date,
			event_time,
			event_location,
			event_status,
			host,
			member_cnt,
			attendance_cnt,
		} = eventDetail;
		const displayStatus = isLoading && !displayBlock ? 'none' : 'block';
		const statusColor =
			event_status === 'open'
				? classes.open
				: event_status === 'finised'
				? classes.Finised
				: event_status === 'canceled'
				? classes.canceled
				: classes.hideen;
		return (
			<Box component="div" width={1} p={3}>
				<LoaderProgress isLoading={isLoading} />
				<Box component="div" display={displayStatus} mt={6}>
					<Grid container justify="center">
						<Box width={1}>
							<Paper elevation={3}>
								<Box p={3}>
									<Grid item xs={12}>
										<Typography variant="h6">Event Details</Typography>
									</Grid>
									<Grid item xs={12}>
										<Typography variant="body1">{title}</Typography>
									</Grid>
									<Grid item xs={12}>
										<Typography variant="caption" display="block" className={classes.red}>
											Hosted by: {host}
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<Box my={3}>
											<Typography variant="body2" align="justify">
												{description}
											</Typography>
										</Box>
									</Grid>

									<Grid container item spacing={1} justify="space-around">
										<Grid container spacing={1} alignItems="center" xs={6}>
											<Grid item>
												<RoomIcon />
											</Grid>
											<Grid item>
												<Typography variant="caption" display="block">
													{event_location}
												</Typography>
											</Grid>
										</Grid>
										<Grid container spacing={1} justify="flex-end" alignItems="center" xs={6}>
											<Grid item>
												<EventNoteIcon />
											</Grid>
											<Grid item>
												<Typography variant="caption" display="block">
													{new Date(event_date).toLocaleDateString()}
												</Typography>
												<Typography variant="caption" display="block">
													{new Date('1970-01-01T' + event_time).toLocaleTimeString()}
												</Typography>
											</Grid>
										</Grid>
									</Grid>

									<Grid container item spacing={1} justify="space-around">
										<Grid container spacing={1} alignItems="center" xs={6}>
											<Grid item>
												<Person />
											</Grid>
											<Grid item>
												<Typography variant="caption" display="block">
													{attendance_cnt} / {member_cnt}
												</Typography>
											</Grid>
										</Grid>
										<Grid container spacing={1} justify="flex-end" alignItems="center" xs={6}>
											<Grid item>
												<Typography
													component="div"
													variant="body2"
													color="textPrimary"
													className={classes.statusEvent}
												>
													<Avatar component="span" className={clsx(classes.small, statusColor)}>
														s
													</Avatar>
												</Typography>
											</Grid>
											<Grid item>
												<div>{event_status}</div>
											</Grid>
										</Grid>
									</Grid>
								</Box>
							</Paper>
						</Box>
						<Box width={1} mt={3}>
							<List className={classes.root}>{this.buildMember(eventMember)}</List>
						</Box>
					</Grid>
				</Box>
			</Box>
		);
	}
}
export default withStyles(useStyles)(AdminEventDetails);

// eventDetail: {
// 	title: '',
// 	description: '',
// 	event_date: '',
// 	event_time: '',
// 	event_location: '',
// 	event_status: '',
// 	host: '',
// 	member_cnt: 0,
// 	attendance_cnt: 0,
// },
// eventMember: [
// 	{
// 		user_name: '',
// 		gid: '',
// 		code: '',
// 		attendance_status: '',
// 	},
// ],
