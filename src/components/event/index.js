import { h } from 'preact';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import AddParticipantForm from './AddParticipantForm';
import style from './style.scss';

const Event = ({ event }, { email, clicked, message }) => {
	const start = new Date(event.start.dateTime || event.start.date);
	const end = new Date(event.end.dateTime || event.end.date);

	return (
		<Card className={style.eventCard}>
			<CardHeader
				className={style.eventCardHeader}
				style={{ backgroundColor: event.calendar.color }}
				title={event.summary}
				subheader={
					<span className={style.eventCardSubHeader}>
						{`Du ${ start.getDate() }/${ (start.getMonth() < 9 ? '0' : '') + (start.getMonth() + 1) } à ${ start.getHours() }h${ (start.getMinutes() < 10 ? '0' : '') + start.getMinutes() } au ${ end.getDate() }/${ (end.getMonth() < 9 ? '0' : '') + (end.getMonth() + 1) } à ${ end.getHours() }h${ (end.getMinutes() < 10 ? '0' : '') + end.getMinutes() }`}
					</span>
				}
			/>
			<CardContent>
				<Typography variant="body2">
					<div dangerouslySetInnerHTML={{ __html : event.description || 'Aucune description' }} class={style.eventCardBody} />
				</Typography>
			</CardContent>
			<AddParticipantForm event={event} />
		</Card>
	);
};

export default Event;