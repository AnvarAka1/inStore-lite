import { useState } from "react";
const useSearch = () => {
	const [ value, setValue ] = useState("");
	const [ isOpen, setIsOpen ] = useState(false);
	const [ filters, setFilters ] = useState([]);
	const [ selectedFilters, setSelectedFilters ] = useState([]);

	const inputChangeHandler = event => {
		setValue(event.target.value);
	};
	const initValue = value => {
		setValue(value);
	};
	const openToggle = () => {
		setIsOpen(!isOpen);
	};
	const initFilters = filters => {
		setFilters(filters);
	};

	const filterHandler = id => {
		const filtersCopy = [ ...filters ];
		const selectedFiltersCopy = [ ...selectedFilters ];
		const alreadySelectedFilter = selectedFiltersCopy.find(f => {
			return f.id === id;
		});
		if (alreadySelectedFilter) {
			return;
		}

		const filter = filtersCopy.find(f => {
			return f.id === id;
		});

		selectedFiltersCopy.push(filter);
		setSelectedFilters(selectedFiltersCopy);
	};
	const removeSelectedFilterHandler = id => {
		const selectedFiltersCopy = [ ...selectedFilters ];
		const updatedSelectedFilters = selectedFiltersCopy.filter(f => {
			return f.id !== id;
		});
		setSelectedFilters(updatedSelectedFilters);
	};
	return {
		value,
		filters,
		selectedFilters,
		isOpen,
		onChange: inputChangeHandler,
		onInitValue: initValue,
		openToggle,
		initFilters,
		onClickFilter: filterHandler,
		onRemoveFilter: removeSelectedFilterHandler
	};
};
export default useSearch;
