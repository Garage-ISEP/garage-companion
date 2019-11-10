import { h, Component } from 'preact';
import style from './style';
import { getAllEvents } from '../../utils/garage-api';

class Home extends Component {
	state = {
		events: []
	}

	componentDidMount() {
		getAllEvents().then(events => {
			this.setState({ events });
		});
	}

	render({ }, { events }) {
		return (
			<div class={style.home}>
				<h1>Home</h1>
			</div>
		);
	}
}

export default Home;
