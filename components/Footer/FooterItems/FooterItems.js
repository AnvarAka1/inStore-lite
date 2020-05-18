import React from "react";
import FooterItem from "./FooterItem/FooterItem";

const footerItems = ({ title, items }) => {
	const footerItemsView = items.map((item, index) => {
		return <FooterItem key={index} title={item.title} link={item.link} />;
	});
	return (
		<div>
			<h6 className="text-accent">{title}</h6>
			<ul>{footerItemsView}</ul>
		</div>
	);
};

export default footerItems;
