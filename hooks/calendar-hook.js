import { useState } from "react";
const useCalendar = () => {
	const [ value, setValue ] = useState(new Date());
	const calendarChangeHandler = val => {
		setValue(val);
	};

	return {
		value,
		onChange: calendarChangeHandler
	};
};
export default useCalendar;
