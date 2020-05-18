import React, { useState, useEffect, useContext } from "react";
import Router from "next/router";
import { useForm } from "../hooks";
import { CartContext } from "../store";
import { Row, Col } from "react-bootstrap";
import { MakeOrder } from "../components";

const CartLayout = ({ children, isOrderPage }) => {
	const [ currentPrice, setCurrentPrice ] = useState(0);
	const [ oldPrice, setOldPrice ] = useState(0);
	const cartContext = useContext(CartContext);
	const codeControl = useForm();
	useEffect(
		() => {
			const oldPrice = cartContext.cart.reduce((sum, product) => {
				return sum + +product.price;
			}, 0);
			const currentPrice = cartContext.cart.reduce((sum, product) => {
				return sum + +product.current_price;
			}, 0);
			setOldPrice(oldPrice);
			setCurrentPrice(currentPrice);
		},
		[ cartContext ]
	);
	const orderHandler = () => {
		if (isOrderPage) {
			console.log("Order is done!");
		} else {
			Router.push({
				pathname: "/cart/order"
			});
		}
	};

	return (
		<Row>
			<Col md={9}>{children}</Col>
			<Col md={3}>
				<MakeOrder
					isValidCode={true}
					currentPrice={currentPrice}
					oldPrice={oldPrice}
					productCount={cartContext.cart.length}
					codeControl={codeControl}
					ordered={orderHandler}
				/>
			</Col>
		</Row>
	);
};

export default CartLayout;
