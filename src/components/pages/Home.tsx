import { useParams } from "react-router-dom";
import Calendar from "../Calendar";
import { getMonth, getYear } from "date-fns";
import { parseAndValidateMonthNumber } from "../../utils/dateUtils";
import { fetchEvents } from "../../utils/utils";
import { useState } from "react";

const Home = () => {
	//Getting the year and month from the url
	const { year, month } = useParams();

	//Parsing and validating the values from the url
	const selectedYear = year ? parseInt(year, 10) : getYear(new Date());
	const selectedMonth = month ? parseAndValidateMonthNumber(month) : getMonth(new Date());

	//Events which wil be passed to the calendar cells
	const [events, setEvents] = useState<Record<string, EventType[]>>();


	/**Fetches new events for the whole year if the year changes */
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
		<main className="h-full py-20 mx-auto max-w-7xl">
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
