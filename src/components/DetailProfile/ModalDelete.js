import React, { useContext, useState } from 'react';
import "./Style.css";
import { FaStar } from "react-icons/fa";
import Modal from 'react-bootstrap/Modal'
import { AuthContext } from '../../context/AuthContext';
import { postDeleteReviews } from '../../api/reviews'
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button'
const ModalDelete = (props) => {
    const { showModalDelete, handleCloseDelete, idReviews, token } = props
    const onHandlerDelete = () => {
        postDeleteReviews(idReviews, token).then((result) => {
            if (result?.data?.status === "success") {
                toast.success('Delete success');
                handleCloseDelete()
                window.location.reload()
            }
        }).catch(() => {
            toast.error('Delete Fail');
        })
    }
    return (
        <Modal
            show={showModalDelete} onHide={handleCloseDelete}
            size="md"
            className="containerModalReviews"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Config Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Button variant="primary" onClick={onHandlerDelete}>Yes</Button>
                <Button variant="danger" onClick={handleCloseDelete} style={styles.button}>No</Button>
            </Modal.Body>
            <Modal.Footer>
                <buton variant="secondary" onClick={handleCloseDelete}>
                    Close
          </buton>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDelete

const styles = {
    button: {
        marginLeft: '1rem'
    }
};
