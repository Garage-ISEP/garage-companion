import { h } from 'preact';
import Card from 'preact-material-components/Card';
import AddParticipantForm from './AddParticipantForm';
import style from './style.scss';

const Event = ({ event }, { email, clicked, message }) => {
	const start = new Date(event.start.dateTime || event.start.date);
	const end = new Date(event.end.dateTime || event.end.date);

	return (
		<Card className={style.eventCard}>
			<div class={style.eventCardHeader} style={{ color: 'white', backgroundColor: event.calendar.color }}>
				<h2 class={`${style.eventCardTitle} mdc-typography mdc-typography--headline6`}>{ event.summary }</h2>
				<h3 class={`${style.eventCardDate} mdc-typography mdc-typography--subtitle2`}>
					Du { start.getDate() }/{ (start.getMonth() < 9 ? '0' : '') + (start.getMonth() + 1) } à { start.getHours() }h{ (start.getMinutes() < 10 ? '0' : '') + start.getMinutes() } au { end.getDate() }/{ (end.getMonth() < 9 ? '0' : '') + (end.getMonth() + 1) } à { end.getHours() }h{ (end.getMinutes() < 10 ? '0' : '') + end.getMinutes() }
				</h3>
			</div>
			<AddParticipantForm event={event} />
		</Card>
	);
};

export default Event;