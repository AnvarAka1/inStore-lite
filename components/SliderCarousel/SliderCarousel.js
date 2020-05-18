import React from "react";
import Carousel from "react-multi-carousel";
import classes from "./SliderCarousel.module.scss";
// import Carousel from "@brainhubeu/react-carousel";
// import Carousel from "react-slick";
const sliderCarousel = ({ className, children, items, arrows = true, autoPlay = false }) => {
	const responsive = {
		superLargeDesktop: {
			// the naming can be any, depends on you.
			breakpoint: { max: 4000, min: 3000 },
			items: items ? (items.xl ? items.xl : 5) : 5
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: items ? (items.lg ? items.lg : 3) : 3
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: items ? (items.sm ? items.sm : 2) : 2
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: items ? (items.xs ? items.xs : 1) : 1
		}
	};

	return (
		<div className={classes.Carousel}>
			<Carousel
				swipeable={true}
				draggable={true}
				arrows={arrows}
				showDots={false}
				// partialVisbile={true}
				responsive={responsive}
				ssr={true} // means to render carousel on server-side.
				infinite={true}
				className="pb-2 pt-2"
				containerClass="carousel-container"
				removeArrowOnDeviceType={[ "tablet", "mobile" ]}
				itemClass={[ classes.Item, className ].join(" ")}
				autoPlay={autoPlay}
				autoPlaySpeed={5000}
				// transitionDuration={300}
				// deviceType={this.props.deviceType}
				customLeftArrow={<CustomArrowLeft />}
				customRightArrow={<CustomArrowRight />}
			>
				{children}
			</Carousel>
		</div>
	);
};
const CustomArrowLeft = ({ onClick }) => {
	return (
		<div onClick={() => onClick()} className={[ classes.Icon, classes.Left ].join(" ")}>
			<img className="icon" src="/images/icons/arrow-left.png" alt="left" />
		</div>
	);
};
const CustomArrowRight = ({ onClick }) => {
	return (
		<div
			onClick={() => onClick()}
			className={[ classes.Icon, classes.Right ].join(" ")}
			aria-label="Go to next slide"
		>
			<img className="icon" src="/images/icons/arrow-right.png" alt="right" />
		</div>
	);
};
export default React.memo(sliderCarousel);
