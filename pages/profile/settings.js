import React, { useEffect, useRef } from "react";
import { convertFrontToBackDate, convertBackToFrontDate, parseCookies } from "../../helpers/utils";
import axios from "../../axios-api";
import { Button, Row, Col } from "react-bootstrap";
import { FormikGroup } from "../../components/UI";
import { Form, Formik } from "formik";
import { object, string, date } from "yup";
import { ProfileLayout } from "../../layouts";
// can make static page also
const SettingsPage = ({ userData }) => {
	let personalInfoInitialValues = {
		name: userData.fio,
		dob: convertBackToFrontDate(userData.dob),
		gender: userData.gender ? userData.gender : "m",
		phone: userData.phone
	};
	let passwordInitialValues = {
		curPassword: "",
		newPassword: "",
		repPassword: ""
	};

	const updatePersonalInformationHandler = values => {
		const formData = new FormData();
		formData.append("fio", values.name);
		const dob = convertFrontToBackDate(values.dob);
		formData.append("dob", dob);
		formData.append("gender", values.gender);
		formData.append("phone", values.phone);
		formData.append("avatar", values.phone);

		return axios.patch("profile/", formData, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
		});
	};
	const updatePasswordHandler = () => {
		const formData = new FormData();
		formData.append("old_password", values.curPassword);
		formData.append("new_password", values.newPassword);

		return axios.put("profile/password", formData, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
		});
	};

	return (
		<ProfileLayout>
			<Row>
				<Col sm={12}>
					<h2>Настройки</h2>
					<p className="mb-5">ID пользователя: {userData.id}</p>
				</Col>
			</Row>
			<Row>
				<Col md={4} sm={6}>
					<h6 className="text-md">Персональные данные</h6>
					<Formik
						initialValues={personalInfoInitialValues}
						onSubmit={(values, { setSubmitting }) => {
							setSubmitting(true);
							updatePersonalInformationHandler(values)
								.then(res => {
									console.log(res);
								})
								.catch(err => console.log(err))
								.finally(() => {
									setSubmitting(false);
								});
						}}
						validationSchema={object({
							name: string()
								.min(2, "Имя должно содержать минимум 2 буквы")
								.max(100, "Name is too long")
								.required("Name is required!"),
							dob: date().required(),
							gender: string().required(),
							phone: string()
						})}
					>
						{({ values, handleChange, handleSubmit, isSubmitting, isValidating }) => (
							<Form onSubmit={handleSubmit}>
								<FormikGroup name="name" onChange={handleChange} value={values.name} size="sm">
									Ф.И.О
								</FormikGroup>
								{/* <ErrorMessage name="name" /> */}
								<FormikGroup
									name="dob"
									onChange={handleChange}
									value={values.dob}
									type="date"
									size="sm"
								>
									Дата рождения
								</FormikGroup>
								<FormikGroup
									name="gender"
									onChange={handleChange}
									value={values.gender}
									as="select"
									size="sm"
									options={[ { value: "m", title: "Мужчина" }, { value: "f", title: "Женщина" } ]}
								>
									Ваш пол
								</FormikGroup>
								<FormikGroup name="phone" onChange={handleChange} value={values.phone} size="sm">
									Номер телефона
								</FormikGroup>
								<Button type="submit" disabled={isSubmitting || isValidating}>
									Сохранить
								</Button>
							</Form>
						)}
						{/* avatar */}
					</Formik>
				</Col>
				<Col md={4} sm={6}>
					<h6 className="text-md">Защита</h6>
					<Formik
						initialValues={passwordInitialValues}
						onSubmit={(values, { setSubmitting, resetForm }) => {
							setSubmitting(true);
							updatePasswordHandler(values)
								.then(res => {
									console.log(res);
								})
								.catch(err => console.log(err))
								.finally(() => {
									setSubmitting(false);
								});
						}}
						validationSchema={object({
							email: string().email(),
							curPassword: string().min(8).max(20),
							newPassword: string().min(8).max(20),
							repPassword: string().min(8).max(20)
						})}
					>
						{({ values, handleChange, handleSubmit, isSubmitting, isValidating }) => (
							<Form onSubmit={handleSubmit}>
								<FormikGroup
									name="email"
									onChange={null}
									autoComplete="username"
									value={userData.email}
									type="email"
									size="sm"
									disabled
								>
									Эл. почта
								</FormikGroup>
								<FormikGroup
									name="curPassword"
									type="password"
									autoComplete="current-password"
									onChange={handleChange}
									value={values.curPassword}
									size="sm"
								>
									Текущий пароль
								</FormikGroup>
								<FormikGroup
									name="newPassword"
									type="password"
									autoComplete="new-password"
									onChange={handleChange}
									value={values.newPassword}
									size="sm"
								>
									Новый пароль
								</FormikGroup>
								<FormikGroup
									name="repPassword"
									type="password"
									autoComplete="new-password"
									onChange={handleChange}
									value={values.repPassword}
									size="sm"
								>
									Подтвердите пароль
								</FormikGroup>

								<Button type="submit" disabled={isSubmitting || isValidating}>
									Сохранить
								</Button>
							</Form>
						)}
						{/* avatar */}
					</Formik>
				</Col>
			</Row>
		</ProfileLayout>
	);
};

export const getServerSideProps = async ({ req }) => {
	const res = await axios.get("/profile", {
		headers: {
			Authorization: `Bearer ${parseCookies(req).token}`
		}
	});
	const userData = res.data;
	return {
		props: {
			userData
		}
	};
};
export default SettingsPage;
