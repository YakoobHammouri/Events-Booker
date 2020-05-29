import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import isAuth from '../../../helpers/isAuth';
import { AxiosResponse, AxiosError } from 'axios';

export interface IState {
	isAuthenticated: boolean;
	isLoading: boolean;
}

export default (AuthComponent: any, role: string) => {
	return class AuthRouter extends Component<IState> {
		state = {
			isAuthenticated: false,
			isLoading: true,
		};
		componentDidMount() {
			isAuth(role)
				.then((result: null | AxiosResponse) => {
					this.setState({ isLoading: false, isAuthenticated: true });
				})
				.catch((err: null | AxiosError) => {
					if (err.response && err.response.data) {
						alert(err.response.data.messag);
					}

					this.setState({ isLoading: false, isAuthenticated: false });
				});
		}

		render() {
			const { isAuthenticated, isLoading } = this.state;
			if (isLoading) {
				return null;
			}
			if (!isAuthenticated) {
				return <Redirect to={`/user/login`} />;
			}
			return <AuthComponent {...this.props} />;
		}
	};
};
