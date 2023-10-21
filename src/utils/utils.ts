import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function fetchEvents(year: number) {
	const response = await axios.get(
		`https://openholidaysapi.org/PublicHolidays?countryIsoCode=HR&languageIsoCode=HR&validFrom=${year}-01-01&validTo=${year}-12-31`
	);
	const events: EventType[] = response.data;

	const processedEvents: Record<string, EventType[]> = {};

	events.forEach((event) => {
		const date = event.startDate;

		if (!processedEvents[date]) {
			processedEvents[date] = [];
		}

		processedEvents[date].push(event);
	});

	return processedEvents;
}
