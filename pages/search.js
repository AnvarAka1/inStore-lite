import React from "react";
import axios from "../axios-api";
import { Products } from "../components";
import { Row, Col } from "react-bootstrap";
const SeachPage = ({ results }) => {
	return (
		<React.Fragment>
			<Row>
				<Col>
					<h5>Результаты поиска:</h5>
				</Col>
			</Row>
			<Row>
				{results.length ? (
					<Products items={results} />
				) : (
					<Col>
						<h5 className="text-secondary">Не найдено</h5>
					</Col>
				)}
			</Row>
		</React.Fragment>
	);
};

export const getServerSideProps = async ({ query }) => {
	const res = await axios.get(`/books/search?q=${encodeURI(query.q)}`);
	const { results } = res.data;
	return {
		props: {
			results
		}
	};
};
export default SeachPage;
