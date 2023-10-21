import { startOfMonth, format, getMonth, getYear } from "date-fns";

interface GenerateMonthOptions {
	month?: number;
	year?: number;
	weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

/**Generates the month grid, as well as other month related data based on the 
 * passed month and year with the ability to select which date the week starts on.
  */
export function generateMonthData({
	month = getMonth(new Date()),
	year = getYear(new Date()),
	weekStartsOn = 1,
}: GenerateMonthOptions = {}) {
	//Full Date from the passed values
	const selectedMonthDate = new Date(year, month, 1);

	//Full month name used for displaying
	const monthName = format(selectedMonthDate, "MMMM");

	//Rotates the array based on the weekStartsOn value
	const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const weekDayNames = [...dayNames.slice(weekStartsOn), ...dayNames.slice(0, weekStartsOn)];

	//Which day of the week is the first day of the month
	let firstDayOfTheMonth = startOfMonth(selectedMonthDate).getDay();

	/**Adjusts the day based on the weekStartsOn value using modular arithmetic
	 * to make sure the result stays between 0-6
	 */
	firstDayOfTheMonth = (firstDayOfTheMonth - weekStartsOn + 7) % 7;

	/**Initialized with a negative value that is equivalent to the number of days
	 *  to subtract from the previous month to reach the first day of the current month.
	 * (how much is missing in the week from the current month) */
	let currentMonthCount = 0 - firstDayOfTheMonth;

	//Generates a 2d array representing 6 weeks and 7 days per week
	const monthGrid = new Array(6).fill([]).map(() => {
		return new Array(7).fill(null).map(() => {
			currentMonthCount++;

			const currentDay = new Date(year, month, currentMonthCount);

			//Displaying only the days of the current month
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
