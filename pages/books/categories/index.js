import React, { useState, useEffect } from "react";
import axios from "../../../axios-api";
import { CategoriesLayout } from "../../../layouts";
import { Row, Col } from "react-bootstrap";
import { Products } from "../../../components";
import { useRouter } from "next/router";
// ?pk=1
let initialPageLoad = true;
let _isMounted = false;
const BooksPage = ({ title, booksProps, resultsProps, url }) => {
	const [ books, setBooks ] = useState(booksProps);
	const [ results, setResults ] = useState(resultsProps);
	const router = useRouter();
	useEffect(() => {
		_isMounted = true;
		return () => (_isMounted = false);
	}, []);
	useEffect(
		() => {
			_isMounted = true;
			if (!initialPageLoad && router.query.genre) {
				axios
					.get(url + "?g=" + router.query.genre)
					.then(res => {
						updateValues(res);
					})
					.catch(err => console.log(err));
			} else if (!initialPageLoad && !router.query.genre) {
				axios.get(url).then(res => {
					updateValues(res);
				});
			} else {
				initialPageLoad = false;
			}
			return () => (_isMounted = false);
		},
		[ router.query.genre ]
	);

	useEffect(
		() => {
			_isMounted = true;
			if (!initialPageLoad) {
				axios.get(url).then(res => {
					updateValues(res);
				});
			}
			return () => (_isMounted = false);
		},
		[ router.pathname ]
	);

	const updateValues = res => {
		if (_isMounted) {
			if (booksProps) {
				setBooks(res.data.results);
			} else {
				setResults(res.data.results);
			}
		}
	};
	return (
		<CategoriesLayout>
			{booksProps &&
			books && (
				<React.Fragment>
					<Row>
						<Col>
							<h2>{title}</h2>
						</Col>
					</Row>
					<Row>
						<Products items={books} />
					</Row>
				</React.Fragment>
			)}
			{resultsProps &&
				results &&
				results.map(result => (
					<React.Fragment key={result.id}>
						<Row>
							<Col>
								<h2>{result.title}</h2>
							</Col>
						</Row>
						<Row>
							<Products items={result.books} />
						</Row>
					</React.Fragment>
				))}
		</CategoriesLayout>
	);
};

export const getServerSideProps = async context => {
	// axios
	const url = "categories/books";
	const res = await axios.get(url);
	const { results } = res.data;

	return {
		props: {
			url,
			resultsProps: results
		}
	};
};
export default BooksPage;
