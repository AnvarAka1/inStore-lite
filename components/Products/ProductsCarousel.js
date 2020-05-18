import React from "react";
import Product from "./Product/Product";
import { SliderCarousel } from "../";

const productsCarousel = ({ items, responsive }) => {
	const resp = {
		xl: responsive ? (responsive.xl ? responsive.xl : 8) : 8,
		lg: responsive ? (responsive.lg ? responsive.lg : 6) : 6,
		sm: responsive ? (responsive.sm ? responsive.sm : 5) : 5,
		xs: responsive ? (responsive.xs ? responsive.xs : 3) : 3
	};
	const productsView = items.map(item => {
		return <Product key={item.id} {...item} />;
	});
	return <SliderCarousel items={resp}>{productsView}</SliderCarousel>;
};

export default React.memo(productsCarousel);
