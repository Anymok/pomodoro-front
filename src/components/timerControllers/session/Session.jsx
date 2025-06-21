import { IconButton, Typography } from "@material-tailwind/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";
import { useStateValue } from "../../../contexts/stateProvider";
import { actionTypes } from "../../../reducer";

export const Session = ({ label }) => {
	const [{ sessionValue, busyIndicator }] = useStateValue();
	const [state, dispatch] = useStateValue();

	const handleDecrement = () => {
		dispatch({
			...state,
			type: actionTypes.DECREASE_SESSION_VALUE,
			sessionValue: sessionValue - 1,
			timerValue: (sessionValue - 1) * 60,
		});
	};
	const handleIncrement = () => {
		dispatch({
			...state,
			type: actionTypes.INCREASE_SESSION_VALUE,
			sessionValue: sessionValue + 1,
			timerValue: (sessionValue + 1) * 60,
		});
	};

	return (
		<div className="flex flex-col items-center">
			<Typography variant="h5" className="font-semibold">
				{label}
			</Typography>
			<div className="flex justify-between items-center text-center">
				<IconButton
					onClick={handleDecrement}
					disabled={busyIndicator || sessionValue <= 1}
					className="rounded-full m-2 hover:bg-gradient-to-bl hover:from-cyan-500 hover:to-blue-500 hover:text-white"
					color="light-blue"
					variant="outlined"
				>
					<MinusIcon className="h-full w-full" />
				</IconButton>
				<Typography className="lining-nums text-2xl">{sessionValue}</Typography>
				<IconButton
					onClick={handleIncrement}
					disabled={busyIndicator || sessionValue > 59}
					className="rounded-full m-2 hover:bg-gradient-to-bl hover:from-cyan-500 hover:to-blue-500 hover:text-white"
					color="light-blue"
					variant="outlined"
				>
					<PlusIcon className="h-full w-full" />
				</IconButton>
			</div>
		</div>
	);
};

Session.propTypes = {
	label: PropTypes.string,
};
