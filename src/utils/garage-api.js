const URL = 'http://localhost:3000';

export async function getCalendarList() {
	const response = await fetch(`${URL}/calendar/calendarList/list`, {
		method: 'GET'
	});
	return await response.json();
}

export async function getAllEvents(config={}) {
	const response = await fetch(`${URL}/calendar/all/events`, {
		method: 'POST',
		body: JSON.stringify(config)
	});
	return await response.json();
}