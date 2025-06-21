import { Button, Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";

export const ButtonNavigation = ({ label, url, icon }) => {
	return (
		<a href={url ? url : "/"}>
			<Button
				variant="filled"
				color="white"
				className="rounded-2xl flex items-center gap-2 hover:bg-gradient-to-bl hover:from-cyan-500 hover:to-blue-500 hover:text-white"
			>
				<Typography className="font-semibold text-sm">{label}</Typography>{" "}
				{icon ? icon : null}
			</Button>
		</a>
	);
};

ButtonNavigation.propTypes = {
	label: PropTypes.string,
	url: PropTypes.string,
	icon: PropTypes.object,
};
