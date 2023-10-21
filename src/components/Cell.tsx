import { getDate, isToday } from "date-fns";
import { cn } from "../utils/utils";
import CellEvent from "./CellEvent";

interface Props {
	day: string | null;
	className?: string;
    events: EventType[] | null
}

const Cell = ({ day, className,events }: Props) => {

	//For days which are not from this month
	if (!day) {
		return <div className={cn(className, "border-t border-slate-300 bg-slate-50")}></div>;
	}

	const isDayToday = isToday(new Date(day));

	return (
		<div
			className={cn(className, "relative border-t border-slate-300 flex flex-col gap-1 min-h-[120px] ")}
		>
			<p
				className={`${
					isDayToday ? "bg-teal-200" : "bg-slate-200"
				} absolute top-1 right-1 rounded-full text-xs min-w-[24px] min-h-[24px] flex justify-center items-center font-medium`}
			>
				{getDate(new Date(day))}
			</p>
            {events && events.length> 0 ? events.map((event) => (
                <CellEvent key={event.id} event={event}/>
            )) : null}
		</div>
	);
};

export default Cell;
