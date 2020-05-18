import React from "react";
import Link from "next/link";

const errorPage = () => {
	return (
		<div>
			<h1>
				404 Error! try{" "}
				<Link href="/">
					<a>going back!</a>
				</Link>
			</h1>
		</div>
	);
};

export default errorPage;
