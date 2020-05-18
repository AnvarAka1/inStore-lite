import React, { useState, useEffect } from "react";
import * as actions from "../store/actions";
import { Provider } from "react-redux";
import { useModal } from "../hooks";
import withReduxStore from "../helpers/with-redux-store";
import { CartContext, AuthModalContext } from "../store";
import { Layout } from "../layouts";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-multi-carousel/lib/styles.css";
import "../styles.scss";
import App from "next/app";

const MyComponent = ({ children, store }) => {
	const [ cart, setCart ] = useState([]);
	const authModal = useModal();

	useEffect(() => {
		store.dispatch(actions.authCheckState());
		if (localStorage.getItem("cart")) {
			setCart(JSON.parse(localStorage.getItem("cart")));
		}
	}, []);

	// adds product to cart
	const addRemoveItemFromCart = product => {
		let cartCopy = [ ...cart ];
		// is the product in the cart already?
		const item = cartCopy.find(item => {
			return item.id === product.id;
		});

		// this product is not in the cart. push it to the array
		if (item === undefined) {
			cartCopy.push(product);
		} else {
			// just remove this product from the cart
			cartCopy = cartCopy.filter(item => {
				return item.id !== product.id;
			});
		}
		//  save it
		localStorage.setItem("cart", JSON.stringify(cartCopy));

		setCart(cartCopy);
	};
	const findItemInCart = id => {
		let cartCopy = [ ...cart ];
		const item = cartCopy.find(item => {
			return item.id === id;
		});
		if (item !== undefined) return true;
		return false;
	};
	const clearCartHandler = () => {
		console.log("Cleared");
		setCart([]);
		localStorage.removeItem("cart");
	};

	return (
		<AuthModalContext.Provider value={{ authModal }}>
			<CartContext.Provider
				value={{
					cart,
					onAddRemoveItem: addRemoveItemFromCart,
					onFindInCart: findItemInCart,
					onClearCart: clearCartHandler
				}}
			>
				<Layout cartCount={cart.length}>{children}</Layout>
			</CartContext.Provider>
		</AuthModalContext.Provider>
	);
};
class myApp extends App {
	render() {
		const { Component, pageProps, store } = this.props;
		return (
			<Provider store={store}>
				<MyComponent store={store}>
					<Component {...pageProps} />
				</MyComponent>
			</Provider>
		);
	}
}

export default withReduxStore(myApp);
