import React from "react";
import classes from "./Logo.module.scss";
const logo = ({ alt }) => {
	const logo = [ "/images/logo/logo.png", "/images/logo/logo-alt.png" ];
	return (
		<div className={classes.Logo}>
			<img src={!alt ? logo[0] : logo[1]} alt="logo" className="w-100" />
		</div>
	);
};

export default logo;
