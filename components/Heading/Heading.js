import React from "react";
import classes from "./Heading.module.scss";
import { Button } from "react-bootstrap";
import Link from "next/link";
const heading = ({ className, children, text, href }) => {
	return (
		<div className={[ className, classes.Heading ].join(" ")}>
			<h3>{children}</h3>
			<h5 className="mb-3 text-normal">{text}</h5>
			<Link href={href}>
				<a>
					<Button>Открыть весь список</Button>
				</a>
			</Link>
		</div>
	);
};

heading.defaultProps = {
	href: "#"
};
export default heading;
