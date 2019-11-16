import { h, Component } from 'preact';
import Chips from 'preact-material-components/Chips';
import style from './style';

class CalendarNav extends Component {
	toggleCalendar = calendarId => () => {
		this.props.toggleCalendar(calendarId);
	}

	render({ calendars }) {
		return (
			<Chips className={style.calendarNav}>
				{
					calendars.map(calendar => (
						<Chips.Chip
							className={`${style.chip}`}
							style={calendar.active ? { backgroundColor: calendar.color, color: 'white' } : {}}
							onClick={this.toggleCalendar(calendar.id)}
						>
							<Chips.Text>{ calendar.summary }</Chips.Text>
						</Chips.Chip>
					))
				}
			</Chips>
		);
	}

}

export default CalendarNav;