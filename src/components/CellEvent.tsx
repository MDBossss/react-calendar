import { useRef, useState } from "react";
import useClickOutside from "./hooks/useClickOutside";
import { BanIcon, CheckIcon, XIcon } from "lucide-react";

interface Props {
	event: EventType;
}

const CellEvent = ({ event }: Props) => {
	const ref = useRef<HTMLDivElement>(null);
	const [isModalOpen, setIsModalOpen] = useState<boolean>();

	useClickOutside(ref, () => setIsModalOpen(false));

	return (
		<>
			{isModalOpen && (
				<div className="fixed w-screen h-screen top-0 left-0 z-[9999] flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm  transition-all overflow-y-auto">
					<div
						ref={ref}
						className="absolute mx-5 w-full md:max-w-[380px] bg-white border border-slate-300 rounded-lg flex flex-col gap-5 p-5 z-50 justify-center"
					>
						<div className="flex gap-5 justify-between">
							<h2 className="font-bold text-xl">Event details</h2>
							<XIcon
								className=" w-6 h-6 cursor-pointer text-slate-300 hover:text-red-500 transition-all"
								onClick={() => setIsModalOpen(false)}
							/>
						</div>
						<div className="grid gap-4 py-4">
							<div className="grid items-center grid-cols-3 gap-4">
								<h4 className="text-right font-medium">Name</h4>
								<p className="col-span-2">{event.name[0].text}</p>
							</div>
							<div className="grid items-center grid-cols-3 gap-4">
								<h4 className="text-right font-medium">Date</h4>
								<p className="col-span-2">
									{new Date(event.startDate).toLocaleDateString(undefined, {
										day: "numeric",
										month: "long",
										year: "numeric",
									})}
								</p>
							</div>
							<div className="grid items-center grid-cols-3 gap-4">
								<h4 className="text-right font-medium">Nationwide</h4>
								<p className="col-span-2">
									{event.nationwide ? (
										<CheckIcon className="w-6 h-6 text-green-500" />
									) : (
										<BanIcon className="w-6 h-6 text-red-500" />
									)}
								</p>
							</div>
						</div>
					</div>
				</div>
			)}

			<div
				className="bg-teal-600 rounded-sm p-2 text-xs md:text-base cursor-pointer transition-all hover:shadow-md hover:scale-105"
				onClick={() => setIsModalOpen(true)}
			>
				{event.name[0].text}
			</div>
		</>
	);
};

export default CellEvent;
