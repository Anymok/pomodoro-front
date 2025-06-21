import { IconButton, Typography } from "@material-tailwind/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";
import { useStateValue } from "../../../contexts/stateProvider";
import { actionTypes } from "../../../reducer";

export const Break = ({ label }) => {
	const [{ breakValue, busyIndicator }] = useStateValue();
	const [state, dispatch] = useStateValue();

	const handleDecrement = () => {
		dispatch({
			...state,
			type: actionTypes.DECREASE_BREAK_VALUE,
			breakValue: breakValue - 1,
		});
	};
	const handleIncrement = () => {
		dispatch({
			...state,
			type: actionTypes.INCREASE_BREAK_VALUE,
			breakValue: breakValue + 1,
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
					disabled={busyIndicator || breakValue <= 1}
					className="rounded-full m-2 hover:bg-gradient-to-bl hover:from-cyan-500 hover:to-blue-500 hover:text-white"
					color="light-blue"
					variant="outlined"
				>
					<MinusIcon className="h-full w-full" />
				</IconButton>
				<Typography className="lining-nums text-2xl">{breakValue}</Typography>
				<IconButton
					onClick={handleIncrement}
					className="rounded-full m-2 hover:bg-gradient-to-bl hover:from-cyan-500 hover:to-blue-500 hover:text-white"
					color="light-blue"
					variant="outlined"
					disabled={busyIndicator || breakValue > 59}
				>
					<PlusIcon className="h-full w-full" />
				</IconButton>
			</div>
		</div>
	);
};

Break.propTypes = {
	label: PropTypes.string,
};
