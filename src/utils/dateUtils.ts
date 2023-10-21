import { startOfMonth, format, getMonth, getYear } from "date-fns";

interface GenerateMonthOptions {
	month?: number;
	year?: number;
	weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export function generateMonthData({
	month = getMonth(new Date()),
	year = getYear(new Date()),
	weekStartsOn = 1,
}: GenerateMonthOptions = {}) {
	const selectedMonthDate = new Date(year, month, 1);
	const monthName = format(selectedMonthDate, "MMMM");

	const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	const weekDayNames = [...dayNames.slice(weekStartsOn), ...dayNames.slice(0, weekStartsOn)];

	let firstDayOfTheMonth = startOfMonth(selectedMonthDate).getDay();

	firstDayOfTheMonth = (firstDayOfTheMonth - weekStartsOn + 7) % 7;

	let currentMonthCount = 0 - firstDayOfTheMonth;

	const monthGrid = new Array(6).fill([]).map(() => {
		return new Array(7).fill(null).map(() => {
			currentMonthCount++;

			const currentDay = new Date(year, month, currentMonthCount);

			if (getMonth(currentDay) === month) {
				return format(currentDay, "yyyy-MM-dd", { weekStartsOn });
			} else {
				return null;
			}
		});
	});
	// console.table(monthGrid);
	return {
		selectedYear: year,
		selectedMonth: month,
		selectedMonthDate,
		weekDayNames,
		selectedMonthName: monthName,
		monthGrid,
	};
}

export function parseAndValidateMonthNumber(monthNumber: string) {
	const parsedMonth = parseInt(monthNumber, 10);
	if (!isNaN(parsedMonth) && parsedMonth >= 1 && parsedMonth <= 12) {
		return parsedMonth;
	} else {
		return getMonth(new Date());
	}
}
