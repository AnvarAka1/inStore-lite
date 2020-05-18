import React from "react";
import classes from "./TopImage.module.scss";
import Link from "next/link";
const topImage = ({ title, img, link }) => {
	return (
		<Link href={link}>
			<a>
				<div className={classes.TopImage}>
					<img
						className="d-block w-100"
						src="/images/main/books/carousel1.png"
						alt="Электронные книги и Видео уроки"
					/>
					<div>
						<h3>Электронные книги и Видео уроки</h3>
					</div>
				</div>
			</a>
		</Link>
	);
};

export default topImage;
