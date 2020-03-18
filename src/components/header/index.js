import { h, Component } from 'preact';
import { getCalendarList } from '../../utils/garage-api';

import { AppBar, Toolbar, Typography } from '@material-ui/core';

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
				<AppBar>
					<Toolbar>
						<Typography variant="h6" color="inherit">
							GarageISEP
						</Typography>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}


export default Header;
