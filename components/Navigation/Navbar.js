import React from "react";
import classes from "./Navbar.module.scss";
import Link from "next/link";

import { Navbar, Nav, NavDropdown, Container, Row, Col } from "react-bootstrap";
import { Logo } from "../";

const navbar = ({ booksCategories, search, navItems }) => {
	const books = (
		<React.Fragment>
			<img src="/images/icons/book.png" className="icon icon-sm mr-1" alt="Книги" />Книги
		</React.Fragment>
	);

	return (
		<header className={classes.Navbar}>
			<Container>
				<Row>
					<Col>
						<Navbar expand="lg">
							<Link href="/">
								<a>
									<Logo />
								</a>
							</Link>

							<Navbar.Toggle aria-controls="basic-navbar-nav" />
							<Navbar.Collapse id="basic-navbar-nav">
								<Nav className="mr-auto ml-5">
									<NavDropdown title={books} className="list" id="basic-nav-dropdown">
										{booksCategories.map(cat => {
											return (
												<li key={cat.id} className={classes.CategoryItem}>
													<Link href={`/books/categories${cat.link}`}>
														<a>{cat.title}</a>
													</Link>
												</li>
											);
										})}
									</NavDropdown>
								</Nav>

								{search}
								{navItems}
							</Navbar.Collapse>
						</Navbar>
					</Col>
				</Row>
			</Container>
		</header>
	);
};

export default React.memo(navbar);
