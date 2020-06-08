import React from 'react';
import clsx from 'clsx';
import './icons.css';
import Styles from './style';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
	Drawer,
	List,
	Divider,
	ListItem,
	ListItemIcon,
	ListItemText,
	IconButton,
	Icon,
	Grid,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import MenuType from '../../../../../Server/src/Class/MenuType';
import Anchor from '../../../../../Server/src/Class/Anchor';

export interface IState {
	right?: boolean;

	menu: Array<MenuType>;
	showMeun: boolean;
	classes: any;
}

class BurgerMenu extends React.Component<IState> {
	state = {
		right: false,
	};

	toggleDrawer = (anchor: Anchor, open: boolean) => (
		event: React.KeyboardEvent | React.MouseEvent,
	) => {
		if (
			event.type === 'keydown' &&
			((event as React.KeyboardEvent).key === 'Tab' ||
				(event as React.KeyboardEvent).key === 'Shift')
		) {
			return;
		}

		this.setState({ [anchor]: open });
	};

	list = (anchor: Anchor, classes: any, menu: Array<MenuType>) => (
		<div
			className={classes.list}
			role="presentation"
			onClick={this.toggleDrawer(anchor, false)}
			onKeyDown={this.toggleDrawer(anchor, false)}
		>
			<List>
				{menu.map((e, index) => (
					<div>
						<ListItem key={index} button={true}>
							<Link className={classes.link} to={e.to}>
								<Grid container>
									<ListItemIcon className={classes.iconStyle}>
										<Icon className={clsx(e.icon, classes.iconStyle)} color="secondary" />
									</ListItemIcon>

									<ListItemText primary={e.text} />
								</Grid>
							</Link>
						</ListItem>
						<Divider />
					</div>
				))}
			</List>
		</div>
	);

	render() {
		const { classes, menu } = this.props;
		return (
			<React.Fragment>
				<IconButton
					color="secondary"
					aria-label="menu"
					edge="end"
					onClick={this.toggleDrawer('right', true)}
				>
					<MenuIcon classes={{ root: classes.root }} />
				</IconButton>
				<Drawer
					anchor={'right'}
					open={this.state['right']}
					onClose={this.toggleDrawer('right', false)}
				>
					{this.list('right', classes, menu)}
				</Drawer>
			</React.Fragment>
		);
	}
}
export default withStyles(Styles)(BurgerMenu);
