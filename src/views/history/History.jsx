import { useState, useEffect } from "react";
import { Card, Typography, CardBody, Chip } from "@material-tailwind/react";
import { getHistoryList } from "../../services/HistoryService";
import { ButtonNavigation } from "../../components/navigation/ButtonNavigation";
import { ClockIcon } from "@heroicons/react/24/solid";

const TABLE_HEAD = [
	"ID",
	"Action",
	"Pause",
	"Session",
	"Type",
	"Temps",
	"Date",
];

export function History() {
	const [historyList, setHistoryList] = useState([]);
	useEffect(() => {
		async function fetchHistoryList() {
			try {
				const history = await getHistoryList();
				if (!history) {
					throw new Error("No history list");
				}
				setHistoryList(history);
			} catch (error) {
				console.error(
					"Une erreur est survenue lors de la récupération de l historique:",
					error
				);
			}
		}

		fetchHistoryList();
	}, []);

	return (
		<div className="flex flex-col">
			<div className="absolute top-0 left-0 ml-8 mt-6">
				<ButtonNavigation
					label={"Pomodoro"}
					url={"/"}
					icon={<ClockIcon className="h-6" />}
				/>
			</div>
			<Typography variant="h1" color="white" className="m-6">
				Historique publique du pomodoro
			</Typography>
			<Card className="rounded-2xl">
				<CardBody className="overflow-scroll px-0 no-scrollbar overflow-y-auto">
					<table className="size-full table-auto text-left">
						<thead>
							<tr>
								{TABLE_HEAD.map((head) => (
									<th
										key={head}
										className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
									>
										<Typography
											variant="small"
											color="blue-gray"
											className="font-normal leading-none opacity-70"
										>
											{head}
										</Typography>
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{historyList.map(
								(
									{
										id,
										date,
										action,
										break_length,
										session_length,
										time,
										type,
									},
									index
								) => {
									const isLast = index === historyList.length - 1;
									const classes = isLast
										? "p-4"
										: "p-4 border-b border-blue-gray-50";

									return (
										<tr key={id}>
											<td className={classes}>
												<div className="flex items-center gap-3">
													<Typography
														variant="small"
														color="blue-gray"
														className="font-bold"
													>
														{id}
													</Typography>
												</div>
											</td>
											<td className={classes}>
												<div className="w-max">
													<Chip
														size="sm"
														variant="ghost"
														value={action}
														color={
															action.toLowerCase() === "play"
																? "green"
																: action.toLowerCase() === "pause"
																? "amber"
																: "red"
														}
													/>
												</div>
											</td>
											<td className={classes}>
												<Typography
													variant="small"
													color="blue-gray"
													className="font-normal"
												>
													{break_length}
												</Typography>
											</td>
											<td className={classes}>
												<Typography
													variant="small"
													color="blue-gray"
													className="font-normal"
												>
													{session_length}
												</Typography>
											</td>
											<td className={classes}>
												<div className="w-max">
													<Chip
														size="sm"
														variant="ghost"
														value={type}
														color={
															type.toLowerCase() === "break"
																? "yellow"
																: type.toLowerCase() === "session"
																? "green"
																: "pink"
														}
													/>
												</div>
											</td>
											<td className={classes}>
												<Typography
													variant="small"
													color="blue-gray"
													className="font-normal"
												>
													{time}
												</Typography>
											</td>
											<td className={classes}>
												<Typography
													variant="small"
													color="blue-gray"
													className="font-normal"
												>
													{date}
												</Typography>
											</td>
										</tr>
									);
								}
							)}
						</tbody>
					</table>
				</CardBody>
			</Card>
		</div>
	);
}
