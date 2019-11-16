import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import TextField from 'preact-material-components/TextField';
import Button from 'preact-material-components/Button';
import LinearProgress from 'preact-material-components/LinearProgress';
import { addParticipant } from '../../utils/garage-api'
import style from './style.scss';

class Event extends Component {
	state = {
		email: '',
		clicked: false,
		message: false
	}

	onInput = e => {
		const { value } = e.target;
		this.setState({ email: value });
	}

	send = async e => {
		this.setState({ clicked: true });
		const { calendar, id } = this.props.event;
		try {
			await addParticipant(calendar.id, id, this.state.email);
			this.setState({
				message: 'Vous-êtes inscrit !'
			});
		}
		catch (e) {
			console.log(e)
			this.setState({
				message: 'Quelque chose n\'a pas fonctionné'
			});
		}
	}

	render({ event }, { email, clicked, message }) {
		const start = new Date(event.start.dateTime || event.start.date);
		const end = new Date(event.end.dateTime || event.end.date);
	
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
				{
					clicked ?
						<Card.Actions class={style.actions}>
							
							{
								message ?
									message
									:
									<LinearProgress indeterminate />
							}
						</Card.Actions>
						:
						(
							<Card.Actions class={style.actions}>
								<Card.ActionButtons className={style.actionLeft}>
									<TextField onInput={this.onInput} value={email} className={style.textField} label="email" />
								</Card.ActionButtons>
								<Card.ActionIcons>
									<Button onClick={this.send} style={{ backgroundColor: event.calendar.color }} raised>S'inscrire</Button>
								</Card.ActionIcons>
							</Card.Actions>
						)
				}
			</Card>
		);
	}
}

export default Event;