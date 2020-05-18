import React from "react";
import { SliderCarousel } from "../";
import Compilation from "./Compilation/Compilation";
const CompilationsCarousel = ({ items, onClick }) => {
	const compilationsView = items.map(item => {
		return <Compilation key={item.id} onClick={() => onClick(item.id)} {...item} />;
	});
	return <SliderCarousel>{compilationsView}</SliderCarousel>;
};

export default CompilationsCarousel;
