import React from "react";
import { Form, Button } from "react-bootstrap";
const makeOrder = ({ codeControl, isValidCode, productCount, currentPrice, oldPrice, ordered }) => {
	return (
		<div>
			<h6>Сумма</h6>
			<table className="w-100">
				<tbody>
					<tr>
						<th>{productCount} товара на сумму</th>
						<th>{oldPrice} сум</th>
					</tr>
					<tr>
						<th>Все скидки</th>
						<th>{currentPrice - oldPrice} сум</th>
					</tr>
				</tbody>
			</table>
			{/* <Form>
				<Form.Control value={codeControl.value} onChange={codeControl.onChange} />
				<p className="text-xs">
					Информация о промо-коде:{" "}
					{isValidCode ? (
						<span className="text-success">Успешно, вы получили {discount}% скидки</span>
					) : (
						<span className="text-primary">Не действителен</span>
					)}
				</p>
			</Form> */}
			<hr />
			<div className="d-flex justify-content-between align-items-center">
				<h6>Итого:</h6>
				<h6>{currentPrice}</h6>
			</div>
			<Button onClick={ordered} type="submit">
				Оформить заказ
			</Button>
		</div>
	);
};
makeOrder.defaultProps = {
	discount: 0,
	price: 0,
	codeControl: {
		value: "",
		onChange: null
	}
};
export default makeOrder;
