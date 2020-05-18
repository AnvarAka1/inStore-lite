import React from "react";
import { Col } from "react-bootstrap";
import Product from "./Product/Product";
const products = ({ items, title, isVideo, md, sm, onAddRemoveItem }) => {
	const productsView = items.map(item => {
		return (
			<Col className="mb-4" key={item.id} md={md} sm={sm}>
				<Product
					{...item}
					isVideo={isVideo}
					onAddRemoveItem={onAddRemoveItem ? () => onAddRemoveItem(item) : null}
				/>
			</Col>
		);
	});
	return (
		<React.Fragment>
			{title && (
				<Col xs={12}>
					<h2>{title}</h2>
				</Col>
			)}
			{productsView}
		</React.Fragment>
	);
};
products.defaultProps = {
	md: 3,
	sm: 4
};
export default products;
