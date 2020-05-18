import { useState } from "react";

const useSelect = () => {
	const [ value, setValue ] = useState("");
	const [ options, setOptions ] = useState([]);

	const inputChangeHandler = event => {
		setValue(event.target.value);
	};
	const initValue = value => {
		setValue(value);
	};
	const initOptions = opts => {
		setOptions(opts);
	};
	return {
		value,
		options,
		onChange: inputChangeHandler,
		onInitValue: initValue,
		onInitOptions: initOptions
	};
};

export default useSelect;
