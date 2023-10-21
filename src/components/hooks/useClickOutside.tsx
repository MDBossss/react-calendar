import { useEffect, RefObject } from "react";

const useClickOutside = (ref: RefObject<HTMLElement>, callback: () => void) => {
	useEffect(() => {
		const handleClickOutside = (event: Event) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("touchstart", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("touchstart", handleClickOutside);
		};
	}, [ref, callback]);
};

export default useClickOutside;