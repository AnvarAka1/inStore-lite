import React from "react";
import classes from "./ReviewsCarousel.module.scss";
import Review from "./Review/Review";
import { SliderCarousel } from "../";
const reviewsCarousel = ({ items }) => {
	const reviewsView = items.map(item => {
		return <Review key={item.id} {...item} />;
	});
	return (
		<SliderCarousel arrows={false} autoPlay items={{ xl: 6, lg: 4, sm: 3, xs: 1 }} className={classes.Item}>
			{reviewsView}
		</SliderCarousel>
	);
};

export default reviewsCarousel;
