import cookie from "cookie";

export const parseCookies = req => {
	// isServer ? "" : ""
	return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
};

export const categorySelector = (id, categories, _selectedId) => {
	if (id === _selectedId) return null;
	if (_selectedId != -1) {
		categories.forEach(el => {
			if (_selectedId === el.id) {
				el.isActive = false;
			}
		});
	}
	categories.forEach(el => {
		if (el.id === id) {
			el.isActive = true;
		}
	});
	_selectedId = id;
	return {
		_selectedId,
		categories
	};
};
export const convertFrontToBackDate = date => {
	const year = date.substring(0, 4);
	const month = date.substring(5, 7);
	const day = date.substring(8, 10);
	return `${day}-${month}-${year}`;
};
export const convertBackToFrontDate = date => {
	if (!date) {
		return "";
	}
	const year = date.substring(6, 10);
	const month = date.substring(3, 5);
	const day = date.substring(0, 2);
	return `${year}-${month}-${day}`;
};
export const formCheckValidity = (formControls = []) => {
	let isFormValid = true;
	formControls.forEach(c => {
		isFormValid = isFormValid && c.isValid;
	});
	return isFormValid;
};
