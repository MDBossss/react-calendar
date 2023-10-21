import { useParams } from "react-router-dom";
import Calendar from "../Calendar";
import { getMonth, getYear } from "date-fns";
import { parseAndValidateMonthNumber } from "../../utils/dateUtils";
import { fetchEvents } from "../../utils/utils";
import { useState } from "react";

const Home = () => {
	const { year, month } = useParams();
	const selectedYear = year ? parseInt(year, 10) : getYear(new Date());
	const selectedMonth = month ? parseAndValidateMonthNumber(month) : getMonth(new Date());
	const [events, setEvents] = useState<Record<string, EventType[]>>();

	const handleYearChange = async (year: number) => {
		await fetchEvents(year)
			.then((events) => {
				setEvents(events);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<main className="mx-auto max-w-7xl py-20 h-full">
			<Calendar
				weekStartsOn={1}
				month={selectedMonth - 1}
				year={selectedYear}
				onYearChange={handleYearChange}
				events={events}
			/>
		</main>
	);
};

export default Home;
