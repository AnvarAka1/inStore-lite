import React from "react";
import classes from "./NavItems.module.scss";
import Link from "next/link";
import { Button } from "react-bootstrap";
const navItems = ({ authModalShow, cartCount, name, isAuthorized, onLogout }) => {
	return (
		<div className={`${classes.NavItems} `}>
			{/* if the user is authorized, then the "favourites are not displayed in navbar" */}
			{!isAuthorized && (
				<div>
					<div className="list">
						<Link href="favorite">
							<a>
								<div className="d-flex align-items-center">
									<img src="/images/icons/star.png" className="icon icon-sm mr-1" alt="favourite" />
									Избранные
								</div>
							</a>
						</Link>
					</div>
				</div>
			)}

			<div>
				<div className="list">
					<Link href="/cart">
						<a>
							<div className="d-flex align-items-center">
								<div className={`position-relative ${isAuthorized && classes.CartRadius}`}>
									{cartCount ? (
										<span className="circle">
											<p className="text-white">{cartCount}</p>
										</span>
									) : null}
									<img src="/images/icons/cart.png" className="icon icon-sm" alt="cart" />
								</div>
								{!isAuthorized && <p className="ml-1">Корзина</p>}
							</div>
						</a>
					</Link>
				</div>
			</div>
			{!isAuthorized && (
				<div onClick={authModalShow} className="list">
					<a>
						<div className="d-flex align-items-center list">
							<img src="/images/icons/user.png" className="icon icon-sm mr-1" alt="login" />Войти
						</div>
					</a>
				</div>
			)}
			{isAuthorized && (
				<div className="flex-column justify-content-end align-items-between text-right">
					<Link href="/profile/settings">
						<p className="color-accent">{name}</p>
					</Link>
					<div onClick={onLogout} className="text-secondary text-small">
						<img src="/images/icons/logout.png" className="icon mr-1" />Выйти
					</div>
				</div>
			)}
		</div>
	);
};

export default navItems;
