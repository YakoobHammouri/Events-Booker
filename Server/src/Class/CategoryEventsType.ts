import EventsType from './EventsType';

type CategoryEventsType = {
	id: number;
	gid: string;
	catg_name: string;
	events: Array<EventsType>;
};

export default CategoryEventsType;
