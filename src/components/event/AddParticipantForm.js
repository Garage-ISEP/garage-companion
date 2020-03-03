import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import TextField from 'preact-material-components/TextField';
import Button from 'preact-material-components/Button';
import LinearProgress from 'preact-material-components/LinearProgress';
import { addParticipant } from '../../utils/garage-api';
import style from './style.scss';

export default class AddParticipantForm extends Component {
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