import { getDate, isToday } from "date-fns";
import { cn } from "../utils/utils";

interface Props {
	day: string | null;
	className?: string;
}

const Cell = ({ day, className }: Props) => {

	if (!day) {
		return <div className={cn(className, "border-t border-slate-300 bg-slate-50")}></div>;
	}

    const isDayToday = isToday(new Date(day))

	return (
		<div
			className={cn(className, "relative border-t border-slate-300 flex flex-col min-h-[120px] ")}
		>
			<p className={`${isDayToday ? "bg-teal-200" : "bg-slate-200"} absolute top-1 right-1 rounded-full text-xs min-w-[24px] min-h-[24px] flex justify-center items-center font-medium`}>
				{getDate(new Date(day))}
			</p>
		</div>
	);
};

export default Cell;
