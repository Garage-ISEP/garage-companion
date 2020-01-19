import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import TextField from 'preact-material-components/TextField';
import Button from 'preact-material-components/Button';
import LinearProgress from 'preact-material-components/LinearProgress';
import { addParticipant } from '../../utils/garage-api';
import style from './style.scss';


class AddParticipantForm extends Component {
	state = {
		email: '',
		fetching: false,
		isDone: false,
		message: undefined
	}

	reset = e => {
		this.setState({
			email: '',
			fetching: false,
			isDone: false,
			message: undefined
		});
	}

	onInput = e => {
		const { value } = e.target;
		this.setState({ email: value });
	}

	send = async e => {
		this.setState({ fetching: true });
		const { calendar, id } = this.props.event;
		try {
			await addParticipant(calendar.id, id, this.state.email);
			this.setState({
				fetching: false,
				isDone: true,
				message: 'Vous-êtes inscrit !'
			});
		}
		catch (e) {
			console.log(e);
			this.setState({
				fetching: false,
				isDone: true,
				message: e.message
			});
		}
	}

	render({ event }, { email, fetching, isDone, message }) {
		if (!fetching && !isDone) {
			return (
				<Card.Actions class={style.actions}>
					<Card.ActionButtons className={style.actionLeft}>
						<TextField onInput={this.onInput} value={email} className={style.textField} label="email" />
					</Card.ActionButtons>
					<Card.ActionIcons>
						<Button onClick={this.send} style={{ backgroundColor: event.calendar.color }} raised>S'inscrire</Button>
					</Card.ActionIcons>
				</Card.Actions>
			);
		}
		else if (fetching) {
			return (
				<Card.Actions>
					<LinearProgress indeterminate />
				</Card.Actions>
			);
		}
		else if (isDone) {
			return (
				<Card.Actions>
					<Card.ActionButtons className={style.actionLeft}>
						{ message || 'Something went wrong' }
					</Card.ActionButtons>
					<Card.ActionIcons>
						<Card.ActionIcon onClick={this.reset}>close</Card.ActionIcon>
					</Card.ActionIcons>
				</Card.Actions>
			);
		}
	}
}

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
			<div class={`${style.eventCardBody} mdc-card__primary-action`}>
				<div class={`${style.eventCardBodyText} mdc-typography mdc-typography--body2`}>{ event.description || 'Aucune description' }</div>
			</div>
			<AddParticipantForm event={event} />
		</Card>
	);
};

export default Event;