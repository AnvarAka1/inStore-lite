import React from "react";
import { Button } from "react-bootstrap";
import { Stars } from "../../";
import classes from "./Product.module.scss";
import Link from "next/link";
const product = ({ id, image, title, author, rate, current_price, price, isVideo, onAddRemoveItem }) => {
	return (
		<React.Fragment>
			<div className={classes.Product}>
				<Link href={`/${isVideo ? "videos" : "books"}/[id]`} as={`/${isVideo ? "videos" : "books"}/${id}`}>
					<a>
						<div className={classes.Image}>
							<img src={image} alt={title} />
						</div>
					</a>
				</Link>
				<Link href={`/${isVideo ? "videos" : "books"}/[id]`} as={`/${isVideo ? "videos" : "books"}/${id}`}>
					<a>
						<h5 className="text-black mb-1">{title}</h5>
						<p className="text-small">{author}</p>
						<Stars rate={Math.round(rate)} />
					</a>
				</Link>
				<Link href={`/${isVideo ? "videos" : "books"}/[id]`} as={`/${isVideo ? "videos" : "books"}/${id}`}>
					<a>
						<div className="d-flex align-items-end mt-1">
							<p className="text-danger text-bold mb-0 mr-1 text-md">{current_price}</p>{" "}
							<p className="text-xsmall text-crossed">{price}</p>
						</div>
					</a>
				</Link>
			</div>
			{onAddRemoveItem && (
				<Button onClick={onAddRemoveItem} className="mt-2">
					Удалить из корзины
				</Button>
			)}
		</React.Fragment>
	);
};

export default React.memo(product);
