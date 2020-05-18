import React from "react";
import classes from "./Card.module.scss";
import Header from "./Header";
import Body from "./Body";
const card = ({ children, className }) => {
	return <div className={`${classes.Card} ${className}`}>{children}</div>;
};
card.Header = Header;
card.Body = Body;

export default card;
