import React from "react";
import classes from "./AuthModal.module.scss";
import Link from "next/link";
import { Modal, Card } from "../";
import { FormikGroup } from "../UI";
import { Button } from "react-bootstrap";
import InputMask from "react-input-mask";
import { Form, Formik, useFormik } from "formik";
const authModal = ({ modal, login, register, onHide, isSignUp, modeHandler, showInputMask, checkboxControl }) => {
	const titles = [ "Авторизация", "Регистрация" ];
	const texts = [ "У вас еще нет аккаунта? Пройдите ", "У вас имеется аккаунт? " ];
	const actions = [ "Регистрацию", "Войдите" ];
	const text = (
		<p>
			{texts[+isSignUp]}
			<span
				className="text-accent"
				style={{ cursor: "pointer" }}
				onClick={() => modeHandler(isSignUp ? false : true)}
			>
				{actions[+isSignUp]}
			</span>
		</p>
	);

	return (
		<Modal modal={modal} size="lg" onHide={onHide}>
			<Card>
				<Card.Body>
					<div className="d-flex align-items-center ">
						<div className="w-100">
							<h2>{titles[+isSignUp]}</h2>
							{text}

							<Formik>
								<Form onSubmit={login.handleSubmit}>
									<FormikGroup name="name" {...login.getFieldProps("name")} size="sm">
										Ф.И.О
									</FormikGroup>
									<FormikGroup name="email" {...login.getFieldProps("email")} size="sm">
										Эл. почта
									</FormikGroup>
									{showInputMask && (
										<InputMask
											className="form-control form-control-sm mt-3"
											mask="+\9\98 (99) 999-99-99"
											name="phone"
											placeholder="+998 (__) ___-__-__"
											alwaysShowMask={true}
											value={login.getFieldProps("phone").value}
											onChange={login.getFieldProps("phone").onChange}
										/>
									)}
									<FormikGroup name="fPassword" {...login.getFieldProps("fPassword")} size="sm">
										Введите пароль
									</FormikGroup>
									<FormikGroup name="sPassword" {...login.getFieldProps("sPassword")} size="sm">
										Подтвердите пароль
									</FormikGroup>
									{!isSignUp && (
										<FormGroup controlId="formBasicCheckbox">
											<Form.Check
												type="checkbox"
												label="Запомнить пароль"
												value={checkboxControl.value}
												onChange={checkboxControl.onChange}
											/>
										</FormGroup>
									)}

									<Button type="submit" className="float-right">
										{isSignUp ? "Зарегистрироваться" : "Войти"}
									</Button>
									{!isSignUp && (
										<Link href="/">
											<a>Не можете получить доступ?</a>
										</Link>
									)}
								</Form>
							</Formik>
							<Formik>
								<Form onSubmit={login.handleSubmit}>
									<FormikGroup name="name" {...login.getFieldProps("name")} size="sm">
										Ф.И.О
									</FormikGroup>
									<FormikGroup name="email" {...login.getFieldProps("email")} size="sm">
										Эл. почта
									</FormikGroup>
									{showInputMask && (
										<InputMask
											className="form-control form-control-sm mt-3"
											mask="+\9\98 (99) 999-99-99"
											name="phone"
											placeholder="+998 (__) ___-__-__"
											alwaysShowMask={true}
											value={login.getFieldProps("phone").value}
											onChange={login.getFieldProps("phone").onChange}
										/>
									)}
									<FormikGroup name="fPassword" {...login.getFieldProps("fPassword")} size="sm">
										Введите пароль
									</FormikGroup>
									<FormikGroup name="sPassword" {...login.getFieldProps("sPassword")} size="sm">
										Подтвердите пароль
									</FormikGroup>
									{!isSignUp && (
										<FormGroup controlId="formBasicCheckbox">
											<Form.Check
												type="checkbox"
												label="Запомнить пароль"
												value={checkboxControl.value}
												onChange={checkboxControl.onChange}
											/>
										</FormGroup>
									)}

									<Button type="submit" className="float-right">
										{isSignUp ? "Зарегистрироваться" : "Войти"}
									</Button>
									{!isSignUp && (
										<Link href="/">
											<a>Не можете получить доступ?</a>
										</Link>
									)}
								</Form>
							</Formik>
						</div>
						<div className={`${classes.Social} w-100`}>
							<p className="text-small">{isSignUp ? "Регистрация" : "Авторизация"} через:</p>
						</div>
					</div>
				</Card.Body>
			</Card>
		</Modal>
	);
};

export default authModal;
