import { useState } from "react";
const useModal = (initialState = false, initialLoading = false) => {
	const [ show, setShow ] = useState(initialState);
	const [ loading, setLoading ] = useState(initialLoading);

	const modalHideHandler = () => {
		setShow(false);
	};
	const modalShowHandler = () => {
		setShow(true);
	};
	const modalToggleHandler = () => {
		setShow(!show);
	};
	const changeLoading = condition => {
		setLoading(condition);
	};
	return {
		show,
		loading,
		onToggle: modalToggleHandler,
		onHide: modalHideHandler,
		onShow: modalShowHandler,
		onChangeLoading: changeLoading
	};
};
export default useModal;
