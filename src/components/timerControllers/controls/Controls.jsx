import { useEffect, useRef } from "react";
import { IconButton } from "@material-tailwind/react";
import { ArrowPathIcon, PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { useStateValue } from "../../../contexts/stateProvider";
import { actionTypes } from "../../../reducer";
import { useClockify } from "../../../hooks/useClockify";
import { createHistory } from "../../../services/HistoryService";

export const Controls = () => {
	const [
		{
			projectName,
			timerValue,
			breakValue,
			sessionValue,
			timerLabel,
			busyIndicator,
		},
	] = useStateValue();
	const [state, dispatch] = useStateValue();

	// Custom Hook
	const clockifiedValue = useClockify();
	const bellSoundUrl =
		"https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3";
	const audioSoundRef = useRef();

	const handleReset = () => {
		dispatch({
			...state,
			type: actionTypes.RESET_TIMERS,
		});
		audioSoundRef.current.pause();
		audioSoundRef.current.time = 0;

		const action = "reset";
		const break_length = breakValue.toString();
		const session_length = sessionValue.toString();
		const time = clockifiedValue;
		const type = state.timerLabel;

		sendData(action, break_length, session_length, time, type);
	};

	const handlePlayPause = () => {
		dispatch({
			...state,
			type: actionTypes.TOGGLE_ISBUSY_INDICATOR,
			busyIndicator: !state.busyIndicator,
		});

		const action = !busyIndicator ? "play" : "pause";
		const break_length = breakValue.toString();
		const session_length = sessionValue.toString();
		const time = clockifiedValue;
		const type = state.timerLabel;

		sendData(action, break_length, session_length, time, type);
	};

	const sendData = async (action, break_length, session_length, time, type) => {
		try {
			const data = await createHistory(
				action,
				break_length,
				session_length,
				time,
				type
			);
		} catch (error) {
			console.error("Erreur:", error);
		}
	};

	const handleCount = () => {
		dispatch({
			...state,
			type: actionTypes.START_TIMER,
			timerValue: timerValue - 1,
		});
		if (timerValue === 0) audioSoundRef.current.play();
		if (timerValue < 0) {
			if (timerLabel === "Session") {
				dispatch({
					...state,
					type: actionTypes.TOGGLE_TIMER_LABEL,
					timerLabel: "Break",
				});
				dispatch({
					...state,
					type: actionTypes.START_TIMER,
					timerValue: breakValue * 60 - 1,
				});
			} else {
				dispatch({
					...state,
					type: actionTypes.TOGGLE_TIMER_LABEL,
					timerLabel: "Session",
				});
				dispatch({
					...state,
					type: actionTypes.START_TIMER,
					timerValue: sessionValue * 60 - 1,
				});
			}
		}
	};

	useEffect(() => {
		if (busyIndicator) {
			let timerInterval = setInterval(() => {
				handleCount();
				document.title = `[${timerLabel}] - ${clockifiedValue}`;
			}, 1000);
			// Clear interval if the component is unmounted
			return () => clearInterval(timerInterval);
		} else document.title = projectName;
	});

	return (
		<div className="flex justify-center items-center">
			<IconButton
				id="start_stop"
				onClick={handlePlayPause}
				className="rounded-full m-2"
				color="white"
				variant="filled"
				size="lg"
			>
				{!busyIndicator ? (
					<PlayIcon className="h-full w-full" />
				) : (
					<PauseIcon className="h-full w-full" />
				)}
			</IconButton>
			<IconButton
				id="reset"
				onClick={handleReset}
				className="rounded-full m-2"
				color="white"
				variant="filled"
				size="lg"
			>
				<ArrowPathIcon className="h-full w-full" />
			</IconButton>
			<audio id="beep" src={bellSoundUrl} ref={audioSoundRef} preload="auto" />
		</div>
	);
};
