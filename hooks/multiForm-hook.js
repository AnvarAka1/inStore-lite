import { useState } from "react";
const useMultiForm = () => {
	const [ controls, setControls ] = useState([]);

	const initControls = items => {
		const array = items.map(item => {
			return {
				id: item.id,
				value: item.value !== null ? item.value : ""
			};
		});
		setControls(array);
	};
	const getValue = id => {
		return controls.find(control => {
			return control.id === id;
		});
	};
	const inputChangeHandler = (event, id) => {
		const value = event.target.value;
		let array = [ ...controls ];
		const index = array.findIndex(control => {
			return control.id === id;
		});
		array[index] = {
			...array[index],
			value: value
		};
		setControls(array);
	};
	// const setDefaultValues = (items) => {
	// 	const array = controls.map((control, index) => {
	// 		return {
	// 			...control,
	// 			id: ,
	// 			value: values[index]
	// 		};
	// 	});
	// 	setControls(array);
	// };
	return {
		controls,
		onGetValue: getValue,
		onInit: initControls,
		onChange: inputChangeHandler
		// onSetValues: setDefaultValues
	};
};
export default useMultiForm;
