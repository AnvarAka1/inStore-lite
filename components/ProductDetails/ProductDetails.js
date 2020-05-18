import React from "react";
import classes from "./ProductDetails.module.scss";
import { Stars } from "../../components";
const productDetails = props => {
	const rows = [
		[ "ID товара: ", props.book_id ],
		[ "ISBN: ", props.isbn ],
		[ "Страниц: ", props.page_count ],
		[ "Оформление: ", props.formalization ],
		[ "Иллюстрации: ", props.illustration ],
		[ "Масса: ", props.mass ],
		[ "Размеры: ", props.size ],
		[ "Подробнее: ", props.link ]
	];
	return (
		<div className={classes.ProductDetails}>
			<div>
				<img src={props.image} alt={props.title} />
			</div>
			<div className="d-flex align-items-center mt-4 mb-4">
				<h4 className="mb-0 mr-3">Рейтинг книги</h4>
				<Stars rate={Math.round(props.rate)} isBig />
			</div>

			<table>
				<thead />
				<tbody>
					{rows.map((row, index) => {
						return (
							<tr key={index}>
								<td>{row[0]}</td>
								<td>{row[1]}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className="d-flex justify-content-start mt-5">
				<h5>Поделиться:</h5>
				<ul className="d-flex justify-content-between">
					{getSocials().map(social => (
						<li key={social.id} className="ml-3">
							<a href={social.href} target="_blank" rel="noopener noreferrer">
								<img src={social.image} alt="social" className="icon icon-md" />
							</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
const getSocials = () => [
	{
		id: 0,
		href: "https://facebook.com/",
		image: "/images/icons/social/fb.png"
	},
	{
		id: 1,
		href: "https://ok.ru/",
		image: "/images/icons/social/ok.png"
	},
	{
		id: 2,
		href: "https://vk.com/",
		image: "/images/icons/social/vk.png"
	},
	{
		id: 3,
		href: "https://twitter.com/",
		image: "/images/icons/social/twitter.png"
	}
];
export default productDetails;
