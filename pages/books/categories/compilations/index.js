import React, { useState, useEffect } from "react";
import axios from "../../../../axios-api";
import { CategoriesLayout } from "../../../../layouts";
import { Row, Col } from "react-bootstrap";
import { Compilations } from "../../../../components";

const CompilationsPage = props => {
	const [ loading, setLoading ] = useState(true);
	useEffect(() => {
		setLoading(false);
	}, []);
	return (
		<CategoriesLayout withoutGenre>
			{!loading &&
				props.results.map(result => (
					<React.Fragment key={result.id}>
						<Row>
							<Col>
								<h2>{result.title}</h2>
							</Col>
						</Row>
						<Row className="mb-5 mt-1">
							<Compilations items={result.collections} />
						</Row>
					</React.Fragment>
				))}
		</CategoriesLayout>
	);
};
export const getServerSideProps = async context => {
	// axios
	const res = await axios.get("categories/collections");
	const { results } = res.data;

	return {
		props: {
			results: results
		}
	};
};
export default CompilationsPage;
