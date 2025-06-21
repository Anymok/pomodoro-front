import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Typography,
} from "@material-tailwind/react";
import { Break } from "../timerControllers/break/Break";
import { Session } from "../timerControllers/session/Session";
import { Controls } from "../timerControllers/controls/Controls";
import { useClockify } from "../../hooks/useClockify";
import { useStateValue } from "../../contexts/stateProvider";

export const PomodoroCard = () => {
	const [{ projectName, timerLabel }] = useStateValue();
	const clockifiedValue = useClockify();

	return (
		<Card className="items-center rounded-3xl px-3 py-8 min-w-96">
			<CardHeader floated={false} shadow={false} color="transparent">
				<Typography
					id="time-left"
					variant="h1"
					color="blue-gray"
					className="font-normal"
				>
					{projectName}
				</Typography>
			</CardHeader>
			<CardBody className="rounded-full min-w-56 p-0 py-9 my-5 bg-blue-500 drop-shadow-xl">
				<Typography
					id="time-left"
					variant="lead"
					color="white"
					className="font-medium"
				>
					{timerLabel}
				</Typography>
				<Typography
					id="time-left"
					color="white"
					className="text-5xl font-semibold mb-2"
				>
					{clockifiedValue}
				</Typography>
				<Controls />
			</CardBody>
			<CardFooter className="flex items-center justify-between">
				<Break label={"Pause"} />
				<Session label={"Session"} />
			</CardFooter>
		</Card>
	);
};
