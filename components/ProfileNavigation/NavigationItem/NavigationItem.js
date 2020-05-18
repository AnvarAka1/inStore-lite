import React from "react";
import classes from "./NavigationItem.module.scss";
import { Link } from "../../";
const navigationItem = ({ href, children, icon }) => {
	return (
		<li className={`${classes.NavigationItem} list mt-2`}>
			<Link href={href}>
				<a>
					<div className="d-flex align-items-center">
						<img src={icon} alt={children} className="icon icon-sm mr-2" />
						<p className="text-lg">{children}</p>
					</div>
				</a>
			</Link>
		</li>
	);
};

export default navigationItem;
