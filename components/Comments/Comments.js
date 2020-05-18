import React from "react";
import { Form, Button } from "react-bootstrap";

import classes from "./Comments.module.scss";
import Comment from "./Comment/Comment";
import { Stars } from "../";
const comments = ({ items, rate, commentControl, isAuthorized, rateClicked, onSubmit, onAuth }) => {
	const commentsView = items.map(item => <Comment key={item.id} {...item} />);
	return (
		<React.Fragment>
			<h2 className="mt-5 mb-2">Оставить отзыв</h2>
			{isAuthorized ? (
				<Form onSubmit={onSubmit}>
					<Form.Control
						as="textarea"
						value={commentControl.value}
						onChange={commentControl.onChange}
						placeholder="Ваш отзыв"
					/>
					<div className="d-flex justify-content-between align-items-center mt-2">
						<Stars rate={rate} isBig onClick={rateClicked} />
						<Button type="submit" className="text-small">
							Отправить
						</Button>
					</div>
				</Form>
			) : (
				<div className="mt-4">
					Отзыв могут отправить авторизованные пользователи. <br />Пройти {" "}
					<span className="text-accent text-bold" style={{ cursor: "pointer" }} onClick={onAuth}>
						АВТОРИЗАЦИЮ
					</span>
				</div>
			)}

			<h3 className="mt-4">Отзывы</h3>
			{items.length ? (
				<ul className={`${classes.Comments} ${items.length > 20 && classes.BottomBox}`}>{commentsView}</ul>
			) : (
				<p className="text-secondary">Пока нет отзывов</p>
			)}
		</React.Fragment>
	);
};

export default comments;
