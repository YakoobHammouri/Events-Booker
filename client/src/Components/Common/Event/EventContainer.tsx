import React, { Component } from 'react';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import axios from 'axios';
import { Tabs, Tab, Grid, Box, AppBar } from '@material-ui/core';
import EventDefaultImg from './../../../assets/eventDefaultimg.svg';
import EventCardContainer from '../TabContainer';
import LoaderProgress from '../LoaderProgress';
import EventCard from './EventCard';
import IndexTabProps from '../../../helpers/IndexTabProps';
import { AxiosResponse, AxiosError } from 'axios';

import CategoryEventsType from '../../../../../Server/src/Class/CategoryEventsType';
const useStyles = (theme: Theme) =>
	createStyles({
		root: {
			[theme.breakpoints.between(0, 400)]: {
				width: '310px !important',
			},
		},
	});

export interface IState {
	tabIndex?: number;
	direction?: string;
	isLoading?: boolean;
	eventData?: Array<CategoryEventsType>;
	isAdmin?: boolean;
	classes?: any;
}

class EventContainer extends Component<IState> {
	state = {
		tabIndex: 0,
		direction: 'ltr',
		isLoading: true,
		eventData: [] as Array<CategoryEventsType>,
		isAdmin: this.props.isAdmin,
	};

	finishLoading = () => {
		const { isLoading } = this.state;

		if (isLoading) {
			this.setState({ isLoading: false });
		}
	};
	componentDidMount() {
		const key = this.state.isAdmin ? 'adminEventData' : 'eventData';
		// admin  20 minutes => 1200000
		// user 180 minutes => 10800000 => 3 hours
		// ttl => Time to live
		// if user is Admin the data will update in each 20 minutes,
		// otherwise update in each 3 hours
		const ttl = this.state.isAdmin ? 1200000 : 10800000;
		// get data to session
		const temp = localStorage.getItem(key);
		if (temp) {
			const data = JSON.parse(temp);
			const now = new Date();
			// check if data expired
			if (now.getTime() >= data.expiry) {
				localStorage.removeItem(key);
			} else {
				this.setState({ eventData: data.eventData, isLoading: true });
				return;
			}
		}
		const url = this.state.isAdmin ? '/api/envet/getAdminEvent' : '/api/envet/getupComingEvent';

		axios
			.get(url)
			.then((result: null | AxiosResponse) => {
				localStorage.setItem(
					key,
					JSON.stringify({
						eventData: result.data.data,
						expiry: new Date().getTime() + ttl,
					}),
				);
				this.setState({ eventData: result.data.data });
			})
			.catch((err: null | AxiosError) => {
				console.log('Error ', { ...err });
				alert(err.response.data.messag);
				this.setState({ isLoading: false });
			});
	}

	TabChangeHandler = (event: React.ChangeEvent<{}>, index: number) => {
		this.setState({ tabIndex: index });
	};

	render() {
		const { classes } = this.props;
		const { tabIndex, direction, eventData, isLoading } = this.state;
		const displayStatus = isLoading ? 'none' : 'block';
		const eventCardContainer: Array<any> = [];
		// build Tab with Event Card Container
		const eventTab = eventData.map((item, index) => {
			// Create Event Card for each Tab
			const eventCard = item.events.map((event, eventIndex) => {
				const status = this.state.isAdmin ? event.event_status : undefined;
				return (
					<EventCard
						key={eventIndex.toString()}
						id={event.gid}
						title={event.title}
						hostBy={event.host}
						eventDate={new Date(event.event_date).toLocaleDateString()}
						eventTime={new Date('1970-01-01T' + event.event_time).toLocaleTimeString()}
						imageurl={EventDefaultImg}
						status={status}
						isAdmin={this.state.isAdmin}
					/>
				);
			});

			// create Event Card Container and Add Event Card Children
			eventCardContainer.push(
				<EventCardContainer value={tabIndex} index={index} key={item.id.toString()}>
					<Grid container id="grid-event-card-container" justify="center">
						{eventCard}
					</Grid>
				</EventCardContainer>,
			);
			if (index === eventData.length - 1) {
				this.finishLoading();
			}
			return <Tab key={item.id.toString()} label={item.catg_name} {...IndexTabProps(item.id)} />;
		});

		return (
			<div id="EventContainer" className={classes.root}>
				<LoaderProgress isLoading={isLoading} />
				<Box component="div" display={displayStatus}>
					<AppBar color="default" position="relative">
						<Tabs
							value={tabIndex}
							indicatorColor="secondary"
							textColor="primary"
							onChange={this.TabChangeHandler}
							variant="scrollable"
							scrollButtons="on"
							aria-label="scrollable force tabs example"
						>
							{eventTab}
						</Tabs>
					</AppBar>
					<SwipeableViews
						axis={direction === 'rtl' ? 'x-reverse' : 'x'}
						index={tabIndex}
						disableLazyLoading={false}
						disabled={true}
					>
						{eventCardContainer}
					</SwipeableViews>
				</Box>
			</div>
		);
	}
}

export default withStyles(useStyles)(EventContainer);
