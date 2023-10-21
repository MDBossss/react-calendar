import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { generateMonthData } from "../utils/dateUtils";
import Cell from "./Cell";
import { addMonths, getMonth, getYear } from "date-fns";

interface CalendarProps {
	weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
	month?: number;
	year?: number;
	onYearChange?: (year: number) => void;
	events?: Record<string, EventType[]>;
}

const Calendar = ({ weekStartsOn, month, year, onYearChange, events }: CalendarProps) => {
	const [calendarData, setCalendarData] = useState(
		generateMonthData({ weekStartsOn, month, year })
	);

	/**When arrow button are clicked the util function gets called to generate new grid */
	const handleNavigateMonth = (value: number) => {
		setCalendarData(
			generateMonthData({
				weekStartsOn,
				month: getMonth(addMonths(calendarData.selectedMonthDate, value)),
				year: getYear(addMonths(calendarData.selectedMonthDate, value)),
			})
		);
	};

	//If the year changes trigger the onYearChange event
	useEffect(() => {
		onYearChange ? onYearChange(calendarData.selectedYear) : null;
	}, [calendarData.selectedYear]);

	return (
		<div className="flex flex-col gap-5">
			<div className="flex items-center justify-between gap-5">
				<h1 className="text-2xl font-bold text-zinc-800">
					{calendarData.selectedMonthName} {calendarData.selectedYear}
				</h1>
				<div className="flex gap-2">
					<button
						className="p-2 text-teal-600 transition-all border-2 border-teal-100 rounded-xl hover:scale-105 hover:shadow-md"
						onClick={() => handleNavigateMonth(-1)}
					>
						<ChevronLeftIcon className="w-6 h-6" />
					</button>
					<button
						className="p-2 text-teal-600 transition-all border-2 border-teal-100 rounded-xl hover:scale-105 hover:shadow-md"
						onClick={() => handleNavigateMonth(1)}
					>
						<ChevronRightIcon className="w-6 h-6" />
					</button>
				</div>
			</div>
			<div className="flex flex-col border rounded-t-xl border-slate-300">
				<div className="grid grid-cols-7 grid-rows-1 font-bold text-center text-teal-600 bg-teal-100 rounded-t-xl">
					{calendarData.weekDayNames.map((day) => (
						<div key={day} className="p-5 text-xs truncate md:text-base">
							{day}
						</div>
					))}
				</div>
				<div className="grid flex-1 grid-cols-7">
					{calendarData.monthGrid.map((week, i) => {
						const isWeekEmpty = week.every((day) => day === null);
						return (
							!isWeekEmpty && (
								<Fragment key={i}>
									{week.map((day, j) => {
										const dayEvents = events && day ? events[day] : null;
										return (
											<Cell
												key={j}
												day={day}
												events={dayEvents}
												className={j !== 6 ? "border-r" : ""}
											/>
										);
									})}
								</Fragment>
							)
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Calendar;
