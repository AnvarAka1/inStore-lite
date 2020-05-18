import React, { useState, useEffect } from "react";
import axios from "../axios-api";
import { useForm, useModal } from "../hooks";
import { parseCookies } from "../helpers/utils";
import { Row, Col, Carousel, Button, Form } from "react-bootstrap";
import {
	Heading,
	PreCarousel,
	CompilationsCarousel,
	ProductsCarousel,
	Speaker,
	ImagesCarousel,
	ReviewsCarousel,
	NewHeader,
	Modal,
	Card,
	Stars,
	TopImage
} from "../components";
import { FormGroup } from "../components/UI";
import Router from "next/router";
const LandingPage = ({ feedback, books, audioBooks, bookCollections, audioCollections, speakers }) => {
	const [ loading, setLoading ] = useState(false);
	const [ rate, setRate ] = useState(4);
	const nameControl = useForm();
	const mailControl = useForm();
	const phoneControl = useForm();
	const reviewControl = useForm();

	const speakerModal = useModal();
	const reviewModal = useModal();
	useEffect(() => {}, []);
	// Functions

	const rateChangedHandler = id => {
		setRate(id);
	};

	const speakerSubmitHandler = event => {
		event.preventDefault();
		// axios;
		console.log("Speaker submitted");
	};

	const reviewSubmitHandler = event => {
		event.preventDefault();
		const formData = new FormData();
		formData.append("text", reviewControl.value);
		formData.append("rate", rate);
		axios
			.post("/feedback", formData, {
				headers: {
					Authorization: `Bearer ${parseCookies(null).token}`
				}
			})
			.then(res => console.log(res))
			.catch(err => console.log(err));
	};
	const speakerCard = (
		<Card>
			<Card.Header>Стать спикером</Card.Header>
			<Card.Body>
				<Form onSubmit={speakerSubmitHandler}>
					<FormGroup placeholder="Ф.И.О" control={nameControl}>
						Ф.И.О
					</FormGroup>
					<FormGroup placeholder="example@mail.com" control={mailControl}>
						Эл. почта
					</FormGroup>
					<FormGroup placeholder="+998 (__) ___ - __ - __" control={phoneControl}>
						Номер телефона
					</FormGroup>
					<Button type="submit">Отправить</Button>
				</Form>
			</Card.Body>
		</Card>
	);

	const reviewCard = (
		<Card>
			<Card.Header>Оставить отзыв</Card.Header>
			<Card.Body>
				<Form onSubmit={reviewSubmitHandler}>
					<Form.Group>
						<Form.Label>Ваша оценка</Form.Label>
						<Stars isBig onClick={rateChangedHandler} rate={rate} />
					</Form.Group>
					<FormGroup
						as="textarea"
						placeholder="Напишите тут (максимум 1000 символов)"
						size="sm"
						control={reviewControl}
					>
						Ваш отзыв
					</FormGroup>

					<Button type="submit">Оставить отзыв</Button>
				</Form>
			</Card.Body>
		</Card>
	);
	return (
		<React.Fragment>
			<Modal modal={speakerModal}>{speakerCard}</Modal>
			<Modal modal={reviewModal}>{reviewCard}</Modal>
			<Row className="mb-4">
				<Col>
					<section>
						<TopImage
							title="Электронные книги и Видео уроки"
							img="/images/main/books/carousel1.png"
							link="/"
						/>
					</section>
					{/* <section>
						<Carousel>
							{getCarouselItems().map(item => {
								return (
									<Carousel.Item key={item.id}>
										<img className="d-block w-100" src={item.img} alt={item.title} />
										<Carousel.Caption>
											<h3>{item.title}</h3>
										</Carousel.Caption>
									</Carousel.Item>
								);
							})}
						</Carousel>
					</section> */}
				</Col>
			</Row>
			<Row>
				<Col>
					<div>
						<img src="/images/main/books/first.png" alt="Электронные и печатные книги" />
					</div>
				</Col>
				<Col>
					<Heading text="книги на любой вкус" href="/books/categories">
						Электронные и печатные
					</Heading>
				</Col>
			</Row>
			<Row className="mt-4 mb-4 pt-4 pb-4">
				<Col sm={4}>
					<PreCarousel link="/books/categories/compilations">Сборники книг</PreCarousel>
				</Col>
				<Col sm={8}>{!loading && <CompilationsCarousel items={bookCollections} />}</Col>
			</Row>
			<Row>
				<Col>
					<NewHeader href="/books/categories">книги</NewHeader>
				</Col>
			</Row>
			<Row>
				<Col>{!loading && <ProductsCarousel items={books} />}</Col>
			</Row>
			<Row className="mt-5 pt-4 mb-5 pb-4">
				<Col>
					<Heading text="слушайте когда и где угодно" href="/books/categories/audio-books">
						Аудиокниги
					</Heading>
				</Col>
				<Col>
					<div>
						<img src="/images/main/books/second.png" alt="Электронные и печатные книги" />
					</div>
				</Col>
			</Row>
			<Row>
				<Col sm={4}>
					<PreCarousel link="/books/categories/compilations">Сборники аудиокниг</PreCarousel>
				</Col>
				<Col sm={8}>{!loading && <CompilationsCarousel items={audioCollections} />}</Col>
			</Row>
			<Row className="mt-5 pt-4">
				<Col>
					<NewHeader href="/books/categories/audio-books">аудиокниги</NewHeader>
				</Col>
			</Row>
			<Row>
				<Col>{!loading && <ProductsCarousel items={audioBooks} />}</Col>
			</Row>
			<Row className="mb-4  mt-5 pt-3">
				<Col>
					<h3 className="text-accent">Лучшие спикеры</h3>
				</Col>
			</Row>
			<Row>
				<Col sm={5}>
					<ImagesCarousel items={speakers} />
				</Col>
				<Col sm={7}>
					<Speaker onClick={speakerModal.onShow} {...speakers[0]} />
				</Col>
			</Row>
			<Row className="mb-4  mt-5 pt-3">
				<Col>
					<h3 className="text-accent">Отзывы пользователей</h3>
				</Col>
			</Row>
			<Row>
				<Col>{!loading && <ReviewsCarousel items={feedback} />}</Col>
			</Row>
			<Row className="mt-3 mb-5 pb-4">
				<Col>
					<div className="text-center">
						<Button onClick={reviewModal.onShow}>Оставить отзыв</Button>
					</div>
				</Col>
			</Row>
		</React.Fragment>
	);
};

export const getServerSideProps = async ctx => {
	const res = await axios.get("home");
	const { feedback, books, audio_books, book_collections, audio_book_collections, speakers } = res.data;

	return {
		props: {
			feedback,
			books,
			audioBooks: audio_books,
			bookCollections: book_collections,
			audioCollections: audio_book_collections,
			speakers
		}
	};
};
export default React.memo(LandingPage);
