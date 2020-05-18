import React from "react";
import { ProfileLayout } from "../../layouts";
import { Products } from "../../components";
import { Row, Col } from "react-bootstrap";
const LibraryPage = props => {
	return (
		<ProfileLayout>
			<Row>
				<Col>
					<h2>Моя библиотека</h2>
				</Col>
			</Row>
			<Row>{/* <Products items={getBooks()} /> */}</Row>
		</ProfileLayout>
	);
};

export default LibraryPage;
