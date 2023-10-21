interface EventType {
	id: string;
	startDate: string;
	endDate: string;
	type: string;
	name: Array<{
		language: string;
		text: string;
	}>;
	nationwide: boolean;
}
