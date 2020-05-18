import React, { useState, useEffect } from "react";
import { getStaticCategories } from "../lib/categories";
import { Row, Col } from "react-bootstrap";
import { Categories } from "../components/";
import axios from "../axios-api";
import { useRouter } from "next/router";
let _isMounted = false;
const CategoriesLayout = ({ children, withoutGenre }) => {
	const [ pathname, setPathname ] = useState();
	const [ categories, setCategories ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const router = useRouter();
	useEffect(() => {
		_isMounted = true;
		axios
			.get("genres")
			.then(res => {
				if (_isMounted) setCategories(res.data.results);
			})
			.catch(err => {
				console.log(err);
			})
			.finally(() => {
				if (_isMounted) setLoading(false);
			});

		return () => {
			_isMounted = false;
		};
	}, []);
	useEffect(
		() => {
			setPathname(router.pathname);
		},
		[ router.pathname ]
	);
	return (
		<Row>
			<Col sm={3}>
				<Categories items={getStaticCategories()} isStatic={true} />
				{!withoutGenre && !loading && <Categories items={categories} pathname={pathname} />}
			</Col>
			<Col sm={9}>{children}</Col>
		</Row>
	);
};

export default CategoriesLayout;
