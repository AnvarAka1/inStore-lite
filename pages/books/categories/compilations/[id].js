import axios from "../../../../axios-api";
import { Row, Col } from "react-bootstrap";
import { Products } from "../../../../components";
import { CategoriesLayout } from "../../../../layouts/";
const CompilationPage = ({ title, books }) => {
	return (
		<CategoriesLayout withoutGenre>
			{books && (
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
		</CategoriesLayout>
	);
};
export const getServerSideProps = async ({ query }) => {
	const res = await axios.get(`collections/books?pk=${query.id}`);
	const books = res.data.results[0].books;
	const title = res.data.results[0].title;

	return {
		props: {
			title,
			books
		}
	};
};
export default CompilationPage;
