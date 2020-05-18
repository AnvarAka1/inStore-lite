import React from "react";
import Category from "./Category/Category";
const categories = ({ items, isVideo, isStatic, pathname }) => {
	const categoriesView = items.map(item => {
		return (
			<Category
				key={item.id}
				icon={item.icon}
				id={item.id}
				href={item.link}
				pathname={pathname}
				isStatic={isStatic}
			>
				{item.title}
			</Category>
		);
	});
	return (
		<React.Fragment>
			{!isStatic && (
				<div className="d-flex align-items-center mb-4">
					<img className="icon icon-md" src="/images/icons/janra.png" alt="Жанры" />
					<h5 className="ml-1 mb-0 text-secondary">{!isVideo ? "Жанры" : "Категории"}</h5>
				</div>
			)}
			<ul>{categoriesView}</ul>
			<hr className="mt-4 pb-2" />
		</React.Fragment>
	);
};

export default categories;
