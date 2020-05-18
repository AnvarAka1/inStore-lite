import React from "react";
import classes from "./FormGroup.module.scss";
import { ErrorMessage } from "formik";
import { Form } from "react-bootstrap";
const formikGroup = ({
	children,
	onChange,
	value,
	size,
	as,
	type,
	name,
	placeholder,
	options,
	autoComplete,
	disabled
}) => {
	return (
		<Form.Group className="mt-2 mb-2">
			{children && <Form.Label className={size === "sm" && classes.Sm}>{children}</Form.Label>}
			<Form.Control
				value={value}
				type={type}
				autoComplete={autoComplete}
				name={name}
				disabled={disabled}
				placeholder={placeholder}
				onChange={onChange}
				className={size === "sm" && classes.Sm}
				as={as}
			>
				{options ? (
					options.map((option, index) => {
						return (
							<option key={index} value={option.value ? option.value : option.title}>
								{option.title}
							</option>
						);
					})
				) : null}
			</Form.Control>
			<span className="text-danger text-small">
				<ErrorMessage name={name} />
			</span>
		</Form.Group>
	);
};
formikGroup.defaultProps = {
	value: "",
	type: "text",
	name: "",
	placeholder: "",
	onChange: null,
	className: "",
	disabled: false
};
export default formikGroup;
