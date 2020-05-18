import React from "react";
import classes from "./FormGroup.module.scss";
import { Form } from "react-bootstrap";
const formGroup = ({ children, control, size, as, type, placeholder }) => {
	return (
		<Form.Group className="mt-2 mb-2">
			{children && <Form.Label className={size === "sm" && classes.Sm}>{children}</Form.Label>}
			<Form.Control
				value={control.value}
				as={as}
				size={size}
				type={type}
				placeholder={placeholder}
				onChange={control.onChange}
			/>
		</Form.Group>
	);
};
formGroup.defaultProps = {
	placeholder: "",
	as: "input",
	type: "text",
	value: "",
	size: "md",
	onChange: null,
	children: null
};
export default formGroup;
