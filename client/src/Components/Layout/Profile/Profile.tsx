import React, { Component } from 'react';
import { Grid, Box, Paper, Tabs, Tab } from '@material-ui/core';

import axios from 'axios';
import SwipeableViews from 'react-swipeable-views';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import LoaderProgress from '../../Common/LoaderProgress';
import ProfileTabContainer from '../../Common/TabContainer';
import IndexTabProps from '../../../helpers/IndexTabProps';
import UserInfo from './UserInfo';

import Events from './Events';

import UserInfoEventInfoType from '../../../Class/UserInfoEventInfoType';
import UsersType from '../../../Class/UsersType';

const ProfileStyles = (theme: Theme) =>
	createStyles({
		dataPaper: {
			width: '100%',
			margin: 5,
			'max-width': 310,
		},
	});

export interface IState {
	tabIndex: number;
	userEvent: Array<UserInfoEventInfoType>;
	userInfo: UsersType;
	isLoading: boolean;
	displayBlock: boolean;
	direction: string;
	classes: any;
}

class Profile extends Component<IState> {
	state = {
		tabIndex: 0,
		userEvent: [{}] as Array<UserInfoEventInfoType>,
		userInfo: {} as UsersType,
		isLoading: true,
		displayBlock: false,
		direction: 'ltr',
	};

	TabChangeHandler = (event: React.ChangeEvent<{}>, index: number) => {
		this.setState({ tabIndex: index });
	};

	componentDidMount() {
		axios
			.get('/api/user/profile')
			.then((result) => {
				this.setState({
					isLoading: false,
					userEvent: result.data.data.userEvents,
					userInfo: result.data.data.userInfo,
				});
			})
			.catch((err) => {
				alert(err.response.data.messag);
				this.setState({ isLoading: false });
			});
	}

	render() {
		const { classes } = this.props;
		const { isLoading, displayBlock, userInfo, tabIndex, direction, userEvent } = this.state;
		const displayStatus = isLoading && !displayBlock ? 'none' : 'block';

		return (
			<Box component="div" width={1}>
				<LoaderProgress isLoading={isLoading} />
				<Box component="div" display={displayStatus} mt={2} width={1}>
					<Grid container justify="center">
						{/* <Grid container item xs={12} justify="center">
              <UserAvatar
                showAvatar={true}
                Name={userInfo.user_name}
                cssClass={classes.large}
              />
            </Grid> */}
						<Grid container item xs={12} justify="center">
							<Box component="div" mt={6}>
								<Paper square>
									<Tabs
										value={tabIndex}
										indicatorColor="secondary"
										textColor="primary"
										onChange={this.TabChangeHandler}
										variant="fullWidth"
									>
										<Tab label="info" {...IndexTabProps(0)} />
										<Tab label="Events" {...IndexTabProps(1)} />
										{/* <Tab label="Setting" {...IndexTabProps(2)} /> */}
									</Tabs>
								</Paper>
								<Box mt={1}>
									<Paper className={classes.dataPaper}>
										<SwipeableViews
											axis={direction === 'rtl' ? 'x-reverse' : 'x'}
											index={tabIndex}
											disableLazyLoading={false}
											disabled={true}
										>
											<ProfileTabContainer value={tabIndex} index={0}>
												<Grid container>
													<UserInfo userInfo={userInfo} />
												</Grid>
											</ProfileTabContainer>
											<ProfileTabContainer value={tabIndex} index={1}>
												<Grid container>
													<Events events={userEvent} />
												</Grid>
											</ProfileTabContainer>
											{/* <ProfileTabContainer value={tabIndex} index={2}>
                    <Grid container>Setting</Grid>
                  </ProfileTabContainer> */}
										</SwipeableViews>
									</Paper>
								</Box>
							</Box>
						</Grid>
					</Grid>
				</Box>
			</Box>
		);
	}
}
export default withStyles(ProfileStyles)(Profile);

// userEvent: [
// 	{
// 		gid: '',
// 		title: '',
// 		event_status: '',
// 		event_time: '',
// 		event_date: '',
// 		code: '',
// 	},
// ],
// userInfo: {
// 	user_name: '',
// 	phone: '',
// 	birth_date: '',
// 	email: '',
// 	university: '',
// 	address: '',
// 	profession: '',
// },
