import { h, Component } from 'preact';
//import { Router } from 'preact-router';
import { getCalendarList } from '../../utils/garage-api';
import CalendarNav from '../../components/calendarNav';


class Calendar extends Component {
	state = {
		loading: true,
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

	componentDidMount() {
		getCalendarList().then((calendars) => {
			this.setState({
				calendars: calendars.map(calendar => ({ ...calendar, active: true })),
				loading: false
			});
		});
	}

	render({ }, { calendars }) {
		return (
			<div>
				<CalendarNav calendars={calendars} toggleCalendar={this.toggleCalendar} />
			</div>
		);
	}
}

export default Calendar;