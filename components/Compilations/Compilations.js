import React from "react";
import Compilation from "./Compilation/Compilation";
import { Col } from "react-bootstrap";
const compilations = ({ items }) => {
	const compilationsView = items.map(item => {
		return (
			<Col md={4} sm={6} key={item.id}>
				<Compilation {...item} />
			</Col>
		);
	});
	return <React.Fragment>{compilationsView}</React.Fragment>;
};

export default compilations;
