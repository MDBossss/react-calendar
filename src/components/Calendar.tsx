import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { generateMonthData } from "../utils/dateUtils";
import Cell from "./Cell";
import { addMonths, getMonth, getYear } from "date-fns";

interface CalendarProps {
	weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
	month?: number;
	year?: number;
}

const Calendar = ({ weekStartsOn, month, year }: CalendarProps) => {
	const [calendarData, setCalendarData] = useState(
		generateMonthData({ weekStartsOn, month, year })
	);

	const handlePreviousMonth = () => {
		setCalendarData(
			generateMonthData({
				weekStartsOn,
				month: getMonth(addMonths(calendarData.selectedMonthDate, -1)),
				year: getYear(addMonths(calendarData.selectedMonthDate, -1)),
			})
		);
	};

	const handleNextMonth = () => {
		setCalendarData(
			generateMonthData({
				weekStartsOn,
				month: getMonth(addMonths(calendarData.selectedMonthDate, 1)),
				year: getYear(addMonths(calendarData.selectedMonthDate, 1)),
			})
		);
	};

	return (
		<div className="gap-5 flex flex-col">
			<div className="flex gap-5 justify-between items-center">
				<h1 className="font-bold text-2xl text-zinc-800">
					{calendarData.selectedMonthName} {calendarData.selectedYear}
				</h1>
				<div className="flex gap-2">
					<button
						className="rounded-xl  border-2 border-teal-100 text-teal-600 p-2 hover:scale-105 transition-all"
						onClick={handlePreviousMonth}
					>
						<ChevronLeftIcon className="w-6 h-6" />
					</button>
					<button
						className="rounded-xl border-2 border-teal-100 text-teal-600 p-2 hover:scale-105 transition-all"
						onClick={handleNextMonth}
					>
						<ChevronRightIcon className="w-6 h-6" />
					</button>
				</div>
			</div>
			<div className="flex flex-col rounded-t-xl border border-slate-300">
				<div className="grid grid-cols-7 grid-rows-1 text-center bg-teal-100 rounded-t-xl text-teal-600 font-bold">
					{calendarData.weekDayNames.map((day) => (
						<div key={day} className=" p-5">
							{day}
						</div>
					))}
				</div>
				<div className="flex-1 grid grid-cols-7">
					{calendarData.monthGrid.map((week, i) => {
						const isWeekEmpty = week.every((day) => day === null);
						return (
							!isWeekEmpty && (
								<Fragment key={i}>
									{week.map((day, j) => (
										<Cell key={j} day={day} className={j !== 6 ? "border-r" : ""} />
									))}
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
