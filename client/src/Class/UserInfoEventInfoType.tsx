type UserInfoEventInfoType = {
	id: number;
	gid: string;
	user_name: string;
	phone: string;
	birth_date: string;
	email: string;
	university: string;
	address: string;
	role: string;
	profession: string;
	password: string;
	email_activate: boolean;
	phone_activate: boolean;

	title: string;
	category_id: number;
	description: string;
	event_date: string;
	event_time: string;
	event_location: string;
	event_status: string;
	host: string;
	member_cnt: number;
	attendance_cnt: number;

	code: string;
	attendance_status: boolean;
	note: string;
};

export default UserInfoEventInfoType;
