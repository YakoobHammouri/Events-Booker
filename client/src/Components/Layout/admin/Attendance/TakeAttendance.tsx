import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Grid, Box, Typography, List } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Person, EventNote } from '@material-ui/icons';
import { orange } from '@material-ui/core/colors';
import LoaderProgress from '../../../Common/LoaderProgress';
import UserInfoDialog from './UserInfoDialog';
import EventMembers from '../EventMembers/EventMembers';
import AttendanceStyle from './Style';
import axios, { AxiosResponse, AxiosError } from 'axios';
import UserInfoEventInfoType from '../../../../Class/UserInfoEventInfoType';
import UsersType from '../../../../Class/UsersType';
import EventsType from '../../../../Class/EventsType';

export interface IState extends RouteComponentProps<any> {
	tabIndex: number;
	event: EventsType;
	eventMember: Array<UserInfoEventInfoType>;
	eventMemberInfo: Array<UserInfoEventInfoType>;
	currentMemberInfo: UsersType;
	currentCode: string;
	isLoading: boolean;
	displayBlock: boolean;
	open: boolean;
	classes: any;
}

class TakeAttendance extends Component<IState> {
	state = {
		tabIndex: 0,
		event: {} as EventsType,
		eventMember: [{}] as Array<UserInfoEventInfoType>,
		eventMemberInfo: [{}] as Array<UserInfoEventInfoType>,
		currentMemberInfo: {} as UsersType,
		currentCode: '',
		isLoading: true,
		displayBlock: false,
		open: false,
	};

	componentDidMount() {
		const { id } = this.props.match.params;
		axios
			.get(`/api/admin/event/TakeAttendance/${id}`)
			.then((result: null | AxiosResponse) => {
				//eventInfo, eventMember, eventMemberInfo;
				const data = result.data.data;
				this.setState({
					event: data.eventInfo,
					eventMember: data.eventMember,
					eventMemberInfo: data.eventMemberInfo,
					isLoading: false,
				});
			})
			.catch((err: null | AxiosError) => {
				alert(err.response.data.messag);
				this.setState({ isLoading: false });
			});
	}

	handlerAttendanceCode = (
		event: React.MouseEvent<Element, MouseEvent>,
		code: string,
		gid: string,
	) => {
		if (!code) {
			alert('you must enter the Code ');
			return;
		}
		const { eventMemberInfo } = this.state;
		const currentMember = eventMemberInfo.filter((member) => member.gid === gid);
		this.setState({
			open: true,
			currentCode: code,
			currentMemberInfo: currentMember[0],
		});
	};
	handlerOk = (code: string) => {
		const { event, currentMemberInfo } = this.state;
		this.setState({ isLoading: true, displayBlock: true, open: false });

		axios
			.post(`/api/admin/event/TakeAttendance/`, {
				eventId: event.gid,
				userId: currentMemberInfo.gid,
				code: code,
			})
			.then((result: null | AxiosResponse) => {
				const data = result.data.data;
				const { eventMember, event } = this.state;
				// get index of member to update attend status
				const index = eventMember.findIndex((x) => x.gid === data.userId);
				eventMember[index].attendance_status = true;
				event.attendance_cnt = data.count;
				alert(result.data.messag);
				this.setState({
					isLoading: false,
					displayBlock: true,
					eventMember: eventMember,
					event: event,
				});
			})
			.catch((err: null | AxiosError) => {
				console.log({ ...err });
				alert(err.response.data.messag);
				this.setState({ isLoading: false, displayBlock: true });
			});
	};

	handleUpdate = (code: string) => {
		alert('cnacel' + code);
		this.setState({ open: false });
	};
	render() {
		const { classes } = this.props;
		const {
			isLoading,
			displayBlock,
			event,
			eventMember,
			open,
			currentMemberInfo,
			currentCode,
		} = this.state;
		const displayStatus = isLoading && !displayBlock ? 'none' : 'block';

		const members = eventMember.map((member, index) => {
			const takeCode = member.attendance_status ? member.code : '';
			return (
				<EventMembers
					key={index}
					gid={member.gid}
					user_name={member.user_name}
					code={takeCode}
					attendance_status={member.attendance_status}
					showCodeField={true}
					onClick={this.handlerAttendanceCode}
				/>
			);
		});

		return (
			<Box component="div" p={3} width={1}>
				<UserInfoDialog
					open={open}
					handlerOk={this.handlerOk}
					handleUpdate={this.handleUpdate}
					userInfo={currentMemberInfo}
					code={currentCode}
				/>
				<LoaderProgress isLoading={isLoading} />
				<Box component="div" display={displayStatus} width={1}>
					<Grid container justify="center">
						<Grid container item xs={12} justify="flex-start" className={classes.eventTitle}>
							<Box pb={2}>
								<Typography variant="h6" component="h6">
									Take Attendance
								</Typography>
							</Box>
						</Grid>
						<Grid container item xs={12} justify="flex-start">
							<Typography
								variant="body1"
								component="h6"
								className={classes.eventTitle}
								// color="#686666"
							>
								{event.title}
							</Typography>
						</Grid>
						<Grid container justify="space-between" direction="column">
							<Grid>
								<Grid container component="div" spacing={1} xs={4} alignItems="center">
									<Grid item>
										<Person style={{ fontSize: 22, color: orange[200] }} />
									</Grid>
									<Grid item>
										<Typography
											variant="caption"
											display="block"
											gutterBottom
											className={classes.atteCount}
										>
											{event.attendance_cnt} / {event.member_cnt}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid>
								<Grid container spacing={1} xs={4} alignItems="center">
									<Grid item>
										<EventNote style={{ fontSize: 22, color: orange[200] }} />
									</Grid>
									<Grid item>
										<Typography
											variant="caption"
											display="block"
											gutterBottom
											className={classes.eventDate}
										>
											{new Date(event.event_date).toLocaleDateString()}{' '}
											{new Date('1970-01-01T' + event.event_time).toLocaleTimeString()}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
						</Grid>

						<Grid container item xs={12} justify="center">
							<Box component="div" mt={6} width={1}>
								<Grid container justify="center">
									<List className={classes.memberRoot}>{members}</List>
								</Grid>
							</Box>
						</Grid>
					</Grid>
				</Box>
			</Box>
		);
	}
}
export default withStyles(AttendanceStyle)(TakeAttendance);

// eventMember: [
// 	{
// 		user_name: '',
// 		gid: '',
// 		code: '',
// 		attendance_status: '',
// 	},
// ],
// eventMemberInfo: [
// 	{
// 		user_name: '',
// 		gid: '',
// 		code: '',
// 		attendance_status: '',
// 	},
// ],
