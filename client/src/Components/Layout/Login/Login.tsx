import React, { Component } from 'react';
import queryString from 'query-string';
import { Link, RouteComponentProps } from 'react-router-dom';
import {
	Grid,
	Box,
	Typography,
	Button,
	Paper,
	TextField,
	FormHelperText,
	FormControl,
	Input,
	InputLabel,
	IconButton,
	InputAdornment,
} from '@material-ui/core';
import {
	Person as PersonIcon,
	Lock as LockIcon,
	Visibility,
	VisibilityOff,
} from '@material-ui/icons';
import Cookies from 'js-cookie';
import { withStyles } from '@material-ui/core/styles';
import { validateEmail } from '../../../helpers/Validation';
import LoaderProgress from '../../Common/LoaderProgress';

import axios from 'axios';
import LoginStyles from './LoginStyle';

export interface IState extends RouteComponentProps<any> {
	logindata: {
		email: string;
		password: string;
	};
	showPassword: boolean;
	ReturnUrlText: string;
	SignupLink: string;
	ReturnUrl: boolean;
	redirect: boolean;
	isLoading: boolean;
	displayBlock: boolean;
	classes: any;
	email: object;
	password: object;
}

class Login extends Component<IState> {
	state = {
		logindata: { email: '', password: '' },
		isLoading: false,
		displayBlock: true,
		showPassword: false,
		email: {
			message: '',
			isValid: true,
		},
		password: {
			message: '',
			isValid: true,
			minLength: 3,
		},
		redirect: false,
		ReturnUrlText: '/',
		SignupLink: '/user/Signup/',
		ReturnUrl: false,
	};

	componentDidMount() {
		const AuthToken = Cookies.get('AuthToken');
		const qstring = queryString.parse(this.props.history.location.search);
		if (qstring.ReturnUrl) {
			this.setState({
				ReturnUrlText: qstring.ReturnUrl,
				ReturnUrl: true,
				SignupLink: `/user/Signup/?ReturnUrl=${qstring.ReturnUrl}`,
			});
		} else {
			this.setState({
				// if the user log in we will redirect to Home
				redirect: !AuthToken ? false : true,
			});
		}
	}

	renderAction = () => {
		if (this.state.redirect) {
			return window.location.replace(`${this.state.ReturnUrlText}`);
			//return <Redirect to={this.state.ReturnUrlText} />;
		}
	};

	handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { logindata } = this.state;
		const { name, value } = e.currentTarget;
		const form = { ...logindata };
		type formKey = keyof typeof logindata;
		const key: formKey = name as formKey;
		form[key] = value;
		this.setState({ logindata: form });
	};

	handleClickShowPassword = () => {
		const showPassword = this.state.showPassword;

		this.setState({
			showPassword: !showPassword,
		});
	};

	handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const { email, password, logindata } = this.state;

		if (!logindata.email) {
			email.message = 'The Email is Required';
			email.isValid = false;
		} else if (!validateEmail(logindata.email)) {
			// the Email is not Valid
			email.message = 'Please Enter Valid Email';
			email.isValid = false;
		} else {
			email.message = '';
			email.isValid = true;
		}

		if (!logindata.password) {
			password.message = 'The Password is Required';
			password.isValid = false;
		} else if (logindata.password.length < password.minLength) {
			password.message = `The Password must contains at least ${password.minLength} chart `;
			password.isValid = false;
		} else {
			password.message = '';
			password.isValid = true;
		}

		if (!email.isValid || !password.isValid) {
			this.setState({ email: email, password: password });
			return;
		}

		this.setState({ email: email, password: password, isLoading: true });

		axios
			.post(`/user/login/`, logindata)
			.then((result) => {
				const data = result.data;

				//ReturnUrlText;
				const url =
					data.data.isAdmin && !this.state.ReturnUrl ? '/admin' : this.state.ReturnUrlText;
				this.setState({ redirect: true, ReturnUrlText: url });
				alert(data.messag);
			})
			.catch((err) => {
				alert(err.response.data.messag);
				this.setState({ isLoading: false });
			});
	};

	render() {
		const { classes } = this.props;
		const {
			isLoading,
			displayBlock,
			logindata,
			email,
			password,
			showPassword,
			SignupLink,
		} = this.state;
		const displayStatus = isLoading && !displayBlock ? 'none' : 'block';
		return (
			<Box component="div" p={3} width={1}>
				<LoaderProgress isLoading={isLoading} />
				<Box component="div" display={displayStatus} width={1}>
					<Grid container justify="center">
						<Paper elevation={3} className={classes.content}>
							<Grid item xs={12}>
								<Typography variant="h6" color="textSecondary">
									Login
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Box mb={3}>
									<Typography variant="h6" color="textSecondary">
										Please login to continue
									</Typography>
								</Box>
							</Grid>
							<Grid item xs={12}>
								<form onSubmit={this.handleSubmit} noValidate autoComplete="off">
									<Grid container justify="flex-start" className={classes.gutterBottom}>
										<Grid item>
											<PersonIcon color="disabled" className={classes.PersonIcon} />
										</Grid>
										<Grid item>
											<TextField
												id="email"
												name="email"
												error={!email.isValid}
												color="secondary"
												value={logindata.email}
												onChange={this.handleTextInput}
												autoFocus={true}
												margin={'dense'}
												required={true}
												label="Enter your Email"
											/>
										</Grid>
										<Grid item>
											<FormControl error>
												<FormHelperText id="email-error-text" className={classes.textError}>
													{email.message}
												</FormHelperText>
											</FormControl>
										</Grid>
									</Grid>
									<Grid container alignItems="flex-end" className={classes.gutterBottom}>
										<Grid item>
											<LockIcon color="disabled" className={classes.PasswordIcon} />
										</Grid>
										<Grid item>
											<FormControl className={classes.PasswordText}>
												<InputLabel htmlFor="standard-adornment-password">
													Enter your password
												</InputLabel>
												<Input
													id="password"
													type={showPassword ? 'text' : 'password'}
													value={logindata.password}
													onChange={this.handleTextInput}
													required={true}
													name="password"
													error={!password.isValid}
													color="secondary"
													margin={'dense'}
													endAdornment={
														<InputAdornment position="end">
															<IconButton
																aria-label="toggle password visibility"
																onClick={this.handleClickShowPassword}
																onMouseDown={this.handleMouseDownPassword}
															>
																{showPassword ? <Visibility /> : <VisibilityOff />}
															</IconButton>
														</InputAdornment>
													}
												/>
											</FormControl>
										</Grid>
										<Grid item>
											<FormControl error>
												<FormHelperText id="password-error-text" className={classes.textError}>
													{password.message}
												</FormHelperText>
											</FormControl>
										</Grid>
									</Grid>
									<Grid>
										<Box mt={1} display="none">
											<Typography
												variant="button"
												align="right"
												className={classes.deepOrange}
												gutterBottom
											>
												Forgot
											</Typography>
										</Box>
									</Grid>
									<Grid item>
										{this.renderAction()}
										<Box className={classes.root} m={4}>
											<Button
												size="large"
												color="primary"
												variant="contained"
												type="submit"
												className={classes.btnLogin}
											>
												Login
											</Button>

											<Grid container>
												<Grid item>
													<Typography component="span" className={classes.signupText}>
														If Its Your First Time
													</Typography>
												</Grid>
												<Grid item>
													<Link to={SignupLink}>
														<Typography component="span" className={classes.signupLink}>
															SignUp
														</Typography>
													</Link>
												</Grid>
											</Grid>
										</Box>
									</Grid>
								</form>
							</Grid>
						</Paper>
					</Grid>
				</Box>
			</Box>
		);
	}
}
export default withStyles(LoginStyles)(Login);
