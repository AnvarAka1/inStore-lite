import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import {cities, districts} from '../../../lib/locations'
import { parseCookies } from "../../../helpers/utils";
import axios from "../../../axios-api";
import { Form, Formik, useFormik } from "formik";
import {  object, string } from "yup";
import { FormikGroup } from "../../../components/UI";
import { Card } from "../../../components";
import { Row, Col, Button } from "react-bootstrap";
import { CartLayout } from "../../../layouts";
const OrderPage = props => {
	const [showInputMask, setShowInputMask] = useState(false);
	const formik = useFormik({
		initialValues: {
			phone: props.profile?.phone || "",
			lastName: props.profile?.fio || "",
			firstName: props.profile?.fio || "",
			email: props.profile?.email || "",
			city: "",
			district: "",
			street: "",
			house: "",
			address: "",
			comment: ""
		},
		validationSchema: object({
			phone: string()
				.min(2, "Имя должно содержать минимум 2 буквы")
				.max(100, "Name is too long")
				.required("Name is required!"),

			lastName: string().required("*Email is required"),
			street: string()
		}),

		onSubmit: values => {
			alert(JSON.stringify(values, null, 2));
			console.log("Hey!");
		}
	});
	useEffect(() => {
		setShowInputMask(true);
	}, []);
	return (
	<Formik>
			<Form onSubmit={formik.handleSubmit}>
				<CartLayout isOrderPage>
						<Row>
							<Col>
								<h2>Оформить заказ</h2>
							</Col>
						</Row>

						<Row>
							<Col md={6}>
								<Card className="mb-3">
									<Card.Header>Номера телефона*</Card.Header>
									<Card.Body>
										{showInputMask && <InputMask
													className="form-control form-control-sm mt-3"
													mask="+\9\98 (99) 999-99-99"
													name="phone"
													placeholder="+998 (__) ___-__-__"
													alwaysShowMask={true}
													value={formik.getFieldProps("phone").value}
													onChange={formik.getFieldProps("phone").onChange}
												/>}
									</Card.Body>
								</Card>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<Card>
									<Card.Header>КОНТАКТНАЯ ИНФОРМАЦИЯ</Card.Header>
									<Card.Body>
										<FormikGroup name="lastName" {...formik.getFieldProps("lastName")} size="sm">
											Фамилия*
										</FormikGroup>
										<FormikGroup name="firstName" {...formik.getFieldProps("firstName")} size="sm">
											Имя*
										</FormikGroup>
										<FormikGroup name="email" {...formik.getFieldProps("email")} size="sm">
											Эл. почта (для получения эл. версии)
										</FormikGroup>
									</Card.Body>
								</Card>
								<Card className="mt-3">
									<Card.Header>СПОСОБ ОПЛАТЫ</Card.Header>
									<Card.Body>
										<div>
											<Button>НАЛИЧНЫЕ ДЕНЬГИ</Button>
											<Button>ПЛАСТИКОВАЯ КАРТА</Button>
										</div>
										<h6>Платежные системы</h6>
										<ul className="flex-columns">
											{getImages().map((image, index) => {
												return (
													<li key={index}>
														<img src={image} alt="payment" />
													</li>
												);
											})}
										</ul>
									</Card.Body>
								</Card>
							</Col>
							<Col md={6}>
								<Card>
									<Card.Header>АДРЕС ДОСТАВКИ</Card.Header>
									<Card.Body>
										<FormikGroup
											name="city"
											as="select"
											options={null}
											{...formik.getFieldProps("city")}
											size="sm"
											options={cities()}
										>
											Выберите город*
										</FormikGroup>
										<FormikGroup
											name="district"
											as="select"
											options={null}
											{...formik.getFieldProps("district")}
											size="sm"
											options={districts()}
										>
											Выберите район*
										</FormikGroup>
										<FormikGroup name="street" {...formik.getFieldProps("street")} size="sm">
											Улица*
										</FormikGroup>
										<FormikGroup name="house" {...formik.getFieldProps("house")} size="sm">
											Номер дома*
										</FormikGroup>
										<FormikGroup name="address" {...formik.getFieldProps("address")} size="sm">
											Указать в формате КВАРТАЛ-ДОМ-КВАРТИРА
										</FormikGroup>
									</Card.Body>
								</Card>
								<Card className="mt-3">
									<Card.Header>Оставьте комментарии</Card.Header>
									<Card.Body>
										<FormikGroup
											name="comment"
											as="textarea"
											placeholder="Ориентир, дополнительный номер и т.д"
											{...formik.getFieldProps("comment")}
											size="sm"
										>
											Комментарий
										</FormikGroup>
									</Card.Body>
								</Card>
							</Col>
							</Row>
				</CartLayout>
			</Form>
			</Formik>
	);
};
const getImages = () => [
	"/images/payment/payme.png",
	"/images/payment/uzcard.png",
	"/images/payment/click.png",
	"/images/payment/humo.png",
	"/images/payment/visa.png",
	"/images/payment/paynet.png"
];
export const getServerSideProps = async context => {
	let profile = null;
	const token = parseCookies(context.req).token;
	if (token) {
		profile = await axios.get("profile", {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		profile = profile.data;
	}
	return {
		props: {
			profile
		}
	};
};
export default OrderPage;
