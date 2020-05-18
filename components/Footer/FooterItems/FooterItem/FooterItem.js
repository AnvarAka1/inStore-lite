import React from "react";
import Link from "next/link";
const footerItem = ({ title, link }) => {
	return (
		<li>
			<Link href={link}>
				<a className="text-small text-accent">
					<p className="mb-2 text-underline">{title}</p>
				</a>
			</Link>
		</li>
	);
};

export default footerItem;
