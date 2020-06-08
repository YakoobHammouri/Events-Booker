import * as express from 'express';

const router = express.Router();

import isAuth from '../middleware/isAuth';

import { getEventById, getupComingEvent, takePlace, cancelPlace } from './event';

import {
	postEvent,
	getEventsDay,
	takeMemberCode,
	getEventMembers,
	getAdminEvents,
	getAdminEventDetail,
} from './admin';

import { login, profile, signup, userEvent, checkUserEmail, logout } from './user';

import getcategory from './category/getCategory';

import checkToken from '../middleware/checkToken';

import checkPermissions from '../middleware/checkPermissions';

import checkEmail from '../middleware/checkEmail';

import { ROLE } from '../helpers/Constants';

router.post('/isAuth/', isAuth, checkToken);
router.post('/isAccess/', isAuth, checkPermissions(), checkToken);

// login user , Create Auth Token Cookies
router.post('/user/login', login);

router.post('/user/logout', logout);

// post new User
router.post('/api/user/signup', checkEmail, signup);

router.get('/api/user/checkUserEmail/:email', checkEmail, checkUserEmail);

// get event Details => pageName : EventDetails
router.get('/api/event/:id', getEventById);

// get up Coming Event to Display in Home Page
router.get('/api/envet/getupComingEvent', getupComingEvent);

// get user Code of event => pageName : EventDetails , Login restricted
router.get('/api/user/userCode/:eventId', isAuth, userEvent);

// enroll in event  => pageName : EventDetails , Login restricted
router.post('/api/event/takePlace', isAuth, takePlace);

// cancel Registration  in event  => pageName : EventDetails , Login restricted
router.delete('/api/event/cancelPlace', isAuth, cancelPlace);

//================================================================
//============== Admin Endpoint ==================================
// open user Profile , contains userInfo , Event of user
router.get('/api/user/profile', isAuth, profile);

router.get('/api/admin/eventDetail/:id', isAuth, getAdminEventDetail);

router.get('/api/admin/getcategory', isAuth, getcategory);

router.post('/api/admin/event/addEvent', isAuth, postEvent);

router.get('/api/admin/getEventsDay', isAuth, checkPermissions(ROLE.ADMIN), getEventsDay);

router.get('/api/admin/event/TakeAttendance/:id', isAuth, checkPermissions(ROLE.ADMIN), getEventMembers);
router.post('/api/admin/event/TakeAttendance/', isAuth, checkPermissions(ROLE.ADMIN), takeMemberCode);

router.get('/api/envet/getAdminEvent', isAuth, checkPermissions(ROLE.ADMIN), getAdminEvents);

module.exports = router;
