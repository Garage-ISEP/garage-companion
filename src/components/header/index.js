import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { getCalendarList } from '../../utils/garage-api';
import style from './style';

class Header extends Component {
	state = {
		calendars: []
	}

	componentDidMount() {
		getCalendarList().then((calendars) => {
			this.setState({
				calendars
			});
		});
	}

	render({}, { calendars }) {
		return (
			<header class={style.header}>
				<h1>Preact App</h1>
				<nav>
					<Link activeClassName={style.active} href="/">Home</Link>
					{
						calendars.map((calendar, index) => (
							<Link key={index} activeClassName={style.active} href={`/calendar/${calendar.id}`}>{ calendar.summary }</Link>
						))
					}
				</nav>
			</header>
		)
	}
}


export default Header;
