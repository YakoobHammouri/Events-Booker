import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import AddNewEvent from '../admin/AddNewEvent';
import Home from '../Home';
import Header from '../../Common/Header/Header';
import SignUp from '../SignUp/SignUp';
import EventDetails from '../EventDetails';
import Login from '../Login/Login';
import Logout from '../Logout';
import Profile from '../Profile/Profile';
import TakeAttendance from '../admin/Attendance/TakeAttendance';
import AdminEventDetails from '../admin/AdminEventDetails';
import AdminHome from '../admin/Home/Home';
import AdminEvent from '../admin/AdminEvent';
import AuthRouter from './AuthRouter';
import isAuth from '../../../helpers/isAuth';
import { AxiosResponse, AxiosError } from 'axios';

export interface IState {
	showlogo: boolean;
	showMeun: boolean;
	showAvatar: boolean;
	isAvatarImage: boolean;
	srcImage: null | string;
	isLogin: boolean;
	isAdmin: boolean;
	Name: string;
}

export default class UserLayout extends Component<{}, IState> {
	state = {
		showlogo: true,
		showMeun: true,
		showAvatar: false,
		isAvatarImage: false,
		srcImage: '',
		isLogin: false,
		isAdmin: false,
		Name: 'User',
	};

	componentDidMount() {
		isAuth()
			.then((result: null | AxiosResponse) => {
				const user = result.data.user;
				this.setState({
					showlogo: false,
					showMeun: true,
					showAvatar: true,
					isAvatarImage: false,
					srcImage: null,
					isLogin: true,
					isAdmin: user.role,
					Name: user.name,
				});
			})
			.catch((err: null | AxiosError) => {
				this.setState({
					showlogo: true,
					showMeun: true,
					showAvatar: false,
					isAvatarImage: false,
					srcImage: null,
					isLogin: false,
					isAdmin: false,
					Name: '',
				});
			});
	}

	render() {
		const {
			showlogo,
			showMeun,
			showAvatar,
			isAvatarImage,
			srcImage,
			isLogin,
			isAdmin,
			Name,
		} = this.state;
		return (
			<Router>
				<Grid direction="column" container>
					<Grid item xs={12}>
						<Header
							showlogo={showlogo}
							showMeun={showMeun}
							showAvatar={showAvatar}
							isAvatarImage={isAvatarImage}
							srcImage={srcImage}
							isLogin={isLogin}
							isAdmin={isAdmin}
							Name={Name}
						/>
					</Grid>
					<Grid item container>
						<Grid item xs={false} md={3} />
						<Grid item container xs={12} md={6}>
							<Switch>
								<Route exact path="/" component={Home} />
								<Route exact path="/user/login" component={Login} />
								<Route exact path="/user/Logout" component={Logout} />
								<Route exact path="/user/SignUp" component={SignUp} />
								<Route exact path="/event/:id" component={EventDetails} />

								<Route exact path="/user/profile" component={AuthRouter(Profile, '')} />

								<Route exact path="/admin/" component={AuthRouter(AdminHome, 'admin')} />
								<Route exact path="/admin/Events" component={AuthRouter(AdminEvent, 'admin')} />
								<Route
									exact
									path="/admin/event/newEvent"
									component={AuthRouter(AddNewEvent, 'admin')}
								/>

								<Route
									exact
									path="/admin/event/takeAttendance/:id"
									component={AuthRouter(TakeAttendance, 'admin')}
								/>
								<Route
									exact
									path="/admin/Event/Detail/:id"
									component={AuthRouter(AdminEventDetails, 'admin')}
								/>
							</Switch>
						</Grid>
						<Grid item xs={false} md={3} />
					</Grid>
				</Grid>
			</Router>
		);
	}
}
