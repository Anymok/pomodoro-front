const API_BASE_URL = import.meta.env.VITE_BASE_URL;

async function createHistory(action, break_length, session_length, time, type) {
	const response = await fetch(`${API_BASE_URL}/api/history`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
            action: action,
            breakLength: break_length,
            sessionLength: session_length,
            time: time,
            type: type,
          }),
	});
	if (!response.ok) {
		throw new Error("Error");
	}
	return await response.json();
}

async function getHistoryById(id) {
	const response = await fetch(`${API_BASE_URL}/api/history/${id}`);
	if (!response.ok) {
		throw new Error("Error");
	}
	return await response.json();
}

async function getHistoryList() {
	const response = await fetch(`${API_BASE_URL}/api/history/list`);
	if (!response.ok) {
		throw new Error("Error");
	}
	return await response.json();
}

async function deleteHistory(id) {
	const response = await fetch(`${API_BASE_URL}/api/history/${id}`, {
		method: "DELETE",
	});
	if (!response.ok) {
		throw new Error("Error");
	}
	return await response.json();
}

export { createHistory, getHistoryById, getHistoryList, deleteHistory };
