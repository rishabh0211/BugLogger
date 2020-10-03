import React, { useState, useEffect } from 'react';
import { ipcRenderer } from "electron";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import LogItem from './LogItem';
import AddLogItem from './AddLogItem';

const App = () => {

	const [logs, setLogs] = useState([]);
	const [alert, setAlert] = useState({
		show: false,
		message: "",
		variant: "success"
	});

	useEffect(() => {
		ipcRenderer.send("logs:load");
		ipcRenderer.on("logs:get", (e, logs) => {
			setLogs(JSON.parse(logs));
		});
		ipcRenderer.on("logs:clear", () => {
			setLogs([]);
			showAlert("Logs cleared");
		});
	}, []);

	const addItem = item => {
		if (item.text === "" || item.user === "" || item.priority === "") {
			return showAlert("Please enter all fields", "danger");
		}
		// item._id = Math.floor(Math.random() * 90000) + 10000;
		// item.create = new Date().toString();
		// setLogs([...logs, item]);
		ipcRenderer.send("logs:add", item);
		showAlert("Log added");
	};

	const deleteItem = _id => {
		// setLogs(logs.filter(log => log._id !== _id));
		ipcRenderer.send("logs:delete", _id);
		showAlert("Log removed!");
	};

	const showAlert = (message, variant = "success", seconds = 3000) => {
		setAlert({
			show: true,
			message,
			variant
		});
		setTimeout(() => {
			setAlert({
				show: false,
				message: "",
				variant: "success"
			});
		}, seconds);
	};

	return (
		<Container>
			<AddLogItem addItem={addItem} />
			{alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
			<Table>
				<thead>
					<tr>
						<th>Priority</th>
						<th>Log Text</th>
						<th>User</th>
						<th>Created</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{logs.map(log => (
						<LogItem log={log} key={log._id} deleteItem={deleteItem} />
					))}
				</tbody>
			</Table>
		</Container>
	)
}

export default App
