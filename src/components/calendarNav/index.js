import { h, Component } from 'preact';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import style from './style';

class CalendarNav extends Component {
	toggleCalendar = calendarId => () => {
		this.props.toggleCalendar(calendarId);
	}

	render({ calendars, previously }) {
		return (
			<div className={style.calendarNav}>
				{
					calendars.map(calendar => (
						<Chip
							className={`${style.chip}`}
							style={calendar.active ? { backgroundColor: calendar.color, color: 'white' } : {}}
							onClick={this.toggleCalendar(calendar.id)}
							icon={calendar.active ? <DoneIcon className={style.icon}  /> : undefined}
							label={calendar.summary}
							clickable
						/>
					))
				}
				<Chip
					className={`${style.chip}`}
					onClick={this.props.togglePreviously}
					style={previously ? { backgroundColor: 'black', color: 'white' } : {}}
					label="Previously..."
				/>
			</div>
		);
	}

}

export default CalendarNav;