import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
	<StateContext.Provider value={useReducer(reducer, initialState)}>
		{children}
	</StateContext.Provider>
);

StateProvider.propTypes = {
	reducer: PropTypes.any,
	initialState: PropTypes.any,
	children: PropTypes.object,
};

export const useStateValue = () => useContext(StateContext);
