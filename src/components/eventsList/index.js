import { h } from 'preact';
import Event from '../event';


const EventsList = ({ calendars, previously }) => {
	let events = [];
	calendars.forEach(calendar => {
		if (calendar.active) {
			events = [...events, ...calendar.events.map(event => ({
				...event,
				calendar: {
					summary: calendar.summary,
					color: calendar.color,
					id: calendar.id
				}
			}))];
		}
	});
	events.sort((a, b) => (
		previously ?
			(new Date(b.start.dateTime)).getTime() - (new Date(a.start.dateTime).getTime())
			:
			(new Date(a.start.dateTime)).getTime() - (new Date(b.start.dateTime).getTime())
	));
	
	return (
		<div>
			{
				events.map(event => (
					<Event event={event} />
				))
			}
		</div>
	);
};

export default EventsList;