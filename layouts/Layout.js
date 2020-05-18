import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import { getStaticCategories } from "../lib/categories";
import Head from "next/head";
import { AuthModalContext } from "../store";
import Router from "next/router";
import { useForm } from "../hooks/";
import { Container } from "react-bootstrap";
import { Form, Formik, useFormik } from "formik";
import { string, object } from "yup";
import { AuthModal, NavItems, Navbar, Footer, Search } from "../components/";

const Layout = ({ children, cartCount, onAuth, onLogout, isAuthorized, name }) => {
	const [ isSignUp, setIsSignUp ] = useState(true);
	const [ showInputMask, setShowInputMask ] = useState(false);
	const formikRegister = useFormik({
		initialValues: {
			name: "",
			email: "",
			phone: "",
			fPassword: "",
			sPassword: ""
		},
		validationSchema: object({
			name: string().min(2).required(),
			email: string().email().min(4).required(),
			phone: string().min(9).max(9).required(),
			fPassword: string().min(6).max(20).required(),
			sPassword: string().min(6).max(20).required()
		}),
		onSubmit: values => {
			onAuth(values.name, values.email, values.phone, values.fPassword, isSignUp);
		}
	});
	const formikLogin = useFormik({
		initialValues: {
			emailPhone: "",
			password: "",
			checkbox: ""
		},
		validationSchema: object({
			emailPhone: string().min(2).required(),
			password: string().email().min(4).required(),
			checkbox: string().min(9).max(9).required()
		}),
		onSubmit: values => {
			onAuth(null, values.emailPhone, null, values.password, isSignUp);
		}
	});
	const authModalContext = useContext(AuthModalContext);
	const checkboxControl = useForm();
	const searchControl = useForm();
	useEffect(() => {
		setShowInputMask(true);
	}, []);
	const modeHandler = mode => {
		setIsSignUp(mode);
	};
	const authHandler = event => {
		event.preventDefault();
		onAuth(
			nameControl.value,
			isSignUp ? emailControl.value : emailPhoneControl.value,
			phoneControl.value,
			isSignUp ? fPasswordControl.value : passwordControl.value,
			isSignUp
		);
		console.log("Auth submitted!");
	};
	const onSearch = event => {
		event.preventDefault();
		searchControl.clear();
		Router.push(`/search?q=${encodeURI(searchControl.value)}`);
	};
	const search = <Search control={searchControl} onSearch={onSearch} />;
	// Right side of navbar with cart, login/logout
	const navItems = (
		<NavItems
			name={name}
			authModalShow={authModalContext.authModal.onShow}
			cartCount={cartCount}
			isAuthorized={isAuthorized}
			onLogout={onLogout}
		/>
	);
	return (
		<div>
			<AuthModal
				showInputMask={showInputMask}
				login={formikLogin}
				register={formikRegister}
				isSignUp={isSignUp}
				modal={authModalContext.authModal}
				submitted={authHandler}
				modeHandler={modeHandler}
				checkboxControl={checkboxControl}
			/>
			<Head>
				<title>InStore | Библиотека книг и видеоуроков</title>
			</Head>
			<Navbar
				name={name}
				isAuthorized={isAuthorized}
				cartCount={cartCount}
				search={search}
				booksCategories={getStaticCategories()}
				navItems={navItems}
			/>
			<main className="pt-4 page">
				<Container>{children}</Container>
			</main>
			<Footer />
		</div>
	);
};
const mapStateToProps = state => {
	return {
		isAuthorized: state.auth.token !== null,
		name: state.auth.name
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onAuth: (name, email, phone, password, isSignup) =>
			dispatch(actions.auth(name, email, phone, password, isSignup)),
		onLogout: () => dispatch(actions.logout())
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
