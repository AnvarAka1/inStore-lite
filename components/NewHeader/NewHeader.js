import React from "react";
import Link from "next/link";
const newHeader = ({ children, href }) => {
	return (
		<Link href={href}>
			<a>
				<div className="d-flex align-items-end pb-3">
					<h3 className="mb-0 mr-3 text-normal text-secondary">Новые {children}</h3>
					<p className="mb-0 text-small text-secondary">Перейти в список »</p>
				</div>
			</a>
		</Link>
	);
};

export default newHeader;
