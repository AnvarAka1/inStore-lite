import React from "react";
import { Modal } from "react-bootstrap";
const modal = ({ modal, onHide, children, className, size }) => {
	return (
		<Modal show={modal.show} onHide={onHide ? onHide : modal.onHide} className={className} size={size}>
			{children}
		</Modal>
	);
};

export default modal;
