import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Card, CardHeader, CardContent, Typography, CardActions, Button, Collapse } from '@material-ui/core';
import AddParticipantDialog from './AddParticipantDialog';
import style from './style.scss';

const Event = ({ event }, { email, clicked, message }) => {
	const [expanded, setExpanded] = useState(false);
	const [signingUp, setSigningUp] = useState(false);

	const toggleExpand = () => {
		setExpanded(!expanded);
	}

	const openSigningUp = () => {
		setSigningUp(true);
	}

	const closeSigningUp = () => {
		setSigningUp(false);
	}

	const start = new Date(event.start.dateTime || event.start.date);
	const end = new Date(event.end.dateTime || event.end.date);

	return (
		<div>
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
				<Collapse in={expanded} timeout="auto" unmountOnExit>
					<CardContent>
						<Typography variant="body2">
							<div dangerouslySetInnerHTML={{ __html : event.description || 'Aucune description' }} class={style.eventCardBody} />
						</Typography>
					</CardContent>
				</Collapse>
				<CardActions>
					<Button onClick={toggleExpand}>En savoir plus</Button>
					<Button onClick={openSigningUp}>S'inscrire</Button>
				</CardActions>
			</Card>
			<AddParticipantDialog
				event={event}
				open={signingUp}
				closeHandler={closeSigningUp}
			/>
		</div>
	);
};

export default Event;