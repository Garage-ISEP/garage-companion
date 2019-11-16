import { h } from 'preact';
import Card from 'preact-material-components/Card';
import style from './style.scss';

const Event = ({ event }) => {
	const start = new Date(event.start.dateTime);
	const end = new Date(event.end.dateTime);

	return (
		<Card className={style.eventCard}>
			<div class={style.eventCardHeader} style={{ color: 'white', backgroundColor: event.calendar.color }}>
				<h2 class={`${style.eventCardTitle} mdc-typography mdc-typography--headline6`}>{ event.summary }</h2>
				<h3 class={`${style.eventCardDate} mdc-typography mdc-typography--subtitle2`}>
					Du { start.getDate() }/{ (start.getMonth() < 10 ? '0' : '') + start.getMonth() } à { start.getHours() }h{ (start.getMinutes() < 10 ? '0' : '') + start.getMinutes() } au { end.getDate() }/{ (end.getMonth() < 10 ? '0' : '') + end.getMonth() } à { end.getHours() }h{ (end.getMinutes() < 10 ? '0' : '') + end.getMinutes() }
				</h3>
			</div>
			<div class={`${style.eventCardBody} mdc-card__primary-action`}>
				<div class={`${style.eventCardBodyText} mdc-typography mdc-typography--body2`}>{ event.description || 'Aucune description' }</div>
			</div>
			<Card.Actions>
				<Card.ActionIcons>
					<Card.ActionButton style={{ color: event.calendar.color }}>S'inscrire</Card.ActionButton>
				</Card.ActionIcons>
			</Card.Actions>
		</Card>
	);
}

export default Event;