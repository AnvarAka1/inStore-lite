import React from "react";
// import classes from './Link.module.scss';
import Link from "next/link";

import { useRouter } from "next/router";
const CustomLink = ({ children, className, href }) => {
	let hasQueries = true;
	const router = useRouter();
	let classNames = className || "";
	// if the link has the query param like /books/categories/audio-books?genre=1
	if (href.query) {
		// check whether the current route has any queries
		if (!isEmpty(router.query)) {
			// go through all queries in current route
			for (let key in router.query) {
				// chech whether there is a value in link's query
				// check whether there is a match between current route's and link's queries
				if (!href.query[key] || router.query[key] !== href.query[key].toString()) {
					hasQueries = false;
					break;
				}
			}
			// if the pathnames are different, then it is also mismatch
			// else just add active class to link
			if (href.pathname === router.pathname && hasQueries) {
				classNames = `${className} active`;
			}
		}
	} else if (href === router.pathname) {
		classNames = `${className} active`;
	}

	return <Link href={href}>{React.cloneElement(children, { className: classNames })}</Link>;
};
const isEmpty = obj => {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) return false;
	}
	return true;
};
export default CustomLink;
