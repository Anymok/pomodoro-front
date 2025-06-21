import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import { PomodoroCard } from "../../components/cards/PomodoroCard";
import { ButtonNavigation } from "../../components/navigation/ButtonNavigation";

export const Home = () => {
	return (
		<div className="container">
			<div className="absolute top-0 right-0 mr-8 mt-6">
				<ButtonNavigation
					label={"Historique"}
					url={"/history"}
					icon={<ArrowLongRightIcon className="h-6" />}
				/>
			</div>
			<PomodoroCard />
		</div>
	);
};
