import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from "./views/home/Home";
import { History } from "./views/history/History";

function App() {
	return (
		<Router>
			<Routes>
				<Route element={<Home />} path="/"></Route>
				<Route element={<History />} path="/history"></Route>
			</Routes>
		</Router>
	);
}

export default App;