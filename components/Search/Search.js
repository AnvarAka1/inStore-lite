import React from "react";
import classes from "./Search.module.scss";
import { Form } from "react-bootstrap";
const search = ({ control, onSearch }) => {
	return (
		<Form onSubmit={onSearch} className={classes.Form}>
			<div className="position-relative">
				<button className={classes.Button}>
					<img src="/images/icons/search.png" className="icon" />
				</button>

				<Form.Control value={control.value} onChange={control.onChange} placeholder="Поиск" />
			</div>
		</Form>
	);
};

export default search;
