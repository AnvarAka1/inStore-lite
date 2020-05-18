import { useState } from "react";

const useForm = (
	hasValidity = false,
	options = {
		placeholder: "",
		label: null,
		as: "input",
		type: "text"
	}
) => {
	let validityOptions = {
		required: true,
		minSymbols: 0
	};
	const [ value, setValue ] = useState("");
	const [ isTouched, setIsTouched ] = useState(false);
	const [ isValid, setIsValid ] = useState(!hasValidity ? true : false);
	const [ error, setError ] = useState(null);

	const inputChangeHandler = event => {
		const val = event.target.value;
		setValue(val);
		checkValidity(val);
	};
	const initValue = value => {
		setValue(value);
	};
	const changeValue = value => {
		setValue(value);
		checkValidity(value);
	};
	const clear = () => {
		setValue("");
		setIsTouched(false);
		setIsValid(!hasValidity ? true : false);
	};
	const makeValid = () => {
		setIsValid(true);
		setIsTouched(true);
	};
	const initValidityOptions = (
		options = {
			required: true,
			minSymbols: 0
		}
	) => {
		validityOptions = {
			...validityOptions,
			...options
		};
	};
	//  Validity check
	const touchHandler = () => {
		setIsTouched(true);
		checkValidity(value);
	};
	const checkValidity = targetValue => {
		// if no validity is set or the input is not touched, then return
		// if (!hasValidity || !isTouched) return;
		if (!hasValidity) return;
		const val = targetValue.trim();
		// else check the validity
		const { required, minSymbols } = validityOptions;

		let isValidTemp = true;
		if (required && isValidTemp && val.length === 0) {
			isValidTemp = false;
			setError("This field is required!");
		}
		if (isValidTemp && val.length < minSymbols) {
			isValidTemp = false;
			setError("Minimum symbols " + minSymbols);
		}

		// if no errors
		if (isValidTemp) {
			setError(null);
		}
		setIsValid(isValidTemp);
	};
	return {
		value,
		isValid,
		error,
		isTouched,
		options,
		onChange: inputChangeHandler,
		onInitValue: initValue,
		onChangeValue: changeValue,
		onInitValidityOptions: initValidityOptions,
		onTouch: touchHandler,
		onMakeValid: makeValid,
		clear
	};
};
export default useForm;
