import { useState } from "react";

const useTable = (isLoading = false) => {
	const [ selectedRows, setSelectedRows ] = useState([]);
	// const [ rowNumbers, setRowNumbers ] = useState([]);
	const [ loading, setLoading ] = useState(isLoading);
	const rowHandler = (row, isSelected, e) => {
		let array = [ ...selectedRows ];
		if (isSelected) {
			if (isInArray(row)) return;
			array.push(row.id);
		} else {
			array = array.filter(el => {
				return el !== row.id;
			});
		}
		setSelectedRows(array);
	};
	const rowsHandler = (isSelected, rows) => {
		let array = [];
		if (isSelected) {
			for (let row of rows) {
				array.push(row.id);
			}
		}
		setSelectedRows(array);
	};
	const loadingChange = loading => {
		setLoading(loading);
	};
	const clearSelectedRows = () => {
		setSelectedRows([]);
	};
	const isInArray = element => {
		return selectedRows.find(selectedRow => {
			return selectedRow === element.id;
		});
	};

	return {
		selectedRows,
		loading,
		onSelect: rowHandler,
		onSelectAll: rowsHandler,
		onLoading: loadingChange,
		onClearRows: clearSelectedRows
	};
};

export default useTable;
