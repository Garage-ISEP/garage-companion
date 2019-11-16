import { h, Component } from 'preact';
import { getCalendarList } from '../../utils/garage-api';
import style from './style.scss';

import TopAppBar from 'preact-material-components/TopAppBar';

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
			<div>
				<TopAppBar className={style.topappbar}>
					<TopAppBar.Row>
						<TopAppBar.Section align-start>
							<TopAppBar.Title>
								Garage ISEP
							</TopAppBar.Title>
						</TopAppBar.Section>
						<TopAppBar.Section align-end>
							<TopAppBar.Icon>more_vert</TopAppBar.Icon>
						</TopAppBar.Section>
					</TopAppBar.Row>
				</TopAppBar>
			</div>
		);
	}
}


export default Header;
