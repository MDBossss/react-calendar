import { Navigate, Route, Routes } from "react-router-dom";
import { format } from "date-fns";
import Home from "./components/pages/Home";

const App = () => {
	const todayUrl = format(new Date(), "yyyy/MM/dd");
  
	return (
		<Routes>
			<Route path="/" element={<Navigate to={todayUrl} />} />
			<Route path="/:year/:month/:day" element={<Home />} />
		</Routes>
	);
};

export default App;
