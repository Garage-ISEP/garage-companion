import { h, Component } from 'preact';
import { CardActions, Button, TextField, LinearProgress } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
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
				<CardActions className={style.actions}>
					<div className={style.actionLeft}>
						<TextField onInput={this.onInput} value={email} className={style.textField} label="email" />
					</div>
					<div>
						<Button variant="contained" onClick={this.send} style={{ backgroundColor: event.calendar.color, color: 'white' }}>S'inscrire</Button>
					</div>
				</CardActions>
			);
		}
		else if (fetching) {
			return (
				<CardActions className={style.actions}>
					<LinearProgress />
				</CardActions>
			);
		}
		else if (isDone) {
			return (
				<CardActions className={style.actions}>
					<div className={style.actionLeft}>
						{ message || 'Something went wrong' }
					</div>
					<div>
						<CloseIcon onClick={this.reset} />
					</div>
				</CardActions>
			);
		}
	}
}

export default AddParticipantForm;