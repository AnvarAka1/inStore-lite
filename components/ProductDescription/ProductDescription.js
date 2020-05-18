import React from "react";
import { Button } from "react-bootstrap";
import classes from "./ProductDescription.module.scss";
const MAX_LENGTH = 5;
const productDescription = ({
	publish_year,
	title,
	author,
	book_type,
	description,
	price,
	current_price,
	isInCart,
	cartClicked,
	favouriteClicked,
	in_favourites,
	isAuthorized,
	isDescriptionExpanded,
	expandDescription,
	book_format
}) => {
	const bookTypes = [ "Аудиокнига", "Печатное издание", "Электронная книга" ];
	const getDiscount = () => {
		return ((1 - current_price / price) * 100).toFixed(2);
	};
	let desc = description;
	if (desc.length > MAX_LENGTH) {
		desc = !isDescriptionExpanded ? (
			<React.Fragment>
				{description.substr(0, MAX_LENGTH)}
				<a role="button" className="text-accent ml-2" style={{ cursor: "pointer" }} onClick={expandDescription}>
					Подробнее »
				</a>
			</React.Fragment>
		) : (
			description
		);
	}
	return (
		<div className={classes.ProductDescription}>
			<p>{publish_year}</p>
			<h2>{title}</h2>
			<div className="d-flex justify-content-between align-items-center">
				<h4 className="text-secondary mb-0">{author}</h4>
				<div className="d-flex ml-4">
					{isAuthorized && (
						<Button onClick={favouriteClicked} className="text-small mr-2" variant="secondary">
							<div className="d-flex align-items-center">
								<img src="/images/icons/star.png" className="icon mr-1" />
								{in_favourites ? "Убрать из избранного" : "Избранное"}
							</div>
						</Button>
					)}
					<p className="text-small btn btn-secondary">
						{book_format ? book_format : bookTypes[+book_type - 1]}
					</p>
				</div>
			</div>
			<p className="text-md mt-3">
				<strong>Аннотация к книге "{title}"</strong>
			</p>
			<p className="text-md">{desc}</p>
			<div className="d-flex justify-content-between align-items-end mt-2 mb-4">
				<h2 className="mb-0 text-accent">{current_price} сум</h2>
				<div className="d-flex align-items-end ml-4">
					<div className="text-center">
						<p className="text-crossed text-small text-black">{price} сум</p>
						<p className="btn btn-primary text-small">{getDiscount()}% Скидка</p>
					</div>
					{/* Читать фрагмент */}
					{+book_type === 3 && (
						<Button onClick={null} className="text-small ml-2" variant="secondary">
							Читать фрагмент
						</Button>
					)}
				</div>
			</div>
			<Button onClick={cartClicked} className="w-100">
				<img src="/images/icons/cart-white.png" className="icon icon-sm mr-1" />
				{isInCart ? "Удалить из корзины" : "Добавить в корзину"}
			</Button>
		</div>
	);
};
export default productDescription;
