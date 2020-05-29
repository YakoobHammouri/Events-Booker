import axiso, { AxiosPromise } from 'axios';
export default (role?: string): AxiosPromise => {
	return !role ? axiso.post('/isAuth/') : axiso.post('/isAccess/', { role });
};
