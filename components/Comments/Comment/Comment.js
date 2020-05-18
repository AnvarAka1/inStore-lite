import React from "react";
import classes from "./Comment.module.scss";
import { Stars } from "../../";
const comment = ({ id, user, rate, text, created_at }) => {
	return (
		<li className={classes.Comment}>
			<div className="d-flex align-items-end mb-1">
				<p className="mb-0 text-small text-bold text-black mr-2">{user.fio}</p>
				<Stars rate={rate} />
			</div>
			<p className="text-small mb-4">{text}</p>
			<p className="text-small">{created_at}</p>
		</li>
	);
};

export default comment;
