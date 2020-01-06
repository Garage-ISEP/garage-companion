import { h, Component } from 'preact';
import { getCalendarList, getCalendarEvents } from '../../utils/garage-api';
import CalendarNav from '../../components/calendarNav';
import EventsList from '../../components/eventsList';


class Calendar extends Component {
	state = {
		loadingCalendars: true,
		previously: false,
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

	togglePreviously = async () => {
		const config = !this.state.previously ? { timeMax: (new Date()).toISOString() } : { timeMin: (new Date()).toISOString() };

		this.setState({
			previously: !this.state.previously,
			loadingCalendars: true
		});

		await this.setEvents(config);

		this.setState({
			loadingCalendars: false
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

	setEvents = async (config = {}) => {
		await Promise.all(this.state.calendars.map(async calendar => {
			const response = await getCalendarEvents(calendar.id, config);
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
		await this.setEvents({
			timeMin: (new Date()).toISOString()
		});
	}

	render({ }, { calendars, previously }) {
		return (
			<div className="container">
				<h1>Nos prochains événements !</h1>
				<CalendarNav calendars={calendars} toggleCalendar={this.toggleCalendar} togglePreviously={this.togglePreviously} previously={previously} />
				<EventsList calendars={calendars} previously={previously} />
			</div>
		);
	}
}

export default Calendar;