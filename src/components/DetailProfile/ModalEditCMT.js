import React, { useContext, useState } from 'react';
import "./Style.css";
import { FaStar } from "react-icons/fa";
import Modal from 'react-bootstrap/Modal'
import { AuthContext } from '../../context/AuthContext';
import { postUpdateReviews } from '../../api/reviews'
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button'
const ModalEditCMT = (props) => {
    const { showModalEdit, itemReviews, onHandlerCloseModalEdit } = props
    const colors = {
        orange: "#FFBA5A",
        grey: "#a9a9a9"
    };

    const { token } = useContext(AuthContext);
    const [currentValue, setCurrentValue] = useState(1);
    const [hoverValue, setHoverValue] = useState(undefined);
    const [txt, setText] = useState('')
    const [numberStar, setNumberStart] = useState(5);
    const handleClick = value => {
        setCurrentValue(value)
    }

    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }
    React.useEffect(() => {
        (() => {
            if (itemReviews) {
                console.log(itemReviews)
                setText(itemReviews?.comment)
                setNumberStart(itemReviews?.star)
            }
        })()
    }, [itemReviews, showModalEdit])
    const onHandlerUpadte = () => {
        if (txt === '') return toast.warning("Please complete all information")
        if (token) {
            postUpdateReviews(itemReviews._id, currentValue, txt, token).then((result) => {
                if (result?.data?.status === "success") {
                    toast.success("Update reviews success")
                    window.location.reload()
                    return
                }
                toast.error("Update reviews fail")
            }).catch((e) => {
                toast.error("Update reviews fail")
            })
        }
    }
    return (
        <Modal
            show={showModalEdit} onHide={onHandlerCloseModalEdit}
            size="md"
            className="containerModalReviews"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit Reviews</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={styles.container}>
                    <div style={styles.stars}>
                        {Array(5).fill(0).map((_, index) => {
                            return (
                                <FaStar
                                    key={index}
                                    size={24}
                                    onClick={() => handleClick(index + 1)}
                                    onMouseOver={() => handleMouseOver(index + 1)}
                                    onMouseLeave={handleMouseLeave}
                                    color={(hoverValue || currentValue) > index  ? colors.orange : colors.grey}
                                    style={{
                                        marginRight: 10,
                                        cursor: "pointer"
                                    }}
                                />
                            )
                        })}
                    </div>
                    <div className='textareaUpdateReviews'>
                        <textarea
                            placeholder="What's your experience?"
                            style={styles.textarea}
                            rows="5"
                            onChange={(e) => setText(e.target.value)}
                            required
                        />
                    </div>

                    <div className="containerBtnReviews">
                        <button
                            style={styles.button}
                            onClick={() => onHandlerUpadte()}
                        >
                            Submit
                         </button>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <buton variant="secondary" onClick={onHandlerCloseModalEdit}>
                    Close
          </buton>
            </Modal.Footer>
        </Modal>
    )
}

export default React.memo(ModalEditCMT)

const styles = {
    button: {
        marginLeft: '1rem'
    }
};
