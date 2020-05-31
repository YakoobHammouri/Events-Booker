import CategoryType from '../Class/CategoryType';
import EventsType from '../Class/EventsType';
import CategoryEventsType from '../Class/CategoryEventsType';

export default (
	category: Array<CategoryType>,
	upComingEvent: Array<EventsType>,
): Array<CategoryEventsType> | null => {
	if (!category || !upComingEvent) return null;

	return category.map((item) => {
		// get event of Category
		const event = upComingEvent.filter((cevent) => {
			return cevent.category_id === item.id;
		});
		// return Events of each Category
		return { ...item, events: event };
	});
};
