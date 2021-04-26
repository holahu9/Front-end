import React, { useContext, useState } from 'react';
import "./Style.css";
import { FaStar } from "react-icons/fa";
import Modal from 'react-bootstrap/Modal'
import { AuthContext } from './../../context/AuthContext';
import { createReview } from '../../api/reviews'
import { toast } from 'react-toastify';
const ModalGrid = (props) => {
    const colors = {
        orange: "#FFBA5A",
        grey: "#a9a9a9"
    };

    const { userData, token } = useContext(AuthContext);
    const [currentValue, setCurrentValue] = useState(1);
    const [hoverValue, setHoverValue] = useState(undefined);
    const [txt, setText] = useState('')
    const stars = Array(5).fill(0)

    // handle mouse
    const handleClick = value => {
        setCurrentValue(value)
    }

    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }

    const handlerCreateReviews = () => {
        if (txt === '') return toast.warning("Please complete all information")
        if (token) {
            createReview(props.id, currentValue, txt, token).then((result) => {
                if (result?.data?.status === "success") {
                    toast.success("Thank you for reviews")
                    props.setRevies(true)
                    return props.handleClose()
                }
                toast.error("Reviews fail")
            }).catch((e) => {
                toast.error("Reviews fail")
            })
        }

    }

    return (
        <Modal
            show={props.show} onHide={props.handleClose}
            size="lg"
            className="containerModalReviews"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Reviews</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={styles.container}>
                    <div style={styles.stars}>
                        {stars.map((_, index) => {
                            return (
                                <FaStar
                                    key={index}
                                    size={24}

                                    onClick={() => handleClick(index + 1)}
                                    onMouseOver={() => handleMouseOver(index + 1)}
                                    onMouseLeave={handleMouseLeave}
                                    color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                                    style={{
                                        marginRight: 10,
                                        cursor: "pointer"
                                    }}
                                />
                            )
                        })}
                    </div>
                    <textarea
                        placeholder="What's your experience?"
                        style={styles.textarea}
                        rows="5"
                        onChange={(e) => setText(e.target.value)}
                        required
                    />
                    <div className="containerBtnReviews">
                        <button
                            style={styles.button}
                            onClick={() => handlerCreateReviews()}
                        >
                            Submit
                         </button>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <buton variant="secondary" onClick={props.handleClose}>
                    Close
          </buton>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalGrid

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    stars: {
        display: "flex",
        flexDirection: "row",
    },
    textarea: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        padding: 10,
        margin: "20px 0",

    },
    button: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        padding: 10,
    }
};
