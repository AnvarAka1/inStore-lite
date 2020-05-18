import React from "react";
import classes from "./Card.module.scss";
const body = ({ children, className }) => {
	return <div className={`${classes.Body} ${className}`}>{children}</div>;
};

export default body;
