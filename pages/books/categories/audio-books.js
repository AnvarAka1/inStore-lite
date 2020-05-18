import axios from "../../../axios-api";
import BooksPage from "./";

export default BooksPage;
export const getServerSideProps = async ctx => {
	const url = "books/type/1";
	const res = await axios.get(url);
	const books = res.data.results;
	return {
		props: {
			title: "Аудиокниги",
			url,
			booksProps: books
		}
	};
};
