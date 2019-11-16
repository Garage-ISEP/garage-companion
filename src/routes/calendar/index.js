import { h, Component } from 'preact';
//import { Router } from 'preact-router';
import { getCalendarList, getCalendarEvents } from '../../utils/garage-api';
import CalendarNav from '../../components/calendarNav';
import EventsList from '../../components/eventsList';


class Calendar extends Component {
	state = {
		loadingCalendars: true,
		calendars: []
	}

	toggleCalendar = calendarId => {
		this.setState({
			calendars: this.state.calendars.map(calendar => {
				if (calendar.id === calendarId) {
					return { ...calendar, active: !calendar.active };
				}

				return calendar;
			})
		});
	}

	setCalendars = async () => {
		const calendars = await getCalendarList();
		this.setState({
			calendars: calendars.map(calendar => ({ ...calendar, active: true, events: [] })),
			loadingCalendars: false
		});
		return calendars;
	}

	setEvents = async () => {
		await Promise.all(this.state.calendars.map(async calendar => {
			const response = await getCalendarEvents(calendar.id, {});
			this.setState({
				calendars: this.state.calendars.map(cal => {
					if (calendar.id === cal.id) {
						return {
							...cal,
							events: response.items
						};
					}

					return cal;
				})
			});
		}));
	}

	async componentDidMount() {
		await this.setCalendars();
		await this.setEvents();
	}

	render({ }, { calendars }) {
		return (
			<div className="container">
				<CalendarNav calendars={calendars} toggleCalendar={this.toggleCalendar} />
				<EventsList calendars={calendars} />
			</div>
		);
	}
}

export default Calendar;