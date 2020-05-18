import React from "react";
import classes from "./Footer.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import { Logo } from "../";
import FooterItems from "./FooterItems/FooterItems";
const footer = () => {
	return (
		<footer className={`${classes.Footer} text-left`}>
			<Container>
				<Row>
					<Col sm={4}>
						<Logo />
					</Col>
				</Row>
				<Row className="pt-4 pb-4">
					<Col sm={5}>
						<div className="d-flex justify-content-between align-items-start">
							<div className="w-50 mr-5">
								<p className="mb-2 text-small text-bold">+998 90 000 00 00</p>
								<p className="mb-2 text-small text-bold">+998 90 000 00 00</p>
								<p className="mb-2 text-small">Служба поддержки</p>

								<div className={classes.Social}>
									<h6 className="text-accent mt-5">Мы в социальных сетях</h6>
									<ul>
										{getSocial().map((social, index) => {
											return (
												<li key={index}>
													<div>
														<img src={social} alt="social" />
													</div>
												</li>
											);
										})}
									</ul>
								</div>
							</div>

							<div>
								<h6 className="text-accent">Оплата</h6>
								<ul className="flex-columns">
									{getImages().map((image, index) => {
										return (
											<li key={index}>
												<img src={image} alt="payment" />
											</li>
										);
									})}
								</ul>
							</div>
						</div>
					</Col>
					<Col sm={{ span: 7 }}>
						<div className="d-flex justify-content-between align-items-start w-100">
							{getItems().map(item => {
								return <FooterItems key={item.title} title={item.title} items={item.items} />;
							})}
						</div>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};
const getSocial = () => [
	"/images/social/fb.png",
	"/images/social/instagram.png",
	"/images/social/tg.png",
	"/images/social/twitter.png"
];
const getImages = () => [
	"/images/payment/payme.png",
	"/images/payment/uzcard.png",
	"/images/payment/click.png",
	"/images/payment/humo.png",
	"/images/payment/visa.png",
	"/images/payment/paynet.png"
];
const getItems = () => [
	{
		title: "О нас",
		items: [
			{
				title: "Часто задаваемые вопросы",
				link: "/"
			},
			{
				title: "Помощь",
				link: "/"
			},
			{
				title: "Правила и условия",
				link: "/"
			},
			{
				title: "Электронный билет",
				link: "/"
			},
			{
				title: "Возврат и обмен",
				link: "/"
			},
			{
				title: "Политика конфиденциальности",
				link: "/"
			}
		]
	},
	{
		title: "Сотрудничество",
		items: [
			{
				title: "Издательствам",
				link: "/"
			},
			{
				title: "Авторам",
				link: "/"
			},
			{
				title: "Библиотекам",
				link: "/"
			},
			{
				title: "Партнёрам",
				link: "/"
			},
			{
				title: "Стать спикером",
				link: "/"
			}
		]
	},
	{
		title: "Что почитать?",
		items: [
			{
				title: "Бестселлеры",
				link: "/"
			},
			{
				title: "Скоро в продаже",
				link: "/"
			},
			{
				title: "Публичная оферта",
				link: "/"
			},
			{
				title: "Конфиденциальность",
				link: "/"
			}
		]
	}
];
export default React.memo(footer);
