import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { StateProvider } from "./contexts/stateProvider";
import reducer, { initialState } from "./reducer";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<StateProvider reducer={reducer} initialState={initialState}>
			<ThemeProvider>
				<App />
			</ThemeProvider>
		</StateProvider>
	</React.StrictMode>
);
