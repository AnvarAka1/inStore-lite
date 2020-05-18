import React from "react";
import classes from "./Card.module.scss";
const header = ({ children, className }) => {
	return <h5 className={`${classes.Header} ${className} text-secondary`}>{children}</h5>;
};

export default header;
