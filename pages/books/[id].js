import React, { useState, useEffect, useContext } from "react";
import { parseCookies } from "../../helpers/utils";
import axios from "../../axios-api";
import { connect } from "react-redux";
import { useForm } from "../../hooks";
import { CartContext, AuthModalContext } from "../../store";

import { Row, Col } from "react-bootstrap";
import { ProductDetails, ProductDescription, Comments, ProductsCarousel } from "../../components/";

const BookPage = ({ bookProps, isAuthorized }) => {
	const [ book, setBook ] = useState(bookProps);
	const [ rate, setRate ] = useState(0);
	const [ isDescriptionExpanded, setIsDescriptionExpanded ] = useState(false);
	const cartContext = useContext(CartContext);
	const authModalContext = useContext(AuthModalContext);
	const commentControl = useForm();
	useEffect(
		() => {
			setBook(bookProps);
		},
		[ bookProps ]
	);
	const expandDescription = () => {
		setIsDescriptionExpanded(true);
	};
	const commentSubmitHandler = event => {
		event.preventDefault();
		const formData = new FormData();
		formData.append("rate", rate);
		formData.append("text", commentControl.value);
		axios
			.post(`books/${book.id}/feedback`, formData, {
				headers: {
					Authorization: `Bearer ${parseCookies(null).token}`
				}
			})
			.then(res => {
				commentControl.clear;
				return axios.get("books/" + book.id);
			})
			.then(res => {
				setBook(res.data);
			})
			.catch(err => console.log(err));
	};
	const favouriteHandler = () => {
		axios
			.post(`profile/favourites/${book.id}`, null, {
				headers: {
					Authorization: `Bearer ${parseCookies(null).token}`
				}
			})
			.then(res => {
				const bookCopy = {
					...book,
					in_favourites: !book.in_favourites
				};
				setBook(bookCopy);
			})
			.catch(err => {
				console.log(err);
			});
	};
	const rateHandler = id => {
		setRate(id + 1);
	};
	return (
		<Row>
			<Col sm={5}>{<ProductDetails {...book} social={null} />}</Col>
			<Col sm={7}>
				<Row>
					<Col md={10}>
						<ProductDescription
							{...book}
							expandDescription={expandDescription}
							isDescriptionExpanded={isDescriptionExpanded}
							cartClicked={() => cartContext.onAddRemoveItem(book)}
							isInCart={cartContext.onFindInCart(book.id)}
							favouriteClicked={favouriteHandler}
							isAuthorized={isAuthorized}
						/>

						<Comments
							items={book.feedback}
							rate={rate}
							onSubmit={commentSubmitHandler}
							commentControl={commentControl}
							rateClicked={rateHandler}
							onAuth={authModalContext.authModal.onShow}
							isAuthorized={isAuthorized}
						/>
					</Col>
				</Row>
				<h3 className="mt-5">Также вас может заинтересовать</h3>
				<ProductsCarousel items={book.related} responsive={{ lg: 4 }} />
			</Col>
		</Row>
	);
};

export const getServerSideProps = async ({ query, req }) => {
	const token = parseCookies(req).token;
	const res = await axios.get("books/" + query.id, {
		headers: token
			? {
					Authorization: `Bearer ${token}`
				}
			: null
	});
	return {
		props: {
			bookProps: res.data
		}
	};
};
const mapStateToProps = state => {
	return {
		isAuthorized: state.auth.token !== null
	};
};
export default connect(mapStateToProps)(BookPage);
