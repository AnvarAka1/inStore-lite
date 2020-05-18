import axios from "../../../axios-api";
import BooksPage from "./";

export default BooksPage;
export const getServerSideProps = async ({ query }) => {
	const url = "books/type/2";
	const res = await axios.get(url);
	const books = res.data.results;
	return {
		props: {
			title: "Печатные книги",
			url,
			booksProps: books
		}
	};
};
